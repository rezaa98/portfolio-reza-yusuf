"use client";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar, ChevronLeft, ChevronRight, Pin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export type PostItem = {
  id: string;
  title: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  isPinned?: boolean;
  thumbnail?: string;
};

export const blogPosts: PostItem[] = [
  {
    id: "blog-001",
    title: "Shift-Left Testing: Integrating QA Early in the SDLC",
    slug: "shift-left-testing",
    date: "May 15, 2026",
    readTime: "5 min read",
    category: "Process",
    excerpt: "How involving QA early prevents critical defects and reduces time-to-market in complex financial systems.",
  },
  {
    id: "blog-002",
    title: "AI in Test Automation: Evaluating Voice-to-Text Accuracy",
    slug: "ai-in-test-automation",
    date: "April 22, 2026",
    readTime: "8 min read",
    category: "AI Testing",
    excerpt: "Strategies for testing non-deterministic AI models and establishing ground truth for LLM automated scoring.",
  },
  {
    id: "blog-003",
    title: "Migrating from Katalon to Playwright: A Practical Guide",
    slug: "migrating-katalon-to-playwright",
    date: "March 10, 2026",
    readTime: "6 min read",
    category: "Automation",
    excerpt: "Lessons learned while modernizing our E2E testing framework for better stability and execution speed.",
  }
];

export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  categories: string[];
  isPinned?: boolean;
  mainImage?: string;
  firstBodyImage?: string;
}

const POSTS_PER_PAGE = 3;

export function BlogSection({ sanityPosts }: { sanityPosts?: SanityPost[] | null }) {
  const [currentPage, setCurrentPage] = useState(1);

  const allPosts = sanityPosts && sanityPosts.length > 0 
    ? sanityPosts.map(post => ({
        id: post._id,
        title: post.title,
        date: new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: "5 min read",
        category: post.categories?.[0] || "Blog",
        excerpt: post.excerpt || "",
        slug: post.slug,
        isPinned: post.isPinned,
        thumbnail: post.mainImage || post.firstBodyImage
      }))
    : blogPosts;

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = allPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const scrollToTop = () => {
    const element = document.getElementById("blog");
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      scrollToTop();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      scrollToTop();
    }
  };

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
        
        <div className="relative w-full">
          {totalPages > 1 && (
             <>
               <button 
                 onClick={handlePrevPage} 
                 disabled={currentPage === 1}
                 className="hidden lg:flex absolute top-1/2 -left-16 -translate-y-1/2 p-3 rounded-full glass border border-white/10 hover:bg-white/10 hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all shadow-xl z-10"
                 aria-label="Previous Page"
               >
                 <ChevronLeft size={28} />
               </button>
               <button 
                 onClick={handleNextPage} 
                 disabled={currentPage === totalPages}
                 className="hidden lg:flex absolute top-1/2 -right-16 -translate-y-1/2 p-3 rounded-full glass border border-white/10 hover:bg-white/10 hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all shadow-xl z-10"
                 aria-label="Next Page"
               >
                 <ChevronRight size={28} />
               </button>
             </>
           )}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
            {paginatedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group glass p-6 rounded-2xl border border-white/5 hover:border-accent-purple/30 transition-all hover:-translate-y-2 flex flex-col"
              >
                {post.thumbnail ? (
                  <div className="w-full h-40 mb-5 overflow-hidden rounded-xl border border-white/5 relative bg-bg-primary/50">
                    {post.isPinned && (
                      <div className="absolute top-2 left-2 bg-accent-blue text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg z-10 backdrop-blur-md">
                        <Pin size={10} className="fill-white" /> Pinned
                      </div>
                    )}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
                  </div>
                ) : (
                  post.isPinned && (
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-blue mb-3 w-max px-2 py-1 bg-accent-blue/10 rounded-full border border-accent-blue/20">
                      <Pin size={12} className="fill-accent-blue" /> Pinned
                    </div>
                  )
                )}
                
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
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 relative z-20">
                  <span className="text-xs font-medium text-accent-purple bg-accent-purple/10 px-2.5 py-1 rounded-md">
                    {post.category}
                  </span>
                  <Link href={`/blog/${post.slug}`} className="text-white group-hover:text-accent-cyan transition-colors flex items-center gap-2">
                    <span className="text-sm font-medium">Read</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12 lg:hidden">
            <button 
              onClick={handlePrevPage} 
              disabled={currentPage === 1}
              className="p-2 rounded-full glass border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous Page"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="text-text-secondary font-mono text-sm">
              Page <span className="text-white font-bold">{currentPage}</span> of {totalPages}
            </div>
            <button 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages}
              className="p-2 rounded-full glass border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Next Page"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}
