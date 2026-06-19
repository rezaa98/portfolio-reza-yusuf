import { Navbar } from "@/shared/ui/Navbar";
import { Footer } from "@/shared/ui/Footer";
import { DocsLayout } from "@/features/docs/ui/DocsLayout";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col font-sans selection:bg-accent-primary/30">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
              Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-cyan">Documentation</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
              Comprehensive technical documentation detailing the architecture, functional specifications, and technologies used to build this portfolio.
            </p>
          </div>
          
          <DocsLayout />
        </div>
      </main>
      <Footer />
    </div>
  );
}
