"use client"

import Hero from "@/components/Hero"
import About from "@/components/About"
import Toolbox from "@/components/Toolbox"
import Projects from "@/components/Projects"
import Experience from "@/components/Experience"
import Achievements from "@/components/Achievements"
import Clubs from "@/components/Clubs"
import Contact from "@/components/Contact"
import { useThemeEasterEggs } from "@/hooks/useThemeEasterEggs"
import { useEffect, useState } from "react"

export default function Portfolio() {
  const { activeTheme, lastActivatedCode, availableCodes } = useThemeEasterEggs()
  const [showEasterEggMenu, setShowEasterEggMenu] = useState(false)

  useEffect(() => {
    console.log("Active theme:", activeTheme)
    document.documentElement.setAttribute("data-theme", activeTheme)
  }, [activeTheme])

  const getThemeEmoji = (theme: string) => {
    switch (theme) {
      case "arcade":
        return "🎮"
      case "space":
        return "🚀"
      default:
        return "🎨"
    }
  }

  const getThemeName = (theme: string) => {
    if (theme === "modern") return "Modern"
    return availableCodes[lastActivatedCode as keyof typeof availableCodes]?.name || theme
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Theme Notification */}
      {activeTheme !== "modern" && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/90 text-white px-4 sm:px-6 py-3 rounded-lg border-2 border-current animate-pulse text-center font-bold max-w-xs sm:max-w-none mx-2">
          <div className="text-sm sm:text-lg">
            {getThemeEmoji(activeTheme)} {getThemeName(activeTheme).toUpperCase()} MODE ACTIVATED!{" "}
            {getThemeEmoji(activeTheme)}
          </div>
          <div className="text-xs sm:text-sm mt-1">Press ESC to exit or enter code again to toggle</div>
        </div>
      )}

      {/* Easter Egg Menu Toggle */}
      <button
        onClick={() => setShowEasterEggMenu(!showEasterEggMenu)}
        className="fixed top-4 right-4 z-50 bg-black/50 text-white px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm hover:bg-black/70 transition-colors"
      >
        🎮 Themes
      </button>

      {/* Easter Egg Menu */}
      {showEasterEggMenu && (
        <div className="fixed top-16 right-2 sm:right-4 z-50 bg-black/90 text-white p-3 sm:p-4 rounded-lg border border-gray-600 max-w-xs sm:max-w-sm">
          <h3 className="font-bold mb-3 text-center text-sm sm:text-base">🎮 Secret Theme Codes</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-mono text-gray-300 text-xs">↑↑↓↓←→←→BA</span>
              <span className="text-gray-400">Arcade</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-gray-300">SPACE</span>
              <span className="text-gray-400">Space</span>
            </div>
            <div className="border-t border-gray-600 pt-2 mt-2">
              <div className="text-gray-400 text-center text-xs">Press ESC to exit any theme</div>
            </div>
          </div>
        </div>
      )}

      {/* Debug Info */}
      <div className="fixed bottom-4 left-4 z-50 bg-black/50 text-white px-2 py-1 rounded text-xs">
        Theme: {getThemeEmoji(activeTheme)} {getThemeName(activeTheme)}
      </div>

      {/* Hero Section */}
      <Hero />

      <div className="relative z-10">
        {/* About Section */}
        <About />

        {/* Projects Section */}
        <Projects />

        {/* Experience Section */}
        <Experience />

        {/* Achievements Section */}
        <Achievements />

        {/* Toolbox Section */}
        <Toolbox />

        {/* Clubs & Leadership */}
        <Clubs />

        {/* Contact Section */}
        <Contact />
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black/40 border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-300 font-medium">
            &copy; 2025 Khaw Tze Ern, Celine. Built with passion and code.
            <span className="inline-block w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full ml-2"></span>
          </p>
          <p className="text-gray-400 text-sm mt-2">
            🎮 Try the secret codes! Try Konami codes: ↑↑↓↓←→←→BA. (SPACE also)
            {activeTheme !== "modern" && <span className="text-current ml-2">| Press ESC to exit</span>}
          </p>
        </div>
      </footer>
    </div>
  )
}
