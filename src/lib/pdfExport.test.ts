import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { CertLiteReport } from './sessionReport'

const save = vi.fn()
const text = vi.fn()
const setFont = vi.fn()
const setFontSize = vi.fn()
const splitTextToSize = vi.fn((value: string) => [value])
const addPage = vi.fn()

vi.mock('jspdf', () => ({
  jsPDF: vi.fn(function MockJsPDF() {
    return {
      internal: {
        pageSize: {
          getWidth: () => 210,
          getHeight: () => 297,
        },
      },
      setFont,
      setFontSize,
      splitTextToSize,
      text,
      addPage,
      save,
    }
  }),
}))

import { downloadCertLitePdf } from './pdfExport'

function sampleReport(): CertLiteReport {
  return {
    title: 'Front Desk cert-lite (local)',
    badge: 'Path complete — local training badge',
    pathTitle: 'Front Desk',
    trainingBanner: 'Training mode — simulated messages only.',
    disclaimer: 'Local / non-verifiable.',
    localEvidence: 'Local session evidence.',
    moduleScoresHeading: 'Module scores',
    generatedLabel: 'Generated',
    generatedAt: '2026-07-23T12:00:00.000Z',
    modules: [
      { id: 'm1', title: 'Full shift', scoreLabel: '3/4' },
      { id: 'm2', title: 'Pressure', scoreLabel: '4/4' },
    ],
  }
}

describe('downloadCertLitePdf', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    splitTextToSize.mockImplementation((value: string) => [value])
  })

  it('saves the cert-lite filename and writes key report fields', () => {
    const report = sampleReport()
    downloadCertLitePdf(report)

    expect(save).toHaveBeenCalledWith('deskshield-front-desk-cert-lite.pdf')
    expect(text).toHaveBeenCalledWith(report.title, 16, expect.any(Number))
    expect(text).toHaveBeenCalledWith(report.badge, 16, expect.any(Number))
    expect(text).toHaveBeenCalledWith(report.trainingBanner, 16, expect.any(Number))
    expect(text).toHaveBeenCalledWith(report.disclaimer, 16, expect.any(Number))
    expect(text).toHaveBeenCalledWith(
      `${report.modules[0].title}: ${report.modules[0].scoreLabel}`,
      16,
      expect.any(Number),
    )
    expect(text).toHaveBeenCalledWith(
      `${report.generatedLabel}: ${report.generatedAt}`,
      16,
      expect.any(Number),
    )
  })
})
