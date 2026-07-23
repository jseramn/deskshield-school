import { describe, expect, it } from 'vitest'
import { passedDrill } from './scoring'

describe('passedDrill', () => {
  it('returns false when maxScore is 0', () => {
    expect(passedDrill(0, 0)).toBe(false)
    expect(passedDrill(1, 0)).toBe(false)
  })

  it('returns false when maxScore is negative', () => {
    expect(passedDrill(10, -4)).toBe(false)
  })

  it('requires score >= ceil(75% of max)', () => {
    // max 4 → ceil(3) = 3
    expect(passedDrill(2, 4)).toBe(false)
    expect(passedDrill(3, 4)).toBe(true)
    expect(passedDrill(4, 4)).toBe(true)

    // max 5 → ceil(3.75) = 4
    expect(passedDrill(3, 5)).toBe(false)
    expect(passedDrill(4, 5)).toBe(true)
  })
})
