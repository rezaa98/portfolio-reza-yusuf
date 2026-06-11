"use client";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";

export const blogPosts = [
  {
    id: "blog-001",
    title: "Shift-Left Testing: Integrating QA Early in the SDLC",
    date: "May 15, 2026",
    readTime: "5 min read",
    category: "Process",
    excerpt: "How involving QA early prevents critical defects and reduces time-to-market in complex financial systems.",
  },
  {
    id: "blog-002",
    title: "AI in Test Automation: Evaluating Voice-to-Text Accuracy",
    date: "April 22, 2026",
    readTime: "8 min read",
    category: "AI Testing",
    excerpt: "Strategies for testing non-deterministic AI models and establishing ground truth for LLM automated scoring.",
  },
  {
    id: "blog-003",
    title: "Migrating from Katalon to Playwright: A Practical Guide",
    date: "March 10, 2026",
    readTime: "6 min read",
    category: "Automation",
    excerpt: "Lessons learned while modernizing our E2E testing framework for better stability and execution speed.",
  }
];

export function BlogSection() {
  return (
    <section id="blog" className="section py-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <span className="section-label">06 //</span>
          <h2 className="section-title mb-0">Insights & Writing</h2>
        </div>
        <div className="glow-divider"></div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass p-6 rounded-2xl border border-white/5 hover:border-accent-purple/30 transition-all hover:-translate-y-2 flex flex-col"
            >
              <div className="flex items-center gap-4 text-xs text-text-muted font-mono mb-4">
                <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-cyan transition-colors leading-snug">
                {post.title}
              </h3>
              
              <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className="text-xs font-medium text-accent-purple bg-accent-purple/10 px-2.5 py-1 rounded-md">
                  {post.category}
                </span>
                <button className="text-white group-hover:text-accent-cyan transition-colors">
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
