"use client"

import { Button } from "@/components/ui/button"
import IPhoneStatusBar from "./iphone-status-bar"
import { useEffect } from "react"
import { useSound } from "@/hooks/use-sound"

interface GameOverScreenProps {
  reason: string
  onRestart: () => void
  score: number
}

export default function GameOverScreen({ reason, onRestart, score }: GameOverScreenProps) {
  const { playSound } = useSound()

  useEffect(() => {
    // Play game over sound
    playSound("gameOver")
  }, [playSound])

  return (
    <div className="flex flex-col h-[600px] font-sans">
      <IPhoneStatusBar />

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-red-600 text-white">
        <div className="animate-spin mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </div>

        <h1 className="text-4xl font-bold mb-6">GAME OVER</h1>

        <div className="mb-8">
          <p className="text-xl mb-4">{reason}</p>
          <p className="text-2xl font-bold">Téléphone confisqué.</p>
          <p className="mt-4">Score: {score} points</p>
        </div>

        <Button
          onClick={onRestart}
          className="bg-white text-red-600 hover:bg-gray-200 px-6 py-3 text-lg rounded-full border-0"
        >
          Réessayer
        </Button>
      </div>

      {/* iPhone home indicator */}
      <div className="h-8 bg-red-600 flex justify-center items-center">
        <div className="w-32 h-1 bg-white rounded-full opacity-70"></div>
      </div>
    </div>
  )
}
