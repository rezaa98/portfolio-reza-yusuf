/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Check, CircleDot, Loader2, GitBranch, Terminal } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";

interface TestData {
  id: string;
  name: string;
  status: "passed" | "failed" | "skipped" | "timedOut" | string;
  time: string;
}

interface LogEntry {
  id: number;
  text: string;
  type: "command" | "info" | "success" | "error" | "system";
}

export function PipelineVisualizer() {
  const [status, setStatus] = useState<"idle" | "running" | "success">("idle");
  const [activeStageIndex, setActiveStageIndex] = useState(-1);
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const t = useTranslations("WebDemo.PipelineVisualizer");

  const [tests, setTests] = useState<TestData[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const PIPELINE_STAGES = [
    { id: "checkout", name: t("stages.checkout"), time: "2s" },
    { id: "install", name: t("stages.install"), time: "15s" },
    { id: "lint", name: t("stages.lint"), time: "5s" },
    { id: "test", name: t("stages.test"), time: "45s" },
    { id: "deploy", name: t("stages.deploy"), time: "12s" },
  ];

  // Fetch real test data on mount
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const isPreview = window.location.hostname.includes('sit') || window.location.hostname.includes('vercel.app') || window.location.hostname === 'localhost';
        const currentBranch = isPreview ? 'sit' : 'master';
        const url = `https://rezaa98.github.io/portfolio-reza-yusuf/${currentBranch}/test-results.json?t=${new Date().getTime()}`;
        
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) return;
        
        const data = await response.json();
        const extractedTests: TestData[] = [];
        
        const processSuites = (suites: Array<{ specs?: Array<any>; suites?: any[] }>) => {
          if (!suites) return;
          suites.forEach(suite => {
            if (suite.specs) {
              suite.specs.forEach(spec => {
                const testRun = spec.tests?.[0]?.results?.[0];
                if (testRun) {
                  extractedTests.push({
                    id: spec.id || Math.random().toString(36).substring(7),
                    name: spec.title,
                    status: testRun.status,
                    time: `${(testRun.duration / 1000).toFixed(1)}s`
                  });
                }
              });
            }
            if (suite.suites) processSuites(suite.suites);
          });
        };

        processSuites(data.config?.suites || data.suites || []);
        if (extractedTests.length > 0) {
          setTests(extractedTests);
        }
      } catch (err) {
        console.error("Failed to fetch Playwright JSON for terminal:", err);
      }
    };

    fetchReport();
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (text: string, type: LogEntry["type"] = "info") => {
    setLogs(prev => [...prev, { id: Date.now() + Math.random(), text, type }]);
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const runPipeline = async () => {
    if (status === "running") return;
    
    setStatus("running");
    setActiveStageIndex(0);
    setCompletedStages([]);
    setLogs([]);

    // Fallback tests if API fails
    const defaultTests: TestData[] = [
      { id: "1", name: "Verify Home Page", status: "passed", time: "1.2s" },
      { id: "2", name: "Verify Login Flow", status: "passed", time: "3.5s" },
      { id: "3", name: "Verify Security Headers", status: "passed", time: "0.8s" },
    ];
    const targetTests = tests.length > 0 ? tests : defaultTests;

    try {
      // 1. Checkout
      addLog("git clone https://github.com/rezaa98/portfolio-reza-yusuf.git", "command");
      await delay(600);
      addLog("Cloning into 'portfolio-reza-yusuf'...", "info");
      await delay(800);
      addLog("Resolving deltas: 100% (453/453), done.", "success");
      setCompletedStages(prev => [...prev, "checkout"]);
      setActiveStageIndex(1);

      // 2. Install
      await delay(500);
      addLog("npm ci", "command");
      await delay(1000);
      addLog("Installing dependencies...", "info");
      await delay(1200);
      addLog("added 1302 packages, and audited 1303 packages in 12s", "success");
      setCompletedStages(prev => [...prev, "install"]);
      setActiveStageIndex(2);

      // 3. Lint
      await delay(500);
      addLog("npm run lint", "command");
      await delay(800);
      addLog("next lint", "info");
      await delay(1000);
      addLog("✔ No ESLint warnings or errors", "success");
      setCompletedStages(prev => [...prev, "lint"]);
      setActiveStageIndex(3);

      // 4. Test
      await delay(500);
      addLog("npx playwright test", "command");
      await delay(800);
      addLog(`Running ${targetTests.length} tests using 4 workers`, "info");
      await delay(500);

      // Stream real tests
      let passedCount = 0;
      let failedCount = 0;
      
      for (const test of targetTests) {
        await delay(300 + Math.random() * 400); // randomize test duration perception
        if (test.status === "passed") {
          addLog(`  ✔ [${test.time}] ${test.name}`, "success");
          passedCount++;
        } else if (test.status === "failed" || test.status === "timedOut") {
          addLog(`  ✘ [${test.time}] ${test.name}`, "error");
          failedCount++;
        } else {
          addLog(`  - [${test.time}] ${test.name} (skipped)`, "info");
        }
      }
      
      await delay(500);
      if (failedCount > 0) {
        addLog(`✖ ${failedCount} failed, ${passedCount} passed`, "error");
      } else {
        addLog(`✔ ${passedCount} passed`, "success");
      }
      
      setCompletedStages(prev => [...prev, "test"]);
      setActiveStageIndex(4);

      // 5. Deploy
      await delay(800);
      addLog("Deploying to Vercel Production...", "command");
      await delay(1200);
      addLog("Building optimized output...", "info");
      await delay(1000);
      addLog("✅ Deployment successful. URL: https://rezacode.cloud", "success");
      
      setCompletedStages(prev => [...prev, "deploy"]);
      
      await delay(500);
      setActiveStageIndex(-1);
      setStatus("success");
      addLog("Pipeline completed successfully.", "system");

    } catch (e) {
      addLog("Pipeline failed unexpectedly.", "error");
      setStatus("idle");
    }
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-xl bg-[#0d1117] text-gray-300 flex flex-col">
      {/* Header */}
      <div className="bg-[#161b22] px-4 py-3 flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 gap-4 shrink-0">
        <div className="flex flex-wrap items-center gap-3">
          <GitBranch size={18} className="text-gray-400" />
          <span className="font-semibold text-sm break-all">rezaa98/portfolio-reza-yusuf</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://github.com/rezaa98/portfolio-reza-yusuf/actions/workflows/e2e-tests.yml/badge.svg" 
            alt="Playwright E2E Tests Status" 
            className="h-5 hidden sm:block"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://github.com/rezaa98/portfolio-reza-yusuf/actions/workflows/e2e-tests.yml"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          >
            {t("viewRealReport")}
          </a>
          <button
            onClick={runPipeline}
            disabled={status === "running"}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "running" ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
            {status === "running" ? t("running") : t("runWorkflow")}
          </button>
        </div>
      </div>

      {/* Pipeline Visuals */}
      <div className="p-6 md:p-8 overflow-x-auto w-full shrink-0 border-b border-white/10">
        <div className="flex items-center justify-between min-w-[600px] relative">
          <div className="absolute left-6 right-6 top-6 h-1 bg-gray-700 rounded z-0" />
          
          <div 
            className="absolute left-6 top-6 h-1 bg-green-500 rounded z-0 transition-all duration-500 ease-in-out" 
            style={{ 
              width: status === "idle" ? "0%" : 
                     status === "success" ? "100%" : 
                     `${Math.max(0, (activeStageIndex / (PIPELINE_STAGES.length - 1)) * 100 - 5)}%`
            }} 
          />

          {PIPELINE_STAGES.map((stage, index) => {
            const isCompleted = completedStages.includes(stage.id);
            const isActive = index === activeStageIndex;

            return (
              <div key={stage.id} className="relative z-10 flex flex-col items-center gap-3 w-32">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300",
                  isCompleted ? "bg-green-500/20 border-green-500 text-green-400" :
                  isActive ? "bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]" :
                  "bg-gray-800 border-gray-600 text-gray-500"
                )}>
                  {isCompleted ? <Check size={20} /> :
                   isActive ? <Loader2 size={20} className="animate-spin" /> :
                   <CircleDot size={20} />}
                </div>
                <div className="text-center">
                  <div className={cn(
                    "text-sm font-medium transition-colors",
                    isCompleted || isActive ? "text-gray-200" : "text-gray-500"
                  )}>
                    {stage.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {isCompleted ? stage.time : isActive ? t("running") : t("pending")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal Output */}
      <div className="bg-[#0a0c10] flex-1 flex flex-col min-h-[250px] max-h-[350px]">
        <div className="bg-[#010409] px-4 py-2 border-b border-white/5 flex items-center gap-2 text-xs text-gray-500 shrink-0">
          <Terminal size={14} />
          <span>DevSecOps Pipeline Logs</span>
          <span className="ml-auto text-green-400/50">Live Output</span>
        </div>
        
        <div 
          ref={terminalRef}
          className="p-4 font-mono text-xs md:text-sm overflow-y-auto space-y-1.5 flex-1"
        >
          {logs.length === 0 && status === "idle" && (
            <div className="text-gray-600 italic">Press "Run Workflow" to start pipeline simulation...</div>
          )}
          
          {logs.map(log => (
            <div key={log.id} className="animate-in fade-in duration-200">
              {log.type === "command" && (
                <div className="text-blue-400 mt-2">
                  <span className="text-pink-500 mr-2">❯</span>
                  {log.text}
                </div>
              )}
              {log.type === "info" && <div className="text-gray-400 pl-4">{log.text}</div>}
              {log.type === "success" && <div className="text-green-400 pl-4">{log.text}</div>}
              {log.type === "error" && <div className="text-red-400 pl-4">{log.text}</div>}
              {log.type === "system" && <div className="text-cyan-400 mt-2 font-bold">{log.text}</div>}
            </div>
          ))}
          
          {status === "running" && (
            <div className="pl-4 mt-2">
              <span className="inline-block w-2 h-4 bg-gray-500 animate-pulse" />
            </div>
          )}
        </div>
      </div>

      {status === "success" && (
        <div className="bg-green-500/10 px-4 py-3 border-t border-green-500/20 flex items-center gap-2 text-sm text-green-400 shrink-0">
          <Check size={16} />
          {t("completedText")}
        </div>
      )}
    </div>
  );
}
