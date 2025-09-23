"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    title: "Agent Royale AI",
    description:
      "AI Trading Game with ELIZA OS integration featuring intelligent agents and real-time trading simulation",
    tech: ["ELIZA OS", "AI", "Trading", "JavaScript"],
    link: "https://agent-royale-ai.vercel.app/",
    emoji: "🤖",
    featured: true,
    role: "Full Stack Developer",
    demoGif: "https://placehold.co/300x200?text=Agent+Royale+Demo",
  },
  {
    title: "AI-Powered Liquidity Pool Advisor",
    description: "Advanced DeFi analytics tool for optimizing liquidity pool strategies in the Ethereum ecosystem",
    tech: ["AI", "DeFi", "Blockchain", "Frontend", "Integration"],
    link: "https://ethglobal-agentic.vercel.app/",
    emoji: "💧",
    featured: true,
    role: "Frontend Developer",
    demoGif: "https://placehold.co/300x200?text=DeFi+Advisor+Demo",
  },
  {
    title: "NFT Marketplace",
    description: "Decentralized NFT trading platform with Solidity smart contracts backend",
    tech: ["Solidity", "Blockchain", "Web3", "Smart Contracts"],
    link: "https://encode-hackathon-ten.vercel.app/",
    emoji: "🖼️",
    featured: true,
    role: "Blockchain Developer",
    demoGif: "https://placehold.co/300x200?text=NFT+Marketplace+Demo",
  },
  {
    title: "Budget AI Advisor",
    description: "Intelligent financial guidance system built with Node.js and Gemini 1.5 Pro API",
    tech: ["Node.js", "Gemini API", "AI", "Financial Tech"],
    emoji: "💰",
    featured: false,
    role: "Backend Developer",
    demoGif: "https://placehold.co/300x200?text=Budget+AI+Demo",
  },
  {
    title: "QuantTrading Backtest System",
    description: "Comprehensive quantitative trading and backtesting mechanism for financial analysis",
    tech: ["Python", "Trading", "Analytics", "Finance"],
    emoji: "📈",
    featured: false,
    role: "Data Scientist",
    demoGif: "https://placehold.co/300x200?text=QuantTrading+Demo",
  },
  {
    title: "Asset Management System",
    description: "Internal Laravel application for comprehensive company asset allocation management",
    tech: ["Laravel", "PHP", "MySQL", "Enterprise"],
    emoji: "📊",
    featured: false,
    role: "Full Stack Developer",
    demoGif: "https://placehold.co/300x200?text=Asset+Management+Demo",
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <section id="projects" className="py-20 px-4 bg-black/20" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>

        {/* Featured Projects */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects
            .filter((p) => p.featured)
            .map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                onMouseEnter={() => setHoveredProject(project.title)}
                onMouseLeave={() => setHoveredProject(null)}
                className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group h-full overflow-hidden p-6 rounded-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <motion.span
                      className="text-3xl"
                      animate={hoveredProject === project.title ? { rotate: 360, scale: 1.2 } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {project.emoji}
                    </motion.span>
                    <span className="text-white group-hover:text-purple-200 transition-colors duration-300 font-bold text-xl">
                      {project.title}
                    </span>
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-400 hover:text-pink-300 hover:bg-pink-500/20 p-2 rounded-full"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <motion.div
                  className="relative overflow-hidden rounded-lg mb-4"
                  initial={{ height: 0, opacity: 0 }}
                  animate={
                    hoveredProject === project.title ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={project.demoGif || "/placeholder.svg"}
                    alt={`${project.title} demo`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </motion.div>
                <p className="text-white mb-4 group-hover:text-gray-200 transition-colors duration-300 font-medium">
                  {project.description}
                </p>
                <div className="mb-4 text-emerald-300 text-sm">
                  👨‍💻 {project.role}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className="bg-purple-500/20 text-white border border-purple-500/30 px-2 py-1 rounded font-medium text-xs"
                      style={{ display: 'inline-block' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>

        {/* Other Projects */}
        <motion.h3
          className="text-2xl font-bold text-center my-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Other Projects
        </motion.h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects
            .filter((p) => !p.featured)
            .map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + 0.1 * index }}
                onMouseEnter={() => setHoveredProject(project.title)}
                onMouseLeave={() => setHoveredProject(null)}
                className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/20 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group h-full p-6 rounded-lg"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <motion.span
                    className="text-2xl"
                    animate={hoveredProject === project.title ? { rotate: 360, scale: 1.1 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {project.emoji}
                  </motion.span>
                  <span className="text-white group-hover:text-purple-200 transition-colors duration-300 font-bold">
                    {project.title}
                  </span>
                </div>
                <p className="text-white mb-4 group-hover:text-gray-200 transition-colors duration-300 font-medium">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-purple-500/20 text-white border border-purple-500/30 px-2 py-1 rounded font-medium text-xs"
                      style={{ display: 'inline-block' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  )
}
