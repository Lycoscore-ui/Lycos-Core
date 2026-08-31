/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cpu, Database, Activity, TrendingUp, ChevronRight } from 'lucide-react';
import { ActivePage } from '../types';

interface PillarsSectionProps {
  setActivePage: (page: ActivePage) => void;
}

export default function PillarsSection({ setActivePage }: PillarsSectionProps) {
  const pillars = [
    {
      id: 'enterprise',
      title: 'Enterprise Consulting',
      description: 'Strategic advisory for AI implementation and technology transformation, establishing high-velocity development pipelines.',
      linkText: 'Configure Consulting Track',
      disabled: true,
      features: ['Strategic AI Advisory', 'High-Velocity Pipelines', 'Tech Transformation'],
    },
    {
      id: 'tech',
      title: 'Tech Services',
      description: 'End-to-end engineering, robust API development, data pipeline construction, and seamless platform integrations designed for zero operational downtime.',
      linkText: 'View Stack',
      disabled: false,
      features: ['Robust API Fabric', 'Data Pipeline Const.', 'Platform Int.'],
    },
    {
      id: 'incubation',
      title: 'Incubator Hub',
      description: 'Accelerating early-stage proprietary software and high-velocity tech ventures from structural concept to absolute product-market fit.',
      linkText: 'Apply Now',
      disabled: false,
      features: ['High-Velocity Ventures', 'Seed Structuralist', 'PMF Strategy'],
    },
    {
      id: 'products',
      title: 'AI Products',
      description: 'Proprietary, production-grade AI software, secure agentic workflows, and predictive analytics suites engineered for complex institutional challenges.',
      linkText: 'Explore AI',
      disabled: false,
      features: ['Proprietary LLMs', 'Agentic Frameworks', 'Predictive Suites'],
    },
  ];

  return (
    <section id="pillars-section" className="max-w-7xl mx-auto px-6 py-12 space-y-12 z-10 relative">
      <h2 id="pillars-section-title" className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase italic select-none">
        Our <span className="text-white/40">Pillars for Growth</span>
      </h2>

      {/* Grid of 4 cards */}
      <div id="pillars-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar, index) => {
          const isInteractable = !pillar.disabled;
          const words = pillar.title.split(' ');
          const firstWord = words[0];
          const remainingWords = words.slice(1).join(' ');

          return (
            <div
              id={`pillar-card-${pillar.id}`}
              key={pillar.id}
              onClick={() => {
                if (isInteractable) {
                  setActivePage(pillar.id as ActivePage);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`group flex flex-col justify-between p-8 rounded-none border transition-all duration-300 ${
                isInteractable
                  ? 'border-white/10 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/30 cursor-pointer'
                  : 'border-white/5 bg-transparent opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex flex-col">
                {/* Large Background-style Number */}
                <span className="text-[100px] leading-[0.75] font-black opacity-10 mb-6 select-none font-sans block tracking-tighter">
                  0{index + 1}
                </span>

                {/* Bold split title */}
                <h3 className="text-2xl font-bold tracking-tight mb-4 uppercase leading-[1.1] text-white">
                  {firstWord}<br />
                  <span className="text-white/40">{remainingWords}</span>
                </h3>

                <p className="font-sans text-xs text-white/65 leading-relaxed mb-8">
                  {pillar.description}
                </p>

                {/* Bullets with horizontal line indicator */}
                <ul className="space-y-3 mb-8">
                  {pillar.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-[10px] tracking-wider uppercase font-bold text-white/90">
                      <span className={`w-3.5 h-[1px] ${fIdx === 2 ? 'bg-white/30' : 'bg-white'}`}></span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <button
                  className={`w-full py-4 text-[10px] uppercase font-bold tracking-[0.25em] transition-colors border rounded-none ${
                    isInteractable
                      ? pillar.id === 'products'
                        ? 'bg-white text-black border-transparent hover:bg-slate-200'
                        : 'border-white/20 text-white hover:bg-white hover:text-black'
                      : 'border-white/5 text-white/30 cursor-not-allowed bg-transparent'
                  }`}
                >
                  {pillar.linkText}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Operational Efficiency Trend sparkline */}
      <div
        id="efficiency-trend-panel"
        className="rounded-none border border-white/10 bg-white/[0.01] p-8 space-y-4 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between">
          <h4 className="font-mono text-xs font-bold text-white uppercase tracking-[0.2em]">
            Operational Efficiency Trend
          </h4>
          <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
            [ +40% Average Gain ]
          </span>
        </div>

        {/* SVG Sparkline chart resembling the curve in the first screenshot */}
        <div className="h-28 w-full relative">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
            <defs>
              <linearGradient id="trend-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Elegant high contrast white line */}
            <path
              d="M 0 85 C 150 78, 300 65, 450 62 C 600 58, 750 48, 1000 45"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 0 85 C 150 78, 300 65, 450 62 C 600 58, 750 48, 1000 45 L 1000 100 L 0 100 Z"
              fill="url(#trend-fill)"
            />
            {/* Glow circles at the end of the line */}
            <circle cx="1000" cy="45" r="4" fill="#ffffff" />
            <circle cx="1000" cy="45" r="8" fill="none" stroke="#ffffff" strokeWidth="1" className="animate-ping" />
          </svg>
          <div className="absolute left-4 bottom-1 font-mono text-[9px] text-white/40 uppercase tracking-widest">
            Core Deployment Inception
          </div>
          <div className="absolute right-4 bottom-1 font-mono text-[9px] text-white/40 uppercase tracking-widest">
            Q3 2026 Target Achieved
          </div>
        </div>
      </div>
    </section>
  );
}
