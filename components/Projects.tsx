"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
              >
                <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group h-full overflow-hidden">
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <motion.span
                          className="text-3xl"
                          animate={hoveredProject === project.title ? { rotate: 360, scale: 1.2 } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          {project.emoji}
                        </motion.span>
                        <CardTitle className="text-white group-hover:text-purple-200 transition-colors duration-300 font-bold text-xl">
                          {project.title}
                        </CardTitle>
                      </div>
                      {project.link && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-pink-400 hover:text-pink-300 hover:bg-pink-500/20"
                          asChild
                        >
                          <Link href={project.link} target="_blank">
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </Button>
                      )}
                    </div>

                    {/* Demo GIF that appears on hover */}
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
                  </CardHeader>

                  <CardContent>
                    <p className="text-white mb-4 group-hover:text-gray-200 transition-colors duration-300 font-medium">
                      {project.description}
                    </p>

                    {/* Animated Role Badge */}
                    <motion.div
                      className="mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={hoveredProject === project.title ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-emerald-300 border-emerald-500/30 font-medium">
                        👨‍💻 {project.role}
                      </Badge>
                    </motion.div>

                    {/* Tech Stack with Animation */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={
                            hoveredProject === project.title ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 0.9 }
                          }
                          transition={{ duration: 0.2, delay: techIndex * 0.05 }}
                        >
                          <Badge className="bg-purple-500/20 text-white border-purple-500/30 hover:bg-purple-500/30 transition-colors duration-300 font-medium">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
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
              >
                <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/20 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <motion.span
                        className="text-2xl"
                        animate={hoveredProject === project.title ? { rotate: 360, scale: 1.1 } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {project.emoji}
                      </motion.span>
                      <CardTitle className="text-white group-hover:text-purple-200 transition-colors duration-300 font-bold">
                        {project.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white mb-4 group-hover:text-gray-200 transition-colors duration-300 font-medium">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          className="bg-purple-500/20 text-white border-purple-500/30 hover:bg-purple-500/30 transition-colors duration-300 font-medium"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  )
}
