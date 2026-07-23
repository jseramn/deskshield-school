export type Lang = 'en' | 'es'

export type ActionId =
  | 'report'
  | 'open'
  | 'forward'
  | 'mark_safe'

export type Localized = Record<Lang, string>

export interface Scenario {
  id: string
  isPhish: boolean
  from: Localized
  subject: Localized
  preview: Localized
  body: Localized
  attachment?: Localized
  redFlags: Localized[]
  correct: ActionId[]
  whyCorrect: Localized
  whyWrong: Localized
}

export interface Decision {
  scenarioId: string
  action: ActionId
  correct: boolean
}

export type DrillKind = 'inbox' | 'pressure' | 'playbook'

export type PathStatus = 'playable' | 'locked'

export interface Module {
  id: string
  pathId: string
  kind: DrillKind
  title: Localized
  order: number
}

export interface Path {
  id: string
  status: PathStatus
  title: Localized
  moduleIds: string[]
}

export interface ModuleProgress {
  completedAt: string
  bestScore: number
  maxScore: number
}

export interface ProgressState {
  schemaVersion: 1
  lang: Lang
  modules: Record<string, ModuleProgress>
  lastPathId?: string
  lastModuleId?: string
}

/** App shell screens. DrillPlayer owns inbox/mail/feedback internally. */
export type Screen =
  | 'catalog'
  | 'path'
  | 'drill'
  | 'playbook-drill'
  | 'report'
  | 'cert'

/** Notice keys stored in App so language toggle re-translates (R2-002). */
export type NoticeKey = 'pathLockedHint' | 'unlockHint'
