"use client"

import { Button } from "@/components/ui/button"
import { Github, Mail, Linkedin, ChevronDown, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { getTimeBasedGreeting } from "@/utils/greeting"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [greeting, setGreeting] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
    setGreeting(getTimeBasedGreeting())
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        setMousePosition({
          x: (e.clientX - centerX) / 20,
          y: (e.clientY - centerY) / 20,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Celine Khaw
            </h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300 relative group text-base font-medium"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            {/* Mobile Navigation Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${mobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"}`}
                  ></span>
                  <span
                    className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                  ></span>
                  <span
                    className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${mobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"}`}
                  ></span>
                </div>
              </button>
            </div>

            {/* Desktop Resume Button */}
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
              asChild
            >
              <Link
                href="https://www.canva.com/design/DAGo8KSmEkU/LGt7S8QVuwi294S9aF4SIA/edit?utm_content=DAGo8KSmEkU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                target="_blank"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Resume
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-lg font-medium py-2"
                  >
                    {item}
                  </a>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent w-fit"
                  asChild
                >
                  <Link
                    href="https://www.canva.com/design/DAGo8KSmEkU/LGt7S8QVuwi294S9aF4SIA/edit?utm_content=DAGo8KSmEkU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                    target="_blank"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Resume
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section id="home" ref={heroRef} className="min-h-screen flex items-center justify-center relative z-10 px-4">
        <div className="text-center max-w-6xl mx-auto">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {/* 3D Interactive Object */}
            <motion.div
              className="mb-8 flex justify-center"
              style={{
                transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              <div className="w-32 h-32 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl transform rotate-12 animate-pulse"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-purple-600/50 to-pink-600/50 rounded-lg flex items-center justify-center">
                  <div className="text-4xl">💻</div>
                </div>
              </div>
            </motion.div>

            {/* Time-based Greeting */}
            <motion.p
              className="text-lg text-purple-300 mb-4 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {greeting}
            </motion.p>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Khaw Tze Ern, Celine
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-4 font-semibold tracking-wide">
              Computer Science (AI) Student | Software Engineer Intern | Web3 & AI Enthusiast
            </p>
            <p className="text-base sm:text-lg text-gray-200 mb-8 max-w-2xl mx-auto font-medium px-4">
              "Exploring the edges of AI, blockchain, and software to shape tomorrow."
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-12 px-4">
              <Button
                variant="outline"
                size="lg"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white hover:scale-105 transition-all duration-300 bg-transparent"
                asChild
              >
                <Link href="https://github.com/kteceline" target="_blank">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white hover:scale-105 transition-all duration-300 bg-transparent"
                asChild
              >
                <Link href="mailto:leopardjiang03@gmail.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Email
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white hover:scale-105 transition-all duration-300 bg-transparent"
                asChild
              >
                <Link href="https://www.linkedin.com/in/celine-khaw-a1433a237/" target="_blank">
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </Link>
              </Button>
            </div>
          </div>
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto text-purple-400" />
          </div>
        </div>
      </section>
    </>
  )
}
