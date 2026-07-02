# "Ask AI about Celine" — RAG feature setup

A retrieval-augmented `ask` command in the terminal. Visitors type
`ask "what blockchain projects has she built?"` and get a streamed answer
grounded only in your real portfolio content.

## How it works

```
lib/rag/content.json          ← source-of-truth text chunks (id, source, text)
        │  npm run generate-embeddings
        ▼
lib/rag/embeddings.json        ← precomputed vectors, committed to the repo
        │
app/api/ask/route.ts           ← embeds the question, cosine-similarity top 5,
                                  sends chunks + question to Gemini, streams answer
        │
components/AskResponse.tsx      ← streams tokens into the terminal
app/page.tsx  (ask command)     ← parses `ask "..."`, renders <AskResponse>
```

No hosted vector DB — the vectors live in a committed JSON file and similarity
is computed in memory on each request. Your corpus is tiny, so this is fast and free.

## Provider & why

Everything uses **one provider: Google Gemini**, so you only manage **one API key**.

- **Embeddings:** `gemini-embedding-001` (pinned to 768 dimensions) — free tier, good retrieval quality.
- **Generation:** `gemini-2.5-flash` — fast, cheap, native SSE streaming, generous free tier.

## Environment variables

| Variable         | Used by                          | Where to get it |
|------------------|----------------------------------|-----------------|
| `GEMINI_API_KEY` | build script **and** `/api/ask`  | https://aistudio.google.com/apikey (free) |

### Local
1. Copy `env.example` to `.env.local`.
2. Paste your key: `GEMINI_API_KEY=AIza...`

### Vercel
Project → **Settings → Environment Variables** → add `GEMINI_API_KEY` for
Production (and Preview/Development if you want). Redeploy so it takes effect.

## First-time setup / whenever you edit content

The repo ships with an **empty** `lib/rag/embeddings.json`. You must generate the
real vectors once (and again any time you change your content):

```bash
# 1. put GEMINI_API_KEY in .env.local (see above)
# 2. edit lib/rag/content.json if your projects/skills/experience changed
npm run generate-embeddings
# 3. commit the regenerated file
git add lib/rag/embeddings.json && git commit -m "Regenerate ask embeddings"
git push   # Vercel redeploys with the new index
```

If `embeddings.json` is empty at request time, `/api/ask` returns a clear 503
telling you to run the script — it won't crash.

## Rate limiting

`app/api/ask/route.ts` has a simple in-memory per-IP limit (**10 requests/minute**).
It's best-effort: serverless instances are ephemeral and there can be several, so a
determined abuser could exceed it. For a hard guarantee, swap in a shared store like
[`@upstash/ratelimit`](https://github.com/upstash/ratelimit) backed by Upstash Redis
(has a free tier). For a personal portfolio, the in-memory limit is usually enough.

## Cost at low traffic

With the free tiers on both models, a personal-portfolio level of traffic
(dozens–hundreds of asks/month) typically costs **$0**. If you exceed the free
tier, `gemini-2.5-flash` and `text-embedding-004` are among the cheapest options —
each `ask` sends only ~5 short chunks + a short question and gets a 2–4 sentence
answer, so per-request token usage is tiny (fractions of a cent). Embedding
generation runs only when you run the script, over ~20 short chunks — negligible.
