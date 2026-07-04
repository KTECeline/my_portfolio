import embeddingsData from "@/lib/rag/embeddings.json"

// Runs on Node.js (default) so we can read the committed embeddings JSON and
// use the global fetch. No hosted vector DB involved.
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const EMBED_MODEL = "gemini-embedding-001"
const EMBED_DIM = 768 // must match scripts/generate-embeddings.mjs
const GEN_MODEL = "gemini-2.5-flash"
const TOP_K = 5
const MAX_QUESTION_LEN = 500

type Chunk = {
  id: string
  source: string
  text: string
  embedding: number[]
}

const CHUNKS = (embeddingsData.chunks ?? []) as Chunk[]

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}

const SYSTEM_PROMPT = `You are "Ask AI about Celine", a helpful assistant embedded in Celine Khaw's terminal-themed portfolio website.

Rules:
- Answer ONLY using the information in the provided context below. Do not use outside knowledge.
- If the answer is not in the context, say you don't have that information in Celine's portfolio and suggest they browse the other files/sections or contact her directly. Do not make anything up.
- Be friendly, warm and concise (2-4 sentences is usually plenty). Speak about Celine in the third person ("she", "her").
- When relevant, mention specific project names, technologies, hackathons or awards from the context.
- Only say she "won" or "placed" in something if the context explicitly says so (e.g. "won", "1st place", "gold", "Top 10"). Otherwise describe it as a project she built or a hackathon she participated in — do not upgrade participation into a win.
- Do not mention "the context" or "the provided information" in your answer; just answer naturally.`

// --- Simple in-memory per-IP rate limit ------------------------------------
// Best-effort only: serverless instances are ephemeral and there can be many
// of them, so a determined abuser can exceed this. It's enough to stop casual
// hammering of the paid API. For hard guarantees use a shared store (e.g.
// Upstash Redis / @upstash/ratelimit) — see RAG_SETUP.md.
const RATE_LIMIT = 10 // requests
const RATE_WINDOW_MS = 60_000 // per minute
const hits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key)
    }
  }
  return recent.length > RATE_LIMIT
}

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0].trim()
  return req.headers.get("x-real-ip") ?? "unknown"
}

// --- Retrieval --------------------------------------------------------------
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0
  let normA = 0
  let normB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB)
  return denom === 0 ? 0 : dot / denom
}

async function embedQuestion(question: string, apiKey: string): Promise<number[]> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${EMBED_MODEL}:embedContent?key=${apiKey}`
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: `models/${EMBED_MODEL}`,
      content: { parts: [{ text: question }] },
      taskType: "RETRIEVAL_QUERY",
      outputDimensionality: EMBED_DIM,
    }),
  })
  if (!res.ok) {
    throw new Error(`Embedding failed (${res.status}): ${await res.text()}`)
  }
  const data = await res.json()
  return data.embedding.values as number[]
}

function topChunks(questionVector: number[]): Chunk[] {
  return CHUNKS.map((chunk) => ({
    chunk,
    score: cosineSimilarity(questionVector, chunk.embedding),
  }))
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_K)
    .map((r) => r.chunk)
}

// --- Generation (streamed) --------------------------------------------------
async function streamGeneration(
  question: string,
  context: string,
  apiKey: string
): Promise<ReadableStream<Uint8Array>> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEN_MODEL}:streamGenerateContent?alt=sse&key=${apiKey}`
  const userPrompt = `Context about Celine Khaw:\n\n${context}\n\n---\n\nQuestion: ${question}`

  const upstream = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 600,
        // gemini-2.5-flash is a reasoning model; disable "thinking" so the
        // whole token budget goes to the answer (faster + cheaper for RAG).
        thinkingConfig: { thinkingBudget: 0 },
      },
    }),
  })

  if (!upstream.ok || !upstream.body) {
    throw new Error(`Generation failed (${upstream.status}): ${await upstream.text()}`)
  }

  const reader = upstream.body.getReader()
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  let buffer = ""

  // Re-stream Gemini's SSE as plain text tokens the browser can append directly.
  return new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read()
      if (done) {
        controller.close()
        return
      }
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split("\n")
      buffer = lines.pop() ?? ""
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed.startsWith("data:")) continue
        const json = trimmed.slice(5).trim()
        if (!json || json === "[DONE]") continue
        try {
          const parsed = JSON.parse(json)
          const text = parsed?.candidates?.[0]?.content?.parts
            ?.map((p: { text?: string }) => p.text ?? "")
            .join("")
          if (text) controller.enqueue(encoder.encode(text))
        } catch {
          // Partial JSON across chunks — skip; the next pull completes it.
        }
      }
    },
    cancel() {
      reader.cancel()
    },
  })
}

// --- Route handler ----------------------------------------------------------
export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return jsonError("Server is missing GEMINI_API_KEY. Ask feature is not configured yet.", 500)
  }

  if (CHUNKS.length === 0) {
    return jsonError(
      "The knowledge index is empty. Run `npm run generate-embeddings` and redeploy.",
      503
    )
  }

  const ip = getClientIp(req)
  if (isRateLimited(ip)) {
    return jsonError("Rate limit exceeded. Please wait a minute before asking again.", 429)
  }

  let question: string
  try {
    const body = await req.json()
    question = typeof body?.question === "string" ? body.question.trim() : ""
  } catch {
    return jsonError("Invalid request body.", 400)
  }

  if (!question) {
    return jsonError("Please provide a question.", 400)
  }
  if (question.length > MAX_QUESTION_LEN) {
    return jsonError(`Question is too long (max ${MAX_QUESTION_LEN} characters).`, 400)
  }

  try {
    const questionVector = await embedQuestion(question, apiKey)
    const relevant = topChunks(questionVector)
    const context = relevant.map((c) => `[${c.source}] ${c.text}`).join("\n\n")
    const stream = await streamGeneration(question, context, apiKey)

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Accel-Buffering": "no",
      },
    })
  } catch (err) {
    console.error("[/api/ask] error:", err)
    return jsonError("Something went wrong while generating an answer. Please try again.", 502)
  }
}
