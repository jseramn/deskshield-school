import { useState } from 'react'
import CatalogHome from './components/CatalogHome'
import CertLite from './components/CertLite'
import DrillPlayer, { type DrillPlayerMode } from './components/DrillPlayer'
import PathDetail from './components/PathDetail'
import PlaybookDrill from './components/PlaybookDrill'
import {
  FRONT_DESK_PATH_ID,
  MODULE_FULL_SHIFT,
  modules,
} from './data/curriculum'
import { buildPressurePack, shiftScenarios } from './data/scenarios'
import { t, ui } from './i18n'
import {
  firstIncompleteModuleId,
  getLang,
  isModuleUnlocked,
  loadProgress,
  markModuleComplete,
  setLang,
} from './lib/progress'
import { passedDrill } from './lib/scoring'
import type { Lang, ProgressState, Scenario, Screen } from './types'
import './index.css'

export default function App() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress())
  const [lang, setLangState] = useState<Lang>(() => getLang(progress))
  const [screen, setScreen] = useState<Screen>('catalog')
  const [activePathId, setActivePathId] = useState(FRONT_DESK_PATH_ID)
  const [activeModuleId, setActiveModuleId] = useState(MODULE_FULL_SHIFT)
  const [drillScenarios, setDrillScenarios] = useState<Scenario[]>(shiftScenarios)
  const [drillMode, setDrillMode] = useState<DrillPlayerMode>('inbox')
  const [lastScore, setLastScore] = useState(0)
  const [lastMaxScore, setLastMaxScore] = useState(shiftScenarios.length)
  const [lockedNotice, setLockedNotice] = useState<string | null>(null)
  const [launchNotice, setLaunchNotice] = useState<string | null>(null)

  function refreshProgress(next?: ProgressState) {
    const state = next ?? loadProgress()
    setProgress(state)
    return state
  }

  function toggleLang() {
    const next = lang === 'en' ? 'es' : 'en'
    const state = setLang(next)
    setLangState(next)
    refreshProgress(state)
  }

  function goCatalog() {
    setLockedNotice(null)
    setLaunchNotice(null)
    setScreen('catalog')
  }

  function openPath(pathId: string) {
    setLockedNotice(null)
    setLaunchNotice(null)
    setActivePathId(pathId)
    setScreen('path')
  }

  function openCert() {
    setLockedNotice(null)
    setLaunchNotice(null)
    setScreen('cert')
  }

  function handleLockedSelect() {
    setLockedNotice(t(ui.pathLockedHint, lang))
  }

  function startModule(moduleId: string) {
    const state = refreshProgress()
    if (!isModuleUnlocked(moduleId, state)) {
      setLaunchNotice(t(ui.unlockHint, lang))
      setScreen('path')
      return
    }

    const mod = modules[moduleId]
    if (!mod) return

    setActivePathId(mod.pathId)
    setActiveModuleId(moduleId)
    setLockedNotice(null)
    setLaunchNotice(null)
    setLastScore(0)

    if (mod.kind === 'inbox') {
      setDrillScenarios(shiftScenarios)
      setDrillMode('inbox')
      setLastMaxScore(shiftScenarios.length)
      setScreen('drill')
      return
    }

    if (mod.kind === 'pressure') {
      const pack = buildPressurePack(shiftScenarios)
      setDrillScenarios(pack)
      setDrillMode('pressure')
      setLastMaxScore(pack.length)
      setScreen('drill')
      return
    }

    if (mod.kind === 'playbook') {
      setLastMaxScore(ui.playbookSteps.length)
      setScreen('playbook-drill')
    }
  }

  function handleContinue() {
    const state = refreshProgress()
    const nextId =
      firstIncompleteModuleId(state.lastPathId ?? FRONT_DESK_PATH_ID, state) ??
      firstIncompleteModuleId(FRONT_DESK_PATH_ID, state)
    if (!nextId) {
      openPath(FRONT_DESK_PATH_ID)
      return
    }
    startModule(nextId)
  }

  function handleDrillComplete(score: number) {
    setLastScore(score)
    setLastMaxScore(drillScenarios.length)
    const next = markModuleComplete(activeModuleId, score, drillScenarios.length)
    refreshProgress(next)
    setScreen('report')
  }

  function handlePlaybookComplete(score: number, maxScore: number) {
    setLastScore(score)
    setLastMaxScore(maxScore)
    const next = markModuleComplete(activeModuleId, score, maxScore)
    refreshProgress(next)
    setScreen('report')
  }

  function backFromReport() {
    setLaunchNotice(null)
    setScreen('path')
    setActivePathId(FRONT_DESK_PATH_ID)
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

        {screen === 'catalog' && (
          <>
            <CatalogHome
              lang={lang}
              progress={progress}
              onOpenPath={openPath}
              onContinue={handleContinue}
              onLockedSelect={handleLockedSelect}
              onOpenCert={openCert}
            />
            {lockedNotice && (
              <p className="catalog-locked-msg" role="status">
                {lockedNotice}
              </p>
            )}
          </>
        )}

        {screen === 'path' && (
          <PathDetail
            pathId={activePathId}
            lang={lang}
            progress={progress}
            lockedNotice={launchNotice}
            onBack={goCatalog}
            onStartModule={startModule}
            onOpenCert={openCert}
          />
        )}

        {screen === 'drill' && (
          <DrillPlayer
            key={activeModuleId}
            scenarios={drillScenarios}
            lang={lang}
            mode={drillMode}
            onComplete={handleDrillComplete}
          />
        )}

        {screen === 'playbook-drill' && (
          <PlaybookDrill
            key={activeModuleId}
            lang={lang}
            onComplete={handlePlaybookComplete}
          />
        )}

        {screen === 'report' && (
          <section className="panel report">
            <h2>{t(ui.reportTitle, lang)}</h2>
            <div className="score-box">
              <strong>
                {lastScore}/{lastMaxScore}
              </strong>
              <span>{t(ui.score, lang)}</span>
            </div>
            <p className="hint">
              {passedDrill(lastScore, lastMaxScore)
                ? t(ui.passHint, lang)
                : t(ui.failHint, lang)}
            </p>
            <div className="row-actions">
              <button type="button" className="secondary" onClick={backFromReport}>
                {t(ui.backToPath, lang)}
              </button>
              <button type="button" className="ghost" onClick={goCatalog}>
                {t(ui.backToCatalog, lang)}
              </button>
            </div>
          </section>
        )}

        {screen === 'cert' && (
          <CertLite
            lang={lang}
            progress={progress}
            onBack={() => openPath(FRONT_DESK_PATH_ID)}
            onBackCatalog={goCatalog}
          />
        )}
      </div>
    </>
  )
}
