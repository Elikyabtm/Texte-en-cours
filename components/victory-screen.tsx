"use client"

import { Button } from "@/components/ui/button"
import IPhoneStatusBar from "./iphone-status-bar"
import { useEffect } from "react"
import { useSound } from "@/hooks/use-sound"
import { saveScore } from "@/lib/scores"
import ScoreBoard from "./score-board"

interface VictoryScreenProps {
  score: number
  onRestart: () => void
}

export default function VictoryScreen({ score, onRestart }: VictoryScreenProps) {
  const { playSound } = useSound()

  useEffect(() => {
    // Play victory sound
    playSound("victory")

    // Save score
    saveScore(score)
  }, [playSound, score])

  return (
    <div className="flex flex-col h-[600px] font-sans">
      <IPhoneStatusBar />

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-green-600 text-white">
        <div className="animate-bounce mb-4">
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
            <path d="M8 11V5a4 4 0 0 1 8 0v6M4 11h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1z" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold mb-6">VICTOIRE !</h1>

        <div className="mb-8">
          <p className="text-xl mb-4">T&apos;as survécu à 45 minutes de cours sans te faire griller.</p>
          <p className="text-2xl font-bold">Championne de la discrétion.</p>
          <p className="mt-4 text-3xl font-bold">Score: {score} points</p>
        </div>

        <ScoreBoard currentScore={score} />

        <Button
          onClick={onRestart}
          className="bg-white text-green-600 hover:bg-gray-200 px-6 py-3 text-lg rounded-full border-0"
        >
          Rejouer
        </Button>
      </div>

      {/* iPhone home indicator */}
      <div className="h-8 bg-green-600 flex justify-center items-center">
        <div className="w-32 h-1 bg-white rounded-full opacity-70"></div>
      </div>
    </div>
  )
}
