# DeskShield School

**Hotel role-path phishing school for small properties**

DeskShield is a bilingual (English / Spanish) static web school. Learners open a **School Home** catalog, choose a role path, and complete modules. **Front Desk** is playable today with three modules: full-shift inbox drill, pressure remix (shuffled + soft timer), and an interactive 5-minute playbook. Night Auditor, Reservations, and Manager paths are visible as coming soon.

> **Training only.** All messages are simulated. There is no real malware, no live payment portals, and no outbound email. Progress and the cert-lite badge are **local / non-verifiable** on this device — not compliance, audit, or remote roster evidence.

## Problem statement

Small hotels concentrate guest payment and reservation work on a few front-desk PCs, yet rarely get role-specific security practice. Attackers have used AI-assisted phishing against LatAm hospitality to deliver remote-access malware and steal card data. Generic awareness courses exist; DeskShield focuses on **reception workflows**, **path progress**, and **bilingual** coaching.

## Solution overview

1. Open **School Home** and choose the Front Desk path (other roles stay locked).
2. Complete modules in order: full shift → pressure remix → interactive playbook.
3. Get immediate feedback with red flags on inbox/pressure decisions.
4. Confirm each playbook step (not read-only).
5. When the path is complete, open the **cert-lite** local badge and print/share the session report.

## Features

- School catalog with four role paths (Front Desk playable)
- Sequential Front Desk modules with Continue resume
- ES/EN UI toggle (persisted in local progress)
- Full-shift 4-scenario pack + pressure shuffle + warning-only soft timer
- Interactive do/confirm playbook → report card
- Cert-lite badge gated on path completion (local / non-verifiable)
- Sticky training-mode banner (including print view)
- Static deploy — no backend, no secrets

## Technology stack

- React 19 + TypeScript
- Vite 8
- `localStorage` progress key `deskshield-school-v1` (one-time migrate from session lang)

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
2. From School Home, open **Front Desk** (or **Continue** if you have incomplete progress).
3. Start Module 1 (full shift), decide on each message, finish the report.
4. Unlock and complete Module 2 (pressure) and Module 3 (playbook confirms).
5. Open **cert-lite**, read the local/non-verifiable disclaimer, print or share.

## Screenshots

![Home](docs/screenshots/01-home.png)

![Inbox](docs/screenshots/02-inbox.png)

![Message decision](docs/screenshots/03-mail.png)

![Playbook](docs/screenshots/04-playbook.png)

![Report card](docs/screenshots/05-report.png)

## Demo video

See [DEMO.md](./DEMO.md) for a 3–5 minute script aligned with TSOC requirements (catalog → path → modules → cert-lite).

## Future scope

- Unlock Night Auditor, Reservations, and Manager paths
- Manager PDF export / LMS packaging
- Optional AI-generated scenario variants with human review
- Partner localization QA for LatAm Spanish variants

## Team

- José Ramón García Del Risco — product / development

## Acknowledgments

Threat themes are informed by public reporting on hospitality-targeted phishing (for example Kaspersky / Securelist coverage of RevengeHotels / TA558). DeskShield does not reproduce malware and is not affiliated with those researchers or vendors.

## License

MIT — see [LICENSE](./LICENSE).

## Hackathon note

Built for **Technoviz Summer of Code (TSOC) 2026** on Devpost. AI coding assistants were used responsibly; the author can explain every scenario and UI decision.
