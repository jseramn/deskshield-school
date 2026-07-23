import type { ActionId, Lang } from './types'

export const ui = {
  brand: { en: 'DeskShield', es: 'DeskShield' },
  tagline: {
    en: 'Hotel role-path phishing school for small properties',
    es: 'Escuela de phishing por rol para hoteles pequeños',
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
  pathNotStarted: { en: 'Not started', es: 'Sin empezar' },
  backToPath: { en: 'Back to path', es: 'Volver a la ruta' },
  pressureMode: { en: 'Pressure mode', es: 'Modo presión' },
  pressureTimer: { en: 'Soft timer', es: 'Temporizador suave' },
  pressureTimerHint: {
    en: 'Warning only — the drill does not end when time runs out.',
    es: 'Solo aviso — el drill no termina cuando se acaba el tiempo.',
  },
  pressureTimerUp: {
    en: "Time's up (warning) — finish at your pace",
    es: 'Tiempo cumplido (aviso) — termina a tu ritmo',
  },
  playbookConfirm: { en: 'Confirm step done', es: 'Confirmar paso hecho' },
  playbookConfirmed: { en: 'Confirmed', es: 'Confirmado' },
  playbookConfirmHint: {
    en: 'Confirm each step — this is not a read-only checklist.',
    es: 'Confirma cada paso — no es una lista solo para leer.',
  },
  playbookProgress: { en: 'Steps confirmed', es: 'Pasos confirmados' },
  viewCert: { en: 'View cert-lite badge', es: 'Ver insignia cert-lite' },
  certTitle: {
    en: 'Front Desk cert-lite (local)',
    es: 'Cert-lite de Recepción (local)',
  },
  certBadge: {
    en: 'Path complete — local training badge',
    es: 'Ruta completa — insignia local de entrenamiento',
  },
  certDisclaimer: {
    en: 'Local / non-verifiable. Not a compliance certificate, audit record, or remote roster. Saved only on this device — no cross-device sync.',
    es: 'Local / no verificable. No es certificado de cumplimiento, auditoría ni roster remoto. Solo en este dispositivo — sin sincronización entre dispositivos.',
  },
  certPrint: { en: 'Print local report', es: 'Imprimir reporte local' },
  certShare: { en: 'Share local summary', es: 'Compartir resumen local' },
  shareCopied: {
    en: 'Summary copied to clipboard.',
    es: 'Resumen copiado al portapapeles.',
  },
  shareFailed: {
    en: 'Could not share or copy the summary. Try print instead.',
    es: 'No se pudo compartir ni copiar el resumen. Prueba imprimir.',
  },
  certDownloadPdf: {
    en: 'Download PDF',
    es: 'Descargar PDF',
  },
  certPdfWorking: {
    en: 'Preparing PDF…',
    es: 'Preparando PDF…',
  },
  certPdfFailed: {
    en: 'Could not create the PDF. Try again or use print.',
    es: 'No se pudo crear el PDF. Intenta de nuevo o usa imprimir.',
  },
  certModuleScores: {
    en: 'Module scores',
    es: 'Puntajes por módulo',
  },
  certGeneratedAt: {
    en: 'Generated',
    es: 'Generado',
  },
  certLocalEvidence: {
    en: 'Local session evidence for the learner and manager — personal training proof kept on this device, not a compliance roster.',
    es: 'Evidencia local de sesión para el aprendiz y el gerente — prueba personal de entrenamiento en este dispositivo, no un roster de cumplimiento.',
  },
  certNotReady: {
    en: 'Complete all three Front Desk modules to unlock the cert-lite badge.',
    es: 'Completa los tres módulos de Recepción para desbloquear la insignia cert-lite.',
  },

  from: { en: 'From', es: 'De' },
  subject: { en: 'Subject', es: 'Asunto' },
  resultsDetail: { en: 'Decision log', es: 'Registro de decisiones' },
  decisionCorrect: { en: 'Correct', es: 'Correcto' },
  decisionIncorrect: { en: 'Incorrect', es: 'Incorrecto' },
  yourAction: { en: 'Your action', es: 'Tu acción' },
  playbookReportSummary: {
    en: 'All playbook steps confirmed.',
    es: 'Todos los pasos del playbook confirmados.',
  },
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
