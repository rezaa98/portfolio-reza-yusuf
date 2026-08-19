# Reza Yusuf Maulana - Professional Portfolio

A modern, highly-interactive, and bilingual professional portfolio website built to showcase my experience as a QA Engineer & AI Testing Specialist.

## ✨ Key Features

- **Dynamic Bilingual Support (i18n):** Seamlessly switch between English (EN) and Indonesian (ID) using `next-intl` without page reloading.
- **Glassmorphism UI:** Built with Tailwind CSS, leveraging a sleek dark mode and frosted glass aesthetic.
- **Interactive QA Chat Simulator:** Generate Playwright scenarios with Google Gemini when the optional API credential is configured.
- **Lightweight RAG & AI Guardrails:** The agent uses an in-memory portfolio context, request validation, bounded input/output, origin checks, and rate limiting. Prompt instructions guide scope but are not treated as a standalone security boundary.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.
- **Headless CMS:** Sanity.io (Dynamic Blog, Next.js ISR)
- **Agentic AI:** Google Gemini SDK, Lightweight RAG (Retrieval-Augmented Generation), Prompt Guardrails.
- **Full-Stack Observability:** Embedded OpenTelemetry streaming real-time traces and metrics directly to Grafana Cloud.
- **Automated E2E Testing:** Playwright test suite running continuously via GitHub Actions.

## 🚀 Technology Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom CSS Variables
- **Animations:** Framer Motion
- **Internationalization:** next-intl
- **Icons:** Lucide React
- **Observability:** OpenTelemetry (@vercel/otel), Vercel Speed Insights, Grafana Cloud
- **Testing:** Playwright, GitHub Actions CI/CD

## 📂 Project Structure

- `src/app/`: Next.js App Router (Layouts, Pages, Locale segment).
- `src/features/`: Feature-driven components (Hero, About, Projects, Skills, Certifications).
- `src/shared/`: Shared UI components (Navbar, Footer, Modals, Buttons) and libraries.
- `src/data/`: Static data files for projects, skills, and certifications.
- `src/i18n/`: Internationalization routing config and utility hooks.
- `messages/`: Translation dictionaries (`en.json`, `id.json`).

## 🛠️ Getting Started

Install dependencies and copy the documented environment template:

```bash
npm install
cp .env.example .env.local
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The portfolio and production build work without external credentials. Optional integrations degrade gracefully:

- Sanity credentials enable the live blog and Studio content.
- A Gemini API key enables the AI QA Agent.
- Resend and contact recipient values enable contact email delivery. Without them, the form shows a real configuration error and directs visitors to the email link—it never reports a false success.
- Grafana/OpenTelemetry values enable external observability.

## Environment variables

See [`.env.example`](./.env.example) for the complete list. Never commit `.env.local` or provider secrets. Public variables use the `NEXT_PUBLIC_` prefix; Gemini and Resend credentials remain server-only.

## 📊 Observability (OpenTelemetry & Grafana)

This portfolio is instrumented with OpenTelemetry to track real-time metrics and API traces.
To set up local monitoring:
1. Create a free account at [Grafana Cloud](https://grafana.com/).
2. Add an **OpenTelemetry (OTLP)** connection to generate an API Token.
3. Update your `.env.local` with the provided Endpoint and Headers:
   ```env
   OTEL_EXPORTER_OTLP_ENDPOINT="your_endpoint"
   OTEL_EXPORTER_OTLP_HEADERS="Authorization=Basic your_token"
   NEXT_PUBLIC_GRAFANA_DASHBOARD_URL="your_public_dashboard_url"
   ```
4. Start the app. Traces from API calls (e.g., the Chat Agent) will stream directly to your Grafana Dashboard.

## 🛡️ DevSecOps & Security

This project applies layered security controls appropriate for a public portfolio:
- **HTTP Security Headers**: `Content-Security-Policy`, `X-Frame-Options`, HSTS, referrer policy, content type protection, and a restrictive permissions policy are configured in `next.config.ts`.
- **Automated Security Auditing (DAST)**: Uses Playwright to simulate malicious payloads (e.g. XSS attacks) and verify security header integrity during the CI/CD pipeline.
- **API Controls**: Contact and chat routes validate input, limit payloads, check browser origins, sanitize errors, and apply in-process rate limits. Production systems with multiple server instances should replace the in-memory limiter with a shared Redis/KV-backed limiter.
- **AI Guardrails**: Scope instructions reduce off-topic output, while deterministic API controls limit abuse and cost. No prompt-only guardrail is described as absolute protection against prompt injection.

## 🧪 E2E Testing

Quality gates cover linting, TypeScript, production builds, API behavior, navigation, localization, metadata, and security controls.
```bash
# Static quality gates
npm run lint
npm run typecheck
npm run build

# E2E requires a production build because Playwright starts `next start`
npm run build && npm run test:e2e

# View test report
npx playwright show-report
```

CI uses `npm ci`, then runs lint, typecheck, build, Playwright, and the scheduled OWASP ZAP baseline workflow. Generated reports are uploaded as workflow artifacts and are ignored by Git.

## 📬 Contact

- **Name:** Reza Yusuf Maulana
- **GitHub:** [@rezaa98](https://github.com/rezaa98)
