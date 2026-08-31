import React from 'react';
import { Cpu, ShieldCheck, Database, Network } from 'lucide-react';

const AegisNodeNetwork: React.FC = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto p-6 bg-[#050d1a]/80 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl overflow-hidden my-8">
      {/* Telemetry Overlay Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 px-5 mb-6 bg-[#0a192f]/90 border border-[#8CFF32]/20 rounded-xl text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-gray-300">Active Autonomous Workflows:</span>
          <span className="text-[#8CFF32] font-bold">14</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-300">Orchestration Latency:</span>
          <span className="text-emerald-400 font-bold">12ms</span>
        </div>
      </div>

      {/* Dynamic Multi-Agent SVG Node Graphic */}
      <div className="relative w-full h-[320px] flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 320" fill="none">
          {/* Connection Lines with Pulsing Dash Array */}
          <line x1="300" y1="160" x2="140" y2="70" stroke="#8CFF32" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" opacity="0.6" />
          <line x1="300" y1="160" x2="460" y2="70" stroke="#8CFF32" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" opacity="0.6" />
          <line x1="300" y1="160" x2="300" y2="260" stroke="#8CFF32" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" opacity="0.6" />

          {/* Background Ambient Glows */}
          <circle cx="300" cy="160" r="60" fill="#8CFF32" fillOpacity="0.08" />
          <circle cx="140" cy="70" r="35" fill="#8a9df8" fillOpacity="0.06" />
          <circle cx="460" cy="70" r="35" fill="#8a9df8" fillOpacity="0.06" />
          <circle cx="300" cy="260" r="35" fill="#8a9df8" fillOpacity="0.06" />
        </svg>

        {/* Center Node: LYCOS AEGIS */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10">
          <div className="w-24 h-24 rounded-full bg-[#0a192f] border-2 border-[#8CFF32] shadow-[0_0_30px_rgba(140,255,50,0.4)] flex items-center justify-center mb-2 animate-bounce-slow">
            <ShieldCheck className="w-10 h-10 text-[#8CFF32]" />
          </div>
          <span className="bg-[#0a192f] border border-[#8CFF32]/40 px-3 py-1 rounded-full text-xs font-bold text-white tracking-widest uppercase font-mono shadow-md">
            LYCOS AEGIS
          </span>
        </div>

        {/* Sub-Node 1: Data Ingestion */}
        <div className="absolute top-[30px] left-[70px] flex flex-col items-center z-10">
          <div className="w-14 h-14 rounded-full bg-[#0a192f] border border-emerald-400/50 shadow-[0_0_15px_rgba(138,157,248,0.3)] flex items-center justify-center mb-1">
            <Database className="w-6 h-6 text-emerald-400" />
          </div>
          <span className="text-[11px] font-semibold text-gray-300 font-mono">Data Ingestion</span>
        </div>

        {/* Sub-Node 2: Context Harmonization */}
        <div className="absolute top-[30px] right-[70px] flex flex-col items-center z-10">
          <div className="w-14 h-14 rounded-full bg-[#0a192f] border border-emerald-400/50 shadow-[0_0_15px_rgba(138,157,248,0.3)] flex items-center justify-center mb-1">
            <Cpu className="w-6 h-6 text-emerald-400" />
          </div>
          <span className="text-[11px] font-semibold text-gray-300 font-mono">Context Harmonization</span>
        </div>

        {/* Sub-Node 3: Compliance Filter */}
        <div className="absolute bottom-[20px] left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
          <div className="w-14 h-14 rounded-full bg-[#0a192f] border border-emerald-400/50 shadow-[0_0_15px_rgba(138,157,248,0.3)] flex items-center justify-center mb-1">
            <Network className="w-6 h-6 text-emerald-400" />
          </div>
          <span className="text-[11px] font-semibold text-gray-300 font-mono">Compliance Filter</span>
        </div>
      </div>
    </div>
  );
};

export default AegisNodeNetwork;
