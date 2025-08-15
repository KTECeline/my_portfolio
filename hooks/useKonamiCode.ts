"use client"

import { useState, useEffect } from "react"

const KONAMI_CODE = [
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
]

export function useKonamiCode() {
  const [isArcadeMode, setIsArcadeMode] = useState(false)
  const [keySequence, setKeySequence] = useState<string[]>([])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // ESC key to exit arcade mode
      if (event.code === "Escape" && isArcadeMode) {
        console.log("🎮 ARCADE MODE DEACTIVATED!")
        setIsArcadeMode(false)
        setKeySequence([])
        return
      }

      console.log("Key pressed:", event.code) // Debug log

      setKeySequence((prev) => {
        const newSequence = [...prev, event.code].slice(-KONAMI_CODE.length)

        console.log("Current sequence:", newSequence) // Debug log

        if (
          newSequence.length === KONAMI_CODE.length &&
          newSequence.every((key, index) => key === KONAMI_CODE[index])
        ) {
          const newArcadeMode = !isArcadeMode
          console.log(newArcadeMode ? "🎮 KONAMI CODE ACTIVATED!" : "🎮 KONAMI CODE DEACTIVATED!") // Debug log
          setIsArcadeMode(newArcadeMode)

          // Play a fun sound effect (optional)
          try {
            const audio = new Audio(
              "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
            )
            audio.play().catch(() => {}) // Ignore errors if audio fails
          } catch (e) {
            console.log("Audio failed to play")
          }

          // Clear the sequence after activation
          return []
        }

        return newSequence
      })
    }

    console.log("Konami code listener attached") // Debug log
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      console.log("Konami code listener removed") // Debug log
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isArcadeMode]) // Add isArcadeMode as dependency

  return isArcadeMode
}
