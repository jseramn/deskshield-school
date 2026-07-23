import { describe, expect, it } from 'vitest'
import {
  FRONT_DESK_PATH_ID,
  MODULE_FULL_SHIFT,
  MODULE_PLAYBOOK,
  MODULE_PRESSURE,
} from '../data/curriculum'
import { t, ui } from '../i18n'
import type { ProgressState } from '../types'
import { buildCertLiteReport, buildShareText } from './sessionReport'

function completeProgress(): ProgressState {
  return {
    schemaVersion: 1,
    lang: 'en',
    modules: {
      [MODULE_FULL_SHIFT]: {
        completedAt: '2026-07-01T00:00:00.000Z',
        bestScore: 3,
        maxScore: 4,
      },
      [MODULE_PRESSURE]: {
        completedAt: '2026-07-01T01:00:00.000Z',
        bestScore: 4,
        maxScore: 4,
      },
      [MODULE_PLAYBOOK]: {
        completedAt: '2026-07-01T02:00:00.000Z',
        bestScore: 6,
        maxScore: 6,
      },
    },
  }
}

describe('buildCertLiteReport', () => {
  it('always includes training banner and non-verifiable disclaimer', () => {
    const report = buildCertLiteReport(
      completeProgress(),
      'en',
      FRONT_DESK_PATH_ID,
      '2026-07-23T12:00:00.000Z',
    )

    expect(report.trainingBanner).toBe(t(ui.trainingBanner, 'en'))
    expect(report.disclaimer).toBe(t(ui.certDisclaimer, 'en'))
    expect(report.localEvidence).toBe(t(ui.certLocalEvidence, 'en'))
    expect(report.disclaimer.toLowerCase()).toMatch(/non-verifiable|no verificable/)
    expect(report.generatedAt).toBe('2026-07-23T12:00:00.000Z')
  })

  it('includes path badge and per-module score lines only', () => {
    const report = buildCertLiteReport(completeProgress(), 'en')

    expect(report.badge).toBe(t(ui.certBadge, 'en'))
    expect(report.modules).toHaveLength(3)
    expect(report.modules.map((m) => m.id)).toEqual([
      MODULE_FULL_SHIFT,
      MODULE_PRESSURE,
      MODULE_PLAYBOOK,
    ])
    expect(report.modules[0].scoreLabel).toBe('3/4')
    expect(report.modules[1].scoreLabel).toBe('4/4')
    expect(report.modules[2].scoreLabel).toBe('6/6')

    // No decision-log / report-card fields on the cert-lite model
    expect(report).not.toHaveProperty('decisions')
    expect(report).not.toHaveProperty('decisionLog')
    expect(report).not.toHaveProperty('reportCard')
  })

  it('localizes strings for Spanish', () => {
    const report = buildCertLiteReport(completeProgress(), 'es')
    expect(report.title).toBe(t(ui.certTitle, 'es'))
    expect(report.disclaimer).toBe(t(ui.certDisclaimer, 'es'))
    expect(report.trainingBanner).toBe(t(ui.trainingBanner, 'es'))
  })
})

describe('buildShareText', () => {
  it('includes banner, local evidence, disclaimer, and module score lines', () => {
    const report = buildCertLiteReport(completeProgress(), 'en')
    const text = buildShareText(report)

    expect(text).toContain(report.trainingBanner)
    expect(text).toContain(report.localEvidence)
    expect(text).toContain(report.disclaimer)
    expect(text).toContain(report.badge)
    expect(text).toContain('Full shift — inbox drill: 3/4')
    expect(text).not.toMatch(/decision log|registro de decisiones/i)
    expect(text).not.toMatch(/scenarioId|subject:/i)
  })
})
