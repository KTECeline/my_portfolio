"use client"

import { useEffect, useRef, useState } from "react"

// Renders a single streamed answer from /api/ask inside the terminal history.
// Mounts once per `ask` command; manages its own loading / streaming / error
// state so the parent terminal only has to drop it into the output list.
export default function AskResponse({ question }: { question: string }) {
  const [answer, setAnswer] = useState("")
  const [status, setStatus] = useState<"loading" | "streaming" | "done" | "error">("loading")
  const [errorMsg, setErrorMsg] = useState("")
  const started = useRef(false)

  useEffect(() => {
    // Guard against React 18 StrictMode double-invoke in dev.
    if (started.current) return
    started.current = true

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
          setErrorMsg(msg)
          setStatus("error")
          return
        }

        setStatus("streaming")
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let acc = ""
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          acc += decoder.decode(value, { stream: true })
          setAnswer(acc)
        }
        setStatus("done")
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return
        setErrorMsg("network error — could not reach the assistant")
        setStatus("error")
      }
    }

    run()
    return () => controller.abort()
  }, [question])

  if (status === "error") {
    return (
      <div className="text-red-400 text-xs sm:text-sm">
        <span className="text-red-500">ask: error:</span> {errorMsg}
      </div>
    )
  }

  if (status === "loading") {
    return (
      <div className="text-green-400 text-xs sm:text-sm flex items-center gap-2">
        <span className="animate-pulse">▋</span>
        <span className="text-gray-400">Thinking...</span>
      </div>
    )
  }

  return (
    <div className="text-green-300 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
      {answer}
      {status === "streaming" && <span className="animate-pulse text-green-400">▋</span>}
    </div>
  )
}
