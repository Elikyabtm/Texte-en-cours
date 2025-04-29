"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import GameScreen from "@/components/game-screen"
import IntroScreen from "@/components/intro-screen"
import GameOverScreen from "@/components/game-over-screen"
import VictoryScreen from "@/components/victory-screen"
import { levelData } from "@/data/game-data"

export default function Home() {
  const [gameState, setGameState] = useState<"intro" | "playing" | "gameOver" | "victory">("intro")
  const [currentLevel, setCurrentLevel] = useState(1)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [gameOverReason, setGameOverReason] = useState("")

  const startGame = () => {
    setGameState("playing")
    setCurrentLevel(1)
    setCurrentMessageIndex(0)
    setScore(0)
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (!isCorrect) {
      setGameOverReason("Mauvaise réponse ! Le prof t'a repéré.")
      setGameState("gameOver")
      return
    }

    // Calculate points for this message
    const currentLevelData = levelData.find((level) => level.id === currentLevel)
    if (!currentLevelData) return

    const currentMessage = currentLevelData.messages[currentMessageIndex]
    const points = currentMessage.points || 1

    setScore(score + points)

    // Move to next message or level
    if (currentMessageIndex < currentLevelData.messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1)
    } else {
      // End of level
      if (currentLevel < 3) {
        setCurrentLevel(currentLevel + 1)
        setCurrentMessageIndex(0)
      } else {
        // Game completed
        setGameState("victory")
      }
    }
  }

  const handleTimeout = () => {
    setGameOverReason("Trop lent ! Le prof s'est retourné.")
    setGameState("gameOver")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md mx-auto overflow-hidden shadow-xl rounded-3xl">
        {gameState === "intro" && <IntroScreen onStart={startGame} />}

        {gameState === "playing" && (
          <GameScreen
            level={currentLevel}
            messageIndex={currentMessageIndex}
            onAnswer={handleAnswer}
            onTimeout={handleTimeout}
          />
        )}

        {gameState === "gameOver" && <GameOverScreen reason={gameOverReason} onRestart={startGame} score={score} />}

        {gameState === "victory" && <VictoryScreen score={score} onRestart={startGame} />}
      </Card>
    </main>
  )
}
