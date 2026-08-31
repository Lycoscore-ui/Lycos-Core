/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Server, Key } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      id="app-main-footer"
      className="relative z-10 border-t border-white/10 bg-[#050505] py-8 px-10 mt-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Side: Copyright */}
        <div className="space-y-2 text-center md:text-left">
          <span className="text-base font-black tracking-tighter italic text-white uppercase leading-none block">
            STRATEGIC<span className="text-white/40">.AI</span>
          </span>
          <p className="font-mono text-[9px] text-white/30 uppercase tracking-[0.15em] leading-relaxed">
            &copy; {new Date().getFullYear()} STRATEGIC AI CORP. All rights reserved. Registered proprietary mockups for sandbox demo environments.
          </p>
        </div>

        {/* Right Side: Status indicators matching design mockups */}
        <div className="flex flex-wrap justify-center gap-6 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
          <div className="flex items-center gap-1.5">
            <span>Status: <span className="text-emerald-400 font-bold">Operational</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Secure: <span className="text-white font-semibold">AES-256</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Node: <span className="text-white font-semibold font-mono">AMS-01</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
