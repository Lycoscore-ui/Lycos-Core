/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, BookOpen, Clock, Calendar, Check } from 'lucide-react';
import { useState } from 'react';

export default function FeaturedInsight() {
  const [isHovered, setIsHovered] = useState(false);
  const [showSpecOpened, setShowSpecOpened] = useState(false);

  const handleReadBlueprint = () => {
    setShowSpecOpened(true);
    setTimeout(() => {
      setShowSpecOpened(false);
    }, 4000);
  };

  return (
    <section id="insight-section" className="max-w-7xl mx-auto px-6 py-12 z-10 relative">
      <div
        id="insight-card-wrapper"
        className="rounded-none border border-white/10 bg-white/[0.01] p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 hover:border-white/20 transition-all duration-300 shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating 3D SVG isometric grid cubes - Recreating screenshot 3 visual */}
        <div className="flex-1 min-h-[240px] md:min-h-[300px] rounded-none bg-black/40 border border-white/10 overflow-hidden relative flex items-center justify-center p-6">
          {/* Subtle background grids */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-white/[0.01] blur-xl rounded-full" />

          {/* Isometric SVG Drawing of Interconnected Nodes */}
          <svg
            viewBox="0 0 400 300"
            className="w-full h-full max-w-sm relative z-10"
            style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.05))' }}
          >
            {/* Connection lines */}
            <g stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" strokeDasharray={isHovered ? '2, 2' : 'none'} className="transition-all duration-300">
              <line x1="200" y1="150" x2="120" y2="100" />
              <line x1="200" y1="150" x2="280" y2="100" />
              <line x1="200" y1="150" x2="200" y2="230" />

              <line x1="120" y1="100" x2="120" y2="50" />
              <line x1="280" y1="100" x2="280" y2="50" />

              <line x1="120" y1="100" x2="50" y2="140" />
              <line x1="280" y1="100" x2="350" y2="140" />
            </g>

            {/* Glowing particle pulses traveling on paths */}
            <circle cx="160" cy="125" r="2.5" fill="#ffffff" className="animate-[ping_3s_infinite]" />
            <circle cx="240" cy="125" r="2.5" fill="#888888" className="animate-[ping_3s_infinite_1.5s]" />

            {/* Isometric Cubes */}
            {/* Top-Left Cube (120, 100) */}
            <g transform="translate(120, 100)" className="transition-transform duration-700" style={{ transform: isHovered ? 'translateY(-5px)' : 'none' }}>
              <polygon points="0,-18 16,-9 0,0 -16,-9" fill="#111111" stroke="#ffffff" strokeWidth="0.8" />
              <polygon points="-16,-9 0,0 0,18 -16,9" fill="#080808" stroke="#ffffff" strokeWidth="0.8" />
              <polygon points="0,0 16,-9 16,9 0,18" fill="#050505" stroke="#ffffff" strokeWidth="0.8" />
            </g>

            {/* Center Master Cube (200, 150) */}
            <g transform="translate(200, 150)" className="transition-transform duration-500">
              {/* Outer transparent glow bounding box */}
              <polygon points="0,-30 26,-15 0,0 -26,-15" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" strokeDasharray="3, 3" />
              <polygon points="-26,-15 0,0 0,30 -26,15" fill="rgba(255, 255, 255, 0.01)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" strokeDasharray="3, 3" />
              <polygon points="0,0 26,-15 26,15 0,30" fill="rgba(255, 255, 255, 0.01)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" strokeDasharray="3, 3" />

              {/* Inner core solid cube */}
              <polygon points="0,-12 11,-6 0,0 -11,-6" fill="#ffffff" opacity="0.9" />
              <polygon points="-11,-6 0,0 0,12 -11,6" fill="#cccccc" opacity="0.9" />
              <polygon points="0,0 11,-6 11,12 0,12" fill="#aaaaaa" opacity="0.95" />
            </g>

            {/* Top-Right Cube (280, 100) */}
            <g transform="translate(280, 100)" className="transition-transform duration-700" style={{ transform: isHovered ? 'translateY(-5px)' : 'none' }}>
              <polygon points="0,-18 16,-9 0,0 -16,-9" fill="#111111" stroke="#ffffff" strokeWidth="0.8" />
              <polygon points="-16,-9 0,0 0,18 -16,9" fill="#080808" stroke="#ffffff" strokeWidth="0.8" />
              <polygon points="0,0 16,-9 16,9 0,18" fill="#050505" stroke="#ffffff" strokeWidth="0.8" />
            </g>

            {/* Bottom-Center Cube (200, 230) */}
            <g transform="translate(200, 230)" className="transition-transform duration-1000" style={{ transform: isHovered ? 'translateY(5px)' : 'none' }}>
              <polygon points="0,-18 16,-9 0,0 -16,-9" fill="#111111" stroke="#ffffff" strokeWidth="0.8" />
              <polygon points="-16,-9 0,0 0,18 -16,9" fill="#080808" stroke="#ffffff" strokeWidth="0.8" />
              <polygon points="0,0 16,-9 16,9 0,18" fill="#050505" stroke="#ffffff" strokeWidth="0.8" />
            </g>

            {/* Left Edge Node (50, 140) */}
            <circle cx="50" cy="140" r="4" fill="#000000" stroke="#ffffff" strokeWidth="1" />
            <circle cx="50" cy="140" r="1" fill="#ffffff" />

            {/* Right Edge Node (350, 140) */}
            <circle cx="350" cy="140" r="4" fill="#000000" stroke="#ffffff" strokeWidth="1" />
            <circle cx="350" cy="140" r="1" fill="#ffffff" />
          </svg>

          {/* Interactive Floating Badge (Featured Insight label) */}
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-white/5 border border-white/20 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-white animate-pulse" />
            <span className="font-mono text-[9px] font-bold text-white uppercase tracking-[0.2em]">
              FEATURED INSIGHT
            </span>
          </div>
        </div>

        {/* Informational Column */}
        <div className="flex-1 flex flex-col justify-between py-2 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-white/50 font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className="text-white font-bold">// Agentic Frameworks</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-white/50" /> 6 min read
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-white/50" /> 2026-06-15
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tighter uppercase leading-tight hover:text-white/80 transition-colors cursor-pointer italic">
              Unlocking Agentic Velocity: Architecting Resilient Decision Engines
            </h3>

            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
              Discover how multi-agent frameworks are transitioning from toy demonstrations to server-authoritative enterprise decision pipelines, securing extreme speed, strict sandbox safety, and full compliance under peak transactional loads.
            </p>
          </div>

          <div className="space-y-6 pt-6 border-t border-white/10">
            {/* Author Profile */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Custom High Quality Abstract Vector Avatar for Dr. Vance */}
                <div className="relative w-11 h-11 rounded-none border border-white/20 overflow-hidden bg-black flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                  <span className="font-mono font-bold text-xs text-white">HV</span>
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    Dr. Helen Vance
                  </h4>
                  <p className="font-sans text-[10px] text-white/50">
                    Principal AI Systems Architect
                  </p>
                </div>
              </div>

              {showSpecOpened && (
                <div className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest animate-pulse">
                  ✓ SECURE PIPELINE INITIATED
                </div>
              )}
            </div>

            {/* Read Button */}
            <div>
              <button
                id="btn-read-full-blueprint"
                onClick={handleReadBlueprint}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-none bg-white text-black font-mono text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-slate-200 transition-all cursor-pointer"
              >
                Read Full Blueprint
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
