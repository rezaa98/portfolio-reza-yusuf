"use client";

import React, { useState } from 'react';
import { DocsContent, DocSection } from './DocsContent';
import { Link } from '@/i18n/routing';
import { ExternalLink, Menu as MenuIcon, X } from 'lucide-react';

const navItems: { id: DocSection; label: string }[] = [
  { id: 'architecture', label: 'System Architecture' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'fsd', label: 'Functional Spec (FSD)' },
  { id: 'trd', label: 'Technical Reqs (TRD)' },
];

export const DocsLayout = () => {
  const [activeSection, setActiveSection] = useState<DocSection>('architecture');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-[calc(100vh-12rem)]">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex justify-between items-center mb-4 border-b border-border-subtle pb-4">
        <h2 className="text-xl font-bold text-white">Documentation Menu</h2>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-text-secondary hover:text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`md:w-64 flex-shrink-0 ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
        <div className="sticky top-32 flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2 px-3">
            System Docs
          </h3>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`text-left px-4 py-2.5 rounded-lg transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-accent-blue/10 text-accent-blue font-medium border border-accent-blue/20'
                  : 'text-text-secondary hover:bg-bg-secondary hover:text-white border border-transparent'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="my-4 border-t border-border-subtle"></div>
          
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2 px-3">
            API References
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
          <DocsContent activeSection={activeSection} />
        </div>
      </main>
    </div>
  );
};
