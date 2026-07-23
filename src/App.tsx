import { useMemo, useState } from 'react'
import { scenarios } from './data/scenarios'
import { t, ui } from './i18n'
import type { ActionId, Decision, Lang, Localized, Screen } from './types'
import './index.css'

const SESSION_KEY = 'deskshield-v1'

function loadLang(): Lang {
  const raw = sessionStorage.getItem(SESSION_KEY)
  if (!raw) return 'en'
  try {
    const parsed = JSON.parse(raw) as { lang?: Lang }
    return parsed.lang === 'es' ? 'es' : 'en'
  } catch {
    return 'en'
  }
}

export default function App() {
  const [lang, setLang] = useState<Lang>(loadLang)
  const [screen, setScreen] = useState<Screen>('home')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [decisions, setDecisions] = useState<Decision[]>([])

  const completedIds = useMemo(
    () => new Set(decisions.map((d) => d.scenarioId)),
    [decisions],
  )

  const active = scenarios.find((s) => s.id === activeId) ?? null
  const allDone = decisions.length >= scenarios.length
  const score = decisions.filter((d) => d.correct).length

  function persistLang(next: Lang) {
    setLang(next)
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ lang: next }))
  }

  function toggleLang() {
    persistLang(lang === 'en' ? 'es' : 'en')
  }

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
    setScreen('feedback')
  }

  function goNextFromFeedback() {
    const done = new Set(decisions.map((d) => d.scenarioId))
    if (done.size >= scenarios.length) {
      setScreen('playbook')
      setActiveId(null)
      return
    }
    const nextMail = scenarios.find((s) => !done.has(s.id))
    if (nextMail) {
      setActiveId(nextMail.id)
      setScreen('mail')
      return
    }
    setScreen('inbox')
    setActiveId(null)
  }

  function restart() {
    setDecisions([])
    setActiveId(null)
    setScreen('home')
  }

  const lastDecision = active
    ? decisions.find((d) => d.scenarioId === active.id)
    : undefined

  return (
    <>
      <div className="banner">{t(ui.trainingBanner, lang)}</div>
      <div className="app-shell">
        <header className="topbar">
          <div className="brand">
            <strong>{t(ui.brand, lang)}</strong>
            <span>{t(ui.tagline, lang)}</span>
          </div>
          <button type="button" className="lang-btn" onClick={toggleLang}>
            {t(ui.langToggle, lang)}
          </button>
        </header>

        {screen === 'home' && (
          <section className="panel hero">
            <div className="hero-copy">
              <h1>{t(ui.brand, lang)}</h1>
              <p>{t(ui.whyBody, lang)}</p>
              <button
                type="button"
                className="primary"
                onClick={() => setScreen('inbox')}
              >
                {t(ui.start, lang)}
              </button>
              <p className="hint">{t(ui.homeCtaHint, lang)}</p>
            </div>
            <aside className="hero-visual">
              <h2>{t(ui.whyTitle, lang)}</h2>
              <p>{t(ui.tagline, lang)}</p>
            </aside>
          </section>
        )}

        {screen === 'inbox' && (
          <section className="panel">
            <div className="inbox-head">
              <h2>{t(ui.inbox, lang)}</h2>
              <span className="hint">
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
                      setScreen('mail')
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
                  className="secondary"
                  onClick={() => setScreen('playbook')}
                >
                  {t(ui.toPlaybook, lang)}
                </button>
              </div>
            )}
          </section>
        )}

        {screen === 'mail' && active && (
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
            <button type="button" className="ghost" onClick={() => setScreen('inbox')}>
              ← {t(ui.inbox, lang)}
            </button>
          </section>
        )}

        {screen === 'feedback' && active && lastDecision && (
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
                  ? t(ui.toPlaybook, lang)
                  : t(ui.next, lang)}
              </button>
            </div>
          </section>
        )}

        {screen === 'playbook' && (
          <section className="panel playbook">
            <h2>{t(ui.playbookTitle, lang)}</h2>
            <ol>
              {ui.playbookSteps.map((step) => (
                <li key={step.en}>{t(step, lang)}</li>
              ))}
            </ol>
            <div className="row-actions">
              <button
                type="button"
                className="primary"
                onClick={() => setScreen('report')}
              >
                {t(ui.finishReport, lang)}
              </button>
              <button type="button" className="ghost" onClick={() => setScreen('inbox')}>
                {t(ui.inbox, lang)}
              </button>
            </div>
          </section>
        )}

        {screen === 'report' && (
          <section className="panel report">
            <h2>{t(ui.reportTitle, lang)}</h2>
            <div className="score-box">
              <strong>
                {score}/{scenarios.length}
              </strong>
              <span>{t(ui.score, lang)}</span>
            </div>
            <p className="hint">
              {score >= Math.ceil(scenarios.length * 0.75)
                ? t(ui.passHint, lang)
                : t(ui.failHint, lang)}
            </p>
            <strong>{t(ui.resultsDetail, lang)}</strong>
            <ul className="log">
              {scenarios.map((s) => {
                const d = decisions.find((x) => x.scenarioId === s.id)
                return (
                  <li key={s.id}>
                    <span>{s.subject[lang]}</span>
                    <span>
                      {d
                        ? `${t(ui.actions[d.action], lang)} · ${
                            d.correct ? t(ui.correct, lang) : t(ui.incorrect, lang)
                          }`
                        : '—'}
                    </span>
                  </li>
                )
              })}
            </ul>
            <div className="row-actions">
              <button type="button" className="secondary" onClick={restart}>
                {t(ui.restart, lang)}
              </button>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
