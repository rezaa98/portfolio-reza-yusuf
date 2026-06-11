"use client";
import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import { useTranslations } from "next-intl";

export function ExperienceSection() {
  const t = useTranslations("Experience");
  return (
    <section id="experience" className="section py-24 bg-bg-secondary/30 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <span className="section-label">02 //</span>
          <h2 className="section-title mb-0">{t("title")}</h2>
        </div>
        <div className="glow-divider"></div>
        
        <div className="mt-16 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-5 md:gap-8 mb-16">
                {/* Timeline Line & Dot for Desktop */}
                <div className="hidden md:flex flex-col items-center col-span-1 relative mt-2">
                  <div className="w-4 h-4 rounded-full bg-bg-primary border-2 z-10" style={{ borderColor: exp.accentColor }}>
                    {exp.isCurrent && <div className="w-full h-full rounded-full animate-ping opacity-50" style={{ backgroundColor: exp.accentColor }}></div>}
                  </div>
                  {index !== experiences.length - 1 && (
                    <div className="absolute top-4 bottom-[-64px] w-[2px] bg-gradient-to-b from-white/10 to-transparent"></div>
                  )}
                </div>
                
                {/* Mobile Line */}
                <div className="md:hidden absolute left-0 top-2 bottom-[-64px] w-[2px] bg-gradient-to-b from-white/10 to-transparent"></div>
                <div className="md:hidden absolute left-[-5px] top-2 w-3 h-3 rounded-full bg-bg-primary border-2 z-10" style={{ borderColor: exp.accentColor }}></div>

                {/* Content */}
                <div className="col-span-4 glass rounded-2xl p-6 md:p-8 hover:bg-bg-card-hover transition-colors border border-white/5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white font-space-grotesk">{exp.role}</h3>
                      <div className="text-lg font-medium mt-1" style={{ color: exp.accentColor }}>{exp.company}</div>
                    </div>
                    <div className="mt-4 md:mt-0 text-sm font-medium text-text-secondary px-3 py-1.5 rounded-full bg-white/5 border border-white/10 inline-flex w-fit h-fit">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </div>
                  </div>
                  
                  <p className="text-text-secondary mb-6 leading-relaxed">{exp.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {exp.highlights.slice(0, 3).map((highlight, i) => (
                      <div key={i} className="flex items-start">
                        <span className="text-accent-blue mr-3 mt-1.5 text-xs">▹</span>
                        <span className="text-text-secondary text-sm leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.techTags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
