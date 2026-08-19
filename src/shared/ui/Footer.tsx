"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="border-t border-white/10 bg-bg-secondary/50 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold font-space-grotesk gradient-text mb-4">Reza Yusuf Maulana</h3>
          <p className="text-text-secondary max-w-xs">
            {t("description")}
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-white mb-4">{t("quickLinks")}</h4>
          <ul className="space-y-2 text-text-secondary">
            <li><Link href="#about" className="hover:text-accent-cyan transition-colors">{t("about")}</Link></li>
            <li><Link href="#experience" className="hover:text-accent-cyan transition-colors">{t("experience")}</Link></li>
            <li><Link href="#projects" className="hover:text-accent-cyan transition-colors">{t("projects")}</Link></li>
            <li><Link href="#certifications" className="hover:text-accent-cyan transition-colors">{t("certifications")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">{t("connect")}</h4>
          <div className="flex space-x-4">
            <a aria-label="LinkedIn" href="https://linkedin.com/in/rezayusufmaulana" target="_blank" rel="noreferrer" className="p-2 rounded-full glass hover:bg-white/10 transition-colors text-white">
              <LinkedinIcon />
            </a>
            <a aria-label="GitHub" href="https://github.com/rezaa98" target="_blank" rel="noreferrer" className="p-2 rounded-full glass hover:bg-white/10 transition-colors text-white">
              <GithubIcon />
            </a>
            <a aria-label="Email" href="mailto:reza.yusuf98@gmail.com" className="p-2 rounded-full glass hover:bg-white/10 transition-colors text-white">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-text-muted text-sm">
        <p>&copy; {new Date().getFullYear()} Reza Yusuf Maulana. All rights reserved.</p>
      </div>
    </footer>
  );
}
