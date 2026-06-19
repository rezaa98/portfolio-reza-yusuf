"use client";

import { PieChart, Clock, ListChecks, CheckCircle2, XCircle, AlertCircle, ChevronDown, ChevronUp, FileCode2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";

export function TestReportDashboard() {
  const [expandedTest, setExpandedTest] = useState<number | null>(4); // Default expand the failed one
  const [showHtmlReport, setShowHtmlReport] = useState(false);
  const t = useTranslations("WebDemo.TestReportDashboard");

  const TEST_RESULTS = [
    { id: 1, name: t("tests.t1"), status: "passed", time: "2.1s", error: null },
    { id: 2, name: t("tests.t2"), status: "passed", time: "6.1s", error: null },
    { id: 3, name: t("tests.t3"), status: "passed", time: "2.2s", error: null },
    { id: 4, name: t("tests.t4"), status: "passed", time: "1.5s", error: null },
    { id: 5, name: t("tests.t5"), status: "passed", time: "3.4s", error: null },
    { id: 6, name: t("tests.t6"), status: "passed", time: "1.2s", error: null },
  ];

  const totalTests = TEST_RESULTS.length;
  const passed = TEST_RESULTS.filter(t => t.status === "passed").length;
  const failed = TEST_RESULTS.filter(t => t.status === "failed").length;
  const skipped = TEST_RESULTS.filter(t => t.status === "skipped").length;
  
  const passRate = Math.round((passed / totalTests) * 100);

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
            <div className="text-2xl font-bold text-white">{totalTests}</div>
            <div className="text-xs text-text-muted">{t("totalTests")}</div>
          </div>
          <div className="glass px-4 py-2 rounded-lg text-center hidden lg:block">
            <div className="text-2xl font-bold text-green-400">{passRate}%</div>
            <div className="text-xs text-text-muted">{t("passRate")}</div>
          </div>
          <div className="glass px-4 py-2 rounded-lg text-center hidden lg:block">
            <div className="text-2xl font-bold text-accent-cyan flex items-center justify-center gap-1">
              <Clock size={16} />
              15.3s
            </div>
            <div className="text-xs text-text-muted">{t("duration")}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {showHtmlReport ? (
          <div className="w-full h-[600px] rounded-lg overflow-hidden border border-white/10 bg-white">
            <iframe 
              src={`https://rezaa98.github.io/portfolio-reza-yusuf/${process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ? 'sit' : 'master'}/`} 
              className="w-full h-full border-0"
              title="Playwright HTML Report"
            />
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                <CheckCircle2 size={16} /> {passed} {t("passed")}
              </div>
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                <XCircle size={16} /> {failed} {t("failed")}
              </div>
              <div className="bg-gray-500/10 border border-gray-500/20 text-gray-400 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                <AlertCircle size={16} /> {skipped} {t("skipped")}
              </div>
            </div>

            <div className="space-y-2">
              {TEST_RESULTS.map((test) => (
                <div key={test.id} className="border border-white/5 rounded-lg overflow-hidden bg-black/20 hover:bg-black/40 transition-colors">
                  <button 
                    className="w-full px-4 py-3 flex items-center justify-between text-left cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      {test.status === "passed" && <CheckCircle2 className="text-green-400" size={18} />}
                      {test.status === "failed" && <XCircle className="text-red-400" size={18} />}
                      {test.status === "skipped" && <AlertCircle className="text-gray-400" size={18} />}
                      <span className={cn(
                        "font-medium text-sm md:text-base",
                        test.status === "failed" ? "text-red-200" : "text-gray-200"
                      )}>
                        {test.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500 font-mono">{test.time}</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
