"use client";

import { motion } from "framer-motion";
import { Globe2, MessageCircleMore } from "lucide-react";
import { useTranslations } from "next-intl";

const languages = [
  { id: "indonesian", code: "ID", level: 100, accent: "from-accent-blue to-accent-cyan" },
  { id: "english", code: "EN", level: 80, accent: "from-accent-purple to-accent-blue" },
  { id: "japanese", code: "JP", level: 35, accent: "from-accent-cyan to-accent-green" },
] as const;

export function CommunicationSkillsSection() {
  const t = useTranslations("CommunicationSkills");

  return (
    <section id="communication-skills" className="section py-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <span className="section-label">05 //</span>
          <h2 className="section-title mb-0">{t("title")}</h2>
        </div>
        <div className="glow-divider" />

        <p className="mt-6 max-w-2xl text-text-secondary leading-relaxed">
          {t("description")}
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {languages.map((language, index) => (
            <motion.article
              key={language.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl border border-white/5 p-6 transition-all hover:-translate-y-1 hover:border-white/20 hover:shadow-glow-cyan"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent-cyan">
                  {index === 0 ? <Globe2 aria-hidden="true" size={23} /> : <MessageCircleMore aria-hidden="true" size={23} />}
                </div>
                <span className="rounded-full border border-white/10 bg-bg-primary px-3 py-1 font-mono text-xs text-text-muted">
                  {language.code}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white">{t(`${language.id}.name`)}</h3>
              <p className="mt-1 text-sm font-medium text-accent-cyan">{t(`${language.id}.proficiency`)}</p>
              <p className="mt-4 min-h-16 text-sm leading-relaxed text-text-secondary">
                {t(`${language.id}.description`)}
              </p>

              <div
                className="mt-6 h-2 overflow-hidden rounded-full border border-white/5 bg-bg-primary"
                role="progressbar"
                aria-label={`${t(`${language.id}.name`)} — ${t(`${language.id}.proficiency`)}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={language.level}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${language.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                  className={`h-full rounded-full bg-gradient-to-r ${language.accent}`}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
