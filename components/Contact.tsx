"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Mail, Phone, Linkedin } from "lucide-react"
import Link from "next/link"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="py-20 px-4 bg-black/20" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <motion.div
              className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20 hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Mail className="w-6 h-6 text-purple-400" />
              <div>
                <p className="text-white font-bold">leopardjiang03@gmail.com</p>
                <p className="text-gray-300 text-sm">Personal Email</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20 hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Mail className="w-6 h-6 text-purple-400" />
              <div>
                <p className="text-white font-bold">TP068056@mail.apu.edu.my</p>
                <p className="text-gray-300 text-sm">University Email</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20 hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Phone className="w-6 h-6 text-purple-400" />
              <div>
                <p className="text-white font-bold">+601139070118</p>
                <p className="text-gray-300 text-sm">Mobile</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20 hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Linkedin className="w-6 h-6 text-purple-400" />
              <div>
                <p className="text-white font-bold">
                  <Link
                    href="https://www.linkedin.com/in/celine-khaw-a1433a237/"
                    target="_blank"
                    className="hover:text-purple-300 transition-colors"
                  >
                    linkedin.com/in/celine-khaw-a1433a237
                  </Link>
                </p>
                <p className="text-gray-300 text-sm">LinkedIn Profile</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Reference</h3>
            <div>
              <p className="text-white font-bold">Jeffrey Jessely Sijore</p>
              <p className="text-gray-300 font-medium">jeffrey.sijore@apu.edu.my</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
