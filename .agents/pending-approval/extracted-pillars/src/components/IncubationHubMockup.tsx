/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Briefcase,
  LineChart,
  Award,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { VentureCompany, MetricCard } from '../types';

export default function IncubationHubMockup() {
  const [showVentureVerify, setShowVentureVerify] = useState<string | null>(null);

  const handleVerifyWorkload = (compName: string) => {
    setShowVentureVerify(compName);
    setTimeout(() => {
      setShowVentureVerify(null);
    }, 4000);
  };

  // 1. Performance Metrics (Screenshot 2 recreation)
  const performanceMetrics: MetricCard[] = [
    { label: 'Resolved Queries', value: '12,842', subtext: '+22.6% VS LAST 30 DAYS', trend: 'up' },
    { label: 'Resolution Rate', value: '92%', subtext: '92% BASELINE', trend: 'neutral' },
    { label: 'Avg. Handle Time', value: '02:18', subtext: '+1.3% VS LAST 30 DAYS', trend: 'up' },
  ];

  // 2. Interactive SVG Yield Curve states (Screenshot 2 AI Solution Trends recreation)
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(4); // Month 5 as default peak (0-indexed = 4)
  const monthsData = [
    { month: 'Month 1', score: 38, gain: '+4%', desc: 'Structural Sandbox Setup' },
    { month: 'Month 2', score: 42, gain: '+7%', desc: 'MVP Pipeline Deployment' },
    { month: 'Month 3', score: 35, gain: '+11%', desc: 'Beta Integration Cohort' },
    { month: 'Month 4', score: 62, gain: '+17%', desc: 'Traffic Stress Validation' },
    { month: 'Month 5', score: 85, gain: '+23%', desc: 'Dynamic Operational Scale' },
    { month: 'Month 6', score: 72, gain: '+20%', desc: 'Ecosystem Autopilot Mode' },
  ];

  // 3. Portfolio Companies
  const portfolioCompanies: VentureCompany[] = [
    {
      id: 'v-sentry',
      name: 'SentryFlow',
      tagline: 'Automated compliance audits & threat vector isolation.',
      description: 'Provides autonomous security checks for multi-cloud enterprise architectures, running sandboxed testing models 24/7.',
      cohort: 'Cohort 2026-A',
      sector: 'Fintech / Cybersecurity',
      logoColor: 'from-white/40 to-white/10',
      fundingStage: 'Pre-Seed',
      raised: '$1.2M',
      metrics: [
        { label: 'Uptime Integrity', value: '99.999%', trend: '+0.04%' },
        { label: 'Anomalies Audited', value: '1.2M/mo', trend: '+18.2%' },
      ],
    },
    {
      id: 'v-omni',
      name: 'OmniCore',
      tagline: 'Multi-agent financial compliance supervisor.',
      description: 'Coordinates five distinct agent models to ingest, review, and flag transactional records in real-time under extreme peak loads.',
      cohort: 'Cohort 2026-B',
      sector: 'Regtech / DeepTech',
      logoColor: 'from-white/60 to-white/20',
      fundingStage: 'Seed',
      raised: '$2.8M',
      metrics: [
        { label: 'Review Latency', value: '45ms', trend: '-12ms' },
        { label: 'Accuracy Rating', value: '99.97%', trend: '+0.02%' },
      ],
    },
    {
      id: 'v-quant',
      name: 'QuantVenture',
      tagline: 'Predictive yield curve modeling and rebalancer.',
      description: 'Uses advanced neural nets to map multi-asset liquidity structures and auto-rebalance portfolios based on micro-anomalies.',
      cohort: 'Cohort 2025-C',
      sector: 'Asset Management',
      logoColor: 'from-white to-white/30',
      fundingStage: 'Series A',
      raised: '$5.5M',
      metrics: [
        { label: 'Managed Assets', value: '$120M', trend: '+24.5%' },
        { label: 'Yield Premium', value: '4.2%', trend: '+0.8%' },
      ],
    },
  ];
  const [selectedVenture, setSelectedVenture] = useState<VentureCompany>(portfolioCompanies[0]);

  // 4. Interactive Dilution & Acceleration Calculator State
  const [fundingAmount, setFundingAmount] = useState(1500000);
  const [valuation, setValuation] = useState(8000000);

  const calculatedDilution = Math.round((fundingAmount / valuation) * 100);
  const remainingShare = 100 - calculatedDilution;

  return (
    <div id="incubation-hub-mockup-root" className="space-y-12 pb-16">
      {/* Intro Hero banner */}
      <div className="relative border-b border-white/10 bg-[#050505] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 max-w-3xl">
            <span className="font-mono text-xs font-bold text-white/50 uppercase tracking-[0.2em] block">
              // Pillar Mockup 02
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase italic tracking-tighter">
              Incubation Hub
            </h1>
            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
              Accelerating early-stage proprietary software and high-velocity tech ventures from structural concept to absolute product-market fit. Witness our active portfolio traction.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-white/5 border border-white/20">
            <span className="w-2 h-2 bg-white animate-pulse block" />
            <span className="font-mono text-[10px] font-bold text-white uppercase tracking-widest">
              VENTURE COHORTS ACTIVE
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* SECTION 1: Performance Metrics & AI Solution Trends (Screenshot 2 exact recreation) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Internal Hub Performance */}
          <div className="rounded-none border border-white/10 bg-white/[0.01] p-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tight">
                  <Briefcase className="w-5 h-5 text-white" />
                  Internal Hub Performance
                </h2>
                <p className="font-sans text-xs text-white/55">
                  Real-time operational indicators from active sandboxes.
                </p>
              </div>

              {/* Stats group matching screenshot */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {performanceMetrics.map((met, idx) => (
                  <div key={idx} className="p-5 rounded-none bg-black/40 border border-white/10 space-y-2">
                    <span className="block font-mono text-[8px] text-white/40 uppercase tracking-wider">{met.label}</span>
                    <span className="block font-mono text-xl font-bold text-white tracking-tight">{met.value}</span>
                    <span className="block font-mono text-[8px] text-emerald-400 font-bold tracking-widest uppercase">{met.subtext}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-white/40 font-mono text-[9px] uppercase tracking-wider">
              <span className="inline-block w-3.5 h-3.5 rounded-none border border-white/20 bg-white/5 text-center leading-[12px] font-bold text-[8px]">!</span>
              <span>Direct telemetry from active venture datasets.</span>
            </div>
          </div>

          {/* AI Solution Trends Yield Curve */}
          <div className="rounded-none border border-white/10 bg-white/[0.01] p-8 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tight">
                  <LineChart className="w-5 h-5 text-white" />
                  AI Solution Trends
                </h2>
                <p className="font-sans text-xs text-white/55">
                  Operations Score Improvement / Yield Curve
                </p>
              </div>
              {hoveredMonth !== null && (
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-white/5 border border-white/20 font-mono text-[9px] font-bold text-white uppercase tracking-wider">
                    EFFICIENT GAINS {monthsData[hoveredMonth].gain}
                  </span>
                </div>
              )}
            </div>

            {/* Glowing trend curve mimicking screenshot 2 */}
            <div className="h-40 w-full relative pt-4">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 150">
                <defs>
                  <linearGradient id="area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  d="M 50,100 C 150,90, 200,115, 250,105 C 320,95, 380,45, 450,40 C 500,35, 520,52, 550,55"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                <path
                  d="M 50,100 C 150,90, 200,115, 250,105 C 320,95, 380,45, 450,40 C 500,35, 520,52, 550,55 L 550,150 L 50,150 Z"
                  fill="url(#area-grad)"
                  className="opacity-50"
                />

                {/* Circles for nodes */}
                {monthsData.map((d, idx) => {
                  const xCoords = [50, 150, 250, 350, 450, 550];
                  const yCoords = [100, 95, 105, 70, 40, 55];
                  const isNodeHovered = hoveredMonth === idx;
                  return (
                    <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredMonth(idx)}>
                      <circle
                        cx={xCoords[idx]}
                        cy={yCoords[idx]}
                        r={isNodeHovered ? 5 : 3.5}
                        fill={isNodeHovered ? '#ffffff' : '#000000'}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        className="transition-all duration-300"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Month indicators */}
              <div className="flex justify-between px-6 pt-2 font-mono text-[8px] text-white/40 uppercase tracking-[0.15em]">
                {monthsData.map((d, idx) => (
                  <span
                    key={idx}
                    className={`transition-colors duration-300 ${hoveredMonth === idx ? 'text-white font-bold' : ''}`}
                  >
                    {d.month}
                  </span>
                ))}
              </div>
            </div>

            {hoveredMonth !== null && (
              <div className="p-4 rounded-none bg-black/40 border border-white/10 font-sans text-xs flex justify-between items-center">
                <span className="text-white/65">
                  Milestone Focus: <strong className="text-white font-mono uppercase text-[10px] tracking-wide">{monthsData[hoveredMonth].desc}</strong>
                </span>
                <span className="font-mono text-white font-bold text-[10px] tracking-widest">{monthsData[hoveredMonth].gain} GAIN</span>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: Venture acceleration stages bento grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter select-none">
            Venture Acceleration Lifecycle Blueprint
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Structural Concept',
                desc: 'Architecture audits, sandbox deployment setup, and legal structures definition.',
                status: 'Completed',
              },
              {
                step: '02',
                title: 'Fast Prototyping',
                desc: 'Continuous code integrations, MVP pipeline building, and alpha cohort testing.',
                status: 'Completed',
              },
              {
                step: '03',
                title: 'Market Validation',
                desc: 'Workload scale stress verification and private beta deployments in real corridors.',
                status: 'Active Track',
              },
              {
                step: '04',
                title: 'Ecosystem Scale',
                desc: 'Venture Series-A capital access and autonomous system routing integrations.',
                status: 'Next Stage',
              },
            ].map((stage, idx) => (
              <div
                key={idx}
                className="p-6 rounded-none border border-white/10 bg-white/[0.01] space-y-4 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold text-white/50 block tracking-wider">// STAGE {stage.step}</span>
                  <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wide">{stage.title}</h3>
                  <p className="font-sans text-[11px] text-white/60 leading-relaxed">{stage.desc}</p>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                  <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest">Stage Status</span>
                  <span
                    className={`font-mono text-[8px] font-bold uppercase tracking-widest ${
                      stage.status === 'Completed'
                        ? 'text-emerald-400'
                        : stage.status === 'Active Track'
                        ? 'text-white animate-pulse'
                        : 'text-white/30'
                    }`}
                  >
                    {stage.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: Active Portfolio Ventures */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ventures list / selector */}
          <div className="lg:col-span-1 space-y-4">
            <div className="rounded-none border border-white/10 bg-white/[0.01] p-8 space-y-4 shadow-2xl">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 uppercase tracking-tight">
                  <Sparkles className="w-4.5 h-4.5 text-white" />
                  Incubated Portfolio
                </h3>
                <p className="font-sans text-xs text-white/55">
                  Select a proprietary software venture to view active velocity telemetry.
                </p>
              </div>

              <div className="space-y-2">
                {portfolioCompanies.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedVenture(comp)}
                    className={`w-full text-left p-4 rounded-none border transition-all flex items-center justify-between cursor-pointer ${
                      selectedVenture.id === comp.id
                        ? 'bg-white/5 border-white/30'
                        : 'bg-black/30 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-none bg-gradient-to-tr ${comp.logoColor}`} />
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wide">{comp.name}</span>
                      </div>
                      <span className="block font-sans text-[10px] text-white/50 leading-snug">
                        {comp.tagline}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Venture deep details card */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-none border border-white/10 bg-white/[0.01] p-8 space-y-6 shadow-2xl h-full flex flex-col justify-between">
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-none bg-gradient-to-tr ${selectedVenture.logoColor} border border-white/10`} />
                    <div>
                      <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">{selectedVenture.name}</h3>
                      <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest">{selectedVenture.cohort}</span>
                    </div>
                  </div>
                  <p className="font-sans text-xs text-white/60">
                    {selectedVenture.tagline}
                  </p>
                </div>

                <div className="text-right">
                  <span className="block font-mono text-[8px] text-white/30 uppercase tracking-widest">Capital Stage</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-black border border-white/10 font-mono text-[10px] font-bold text-white tracking-widest uppercase">
                    {selectedVenture.fundingStage} • {selectedVenture.raised}
                  </span>
                </div>
              </div>

              {/* Main content body */}
              <div className="space-y-4 flex-1 pt-2">
                <div className="space-y-1.5">
                  <span className="block font-mono text-[8px] text-white/30 uppercase tracking-widest">Description</span>
                  <p className="font-sans text-xs text-white/70 leading-relaxed">
                    {selectedVenture.description}
                  </p>
                </div>

                {/* Venture Metrics list */}
                <div className="grid grid-cols-2 gap-4 p-5 rounded-none bg-black/40 border border-white/10">
                  {selectedVenture.metrics.map((m, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <span className="block font-sans text-[10px] text-white/50">{m.label}</span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-base font-bold text-white">{m.value}</span>
                        <span className="font-mono text-[9px] text-emerald-400 font-bold">{m.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                  {showVentureVerify === selectedVenture.name ? (
                    <span className="text-emerald-400 animate-pulse font-bold">✓ TEL-METRY PIPELINE SYNCED</span>
                  ) : (
                    <span>Tech: Vite / React / TS / Node</span>
                  )}
                </div>
                <button
                  onClick={() => handleVerifyWorkload(selectedVenture.name)}
                  className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-white uppercase tracking-widest hover:text-white/75 transition-colors cursor-pointer"
                >
                  Verify Workload
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: Interactive Founder diluton and target planner */}
        <div className="rounded-none border border-white/10 bg-white/[0.01] p-8 space-y-6 shadow-2xl">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tight">
              <Award className="w-5 h-5 text-white" />
              Founder Acceleration Capital Planner
            </h2>
            <p className="font-sans text-xs text-white/55">
              Model your capitalization dilution milestones when entering the Strategic Incubation Hub track.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Sliders */}
              <div className="space-y-3">
                <div className="flex justify-between font-mono text-[9px] text-white/50 uppercase tracking-wider">
                  <span>Target Funding Request</span>
                  <span className="text-white font-bold">${fundingAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="5000000"
                  step="50000"
                  value={fundingAmount}
                  onChange={(e) => setFundingAmount(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer h-1 rounded-none bg-white/10"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between font-mono text-[9px] text-white/50 uppercase tracking-wider">
                  <span>Target Venture Valuation (Pre-Money)</span>
                  <span className="text-white font-bold">${valuation.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000000"
                  max="20000000"
                  step="100000"
                  value={valuation}
                  onChange={(e) => setValuation(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer h-1 rounded-none bg-white/10"
                />
              </div>
            </div>

            <div className="p-5 rounded-none bg-black/40 border border-white/10 flex flex-col justify-between">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="block font-sans text-[10px] text-white/50">Dilution Stake</span>
                  <span className="block font-mono text-xl font-bold text-red-400">
                    ~{calculatedDilution}%
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="block font-sans text-[10px] text-white/50 font-sans">Founder Share</span>
                  <span className="block font-mono text-xl font-bold text-white">
                    {remainingShare}%
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 mt-4">
                <span className="block font-mono text-[8px] text-white/30 uppercase tracking-[0.2em] mb-1.5 font-bold">
                  ESTIMATED ACCELERATION BLUEPRINT
                </span>
                <p className="font-sans text-[11px] text-white/60 leading-relaxed">
                  Based on your parameters, the Incubation Hub will schedule an accelerated{' '}
                  <strong className="text-white font-mono uppercase text-[10px]">6-Month Blueprint</strong> to support development, aiming for a{' '}
                  <strong className="text-white font-mono uppercase text-[10px]">Series-A readiness status</strong> within{' '}
                  <strong className="text-white font-mono uppercase text-[10px]">Q1 2027</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
