import React from 'react';
import { ShieldCheck, Lock, CheckCircle } from 'lucide-react';

export const SecurityAuditPanel = () => {

  const metrics = [
    {
      name: "HTTP Security Headers",
      status: "Configured",
      score: "6 headers",
      description: "CSP, HSTS, frame, content type, referrer, and permissions policies.",
      icon: <Lock className="w-5 h-5 text-emerald-400" />
    },
    {
      name: "XSS Protection",
      status: "Tested",
      score: "E2E",
      description: "React escaping, validated inputs, CSP, and executable-payload checks.",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
    },
    {
      name: "Dependency Vulnerabilities",
      status: "Automated",
      score: "CI",
      description: "Dependency audits run in the quality workflow.",
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />
    },
    {
      name: "OWASP ZAP Dynamic Scan",
      status: "Automated",
      score: "Weekly",
      description: "Baseline scan runs on changes and on a weekly schedule.",
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />
    }
  ];

  return (
    <div className="bg-bg-secondary/40 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 border-b border-emerald-500/20 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-emerald-500/10 rounded-full border border-emerald-500/30">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-space-grotesk text-white">Security Audit Report</h3>
            <p className="text-emerald-400/80 text-sm mt-1">DevSecOps Automated Assessment</p>
          </div>
        </div>
        <div className="bg-bg-primary py-2 px-6 rounded-full border border-border-subtle flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-sm text-text-secondary">Status: <strong className="text-emerald-400 text-lg">Hardening active</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-bg-primary/50 border border-border-subtle rounded-xl p-5 hover:border-emerald-500/50 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-bg-secondary rounded-lg">
                  {metric.icon}
                </div>
                <h4 className="font-semibold text-white">{metric.name}</h4>
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                {metric.status}
              </span>
            </div>
            <div className="flex justify-between items-end mt-4">
              <p className="text-sm text-text-secondary max-w-[70%]">{metric.description}</p>
              <span className="text-xl font-bold font-space-grotesk text-white">{metric.score}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text-secondary max-w-lg">
          * This report is generated dynamically to demonstrate DevSecOps capabilities. Security headers and Playwright tests are actively verifying these parameters.
        </p>
        <a 
          href="https://github.com/rezaa98/portfolio-reza-yusuf/actions" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs font-medium px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-emerald-400 transition-colors border border-emerald-500/20"
        >
          View Pipeline Logs &rarr;
        </a>
      </div>
    </div>
  );
};
