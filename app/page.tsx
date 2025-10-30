"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

function ClientDateTime() {
  const [now, setNow] = useState("");
  useEffect(() => {
    setNow(new Date().toLocaleString());
    const interval = setInterval(() => {
      setNow(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <span>{now}</span>;
}
import { motion, AnimatePresence } from "framer-motion"
import {
  Terminal,
  Activity,
  Code,
  Database,
  Users,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Download,
  Menu,
  X,
  Twitter,
} from "lucide-react"

interface TerminalCommand {
  command: string
  output: React.ReactNode
}

export default function TerminalPortfolio() {
  const [activeTab, setActiveTab] = useState("welcome")
  const [terminalHistory, setTerminalHistory] = useState<TerminalCommand[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const tabs = [
    { id: "welcome", label: "~/welcome", icon: Terminal, file: "welcome.sh" },
    { id: "projects", label: "~/projects", icon: Code, file: "projects.sh" },
    { id: "skills", label: "~/skills", icon: Database, file: "skills.py" },
    { id: "experience", label: "~/experience", icon: Activity, file: "experience.json" },
    { id: "community", label: "~/community", icon: Users, file: "community.log" },
    { id: "contact", label: "~/contact", icon: Mail, file: "contact.config" },
  ]

  const projects = [
    {
      name: "Agent Royale AI",
      description: "AI Trading Game with ELIZA OS integration",
      tech: ["ELIZA OS", "AI", "Trading", "JavaScript"],
      link: "https://agent-royale-ai.vercel.app/",
      status: "DEPLOYED",
      award: "🏆 Solana MegaHack 2025 and Colloseum Hackathon 2025",
    },
    { name: "Ethygen",
    description: "An Unified Asset Perp DEX on Eth Sepolia, with privy, avail and hardhat integration",
    tech: ["Next.js", "Solidity", "Hardhat", "Privy", "Avail"],
    link: "https://ethglobal.com/showcase/ethygen-a65dn",
    status: "BETA",
    award: "Front End Developer + Integration"
  },
    {
      name: "Family Manager",
      description: "Family system for finance and passwords",
      tech: ["Supabase", "Next.js", "Vercel", "JavaScript"],
      link: "https://family-manager-delta.vercel.app/",
      status: "DEPLOYED",
      award: "Honestly just for my mom",
    },
    {
      name: "AI-Powered Liquidity Pool Advisor",
      description: "Advanced DeFi analytics for Ethereum ecosystem",
      tech: ["AI", "DeFi", "Blockchain", "Frontend"],
      link: "https://ethglobal-agentic.vercel.app/",
      status: "LIVE",
      award: "🥇 Agentic Ethereum 2025, in charged of frontend and integration",
    },
    {
      name: "NFT Marketplace",
      description: "Decentralized NFT trading platform",
      tech: ["Solidity", "Blockchain", "Web3"],
      link: "https://encode-hackathon-ten.vercel.app/",
      status: "BETA",
      award: "🎯 Encode Hackathon, in charged of backend",
    },
    {
      name: "Budget AI Advisor",
      description: "Intelligent financial guidance system",
      tech: ["Node.js", "Gemini API", "AI"],
      status: "DEV",
      award: "💡 ImagineHack 2024 (Taylor's), in charged of AI integration",
    },
    {
      name: "QuantTrading Backtest System",
      description: "Comprehensive quantitative trading analysis",
      tech: ["Python", "Trading", "Analytics"],
      status: "DEV",
      award: "📈 Quant trading backtesting library",
    },
    {
      name: "Asset Management System",
      description: "Internal Laravel application for asset allocation",
      tech: ["Laravel", "PHP", "MySQL"],
      status: "DEPLOYED",
      award: "🏢 Enterprise Solution, full stack",
    },
    {
      name: "AI trading bot adviser",
      description: "AI-powered trading bot for automated trading strategies",
      tech: ["The Graph", "CoinGecko API", "AI", "Solana"],
      status: "Under Development",
      award: "Own project, curious built",
    },
  ]

  const skills = {
    "Programming Languages": ["Python", "JavaScript", "PHP", "C++", "R", "C#", "HTML", "CSS", "Tailwind CSS"],
    "Frameworks & Libraries": ["Next.js", "Laravel", "Node.js", "React"],
    "Blockchain & Web3": ["Solidity","Smart Contracts", "DeFi", "ELIZA OS", "Anchor"],
    "Cloud & Tools": ["Azure", "Google Cloud", "Git", "VS Code", "Figma", "Canva", "Gitlab"],
    "AI & Data": ["Machine Learning","numpy", "Gemini API"],
  }

  const experience = [
    {
      role: "Software Engineer Intern",
      company: "SoftWare International",
      period: "Oct 2024 - Jan 2025",
      achievements: ["Built Laravel asset management system", "Improved efficiency by 40%"],
      status: "COMPLETED",
    },
    {
      role: "Community Department Lead, External Vice President",
      company: "APU Blockchain & Crypto Club",
      period: "2024 Jan- 2025 Sep (Dept Lead), Sep until now (VP)",
      achievements: ["Led community initiatives", "Organized tons of blockchain events", "Emceed for DevMatch 2025"],
      status: "ACTIVE",
    },
     {
      role: "Event team member",
      company: "APU Hacktheles Club",
      period: "2024 Aug - Present",
      achievements: ["Emceed for EthUprising Hackathon", "Organized events"],
      status: "ACTIVE",
    },
    
    {
      role: "Part Time Translator",
      company: "EndlessFantasy Translation",
      period: "Oct 2021 - Jan 2024",
      achievements: ["Translated technical documents", "Maintained 99% accuracy rate"],
      status: "COMPLETED",
    },
  ]

  const achievements = [
    "Solana Hackfest 2024",
    "DevCon 2024, ETH Bangkok",
    "ImaGINEHACK 2024 (Taylor's)",
    "University Future of Blockchain Hackathon 2025",
    "Agentic Ethereum 2025 (ETHGlobal)",
    "Breakout SOLANA/ MEGAHACK 2025",
    "Internal APU CTF 2024",
    "Math Galactica 2023 - Quantum Quest",
    "Cisco Networking Certificate",
    "EthOnline 2025 (ETHGlobal)",
  ]

  const executeCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()
    let output: React.ReactNode = null

    switch (command) {
      case "help":
        output = (
          <div className="text-green-400">
            <div>Available commands:</div>
            <div className="ml-4 mt-2 space-y-1 text-xs sm:text-sm">
              <div>• ls - list all sections</div>
              <div>• projects - show projects</div>
              <div>• skills - show technical skills</div>
              <div>• experience - show work experience</div>
              <div>• community - show community involvement</div>
              <div>• contact - show contact information</div>
              <div>• clear - clear terminal</div>
              <div>• whoami - show profile info</div>
            </div>
          </div>
        )
        break
      case "ls":
        output = (
          <div className="text-blue-400 text-xs sm:text-sm">
            <div>drwxr-xr-x celine staff welcome.sh</div>
            <div>drwxr-xr-x celine staff projects.sh</div>
            <div>drwxr-xr-x celine staff skills.py</div>
            <div>drwxr-xr-x celine staff experience.json</div>
            <div>drwxr-xr-x celine staff community.log</div>
            <div>drwxr-xr-x celine staff contact.config</div>
          </div>
        )
        break
      case "whoami":
        output = (
          <div className="text-purple-400 text-xs sm:text-sm">
            <div>Celine Khaw (Khaw Tze Ern)</div>
            <div>Blockchain & AI Builder | Hackathon Explorer</div>
            <div>Computer Science (AI) Student @ APU</div>
          </div>
        )
        break
      case "projects":
        setActiveTab("projects")
        output = <div className="text-green-400 text-xs sm:text-sm">Loading projects.sh...</div>
        break
      case "skills":
        setActiveTab("skills")
        output = <div className="text-green-400 text-xs sm:text-sm">Executing skills.py...</div>
        break
      case "experience":
        setActiveTab("experience")
        output = <div className="text-green-400 text-xs sm:text-sm">Parsing experience.json...</div>
        break
      case "community":
        setActiveTab("community")
        output = <div className="text-green-400 text-xs sm:text-sm">Reading community.log...</div>
        break
      case "contact":
        setActiveTab("contact")
        output = <div className="text-green-400 text-xs sm:text-sm">Loading contact.config...</div>
        break
      case "clear":
        setTerminalHistory([])
        return
      default:
        output = (
          <div className="text-red-400 text-xs sm:text-sm">
            Command not found: {cmd}. Type 'help' for available commands.
          </div>
        )
    }

    setTerminalHistory((prev) => [...prev, { command: cmd, output }])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(currentInput)
      setCurrentInput("")
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalHistory])

  const renderContent = () => {
    switch (activeTab) {
      case "welcome":
        return (
          <div className="space-y-4">
            {/* Profile Image Frame */}
            <div className="flex justify-center mt-2">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-green-400 bg-gray-900 overflow-hidden flex items-center justify-center shadow-lg">
                <img
                  src="/images/celine-profile.jpeg"
                  alt="Celine Khaw"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-2">
              <div className="text-2xl sm:text-4xl font-bold text-green-400 font-mono">
                ╔═══════════════════════════════════════╗
              </div>
              <div className="text-2xl sm:text-4xl font-bold text-green-400 font-mono">║ CELINE KHAW TERMINAL ║</div>
              <div className="text-2xl sm:text-4xl font-bold text-green-400 font-mono">
                ╚═══════════════════════════════════════╝
              </div>
              <div className="text-lg sm:text-xl text-purple-400 font-mono mt-4">
                Blockchain & AI Builder | Hackathon Explorer
              </div>
              <div className="text-xs sm:text-sm text-gray-400 font-mono">
                Computer Science (AI) Student @ Asia Pacific University
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-gray-900/50 border border-green-500/30 rounded p-3 sm:p-4">
                <div className="text-green-400 font-mono text-xs sm:text-sm">SYSTEM STATUS</div>
                <div className="text-white font-mono text-xs mt-2">
                  <div>● Projects: {projects.length} active</div>
                  <div>● Hackathons: 9+ participated</div>
                  <div>● Awards: One wins</div>
                  <div>● Status: Available for Internship from Jan - April 2025</div>
                </div>
              </div>
              <div className="bg-gray-900/50 border border-blue-500/30 rounded p-3 sm:p-4">
                <div className="text-blue-400 font-mono text-xs sm:text-sm">QUICK ACCESS</div>
                <div className="text-white font-mono text-xs mt-2 space-y-1">
                  <div>→ Type 'help' for commands</div>
                  <div>→ Click tabs to navigate</div>
                  <div>→ Tap terminal icon (mobile)</div>
                </div>
              </div>
            </div>
           
          </div>
     )

      case "projects":
        return (
          <div className="space-y-4">
            <div className="text-green-400 font-mono text-sm">#!/bin/bash</div>
            <div className="text-gray-400 font-mono text-xs sm:text-sm"># Featured Projects & Hackathon Wins</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 border border-purple-500/30 rounded p-3 sm:p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                    <div className="text-purple-400 font-mono font-bold text-sm sm:text-base">{project.name}</div>
                    <div
                      className={`px-2 py-1 rounded text-xs font-mono w-fit ${
                        project.status === "DEPLOYED"
                          ? "bg-green-500/20 text-green-400"
                          : project.status === "LIVE"
                            ? "bg-blue-500/20 text-blue-400"
                            : project.status === "BETA"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {project.status}
                    </div>
                  </div>
                  <div className="text-white font-mono text-xs sm:text-sm mb-2">{project.description}</div>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="bg-gray-800 text-green-400 px-2 py-1 rounded text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div className="text-yellow-400 font-mono text-xs sm:text-sm">{project.award}</div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 font-mono text-xs sm:text-sm flex items-center gap-1 w-fit"
                      >
                        <ExternalLink size={12} />
                        DEMO
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case "skills":
        return (
          <div className="space-y-4">
            <div className="text-green-400 font-mono text-sm">#!/usr/bin/env python3</div>
            <div className="text-gray-400 font-mono text-xs sm:text-sm"># Technical Skills & Proficiencies</div>
            <div className="text-blue-400 font-mono text-sm">class CelineSkills:</div>
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="ml-2 sm:ml-4"
              >
                <div className="text-purple-400 font-mono text-xs sm:text-sm">
                  {" "}
                  {category.toLowerCase().replace(/ /g, "_")} = [
                </div>
                {skillList.map((skill, i) => (
                  <div key={i} className="ml-4 sm:ml-8 text-white font-mono text-xs sm:text-sm">
                    "{skill}"{i < skillList.length - 1 ? "," : ""}
                  </div>
                ))}
                <div className="text-purple-400 font-mono text-xs sm:text-sm"> ]</div>
              </motion.div>
            ))}
          </div>
        )

      case "experience":
        return (
          <div className="space-y-4">
            <div className="text-green-400 font-mono text-sm">{"{"}</div>
            <div className="text-gray-400 font-mono ml-2 text-xs sm:text-sm">"professional_experience": [</div>
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="ml-2 sm:ml-4 bg-gray-900/50 border border-blue-500/30 rounded p-3 sm:p-4"
              >
                <div className="text-blue-400 font-mono text-sm"> {"{"}</div>
                <div className="ml-2 sm:ml-4 space-y-1 font-mono text-xs sm:text-sm">
                  <div className="text-white">
                    "role": "<span className="text-purple-400">{exp.role}</span>",
                  </div>
                  <div className="text-white">
                    "company": "<span className="text-green-400">{exp.company}</span>",
                  </div>
                  <div className="text-white">
                    "period": "<span className="text-yellow-400">{exp.period}</span>",
                  </div>
                  <div className="text-white">
                    "status": "
                    <span className={exp.status === "ACTIVE" ? "text-green-400" : "text-blue-400"}>{exp.status}</span>",
                  </div>
                  <div className="text-white">"achievements": [</div>
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="ml-2 sm:ml-4 text-gray-300 text-xs">
                      "{achievement}"{i < exp.achievements.length - 1 ? "," : ""}
                    </div>
                  ))}
                  <div className="text-white">]</div>
                </div>
                <div className="text-blue-400 font-mono text-sm">
                  {" "}
                  {"}"}
                  {index < experience.length - 1 ? "," : ""}
                </div>
              </motion.div>
            ))}
            <div className="text-gray-400 font-mono ml-2 text-xs sm:text-sm">]</div>
            <div className="text-green-400 font-mono text-sm">{"}"}</div>
          </div>
        )

      case "community":
        return (
          <div className="space-y-4">
            <div className="text-green-400 font-mono text-sm">[COMMUNITY.LOG]</div>
            <div className="text-gray-400 font-mono text-xs sm:text-sm"># Leadership & Community Involvement</div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-900/50 border border-green-500/30 rounded p-3 sm:p-4"
            >
              <div className="text-green-400 font-mono text-xs sm:text-sm">
                [2024-PRESENT] APU Blockchain & Crypto Club
              </div>
              <div className="text-white font-mono text-xs sm:text-sm ml-2 sm:ml-4">
                → External Vice President & Ex- Community Department Lead
                <br />→ Liase with external parties for collaborations
                <br />→ Seek Sponsorships for the club activities
                <br />→ Organizing blockchain events & workshops
                <br />→ Building Web3 community at university
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900/50 border border-purple-500/30 rounded p-3 sm:p-4"
            >
              <div className="text-purple-400 font-mono text-xs sm:text-sm">[2024] APU Hacktheles</div>
              <div className="text-white font-mono text-xs sm:text-sm ml-2 sm:ml-4">
                → Event Team Member & Emcee
                <br />→ Hosting hackathon events
                <br />→ Facilitating networking & innovation
              </div>
            </motion.div>

            <div className="text-yellow-400 font-mono text-xs sm:text-sm">HACKATHON PARTICIPATION LOG:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-800/50 border border-yellow-500/20 rounded p-2"
                >
                  <div className="text-yellow-400 font-mono text-xs">✓ {achievement}</div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case "contact":
        return (
          <div className="space-y-4">
            <div className="text-green-400 font-mono text-sm"># Contact Configuration</div>
            <div className="text-gray-400 font-mono text-xs sm:text-sm"># Connect with me through these channels</div>

            <div className="grid grid-cols-1 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-900/50 border border-blue-500/30 rounded p-3 sm:p-4"
              >
                <div className="text-blue-400 font-mono text-xs sm:text-sm mb-2">EMAIL_CONFIG =</div>
                <div className="ml-2 sm:ml-4 space-y-1 font-mono text-xs sm:text-sm">
                  <div className="text-white">
                    personal: "
                    <a href="mailto:leopardjiang03@gmail.com" className="text-green-400 hover:text-green-300">
                      leopardjiang03@gmail.com
                    </a>
                    "
                  </div>
                  <div className="text-white">
                    university: "
                    <a href="mailto:TP068056@mail.apu.edu.my" className="text-green-400 hover:text-green-300">
                      TP068056@mail.apu.edu.my
                    </a>
                    "
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-900/50 border border-purple-500/30 rounded p-3 sm:p-4"
              >
                <div className="text-purple-400 font-mono text-xs sm:text-sm mb-2">SOCIAL_LINKS =</div>
                <div className="ml-2 sm:ml-4 space-y-2 font-mono text-xs sm:text-sm">
                  <div className="text-white flex items-center gap-2">
                    github: "
                    <a
                      href="https://github.com/kteceline"
                      target="_blank"
                      className="text-green-400 hover:text-green-300 flex items-center gap-1"
                      rel="noreferrer"
                    >
                      <Github size={14} />
                      kteceline
                    </a>
                    "
                  </div>
                  <div className="text-white flex items-center gap-2">
                    linkedin: "
                    <a
                      href="https://www.linkedin.com/in/celine-khaw-a1433a237/"
                      target="_blank"
                      className="text-green-400 hover:text-green-300 flex items-center gap-1"
                      rel="noreferrer"
                    >
                      <Linkedin size={14} />
                      celine-khaw
                    </a>
                    "
                  </div>
                   <div className="text-white flex items-center gap-2">
                    X (twitter): "
                    <a
                      href="https://x.com/KhawCeline"
                      target="_blank"
                      className="text-green-400 hover:text-green-300 flex items-center gap-1"
                      rel="noreferrer"
                    >
                      <Twitter size={14} />
                      @KhawCeline
                    </a>
                    "
                  </div>
                   <div className="text-white flex items-center gap-2">
                    Telegram: "
                    <a
                      href="https://t.me/celinekhaw"
                      target="_blank"
                      className="text-green-400 hover:text-green-300 flex items-center gap-1"
                      rel="noreferrer"
                    >
                     
                      @celinekhaw
                    </a>
                    "
                  </div>
                  <div className="text-white flex items-center gap-2">
                    Discord: "
                    <a
                      href="https://t.me/celinekhaw"
                      target="_blank"
                      className="text-green-400 hover:text-green-300 flex items-center gap-1"
                      rel="noreferrer"
                    >
                      
                      KTE,C#8868
                    </a>
                    "
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-900/50 border border-green-500/30 rounded p-3 sm:p-4"
              >
                <div className="text-green-400 font-mono text-xs sm:text-sm mb-2">RESUME_DOWNLOAD =</div>
                <div className="ml-2 sm:ml-4 font-mono text-xs sm:text-sm space-y-2">
                  <div className="text-white flex items-center gap-2">
                    url: "
                    <a
                      href="https://www.canva.com/design/DAGo8KSmEkU/LGt7S8QVuwi294S9aF4SIA/edit?utm_content=DAGo8KSmEkU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                      target="_blank"
                      className="text-green-400 hover:text-green-300 flex items-center gap-1"
                      rel="noreferrer"
                    >
                      <Download size={14} />
                      View Resume
                    </a>
                    "
                  </div>
                  <div className="text-white">
                    phone: "<span className="text-yellow-400">+601139070118</span>"
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <div className="border-b border-green-500/30 p-3 sm:p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-lg font-bold">AI_CONSOLE_v2.1</span>
          </div>
          <div className="text-xs sm:text-sm text-gray-400 hidden sm:block"><ClientDateTime /></div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Mobile Terminal Toggle */}
          <button
            onClick={() => setShowTerminal(!showTerminal)}
            className="sm:hidden flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded border border-green-500/30"
          >
            <Terminal className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded border border-green-500/30"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-green-500/30 bg-gray-900/50">
          <div className="grid grid-cols-2 gap-2 p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setMobileMenuOpen(false)
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded border hover:bg-gray-800/50 transition-colors ${
                  activeTab === tab.id
                    ? "bg-gray-800/50 text-green-400 border-green-500/30"
                    : "text-gray-400 border-gray-600/30"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-xs">{tab.file}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Tabs */}
      <div className="hidden sm:flex border-b border-green-500/30 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 border-r border-green-500/30 hover:bg-gray-900/50 transition-colors whitespace-nowrap ${
              activeTab === tab.id ? "bg-gray-900/50 text-green-400" : "text-gray-400"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm">{tab.label}</span>
            <span className="text-xs text-gray-500">{tab.file}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row h-[calc(100vh-120px)] sm:h-[calc(100vh-120px)]">
        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Terminal Panel - Desktop always visible, Mobile toggleable */}
        <div
          className={`${
            showTerminal ? "block" : "hidden"
          } sm:block w-full sm:w-1/3 border-t sm:border-t-0 sm:border-l border-green-500/30 bg-black/50`}
        >
          <div className="p-3 sm:p-4 border-b border-green-500/30">
            <div className="text-xs sm:text-sm text-green-400">TERMINAL</div>
          </div>
          <div ref={terminalRef} className="h-48 sm:h-64 overflow-y-auto p-3 sm:p-4 space-y-2 text-xs sm:text-sm">
            {terminalHistory.map((entry, index) => (
              <div key={index}>
                <div className="text-green-400">
                  <span className="text-purple-400">celine@portfolio:~$</span> {entry.command}
                </div>
                <div className="ml-2 sm:ml-4">{entry.output}</div>
              </div>
            ))}
            <div className="flex items-center">
              <span className="text-purple-400 text-xs sm:text-sm">celine@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-transparent border-none outline-none text-green-400 ml-2 flex-1 text-xs sm:text-sm"
                placeholder="Type 'help' for commands..."
              />
              <span className="animate-pulse text-green-400">█</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
