const SCORES_KEY = "textos-en-cours-scores"
const MAX_SCORES = 5

export function saveScore(score: number): void {
  if (typeof window === "undefined") return

  try {
    // Get existing scores
    const existingScoresStr = localStorage.getItem(SCORES_KEY)
    const existingScores = existingScoresStr ? JSON.parse(existingScoresStr) : []

    // Add new score
    const newScores = [...existingScores, score]

    // Sort in descending order and keep only top scores
    const topScores = newScores.sort((a, b) => b - a).slice(0, MAX_SCORES)

    // Save back to localStorage
    localStorage.setItem(SCORES_KEY, JSON.stringify(topScores))
  } catch (error) {
    console.error("Error saving score:", error)
  }
}

export function getHighScores(): number[] {
  if (typeof window === "undefined") return [0, 0, 0, 0, 0]

  try {
    const scoresStr = localStorage.getItem(SCORES_KEY)
    if (!scoresStr) return [0, 0, 0, 0, 0]

    const scores = JSON.parse(scoresStr)
    return scores
  } catch (error) {
    console.error("Error getting high scores:", error)
    return [0, 0, 0, 0, 0]
  }
}
