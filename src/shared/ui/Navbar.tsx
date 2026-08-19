/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/routing";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const getHref = (hash: string) => isHome ? hash : `/${hash}`;

  const navLinks = [
    { name: t("about"), href: getHref("#about") },
    { name: t("experience"), href: getHref("#experience") },
    { name: t("projects"), href: getHref("#projects") },
    { name: t("skills"), href: getHref("#skills") },
    { name: t("certifications"), href: getHref("#certifications") },
    { name: t("blog"), href: getHref("#blog") },
    { name: t("web_demo"), href: "/web-demo" },
    { name: t("docs") || "Docs", href: "/docs" },
  ];

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "id" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass py-4 shadow-lg" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href={isHome ? "#" : "/"} className="text-xl font-bold font-space-grotesk tracking-tight flex items-center">
          <span className="text-white">&lt;RezaCode</span>
          <span className="text-accent-cyan">.cloud/&gt;</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href as any}
              className="text-sm font-medium text-text-secondary hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href={getHref("#contact") as any}
            className="text-sm font-medium px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all"
          >
            {t("contact")}
          </Link>
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-full glass hover:bg-white/10 transition-colors flex items-center gap-2"
            title="Switch Language"
            aria-label={locale === "en" ? "Switch language to Indonesian" : "Ganti bahasa ke Inggris"}
          >
            <Globe size={18} />
            <span className="text-sm font-medium uppercase">{locale}</span>
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation" className="md:hidden glass absolute top-full left-0 right-0 py-4 px-6 flex flex-col space-y-4 border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href as any}
              className="text-base font-medium text-text-secondary hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href={getHref("#contact") as any}
            className="text-base font-medium text-accent-cyan"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("contact")}
          </Link>
          
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                toggleLanguage();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-base font-medium text-text-secondary hover:text-white transition-colors"
            >
              <Globe size={18} />
              Switch to {locale === "en" ? "Indonesia" : "English"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
