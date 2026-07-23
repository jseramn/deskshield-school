# DeskShield

**Front-desk phishing training for small hotels**

DeskShield is a bilingual (English / Spanish) web trainer that simulates a hotel reception inbox. Front-desk staff practice spotting social-engineering lures inspired by publicly documented hospitality campaigns (for example RevengeHotels / TA558 themes: fake reservations, invoices, and job CVs), then follow a **5-minute incident playbook** and receive a **manager report card**.

> **Training only.** All messages are simulated. There is no real malware, no live payment portals, and no outbound email.

## Problem statement

Small hotels concentrate guest payment and reservation work on a few front-desk PCs, yet rarely get role-specific security practice. Attackers have used AI-assisted phishing against LatAm hospitality to deliver remote-access malware and steal card data. Generic awareness courses exist; DeskShield focuses on **reception workflows** and **bilingual** coaching.

## Solution overview

1. Open a simulated reception inbox.
2. Read each message and choose an action (report, open, escalate, treat as routine).
3. Get immediate feedback with red flags.
4. Review the first-5-minutes playbook.
5. Share the shift report card with a manager.

## Features

- ES/EN UI toggle
- 4 scenario pack (3 phishing + 1 routine OTA-style message)
- Decide / feedback loop with red-flag teaching
- 5-minute incident playbook
- Session report card (local / session only)
- Sticky training-mode banner
- Static deploy — no backend, no secrets

## Technology stack

- React 19 + TypeScript
- Vite 8
- Session storage for language preference only

## Installation

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

Static output is written to `dist/` and can be hosted on GitHub Pages, Netlify, Vercel, or any static host.

## Usage guide

1. Choose **EN** or **ES** in the top bar.
2. Click **Start training shift**.
3. Open each inbox message and decide what a receptionist should do.
4. Read feedback — do not skip red flags.
5. Open the playbook, then the report card.
6. Retry until decisions are consistent.

## Screenshots

![Home](docs/screenshots/01-home.png)

![Inbox](docs/screenshots/02-inbox.png)

![Message decision](docs/screenshots/03-mail.png)

![Playbook](docs/screenshots/04-playbook.png)

![Report card](docs/screenshots/05-report.png)

## Demo video

See [DEMO.md](./DEMO.md) for a 3–5 minute script aligned with TSOC requirements.

## Future scope (post v1)

- More role packs (night auditor, reservations, F&B cashier)
- Manager PDF export
- Optional AI-generated scenario variants with human review
- SCORM / LMS packaging
- Partner localization QA for LatAm Spanish variants

## Team

- José Ramón García Del Risco — product / development

## Acknowledgments

Threat themes are informed by public reporting on hospitality-targeted phishing (for example Kaspersky / Securelist coverage of RevengeHotels / TA558). DeskShield does not reproduce malware and is not affiliated with those researchers or vendors.

## License

MIT — see [LICENSE](./LICENSE).

## Hackathon note

Built for **Technoviz Summer of Code (TSOC) 2026** on Devpost. AI coding assistants were used responsibly; the author can explain every scenario and UI decision.
