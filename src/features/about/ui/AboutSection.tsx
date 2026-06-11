"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function AboutSection() {
  const t = useTranslations("About");

  return (
    <section id="about" className="section py-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <span className="section-label">01 //</span>
          <h2 className="section-title mb-0">{t("title")}</h2>
        </div>
        <div className="glow-divider"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mt-12">
          <div className="order-2 md:order-1">
            <p className="text-text-secondary text-lg mb-6 leading-relaxed">
              {t.rich("bio_1", {
                strong: (chunks) => <strong className="text-white font-medium">{chunks}</strong>
              })}
            </p>
            <p className="text-text-secondary text-lg mb-10 leading-relaxed">
              {t.rich("bio_2", {
                strong: (chunks) => <strong className="text-white font-medium">{chunks}</strong>
              })}
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="glass p-4 rounded-xl text-center hover:bg-bg-card-hover transition-colors">
                <div className="text-3xl md:text-4xl font-bold text-accent-blue mb-1 font-space-grotesk">4+</div>
                <div className="text-xs md:text-sm text-text-muted">{t("stats_experience")}</div>
              </div>
              <div className="glass p-4 rounded-xl text-center hover:bg-bg-card-hover transition-colors">
                <div className="text-3xl md:text-4xl font-bold text-accent-cyan mb-1 font-space-grotesk">24+</div>
                <div className="text-xs md:text-sm text-text-muted">{t("stats_certifications")}</div>
              </div>
              <div className="glass p-4 rounded-xl text-center hover:bg-bg-card-hover transition-colors">
                <div className="text-3xl md:text-4xl font-bold text-accent-purple mb-1 font-space-grotesk">3</div>
                <div className="text-xs md:text-sm text-text-muted">{t("stats_companies")}</div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-[280px] aspect-[3/4]">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue to-accent-cyan rounded-2xl rotate-6 opacity-30 blur-lg pulse-glow"></div>
              <div className="absolute inset-0 bg-bg-secondary rounded-2xl rotate-3 border border-white/10"></div>
              <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/20 z-10 glass transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]">
                <Image
                  src="/images/profile-latest.jpeg"
                  alt="Reza Yusuf Maulana"
                  fill
                  className="object-cover scale-[1.75] origin-[40%_70%]"
                  sizes="(max-width: 768px) 100vw, 280px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
