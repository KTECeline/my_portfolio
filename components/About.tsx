"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const funFacts = [
  { front: "🎮", back: "I've participated in 9+ hackathons!" },
  { front: "🌙", back: "I'm a night owl who codes best after 10 PM" },
  { front: "☕", back: "I drink 4+ cups of nai cha daily" },
  { front: "🎯", back: "I cannot solve a Rubik's cube in under 2 minutes, ngl i cant at all" },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [flippedCards, setFlippedCards] = useState<number[]>([])

  const toggleCard = (index: number) => {
    setFlippedCards((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <>
      {/* About Section */}
      <section id="about" className="py-20 px-4" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-64 sm:w-80 h-64 sm:h-80 mx-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-purple-500/30 hover:scale-105 transition-transform duration-300">
                <div className="w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full overflow-hidden border-2 border-purple-400/50">
                  <img src="/images/celine-profile.jpeg" alt="Celine Khaw" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-lg text-white leading-relaxed font-medium">
                Hey there! 👋 I'm a tech enthusiast and IT student on the lookout for opportunities in the industry. I'm
                all about diving into immersive experiences that let me explore the endless possibilities of technology.
              </p>
              <p className="text-lg text-white leading-relaxed font-medium">
                I've honed diverse skills like customer service, communication, and problem-solving. Put me in a
                fast-paced environment, and watch me thrive—I'm all about embracing new challenges and tech like it's
                second nature.
              </p>

              {/* Fun Facts Flip Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {funFacts.map((fact, index) => (
                  <motion.div
                    key={index}
                    className="relative h-24 cursor-pointer"
                    onClick={() => toggleCard(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className={`absolute inset-0 w-full h-full transition-transform duration-500 preserve-3d ${flippedCards.includes(index) ? "rotate-y-180" : ""}`}
                    >
                      {/* Front */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30 flex items-center justify-center backface-hidden">
                        <span className="text-4xl">{fact.front}</span>
                      </div>
                      {/* Back */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg border border-pink-500/30 flex items-center justify-center backface-hidden rotate-y-180 p-2">
                        <span className="text-white text-sm font-medium text-center">{fact.back}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Education
          </motion.h2>
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30 hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-white font-bold">Asia Pacific University</CardTitle>
                      <CardDescription className="text-gray-200 text-lg font-medium">
                        Degree in Computer Science (Artificial Intelligence)
                      </CardDescription>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-base font-bold">
                      CGPA: 3.66
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-gray-200 font-medium">
                    <Calendar className="w-5 h-5" />
                    <span>Year 2 Semester 1 • 2025 - Present</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30 hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-white font-bold">Asia Pacific University</CardTitle>
                      <CardDescription className="text-gray-200 text-lg font-medium">
                        Diploma in Software Engineering
                      </CardDescription>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-base font-bold">
                      CGPA: 3.74
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-gray-200 font-medium">
                    <Calendar className="w-5 h-5" />
                    <span>2022 - 2024 • 3 months internship</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/20 hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-white font-bold">SMK Assunta</CardTitle>
                  <CardDescription className="text-gray-200 font-medium">Secondary Education</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-gray-200 font-medium">
                    <Calendar className="w-5 h-5" />
                    <span>2017 - 2022</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
