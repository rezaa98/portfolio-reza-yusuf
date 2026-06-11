"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certifications } from "@/data/certifications";
import { ExternalLink, Award, ChevronLeft, ChevronRight, X, Eye } from "lucide-react";

export function CertificationsSection() {
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const issuers = ["All", "Microsoft", "Google Cloud", "Dicoding", "Cisco"];
  
  const filteredCerts = filter === "All" 
    ? certifications 
    : certifications.filter(c => c.issuer === filter);

  const totalPages = Math.ceil(filteredCerts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCerts = filteredCerts.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (issuer: string) => {
    setFilter(issuer);
    setCurrentPage(1); // Reset page on filter change
  };

  return (
    <section id="certifications" className="section py-24 bg-bg-secondary/30 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <span className="section-label">05 //</span>
          <h2 className="section-title mb-0">Certifications</h2>
        </div>
        <div className="glow-divider"></div>
        
        <p className="text-text-secondary max-w-2xl mb-10">
          A collection of <strong className="text-white">24+ professional certifications</strong> focused on Artificial Intelligence, Cloud Computing, and Cybersecurity.
        </p>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {issuers.map(issuer => (
            <button
              key={issuer}
              onClick={() => handleFilterChange(issuer)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === issuer 
                  ? "bg-accent-blue text-white shadow-glow" 
                  : "glass text-text-secondary hover:text-white"
              }`}
            >
              {issuer}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <AnimatePresence mode="popLayout">
            {currentCerts.map((cert) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={cert.id}
                className={`glass p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
                  cert.featured ? 'border-accent-blue/30 bg-accent-blue/5' : 'border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center w-14 h-14 overflow-hidden">
                    {cert.badgeUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={cert.badgeUrl} alt={cert.name} className="w-full h-full object-contain" />
                    ) : (
                      <Award size={24} className={cert.featured ? "text-accent-cyan" : "text-text-muted"} />
                    )}
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
                    View Credential
                    <ExternalLink size={14} className="ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                  
                  {cert.imageUrl && (
                    <button 
                      onClick={() => setSelectedImage(cert.imageUrl!)}
                      className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-accent-purple transition-colors group"
                    >
                      View Image
                      <Eye size={14} className="ml-1 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-transform" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-12">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-full glass text-text-secondary disabled:opacity-30 disabled:cursor-not-allowed hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="text-sm font-medium text-text-secondary">
              Page <span className="text-white mx-1">{currentPage}</span> of <span className="text-white mx-1">{totalPages}</span>
            </div>
            
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full glass text-text-secondary disabled:opacity-30 disabled:cursor-not-allowed hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </motion.div>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-primary/90 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] glass p-2 rounded-2xl flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 p-2 bg-accent-purple text-white rounded-full hover:scale-110 transition-transform shadow-glow z-10"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              <div className="w-full h-full overflow-hidden rounded-xl bg-black/50 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedImage} alt="Certificate Full Image" className="max-w-full max-h-[85vh] object-contain rounded-lg" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
