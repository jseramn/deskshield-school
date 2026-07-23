import { FRONT_DESK_PATH_ID, getModulesForPath, getPath } from '../data/curriculum'
import { t, ui } from '../i18n'
import {
  isModuleComplete,
  isModuleUnlocked,
  pathComplete,
} from '../lib/progress'
import type { Lang, ProgressState } from '../types'

export interface PathDetailProps {
  pathId: string
  lang: Lang
  progress: ProgressState
  lockedNotice?: string | null
  onBack: () => void
  onStartModule: (moduleId: string) => void
  onOpenCert: () => void
}

export default function PathDetail({
  pathId,
  lang,
  progress,
  lockedNotice,
  onBack,
  onStartModule,
  onOpenCert,
}: PathDetailProps) {
  const path = getPath(pathId)
  const mods = getModulesForPath(pathId)
  const done = pathComplete(pathId, progress)
  const anyComplete = mods.some((m) => isModuleComplete(m.id, progress))
  const pathStatusLabel = done
    ? t(ui.pathCompleteLabel, lang)
    : anyComplete
      ? t(ui.pathInProgress, lang)
      : t(ui.pathNotStarted, lang)
  const showCert = done && pathId === FRONT_DESK_PATH_ID

  if (!path) {
    return (
      <section className="panel path-detail">
        <button type="button" className="ghost" onClick={onBack}>
          ← {t(ui.backToCatalog, lang)}
        </button>
      </section>
    )
  }

  return (
    <section className="panel path-detail">
      <div className="path-detail-head">
        <button type="button" className="ghost" onClick={onBack}>
          ← {t(ui.backToCatalog, lang)}
        </button>
        <h1>{t(path.title, lang)}</h1>
        <p className="hint">
          {t(ui.pathOverview, lang)}
          {' · '}
          {pathStatusLabel}
        </p>
        {lockedNotice && <p className="path-notice">{lockedNotice}</p>}
        {showCert && (
          <div className="path-cert-cta">
            <button type="button" className="primary" onClick={onOpenCert}>
              {t(ui.viewCert, lang)}
            </button>
            <p className="hint">{t(ui.certDisclaimer, lang)}</p>
          </div>
        )}
      </div>

      <ul className="module-list">
        {mods.map((mod) => {
          const complete = isModuleComplete(mod.id, progress)
          const unlocked = isModuleUnlocked(mod.id, progress)
          const status = complete
            ? t(ui.moduleComplete, lang)
            : unlocked
              ? t(ui.moduleIncomplete, lang)
              : t(ui.moduleLocked, lang)

          return (
            <li
              key={mod.id}
              className={`module-card${unlocked ? '' : ' locked'}${complete ? ' complete' : ''}`}
            >
              <div className="module-card-copy">
                <strong>{t(mod.title, lang)}</strong>
                <span className="module-status">{status}</span>
                {!unlocked && (
                  <span className="hint">{t(ui.unlockHint, lang)}</span>
                )}
              </div>
              <button
                type="button"
                className={unlocked && !complete ? 'primary' : 'secondary'}
                disabled={!unlocked}
                onClick={() => {
                  if (!unlocked) return
                  onStartModule(mod.id)
                }}
              >
                {t(ui.startModule, lang)}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
