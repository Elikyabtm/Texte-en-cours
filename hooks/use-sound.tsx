"use client"

import { useRef, useEffect, useCallback } from "react"

type SoundType = "notification" | "correct" | "wrong" | "alert" | "victory" | "gameOver"

export function useSound() {
  const soundsRef = useRef<Record<SoundType, HTMLAudioElement | null>>({
    notification: null,
    correct: null,
    wrong: null,
    alert: null,
    victory: null,
    gameOver: null,
  })

  useEffect(() => {
    // Initialize sounds
    if (typeof window !== "undefined") {
      soundsRef.current = {
        notification: new Audio("/sounds/notification.mp3"),
        correct: new Audio("/sounds/correct.mp3"),
        wrong: new Audio("/sounds/wrong.mp3"),
        alert: new Audio("/sounds/alert.mp3"),
        victory: new Audio("/sounds/victory.mp3"),
        gameOver: new Audio("/sounds/game-over.mp3"),
      }

      // Preload sounds
      Object.values(soundsRef.current).forEach((sound) => {
        if (sound) {
          sound.load()
          sound.volume = 0.5
        }
      })
    }

    return () => {
      // Cleanup
      Object.values(soundsRef.current).forEach((sound) => {
        if (sound) {
          sound.pause()
          sound.currentTime = 0
        }
      })
    }
  }, [])

  const playSound = useCallback((type: SoundType) => {
    const sound = soundsRef.current[type]
    if (sound) {
      sound.currentTime = 0
      sound.play().catch((err) => console.error("Error playing sound:", err))
    }
  }, [])

  return { playSound }
}
