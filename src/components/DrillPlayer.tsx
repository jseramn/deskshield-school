import { useMemo, useState } from 'react'
import { t, ui } from '../i18n'
import type { ActionId, Decision, Lang, Localized, Scenario } from '../types'

export type DrillPlayerMode = 'inbox' | 'pressure'

type DrillPhase = 'inbox' | 'mail' | 'feedback'

export interface DrillPlayerProps {
  scenarios: Scenario[]
  lang: Lang
  mode: DrillPlayerMode
  onComplete: (score: number) => void
}

export default function DrillPlayer({
  scenarios,
  lang,
  mode,
  onComplete,
}: DrillPlayerProps) {
  const [phase, setPhase] = useState<DrillPhase>('inbox')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [decisions, setDecisions] = useState<Decision[]>([])

  const completedIds = useMemo(
    () => new Set(decisions.map((d) => d.scenarioId)),
    [decisions],
  )

  const active = scenarios.find((s) => s.id === activeId) ?? null
  const allDone = decisions.length >= scenarios.length
  const score = decisions.filter((d) => d.correct).length

  function decide(action: ActionId) {
    if (!active) return
    const correct = active.correct.includes(action)
    const next: Decision = {
      scenarioId: active.id,
      action,
      correct,
    }
    setDecisions((prev) => {
      const filtered = prev.filter((d) => d.scenarioId !== active.id)
      return [...filtered, next]
    })
    setPhase('feedback')
  }

  function goNextFromFeedback() {
    const done = new Set(decisions.map((d) => d.scenarioId))
    if (done.size >= scenarios.length) {
      onComplete(score)
      return
    }
    const nextMail = scenarios.find((s) => !done.has(s.id))
    if (nextMail) {
      setActiveId(nextMail.id)
      setPhase('mail')
      return
    }
    setPhase('inbox')
    setActiveId(null)
  }

  const lastDecision = active
    ? decisions.find((d) => d.scenarioId === active.id)
    : undefined

  const modeHint =
    mode === 'pressure'
      ? lang === 'es'
        ? 'Modo presión'
        : 'Pressure mode'
      : null

  return (
    <>
      {phase === 'inbox' && (
        <section className="panel">
          <div className="inbox-head">
            <h2>{t(ui.inbox, lang)}</h2>
            <span className="hint">
              {modeHint ? `${modeHint} · ` : ''}
              {scenarios.length} {t(ui.unread, lang)} · {decisions.length}/
              {scenarios.length}
            </span>
          </div>
          <ul className="mail-list">
            {scenarios.map((mail) => (
              <li key={mail.id}>
                <button
                  type="button"
                  className={`mail-item${completedIds.has(mail.id) ? ' done' : ''}`}
                  onClick={() => {
                    setActiveId(mail.id)
                    setPhase('mail')
                  }}
                >
                  <span className="from">{mail.from[lang]}</span>
                  <span className="subject">{mail.subject[lang]}</span>
                  <span className="preview">{mail.preview[lang]}</span>
                </button>
              </li>
            ))}
          </ul>
          {allDone && (
            <div className="row-actions" style={{ padding: '1rem 1.4rem 1.4rem' }}>
              <button
                type="button"
                className="primary"
                onClick={() => onComplete(score)}
              >
                {t(ui.finishReport, lang)}
              </button>
            </div>
          )}
        </section>
      )}

      {phase === 'mail' && active && (
        <section className="panel mail-view">
          <div className="meta">
            <div>
              <strong>{t(ui.from, lang)}:</strong> {active.from[lang]}
            </div>
            <div>
              <strong>{t(ui.subject, lang)}:</strong> {active.subject[lang]}
            </div>
          </div>
          <p className="body-text">{active.body[lang]}</p>
          {active.attachment && (
            <div className="attachment">
              {t(ui.attachment, lang)}: {active.attachment[lang]}
            </div>
          )}
          <h3 style={{ margin: 0, fontFamily: 'var(--font-display)' }}>
            {t(ui.decide, lang)}
          </h3>
          <div className="actions">
            {(Object.keys(ui.actions) as ActionId[]).map((action) => (
              <button
                key={action}
                type="button"
                className={`action ${action === 'open' ? 'danger' : 'safe'}`}
                onClick={() => decide(action)}
              >
                {t(ui.actions[action], lang)}
              </button>
            ))}
          </div>
          <button type="button" className="ghost" onClick={() => setPhase('inbox')}>
            ← {t(ui.inbox, lang)}
          </button>
        </section>
      )}

      {phase === 'feedback' && active && lastDecision && (
        <section className="panel feedback">
          <span className={`badge ${lastDecision.correct ? 'ok' : 'bad'}`}>
            {lastDecision.correct ? t(ui.correct, lang) : t(ui.incorrect, lang)}
          </span>
          <h2>{active.subject[lang]}</h2>
          <p>
            {lastDecision.correct
              ? active.whyCorrect[lang]
              : active.whyWrong[lang]}
          </p>
          <div>
            <strong>{t(ui.redFlags, lang)}</strong>
            <ul className="flags">
              {active.redFlags.map((flag: Localized) => (
                <li key={flag.en}>{flag[lang]}</li>
              ))}
            </ul>
          </div>
          <div className="row-actions">
            <button type="button" className="secondary" onClick={goNextFromFeedback}>
              {decisions.length >= scenarios.length
                ? t(ui.finishReport, lang)
                : t(ui.next, lang)}
            </button>
          </div>
        </section>
      )}
    </>
  )
}
