import type { Scenario } from '../types'

/**
 * Training scenarios inspired by publicly documented RevengeHotels / TA558
 * social-engineering themes (fake reservations, invoices, job CVs).
 * These are SAFE simulations — no malware payloads, no live links.
 */
export const shiftScenarios: Scenario[] = [
  {
    id: 'reservation-attachment',
    isPhish: true,
    from: {
      en: 'guest.booking@reservas-urgente.com',
      es: 'guest.booking@reservas-urgente.com',
    },
    subject: {
      en: 'URGENT — Group reservation request (please open attached form)',
      es: 'URGENTE — Solicitud de reserva grupal (abrir formulario adjunto)',
    },
    preview: {
      en: 'We need 8 rooms for next weekend. Form attached for rates…',
      es: 'Necesitamos 8 habitaciones para el próximo fin de semana. Formulario adjunto…',
    },
    body: {
      en: `Dear Front Desk,

We are organizing a corporate retreat and need 8 double rooms for next Friday–Sunday.
Please review the attached reservation form and reply with availability and total quote ASAP.
Our company card will be charged on arrival.

Thank you,
Laura Mendes — Travel Coordinator`,
      es: `Estimada recepción,

Estamos organizando un retiro corporativo y necesitamos 8 habitaciones dobles para el próximo viernes–domingo.
Por favor revise el formulario de reserva adjunto y responda con disponibilidad y cotización lo antes posible.
La tarjeta de la empresa se cargará al llegar.

Gracias,
Laura Mendes — Coordinadora de viajes`,
    },
    attachment: {
      en: 'Group_Reservation_Form.docm',
      es: 'Formulario_Reserva_Grupal.docm',
    },
    redFlags: [
      {
        en: 'Unknown domain that looks “almost” legitimate (reservas-urgente.com)',
        es: 'Dominio desconocido que parece “casi” legítimo (reservas-urgente.com)',
      },
      {
        en: 'Pressure language: URGENT / ASAP',
        es: 'Lenguaje de presión: URGENTE / lo antes posible',
      },
      {
        en: 'Macro-enabled document (.docm) from an unverified sender',
        es: 'Documento con macros (.docm) de un remitente no verificado',
      },
      {
        en: 'Asks you to open an attachment before confirming identity in your PMS',
        es: 'Pide abrir un adjunto antes de confirmar identidad en el PMS',
      },
    ],
    correct: ['report', 'forward'],
    whyCorrect: {
      en: 'RevengeHotels-style campaigns often lure front desks with fake reservation requests and weaponized Office files. Report it and escalate — never open the attachment.',
      es: 'Campañas tipo RevengeHotels suelen engañar a recepción con reservas falsas y archivos de Office maliciosos. Repórtalo y escala — nunca abras el adjunto.',
    },
    whyWrong: {
      en: 'Opening or trusting this attachment can install remote-access malware used to steal guest payment data from front-desk PCs.',
      es: 'Abrir o confiar en este adjunto puede instalar malware de acceso remoto usado para robar datos de pago de huéspedes en PCs de recepción.',
    },
  },
  {
    id: 'overdue-invoice',
    isPhish: true,
    from: {
      en: 'cobranzas@proveedor-hotelero.net',
      es: 'cobranzas@proveedor-hotelero.net',
    },
    subject: {
      en: 'Final notice: unpaid invoice INV-88421 — pay within 24h',
      es: 'Aviso final: factura impaga INV-88421 — pague en 24h',
    },
    preview: {
      en: 'Your account will be suspended. Click to view PDF invoice…',
      es: 'Su cuenta será suspendida. Haga clic para ver la factura PDF…',
    },
    body: {
      en: `Accounts Payable / Front Office,

Our records show invoice INV-88421 ($2,480 USD) is overdue.
Click the secure portal link below to download the PDF and avoid service interruption:

[View invoice portal — simulated link blocked in training]

If payment is not confirmed in 24 hours, linen and F&B deliveries will stop.

Finance Desk`,
      es: `Cuentas por pagar / Recepción,

Nuestros registros muestran la factura INV-88421 (USD 2.480) vencida.
Haga clic en el enlace del portal seguro para descargar el PDF y evitar la interrupción del servicio:

[Ver portal de factura — enlace simulado bloqueado en entrenamiento]

Si el pago no se confirma en 24 horas, se detendrán entregas de lencería y A&B.

Mesa de finanzas`,
    },
    redFlags: [
      {
        en: 'Threatens operational shutdown to force a click',
        es: 'Amenaza con detener operaciones para forzar un clic',
      },
      {
        en: 'External “portal” instead of your known vendor channel',
        es: '“Portal” externo en lugar del canal conocido del proveedor',
      },
      {
        en: 'Front desk is not Accounts Payable — wrong role targeting',
        es: 'Recepción no es Cuentas por pagar — objetivo de rol incorrecto',
      },
      {
        en: 'Generic finance tone with no prior purchase order reference you recognize',
        es: 'Tono financiero genérico sin orden de compra que reconozcas',
      },
    ],
    correct: ['report', 'forward'],
    whyCorrect: {
      en: 'Invoice-themed phishing is a documented hotel-targeting lure. Verify with your manager/AP using a known phone number — never through the email’s link.',
      es: 'El phishing con tema de facturas es un señuelo documentado contra hoteles. Verifica con gerencia/CxP por un teléfono conocido — nunca con el enlace del correo.',
    },
    whyWrong: {
      en: 'Clicking “invoice portals” from cold emails is a common path to credential theft and malware on reception machines.',
      es: 'Hacer clic en “portales de factura” de correos fríos es una vía común a robo de credenciales y malware en PCs de recepción.',
    },
  },
  {
    id: 'fake-cv',
    isPhish: true,
    from: {
      en: 'candidato.rrhh@mail-rapido.info',
      es: 'candidato.rrhh@mail-rapido.info',
    },
    subject: {
      en: 'Application — Night Auditor / Front Desk (CV attached)',
      es: 'Postulación — Auditor nocturno / Recepción (CV adjunto)',
    },
    preview: {
      en: 'Please open my CV and portfolio for the night auditor vacancy…',
      es: 'Por favor abra mi CV y portafolio para la vacante de auditor nocturno…',
    },
    body: {
      en: `Hello Hiring Team,

I saw your night auditor opening and I am available immediately.
Please open the attached CV_Portfolio.exe (zipped as CV_JuanPerez.zip in some variants) to review my experience and references.

I can start this weekend.

Best regards,
Juan Pérez`,
      es: `Hola equipo de contratación,

Vi la vacante de auditor nocturno y estoy disponible de inmediato.
Por favor abra el CV_Portafolio.exe adjunto (a veces empaquetado como CV_JuanPerez.zip) para revisar mi experiencia y referencias.

Puedo empezar este fin de semana.

Saludos,
Juan Pérez`,
    },
    attachment: {
      en: 'CV_JuanPerez.zip',
      es: 'CV_JuanPerez.zip',
    },
    redFlags: [
      {
        en: 'Executable or archive attached to an unsolicited job email',
        es: 'Ejecutable o archivo comprimido en un correo de empleo no solicitado',
      },
      {
        en: 'Recent campaigns used fake CVs against hotels when openings were assumed',
        es: 'Campañas recientes usaron CVs falsos contra hoteles asumiendo vacantes',
      },
      {
        en: 'Odd sender domain for a personal applicant',
        es: 'Dominio raro del remitente para un postulante personal',
      },
      {
        en: 'Pushes you to open the file instead of applying through official HR channels',
        es: 'Te empuja a abrir el archivo en vez de postular por canales oficiales de RR.HH.',
      },
    ],
    correct: ['report'],
    whyCorrect: {
      en: 'Fake job applications with malicious archives are a documented hospitality lure. Route applicants only through HR — quarantine the file and report.',
      es: 'Postulaciones falsas con archivos maliciosos son un señuelo documentado en hospitalidad. Deriva candidatos solo por RR.HH. — cuarentena y reporte.',
    },
    whyWrong: {
      en: 'Opening unsolicited CV archives has been used to drop RATs on front-desk systems.',
      es: 'Abrir archivos de CV no solicitados se ha usado para instalar RATs en sistemas de recepción.',
    },
  },
  {
    id: 'legit-booking',
    isPhish: false,
    from: {
      en: 'noreply@booking.com',
      es: 'noreply@booking.com',
    },
    subject: {
      en: 'Booking.com — Modification request for reservation 3849210456',
      es: 'Booking.com — Solicitud de modificación para reserva 3849210456',
    },
    preview: {
      en: 'Guest asks to change late check-in time; review in Extranet…',
      es: 'Huésped pide cambiar check-in tarde; revise en Extranet…',
    },
    body: {
      en: `Hello Property Partner,

A guest requested a late check-in change for reservation 3849210456 (arrival tomorrow).
Please review the request in the Booking.com Extranet under Reservations → Modifications.
Do not collect card data by email. Use your property’s normal Extranet workflow.

This message contains no attachments.

Booking.com Partner Communications`,
      es: `Hola partner,

Un huésped solicitó cambio de check-in tarde para la reserva 3849210456 (llegada mañana).
Revise la solicitud en la Extranet de Booking.com en Reservas → Modificaciones.
No recolecte datos de tarjeta por correo. Use el flujo normal de Extranet.

Este mensaje no incluye adjuntos.

Booking.com Partner Communications`,
    },
    redFlags: [
      {
        en: 'No attachment and no “click here to pay” lure',
        es: 'Sin adjunto y sin señuelo de “pague aquí”',
      },
      {
        en: 'Points you to the known Extranet workflow (still verify reservation ID in your system)',
        es: 'Te indica el flujo conocido de Extranet (aún así verifica el ID en tu sistema)',
      },
      {
        en: 'Explicitly says not to collect card data by email',
        es: 'Dice explícitamente no recolectar datos de tarjeta por correo',
      },
    ],
    correct: ['mark_safe', 'forward'],
    whyCorrect: {
      en: 'This looks like a routine channel message: no attachment, no payment link, and it points to your normal Extranet process. Still verify the reservation ID in your PMS before acting.',
      es: 'Parece un mensaje rutinario del canal: sin adjunto, sin enlace de pago, y apunta a tu proceso normal de Extranet. Aún así verifica el ID de reserva en el PMS antes de actuar.',
    },
    whyWrong: {
      en: 'Reporting every routine OTA message creates alert fatigue. Learn to separate pressure+attachment lures from normal operational mail — while still verifying details in your systems.',
      es: 'Reportar cada mensaje rutinario de OTA crea fatiga de alertas. Separe señuelos con presión+adjunto del correo operativo normal — siempre verificando detalles en sus sistemas.',
    },
  },
]


/** Shallow-copy then Fisher–Yates shuffle for the pressure module remix. */
export function buildPressurePack(source: Scenario[]): Scenario[] {
  const copy = [...source]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j]!, copy[i]!]
  }
  return copy
}
