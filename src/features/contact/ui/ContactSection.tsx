"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui/Button";
import { Send, Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export function ContactSection() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          message: form.get("message"),
          website: form.get("website"),
        }),
      });
      const payload = await response.json() as { error?: { message?: string } };
      if (!response.ok) throw new Error(payload.error?.message || t("error"));

      e.currentTarget.reset();
      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t("error"));
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <span className="section-label">07 //</span>
          <h2 className="section-title mb-0">{t("title")}</h2>
        </div>
        <div className="glow-divider"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-space-grotesk">
              {t("heading")}
            </h3>
            <p className="text-text-secondary mb-10 leading-relaxed max-w-md">
              {t("description")}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3.5 glass rounded-xl text-accent-cyan border border-white/10 group-hover:border-accent-cyan transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-mono mb-1 tracking-wider uppercase">Email</div>
                  <a href="mailto:reza.yusuf98@gmail.com" className="text-white hover:text-accent-blue transition-colors font-medium">reza.yusuf98@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3.5 glass rounded-xl text-accent-cyan border border-white/10">
                  <LinkedinIcon />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-mono mb-1 tracking-wider uppercase">LinkedIn</div>
                  <a href="https://linkedin.com/in/rezayusufmaulana" target="_blank" rel="noreferrer" className="text-white hover:text-accent-blue transition-colors font-medium">/in/rezayusufmaulana</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3.5 glass rounded-xl text-accent-cyan border border-white/10">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-mono mb-1 tracking-wider uppercase">Location</div>
                  <div className="text-white font-medium">South Tangerang, Indonesia</div>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="glass p-8 md:p-10 rounded-2xl border border-white/5 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-text-secondary">{t("name")}</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                  required
                  className="w-full bg-bg-primary/50 border border-white/10 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
                  placeholder={t("namePlaceholder")}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-text-secondary">{t("email")}</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  className="w-full bg-bg-primary/50 border border-white/10 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
                  placeholder={t("emailPlaceholder")}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-text-secondary">{t("message")}</label>
              <textarea 
                id="message" 
                name="message"
                minLength={10}
                maxLength={5000}
                rows={5}
                required
                className="w-full bg-bg-primary/50 border border-white/10 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all resize-none"
                placeholder={t("messagePlaceholder")}
              />
            </div>

            <div className="absolute -left-[10000px]" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div aria-live="polite" role="status" className="min-h-6 text-sm">
              {status === "error" && <p className="text-red-300">{errorMessage}</p>}
              {status === "success" && <p className="text-green-300">{t("success")}</p>}
            </div>
            
            <Button 
              type="submit" 
              variant="gradient" 
              size="lg" 
              className="w-full mt-4"
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading" ? t("sending") : status === "success" ? t("sent") : (
                <>{t("send")} <Send size={18} className="ml-2" aria-hidden="true" /></>
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
