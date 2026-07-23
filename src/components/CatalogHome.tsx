import { FRONT_DESK_PATH_ID, paths } from '../data/curriculum'
import { t, ui } from '../i18n'
import { hasIncompleteFrontDeskProgress, pathComplete } from '../lib/progress'
import type { Lang, ProgressState } from '../types'

export interface CatalogHomeProps {
  lang: Lang
  progress: ProgressState
  onOpenPath: (pathId: string) => void
  onContinue: () => void
  onLockedSelect: () => void
}

export default function CatalogHome({
  lang,
  progress,
  onOpenPath,
  onContinue,
  onLockedSelect,
}: CatalogHomeProps) {
  const showContinue = hasIncompleteFrontDeskProgress(progress)
  const frontDeskDone = pathComplete(FRONT_DESK_PATH_ID, progress)

  return (
    <section className="panel catalog">
      <div className="catalog-head">
        <h1>{t(ui.schoolHome, lang)}</h1>
        <p>{t(ui.schoolIntro, lang)}</p>
        {showContinue && (
          <div className="catalog-continue">
            <button type="button" className="primary" onClick={onContinue}>
              {t(ui.continuePath, lang)}
            </button>
            <p className="hint">{t(ui.continueHint, lang)}</p>
          </div>
        )}
      </div>

      <ul className="catalog-grid">
        {paths.map((path) => {
          const locked = path.status === 'locked'
          const isFrontDesk = path.id === FRONT_DESK_PATH_ID
          const statusLabel = locked
            ? t(ui.pathLocked, lang)
            : frontDeskDone && isFrontDesk
              ? t(ui.pathCompleteLabel, lang)
              : showContinue && isFrontDesk
                ? t(ui.pathInProgress, lang)
                : t(ui.openPath, lang)

          return (
            <li key={path.id}>
              <button
                type="button"
                className={`path-card${locked ? ' locked' : ''}`}
                aria-disabled={locked}
                onClick={() => {
                  if (locked) {
                    onLockedSelect()
                    return
                  }
                  onOpenPath(path.id)
                }}
              >
                <strong>{t(path.title, lang)}</strong>
                <span className="path-card-status">{statusLabel}</span>
                {locked && (
                  <span className="hint">{t(ui.pathLockedHint, lang)}</span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
