import { jsPDF } from 'jspdf'
import type { CertLiteReport } from './sessionReport'

const MARGIN = 16
const LINE_GAP = 6
const SECTION_GAP = 10

/**
 * Client-side cert-lite PDF download (blob via jspdf `.save`).
 * Content: badge, module scores, training banner, local-evidence + disclaimer only.
 */
export function downloadCertLitePdf(report: CertLiteReport): void {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const maxWidth = pageWidth - MARGIN * 2
  let y = MARGIN

  const writeWrapped = (text: string, fontSize: number, style: 'normal' | 'bold' = 'normal') => {
    doc.setFont('helvetica', style)
    doc.setFontSize(fontSize)
    const lines = doc.splitTextToSize(text, maxWidth) as string[]
    for (const line of lines) {
      if (y > doc.internal.pageSize.getHeight() - MARGIN) {
        doc.addPage()
        y = MARGIN
      }
      doc.text(line, MARGIN, y)
      y += LINE_GAP
    }
  }

  writeWrapped(report.title, 16, 'bold')
  y += SECTION_GAP / 2
  writeWrapped(report.badge, 12, 'bold')
  writeWrapped(report.pathTitle, 11)
  y += SECTION_GAP / 2
  writeWrapped(report.trainingBanner, 10)
  y += SECTION_GAP / 2
  writeWrapped(report.localEvidence, 10)
  y += SECTION_GAP / 2
  writeWrapped(report.disclaimer, 9)
  y += SECTION_GAP

  writeWrapped(report.moduleScoresHeading, 12, 'bold')
  y += 2
  for (const mod of report.modules) {
    writeWrapped(`${mod.title}: ${mod.scoreLabel}`, 10)
  }

  y += SECTION_GAP
  writeWrapped(`${report.generatedLabel}: ${report.generatedAt}`, 8)

  doc.save('deskshield-front-desk-cert-lite.pdf')
}
