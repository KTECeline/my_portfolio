"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const achievements = [
  { name: "Solana Hackfest 2024", type: "Hackathon", year: "2024" },
  { name: "DevCon 2024, ETH Bangkok", type: "Conference", year: "2024" },
  { name: "Cisco Networking Certificate", type: "Certification", year: "2024" },
  { name: "Math Galactica 2023 - Quantum Quest", type: "Competition", year: "2023" },
  { name: "ImaGINEHACK 2024 (Taylor's)", type: "Hackathon", year: "2024" },
  { name: "Internal APU CTF 2024", type: "Competition", year: "2024" },
  { name: "University Future of Blockchain Hackathon 2025", type: "Hackathon", year: "2025" },
  { name: "Agentic Ethereum 2025 (ETHGlobal)", type: "Hackathon", year: "2025" },
  { name: "Breakout SOLANA/ MEGAHACK 2025", type: "Hackathon", year: "2025" },
]

const filterTypes = ["All", "Hackathon", "Conference", "Certification", "Competition"]

export default function Achievements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [achievementFilter, setAchievementFilter] = useState("All")

  const filteredAchievements =
    achievementFilter === "All"
      ? achievements
      : achievements.filter((achievement) => achievement.type === achievementFilter)

  return (
    <section className="py-20 px-4 bg-black/20" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Certificates & Achievements
        </motion.h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {filterTypes.map((type, index) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Button
                variant={achievementFilter === type ? "default" : "outline"}
                size="sm"
                onClick={() => setAchievementFilter(type)}
                className={`${
                  achievementFilter === type
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
                    : "border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
                } transition-all duration-300 hover:scale-105 font-medium`}
              >
                {type}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/20 hover:scale-105 hover:border-purple-400/50 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge
                      className={`${
                        achievement.type === "Hackathon"
                          ? "bg-purple-500/20 text-white"
                          : achievement.type === "Certification"
                            ? "bg-green-500/20 text-white"
                            : achievement.type === "Conference"
                              ? "bg-blue-500/20 text-white"
                              : "bg-orange-500/20 text-white"
                      } border-0 font-medium text-base`}
                    >
                      {achievement.type}
                    </Badge>
                    <span className="text-gray-200 text-sm font-medium">{achievement.year}</span>
                  </div>
                  <CardTitle className="text-white group-hover:text-purple-200 transition-colors duration-300 font-bold">
                    {achievement.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
