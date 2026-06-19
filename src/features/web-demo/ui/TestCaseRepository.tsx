"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, FileText, Activity, Database, Workflow, CheckSquare, Settings } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { useTranslations } from "next-intl";

type TestCase = {
  id: string;
  name: string;
  description: string;
  label: "Positive" | "Negative" | "Edge";
  status: "Passed" | "Failed";
  isAutomated: boolean;
  testData: string;
  steps: string[];
  expectedResult: string;
};

// ... TEST_CASES remains unchanged ...
const TEST_CASES: TestCase[] = [
  {
    id: "TC-001",
    name: "Verify Homepage Load and Welcome Text",
    description: "Ensure the homepage loads correctly and the main H1 welcome text is visible.",
    label: "Positive",
    status: "Passed",
    isAutomated: true,
    testData: "{ url: '/en', viewport: 'Desktop 1920x1080' }",
    steps: [
      "Navigate to the English homepage ('/en').",
      "Wait for the network state to be idle.",
      "Locate the H1 heading containing the user's name.",
      "Assert that the heading is visible on the screen."
    ],
    expectedResult: "The homepage renders successfully with the H1 heading clearly visible."
  },
  {
    id: "TC-002",
    name: "Verify Web Demo Navigation",
    description: "Verify that users can navigate from the homepage to the Web Demo page using the main navigation link.",
    label: "Positive",
    status: "Passed",
    isAutomated: true,
    testData: "{ start_url: '/en', target_url: '/en/web-demo' }",
    steps: [
      "Navigate to the English homepage ('/en').",
      "Locate the 'Web Demo' link in the navigation menu.",
      "Click the 'Web Demo' link.",
      "Wait for the URL to change to include '/web-demo'.",
      "Verify the H1 heading 'Automation & CI/CD Showcase' is visible."
    ],
    expectedResult: "User is successfully redirected to the Web Demo page and the correct heading is displayed."
  },
  {
    id: "TC-003",
    name: "Verify Localization Switcher",
    description: "Ensure that changing the language from English to Indonesian correctly updates the text content on the page.",
    label: "Positive",
    status: "Passed",
    isAutomated: true,
    testData: "{ start_url: '/en', target_locale: 'ID' }",
    steps: [
      "Navigate to the English homepage ('/en').",
      "Verify initial English text ('Available for new opportunities').",
      "Locate and click the localization dropdown/button.",
      "Select 'Indonesia (ID)' from the options.",
      "Wait for navigation and network state to be idle.",
      "Verify the URL contains '/id'.",
      "Assert that the text has updated to Indonesian ('Terbuka untuk peluang baru')."
    ],
    expectedResult: "The website successfully changes the locale and translates the target text to Indonesian."
  },
  {
    id: "TC-004",
    name: "Negative Test: Verify 404 on Invalid Route",
    description: "Ensure that navigating to a non-existent route correctly renders a 404 error page instead of crashing.",
    label: "Negative",
    status: "Passed",
    isAutomated: true,
    testData: "{ invalid_url: '/en/this-page-does-not-exist' }",
    steps: [
      "Attempt to navigate to the non-existent URL.",
      "Capture the HTTP response status code.",
      "Assert that the HTTP response status is exactly 404.",
      "Locate the H2 heading on the page.",
      "Assert the heading contains the text 'This page could not be found'."
    ],
    expectedResult: "The server returns a 404 HTTP status and the Next.js default 404 page is rendered to the user."
  },
  {
    id: "TC-005",
    name: "Edge Test: Verify Mobile Navigation Menu",
    description: "Verify that the responsive mobile hamburger menu appears and functions correctly on small screens.",
    label: "Edge",
    status: "Passed",
    isAutomated: true,
    testData: "{ viewport: { width: 375, height: 812 } } // iPhone X",
    steps: [
      "Set the browser viewport size to mobile dimensions (375x812).",
      "Navigate to the homepage.",
      "Locate the hamburger menu button (visible only on mobile).",
      "Assert that the hamburger menu button is visible.",
      "Click the menu button to expand the navigation.",
      "Verify that the 'About' link becomes visible in the expanded menu."
    ],
    expectedResult: "The mobile menu button is present on small screens, and clicking it successfully reveals the hidden navigation links."
  }
];

export function TestCaseRepository() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const t = useTranslations("WebDemo.TestCaseRepository");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getLabelColor = (label: string) => {
    switch (label) {
      case "Positive": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Negative": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "Edge": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f172a] font-sans">
      {/* Header */}
      <div className="bg-black/40 px-6 py-4 border-b border-white/10 flex items-center gap-3">
        <FileText className="text-accent-blue" size={20} />
        <h3 className="font-bold text-white text-lg font-space-grotesk">{t("header")}</h3>
      </div>

      {/* Table List */}
      <div className="flex flex-col">
        {TEST_CASES.map((tc) => (
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
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2 flex items-center gap-2">
                          <Workflow size={14} /> {t("testSteps")}
                        </h4>
                        <ol className="list-decimal list-inside space-y-1.5">
                          {tc.steps.map((step, idx) => (
                            <li key={idx} className="text-sm text-gray-300">
                              <span className="pl-1">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="bg-accent-blue/10 border border-accent-blue/20 rounded-lg p-4 mt-4">
                        <h4 className="text-xs uppercase tracking-wider text-accent-blue font-bold mb-2 flex items-center gap-2">
                          <CheckSquare size={14} /> {t("expectedResult")}
                        </h4>
                        <p className="text-sm text-gray-200">{tc.expectedResult}</p>
                      </div>
                    </div>
                    
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
