"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { levelData } from "@/data/game-data"
import IPhoneStatusBar from "./iphone-status-bar"
import { useSound } from "@/hooks/use-sound"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getContactInfo } from "@/data/contacts"
import { AlertTriangle } from "lucide-react"

interface GameScreenProps {
  level: number
  messageIndex: number
  onAnswer: (isCorrect: boolean) => void
  onTimeout: () => void
}

export default function GameScreen({ level, messageIndex, onAnswer, onTimeout }: GameScreenProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const messageContainerRef = useRef<HTMLDivElement>(null)

  const { playSound } = useSound()

  const currentLevel = levelData.find((l) => l.id === level)
  const currentMessage = currentLevel?.messages[messageIndex]
  const contact = getContactInfo(currentMessage?.contactId || "default")

  // Reset timer when message changes
  useEffect(() => {
    if (!currentLevel) return

    // Show typing indicator first
    setIsTyping(true)
    setIsAnimating(true)

    // Play notification sound
    playSound("notification")

    // Simulate phone vibration
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(200)
    }

    // Simulate typing
    const typingTimer = setTimeout(() => {
      setIsTyping(false)
      setTimeLeft(currentLevel.timeToAnswer)

      // Animation delay before starting timer
      const animationTimer = setTimeout(() => {
        setIsAnimating(false)

        // Start countdown
        if (timerRef.current) clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              if (timerRef.current) clearInterval(timerRef.current)
              onTimeout()
              return 0
            }

            // Show warning when time is running out
            if (prev === 2) {
              setShowAlert(true)
              setTimeout(() => setShowAlert(false), 500)
              playSound("alert")
            }

            return prev - 1
          })
        }, 1000)
      }, 500) // 0.5 second for message animation

      return () => {
        clearTimeout(animationTimer)
      }
    }, 1500) // 1.5 seconds for typing animation

    return () => {
      clearTimeout(typingTimer)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [level, messageIndex, currentLevel, onTimeout, playSound])

  // Scroll to bottom when new message appears
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
    }
  }, [isAnimating, isTyping])

  const handleChoiceClick = (choiceIndex: number) => {
    if (timerRef.current) clearInterval(timerRef.current)

    if (!currentMessage) return

    const isCorrect = currentMessage.correctAnswers.includes(choiceIndex)

    // Play sound based on answer correctness
    playSound(isCorrect ? "correct" : "wrong")

    onAnswer(isCorrect)
  }

  if (!currentLevel || !currentMessage) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col h-[600px] relative bg-[#f2f2f7] font-sans">
      {/* iPhone status bar */}
      <IPhoneStatusBar />

      {/* Level indicator */}
      <div className="bg-white text-black p-2 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={() => {}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Button>
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2" style={{ backgroundColor: contact.color || "#64748b", color: "white" }}>
              <AvatarFallback>{contact.initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium">{contact.name}</div>
              {isTyping && <div className="text-xs text-gray-500">en train d'écrire...</div>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${timeLeft > 2 ? "bg-green-500" : "bg-red-500 animate-pulse"}`}></div>
          <div className="text-sm">{timeLeft}s</div>
        </div>
      </div>

      {/* Message area */}
      <div ref={messageContainerRef} className="flex-1 p-4 overflow-y-auto flex flex-col bg-gray-50">
        {/* Previous messages for context */}
        {messageIndex > 0 &&
          currentLevel.messages.slice(Math.max(0, messageIndex - 2), messageIndex).map((prevMsg, idx) => (
            <div key={idx} className="bg-[#e9e9eb] rounded-2xl p-3 self-start max-w-[80%] mb-4 opacity-70">
              <p className="text-black text-sm">{prevMsg.text}</p>
              <p className="text-[10px] text-gray-500 mt-1">Il y a {(messageIndex - idx) * 2} min</p>
            </div>
          ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="self-start bg-[#e9e9eb] rounded-2xl p-3 px-4 mb-4 flex items-center">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {/* Current message */}
        {!isTyping && (
          <div
            className={`bg-[#e9e9eb] rounded-2xl p-3 self-start max-w-[80%] mb-4 transform transition-all duration-500 ${
              isAnimating ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            <p className="text-black text-sm">{currentMessage.text}</p>
            <p className="text-[10px] text-gray-500 mt-1">Maintenant</p>
          </div>
        )}
      </div>

      {/* Answer choices - iPhone message style */}
      <div className="p-4 bg-[#f2f2f7] space-y-2">
        {currentMessage.choices.map((choice, index) => (
          <Button
            key={index}
            onClick={() => handleChoiceClick(index)}
            className="w-full justify-start text-left rounded-2xl py-3 px-4 text-sm bg-[#007aff] hover:bg-[#0063cc] text-white border-0 transition-all duration-200 active:scale-95"
            disabled={isAnimating || isTyping}
          >
            {choice}
          </Button>
        ))}
      </div>

      {/* iPhone home indicator */}
      <div className="h-8 bg-[#f2f2f7] flex justify-center items-center">
        <div className="w-32 h-1 bg-gray-400 rounded-full"></div>
      </div>

      {/* Alert overlay when time is running out */}
      {showAlert && (
        <div className="absolute inset-0 bg-red-500 bg-opacity-30 flex items-center justify-center animate-pulse pointer-events-none">
          <div className="bg-white p-4 rounded-xl flex items-center gap-2">
            <AlertTriangle className="text-red-500" />
            <span className="font-bold">Le prof regarde !</span>
          </div>
        </div>
      )}
    </div>
  )
}
