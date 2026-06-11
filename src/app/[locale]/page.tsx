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
import { client } from "@/sanity/client";

async function fetchSanityPosts() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
  try {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      "categories": categories[]->title
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch sanity posts:", error);
    return null;
  }
}

export default async function Home() {
  const sanityPosts = await fetchSanityPosts();

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
        <BlogSection sanityPosts={sanityPosts} />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
