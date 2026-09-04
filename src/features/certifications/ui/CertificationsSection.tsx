"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { certifications } from "@/data/certifications";
import { ExternalLink, Award, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

function BadgeImage({ cert }: { cert: typeof certifications[number] }) {
  const [error, setError] = useState(false);

  if (!cert.badgeUrl || error) {
    return <Award size={24} className={cert.featured ? "text-accent-cyan" : "text-text-muted"} />;
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img 
      src={cert.badgeUrl} 
      alt={cert.name} 
      className="w-full h-full object-contain" 
      onError={() => setError(true)}
    />
  );
}

export function CertificationsSection() {
  const t = useTranslations("Certifications");

  const targetCerts = [
    "Azure AI Engineer Associate",
    "Junior Cybersecurity Analyst Career Path",
    "Membangun Sistem Machine Learning (MLOps dengan MLflow)",
  ];

  const featuredCerts = certifications.filter(cert => targetCerts.includes(cert.name));
  
  // Sort them in the exact order requested
  featuredCerts.sort((a, b) => targetCerts.indexOf(a.name) - targetCerts.indexOf(b.name));

  return (
    <section id="certifications" className="section py-24 bg-bg-secondary/30 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <span className="section-label">06 //</span>
          <h2 className="section-title mb-0">{t("title")}</h2>
        </div>
        <div className="glow-divider"></div>
        
        <p className="text-text-secondary max-w-2xl mb-12" dangerouslySetInnerHTML={{ __html: t.raw("description") }} />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredCerts.map((cert) => (
            <div
              key={cert.id}
              className="glass p-6 rounded-2xl border border-accent-blue/30 bg-accent-blue/5 transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center w-14 h-14 overflow-hidden">
                  <BadgeImage cert={cert} />
                </div>
                <div className="text-xs font-mono font-medium text-text-muted bg-bg-primary px-2 py-1 rounded">
                  {cert.year}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2" title={cert.name}>
                {cert.name}
              </h3>
              
              <div className="text-sm font-medium text-accent-blue mb-4">
                {cert.issuer} <span className="text-text-muted">via {cert.platform}</span>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mb-6">
                {cert.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="text-xs px-2 py-1 rounded bg-white/5 text-text-secondary border border-white/5">
                    {skill}
                  </span>
                ))}
                {cert.skills.length > 3 && (
                  <span className="text-xs px-2 py-1 rounded text-text-muted">
                    +{cert.skills.length - 3}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 mt-auto">
                <a 
                  href={cert.certUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-accent-cyan transition-colors group"
                >
                  Verify Online
                  <ExternalLink size={14} className="ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link 
            href="/certifications"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full glass border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all group"
          >
            View All 24+ Certifications
            <ChevronRight size={18} className="ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
