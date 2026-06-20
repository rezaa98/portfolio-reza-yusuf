import React from 'react';
import { Server, Layers, CheckSquare, Settings } from 'lucide-react';

export type DocSection = 'architecture' | 'tech-stack' | 'fsd' | 'trd';

interface DocsContentProps {
  activeSection: DocSection;
  locale?: string;
}

export const DocsContent: React.FC<DocsContentProps> = ({ activeSection, locale = 'en' }) => {
  return (
    <div className="prose prose-invert max-w-none">
      {activeSection === 'architecture' && <ArchitectureDoc locale={locale} />}
      {activeSection === 'tech-stack' && <TechStackDoc locale={locale} />}
      {activeSection === 'fsd' && <FsdDoc locale={locale} />}
      {activeSection === 'trd' && <TrdDoc locale={locale} />}
    </div>
  );
};

const ArchitectureDoc = ({ locale }: { locale: string }) => (
  <div className="space-y-8">
    <div className="flex items-center gap-3 border-b border-border-subtle pb-4">
      <div className="p-3 bg-accent-blue/10 rounded-lg text-accent-blue">
        <Server className="w-6 h-6" />
      </div>
      <h2 className="text-3xl font-bold m-0 text-white">
        {locale === 'id' ? 'Arsitektur Sistem & Model Data' : 'System Architecture & Data Model'}
      </h2>
    </div>
    
    <p className="text-text-secondary leading-relaxed text-lg">
      This portfolio is built with a modern, serverless, and highly scalable architecture designed to demonstrate enterprise-grade capabilities.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div className="bg-bg-secondary p-6 rounded-xl border border-border-subtle">
        <h3 className="text-xl font-semibold text-accent-cyan mb-3">Frontend (Next.js & Vercel)</h3>
        <p className="text-text-secondary text-sm">
          The core application runs on Next.js 15 utilizing App Router. It is deployed on Vercel&apos;s Edge Network for global low-latency delivery. We employ Server-Side Rendering (SSR) and Static Site Generation (SSG) for optimal SEO and performance.
        </p>
      </div>
      <div className="bg-bg-secondary p-6 rounded-xl border border-border-subtle">
        <h3 className="text-xl font-semibold text-accent-cyan mb-3">Content Management (Sanity)</h3>
        <p className="text-text-secondary text-sm">
          A headless CMS (Sanity) powers the blog and dynamic content. It allows real-time collaborative editing and delivers content globally via its Global CDN. It is integrated using GROQ queries.
        </p>
      </div>
      <div className="bg-bg-secondary p-6 rounded-xl border border-border-subtle">
        <h3 className="text-xl font-semibold text-accent-cyan mb-3">AI Integration (Gemini)</h3>
        <p className="text-text-secondary text-sm">
          Google&apos;s Gemini API is integrated directly via Next.js Route Handlers. It leverages <strong>Lightweight RAG (Retrieval-Augmented Generation)</strong> to inject real DOM structure context, and <strong>Strict Guardrails</strong> to restrict interactions exclusively to Playwright testing domains, preventing token abuse.
        </p>
      </div>
      <div className="bg-bg-secondary p-6 rounded-xl border border-border-subtle">
        <h3 className="text-xl font-semibold text-accent-cyan mb-3">Observability (OTEL & Grafana)</h3>
        <p className="text-text-secondary text-sm">
          OpenTelemetry instruments the Next.js application, pushing traces and metrics to Grafana Cloud. This allows real-time monitoring of API latency, page loads, and AI response times.
        </p>
      </div>
    </div>

    {/* ERD SECTION */}
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-white mb-6">Entity Relationship Diagram (ERD)</h3>
      <p className="text-text-secondary mb-6">
        Data is structured in Sanity.io using a document-based NoSQL model. Below is the relational mapping of the core entities:
      </p>
      
      <div className="bg-bg-secondary p-6 rounded-xl border border-border-subtle font-mono text-sm overflow-x-auto text-text-secondary leading-relaxed">
        <pre className="text-accent-cyan">
          {`
  +-------------------+          +-------------------+
  |      AUTHOR       |          |      CATEGORY     |
  +-------------------+          +-------------------+
  | _id (PK)          |<---+     | _id (PK)          |<---+
  | name              |    |     | title             |    |
  | slug              |    |     | description       |    |
  | image             |    |     +-------------------+    |
  | bio               |    |                              |
  +-------------------+    |     +-------------------+    |
                           +-----|       POST        |----+
                                 +-------------------+
                                 | _id (PK)          |
                                 | title             |
                                 | slug              |
                                 | author (Ref)      |
                                 | mainImage         |
                                 | categories (Ref[])|
                                 | publishedAt       |
                                 | body (PortableTxt)|
                                 +-------------------+
          `}
        </pre>
      </div>
    </div>

    <div className="mt-12 bg-bg-secondary/50 p-6 rounded-xl border border-border-subtle">
      <h3 className="text-xl font-semibold text-white mb-4">CI/CD Pipeline & 2-Tier Environments</h3>
      <p className="text-text-secondary mb-4">
        The repository employs a professional DevOps pipeline:
      </p>
      <ul className="list-disc list-inside space-y-2 text-text-secondary">
        <li><strong>SIT Environment:</strong> The <code>sit</code> branch deploys to <code>sit.rezacode.cloud</code>, connected to a dedicated <code>sit</code> Sanity Dataset for safe testing.</li>
        <li><strong>PROD Environment:</strong> The <code>master</code> branch deploys to <code>rezacode.cloud</code>, connected to the <code>production</code> Sanity Dataset.</li>
        <li><strong>Automated Testing:</strong> GitHub Actions triggers Playwright E2E tests on every push. Reports are automatically deployed to GitHub Pages, isolated by branch.</li>
      </ul>
    </div>
  </div>
);

const TechStackDoc = ({ locale }: { locale: string }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3 border-b border-border-subtle pb-4">
      <div className="p-3 bg-accent-cyan/10 rounded-lg text-accent-cyan">
        <Layers className="w-6 h-6" />
      </div>
      <h2 className="text-3xl font-bold m-0 text-white">
        {locale === 'id' ? 'Teknologi (Tech Stack)' : 'Technology Stack'}
      </h2>
    </div>

    <p className="text-text-secondary leading-relaxed text-lg mb-8">
      A curated list of modern technologies powering this application.
    </p>

    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold text-white mb-4">Core Framework</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <TechBadge name="Next.js 15" desc="React Framework" />
          <TechBadge name="React 19" desc="UI Library" />
          <TechBadge name="TypeScript" desc="Type Safety" />
          <TechBadge name="Tailwind CSS" desc="Styling" />
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-white mb-4">Quality Assurance & DevOps</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <TechBadge name="Playwright" desc="E2E Testing" />
          <TechBadge name="GitHub Actions" desc="CI/CD Pipelines" />
          <TechBadge name="Vercel" desc="Hosting & Edge" />
          <TechBadge name="GitHub Pages" desc="Report Hosting" />
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-white mb-4">Integrations & Backend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <TechBadge name="Sanity.io" desc="Headless CMS" />
          <TechBadge name="Google Gemini" desc="AI Models" />
          <TechBadge name="OpenTelemetry" desc="Tracing" />
          <TechBadge name="Grafana Cloud" desc="Observability" />
        </div>
      </div>
    </div>
  </div>
);

const FsdDoc = ({ locale }: { locale: string }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3 border-b border-border-subtle pb-4">
      <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
        <CheckSquare className="w-6 h-6" />
      </div>
      <h2 className="text-3xl font-bold m-0 text-white">
        {locale === 'id' ? 'Spesifikasi Fungsional (FSD)' : 'Functional Specification (FSD)'}
      </h2>
    </div>

    <div className="space-y-8 mt-6">
      <section>
        <h3 className="text-2xl font-semibold text-white mb-3">1. Landing Page & Localization</h3>
        <ul className="list-disc list-inside space-y-2 text-text-secondary">
          <li><strong>Hero Section:</strong> Displays introduction with a dynamic typing effect.</li>
          <li><strong>Localization:</strong> Supports English (<code>/en</code>) and Indonesian (<code>/id</code>) with automatic redirection based on browser preferences.</li>
          <li><strong>Responsive Navbar:</strong> Collapsible mobile menu with a Glassmorphism aesthetic.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold text-white mb-3">2. Blog System</h3>
        <ul className="list-disc list-inside space-y-2 text-text-secondary">
          <li><strong>Dynamic Routing:</strong> Blog posts are generated dynamically (<code>/blog/[slug]</code>).</li>
          <li><strong>CMS Integration:</strong> Content is pulled from Sanity CMS via GROQ.</li>
          <li><strong>Rich Text Rendering:</strong> Portable Text is used to render markdown, images, and code blocks safely.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold text-white mb-3">3. QA & Web Demo Features</h3>
        <ul className="list-disc list-inside space-y-2 text-text-secondary">
          <li><strong>Test Report Dashboard:</strong> Dynamically loads the Playwright HTML report via an iframe, adjusting the URL based on the current Vercel environment (<code>sit</code> vs <code>master</code>).</li>
          <li><strong>Agentic AI Chat (RAG + Guardrails):</strong> An interactive UI communicating with the Gemini API. The AI is restricted by Strict Guardrails to only answer QA-related queries and uses Lightweight RAG to know the real DOM structure of this portfolio for precise test generation.</li>
          <li><strong>Grafana Telemetry View:</strong> Embeds public Grafana dashboards to display live API performance and system traces.</li>
        </ul>
      </section>
    </div>
  </div>
);

const TrdDoc = ({ locale }: { locale: string }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3 border-b border-border-subtle pb-4">
      <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
        <Settings className="w-6 h-6" />
      </div>
      <h2 className="text-3xl font-bold m-0 text-white">
        {locale === 'id' ? 'Persyaratan Teknis (TRD)' : 'Technical Requirements (TRD)'}
      </h2>
    </div>

    <div className="space-y-6 mt-6">
      <div className="bg-bg-secondary p-5 rounded-lg border border-border-subtle">
        <h3 className="text-lg font-bold text-white mb-2">1. Performance Standards</h3>
        <ul className="list-disc list-inside text-text-secondary text-sm space-y-1">
          <li>Lighthouse Score: Minimum 90+ for Performance, Accessibility, Best Practices, and SEO.</li>
          <li>Largest Contentful Paint (LCP): &lt; 2.5s.</li>
          <li>Cumulative Layout Shift (CLS): &lt; 0.1.</li>
          <li>Images must be optimized using Next.js <code>&lt;Image&gt;</code> component.</li>
        </ul>
      </div>

      <div className="bg-bg-secondary p-5 rounded-lg border border-border-subtle">
        <h3 className="text-lg font-bold text-white mb-2">2. Security & Environment</h3>
        <ul className="list-disc list-inside text-text-secondary text-sm space-y-1">
          <li>Secrets (API Keys, OTEL Headers) must never be exposed to the client-side.</li>
          <li><code>NEXT_PUBLIC_</code> prefix is restricted only for safe public values (e.g., Sanity Project ID).</li>
          <li>Environment isolation enforced: SIT accesses the <code>sit</code> dataset, PROD accesses <code>production</code>.</li>
        </ul>
      </div>

      <div className="bg-bg-secondary p-5 rounded-lg border border-border-subtle">
        <h3 className="text-lg font-bold text-white mb-2">3. Testing Strategy</h3>
        <ul className="list-disc list-inside text-text-secondary text-sm space-y-1">
          <li>Framework: Playwright.</li>
          <li>Coverage Requirement: Critical user journeys (Localization switcher, Chat Simulator API response, Blog rendering) must have E2E coverage.</li>
          <li>Execution: Triggered automatically via GitHub Actions on PRs and merges to <code>master</code> and <code>sit</code>.</li>
        </ul>
      </div>
    </div>
  </div>
);

const TechBadge = ({ name, desc }: { name: string, desc: string }) => (
  <div className="flex flex-col p-3 bg-bg-primary border border-border-subtle rounded-lg shadow-sm hover:border-accent-blue/50 transition-colors">
    <span className="font-semibold text-white text-sm">{name}</span>
    <span className="text-xs text-text-secondary mt-1">{desc}</span>
  </div>
);
