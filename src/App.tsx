import { useState } from 'react'
import DrillPlayer from './components/DrillPlayer'
import { MODULE_FULL_SHIFT } from './data/curriculum'
import { shiftScenarios } from './data/scenarios'
import { t, ui } from './i18n'
import { getLang, loadProgress, markModuleComplete, setLang } from './lib/progress'
import { passedDrill } from './lib/scoring'
import type { Lang, Screen } from './types'
import './index.css'

export default function App() {
  const [lang, setLangState] = useState<Lang>(() => getLang(loadProgress()))
  const [screen, setScreen] = useState<Screen>('home')
  const [lastScore, setLastScore] = useState(0)

  const maxScore = shiftScenarios.length

  function toggleLang() {
    const next = lang === 'en' ? 'es' : 'en'
    setLang(next)
    setLangState(next)
  }

  function startFullShift() {
    setLastScore(0)
    setScreen('drill')
  }

  function handleDrillComplete(score: number) {
    setLastScore(score)
    markModuleComplete(MODULE_FULL_SHIFT, score, maxScore)
    setScreen('report')
  }

  function restart() {
    setLastScore(0)
    setScreen('home')
  }

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
              <button type="button" className="primary" onClick={startFullShift}>
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

        {screen === 'drill' && (
          <DrillPlayer
            key={MODULE_FULL_SHIFT}
            scenarios={shiftScenarios}
            lang={lang}
            mode="inbox"
            onComplete={handleDrillComplete}
          />
        )}

        {screen === 'report' && (
          <section className="panel report">
            <h2>{t(ui.reportTitle, lang)}</h2>
            <div className="score-box">
              <strong>
                {lastScore}/{maxScore}
              </strong>
              <span>{t(ui.score, lang)}</span>
            </div>
            <p className="hint">
              {passedDrill(lastScore, maxScore)
                ? t(ui.passHint, lang)
                : t(ui.failHint, lang)}
            </p>
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
