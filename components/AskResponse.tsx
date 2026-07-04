"use client"

import { useEffect, useState } from "react"

// Renders a single streamed answer from /api/ask inside the terminal history.
// Mounts once per `ask` command; manages its own loading / streaming / error
// state so the parent terminal only has to drop it into the output list.
export default function AskResponse({ question }: { question: string }) {
  const [answer, setAnswer] = useState("")
  const [status, setStatus] = useState<"loading" | "streaming" | "done" | "error">("loading")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    // `cancelled` guards against state updates after unmount. We intentionally
    // do NOT use a "run once" ref here: under React StrictMode (dev) the effect
    // mounts→unmounts→remounts, and a run-once guard combined with abort-on-
    // cleanup would abort the only request and then skip the retry, leaving it
    // stuck on "Thinking…". Re-fetching on remount is correct; the extra dev
    // request is harmless (production mounts once).
    let cancelled = false
    const controller = new AbortController()

    async function run() {
      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
          signal: controller.signal,
        })

        if (!res.ok || !res.body) {
          let msg = `request failed (${res.status})`
          try {
            const data = await res.json()
            if (data?.error) msg = data.error
          } catch {
            /* non-JSON error body */
          }
          if (cancelled) return
          setErrorMsg(msg)
          setStatus("error")
          return
        }

        if (!cancelled) setStatus("streaming")
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let acc = ""
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          acc += decoder.decode(value, { stream: true })
          if (cancelled) return
          setAnswer(acc)
        }
        if (!cancelled) setStatus("done")
      } catch (err) {
        if (cancelled || (err as Error)?.name === "AbortError") return
        setErrorMsg("network error — could not reach the assistant")
        setStatus("error")
      }
    }

    run()
    return () => {
      cancelled = true
      controller.abort()
    }
  }, [question])

  if (status === "error") {
    return (
      <div className="text-[13.5px] text-[#ff7a6b]">
        <span className="text-[#ff5f56]">ask: error:</span> {errorMsg}
      </div>
    )
  }

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2 text-[13.5px]">
        <span className="animate-pulse text-[#ffb000]">▋</span>
        <span className="text-[#8a6d3b]">Thinking...</span>
      </div>
    )
  }

  return (
    <div className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-[#c9a86a]">
      {answer}
      {status === "streaming" && <span className="animate-pulse text-[#ffb000]">▋</span>}
    </div>
  )
}
