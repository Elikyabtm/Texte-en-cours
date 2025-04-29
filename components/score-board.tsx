import { getHighScores } from "@/lib/scores"

interface ScoreBoardProps {
  currentScore: number
}

export default function ScoreBoard({ currentScore }: ScoreBoardProps) {
  const highScores = getHighScores()
  const isHighScore = highScores.some((score) => currentScore >= score)

  return (
    <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-6 w-full max-w-xs">
      <h3 className="text-lg font-bold mb-2">Meilleurs scores</h3>

      {isHighScore && (
        <div className="bg-yellow-300 text-yellow-800 p-2 rounded mb-2 animate-pulse">Nouveau record !</div>
      )}

      <ul className="space-y-1">
        {highScores.map((score, index) => (
          <li key={index} className={`flex justify-between ${currentScore === score ? "font-bold" : ""}`}>
            <span>#{index + 1}</span>
            <span>{score} points</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
