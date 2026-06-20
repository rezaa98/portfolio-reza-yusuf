"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Server, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';

export default function GrafanaMonitoringPanel() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const grafanaUrl = process.env.NEXT_PUBLIC_GRAFANA_DASHBOARD_URL;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden shadow-2xl mt-12"
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <Activity className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Live System Telemetry</h3>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <Server className="w-3 h-3" /> Powered by OpenTelemetry & Grafana
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {grafanaUrl && (
            <a 
              href={grafanaUrl} 
              target="_blank" 
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              title="Open in Grafana"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          <button 
            onClick={handleRefresh}
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-emerald-400">Live</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[400px] bg-slate-950/50">
        {grafanaUrl ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-transparent to-black/20">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-[spin_3s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full border-2 border-emerald-400/40 animate-[spin_4s_linear_infinite_reverse]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Activity className="w-10 h-10 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <h4 className="text-2xl font-bold text-white mb-2 font-space-grotesk">Telemetry Connected</h4>
            <p className="text-slate-400 max-w-md mb-8">
              Sistem Anda sedang mengirimkan data secara real-time ke Grafana Cloud. Karena alasan keamanan Grafana (Anti-Clickjacking), dasbor hanya dapat dilihat secara langsung.
            </p>
            <a 
              href={grafanaUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl transition-all hover:scale-105 active:scale-95 font-medium"
            >
              Buka Dasbor Grafana <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 mb-4 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <AlertCircle className="w-8 h-8 text-orange-400" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Grafana Dashboard Not Connected</h4>
            <p className="text-slate-400 max-w-md mb-6">
              Telemetri OpenTelemetry sedang berjalan di latar belakang, namun tautan Public Dashboard belum ditambahkan.
            </p>
            <div className="bg-black/40 border border-white/10 p-4 rounded-xl text-left max-w-lg w-full">
              <p className="text-sm text-slate-300 font-mono mb-2">
                1. Buka Grafana Cloud Anda &gt; Dashboards<br/>
                2. Buat &quot;Public Dashboard&quot;<br/>
                3. Tambahkan URL-nya ke file .env.local:
              </p>
              <code className="text-xs text-emerald-400 bg-black/50 p-2 rounded block break-all">
                NEXT_PUBLIC_GRAFANA_DASHBOARD_URL=&quot;https://grafana.net/public-dashboards/...&quot;
              </code>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
