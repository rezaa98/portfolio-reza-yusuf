# Reza Yusuf Maulana - Professional Portfolio

A modern, highly-interactive, and bilingual professional portfolio website built to showcase my experience as a QA Engineer & AI Testing Specialist.

## ✨ Key Features

- **Dynamic Bilingual Support (i18n):** Seamlessly switch between English (EN) and Indonesian (ID) using `next-intl` without page reloading.
- **Glassmorphism UI:** Built with Tailwind CSS, leveraging a sleek dark mode and frosted glass aesthetic.
- **Interactive QA Chat Simulator:** Speak with an autonomous AI powered by Google Gemini 2.5 Flash.
- **Lightweight RAG & AI Guardrails:** The Agentic AI is context-aware via in-memory RAG, knowing the exact DOM structure of this portfolio. Strict Guardrails prevent off-topic questions (e.g., rejecting non-QA queries) to ensure absolute security and professionalism.
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

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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

This project implements robust DevSecOps practices to ensure enterprise-grade security:
- **HTTP Security Headers**: Strict `Content-Security-Policy` (CSP), `X-Frame-Options`, `Strict-Transport-Security` (HSTS), and XSS protections are statically enforced via `next.config.ts`.
- **Automated Security Auditing (DAST)**: Uses Playwright to simulate malicious payloads (e.g. XSS attacks) and verify security header integrity during the CI/CD pipeline.
- **AI Guardrails**: The Gemini API Route Handlers implement strict prompt guardrails to prevent token abuse and prompt injection.

## 🧪 E2E Testing

Automated end-to-end tests ensure the reliability of navigation, localization, and meta tags.
```bash
# Run tests locally
npx playwright test

# View test report
npx playwright show-report
```

## 📬 Contact

- **Name:** Reza Yusuf Maulana
- **GitHub:** [@rezaa98](https://github.com/rezaa98)
