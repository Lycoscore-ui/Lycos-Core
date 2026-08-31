/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Play, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { ActivePage } from '../types';

interface HeroSectionProps {
  setActivePage: (page: ActivePage) => void;
  openPartnerModal?: () => void;
}

export default function HeroSection({ setActivePage }: HeroSectionProps) {
  return (
    <section
      id="hero-section"
      className="relative max-w-7xl mx-auto px-6 py-12 md:py-24 flex flex-col lg:flex-row lg:items-center justify-between gap-12 overflow-hidden z-10"
    >
      {/* Text column */}
      <div className="flex-1 max-w-2xl space-y-8">
        <div className="inline-flex items-center gap-2">
          <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase">
            // AI THAT POWERS BETTER FINANCIAL DECISIONS
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.0] text-white tracking-tighter uppercase italic">
          Strategic<br />
          <span className="text-white/40">Intelligence.</span>
          <br />
          Accelerated<br />
          <span className="text-white/40">Core Building.</span>
        </h1>

        <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed max-w-lg">
          Re-engineered for a secure, headless architecture. Strategic AI velocity powered by modern APIs and lightweight scroll experiences.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <button
            id="hero-btn-explore"
            onClick={() => {
              const element = document.getElementById('pillars-section-title');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group px-6 py-4 rounded-none bg-white text-black font-mono font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 hover:bg-slate-200 active:scale-[0.98] transition-all cursor-pointer"
          >
            Explore Services
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            id="hero-btn-partner"
            onClick={() => {
              const btn = document.getElementById('btn-partner-with-us');
              if (btn) btn.click();
            }}
            className="px-6 py-4 rounded-none border border-white/20 hover:border-white text-white font-mono font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all cursor-pointer"
          >
            Partner with us
          </button>
        </div>

        {/* Floating audit badge */}
        <div className="flex items-center gap-3 pt-6 border-t border-white/10 max-w-md">
          <div className="flex items-center justify-center w-8 h-8 rounded-none bg-white/5 text-white border border-white/20">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 leading-relaxed">
            Audit status: <span className="text-emerald-400 font-bold">100% SECURE SYSTEM</span> — verified by external pen-testing agencies (July 2026).
          </span>
        </div>
      </div>

      {/* Interactive graphic column */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="relative w-72 h-72 sm:w-96 sm:h-96">
          {/* Back glows */}
          <div className="absolute inset-0 bg-white/[0.02] blur-[80px] rounded-full animate-pulse-glow" />
          <div className="absolute inset-0 bg-white/[0.01] blur-[100px] rounded-full" />

          {/* Glowing particle ring container */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Spinning ring 1 */}
            <div className="absolute w-60 h-60 sm:w-80 sm:h-80 rounded-full border border-white/15 border-dashed animate-[spin_40s_linear_infinite]" />
            {/* Spinning ring 2 */}
            <div className="absolute w-52 h-52 sm:w-72 sm:h-72 rounded-full border border-white/5 animate-[spin_25s_linear_infinite_reverse]" />

            {/* Glowing particle ring SVG */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full animate-[spin_60s_linear_infinite]"
              style={{ filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.15))' }}
            >
              {/* Silver/white core particles */}
              <defs>
                <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#444444" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="url(#ring-grad)"
                strokeWidth="1.5"
                strokeDasharray="2, 6, 1, 10, 3, 5, 1, 15"
                className="opacity-90"
              />
              <circle
                cx="100"
                cy="100"
                r="62"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.8"
                strokeDasharray="4, 12, 1, 4"
                className="opacity-60"
              />
              <circle
                cx="100"
                cy="100"
                r="78"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.5"
                strokeDasharray="8, 20"
                className="opacity-20 animate-[spin_120s_linear_infinite_reverse]"
              />

              {/* Individual nodes on the ring */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * Math.PI * 2) / 12;
                const r = 70;
                const x = 100 + r * Math.cos(angle);
                const y = 100 + r * Math.sin(angle);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={i % 3 === 0 ? '2' : '1'}
                    fill="#ffffff"
                    className={i % 2 === 0 ? 'opacity-80 animate-pulse' : 'opacity-40'}
                  />
                );
              })}
            </svg>
          </div>

          {/* Center core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-none bg-black border border-white/20 flex items-center justify-center shadow-2xl group cursor-pointer hover:bg-white hover:border-transparent transition-all">
              <Play className="w-5 h-5 text-white group-hover:text-black fill-current ml-1 transition-transform group-hover:scale-110" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
