/** Pass threshold for inbox / pressure modules (≥75%). */
export function passedDrill(score: number, maxScore: number): boolean {
  if (maxScore <= 0) return false
  return score >= Math.ceil(maxScore * 0.75)
}
