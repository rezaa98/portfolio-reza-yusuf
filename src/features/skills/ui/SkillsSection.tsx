"use client";
import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { CheckCircle2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export function SkillsSection() {
  const t = useTranslations("Skills");
  const categories = [
    { id: "automation", label: "Automation Testing", data: skills.automation, color: "text-accent-blue" },
    { id: "cloudAndAI", label: "Cloud & AI", data: skills.cloudAndAI, color: "text-accent-purple" },
    { id: "languages", label: "Languages & Frameworks", data: skills.languages, color: "text-accent-cyan" },
    { id: "tools", label: "Tools & DevOps", data: skills.tools, color: "text-accent-green" },
  ];

  return (
    <section id="skills" className="section py-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <span className="section-label">04 //</span>
          <h2 className="section-title mb-0">{t("title")}</h2>
        </div>
        <div className="glow-divider"></div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="glass p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-white/20 transition-colors"
            >
              <h3 className="text-xl font-bold font-space-grotesk mb-6 text-white">{category.label}</h3>
              
              <div className="space-y-5">
                {category.data.map((skill, i) => (
                  <div key={skill.name} className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        {skill.featured ? (
                          <Sparkles size={16} className={category.color} />
                        ) : (
                          <CheckCircle2 size={16} className="text-text-muted" />
                        )}
                        <span className={`text-sm font-medium ${skill.featured ? 'text-white' : 'text-text-secondary'}`}>
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-text-muted">{skill.proficiency}%</span>
                    </div>
                    <div className="h-2 w-full bg-bg-primary rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                        className={`h-full ${skill.featured ? 'bg-gradient-to-r from-accent-blue to-accent-purple' : 'bg-white/20'} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
