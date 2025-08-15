"use client"

import { useState, useEffect } from "react"

const EASTER_EGG_CODES = {
  // Konami Code - Arcade Theme
  ARCADE: {
    sequence: [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "KeyB",
      "KeyA",
    ],
    name: "Arcade",
    description: "Retro arcade vibes with rainbow background",
  },
  // Space Theme - S P A C E
  SPACE: {
    sequence: ["KeyS", "KeyP", "KeyA", "KeyC", "KeyE"],
    name: "Space",
    description: "Cosmic theme with stars and nebula effects",
  },
}

export function useThemeEasterEggs() {
  const [activeTheme, setActiveTheme] = useState<string>("modern")
  const [keySequence, setKeySequence] = useState<string[]>([])
  const [lastActivatedCode, setLastActivatedCode] = useState<string | null>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // ESC key to exit any special theme
      if (event.code === "Escape" && activeTheme !== "modern") {
        console.log("🎮 THEME DEACTIVATED!")
        setActiveTheme("modern")
        setKeySequence([])
        setLastActivatedCode(null)
        return
      }

      console.log("Key pressed:", event.code)

      setKeySequence((prev) => {
        const newSequence = [...prev, event.code].slice(-10) // Keep last 10 keys

        // Check each easter egg code
        for (const [codeKey, codeData] of Object.entries(EASTER_EGG_CODES)) {
          const { sequence, name } = codeData
          const relevantSequence = newSequence.slice(-sequence.length)

          if (
            relevantSequence.length === sequence.length &&
            relevantSequence.every((key, index) => key === sequence[index])
          ) {
            const themeKey = codeKey.toLowerCase()

            // Toggle theme (turn off if already active, turn on if different)
            if (activeTheme === themeKey) {
              console.log(`🎮 ${name.toUpperCase()} THEME DEACTIVATED!`)
              setActiveTheme("modern")
              setLastActivatedCode(null)
            } else {
              console.log(`🎮 ${name.toUpperCase()} THEME ACTIVATED!`)
              setActiveTheme(themeKey)
              setLastActivatedCode(codeKey)
            }

            // Play sound effect
            try {
              const audio = new Audio(
                "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
              )
              audio.play().catch(() => {})
            } catch (e) {
              console.log("Audio failed to play")
            }

            return []
          }
        }

        return newSequence
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeTheme])

  return {
    activeTheme,
    lastActivatedCode,
    availableCodes: EASTER_EGG_CODES,
  }
}
