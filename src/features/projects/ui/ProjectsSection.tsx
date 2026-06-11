"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import { FolderGit2 } from "lucide-react";
import Image from "next/image";
import { Modal } from "@/shared/ui/Modal";
import { useTranslations } from "next-intl";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
);

export function ProjectsSection() {
  const t = useTranslations("Projects");
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const categories = ["All", "ai", "automation", "web"];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="section py-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <span className="section-label">03 //</span>
          <h2 className="section-title mb-0">{t("title")}</h2>
        </div>
        <div className="glow-divider"></div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-12 mt-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                filter === cat 
                  ? "bg-accent-blue text-white shadow-glow" 
                  : "glass text-text-secondary hover:text-white"
              }`}
            >
              {cat === "ai" ? "AI & ML" : cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                onClick={() => setSelectedProject(project as Project)}
                className="group glass rounded-2xl overflow-hidden border border-white/5 hover:border-accent-blue/30 transition-all hover:-translate-y-2 hover:shadow-glow flex flex-col cursor-pointer"
              >
                {/* Image Section */}
                <div className="h-48 w-full relative overflow-hidden bg-bg-secondary flex items-center justify-center border-b border-white/5">
                  {project.thumbnailUrl ? (
                    <Image 
                      src={project.thumbnailUrl} 
                      alt={project.title} 
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                      <FolderGit2 size={48} className="text-white/20 group-hover:text-accent-cyan/50 transition-colors z-10" />
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-accent-blue text-xs font-mono font-medium tracking-wider uppercase">
                      {project.category}
                    </span>
                    <span className="text-text-muted text-xs font-mono">{project.year}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 font-space-grotesk group-hover:text-accent-cyan transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-text-secondary text-sm mb-6 leading-relaxed flex-1">
                    {t(`${project.slug}.shortDesc`)}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-text-secondary border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
                    {/* @ts-expect-error Typescript infers from const array instead of Project type */}
                    {project.githubUrls ? (
                      /* @ts-expect-error Typescript infers from const array instead of Project type */
                      project.githubUrls.map((repo, idx) => (
                        <a 
                          key={idx}
                          href={repo.url} 
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-accent-cyan transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-full border border-white/10"
                        >
                          <GithubIcon />
                          {repo.name}
                        </a>
                      ))
                    ) : project.githubUrl ? (
                      <a 
                        href={project.githubUrl} 
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-accent-cyan transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10"
                      >
                        <GithubIcon />
                        {t("view_repo")}
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Project Detail Modal */}
      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="flex flex-col w-full text-left">
            <div className="h-48 md:h-72 w-full relative bg-bg-secondary flex items-center justify-center border-b border-white/10 rounded-t-2xl overflow-hidden">
              {selectedProject.thumbnailUrl ? (
                <Image 
                  src={selectedProject.thumbnailUrl} 
                  alt={selectedProject.title} 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 opacity-50"></div>
                  <FolderGit2 size={64} className="text-white/20 z-10" />
                </>
              )}
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1 rounded-full text-xs font-medium bg-accent-blue/20 text-accent-cyan border border-accent-blue/30">
                    {tech}
                  </span>
                ))}
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-space-grotesk tracking-tight">
                {selectedProject.title}
              </h3>
              
              <p className="text-text-secondary text-base leading-relaxed mb-8">
                {t(`${selectedProject.slug}.longDesc`)}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
                {selectedProject.githubUrls ? (
                  selectedProject.githubUrls.map((repo, idx) => (
                    <a 
                      key={idx}
                      href={repo.url} 
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-accent-cyan transition-colors bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/10"
                    >
                      <GithubIcon />
                      {repo.name}
                    </a>
                  ))
                ) : selectedProject.githubUrl ? (
                  <a 
                    href={selectedProject.githubUrl} 
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-accent-cyan transition-colors bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/10"
                  >
                    <GithubIcon />
                    {t("view_repo")}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
