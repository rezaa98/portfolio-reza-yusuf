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
import { isSanityConfigured } from "@/sanity/env";

async function fetchSanityPosts() {
  if (!isSanityConfigured) return null;
  try {
    const query = `*[_type == "post"] | order(coalesce(isPinned, false) desc, publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      isPinned,
      "categories": categories[]->title,
      "mainImage": mainImage.asset->url,
      "firstBodyImage": body[_type == "image"][0].asset->url
    }`;
    // Gunakan revalidate 60 detik (ISR) agar tidak fetch langsung ke Sanity setiap saat
    return await client.fetch(query, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Failed to fetch sanity posts:", error);
    return null;
  }
}

export default async function Home() {
  const sanityPosts = await fetchSanityPosts();
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Reza Yusuf Maulana",
    url: "https://rezacode.id",
    jobTitle: "QA Engineer & AI Testing Specialist",
    sameAs: [
      "https://github.com/rezaa98",
      "https://linkedin.com/in/rezayusufmaulana",
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd).replace(/</g, "\\u003c") }} />
      <Navbar />
      
      <main id="main-content" className="flex-1">
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
