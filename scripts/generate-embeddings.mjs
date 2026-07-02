// One-time build script: embeds every content chunk with Google's
// text-embedding-004 model and writes the vectors to lib/rag/embeddings.json.
//
// Run it whenever you edit lib/rag/content.json:
//   npm run generate-embeddings
//
// Requires GEMINI_API_KEY in your environment (or in a .env.local file at the
// project root). Nothing here touches a hosted vector DB — the vectors are
// committed to the repo and loaded directly by the /api/ask route.

import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")

const MODEL = "gemini-embedding-001"
const OUTPUT_DIM = 768 // keeps the committed vectors small; cosine is scale-invariant
const CONTENT_PATH = join(ROOT, "lib", "rag", "content.json")
const OUTPUT_PATH = join(ROOT, "lib", "rag", "embeddings.json")

// --- Minimal .env.local loader (so you don't have to `export` the key) --------
function loadEnvLocal() {
  const envPath = join(ROOT, ".env.local")
  if (!existsSync(envPath)) return
  const lines = readFileSync(envPath, "utf8").split("\n")
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eq = trimmed.indexOf("=")
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = value
  }
}

loadEnvLocal()

const API_KEY = process.env.GEMINI_API_KEY
if (!API_KEY) {
  console.error(
    "\n✗ GEMINI_API_KEY is not set.\n" +
      "  Add it to a .env.local file at the project root:\n" +
      "    GEMINI_API_KEY=your_key_here\n" +
      "  Get a free key at https://aistudio.google.com/apikey\n"
  )
  process.exit(1)
}

async function embedText(text) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:embedContent?key=${API_KEY}`
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: `models/${MODEL}`,
      content: { parts: [{ text }] },
      taskType: "RETRIEVAL_DOCUMENT",
      outputDimensionality: OUTPUT_DIM,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Gemini API error ${res.status}: ${body}`)
  }

  const data = await res.json()
  return data.embedding.values
}

async function main() {
  const { chunks } = JSON.parse(readFileSync(CONTENT_PATH, "utf8"))
  if (!Array.isArray(chunks) || chunks.length === 0) {
    throw new Error("No chunks found in lib/rag/content.json")
  }

  console.log(`Embedding ${chunks.length} chunks with ${MODEL} (${OUTPUT_DIM}-dim)...`)

  // gemini-embedding-001 embeds one document per request; our corpus is tiny.
  const records = []
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i]
    const embedding = await embedText(chunk.text)
    records.push({
      id: chunk.id,
      source: chunk.source,
      text: chunk.text,
      embedding,
    })
    console.log(`  embedded ${i + 1}/${chunks.length} (${chunk.id})`)
  }

  const output = {
    model: MODEL,
    dimensions: records[0].embedding.length,
    generatedAt: new Date().toISOString(),
    chunks: records,
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n")
  console.log(
    `\n✓ Wrote ${records.length} embeddings (${output.dimensions}-dim) to lib/rag/embeddings.json`
  )
}

main().catch((err) => {
  console.error("\n✗ Failed to generate embeddings:\n", err.message || err)
  process.exit(1)
})
