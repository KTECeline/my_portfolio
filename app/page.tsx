"use client"

import type React from "react"
import { useState } from "react"
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ArrowUpRight,
  CornerDownLeft,
  ChevronRight,
  ChevronDown,
  Circle,
} from "lucide-react"
import AskResponse from "@/components/AskResponse"

/* ------------------------------------------------------------------ data --- */

const SOCIALS = {
  github: "https://github.com/KTECeline",
  linkedin: "https://www.linkedin.com/in/celine-khaw-a1433a237/",
  twitter: "https://x.com/KhawCeline",
  email: "leopardjiang03@gmail.com",
  resume:
    "https://www.canva.com/design/DAGo8KSmEkU/LGt7S8QVuwi294S9aF4SIA/edit?utm_content=DAGo8KSmEkU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
}

const flagship = {
  status: "IN PROGRESS",
  title: "Bilingual LLM Fine-Tuning for Chinese ↔ English Translation",
  lead: "Most portfolio LLM projects are GPT wrappers — prompting, no training, no evaluation. I'm fine-tuning an open-source model (Qwen2.5-7B) for domain-specific Chinese↔English translation and measuring, honestly, whether it beats the base model — an evaluation informed by three years of professional translation work.",
  blocks: [
    {
      h: "The problem",
      body: "General models translate fluently but drift on register, idiom, and domain terminology — exactly where translation quality is judged. The question isn't \"can an LLM translate\", it's \"does fine-tuning on a small, well-curated domain set measurably beat a strong base model, and where does it fail?\"",
    },
    {
      h: "My angle",
      body: "I translated technical and literary material professionally from 2021–2024. That drives the part most fine-tuning projects skip: a rubric for tone, cultural nuance, idiom, and register — what BLEU can't see. The domain expertise is the differentiator, not the training loop.",
    },
    {
      h: "Approach",
      body: "LoRA/QLoRA via Hugging Face PEFT + transformers on a curated parallel corpus (quality over volume). Runs tracked in Weights & Biases, hyperparameters logged with the reasoning behind each change. Reproducible setup; commit history that spans the real timeline.",
    },
    {
      h: "Evaluation — the differentiator",
      body: "Automatic metrics (BLEU, chrF, COMET as the primary signal) plus a hand-scored qualitative rubric on a 30–50 example sample, base vs. fine-tuned. The writeup reports where fine-tuning helped, where it plateaued, and where it made things worse. Honest failure cases over a promotional \"it worked\".",
    },
  ],
  stack: ["Qwen2.5-7B", "PEFT / LoRA", "transformers", "Weights & Biases", "sacreBLEU · COMET", "Gradio / HF Spaces"],
  statusNote: "Status: data curation + baseline evaluation underway. Numbers get published when they're real.",
}

type Experiment = {
  id: string
  file: string
  ext: string
  name: string
  blurb: string
  tags: string[]
  note: string
  link: string
}

const experiments: Experiment[] = [
  {
    id: "deadman",
    file: "deadman-switch.rs",
    ext: "rs",
    name: "Deadman Switch",
    blurb: "On-chain agent that auto-transfers crypto to a beneficiary on wallet inactivity — no custodian, no fees.",
    tags: ["Anchor", "Solana", "x402", "Next.js"],
    note: "Top 10 · Dev3Pack Global Hackathon 2026",
    link: "https://deadman-switch-eight.vercel.app/",
  },
  {
    id: "liquidity",
    file: "liquidity-advisor.tsx",
    ext: "tsx",
    name: "AI Liquidity Pool Advisor",
    blurb: "Agentic DeFi analytics surfacing pool risk/return signals for the Ethereum ecosystem. Led frontend + integration.",
    tags: ["AI", "DeFi", "Frontend"],
    note: "ETH Agentic Hackathon 2025",
    link: "https://ethglobal-agentic.vercel.app/",
  },
  {
    id: "sentiment",
    file: "sentiment-api.py",
    ext: "py",
    name: "Amazon Review Sentiment API",
    blurb: "End-to-end NLP pipeline: TF-IDF + Linear SVM, model comparison (LR/RF/SVM), MLflow tracking, served over FastAPI.",
    tags: ["Python", "scikit-learn", "FastAPI", "Docker"],
    note: "Full ML lifecycle · personal",
    link: "https://github.com/KTECeline/-Amazon-Review-Sentiment-API",
  },
  {
    id: "agentroyale",
    file: "agent-royale.ts",
    ext: "ts",
    name: "Agent Royale AI",
    blurb: "AI trading game built on ELIZA OS agents. Worked on the frontend.",
    tags: ["ELIZA OS", "AI", "JavaScript"],
    note: "Solana MegaHack / Colosseum 2025",
    link: "https://agent-royale-ai.vercel.app/",
  },
  {
    id: "ethygen",
    file: "ethygen.sol",
    ext: "sol",
    name: "Ethygen",
    blurb: "Unified-asset perpetuals DEX on Ethereum Sepolia with Privy + Avail. Frontend developer + integration.",
    tags: ["Solidity", "Hardhat", "Privy", "Avail"],
    note: "ETHGlobal showcase",
    link: "https://ethglobal.com/showcase/ethygen-a65dn",
  },
  {
    id: "nft",
    file: "nft-marketplace.sol",
    ext: "sol",
    name: "NFT Marketplace",
    blurb: "Decentralized NFT trading platform. Owned the backend / contracts.",
    tags: ["Solidity", "Web3"],
    note: "Encode Hackathon",
    link: "https://encode-hackathon-ten.vercel.app/",
  },
]

const alsoBuilt =
  "Budget AI Advisor (ImagineHack 2024) · Family Manager · Laravel Asset Management System · QuantTrading backtest library · AI trading-bot adviser"

const experience = [
  {
    role: "AI Engineer",
    org: "FINDOC Sdn Bhd",
    period: "Dec 2025 – Mar 2026",
    points: [
      "Deployed a financial-advisory AI agent on Google Cloud.",
      "Built an AIGC platform that scrapes multi-platform social data to detect trends and drive prompt generation.",
    ],
  },
  {
    role: "Software Engineer Intern",
    org: "Software International",
    period: "Oct 2024 – Jan 2025",
    points: ["Shipped a Laravel asset-management system used internally; cut a core workflow's time by ~40%."],
  },
  {
    role: "Technical & Literary Translator",
    org: "EndlessFantasy Translation",
    period: "Oct 2021 – Jan 2024",
    points: ["Three years of professional Chinese↔English translation — the domain expertise behind the flagship's evaluation."],
  },
]

const stack = {
  languages: ["Python", "TypeScript", "JavaScript", "PHP", "C++", "SQL"],
  ml_ai: ["HF transformers", "PEFT / LoRA", "scikit-learn", "RAG", "MLflow", "W&B"],
  backend: ["Next.js", "Node.js", "FastAPI", "Laravel", "Google Cloud", "Docker"],
}

const ASK_EXAMPLES = ["What is she building right now?", "Tell me about her RAG work", "What did she do at FINDOC?"]

/* --------------------------------------------------------------- file tree - */

const EXT_COLOR: Record<string, string> = {
  md: "text-[#79b8ff]",
  rs: "text-[#ffab70]",
  tsx: "text-[#56b6c2]",
  ts: "text-[#79b8ff]",
  py: "text-[#ffd866]",
  sol: "text-[#b392f0]",
  json: "text-[#ffab70]",
  sh: "text-[#9ecbff]",
  cfg: "text-[#8a6d3b]",
}

type FileId =
  | "readme"
  | "flagship"
  | "experience"
  | "leadership"
  | "ask"
  | "contact"
  | `exp:${string}`

const FILES: { id: FileId; name: string; ext: string }[] = [
  { id: "readme", name: "README.md", ext: "md" },
  { id: "flagship", name: "flagship.md", ext: "md" },
  { id: "experience", name: "experience.json", ext: "json" },
  { id: "leadership", name: "leadership.md", ext: "md" },
  { id: "ask", name: "ask.sh", ext: "sh" },
  { id: "contact", name: "contact.cfg", ext: "cfg" },
]

function ExtDot({ ext }: { ext: string }) {
  return <span className={`select-none text-[13px] ${EXT_COLOR[ext] ?? "text-[#8a6d3b]"}`}>●</span>
}

/* ---------------------------------------------------------------- primitives */

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-[#2a2214] bg-[#ffb000]/5 px-2 py-0.5 text-[11px] text-[#c9a86a]">
      {children}
    </span>
  )
}

function Comment({ children }: { children: React.ReactNode }) {
  return <div className="text-[#6b5628]">{children}</div>
}

/* -------------------------------------------------------------- ask console - */

function AskConsole() {
  const [input, setInput] = useState("")
  const [asked, setAsked] = useState<string[]>([])

  const submit = (q: string) => {
    const question = q.replace(/^ask\s*/i, "").replace(/^["']|["']$/g, "").trim()
    if (!question) return
    setAsked((prev) => [...prev, question])
    setInput("")
  }

  return (
    <div className="space-y-4 text-[13.5px]">
      <Comment>#!/bin/bash — a RAG assistant I built for this site. Answers from my real work; says so when it doesn&apos;t know.</Comment>

      {asked.map((q, i) => (
        <div key={i} className="space-y-1.5">
          <div className="flex gap-2">
            <span className="shrink-0 text-[#ffb000] glow">celine@apu:~$</span>
            <span className="text-[#e8cf9e]">ask &quot;{q}&quot;</span>
          </div>
          <div className="pl-3 text-[#c9a86a]">
            <AskResponse question={q} />
          </div>
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit(input)
        }}
        className="flex items-center gap-2 border-t border-[#2a2214] pt-4"
      >
        <span className="shrink-0 text-[#ffb000] glow">celine@apu:~$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='ask "what is she building?"'
          className="flex-1 bg-transparent text-[#ffcc66] placeholder-[#6b5628] caret-[#ffb000] outline-none"
          aria-label="Ask about Celine's work"
          autoComplete="off"
        />
        <button type="submit" className="text-[#8a6d3b] transition-colors hover:text-[#ffb000]" aria-label="Send">
          <CornerDownLeft size={16} />
        </button>
      </form>

      {asked.length === 0 && (
        <div className="flex flex-wrap gap-2">
          {ASK_EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => submit(ex)}
              className="rounded border border-[#2a2214] px-2.5 py-1 text-xs text-[#8a6d3b] transition-colors hover:border-[#ffb000]/40 hover:text-[#ffcc66]"
            >
              {ex}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------- views - */

function ReadmeView({ open }: { open: (id: FileId) => void }) {
  return (
    <div className="code-lines space-y-5">
      <div className="text-2xl font-bold text-[#ffb000] glow sm:text-3xl"># Celine Khaw</div>
      <div className="text-lg text-[#ffcc66]">AI engineer building and evaluating LLM systems.</div>
      <div className="max-w-2xl leading-relaxed text-[#c9a86a]">
        I care about the parts most people skip — fine-tuning, retrieval, and evaluation — and about systems that
        actually ship and hold up. CS (AI) @ Asia Pacific University · previously AI Engineer @ FINDOC.
      </div>
      <Comment>// current focus →</Comment>
      <button
        onClick={() => open("flagship")}
        className="group block w-full max-w-2xl rounded-lg border border-[#ffb000]/30 bg-[#ffb000]/[0.04] p-4 text-left transition-colors hover:border-[#ffb000]/60 hover:bg-[#ffb000]/[0.07]"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs tracking-wider text-[#8a6d3b]">flagship.md</span>
          <span className="flex items-center gap-1.5 rounded-full border border-[#ffb000]/30 px-2 py-0.5 text-[10px] text-[#ffb000]">
            <Circle size={7} className="animate-pulse fill-[#ffb000] text-[#ffb000]" /> IN PROGRESS
          </span>
        </div>
        <div className="mt-2 font-bold text-[#ffcc66]">{flagship.title}</div>
        <div className="mt-1 line-clamp-2 text-sm text-[#c9a86a]">{flagship.lead}</div>
        <div className="mt-3 flex items-center gap-1 text-sm text-[#ffb000] group-hover:underline">
          open flagship.md <ArrowUpRight size={14} />
        </div>
      </button>
      <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1 text-sm">
        <a href={SOCIALS.resume} target="_blank" rel="noreferrer" className="text-[#79b8ff] hover:underline">
          → résumé
        </a>
        <a href={SOCIALS.github} target="_blank" rel="noreferrer" className="text-[#79b8ff] hover:underline">
          → github/KTECeline
        </a>
        <a href={`mailto:${SOCIALS.email}`} className="text-[#79b8ff] hover:underline">
          → {SOCIALS.email}
        </a>
      </div>
    </div>
  )
}

function FlagshipView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-1.5 rounded-full border border-[#ffb000]/40 bg-[#ffb000]/10 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-[#ffb000]">
          <Circle size={7} className="animate-pulse fill-[#ffb000] text-[#ffb000]" /> {flagship.status}
        </span>
        <span className="text-xs text-[#6b5628]">~/flagship.md</span>
      </div>

      <h1 className="text-2xl font-bold leading-snug text-[#ffb000] glow sm:text-[1.75rem]">{flagship.title}</h1>
      <p className="max-w-3xl text-[15px] leading-relaxed text-[#e8cf9e]">{flagship.lead}</p>

      <div className="grid gap-x-8 gap-y-6 border-t border-[#2a2214] pt-6 sm:grid-cols-2">
        {flagship.blocks.map((b) => (
          <div key={b.h}>
            <h2 className="mb-2 text-sm font-semibold text-[#ffcc66]">
              <span className="text-[#6b5628]">## </span>
              {b.h}
            </h2>
            <p className="text-sm leading-relaxed text-[#c9a86a]">{b.body}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-[#2a2214] pt-6">
        {flagship.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>

      <div className="flex flex-col gap-3 border-t border-[#2a2214] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Comment>// {flagship.statusNote}</Comment>
        <a
          href={SOCIALS.github}
          target="_blank"
          rel="noreferrer"
          className="flex shrink-0 items-center gap-1.5 text-sm text-[#ffb000] hover:underline"
        >
          follow along on github <ArrowUpRight size={15} />
        </a>
      </div>
    </div>
  )
}

function ExperimentView({ exp, open }: { exp: Experiment; open: (id: FileId) => void }) {
  return (
    <div className="space-y-5">
      <Comment>// experiments/ — fast prototypes &amp; hackathon builds. Where I try ideas quickly; not the thing I stake my name on.</Comment>
      <div>
        <div className="flex items-center gap-2">
          <ExtDot ext={exp.ext} />
          <h1 className="text-xl font-bold text-[#ffcc66]">{exp.name}</h1>
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-[#c9a86a]">{exp.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {exp.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <div className="mt-4 text-sm text-[#8a6d3b]">{exp.note}</div>
        <a
          href={exp.link}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#ffb000] hover:underline"
        >
          open project <ArrowUpRight size={15} />
        </a>
      </div>

      <div className="border-t border-[#2a2214] pt-5">
        <Comment>// siblings</Comment>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
          {experiments
            .filter((e) => e.id !== exp.id)
            .map((e) => (
              <button
                key={e.id}
                onClick={() => open(`exp:${e.id}` as FileId)}
                className="flex items-center gap-1.5 text-[#8a6d3b] hover:text-[#ffcc66]"
              >
                <ExtDot ext={e.ext} /> {e.file}
              </button>
            ))}
        </div>
        <div className="mt-4 text-xs leading-relaxed text-[#6b5628]">
          <span className="text-[#8a6d3b]">also built:</span> {alsoBuilt}
        </div>
      </div>
    </div>
  )
}

function ExperienceView() {
  return (
    <div className="space-y-1 text-[13.5px] leading-relaxed">
      <div className="text-[#8a6d3b]">{"{"}</div>
      <div className="pl-4 text-[#c9a86a]">
        <span className="text-[#79b8ff]">&quot;experience&quot;</span>: [
      </div>
      {experience.map((e, i) => (
        <div key={e.role} className="pl-8">
          <div className="text-[#8a6d3b]">{"{"}</div>
          <div className="space-y-0.5 pl-4">
            <div>
              <span className="text-[#79b8ff]">&quot;role&quot;</span>:{" "}
              <span className="text-[#ffcc66]">&quot;{e.role}&quot;</span>,
            </div>
            <div>
              <span className="text-[#79b8ff]">&quot;org&quot;</span>:{" "}
              <span className="text-[#ffab70]">&quot;{e.org}&quot;</span>,
            </div>
            <div>
              <span className="text-[#79b8ff]">&quot;period&quot;</span>:{" "}
              <span className="text-[#c9a86a]">&quot;{e.period}&quot;</span>,
            </div>
            <div>
              <span className="text-[#79b8ff]">&quot;impact&quot;</span>: [
            </div>
            {e.points.map((p, j) => (
              <div key={j} className="pl-4 text-[#b8996a]">
                &quot;{p}&quot;{j < e.points.length - 1 ? "," : ""}
              </div>
            ))}
            <div className="text-[#c9a86a]">]</div>
          </div>
          <div className="text-[#8a6d3b]">
            {"}"}
            {i < experience.length - 1 ? "," : ""}
          </div>
        </div>
      ))}
      <div className="pl-4 text-[#c9a86a]">],</div>
      <div className="pl-4 text-[#c9a86a]">
        <span className="text-[#79b8ff]">&quot;stack&quot;</span>: {"{"}
      </div>
      {Object.entries(stack).map(([k, v]) => (
        <div key={k} className="pl-8">
          <span className="text-[#79b8ff]">&quot;{k}&quot;</span>:{" "}
          <span className="text-[#b8996a]">[{v.map((x) => `"${x}"`).join(", ")}]</span>,
        </div>
      ))}
      <div className="pl-4 text-[#c9a86a]">{"}"}</div>
      <div className="text-[#8a6d3b]">{"}"}</div>
    </div>
  )
}

function LeadershipView() {
  return (
    <div className="code-lines space-y-5">
      <div className="text-xl font-bold text-[#ffb000] glow"># Leadership &amp; Community</div>
      <p className="max-w-2xl leading-relaxed text-[#e8cf9e]">
        I&apos;m External Vice President of the <span className="text-[#ffcc66]">APU Blockchain &amp; Crypto Club</span>{" "}
        (previously Community Lead), where I run partnerships and sponsorships and organize Web3 events. I&apos;ve emceed
        DevMatch 2025 and the EthUprising Hackathon.
      </p>
      <Comment>// I like building the room as much as the product — getting people in one place to make something is its own kind of engineering.</Comment>
    </div>
  )
}

function ContactView() {
  const rows: [string, string, string][] = [
    ["email", SOCIALS.email, `mailto:${SOCIALS.email}`],
    ["github", "KTECeline", SOCIALS.github],
    ["linkedin", "celine-khaw", SOCIALS.linkedin],
    ["twitter", "@KhawCeline", SOCIALS.twitter],
    ["resume", "view →", SOCIALS.resume],
  ]
  return (
    <div className="space-y-4 text-[13.5px]">
      <Comment>; open to AI / backend roles &amp; internships — Singapore. fastest reply: email.</Comment>
      <div className="text-[#6b5628]">[contact]</div>
      <div className="space-y-1.5">
        {rows.map(([k, v, href]) => (
          <div key={k} className="flex gap-2">
            <span className="w-20 text-[#ffb000]">{k}</span>
            <span className="text-[#6b5628]">=</span>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="text-[#ffcc66] hover:underline"
            >
              {v}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------- shell - */

const TITLE: Record<string, string> = {
  readme: "README.md",
  flagship: "flagship.md",
  experience: "experience.json",
  leadership: "leadership.md",
  ask: "ask.sh",
  contact: "contact.cfg",
}

export default function Portfolio() {
  const [active, setActive] = useState<FileId>("readme")
  const [expOpen, setExpOpen] = useState(true)
  const [mobileTree, setMobileTree] = useState(false)

  const open = (id: FileId) => {
    setActive(id)
    setMobileTree(false)
  }

  const activeExp = active.startsWith("exp:") ? experiments.find((e) => e.id === active.slice(4)) : undefined
  const activeName = activeExp ? `experiments/${activeExp.file}` : TITLE[active] ?? "README.md"
  const activeExt = activeExp ? activeExp.ext : FILES.find((f) => f.id === active)?.ext ?? "md"

  const FileRow = ({ id, name, ext, indent = false }: { id: FileId; name: string; ext: string; indent?: boolean }) => (
    <button
      onClick={() => open(id)}
      className={`flex w-full items-center gap-2 px-3 py-1 text-left text-[13px] transition-colors ${
        indent ? "pl-8" : "pl-3"
      } ${
        active === id
          ? "border-l-2 border-[#ffb000] bg-[#ffb000]/10 text-[#ffcc66]"
          : "border-l-2 border-transparent text-[#8a6d3b] hover:bg-[#ffb000]/[0.05] hover:text-[#c9a86a]"
      }`}
    >
      <ExtDot ext={ext} />
      <span className="truncate">{name}</span>
    </button>
  )

  const Tree = () => (
    <div className="py-2">
      <div className="px-3 pb-1 text-[10px] uppercase tracking-[0.2em] text-[#6b5628]">Explorer</div>
      <div className="flex items-center gap-1 px-2 py-1 text-[13px] text-[#c9a86a]">
        <ChevronDown size={13} className="text-[#8a6d3b]" />
        <span className="font-semibold">celine-khaw</span>
      </div>
      <FileRow id="readme" name="README.md" ext="md" indent />
      <FileRow id="flagship" name="flagship.md" ext="md" indent />

      {/* experiments folder */}
      <button
        onClick={() => setExpOpen((o) => !o)}
        className="flex w-full items-center gap-1 py-1 pl-5 pr-3 text-left text-[13px] text-[#8a6d3b] hover:text-[#c9a86a]"
      >
        {expOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        <span>experiments</span>
      </button>
      {expOpen &&
        experiments.map((e) => (
          <button
            key={e.id}
            onClick={() => open(`exp:${e.id}` as FileId)}
            className={`flex w-full items-center gap-2 py-1 pl-12 pr-3 text-left text-[13px] transition-colors ${
              active === `exp:${e.id}`
                ? "border-l-2 border-[#ffb000] bg-[#ffb000]/10 text-[#ffcc66]"
                : "border-l-2 border-transparent text-[#8a6d3b] hover:bg-[#ffb000]/[0.05] hover:text-[#c9a86a]"
            }`}
          >
            <ExtDot ext={e.ext} />
            <span className="truncate">{e.file}</span>
          </button>
        ))}

      <FileRow id="experience" name="experience.json" ext="json" indent />
      <FileRow id="leadership" name="leadership.md" ext="md" indent />
      <FileRow id="ask" name="ask.sh" ext="sh" indent />
      <FileRow id="contact" name="contact.cfg" ext="cfg" indent />
    </div>
  )

  return (
    <div className="scanlines flex h-screen flex-col overflow-hidden bg-[#0a0a0a] text-[#e8cf9e]">
      {/* title bar */}
      <div className="flex shrink-0 items-center gap-3 border-b border-[#2a2214] bg-[#0d0b06] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]/80" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]/80" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]/80" />
        </div>
        <div className="flex-1 truncate text-center text-xs text-[#8a6d3b]">
          celine-khaw — <span className="text-[#c9a86a]">{activeName}</span>
        </div>
        <button
          onClick={() => setMobileTree((o) => !o)}
          className="text-xs text-[#8a6d3b] hover:text-[#ffcc66] md:hidden"
        >
          {mobileTree ? "close" : "files"}
        </button>
        <div className="hidden items-center gap-3 text-[#8a6d3b] md:flex">
          <a href={SOCIALS.github} target="_blank" rel="noreferrer" className="hover:text-[#ffcc66]" aria-label="GitHub">
            <Github size={16} />
          </a>
          <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#ffcc66]" aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
        </div>
      </div>

      {/* body: sidebar + editor */}
      <div className="flex min-h-0 flex-1">
        {/* sidebar (desktop) */}
        <aside className="hidden w-60 shrink-0 overflow-y-auto border-r border-[#2a2214] bg-[#0d0b06] md:block">
          <Tree />
        </aside>

        {/* sidebar (mobile overlay) */}
        {mobileTree && (
          <aside className="absolute inset-y-0 left-0 z-40 mt-[45px] w-60 overflow-y-auto border-r border-[#2a2214] bg-[#0d0b06] md:hidden">
            <Tree />
          </aside>
        )}

        {/* editor pane */}
        <main className="flex min-w-0 flex-1 flex-col">
          {/* tab strip */}
          <div className="flex shrink-0 items-center border-b border-[#2a2214] bg-[#0d0b06]">
            <div className="flex items-center gap-2 border-r border-[#2a2214] bg-[#0a0a0a] px-4 py-2 text-[13px] text-[#ffcc66]">
              <ExtDot ext={activeExt} />
              <span className="truncate">{activeExp ? activeExp.file : TITLE[active]}</span>
            </div>
          </div>

          {/* content */}
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-7 sm:px-8 sm:py-9">
            <div className="mx-auto max-w-3xl">
              {active === "readme" && <ReadmeView open={open} />}
              {active === "flagship" && <FlagshipView />}
              {active === "experience" && <ExperienceView />}
              {active === "leadership" && <LeadershipView />}
              {active === "ask" && <AskConsole />}
              {active === "contact" && <ContactView />}
              {activeExp && <ExperimentView exp={activeExp} open={open} />}
            </div>
          </div>

          {/* status bar */}
          <div className="flex shrink-0 items-center justify-between border-t border-[#2a2214] bg-[#ffb000] px-3 py-1 text-[11px] text-[#0a0a0a]">
            <div className="flex items-center gap-3 font-medium">
              <span>⎇ main</span>
              <span className="hidden sm:inline">LLM systems · RAG · fine-tuning</span>
            </div>
            <div className="flex items-center gap-3 font-medium">
              <span className="hidden sm:inline">UTF-8</span>
              <span>{activeExt}</span>
              <span className="hidden sm:inline">Singapore-bound</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
