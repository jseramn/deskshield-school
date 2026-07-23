import { describe, expect, it, vi } from 'vitest'
import { buildPressurePack, shiftScenarios } from './scenarios'

describe('buildPressurePack', () => {
  it('returns a shallow-copied pack of the same length', () => {
    const pack = buildPressurePack(shiftScenarios)
    expect(pack).toHaveLength(shiftScenarios.length)
    expect(pack).not.toBe(shiftScenarios)
  })

  it('preserves the same scenario ids (permutation / remix)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const pack = buildPressurePack(shiftScenarios)
    const sourceIds = shiftScenarios.map((s) => s.id).sort()
    const packIds = pack.map((s) => s.id).sort()
    expect(packIds).toEqual(sourceIds)
    vi.restoreAllMocks()
  })
})
