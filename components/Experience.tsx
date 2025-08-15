"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    title: "Software Engineer Intern",
    company: "SoftWare International",
    period: "Oct 2024 - Jan 2025 (3 months)",
    description:
      "Built internal Laravel application for asset allocation management, improving company efficiency by 40%",
    current: false,
  },
  {
    title: "Part Time Translator",
    company: "EndlessFantasy Translation",
    period: "Oct 2021 - Jan 2024",
    description: "Translated technical documents and content, maintaining 99% accuracy rate",
    current: false,
  },
  {
    title: "Part Time Customer Service",
    company: "Wereg Properties",
    period: "June - Aug 2022",
    description: "Provided excellent customer support and resolved client inquiries efficiently",
    current: false,
  },
  {
    title: "Part Time Coach",
    company: "EyeLevel Bukit Jalil",
    period: "June - Aug 2022",
    description: "Mentored students in mathematics and problem-solving techniques",
    current: false,
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h2>
        <div className="relative">
          <div className="border-l-4 border-purple-500 absolute h-full left-4 sm:left-6 top-0"></div>
          <div className="space-y-12 ml-8 sm:ml-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <motion.div
                  className="absolute -left-5 sm:-left-7 top-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-4 border-purple-900"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                ></motion.div>
                <div
                  className={`bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30 p-4 sm:p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 ${
                    exp.current ? "ring-2 ring-purple-400" : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl text-white font-bold flex flex-col sm:flex-row sm:items-center gap-2">
                        {exp.title}
                        {exp.current && (
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium w-fit">
                            Current
                          </Badge>
                        )}
                      </h3>
                      <p className="text-gray-200 text-base sm:text-lg font-medium">{exp.company}</p>
                    </div>
                    <Badge className="bg-purple-500/20 text-white border-purple-500/30 font-medium text-sm sm:text-base w-fit">
                      {exp.period}
                    </Badge>
                  </div>
                  <p className="text-white font-medium mt-2 text-sm sm:text-base">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
