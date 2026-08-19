"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certifications, Certification } from "@/data/certifications";
import { ExternalLink, Award, X, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";

function BadgeImage({ cert }: { cert: Certification }) {
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

export function CertificationsPageClient() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Group certifications by issuer
  const groupedCerts = certifications.reduce((acc, cert) => {
    if (!acc[cert.issuer]) {
      acc[cert.issuer] = [];
    }
    acc[cert.issuer].push(cert);
    return acc;
  }, {} as Record<string, Certification[]>);

  const issuers = ["Microsoft", "Google Cloud", "Cisco", "Dicoding"];
  // Add any other issuers that might not be in the explicit list but exist in data
  Object.keys(groupedCerts).forEach(issuer => {
    if (!issuers.includes(issuer)) issuers.push(issuer);
  });

  return (
    <main id="main-content" className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-text-secondary hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk tracking-tight mb-4">
          All <span className="gradient-text">Certifications</span>
        </h1>
        <p className="text-text-secondary max-w-2xl text-lg">
          A comprehensive collection of my professional certifications and continuous learning achievements across various technology stacks.
        </p>
      </div>

      <div className="space-y-24">
        {issuers.map(issuer => {
          const certs = groupedCerts[issuer];
          if (!certs || certs.length === 0) return null;

          return (
            <section key={issuer} className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-white">{issuer}</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certs.map(cert => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col cursor-pointer"
                    onClick={() => setSelectedCert(cert)}
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
                      {cert.category.toUpperCase()} <span className="text-text-muted px-2">•</span> {cert.level}
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
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
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Advanced Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-primary/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full glass rounded-2xl flex flex-col shadow-2xl my-auto md:flex-row overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-20"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Left Column: Details & Summary */}
              <div className="p-8 md:w-1/2 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10">
                <div className="w-16 h-16 mb-6 p-2 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                  <BadgeImage cert={selectedCert} />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {selectedCert.name}
                </h3>
                
                <p className="text-accent-blue font-medium mb-6">
                  Issued by {selectedCert.issuer} <span className="text-text-muted">•</span> {selectedCert.year}
                </p>

                {selectedCert.summary ? (
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Learning Summary</h4>
                    <p className="text-text-secondary leading-relaxed">
                      {selectedCert.summary}
                    </p>
                  </div>
                ) : (
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Skills Acquired</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.skills.map(skill => (
                        <span key={skill} className="text-sm px-3 py-1.5 rounded-md bg-white/5 text-text-secondary border border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 mt-auto pt-6">
                  <a 
                    href={selectedCert.certUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-accent-blue hover:bg-accent-blue/90 text-white font-medium rounded-xl transition-all shadow-glow"
                  >
                    Verify Credential
                    <ExternalLink size={18} className="ml-2" />
                  </a>
                </div>
              </div>

              {/* Right Column: Image Preview */}
              <div className="md:w-1/2 bg-black/40 min-h-[300px] flex items-center justify-center p-6 relative group">
                {selectedCert.imageUrl ? (
                  selectedCert.imageUrl.toLowerCase().endsWith('.pdf') ? (
                    <iframe 
                      src={selectedCert.imageUrl} 
                      className="w-full h-[500px] rounded-xl bg-white shadow-2xl" 
                      title="Certificate PDF"
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                      src={selectedCert.imageUrl} 
                      alt="Certificate Full" 
                      className="max-w-full max-h-[600px] object-contain rounded-xl shadow-2xl" 
                    />
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center text-text-muted">
                    <Award size={64} className="mb-4 opacity-20" />
                    <p>No preview available</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
