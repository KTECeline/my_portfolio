"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const toolboxData = {
  "Programming & Development": [
    { name: "Python", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg" },
    { name: "PHP", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/php.svg" },
    { name: "HTML/CSS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/html5.svg" },
    { name: "MySQL", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mysql.svg" },
    { name: "R", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/r.svg" },
    { name: "Laravel", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/laravel.svg" },
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg" },
    { name: "Git/GitHub/GitLab", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/git.svg" },
    { name: "Azure", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoftazure.svg" },
    { name: "Google Cloud", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/googlecloud.svg" },
  ],
  "Frameworks & Tools": [
    { name: "Figma", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/figma.svg" },
    { name: "Canva", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/canva.svg" },
    { name: "Visual Studio Code", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/visualstudiocode.svg" },
    { name: "Microsoft Office 365", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoftoffice.svg" },
  ],
  "Blockchain & Web3": [
    { name: "Anchor", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/anchor.svg" },
    { name: "ELIZA OS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/ethereum.svg" },
    { name: "Smart Contract Development", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/ethereum.svg" },
    { name: "Solidity", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/ethereum.svg" },
  ],
};

export default function Toolbox() {
  const [activeTab, setActiveTab] = useState<keyof typeof toolboxData>(
    "Programming & Development"
  );

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
                activeTab === category
                  ? "bg-purple-500/50 text-white"
                  : "bg-gray-800 text-gray-300"
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
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
          >
            {toolboxData[activeTab].map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-center bg-gradient-to-br from-purple-800/50 to-pink-800/50 
             border border-purple-500/20 rounded-lg p-4 shadow-lg 
             hover:scale-105 hover:border-purple-400/50 
             transition-all duration-300 group"
>
                <img src={tool.logo} alt={tool.name} className="w-12 h-12 mb-2" />
                <span className="text-white text-sm font-medium text-center">
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
