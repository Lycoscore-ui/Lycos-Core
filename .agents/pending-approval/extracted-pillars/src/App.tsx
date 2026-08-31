/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActivePage } from './types';
import Header from './components/Header';
import NetworkBackground from './components/NetworkBackground';
import HeroSection from './components/HeroSection';
import PillarsSection from './components/PillarsSection';
import FeaturedInsight from './components/FeaturedInsight';
import TechServicesMockup from './components/TechServicesMockup';
import IncubationHubMockup from './components/IncubationHubMockup';
import AIProductsMockup from './components/AIProductsMockup';
import Footer from './components/Footer';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-brand-blue-deep font-sans text-white overflow-x-hidden selection:bg-brand-neon selection:text-black">
      {/* Dynamic Animated Constellation Background */}
      <NetworkBackground />

      {/* Navigation Header */}
      <Header activePage={activePage} setActivePage={setActivePage} />

      {/* Main Dynamic Workspace Screen */}
      <main id="app-main-content" className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {activePage === 'home' && (
              <div id="home-view-group" className="space-y-6">
                {/* Hero section resembling screenshot 4 */}
                <HeroSection setActivePage={setActivePage} />

                {/* Pillars section resembling screenshot 1 */}
                <PillarsSection setActivePage={setActivePage} />

                {/* Featured Insight blog section resembling screenshot 3 */}
                <FeaturedInsight />
              </div>
            )}

            {activePage === 'tech' && (
              <div id="tech-mockup-view" className="animate-[fadeIn_0.4s_ease-out]">
                <TechServicesMockup />
              </div>
            )}

            {activePage === 'incubation' && (
              <div id="incubation-mockup-view" className="animate-[fadeIn_0.4s_ease-out]">
                <IncubationHubMockup />
              </div>
            )}

            {activePage === 'products' && (
              <div id="products-mockup-view" className="animate-[fadeIn_0.4s_ease-out]">
                <AIProductsMockup />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* System Footer Layout */}
      <Footer />
    </div>
  );
}
