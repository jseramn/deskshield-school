import {
  FRONT_DESK_PATH_ID,
  getModulesForPath,
  getPath,
  modules,
} from '../data/curriculum'
import type { Lang, ProgressState } from '../types'

export const SCHOOL_PROGRESS_KEY = 'deskshield-school-v1'
const LEGACY_SESSION_KEY = 'deskshield-v1'

function emptyProgress(lang: Lang = 'en'): ProgressState {
  return {
    schemaVersion: 1,
    lang,
    modules: {},
  }
}

function readLegacyLang(): Lang | null {
  try {
    const raw = sessionStorage.getItem(LEGACY_SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { lang?: Lang }
    if (parsed.lang === 'es' || parsed.lang === 'en') return parsed.lang
    return null
  } catch {
    return null
  }
}

function isProgressState(value: unknown): value is ProgressState {
  if (!value || typeof value !== 'object') return false
  const v = value as Partial<ProgressState>
  return (
    v.schemaVersion === 1 &&
    (v.lang === 'en' || v.lang === 'es') &&
    typeof v.modules === 'object' &&
    v.modules !== null
  )
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(SCHOOL_PROGRESS_KEY)
    if (raw) {
      const parsed: unknown = JSON.parse(raw)
      if (isProgressState(parsed)) return parsed
    }
  } catch {
    // fall through to migrate / empty
  }

  const legacyLang = readLegacyLang()
  const seeded = emptyProgress(legacyLang ?? 'en')
  saveProgress(seeded)
  return seeded
}

export function saveProgress(state: ProgressState): void {
  try {
    localStorage.setItem(SCHOOL_PROGRESS_KEY, JSON.stringify(state))
  } catch {
    // QuotaExceededError / private mode — keep in-memory progress for the session.
  }
}

export function getLang(state: ProgressState = loadProgress()): Lang {
  return state.lang
}

export function setLang(lang: Lang, state: ProgressState = loadProgress()): ProgressState {
  const next: ProgressState = { ...state, lang }
  saveProgress(next)
  return next
}

export function markModuleComplete(
  moduleId: string,
  score: number,
  maxScore: number,
  state: ProgressState = loadProgress(),
  pathId: string = FRONT_DESK_PATH_ID,
): ProgressState {
  const prev = state.modules[moduleId]
  const bestScore = prev ? Math.max(prev.bestScore, score) : score
  const next: ProgressState = {
    ...state,
    lastPathId: pathId,
    lastModuleId: moduleId,
    modules: {
      ...state.modules,
      [moduleId]: {
        completedAt: prev?.completedAt ?? new Date().toISOString(),
        bestScore,
        maxScore: prev ? Math.max(prev.maxScore, maxScore) : maxScore,
      },
    },
  }
  saveProgress(next)
  return next
}

export function isModuleComplete(
  moduleId: string,
  state: ProgressState = loadProgress(),
): boolean {
  return Boolean(state.modules[moduleId]?.completedAt)
}

export function pathComplete(
  pathId: string = FRONT_DESK_PATH_ID,
  state: ProgressState = loadProgress(),
): boolean {
  const path = getPath(pathId)
  if (!path || path.moduleIds.length === 0) return false
  return path.moduleIds.every((id) => isModuleComplete(id, state))
}

/** First incomplete module on the path, or undefined if path is done / empty. */
export function firstIncompleteModuleId(
  pathId: string = FRONT_DESK_PATH_ID,
  state: ProgressState = loadProgress(),
): string | undefined {
  const mods = getModulesForPath(pathId)
  return mods.find((m) => !isModuleComplete(m.id, state))?.id
}

/**
 * Sequential unlock: module 1 is always open; N+1 requires N complete.
 * Unknown modules are locked.
 */
export function isModuleUnlocked(
  moduleId: string,
  state: ProgressState = loadProgress(),
): boolean {
  const mod = modules[moduleId]
  if (!mod) return false
  const pathMods = getModulesForPath(mod.pathId)
  const idx = pathMods.findIndex((m) => m.id === moduleId)
  if (idx < 0) return false
  if (idx === 0) return true
  return isModuleComplete(pathMods[idx - 1].id, state)
}

/** True when Front Desk has at least one completion but path is not finished. */
export function hasIncompleteFrontDeskProgress(
  state: ProgressState = loadProgress(),
): boolean {
  const mods = getModulesForPath(FRONT_DESK_PATH_ID)
  if (mods.length === 0) return false
  const anyDone = mods.some((m) => isModuleComplete(m.id, state))
  return anyDone && !pathComplete(FRONT_DESK_PATH_ID, state)
}
