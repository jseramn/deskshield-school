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

export type Screen = 'home' | 'inbox' | 'mail' | 'feedback' | 'playbook' | 'report'
