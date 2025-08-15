"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const toolboxData = {
  "Programming & Development": [
    {
      name: "Python",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg",
      level: 90,
      description: "Advanced scripting and AI development",
    },
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg",
      level: 85,
      description: "Modern ES6+ and frameworks",
    },
    {
      name: "PHP",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/php.svg",
      level: 80,
      description: "Server-side development",
    },
    {
      name: "HTML/CSS",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/html5.svg",
      level: 90,
      description: "Responsive design and animations",
    },
    {
      name: "MySQL",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mysql.svg",
      level: 85,
      description: "Database design and optimization",
    },
    {
      name: "R",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/r.svg",
      level: 70,
      description: "Statistical analysis and data science",
    },
    {
      name: "Laravel",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/laravel.svg",
      level: 85,
      description: "PHP web application framework",
    },
    {
      name: "Next.js",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg",
      level: 85,
      description: "Full-stack React framework",
    },
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg",
      level: 80,
      description: "Backend JavaScript runtime",
    },
    {
      name: "Git/GitHub/GitLab",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/git.svg",
      level: 88,
      description: "Version control and collaboration",
    },
    {
      name: "Azure",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoftazure.svg",
      level: 75,
      description: "Cloud computing platform",
    },
    {
      name: "Google Cloud",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/googlecloud.svg",
      level: 70,
      description: "Cloud services and deployment",
    },
  ],
  "Frameworks & Tools": [
    {
      name: "Figma",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/figma.svg",
      level: 80,
      description: "UI/UX design and prototyping",
    },
    {
      name: "Canva",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/canva.svg",
      level: 85,
      description: "Graphic design and content creation",
    },
    {
      name: "Visual Studio Code",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/visualstudiocode.svg",
      level: 95,
      description: "Primary development environment",
    },
    {
      name: "Microsoft Office 365",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoftoffice.svg",
      level: 90,
      description: "Productivity and documentation",
    },
  ],
  "Blockchain & Web3": [
    {
      name: "Anchor",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/anchor.svg",
      level: 70,
      description: "Solana development framework",
    },
    {
      name: "ELIZA OS",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/ethereum.svg",
      level: 75,
      description: "AI agent framework",
    },
    {
      name: "Smart Contract Development",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/ethereum.svg",
      level: 75,
      description: "Ethereum and Solana smart contracts",
    },
    {
      name: "Solidity",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/ethereum.svg",
      level: 75,
      description: "Smart contract programming language",
    },
  ],
}

export default function Toolbox() {
  const [activeTab, setActiveTab] = useState<keyof typeof toolboxData>("Programming & Development")
  const [selectedTool, setSelectedTool] = useState<any>(null)
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

  return (
    <section id="toolbox" className="py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-white">My Toolbox</h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(toolboxData).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category as keyof typeof toolboxData)}
              className={`px-6 py-2 rounded-full border ${
                activeTab === category ? "bg-purple-500/50 text-white" : "bg-gray-800 text-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Animated Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
          >
            {toolboxData[activeTab].map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative flex flex-col items-center bg-gradient-to-br from-purple-800/50 to-pink-800/50 
                           border border-purple-500/20 rounded-lg p-3 sm:p-4 shadow-lg 
                           hover:scale-110 hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/20
                           transition-all duration-300 group cursor-pointer min-h-[100px] sm:min-h-[120px]"
                onClick={() => setSelectedTool(selectedTool?.name === tool.name ? null : tool)}
                onMouseEnter={() => setHoveredTool(tool.name)}
                onMouseLeave={() => setHoveredTool(null)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Skill Level Ring */}
                <div className="relative mb-2">
                  <img src={tool.logo || "/placeholder.svg"} alt={tool.name} className="w-12 h-12 relative z-10" />
                  <svg
                    className="absolute inset-0 w-16 h-16 transform -rotate-90 -translate-x-2 -translate-y-2"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="3" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                      animate={{
                        strokeDashoffset: 2 * Math.PI * 45 * (1 - tool.level / 100),
                      }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Level Badge */}
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {tool.level}
                  </div>
                </div>

                <span className="text-white text-sm font-medium text-center group-hover:text-purple-200 transition-colors">
                  {tool.name}
                </span>

                {/* Hover Tooltip */}
                {hoveredTool === tool.name && (
                  <motion.div
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/90 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-20 max-w-48"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    {tool.description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
                  </motion.div>
                )}

                {/* Selected State */}
                {selectedTool?.name === tool.name && (
                  <motion.div
                    className="absolute inset-0 border-2 border-purple-400 rounded-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Selected Tool Details */}
        {selectedTool && (
          <motion.div
            className="mt-8 p-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <img src={selectedTool.logo || "/placeholder.svg"} alt={selectedTool.name} className="w-8 h-8" />
              <h3 className="text-xl font-bold text-white">{selectedTool.name}</h3>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                Level {selectedTool.level}
              </div>
            </div>
            <p className="text-gray-300">{selectedTool.description}</p>

            {/* Skill Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Proficiency</span>
                <span>{selectedTool.level}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedTool.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
