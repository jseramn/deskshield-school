import type { Module, Path } from '../types'

export const FRONT_DESK_PATH_ID = 'front-desk'

export const MODULE_FULL_SHIFT = 'front-desk-full-shift'
export const MODULE_PRESSURE = 'front-desk-pressure'
export const MODULE_PLAYBOOK = 'front-desk-playbook'

export const modules: Record<string, Module> = {
  [MODULE_FULL_SHIFT]: {
    id: MODULE_FULL_SHIFT,
    pathId: FRONT_DESK_PATH_ID,
    kind: 'inbox',
    order: 1,
    title: {
      en: 'Full shift — inbox drill',
      es: 'Turno completo — drill de bandeja',
    },
  },
  [MODULE_PRESSURE]: {
    id: MODULE_PRESSURE,
    pathId: FRONT_DESK_PATH_ID,
    kind: 'pressure',
    order: 2,
    title: {
      en: 'Pressure shift — timed remix',
      es: 'Turno bajo presión — remix cronometrado',
    },
  },
  [MODULE_PLAYBOOK]: {
    id: MODULE_PLAYBOOK,
    pathId: FRONT_DESK_PATH_ID,
    kind: 'playbook',
    order: 3,
    title: {
      en: '5-minute playbook',
      es: 'Playbook de 5 minutos',
    },
  },
}

export const paths: Path[] = [
  {
    id: FRONT_DESK_PATH_ID,
    status: 'playable',
    title: {
      en: 'Front Desk',
      es: 'Recepción',
    },
    moduleIds: [MODULE_FULL_SHIFT, MODULE_PRESSURE, MODULE_PLAYBOOK],
  },
  {
    id: 'night-auditor',
    status: 'locked',
    title: {
      en: 'Night Auditor',
      es: 'Auditor nocturno',
    },
    moduleIds: [],
  },
  {
    id: 'reservations',
    status: 'locked',
    title: {
      en: 'Reservations',
      es: 'Reservas',
    },
    moduleIds: [],
  },
  {
    id: 'manager',
    status: 'locked',
    title: {
      en: 'Manager',
      es: 'Gerencia',
    },
    moduleIds: [],
  },
]

export function getPath(pathId: string): Path | undefined {
  return paths.find((p) => p.id === pathId)
}

export function getModulesForPath(pathId: string): Module[] {
  const path = getPath(pathId)
  if (!path) return []
  return path.moduleIds
    .map((id) => modules[id])
    .filter((m): m is Module => Boolean(m))
    .sort((a, b) => a.order - b.order)
}
