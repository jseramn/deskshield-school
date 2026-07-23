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
import type {
  Decision,
  Lang,
  NoticeKey,
  ProgressState,
  Scenario,
  Screen,
} from './types'
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
  const [lastDecisions, setLastDecisions] = useState<Decision[]>([])
  const [reportKind, setReportKind] = useState<'drill' | 'playbook'>('drill')
  const [lockedNoticeKey, setLockedNoticeKey] = useState<NoticeKey | null>(null)
  const [launchNoticeKey, setLaunchNoticeKey] = useState<NoticeKey | null>(null)

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
    setLockedNoticeKey(null)
    setLaunchNoticeKey(null)
    setScreen('catalog')
  }

  function openPath(pathId: string) {
    setLockedNoticeKey(null)
    setLaunchNoticeKey(null)
    setActivePathId(pathId)
    setScreen('path')
  }

  function openCert() {
    setLockedNoticeKey(null)
    setLaunchNoticeKey(null)
    setScreen('cert')
  }

  function handleLockedSelect() {
    setLockedNoticeKey('pathLockedHint')
  }

  function startModule(moduleId: string) {
    const state = refreshProgress()
    if (!isModuleUnlocked(moduleId, state)) {
      setLaunchNoticeKey('unlockHint')
      setScreen('path')
      return
    }

    const mod = modules[moduleId]
    if (!mod) return

    setActivePathId(mod.pathId)
    setActiveModuleId(moduleId)
    setLockedNoticeKey(null)
    setLaunchNoticeKey(null)
    setLastScore(0)
    setLastDecisions([])

    if (mod.kind === 'inbox') {
      setDrillScenarios(shiftScenarios)
      setDrillMode('inbox')
      setLastMaxScore(shiftScenarios.length)
      setReportKind('drill')
      setScreen('drill')
      return
    }

    if (mod.kind === 'pressure') {
      const pack = buildPressurePack(shiftScenarios)
      setDrillScenarios(pack)
      setDrillMode('pressure')
      setLastMaxScore(pack.length)
      setReportKind('drill')
      setScreen('drill')
      return
    }

    if (mod.kind === 'playbook') {
      setLastMaxScore(ui.playbookSteps.length)
      setReportKind('playbook')
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

  function handleDrillComplete(score: number, decisions: Decision[]) {
    setLastScore(score)
    setLastMaxScore(drillScenarios.length)
    setLastDecisions(decisions)
    setReportKind('drill')
    const next = markModuleComplete(activeModuleId, score, drillScenarios.length)
    refreshProgress(next)
    setScreen('report')
  }

  function handlePlaybookComplete(score: number, maxScore: number) {
    setLastScore(score)
    setLastMaxScore(maxScore)
    setLastDecisions([])
    setReportKind('playbook')
    const next = markModuleComplete(activeModuleId, score, maxScore)
    refreshProgress(next)
    setScreen('report')
  }

  function backFromReport() {
    setLaunchNoticeKey(null)
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
            {lockedNoticeKey && (
              <p className="catalog-locked-msg" role="status">
                {t(ui[lockedNoticeKey], lang)}
              </p>
            )}
          </>
        )}

        {screen === 'path' && (
          <PathDetail
            pathId={activePathId}
            lang={lang}
            progress={progress}
            lockedNotice={
              launchNoticeKey ? t(ui[launchNoticeKey], lang) : null
            }
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

            {reportKind === 'drill' && lastDecisions.length > 0 && (
              <>
                <h3 className="decision-log-heading">
                  {t(ui.resultsDetail, lang)}
                </h3>
                <ul className="log decision-log">
                  {lastDecisions.map((decision) => {
                    const scenario = drillScenarios.find(
                      (s) => s.id === decision.scenarioId,
                    )
                    if (!scenario) return null
                    return (
                      <li
                        key={decision.scenarioId}
                        className={
                          decision.correct ? 'decision-ok' : 'decision-bad'
                        }
                      >
                        <div className="decision-identity">
                          <span className="decision-from">
                            {t(ui.from, lang)}: {scenario.from[lang]}
                          </span>
                          <strong className="decision-subject">
                            {scenario.subject[lang]}
                          </strong>
                          <span className="decision-action">
                            {t(ui.yourAction, lang)}:{' '}
                            {t(ui.actions[decision.action], lang)}
                          </span>
                        </div>
                        <span
                          className={`badge ${decision.correct ? 'ok' : 'bad'}`}
                        >
                          {decision.correct
                            ? t(ui.decisionCorrect, lang)
                            : t(ui.decisionIncorrect, lang)}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </>
            )}

            {reportKind === 'playbook' && (
              <p className="playbook-report-summary" role="status">
                {t(ui.playbookReportSummary, lang)}
              </p>
            )}

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
