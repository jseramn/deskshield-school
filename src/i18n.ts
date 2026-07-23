import type { ActionId, Lang } from './types'

export const ui = {
  brand: { en: 'DeskShield', es: 'DeskShield' },
  tagline: {
    en: 'Front-desk phishing training for small hotels',
    es: 'Entrenamiento de phishing para recepción de hoteles pequeños',
  },
  trainingBanner: {
    en: 'TRAINING MODE — Simulated emails only. No real malware. No live payment links.',
    es: 'MODO ENTRENAMIENTO — Solo correos simulados. Sin malware real. Sin enlaces de pago vivos.',
  },
  start: { en: 'Start training shift', es: 'Iniciar turno de entrenamiento' },
  whyTitle: {
    en: 'Why this exists',
    es: 'Por qué existe esto',
  },
  whyBody: {
    en: 'LatAm hotels have been targeted by campaigns such as RevengeHotels / TA558: fake reservations, invoices, and CVs designed to infect front-desk PCs and steal guest payment data. Small properties rarely get role-specific practice. DeskShield gives reception a safe shift simulator.',
    es: 'Hoteles en LatAm han sido blanco de campañas como RevengeHotels / TA558: reservas, facturas y CVs falsos para infectar PCs de recepción y robar datos de pago. Los hoteles pequeños casi no practican por rol. DeskShield da a recepción un simulador seguro de turno.',
  },
  inbox: { en: 'Reception inbox', es: 'Bandeja de recepción' },
  unread: { en: 'messages', es: 'mensajes' },
  openMail: { en: 'Open', es: 'Abrir' },
  attachment: { en: 'Attachment', es: 'Adjunto' },
  decide: { en: 'What do you do?', es: '¿Qué haces?' },
  actions: {
    report: { en: 'Report as phishing', es: 'Reportar phishing' },
    open: { en: 'Open attachment / link', es: 'Abrir adjunto / enlace' },
    forward: { en: 'Escalate to manager', es: 'Escalar a gerencia' },
    mark_safe: { en: 'Treat as routine / safe', es: 'Tratar como rutinario / seguro' },
  } as Record<ActionId, { en: string; es: string }>,
  correct: { en: 'Good call', es: 'Buena decisión' },
  incorrect: { en: 'Risky move', es: 'Movimiento riesgoso' },
  redFlags: { en: 'Red flags', es: 'Señales de alerta' },
  next: { en: 'Next message', es: 'Siguiente mensaje' },
  toPlaybook: { en: 'Open 5-minute playbook', es: 'Abrir playbook de 5 minutos' },
  playbookTitle: {
    en: 'First 5 minutes after a suspected phish',
    es: 'Primeros 5 minutos ante un posible phishing',
  },
  playbookSteps: [
    {
      en: '1. Do not open attachments or links. Disconnect curiosity.',
      es: '1. No abras adjuntos ni enlaces. Apaga la curiosidad.',
    },
    {
      en: '2. Preserve the email (do not delete yet). Note time and sender.',
      es: '2. Conserva el correo (no lo borres aún). Anota hora y remitente.',
    },
    {
      en: '3. Tell the shift manager / systems contact immediately.',
      es: '3. Avisa de inmediato a gerencia de turno / contacto de sistemas.',
    },
    {
      en: '4. If anything was opened: stop using that PC for payments; isolate if possible.',
      es: '4. Si algo se abrió: deja de usar esa PC para pagos; aísla si puedes.',
    },
    {
      en: '5. Verify any “reservation/invoice” claim in your PMS / known vendor channel — never via the email’s link.',
      es: '5. Verifica cualquier “reserva/factura” en el PMS / canal conocido del proveedor — nunca por el enlace del correo.',
    },
    {
      en: '6. Remind the desk: never type guest card data into unexpected portals.',
      es: '6. Recuerda al equipo: nunca escribas datos de tarjeta en portales inesperados.',
    },
  ],
  finishReport: { en: 'View manager report card', es: 'Ver reporte gerencial' },
  reportTitle: { en: 'Shift report card', es: 'Reporte del turno' },
  score: { en: 'Correct decisions', es: 'Decisiones correctas' },
  restart: { en: 'Train again', es: 'Entrenar de nuevo' },
  langToggle: { en: 'ES', es: 'EN' },
  homeCtaHint: {
    en: '4 simulated messages · bilingual · hotel reception focus',
    es: '4 mensajes simulados · bilingüe · enfoque recepción hotelera',
  },
  schoolHome: { en: 'School Home', es: 'Inicio de la escuela' },
  schoolIntro: {
    en: 'Choose a role path. Front Desk is open; other roles are coming soon.',
    es: 'Elige una ruta por rol. Recepción está abierta; los demás roles llegan pronto.',
  },
  continuePath: { en: 'Continue', es: 'Continuar' },
  continueHint: {
    en: 'Resume your Front Desk path at the next incomplete module.',
    es: 'Retoma tu ruta de Recepción en el siguiente módulo incompleto.',
  },
  openPath: { en: 'Open path', es: 'Abrir ruta' },
  pathLocked: { en: 'Coming soon', es: 'Próximamente' },
  pathLockedHint: {
    en: 'This role path is locked. No modules start from here.',
    es: 'Esta ruta está bloqueada. No se inician módulos desde aquí.',
  },
  backToCatalog: { en: 'Back to School Home', es: 'Volver al inicio' },
  pathOverview: { en: 'Path overview', es: 'Resumen de la ruta' },
  moduleComplete: { en: 'Complete', es: 'Completado' },
  moduleIncomplete: { en: 'Not started', es: 'Sin empezar' },
  moduleLocked: { en: 'Locked', es: 'Bloqueado' },
  startModule: { en: 'Start module', es: 'Iniciar módulo' },
  unlockHint: {
    en: 'Complete the previous module to unlock.',
    es: 'Completa el módulo anterior para desbloquear.',
  },
  pathCompleteLabel: { en: 'Path complete', es: 'Ruta completa' },
  pathInProgress: { en: 'In progress', es: 'En progreso' },
  backToPath: { en: 'Back to path', es: 'Volver a la ruta' },
  moduleLaunchLater: {
    en: 'Module unlocked. Launch arrives in the next training update.',
    es: 'Módulo desbloqueado. El lanzamiento llega en la próxima actualización.',
  },
  from: { en: 'From', es: 'De' },
  subject: { en: 'Subject', es: 'Asunto' },
  resultsDetail: { en: 'Decision log', es: 'Registro de decisiones' },
  passHint: {
    en: 'Ready for the floor: escalate pressure + attachments; verify routine OTA mail in your systems.',
    es: 'Listo para el piso: escala presión + adjuntos; verifica correo OTA rutinario en tus sistemas.',
  },
  failHint: {
    en: 'Review the playbook and retry. Front-desk PCs hold guest payment risk.',
    es: 'Revisa el playbook y reintenta. Las PCs de recepción concentran riesgo de pago de huéspedes.',
  },
} as const

export function t(
  dict: { en: string; es: string },
  lang: Lang,
): string {
  return dict[lang]
}
