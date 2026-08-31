/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActivePage } from '../types';
import { ShieldCheck, Mail, Send, X, Terminal, Cpu, Landmark, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

export default function Header({ activePage, setActivePage }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    org: '',
    type: 'AI Products',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', org: '', type: 'AI Products', message: '' });
    }, 2500);
  };

  return (
    <>
      <header
        id="app-main-header"
        className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#050505]/95 backdrop-blur-md px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo */}
          <div
            id="header-logo-group"
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setActivePage('home')}
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-none bg-white/5 border border-white/20">
              <div className="w-2 h-2 bg-white animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tighter italic text-white uppercase leading-none block">
                STRATEGIC<span className="text-white/40">.AI</span>
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-block w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[8px] tracking-[0.2em] text-white/50 uppercase leading-none">
                  Core Operations Live
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <nav id="header-navbar" className="flex flex-wrap items-center gap-1 md:gap-2">
            {[
              { id: 'home', label: 'Overview', icon: Terminal },
              { id: 'tech', label: 'Tech Services', icon: Database },
              { id: 'incubation', label: 'Incubation Hub', icon: Landmark },
              { id: 'products', label: 'AI Products', icon: Cpu },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activePage === tab.id;
              return (
                <button
                  id={`nav-tab-${tab.id}`}
                  key={tab.id}
                  onClick={() => setActivePage(tab.id as ActivePage)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-none text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-white/5 border border-white/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-70" />
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-white"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Button */}
          <div id="header-action-panel" className="flex items-center gap-4">
            <button
              id="btn-partner-with-us"
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2 rounded-none border border-white/20 text-white font-mono text-[10px] uppercase font-bold tracking-[0.25em] hover:bg-white hover:text-black transition-colors duration-300 bg-transparent"
            >
              Partner with us
            </button>
          </div>
        </div>
      </header>

      {/* Partner With Us Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              id="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-brand-blue-deep/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              id="partner-form-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-none border border-white/15 bg-[#0a0a0a] p-6 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                id="btn-close-modal"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-none border border-white/10 bg-white/5 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {formSubmitted ? (
                <div id="form-success-view" className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-none bg-white/5 border border-white/20 flex items-center justify-center text-white mb-6 animate-bounce">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-white mb-2">
                    Proposal Registered Successfully
                  </h3>
                  <p className="font-sans text-xs text-slate-400 max-w-sm leading-relaxed">
                    Our Senior AI Architects have been notified. A secure response pipeline will be initiated within 12 hours.
                  </p>
                  <div className="mt-6 font-mono text-[10px] text-white/50 tracking-[0.15em]">
                    TRANSMISSION ID: ST-AI-{Math.floor(Math.random() * 90000) + 10000}
                  </div>
                </div>
              ) : (
                <form id="partner-registration-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-white/80" />
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                      Initiate Strategic Advisory
                    </h3>
                  </div>
                  <p className="font-sans text-xs text-slate-400 leading-relaxed">
                    Connect directly with our incubation directors and engineering leads. Let's build what's next.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-none border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:border-white font-sans transition-all"
                        placeholder="Dr. Alexander Wright"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full rounded-none border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:border-white font-sans transition-all"
                          placeholder="wright@institution.org"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1">
                          Organization / Entity
                        </label>
                        <input
                          type="text"
                          required
                          name="org"
                          value={formData.org}
                          onChange={handleInputChange}
                          className="w-full rounded-none border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:border-white font-sans transition-all"
                          placeholder="Vanguard Capital"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1">
                        Engagement Track
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full rounded-none border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:border-white font-sans transition-all"
                      >
                        <option value="Tech Services">End-to-End Infrastructure (Tech Services)</option>
                        <option value="Incubation Venture">Venture Incubation (Incubation Hub)</option>
                        <option value="AI Products">Proprietary AI Systems (AI Products)</option>
                        <option value="Enterprise Consulting">Strategic Consulting</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1">
                        Brief Project Spec
                      </label>
                      <textarea
                        rows={3}
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full rounded-none border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:border-white font-sans transition-all resize-none"
                        placeholder="Outline your architectural specifications or venture objectives..."
                      />
                    </div>
                  </div>

                  <button
                    id="submit-partner-spec"
                    type="submit"
                    className="w-full py-3 rounded-none bg-white text-black font-mono font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-slate-200 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Secure Specs
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
