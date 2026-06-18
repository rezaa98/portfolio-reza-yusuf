import { PlaywrightSimulator } from "@/features/web-demo/ui/PlaywrightSimulator";
import { PipelineVisualizer } from "@/features/web-demo/ui/PipelineVisualizer";
import { TestReportDashboard } from "@/features/web-demo/ui/TestReportDashboard";
import { AgentChatSimulator } from "@/features/web-demo/ui/AgentChatSimulator";
import { TestCaseRepository } from "@/features/web-demo/ui/TestCaseRepository";
import { ArrowRight, GitBranch, Bot } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/shared/ui/Navbar";
import { Footer } from "@/shared/ui/Footer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Navbar" });
  return {
    title: `${t("web_demo")} | Reza Yusuf Maulana`,
  };
}

export default async function WebDemoPage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-16 flex flex-col">
      <Navbar />
      
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-blue/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] bg-accent-purple/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-accent-cyan/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-24 overflow-x-hidden">
        
        {/* Header Section */}
        <section className="text-center max-w-3xl mx-auto mt-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-space-grotesk text-white mb-6 tracking-tight">
            Automation & CI/CD <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple">Showcase</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            An interactive demonstration of my QA Engineering workflow. This page simulates how automated tests are written using Playwright, executed through CI/CD pipelines, and monitored via reporting dashboards.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#simulator" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-blue hover:bg-blue-600 text-white font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              Explore Demo <ArrowRight size={18} />
            </a>
            <a href="https://github.com/rezaa98" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all">
              <GitBranch size={18} /> View Real Projects
            </a>
          </div>
        </section>

        {/* Test Scenario Repository Section */}
        <section id="simulator" className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-space-grotesk flex items-center gap-3">
              <span className="text-accent-blue">01.</span> Test Scenario Documentation
            </h2>
            <p className="text-text-secondary">
              A repository of the end-to-end testing scenarios designed for this portfolio. Click on any test case to view its detailed documentation, steps, and expected results.
            </p>
          </div>
          <TestCaseRepository />
        </section>

        {/* Playwright Simulator Section */}
        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-space-grotesk flex items-center gap-3">
              <span className="text-accent-purple">02.</span> Live Test Execution
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
              <span className="text-accent-cyan">03.</span> Pipeline Visualizer
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
              <span className="text-accent-blue">04.</span> Automation Report
            </h2>
            <p className="text-text-secondary">
              Mock reporting dashboard tracking test suite health, execution time, and detailed failure logs to quickly identify and resolve regressions.
            </p>
          </div>
          <TestReportDashboard />
        </section>

        {/* Live Agentic AI Section */}
        <section className="space-y-6 pt-8 border-t border-white/10">
          <div className="flex flex-col gap-2 text-center items-center">
            <div className="inline-flex items-center justify-center p-3 bg-accent-purple/10 rounded-full mb-2">
              <Bot size={32} className="text-accent-purple" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white font-space-grotesk">
              Agentic AI Test Generator
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto mb-8">
              Experience the future of QA Automation. This live chatbot is powered by Google Gemini 1.5, strictly configured to generate Playwright TypeScript scripts. Try prompting it to write a test scenario!
            </p>
          </div>
          
          <AgentChatSimulator />

          <div className="text-center mt-6">
            <a href="https://github.com/rezaa98/Playwright-mcp-web-portofolio" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors bg-cyan-400/10 px-4 py-2 rounded-full">
              <GitBranch size={16} /> View Full MCP Source Code
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
