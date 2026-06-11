"use client";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui/Button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section id="hero" className="section min-h-[90vh] flex flex-col justify-center items-center text-center pt-32 relative">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] max-w-[800px] max-h-[800px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass text-accent-cyan text-sm mb-6 float-anim z-10"
      >
        <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
        <span>{t("available")}</span>
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold mb-6 font-space-grotesk tracking-tight z-10"
      >
        {t("greeting")} <span className="gradient-text">Reza Yusuf Maulana</span>
      </motion.h1>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl md:text-3xl text-text-secondary mb-8 max-w-3xl z-10"
      >
        {t("bio")}
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap gap-4 justify-center z-10"
      >
        <Button asChild size="lg" variant="gradient">
          <Link href="#projects">{t("cta_projects")}</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="#contact">{t("cta_contact")}</Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
      >
        <Link href="#about" className="text-text-muted hover:text-accent-cyan transition-colors flex flex-col items-center gap-2 cursor-pointer">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em]">{t("scroll_down")}</span>
          <ChevronDown size={20} className="animate-bounce" />
        </Link>
      </motion.div>
    </section>
  );
}
