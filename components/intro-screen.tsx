"use client"

import { Button } from "@/components/ui/button"
import IPhoneStatusBar from "./iphone-status-bar"

interface IntroScreenProps {
  onStart: () => void
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="flex flex-col h-[600px] bg-black text-white font-sans">
      <IPhoneStatusBar />

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl font-bold mb-8">Textos en Cours</h1>

        <div className="space-y-6 mb-12">
          <p className="text-xl opacity-0 animate-[fadeIn_2s_ease-in_forwards]">
            T&apos;es en cours. Ton téléphone vibre.
          </p>
          <p className="text-xl opacity-0 animate-[fadeIn_2s_ease-in_0.5s_forwards]">
            Tu sais que t&apos;as 5 secondes pour répondre...
          </p>
          <p className="text-xl opacity-0 animate-[fadeIn_2s_ease-in_1s_forwards]">sinon le prof se retourne.</p>
        </div>

        <Button
          onClick={onStart}
          className="bg-[#007aff] text-white hover:bg-[#0063cc] px-8 py-4 text-lg animate-pulse rounded-full border-0"
        >
          Appuie pour commencer
        </Button>

        <div className="mt-8 text-sm opacity-70">
          <p>Réponds vite et discrètement aux messages.</p>
          <p>Choisis la réponse la plus safe pour ne pas te faire repérer.</p>
        </div>
      </div>

      {/* iPhone home indicator */}
      <div className="h-8 flex justify-center items-center">
        <div className="w-32 h-1 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  )
}
