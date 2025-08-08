"use client"

import { useMemo, useState, useCallback } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Code2, Server, Database, Globe, Github, Gitlab, Figma, Cpu, Bot, Boxes, Palette, Terminal } from 'lucide-react'

type Category = "Frontend" | "Backend" | "Database" | "DevOps" | "AI/ML" | "Design" | "Blockchain" | "Tools"

type Tool = {
  name: string
  category: Category
  proficiency: number // 0-100
  colorFrom: string
  colorTo: string
  Icon: React.ComponentType<{ className?: string }>
}

const ALL_TOOLS: Tool[] = [
  { name: "React", category: "Frontend", proficiency: 85, colorFrom: "from-purple-500", colorTo: "to-cyan-400", Icon: Code2 },
  { name: "Next.js", category: "Frontend", proficiency: 85, colorFrom: "from-slate-400", colorTo: "to-purple-400", Icon: Globe },
  { name: "Tailwind CSS", category: "Frontend", proficiency: 90, colorFrom: "from-cyan-400", colorTo: "to-indigo-400", Icon: Boxes },
  { name: "Node.js", category: "Backend", proficiency: 80, colorFrom: "from-emerald-400", colorTo: "to-lime-400", Icon: Server },
  { name: "Laravel", category: "Backend", proficiency: 85, colorFrom: "from-rose-400", colorTo: "to-orange-400", Icon: Terminal },
  { name: "Python", category: "AI/ML", proficiency: 90, colorFrom: "from-yellow-400", colorTo: "to-blue-400", Icon: Cpu },
  { name: "MySQL", category: "Database", proficiency: 85, colorFrom: "from-sky-400", colorTo: "to-blue-500", Icon: Database },
  { name: "Solidity", category: "Blockchain", proficiency: 75, colorFrom: "from-violet-400", colorTo: "to-fuchsia-400", Icon: Bot },
  { name: "Web3", category: "Blockchain", proficiency: 75, colorFrom: "from-fuchsia-400", colorTo: "to-emerald-400", Icon: Globe },
  { name: "GitHub", category: "Tools", proficiency: 90, colorFrom: "from-gray-300", colorTo: "to-gray-500", Icon: Github },
  { name: "GitLab", category: "Tools", proficiency: 80, colorFrom: "from-amber-400", colorTo: "to-orange-500", Icon: Gitlab },
  { name: "Figma", category: "Design", proficiency: 85, colorFrom: "from-pink-400", colorTo: "to-purple-400", Icon: Figma },
  { name: "Canva", category: "Design", proficiency: 85, colorFrom: "from-teal-400", colorTo: "to-cyan-400", Icon: Palette },
]

const FILTERS: ("All" | Category)[] = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "AI/ML",
  "Design",
  "Blockchain",
  "Tools",
]

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

export default function ToolboxGrid() {
  const [activeFilter, setActiveFilter] = useState<("All" | Category)>("All")
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)

  const tools = useMemo(() => {
    if (activeFilter === "All") return ALL_TOOLS
    return ALL_TOOLS.filter((t) => t.category === activeFilter)
  }, [activeFilter])

  // Card tilt effect
  const handleMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const midX = rect.width / 2
    const midY = rect.height / 2
    const rotateY = ((x - midX) / midX) * 8 // degrees
    const rotateX = -((y - midY) / midY) * 8
    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }, [])

  const handleLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget
    el.style.transform = "rotateX(0deg) rotateY(0deg) scale(1.0)"
  }, [])

  return (
    <section className="py-16 md:py-20 px-6 sm:px-4" id="toolbox">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            My Toolbox
          </h2>
          <p className="text-gray-300 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            The frameworks, languages, and tools I build with. Tap a tile on mobile to flip it. Hover on desktop for tilt and details.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              aria-pressed={activeFilter === f}
              className={cx(
                "rounded-full px-3 py-1.5 text-sm md:text-base transition-all duration-300 border",
                activeFilter === f
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg shadow-purple-500/30"
                  : "border-purple-400/40 text-purple-200 hover:bg-purple-500/10"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <TooltipProvider delayDuration={100}>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {tools.map((tool, idx) => {
              const isFlipped = flippedIndex === idx
              const ring = `conic-gradient(#a855f7 ${tool.proficiency * 3.6}deg, rgba(255,255,255,0.08) ${tool.proficiency * 3.6}deg)`

              return (
                <Tooltip key={tool.name}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setFlippedIndex(isFlipped ? null : idx)}
                      onMouseMove={handleMove}
                      onMouseLeave={handleLeave}
                      className={cx(
                        "relative aspect-square rounded-2xl p-0.5 outline-none ring-0 transition-transform duration-150",
                        "focus-visible:ring-2 focus-visible:ring-purple-400"
                      )}
                      aria-label={tool.name}
                    >
                      <div
                        className={cx(
                          "relative w-full h-full rounded-2xl overflow-hidden",
                          "bg-gradient-to-br",
                          tool.colorFrom,
                          tool.colorTo,
                          "p-[1px]"
                        )}
                      >
                        <div
                          className={cx(
                            "absolute inset-0 rounded-2xl",
                            "bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"
                          )}
                        />
                        {/* Inner card (flip container) */}
                        <div
                          className={cx(
                            "relative w-full h-full rounded-2xl bg-slate-900/80 backdrop-blur",
                            "transition-transform duration-500 [transform-style:preserve-3d]"
                          )}
                          style={{
                            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                          }}
                        >
                          {/* Front */}
                          <div
                            className="absolute inset-0 grid place-items-center gap-2 [backface-visibility:hidden]"
                            role="group"
                          >
                            {/* Proficiency ring */}
                            <div
                              className="relative w-16 h-16 md:w-20 md:h-20 rounded-full grid place-items-center"
                              style={{
                                background: ring,
                              }}
                            >
                              <div className="absolute inset-[4px] rounded-full bg-slate-900/90" />
                              <tool.Icon className="relative z-10 w-7 h-7 md:w-8 md:h-8 text-white" />
                            </div>
                            <span className="text-xs md:text-sm font-semibold text-white">{tool.name}</span>
                            <span className="text-[10px] md:text-xs text-purple-200/80">
                              {tool.category}
                            </span>

                            {/* Glow on hover */}
                            <div
                              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                boxShadow:
                                  "0 10px 30px rgba(168, 85, 247, 0.25), 0 0 0 1px rgba(236, 72, 153, 0.25)",
                              }}
                            />
                          </div>

                          {/* Back */}
                          <div className="absolute inset-0 p-3 md:p-4 [backface-visibility:hidden] [transform:rotateY(180deg)] grid place-items-center">
                            <div className="text-center">
                              <p className="text-sm md:text-base font-bold text-white">{tool.name}</p>
                              <p className="text-xs md:text-sm text-purple-200/90">{tool.category}</p>
                              <div className="mt-2 md:mt-3">
                                <div className="h-2 w-28 md:w-32 bg-white/10 rounded-full overflow-hidden mx-auto">
                                  <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                    style={{ width: `${tool.proficiency}%` }}
                                  />
                                </div>
                                <p className="mt-1 text-[10px] md:text-xs text-gray-300">
                                  Proficiency {tool.proficiency}%
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-slate-900/90 text-white border border-purple-500/30"
                  >
                    <div className="flex items-center gap-2">
                      <tool.Icon className="w-4 h-4" />
                      <span className="text-sm">{tool.name}</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </div>
      </div>
    </section>
  )
}
