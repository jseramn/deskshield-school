import { FRONT_DESK_PATH_ID, getModulesForPath, getPath } from '../data/curriculum'
import { t, ui } from '../i18n'
import { isModuleComplete, pathComplete } from '../lib/progress'
import type { Lang, ProgressState } from '../types'

export interface CertLiteProps {
  lang: Lang
  progress: ProgressState
  onBack: () => void
  onBackCatalog: () => void
}

export default function CertLite({
  lang,
  progress,
  onBack,
  onBackCatalog,
}: CertLiteProps) {
  const complete = pathComplete(FRONT_DESK_PATH_ID, progress)
  const path = getPath(FRONT_DESK_PATH_ID)
  const mods = getModulesForPath(FRONT_DESK_PATH_ID)

  function handlePrint() {
    window.print()
  }

  async function handleShare() {
    const summary = [
      t(ui.certTitle, lang),
      t(ui.certBadge, lang),
      t(ui.certDisclaimer, lang),
      '',
      ...mods.map((mod) => {
        const rec = progress.modules[mod.id]
        const score = rec
          ? `${rec.bestScore}/${rec.maxScore}`
          : t(ui.moduleIncomplete, lang)
        return `${t(mod.title, lang)}: ${score}`
      }),
    ].join('\n')

    if (navigator.share) {
      try {
        await navigator.share({
          title: t(ui.certTitle, lang),
          text: summary,
        })
        return
      } catch {
        // fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(summary)
    } catch {
      // ignore — print remains available
    }
  }

  return (
    <section className="panel cert-lite">
      <div className="cert-head">
        <button type="button" className="ghost" onClick={onBack}>
          ← {t(ui.backToPath, lang)}
        </button>
        <h1>{t(ui.certTitle, lang)}</h1>
        <p className="hint print-banner-note">{t(ui.trainingBanner, lang)}</p>
      </div>

      {complete ? (
        <>
          <div className="cert-badge" role="status">
            <strong>{t(ui.certBadge, lang)}</strong>
            <span>{path ? t(path.title, lang) : 'Front Desk'}</span>
          </div>
          <p className="cert-disclaimer">{t(ui.certDisclaimer, lang)}</p>

          <ul className="cert-module-log">
            {mods.map((mod) => {
              const rec = progress.modules[mod.id]
              const done = isModuleComplete(mod.id, progress)
              return (
                <li key={mod.id}>
                  <strong>{t(mod.title, lang)}</strong>
                  <span>
                    {done && rec
                      ? `${rec.bestScore}/${rec.maxScore}`
                      : t(ui.moduleIncomplete, lang)}
                  </span>
                </li>
              )
            })}
          </ul>

          <div className="row-actions cert-actions">
            <button type="button" className="primary" onClick={handlePrint}>
              {t(ui.certPrint, lang)}
            </button>
            <button type="button" className="secondary" onClick={handleShare}>
              {t(ui.certShare, lang)}
            </button>
            <button type="button" className="ghost" onClick={onBackCatalog}>
              {t(ui.backToCatalog, lang)}
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="cert-locked" role="status">
            {t(ui.certNotReady, lang)}
          </p>
          <div className="row-actions">
            <button type="button" className="secondary" onClick={onBack}>
              {t(ui.backToPath, lang)}
            </button>
          </div>
        </>
      )}
    </section>
  )
}
