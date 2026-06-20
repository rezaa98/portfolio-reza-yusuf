const fs = require('fs');

const docsPage = `import { Navbar } from "@/shared/ui/Navbar";
import { Footer } from "@/shared/ui/Footer";
import { DocsLayout } from "@/features/docs/ui/DocsLayout";
import { useLocale } from "next-intl";

export default function DocsPage() {
  const locale = useLocale();
  const title1 = locale === 'id' ? 'Dokumentasi' : 'Project';
  const title2 = locale === 'id' ? 'Proyek' : 'Documentation';
  const desc = locale === 'id' 
    ? 'Dokumentasi teknis komprehensif yang merinci arsitektur, spesifikasi fungsional, dan teknologi yang digunakan untuk membangun portofolio ini.'
    : 'Comprehensive technical documentation detailing the architecture, functional specifications, and technologies used to build this portfolio.';

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col font-sans selection:bg-accent-primary/30">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
              {title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-cyan">{title2}</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
              {desc}
            </p>
          </div>
          
          <DocsLayout />
        </div>
      </main>
      <Footer />
    </div>
  );
}
`;

const docsLayout = `"use client";

import React, { useState } from 'react';
import { DocsContent, DocSection } from './DocsContent';
import { Link } from '@/i18n/routing';
import { ExternalLink, Menu as MenuIcon, X } from 'lucide-react';
import { useLocale } from 'next-intl';

export const DocsLayout = () => {
  const locale = useLocale();
  const [activeSection, setActiveSection] = useState<DocSection>('architecture');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: DocSection; label: string }[] = [
    { id: 'architecture', label: locale === 'id' ? 'Arsitektur Sistem' : 'System Architecture' },
    { id: 'tech-stack', label: locale === 'id' ? 'Teknologi (Tech Stack)' : 'Tech Stack' },
    { id: 'fsd', label: locale === 'id' ? 'Spesifikasi Fungsional (FSD)' : 'Functional Spec (FSD)' },
    { id: 'trd', label: locale === 'id' ? 'Syarat Teknis (TRD)' : 'Technical Reqs (TRD)' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-[calc(100vh-12rem)]">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex justify-between items-center mb-4 border-b border-border-subtle pb-4">
        <h2 className="text-xl font-bold text-white">{locale === 'id' ? 'Menu Dokumentasi' : 'Documentation Menu'}</h2>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-text-secondary hover:text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={\`md:w-64 flex-shrink-0 \${isMobileMenuOpen ? 'block' : 'hidden md:block'}\`}>
        <div className="sticky top-32 flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2 px-3">
            {locale === 'id' ? 'Dokumen Sistem' : 'System Docs'}
          </h3>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={\`text-left px-4 py-2.5 rounded-lg transition-all duration-200 \${
                activeSection === item.id
                  ? 'bg-accent-blue/10 text-accent-blue font-medium border border-accent-blue/20'
                  : 'text-text-secondary hover:bg-bg-secondary hover:text-white border border-transparent'
              }\`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="my-4 border-t border-border-subtle"></div>
          
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2 px-3">
            {locale === 'id' ? 'Referensi API' : 'API References'}
          </h3>
          <Link 
            href="/api-docs" 
            className="flex items-center justify-between px-4 py-2.5 rounded-lg text-text-secondary hover:bg-bg-secondary hover:text-white transition-colors"
          >
            <span>Swagger API Docs</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-bg-primary border border-border-subtle rounded-2xl p-6 md:p-10 shadow-lg relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <DocsContent activeSection={activeSection} locale={locale} />
        </div>
      </main>
    </div>
  );
};
`;

const apiDocsPage = `"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import { Navbar } from "@/shared/ui/Navbar";
import { Footer } from "@/shared/ui/Footer";
import { useLocale } from "next-intl";

// Dynamically import SwaggerUI to prevent SSR issues and reduce main bundle size
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function ApiDocsPage() {
  const locale = useLocale();
  const title1 = locale === 'id' ? 'Dokumentasi' : 'API';
  const title2 = locale === 'id' ? 'API' : 'Documentation';
  const desc = locale === 'id' 
    ? 'Jelajahi RESTful API yang tersedia untuk proyek portofolio ini. Anda dapat menguji endpoint secara langsung menggunakan fitur "Try it out".'
    : 'Explore the available RESTful APIs for this portfolio project. You can test the endpoints directly using the "Try it out" feature.';

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col font-sans selection:bg-accent-primary/30">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
              {title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue">{title2}</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
              {desc}
            </p>
          </div>
          
          <div className="bg-bg-secondary rounded-2xl p-4 md:p-8 border border-border-subtle shadow-xl overflow-hidden">
            <div className="swagger-container custom-swagger-styles">
              <SwaggerUI url="/swagger.json" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
`;

fs.writeFileSync('src/app/[locale]/docs/page.tsx', docsPage);
fs.writeFileSync('src/features/docs/ui/DocsLayout.tsx', docsLayout);
fs.writeFileSync('src/app/[locale]/api-docs/page.tsx', apiDocsPage);

console.log('Pages successfully updated to use useLocale()');
