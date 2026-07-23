import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  FRONT_DESK_PATH_ID,
  MODULE_FULL_SHIFT,
  MODULE_PLAYBOOK,
  MODULE_PRESSURE,
} from '../data/curriculum'
import type { ProgressState } from '../types'
import {
  SCHOOL_PROGRESS_KEY,
  firstIncompleteModuleId,
  isModuleUnlocked,
  loadProgress,
  markModuleComplete,
  pathComplete,
  saveProgress,
} from './progress'

const LEGACY_SESSION_KEY = 'deskshield-v1'

function emptyState(lang: ProgressState['lang'] = 'en'): ProgressState {
  return { schemaVersion: 1, lang, modules: {} }
}

describe('progress', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    vi.restoreAllMocks()
  })

  describe('loadProgress / saveProgress', () => {
    it('loads a valid saved progress blob', () => {
      const saved = emptyState('es')
      localStorage.setItem(SCHOOL_PROGRESS_KEY, JSON.stringify(saved))
      expect(loadProgress()).toEqual(saved)
    })

    it('seeds empty progress and persists it when storage is empty', () => {
      const loaded = loadProgress()
      expect(loaded).toEqual(emptyState('en'))
      expect(JSON.parse(localStorage.getItem(SCHOOL_PROGRESS_KEY)!)).toEqual(
        emptyState('en'),
      )
    })

    it('migrates lang from legacy sessionStorage key', () => {
      sessionStorage.setItem(LEGACY_SESSION_KEY, JSON.stringify({ lang: 'es' }))
      const loaded = loadProgress()
      expect(loaded.lang).toBe('es')
      expect(JSON.parse(localStorage.getItem(SCHOOL_PROGRESS_KEY)!).lang).toBe(
        'es',
      )
    })

    it('falls through to empty progress when stored JSON is invalid', () => {
      localStorage.setItem(SCHOOL_PROGRESS_KEY, '{not-json')
      expect(loadProgress()).toEqual(emptyState('en'))
    })

    it('swallows quota / private-mode failures on save', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new DOMException('QuotaExceededError')
      })
      expect(() => saveProgress(emptyState())).not.toThrow()
    })
  })

  describe('unlock / pathComplete / firstIncomplete', () => {
    it('unlocks module 1 always; later modules need the previous complete', () => {
      const empty = emptyState()
      expect(isModuleUnlocked(MODULE_FULL_SHIFT, empty)).toBe(true)
      expect(isModuleUnlocked(MODULE_PRESSURE, empty)).toBe(false)
      expect(isModuleUnlocked(MODULE_PLAYBOOK, empty)).toBe(false)
      expect(isModuleUnlocked('unknown-module', empty)).toBe(false)

      const afterM1 = markModuleComplete(
        MODULE_FULL_SHIFT,
        3,
        4,
        empty,
        FRONT_DESK_PATH_ID,
      )
      expect(isModuleUnlocked(MODULE_PRESSURE, afterM1)).toBe(true)
      expect(isModuleUnlocked(MODULE_PLAYBOOK, afterM1)).toBe(false)
    })

    it('reports pathComplete only when all Front Desk modules are done', () => {
      let state = emptyState()
      expect(pathComplete(FRONT_DESK_PATH_ID, state)).toBe(false)

      state = markModuleComplete(MODULE_FULL_SHIFT, 4, 4, state)
      state = markModuleComplete(MODULE_PRESSURE, 3, 4, state)
      expect(pathComplete(FRONT_DESK_PATH_ID, state)).toBe(false)

      state = markModuleComplete(MODULE_PLAYBOOK, 5, 5, state)
      expect(pathComplete(FRONT_DESK_PATH_ID, state)).toBe(true)
    })

    it('returns the first incomplete module id along the path', () => {
      let state = emptyState()
      expect(firstIncompleteModuleId(FRONT_DESK_PATH_ID, state)).toBe(
        MODULE_FULL_SHIFT,
      )

      state = markModuleComplete(MODULE_FULL_SHIFT, 4, 4, state)
      expect(firstIncompleteModuleId(FRONT_DESK_PATH_ID, state)).toBe(
        MODULE_PRESSURE,
      )

      state = markModuleComplete(MODULE_PRESSURE, 4, 4, state)
      state = markModuleComplete(MODULE_PLAYBOOK, 5, 5, state)
      expect(firstIncompleteModuleId(FRONT_DESK_PATH_ID, state)).toBeUndefined()
    })
  })
})
