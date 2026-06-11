import { Navbar } from "@/shared/ui/Navbar";
import { Footer } from "@/shared/ui/Footer";
import { HeroSection } from "@/features/hero/ui/HeroSection";
import { AboutSection } from "@/features/about/ui/AboutSection";
import { ExperienceSection } from "@/features/experience/ui/ExperienceSection";
import { ProjectsSection } from "@/features/projects/ui/ProjectsSection";
import { SkillsSection } from "@/features/skills/ui/SkillsSection";
import { CertificationsSection } from "@/features/certifications/ui/CertificationsSection";
import { BlogSection } from "@/features/blog/ui/BlogSection";
import { ContactSection } from "@/features/contact/ui/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificationsSection />
        <BlogSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
