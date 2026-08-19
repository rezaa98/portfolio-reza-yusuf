"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, FileText, Activity, Database, Workflow, CheckSquare, Settings, Code2, List } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

type TestCase = {
  id: string;
  name: string;
  category: string;
  description: string;
  label: "Positive" | "Negative" | "Edge";
  status: "Passed" | "Failed";
  isAutomated: boolean;
  testData: string;
  steps: string[];
  expectedResult: string;
};

type ReportAnnotation = { type: string; description?: string };
type ReportResult = { status: string; duration?: number };
type ReportSpec = {
  title: string;
  tests?: Array<{ results?: ReportResult[]; annotations?: ReportAnnotation[] }>;
};
type ReportSuite = { specs?: ReportSpec[]; suites?: ReportSuite[] };
type PlaywrightReport = { config?: { suites?: ReportSuite[] }; suites?: ReportSuite[] };

const isCategory = (value: string): value is "UI" | "API" | "Security" =>
  ["UI", "API", "Security"].includes(value);

const isLabel = (value: string): value is TestCase["label"] =>
  ["Positive", "Negative", "Edge"].includes(value);

// Hardcoded list removed. We now fetch dynamically.

export function TestCaseRepository() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<Record<string, "manual" | "code">>({});
  const [sourceCode, setSourceCode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<"All" | "UI" | "API" | "Security">("All");
  const t = useTranslations("WebDemo.TestCaseRepository");

  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState(true);

  const branch = process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ? "sit" : "master";

  useEffect(() => {
    // Fetch actual Playwright spec files from GitHub dynamically
    const fetchSourceCode = async () => {
      try {
        const url1 = `https://raw.githubusercontent.com/rezaa98/portfolio-reza-yusuf/${branch}/tests/portfolio.spec.ts`;
        const url2 = `https://raw.githubusercontent.com/rezaa98/portfolio-reza-yusuf/${branch}/tests/api/endpoints.spec.ts`;
        const url3 = `https://raw.githubusercontent.com/rezaa98/portfolio-reza-yusuf/${branch}/tests/security.spec.ts`;
        
        const [res1, res2, res3] = await Promise.all([fetch(url1), fetch(url2), fetch(url3)]);
        const text1 = res1.ok ? await res1.text() : "";
        const text2 = res2.ok ? await res2.text() : "";
        const text3 = res3.ok ? await res3.text() : "";
        
        if (text1 || text2 || text3) {
          setSourceCode(text1 + "\n\n" + text2 + "\n\n" + text3);
        }
      } catch (err) {
        console.error("Failed to fetch Playwright source code", err);
      }
    };

    const fetchTestResults = async () => {
      try {
        const url = `https://rezaa98.github.io/portfolio-reza-yusuf/${branch}/test-results.json`;
        
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error("Report not found");
        }
        
        const data = await response.json() as PlaywrightReport;
        const extractedTests: TestCase[] = [];
        let idCounter = 1;

        // Flatten Playwright JSON report to extract tests and annotations
        const processSuites = (suites: ReportSuite[]) => {
          if (!suites) return;
          suites.forEach(suite => {
            if (suite.specs) {
              suite.specs.forEach((spec) => {
                const testRun = spec.tests?.[0]?.results?.[0];
                const annotations = spec.tests?.[0]?.annotations || [];
                
                // Extract metadata from annotations
                const getAnnotation = (type: string) => annotations.find((annotation) => annotation.type === type)?.description || "N/A";
                
                const stepsStr = getAnnotation('steps');
                let stepsArr: string[] = [];
                try {
                  stepsArr = stepsStr !== "N/A" ? JSON.parse(stepsStr) : [];
                } catch {
                  stepsArr = [stepsStr];
                }

                if (testRun) {
                  const category = getAnnotation('category');
                  const label = getAnnotation('label');
                  extractedTests.push({
                    id: `TC-${String(idCounter++).padStart(3, '0')}`,
                    name: spec.title,
                    category: isCategory(category) ? category : "UI",
                    description: getAnnotation('description'),
                    label: isLabel(label) ? label : "Positive",
                    status: testRun.status === 'passed' ? 'Passed' : 'Failed',
                    isAutomated: true,
                    testData: getAnnotation('testData'),
                    steps: stepsArr.length > 0 ? stepsArr : ["(Steps missing in annotations)"],
                    expectedResult: getAnnotation('expectedResult')
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
        
        if (extractedTests.length > 0) {
          setTestCases(extractedTests);
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch Playwright JSON report", err);
        setLoading(false);
      }
    };

    fetchSourceCode();
    fetchTestResults();
  }, [branch]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleViewMode = (id: string, mode: "manual" | "code") => {
    setViewMode(prev => ({ ...prev, [id]: mode }));
  };

  const extractTestCode = (name: string): string => {
    if (!sourceCode) return "// Fetching live source code from GitHub...";
    try {
      const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`test\\(['"\`]${escapedName}['"\`].*?\\{([\\s\\S]*?)\\}\\);`, 'm');
      const match = sourceCode.match(regex);
      if (match && match[1]) {
        const lines = match[1].split('\n');
        if (lines[0].trim() === '') lines.shift();
        if (lines[lines.length - 1].trim() === '') lines.pop();
        const minIndent = Math.min(...lines.filter(l => l.trim().length > 0).map(l => l.match(/^\s*/)?.[0].length || 0));
        return lines.map(l => l.substring(minIndent)).join('\n');
      }
    } catch (e) {
      console.error(e);
    }
    return "// Source code not found for this scenario in portfolio.spec.ts";
  };

  const getLabelColor = (label: string) => {
    switch (label) {
      case "Positive": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Negative": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "Edge": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const filteredCases = testCases.filter(tc => selectedCategory === "All" || tc.category === selectedCategory);

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f172a] font-sans">
      {/* Header */}
      <div className="bg-black/40 px-6 py-4 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileText className="text-accent-blue" size={20} />
          <h3 className="font-bold text-white text-lg font-space-grotesk">{t("header")}</h3>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as "All" | "UI" | "API" | "Security")}
              className="appearance-none bg-[#1e293b] border border-white/10 text-gray-300 text-sm rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent-blue transition-all cursor-pointer"
            >
              <option value="All">All Scenarios</option>
              <option value="UI">UI Web Tests</option>
              <option value="API">API Tests</option>
              <option value="Security">Security Tests</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
          </div>

          {sourceCode && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400 font-medium whitespace-nowrap">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Live Linked
            </div>
          )}
        </div>
      </div>

      {/* Table List */}
      <div className="flex flex-col relative min-h-[200px]">
        {loading && testCases.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-accent-blue bg-black/50 z-10">
            <div className="w-8 h-8 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-sm font-medium animate-pulse">Syncing Tests-as-Documentation from CI/CD...</p>
          </div>
        )}
        
        {filteredCases.map((tc) => {
          const currentMode = viewMode[tc.id] || "manual";
          return (
            <div key={tc.id} className="border-b border-white/5 last:border-b-0">
              {/* Collapsed Row */}
              <div 
                onClick={() => toggleExpand(tc.id)}
                className="px-4 md:px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0 w-full">
                  <span className="text-accent-blue font-mono text-xs md:text-sm shrink-0 w-14 md:w-16">{tc.id}</span>
                  <span className="text-white font-medium text-sm md:text-base truncate">{tc.name}</span>
                </div>
                
                <div className="flex items-center gap-2 md:gap-3 shrink-0 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                  <span className={cn("px-2.5 py-1 rounded-md border text-xs font-medium", getLabelColor(tc.label))}>
                    {tc.label}
                  </span>
                  <div className="flex items-center gap-1.5 text-green-400 bg-green-400/10 px-2.5 py-1 rounded-md text-xs font-medium border border-green-400/20">
                    <CheckCircle2 size={12} />
                    {tc.status}
                  </div>
                  <button className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 transition-colors">
                    {expandedId === tc.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedId === tc.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden bg-black/20"
                  >
                    <div className="p-6 pt-2 border-t border-white/5 grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Left Column: Context */}
                      <div className="lg:col-span-1 space-y-4">
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2 flex items-center gap-2">
                            <Activity size={14} /> {t("description")}
                          </h4>
                          <p className="text-sm text-gray-300 leading-relaxed">{tc.description}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2 flex items-center gap-2">
                            <Database size={14} /> {t("testData")}
                          </h4>
                          <code className="text-xs text-accent-cyan bg-white/5 px-2 py-1.5 rounded border border-white/10 block font-mono break-all">
                            {tc.testData}
                          </code>
                        </div>

                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2 flex items-center gap-2">
                            <Settings size={14} /> {t("automationStatus")}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            {tc.isAutomated ? (
                              <span className="flex items-center gap-2 bg-accent-purple/20 text-accent-purple px-2 py-1 rounded-md border border-accent-purple/20">
                                {t("automated")}
                              </span>
                            ) : (
                              <span className="text-gray-500">{t("manual")}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Steps & Result */}
                      <div className="lg:col-span-2 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                          <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold flex items-center gap-2">
                            <Workflow size={14} /> {t("testSteps")}
                          </h4>
                          
                          <div className="flex bg-black/40 border border-white/10 rounded-lg p-1">
                            <button 
                              onClick={(e) => { e.stopPropagation(); toggleViewMode(tc.id, "manual"); }}
                              className={cn(
                                "flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex-1 sm:flex-none",
                                currentMode === "manual" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"
                              )}
                            >
                              <List size={14} /> Manual
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); toggleViewMode(tc.id, "code"); }}
                              className={cn(
                                "flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex-1 sm:flex-none",
                                currentMode === "code" ? "bg-accent-blue/20 text-accent-blue" : "text-gray-500 hover:text-gray-300"
                              )}
                            >
                              <Code2 size={14} /> Playwright Script
                            </button>
                          </div>
                        </div>

                        {currentMode === "manual" ? (
                          <ol className="list-decimal list-inside space-y-1.5">
                            {tc.steps.map((step, idx) => (
                              <li key={idx} className="text-sm text-gray-300">
                                <span className="pl-1">{step}</span>
                              </li>
                            ))}
                          </ol>
                        ) : (
                          <div className="rounded-lg overflow-hidden border border-white/10 bg-[#1e1e1e] font-mono text-xs sm:text-sm">
                            <div className="bg-[#2d2d2d] px-4 py-2 border-b border-white/5 flex items-center gap-2 text-gray-400">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                              <span className="ml-2 truncate">{tc.category === 'UI' ? 'portfolio.spec.ts' : tc.category === 'Security' ? 'security.spec.ts' : 'endpoints.spec.ts'}</span>
                            </div>
                            <pre className="p-4 overflow-x-auto text-gray-300 leading-relaxed">
                              {extractTestCode(tc.name)}
                            </pre>
                          </div>
                        )}

                        {currentMode === "manual" && (
                          <div className="bg-accent-blue/10 border border-accent-blue/20 rounded-lg p-4 mt-4">
                            <h4 className="text-xs uppercase tracking-wider text-accent-blue font-bold mb-2 flex items-center gap-2">
                              <CheckSquare size={14} /> {t("expectedResult")}
                            </h4>
                            <p className="text-sm text-gray-200">{tc.expectedResult}</p>
                          </div>
                        )}
                      </div>
                      
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
        {filteredCases.length === 0 && (
          <div className="px-6 py-12 text-center text-gray-500">
            No test scenarios found for this category.
          </div>
        )}
      </div>
    </div>
  );
}
