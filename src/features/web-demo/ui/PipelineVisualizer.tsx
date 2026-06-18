"use client";

import { useState } from "react";
import { Play, Check, CircleDot, Loader2, GitBranch, Terminal } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const PIPELINE_STAGES = [
  { id: "checkout", name: "Checkout Code", time: "2s" },
  { id: "install", name: "Install Dependencies", time: "15s" },
  { id: "lint", name: "Run Linter", time: "5s" },
  { id: "test", name: "Playwright E2E Tests", time: "45s" },
  { id: "deploy", name: "Deploy to Staging", time: "12s" },
];

export function PipelineVisualizer() {
  const [status, setStatus] = useState<"idle" | "running" | "success">("idle");
  const [activeStageIndex, setActiveStageIndex] = useState(-1);
  const [completedStages, setCompletedStages] = useState<string[]>([]);

  const runPipeline = () => {
    if (status === "running") return;
    
    setStatus("running");
    setActiveStageIndex(0);
    setCompletedStages([]);

    let delay = 0;
    
    PIPELINE_STAGES.forEach((stage, index) => {
      // Fake time based on stage time (simplified to milliseconds)
      const stageDuration = parseInt(stage.time) * 200; // 2s -> 400ms for demo purposes
      
      setTimeout(() => {
        setActiveStageIndex(index);
      }, delay);
      
      delay += stageDuration;

      setTimeout(() => {
        setCompletedStages(prev => [...prev, stage.id]);
      }, delay);
    });

    setTimeout(() => {
      setActiveStageIndex(-1);
      setStatus("success");
    }, delay + 500);
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-xl bg-[#0d1117] text-gray-300">
      <div className="bg-[#161b22] px-4 py-3 flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <GitBranch size={18} className="text-gray-400" />
          <span className="font-semibold text-sm break-all">rezaa98/portfolio-reza-yusuf</span>
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
            View Real Report
          </a>
          <button
          onClick={runPipeline}
          disabled={status === "running"}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "running" ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
          Run Workflow
        </button>
        </div>
      </div>

      <div className="p-6 md:p-8 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[600px] relative">
          {/* Connecting Line */}
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
            const isPending = !isCompleted && !isActive;

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
                    {isCompleted ? stage.time : isActive ? "Running..." : "Pending"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {status === "success" && (
        <div className="bg-[#161b22] px-4 py-3 border-t border-white/10 flex items-center gap-2 text-sm text-green-400">
          <Check size={16} />
          Workflow completed successfully. Automation tests passed and deployed to staging.
        </div>
      )}
    </div>
  );
}
