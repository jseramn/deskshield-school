import {
  FRONT_DESK_PATH_ID,
  getModulesForPath,
  getPath,
} from '../data/curriculum'
import { t, ui } from '../i18n'
import { isModuleComplete } from './progress'
import type { Lang, ProgressState } from '../types'

export interface CertLiteModuleLine {
  id: string
  title: string
  scoreLabel: string
}

/** Cert-lite session evidence only — no decision-log / report-card fields. */
export interface CertLiteReport {
  title: string
  badge: string
  pathTitle: string
  trainingBanner: string
  disclaimer: string
  localEvidence: string
  moduleScoresHeading: string
  generatedLabel: string
  generatedAt: string
  modules: CertLiteModuleLine[]
}

export function buildCertLiteReport(
  progress: ProgressState,
  lang: Lang,
  pathId: string = FRONT_DESK_PATH_ID,
  generatedAt: string = new Date().toISOString(),
): CertLiteReport {
  const path = getPath(pathId)
  const mods = getModulesForPath(pathId)

  return {
    title: t(ui.certTitle, lang),
    badge: t(ui.certBadge, lang),
    pathTitle: path ? t(path.title, lang) : 'Front Desk',
    trainingBanner: t(ui.trainingBanner, lang),
    disclaimer: t(ui.certDisclaimer, lang),
    localEvidence: t(ui.certLocalEvidence, lang),
    moduleScoresHeading: t(ui.certModuleScores, lang),
    generatedLabel: t(ui.certGeneratedAt, lang),
    generatedAt,
    modules: mods.map((mod) => {
      const rec = progress.modules[mod.id]
      const done = isModuleComplete(mod.id, progress)
      const scoreLabel =
        done && rec
          ? `${rec.bestScore}/${rec.maxScore}`
          : t(ui.moduleIncomplete, lang)
      return {
        id: mod.id,
        title: t(mod.title, lang),
        scoreLabel,
      }
    }),
  }
}

/** Share text always includes training banner + non-verifiable disclaimer. */
export function buildShareText(report: CertLiteReport): string {
  return [
    report.title,
    report.badge,
    report.pathTitle,
    report.trainingBanner,
    report.localEvidence,
    report.disclaimer,
    '',
    ...report.modules.map((m) => `${m.title}: ${m.scoreLabel}`),
  ].join('\n')
}
