"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Trophy } from "lucide-react"

export default function Clubs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Leadership & Community
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 hover:scale-105 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center font-bold">
                  <Users className="w-6 h-6 mr-3" />
                  APU Blockchain & Crypto Club
                </CardTitle>
                <CardDescription className="text-gray-200 text-lg font-medium">
                  Community Department Lead
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white font-medium">
                  Leading community initiatives and organizing blockchain-related events and workshops for students.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 hover:scale-105 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center font-bold">
                  <Trophy className="w-6 h-6 mr-3" />
                  APU Hacktheles
                </CardTitle>
                <CardDescription className="text-gray-200 text-lg font-medium">
                  Event Team Member & Emcee
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white font-medium">
                  Organizing and hosting hackathon events, facilitating networking and innovation among participants.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
