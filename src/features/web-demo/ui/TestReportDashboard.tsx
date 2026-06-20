"use client";

import { PieChart, Clock, ListChecks, CheckCircle2, XCircle, AlertCircle, FileCode2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";

interface TestData {
  id: string;
  name: string;
  status: "passed" | "failed" | "skipped" | "flaky";
  time: string;
}

export function TestReportDashboard() {
  const [showHtmlReport, setShowHtmlReport] = useState(false); // Default to our beautiful native UI
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState<TestData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("WebDemo.TestReportDashboard");

  useEffect(() => {
    // If the user opts to see raw HTML, we don't strictly need to fetch JSON, but we do it anyway for the header stats.
    const fetchReport = async () => {
      try {
        const branch = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ? 'sit' : 'master';
        const url = `https://rezaa98.github.io/portfolio-reza-yusuf/${branch}/test-results.json`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Report not found or not generated yet");
        }
        
        const data = await response.json();
        
        // Flatten Playwright JSON report to extract tests
        const extractedTests: TestData[] = [];
        
        const processSuites = (suites: any[]) => {
          if (!suites) return;
          suites.forEach(suite => {
            if (suite.specs) {
              suite.specs.forEach((spec: any) => {
                const testRun = spec.tests?.[0]?.results?.[0];
                if (testRun) {
                  extractedTests.push({
                    id: spec.id || Math.random().toString(36).substring(7),
                    name: spec.title,
                    status: testRun.status, // "passed", "failed", "timedOut", "skipped"
                    time: \`\${(testRun.duration / 1000).toFixed(1)}s\`
                  });
                }
              });
            }
            if (suite.suites) {
              processSuites(suite.suites);
            }
          });
        };

        processSuites(data.config?.suites || data.suites || []);
        
        if (extractedTests.length === 0) {
          throw new Error("No tests found in the report");
        }

        setTests(extractedTests);
        setLoading(false);
      } catch (err: any) {
        console.error("Failed to fetch Playwright JSON report:", err);
        setError(err.message || "Failed to load test report data");
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  const totalTests = tests.length;
  const passed = tests.filter(t => t.status === "passed").length;
  const failed = tests.filter(t => t.status === "failed" || t.status === "timedOut").length;
  const skipped = tests.filter(t => t.status === "skipped").length;
  
  const passRate = totalTests > 0 ? Math.round((passed / totalTests) * 100) : 0;
  
  // Calculate total duration from string values like "2.1s"
  const totalDuration = tests.reduce((acc, curr) => acc + parseFloat(curr.time.replace('s', '')), 0).toFixed(1);

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-md">
      {/* Header */}
      <div className="bg-black/20 px-6 py-4 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <PieChart className="text-accent-blue" />
            {t("title")}
          </h3>
          <p className="text-sm text-text-muted mt-1">{t("subtitle")}</p>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <button 
            onClick={() => setShowHtmlReport(!showHtmlReport)}
            className="text-xs bg-accent-blue/20 hover:bg-accent-blue/40 text-accent-blue transition-colors px-4 py-2 rounded-full flex items-center gap-2 font-medium border border-accent-blue/30"
          >
            <FileCode2 size={14} />
            {showHtmlReport ? t("viewUiSummary") : t("viewRawHtml")}
          </button>
          
          <div className="glass px-4 py-2 rounded-lg text-center hidden lg:block">
            <div className="text-2xl font-bold text-white">{loading ? "-" : totalTests}</div>
            <div className="text-xs text-text-muted">{t("totalTests")}</div>
          </div>
          <div className="glass px-4 py-2 rounded-lg text-center hidden lg:block">
            <div className={cn("text-2xl font-bold", passRate === 100 ? "text-green-400" : passRate > 0 ? "text-yellow-400" : "text-white")}>
              {loading ? "-" : \`\${passRate}%\`}
            </div>
            <div className="text-xs text-text-muted">{t("passRate")}</div>
          </div>
          <div className="glass px-4 py-2 rounded-lg text-center hidden lg:block">
            <div className="text-2xl font-bold text-accent-cyan flex items-center justify-center gap-1">
              <Clock size={16} />
              {loading ? "-" : \`\${totalDuration}s\`}
            </div>
            <div className="text-xs text-text-muted">{t("duration")}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 min-h-[400px]">
        {showHtmlReport ? (
          <div className="w-full h-[600px] rounded-lg overflow-hidden border border-white/10 bg-white">
            <iframe 
              src={\`https://rezaa98.github.io/portfolio-reza-yusuf/\${process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ? 'sit' : 'master'}/\`} 
              className="w-full h-full border-0"
              title="Playwright HTML Report"
            />
          </div>
        ) : (
          <>
            {loading ? (
              <div className="w-full h-[300px] flex flex-col items-center justify-center text-accent-blue">
                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                <p className="text-text-secondary animate-pulse">Fetching live test reports from CI/CD pipeline...</p>
              </div>
            ) : error ? (
              <div className="w-full h-[300px] flex flex-col items-center justify-center text-red-400 border border-red-500/20 bg-red-500/5 rounded-xl">
                <AlertCircle className="w-10 h-10 mb-4" />
                <p className="font-medium text-lg">Report not available yet</p>
                <p className="text-sm text-red-400/70 mt-2 max-w-md text-center">{error}</p>
                <p className="text-xs text-gray-500 mt-6">Note: The test-results.json might still be building in GitHub Actions. Please check back in a few minutes.</p>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 size={16} /> {passed} {t("passed")}
                  </div>
                  {failed > 0 && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                      <XCircle size={16} /> {failed} {t("failed")}
                    </div>
                  )}
                  {skipped > 0 && (
                    <div className="bg-gray-500/10 border border-gray-500/20 text-gray-400 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                      <AlertCircle size={16} /> {skipped} {t("skipped")}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {tests.map((test) => (
                    <div key={test.id} className="border border-white/5 rounded-lg overflow-hidden bg-black/20 hover:bg-black/40 transition-colors">
                      <div className="w-full px-4 py-3 flex items-center justify-between text-left">
                        <div className="flex items-center gap-3">
                          {test.status === "passed" && <CheckCircle2 className="text-green-400" size={18} />}
                          {(test.status === "failed" || test.status === "timedOut") && <XCircle className="text-red-400" size={18} />}
                          {test.status === "skipped" && <AlertCircle className="text-gray-400" size={18} />}
                          <span className={cn(
                            "font-medium text-sm md:text-base",
                            (test.status === "failed" || test.status === "timedOut") ? "text-red-200" : "text-gray-200"
                          )}>
                            {test.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500 font-mono">{test.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
