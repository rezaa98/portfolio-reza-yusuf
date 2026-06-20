"use client";

import { useState } from "react";
import { Play, TerminalSquare, FileCode2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";

import { useTranslations } from "next-intl";

const MOCK_CODE = `import { test, expect } from '@playwright/test';

test.describe('Portfolio Verification Suite', () => {
  test('Negative Test: Verify 404 on Invalid Route', async ({ page }) => {
    // Navigate to a non-existent URL
    const response = await page.goto('/en/this-page-does-not-exist');
    
    // Verify HTTP status is 404
    expect(response?.status()).toBe(404);
    
    // Verify Next.js default 404 page content
    const heading = page.locator('h2');
    await expect(heading).toContainText('This page could not be found.', { timeout: 10000 });
  });
});`;

const TEST_SCENARIO = [
  { step: "Navigate to /en/this-page-does-not-exist", time: 800, expected: "Route loads", actual: "Route attempted", status: "pass" },
  { step: "Verify HTTP status is 404", time: 400, expected: "Status is 404", actual: "Status was 404", status: "pass" },
  { step: "Verify Next.js default 404 page content", time: 600, expected: "Heading contains 'could not be found'", actual: "Text verified on screen", status: "pass" },
];

export function PlaywrightSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const t = useTranslations("WebDemo.PlaywrightSimulator");

  const runTest = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStep(-1);
    setLogs(["> npx playwright test portfolio.spec.ts", "Running 1 test using 1 worker..."]);
    setIsFinished(false);

    let delay = 1000;

    TEST_SCENARIO.forEach((scenario, index) => {
      setTimeout(() => {
        setCurrentStep(index);
        setLogs((prev) => [...prev, `[Running] ${scenario.step}...`]);
      }, delay);
      
      delay += scenario.time;

      setTimeout(() => {
        setLogs((prev) => [
          ...prev, 
          `   ✓ Expected: ${scenario.expected}`,
          `   ✓ Actual: ${scenario.actual}`
        ]);
      }, delay);
    });

    setTimeout(() => {
      setIsRunning(false);
      setIsFinished(true);
      setLogs((prev) => [
        ...prev,
        "",
        "  1 passed (3.9s)",
        "To open last HTML report run:",
        "  npx playwright show-report"
      ]);
    }, delay + 500);
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f172a] font-mono text-sm flex flex-col md:flex-row">
      
      {/* Editor Section */}
      <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
        <div className="bg-black/40 px-4 py-2 flex items-center gap-2 border-b border-white/10 text-xs text-text-muted">
          <FileCode2 size={14} className="text-accent-blue" />
          <span>tests/portfolio.spec.ts</span>
        </div>
        <div className="p-4 overflow-x-auto text-gray-300">
          <pre>
            <code>
              {MOCK_CODE.split('\n').map((line, i) => (
                <div key={i} className={cn("flex", isRunning && currentStep >= 0 && line.includes(TEST_SCENARIO[currentStep]?.step.split(' ')[0]) ? "bg-white/10" : "")}>
                  <span className="w-6 text-gray-600 select-none">{i + 1}</span>
                  <span dangerouslySetInnerHTML={{ 
                    __html: line
                      .replace(/import|from|const|await|async/g, '<span class="text-accent-purple">$&</span>')
                      .replace(/test|expect|page|describe/g, '<span class="text-accent-blue">$&</span>')
                      .replace(/'.*?'/g, '<span class="text-accent-cyan">$&</span>')
                      .replace(/\/\/.*$/g, '<span class="text-gray-500">$&</span>')
                  }} />
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>

      {/* Terminal Section */}
      <div className="w-full md:w-1/2 flex flex-col bg-black/60 relative">
        <div className="bg-black/40 px-4 py-2 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 text-xs text-text-muted">
          <div className="flex items-center gap-2">
            <TerminalSquare size={14} className="text-accent-cyan" />
            <span>{t("terminal")}</span>
          </div>
          <button 
            onClick={runTest}
            disabled={isRunning}
            className="flex items-center gap-1 bg-accent-blue/20 hover:bg-accent-blue/40 text-accent-blue px-2 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={12} />
            {isRunning ? t("running") : t("runTest")}
          </button>
        </div>
        <div className="p-4 flex-grow overflow-y-auto min-h-[300px] text-gray-300">
          {logs.map((log, i) => (
            <div key={i} className={cn(
              "mb-1",
              log.includes("passed") && !log.includes("[Running]") ? "text-green-400 font-bold" : "",
              log.includes("✓") ? "text-gray-400 text-xs" : ""
            )}>
              {log}
            </div>
          ))}
          {isRunning && (
            <div className="animate-pulse">_</div>
          )}
          {!isRunning && !isFinished && logs.length === 0 && (
            <div className="text-gray-500 italic">{t("clickToRun")}</div>
          )}
        </div>
      </div>
    </div>
  );
}
