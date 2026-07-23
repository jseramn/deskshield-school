import { describe, expect, it } from 'vitest'
import type { Decision, Scenario } from '../types'
import { orderDecisions } from './DrillPlayer'

function scenario(id: string): Scenario {
  return {
    id,
    isPhish: true,
    from: { en: 'a', es: 'a' },
    subject: { en: 's', es: 's' },
    preview: { en: 'p', es: 'p' },
    body: { en: 'b', es: 'b' },
    redFlags: [],
    correct: ['report'],
    whyCorrect: { en: 'ok', es: 'ok' },
    whyWrong: { en: 'no', es: 'no' },
  }
}

function decision(scenarioId: string, action: Decision['action'] = 'report'): Decision {
  return { scenarioId, action, correct: true }
}

describe('orderDecisions', () => {
  it('returns decisions in scenarios presentation order', () => {
    const scenarios = [scenario('a'), scenario('b'), scenario('c')]
    const decisions = [
      decision('c'),
      decision('a'),
      decision('b'),
    ]

    expect(orderDecisions(scenarios, decisions).map((d) => d.scenarioId)).toEqual([
      'a',
      'b',
      'c',
    ])
  })

  it('omits missing scenario ids and ignores extra decisions', () => {
    const scenarios = [scenario('a'), scenario('b')]
    const decisions = [decision('b'), decision('orphan'), decision('a')]

    expect(orderDecisions(scenarios, decisions).map((d) => d.scenarioId)).toEqual([
      'a',
      'b',
    ])
  })

  it('returns empty when no decisions match scenarios', () => {
    expect(
      orderDecisions([scenario('a')], [decision('other')]),
    ).toEqual([])
  })
})
