import { useState } from 'react'
import { t, ui } from '../i18n'
import type { Lang } from '../types'

export interface PlaybookDrillProps {
  lang: Lang
  onComplete: (score: number, maxScore: number) => void
}

export default function PlaybookDrill({ lang, onComplete }: PlaybookDrillProps) {
  const steps = ui.playbookSteps
  const [confirmed, setConfirmed] = useState<Set<number>>(() => new Set())

  const allDone = confirmed.size >= steps.length

  function confirmStep(index: number) {
    setConfirmed((prev) => {
      const next = new Set(prev)
      next.add(index)
      return next
    })
  }

  return (
    <section className="panel playbook-drill">
      <div className="playbook-head">
        <h2>{t(ui.playbookTitle, lang)}</h2>
        <p className="hint">
          {t(ui.playbookProgress, lang)}: {confirmed.size}/{steps.length}
        </p>
        <p className="hint">{t(ui.playbookConfirmHint, lang)}</p>
      </div>

      <ol className="playbook-steps">
        {steps.map((step, index) => {
          const done = confirmed.has(index)
          return (
            <li
              key={step.en}
              className={`playbook-step${done ? ' confirmed' : ''}`}
            >
              <p>{step[lang]}</p>
              <button
                type="button"
                className={done ? 'secondary' : 'primary'}
                disabled={done}
                onClick={() => confirmStep(index)}
              >
                {done ? t(ui.playbookConfirmed, lang) : t(ui.playbookConfirm, lang)}
              </button>
            </li>
          )
        })}
      </ol>

      {allDone && (
        <div className="row-actions" style={{ padding: '0 1.4rem 1.4rem' }}>
          <button
            type="button"
            className="primary"
            onClick={() => onComplete(steps.length, steps.length)}
          >
            {t(ui.finishReport, lang)}
          </button>
        </div>
      )}
    </section>
  )
}
