import { PlaywrightSimulator } from "@/features/web-demo/ui/PlaywrightSimulator";
import { PipelineVisualizer } from "@/features/web-demo/ui/PipelineVisualizer";
import { TestReportDashboard } from "@/features/web-demo/ui/TestReportDashboard";
import { ArrowRight, GitBranch } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "Navbar" });
  return {
    title: `${t("web_demo")} | Reza Yusuf Maulana`,
  };
}

export default async function WebDemoPage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-16">
      
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-blue/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] bg-accent-purple/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-accent-cyan/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-24">
        
        {/* Header Section */}
        <section className="text-center max-w-3xl mx-auto mt-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-space-grotesk text-white mb-6 tracking-tight">
            Automation & CI/CD <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple">Showcase</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            An interactive demonstration of my QA Engineering workflow. This page simulates how automated tests are written using Playwright, executed through CI/CD pipelines, and monitored via reporting dashboards.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#simulator" className="btn-primary">
              Explore Demo <ArrowRight size={18} />
            </a>
            <a href="https://github.com/rezaa98" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <GitBranch size={18} /> View Real Projects
            </a>
          </div>
        </section>

        {/* Playwright Simulator Section */}
        <section id="simulator" className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-space-grotesk flex items-center gap-3">
              <span className="text-accent-blue">01.</span> Live Test Simulator
            </h2>
            <p className="text-text-secondary">
              Simulating a Playwright E2E test execution. Click &quot;Run Test&quot; to observe the automated scenario stepping through expected vs actual results in real-time.
            </p>
          </div>
          <PlaywrightSimulator />
        </section>

        {/* CI/CD Visualizer Section */}
        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-space-grotesk flex items-center gap-3">
              <span className="text-accent-purple">02.</span> Pipeline Visualizer
            </h2>
            <p className="text-text-secondary">
              A representation of a Continuous Integration workflow. Automation tests are triggered automatically on push, ensuring code quality before deployment.
            </p>
          </div>
          <PipelineVisualizer />
        </section>

        {/* Test Report Section */}
        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-space-grotesk flex items-center gap-3">
              <span className="text-accent-cyan">03.</span> Automation Report
            </h2>
            <p className="text-text-secondary">
              Mock reporting dashboard tracking test suite health, execution time, and detailed failure logs to quickly identify and resolve regressions.
            </p>
          </div>
          <TestReportDashboard />
        </section>

        {/* Note about Phase 2 */}
        <section className="mt-12 glass p-8 rounded-2xl border border-white/10 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-3">Coming Soon: Playwright Agentic AI</h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            This interactive demo showcases standard automation. In Phase 2, a complete repository integrating Playwright with MCP (Model Context Protocol) for Agentic AI-driven testing will be available on GitHub.
          </p>
          <a href="https://github.com/rezaa98" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-accent-cyan hover:text-white transition-colors">
            Follow my GitHub for updates <ArrowRight size={16} />
          </a>
        </section>

      </div>
    </div>
  );
}
