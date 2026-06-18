"use client";

import { useState, useEffect } from "react";
import { Play, CheckCircle2, XCircle, TerminalSquare, FileCode2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const MOCK_CODE = `import { test, expect } from '@playwright/test';

test.describe('Portfolio Verification Suite', () => {
  test('Verify Web Demo Navigation', async ({ page }) => {
    // 1. Start at homepage
    await page.goto('/');
    
    // 2. Click Web Demo link
    const webDemoLink = page.getByRole('link', { name: /Web Demo/i }).first();
    await webDemoLink.click();
    
    // 3. Verify URL changes
    await page.waitForURL('**/web-demo');
    
    // 4. Verify correct heading
    const heading = page.locator('h1', { hasText: 'Automation & CI/CD' });
    await expect(heading).toBeVisible();
  });
});`;

const TEST_SCENARIO = [
  { step: "Navigate to /", time: 800, expected: "Homepage renders", actual: "Homepage rendered correctly", status: "pass" },
  { step: "Click Web Demo link", time: 600, expected: "Navigation triggered", actual: "Link clicked successfully", status: "pass" },
  { step: "Wait for URL change", time: 400, expected: "URL contains /web-demo", actual: "URL is /web-demo", status: "pass" },
  { step: "Verify Heading", time: 1000, expected: "Heading 'Automation & CI/CD' is visible", actual: "Heading verified on screen", status: "pass" },
];

export function PlaywrightSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

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
        <div className="bg-black/40 px-4 py-2 flex items-center justify-between border-b border-white/10 text-xs text-text-muted">
          <div className="flex items-center gap-2">
            <TerminalSquare size={14} className="text-accent-cyan" />
            <span>Terminal</span>
          </div>
          <button 
            onClick={runTest}
            disabled={isRunning}
            className="flex items-center gap-1 bg-accent-blue/20 hover:bg-accent-blue/40 text-accent-blue px-2 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={12} />
            {isRunning ? "Running..." : "Run Test"}
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
            <div className="text-gray-500 italic">Click &quot;Run Test&quot; to execute Playwright scenario.</div>
          )}
        </div>
      </div>
    </div>
  );
}
