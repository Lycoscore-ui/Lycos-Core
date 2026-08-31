/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ChevronRight, 
  Cpu, 
  Layers, 
  Activity, 
  TrendingUp, 
  CheckCircle, 
  Calculator, 
  Info, 
  Sparkles, 
  Database, 
  RefreshCw, 
  Sliders, 
  Eye, 
  BookOpen, 
  Send, 
  Radio,
  FileText
} from 'lucide-react';

import { Insight, CuratedArticle, CaseStudy } from './types/cms';
import { mockInsights, mockArticles, mockCaseStudies } from './data/mockCmsData';

// Modular CMS Sections
import InsightsSection from './components/InsightsSection';
import ArticlesSection from './components/ArticlesSection';
import CaseStudiesSection from './components/CaseStudiesSection';

// ROI Calculator Data
const COUNTRY_DATA = [
  { continent: 'Africa', name: 'Ghana', salary: 215, cost: 350, increase: 11 },
  { continent: 'Africa', name: 'Mozambique', salary: 400, cost: 450, increase: 7 },
  { continent: 'Africa', name: 'South Africa', salary: 615, cost: 250, increase: 6 },
  { continent: 'Oceania', name: 'New Zealand', salary: 3145, cost: 550, increase: 5 },
  { continent: 'Oceania', name: 'Australia', salary: 3540, cost: 680, increase: 4 }
];

export default function App() {
  // Navigation
  const [currentTab, setCurrentTab] = useState<'platform' | 'insights' | 'articles' | 'case-studies'>('platform');
  
  // Interactive CMS Simulator States
  const [cmsSource, setCmsSource] = useState<'cached' | 'live'>('cached');
  const [isSyncing, setIsSyncing] = useState(false);
  const [showJsonInspector, setShowJsonInspector] = useState(false);
  const [syncStatusText, setSyncStatusText] = useState('CMS Status: Connected (Local Cache)');
  const [lastSyncedTime, setLastSyncedTime] = useState('Just now');
  
  // Dynamic Datasets (can be mutated by adding synthetic records via our simulator)
  const [insights, setInsights] = useState<Insight[]>(mockInsights);
  const [articles, setArticles] = useState<CuratedArticle[]>(mockArticles);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(mockCaseStudies);

  // ROI Calculator state
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [monthlyVolume, setMonthlyVolume] = useState(1000);
  const [calcResults, setCalcResults] = useState<any>(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Simulator functions
  const handleSyncCms = () => {
    setIsSyncing(true);
    setSyncStatusText('Querying API endpoints...');
    setTimeout(() => {
      setIsSyncing(false);
      const now = new Date();
      setLastSyncedTime(now.toLocaleTimeString());
      setSyncStatusText(cmsSource === 'live' ? 'CMS Status: Connected (Live REST API)' : 'CMS Status: Connected (Local Cache)');
    }, 1200);
  };

  // Switch Source Simulation
  const handleToggleSource = () => {
    const newSource = cmsSource === 'cached' ? 'live' : 'cached';
    setCmsSource(newSource);
    setIsSyncing(true);
    setSyncStatusText(newSource === 'live' ? 'Connecting live Payload REST server...' : 'Re-establishing offline snapshot...');
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatusText(newSource === 'live' ? 'CMS Status: Connected (Live REST API)' : 'CMS Status: Connected (Local Cache)');
    }, 1000);
  };

  // Add Synthetic CMS Record (demonstrating template-schema link)
  const handleAddSyntheticRecord = () => {
    if (currentTab === 'insights') {
      const newInsight: Insight = {
        id: `synthetic-${Date.now()}`,
        title: 'Quantum Advantage in Portfolio Optimization Matrices',
        slug: 'quantum-advantage-portfolio-optimization',
        summary: 'How quadratic unconstrained binary optimization (QUBO) runs on simulated hardware to resolve multi-factor portfolios in real-time.',
        content: '<p>Our research lab has mapped high-dimensional portfolio allocation pipelines onto synthetic annealing matrices, reducing calculation complexity exponentially from exponential curves to sub-linear thresholds.</p>',
        author: {
          name: 'Sarah Jenkins',
          role: 'Head of Quantum Algorithms',
          bio: 'Sarah leads Lycoscore\'s exploratory computing divisions, mapping algorithmic optimization models.',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop'
        },
        category: 'Strategic Advisory',
        readTime: 4,
        publishedDate: new Date().toISOString().split('T')[0],
        featuredImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop',
        status: 'Published',
        tags: ['Quantum', 'QUBO', 'Finance', 'Portfolio']
      };
      setInsights([newInsight, ...insights]);
    } else if (currentTab === 'articles') {
      const newArticle: CuratedArticle = {
        id: `synthetic-${Date.now()}`,
        title: 'OpenAI Releases Frontier Reasoning Framework specifications',
        url: 'https://techcrunch.com/synthetic-openai-release',
        sourceName: 'TechCrunch',
        publishedDate: new Date().toISOString().split('T')[0],
        category: 'Tech Trends',
        importance: 'Critical',
        customSummary: 'A major framework release introducing multi-step systemic search loops directly inside base model inference tokens, enabling real-time validation of factual claims.',
        commentary: '<p>This is a major milestone. Factual self-correction reduces hallucinations down to near-zero margins, opening the door for autonomous auditing of legal and compliance documentation without human pre-screening.</p>',
        curator: 'Lycos Intelligence Team',
        tags: ['Reasoning Models', 'Frontier AI', 'Accuracy', 'Fact Verification']
      };
      setArticles([newArticle, ...articles]);
    } else if (currentTab === 'case-studies') {
      const newCase: CaseStudy = {
        id: `synthetic-${Date.now()}`,
        clientName: 'Sovereign Bancorp',
        title: 'Automated Loan Credit Risk Auditing and Generative Compliance Review',
        slug: 'automated-loan-credit-risk-compliance',
        industry: 'Banking & Financial Services',
        featured: true,
        projectDuration: '3 Months (Q2 2026)',
        heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop',
        metrics: [
          { value: '14x', label: 'Processing Velocity Gained', isHighlight: true },
          { value: '99.8%', label: 'Compliance Audit Accuracy', isHighlight: true },
          { value: 'R1.9M', label: 'Quarterly Operating Optimization', isHighlight: false }
        ],
        problem: 'Sovereign Bancorp was manually auditing thousands of residential mortgage files for compliance with federal rules, a bottleneck taking 12 days per file with frequent operational errors.',
        solution: '<p>We deployed a multi-agent validation pipeline that ingest note logs, credit briefs, and asset disclosures, running automatic rule-checks against regulatory parameters.</p>',
        results: '<p>The pipeline reduced loan verification times from 12 days to just 4 minutes, allowing underwriting teams to process record volumes with zero policy discrepancies.</p>',
        techStack: ['Node.js', 'FastAPI', 'Gemini Flash 1.5', 'pgvector', 'Redis'],
      };
      setCaseStudies([newCase, ...caseStudies]);
    }
  };

  // ROI math
  const handleCalculate = () => {
    const country = COUNTRY_DATA.find(c => c.name === selectedCountry);
    if (!country) return;

    const baseOperationCost = country.salary * 12;
    const totalVolumeCost = monthlyVolume * 0.15; // $0.15 per manual call
    const currentCost = baseOperationCost + (totalVolumeCost * 12);
    
    // AI Operation Cost
    const aiSetupCost = 5000;
    const aiRunningCost = monthlyVolume * 0.03 * 12; // $0.03 per AI query
    const year1Cost = aiSetupCost + aiRunningCost;
    const year2Cost = aiRunningCost * 1.05;
    const year3Cost = aiRunningCost * 1.10;

    const year1Savings = currentCost - year1Cost;
    const year2Savings = (currentCost * 1.04) - year2Cost;
    const year3Savings = (currentCost * 1.08) - year3Cost;

    setCalcResults({
      currentCost: Math.round(currentCost),
      year1Savings: Math.round(year1Savings),
      year2Savings: Math.round(year2Savings),
      year3Savings: Math.round(year3Savings),
    });
  };

  // Reset calculator
  const handleResetCalc = () => {
    setSelectedContinent('');
    setSelectedCountry('');
    setMonthlyVolume(1000);
    setCalcResults(null);
  };

  // Submit contact form
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactMsg('');
    }, 4000);
  };

  // Generate current JSON for the schema inspector
  const activeSchemaJson = useMemo(() => {
    if (currentTab === 'insights') {
      return {
        collection: 'insights',
        totalRecords: insights.length,
        structure: {
          title: 'string (required)',
          slug: 'string (required, unique)',
          summary: 'string (required)',
          content: 'richText/HTML (required)',
          category: 'select [AI Governance | Agentic Frameworks | Neural Architectures | Strategic Advisory]',
          readTime: 'number',
          publishedDate: 'date',
          author: { name: 'string', role: 'string', bio: 'string', avatar: 'mediaRelation' }
        },
        payloadExample: insights[0] || null
      };
    }
    if (currentTab === 'articles') {
      return {
        collection: 'articles',
        totalRecords: articles.length,
        structure: {
          title: 'string (required)',
          url: 'string (required, original link)',
          sourceName: 'string (required)',
          publishedDate: 'date',
          category: 'select [AI Policy | Tech Trends | Research Breakthroughs | Core Infrastructure]',
          importance: 'select [Low | Medium | High | Critical]',
          customSummary: 'string',
          commentary: 'richText (required)',
          curator: 'string'
        },
        payloadExample: articles[0] || null
      };
    }
    if (currentTab === 'case-studies') {
      return {
        collection: 'case-studies',
        totalRecords: caseStudies.length,
        structure: {
          clientName: 'string (required)',
          title: 'string (required)',
          slug: 'string (required, unique)',
          industry: 'string (required)',
          metrics: 'array of { value: string, label: string, isHighlight: boolean }',
          problem: 'textarea (required)',
          solution: 'richText (required)',
          results: 'richText (required)',
          techStack: 'array of string'
        },
        payloadExample: caseStudies[0] || null
      };
    }
    return {
      note: 'Switch to a CMS tab (Insights, Articles, or Case Studies) to inspect its API schema structure.'
    };
  }, [currentTab, insights, articles, caseStudies]);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }} className="pb-24">
      {/* Visual Background layers */}
      <div className="parallax-grid" />
      <div className="particles-bg" />

      {/* Floating Global Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(5, 13, 26, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        padding: '1.25rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {/* Logo logotype */}
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentTab('platform'); }} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              backgroundColor: 'var(--accent)',
              color: '#050d1a',
              padding: '0.4rem 0.6rem',
              borderRadius: '6px',
              fontWeight: 800,
              fontSize: '1rem',
              fontFamily: 'var(--font-title)',
              letterSpacing: '1px'
            }}>
              LYCOS
            </div>
            <span style={{
              color: 'white',
              fontFamily: 'var(--font-title)',
              fontWeight: 600,
              letterSpacing: '2px',
              fontSize: '1rem'
            }}>
              CORE
            </span>
          </a>

          {/* Navigation Menu Links */}
          <nav>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '1.5rem', margin: 0, padding: 0 }}>
              <li>
                <button
                  onClick={() => setCurrentTab('platform')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: currentTab === 'platform' ? 'var(--accent)' : 'var(--text-gray)',
                    fontWeight: currentTab === 'platform' ? 600 : 400,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'color 0.3s'
                  }}
                >
                  Core Platform
                </button>
              </li>
              <li style={{ color: 'var(--border-color)' }}>|</li>
              <li>
                <button
                  onClick={() => setCurrentTab('insights')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: currentTab === 'insights' ? 'var(--accent)' : 'var(--text-gray)',
                    fontWeight: currentTab === 'insights' ? 600 : 400,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'color 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <FileText size={14} /> Insights (Owned)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('articles')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: currentTab === 'articles' ? 'var(--accent)' : 'var(--text-gray)',
                    fontWeight: currentTab === 'articles' ? 600 : 400,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'color 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Radio size={14} /> Articles (Curated)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('case-studies')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: currentTab === 'case-studies' ? 'var(--accent)' : 'var(--text-gray)',
                    fontWeight: currentTab === 'case-studies' ? 600 : 400,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'color 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Layers size={14} /> Case Studies
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Sync Status / REST Controller Quick Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-color)',
            padding: '0.4rem 0.85rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            color: 'var(--text-gray)'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              backgroundColor: 'var(--accent)',
              borderRadius: '50%',
              display: 'inline-block',
              boxShadow: '0 0 6px var(--accent)',
              animation: isSyncing ? 'pulse 1s infinite alternate' : 'none'
            }} />
            <span>{isSyncing ? 'Querying REST...' : syncStatusText}</span>
          </div>

          <button
            onClick={() => setCurrentTab('platform')}
            className="btn-solid"
            style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', borderRadius: '6px' }}
          >
            Contact Strategy Lead
          </button>
        </div>
      </header>

      {/* Interactive CMS Sandbox Controller Bar (Architectural Honesty) */}
      <div style={{
        backgroundColor: 'rgba(163, 255, 51, 0.02)',
        borderBottom: '1px solid rgba(163, 255, 51, 0.15)',
        padding: '0.75rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.8rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-gray)' }}>
          <span style={{ color: 'var(--accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Sliders size={14} /> CMS SANDBOX CONTROLLER:
          </span>
          <span>Active collection: <strong style={{ color: 'white' }}>{currentTab === 'platform' ? 'NONE (Landing Page)' : currentTab}</strong></span>
          {currentTab !== 'platform' && (
            <>
              <span>|</span>
              <span>Last Sync: <strong style={{ color: 'white' }}>{lastSyncedTime}</strong></span>
            </>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {currentTab !== 'platform' && (
            <>
              {/* Add Synthetic Record */}
              <button
                onClick={handleAddSyntheticRecord}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-color)',
                  color: 'white',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'}
              >
                <Sparkles size={12} style={{ color: 'var(--accent)' }} /> Add Synthetic Record
              </button>

              {/* View Schema JSON */}
              <button
                onClick={() => setShowJsonInspector(!showJsonInspector)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-color)',
                  color: 'white',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'}
              >
                <Eye size={12} style={{ color: 'var(--accent)' }} /> {showJsonInspector ? 'Hide Schema JSON' : 'Inspect API Schema'}
              </button>
            </>
          )}

          {/* Toggle connection source */}
          <button
            onClick={handleToggleSource}
            style={{
              backgroundColor: cmsSource === 'live' ? 'rgba(163, 255, 51, 0.1)' : 'rgba(255, 255, 255, 0.02)',
              border: cmsSource === 'live' ? '1px solid var(--accent)' : '1px solid var(--border-color)',
              color: cmsSource === 'live' ? 'var(--accent)' : 'white',
              padding: '0.35rem 0.75rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <Database size={12} /> Source: {cmsSource === 'live' ? 'Payload Live REST' : 'Offline Snapshot'}
          </button>

          {/* Sync CMS Database */}
          <button
            onClick={handleSyncCms}
            disabled={isSyncing}
            style={{
              backgroundColor: 'rgba(163, 255, 51, 0.1)',
              border: '1px solid rgba(163, 255, 51, 0.25)',
              color: 'var(--accent)',
              padding: '0.35rem 0.75rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              opacity: isSyncing ? 0.6 : 1
            }}
          >
            <RefreshCw size={12} className={isSyncing ? 'animate-spin' : ''} /> {isSyncing ? 'Syncing...' : 'Sync Database'}
          </button>
        </div>
      </div>

      {/* Raw Schema & JSON Inspector Panel */}
      {showJsonInspector && currentTab !== 'platform' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            backgroundColor: 'rgba(5, 13, 26, 0.95)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1.5rem 2rem',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h5 style={{ color: 'var(--accent)', fontSize: '0.85rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Database size={14} /> Payload CMS Collection Config Structure (Schema Fields)
              </h5>
              <pre style={{
                backgroundColor: 'rgba(0,0,0,0.3)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.75rem',
                color: 'var(--text-gray)',
                maxHeight: '260px',
                overflowY: 'auto',
                fontFamily: 'monospace'
              }}>
                {JSON.stringify(activeSchemaJson.structure, null, 2)}
              </pre>
            </div>

            <div>
              <h5 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Database size={14} /> Live API response payload (Single Doc JSON)
              </h5>
              <pre style={{
                backgroundColor: 'rgba(0,0,0,0.3)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.75rem',
                color: 'var(--text-gray)',
                maxHeight: '260px',
                overflowY: 'auto',
                fontFamily: 'monospace'
              }}>
                {JSON.stringify(activeSchemaJson.payloadExample, null, 2)}
              </pre>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Container Views with Transitions */}
      <main style={{ padding: '4rem 2rem 0 2rem' }}>
        <AnimatePresence mode="wait">
          {currentTab === 'platform' && (
            <motion.div
              key="platform"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}
            >
              
              {/* HERO HEADER */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.8fr',
                gap: '3rem',
                alignItems: 'center',
                marginBottom: '6rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--accent)', fontWeight: 700, display: 'block', marginBottom: '1rem' }}>
                    AI That Powers Better Corporate Decisions
                  </span>
                  <h1 style={{ fontSize: '3.6rem', lineHeight: '1.15', marginBottom: '1.5rem', fontFamily: 'var(--font-title)', fontWeight: 800 }}>
                    Strategic Intelligence.<br />
                    <span style={{ opacity: 0.4 }}>Accelerated Core Building.</span><br />
                    Built for the Future.
                  </h1>
                  <p style={{ color: 'var(--text-gray)', fontSize: '1.05rem', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: '1.6' }}>
                    Re-engineered for a secure, headless architecture. Strategic AI velocity powered by modern APIs, dynamic collection engines, and beautiful offline validation caches.
                  </p>
                  
                  <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <button className="btn-solid" onClick={() => {
                      const el = document.getElementById('platform-pillars');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}>
                      Explore Services <ArrowRight size={18} />
                    </button>
                    <button className="btn-outline" onClick={() => {
                      const el = document.getElementById('platform-calculator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}>
                      Calculate ROI
                    </button>
                  </div>
                </div>

                {/* Interactive Network Visual SVG Graph */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <svg width="100%" height="320" viewBox="0 0 400 320" style={{ maxWidth: '380px', overflow: 'visible' }}>
                    <defs>
                      <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    
                    {/* Connecting paths */}
                    <path d="M 200 60 L 100 160" stroke="rgba(163, 255, 51, 0.15)" strokeWidth="1.5" />
                    <path d="M 200 60 L 300 160" stroke="rgba(163, 255, 51, 0.15)" strokeWidth="1.5" />
                    <path d="M 100 160 L 200 260" stroke="rgba(163, 255, 51, 0.15)" strokeWidth="1.5" />
                    <path d="M 300 160 L 200 260" stroke="rgba(163, 255, 51, 0.15)" strokeWidth="1.5" />
                    <path d="M 100 160 L 300 160" stroke="rgba(163, 255, 51, 0.05)" strokeWidth="1" strokeDasharray="4 4" />
                    
                    {/* Moving pulse elements */}
                    <circle cx="150" cy="110" r="3" fill="var(--accent)">
                      <animate attributeName="cx" from="200" to="100" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="cy" from="60" to="160" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="250" cy="110" r="3" fill="var(--accent)">
                      <animate attributeName="cx" from="200" to="300" dur="2.5s" repeatCount="indefinite" />
                      <animate attributeName="cy" from="60" to="160" dur="2.5s" repeatCount="indefinite" />
                    </circle>

                    {/* Nodes */}
                    <circle cx="200" cy="60" r="18" fill="url(#nodeGlow)" />
                    <circle cx="200" cy="60" r="6" fill="var(--accent)" />
                    
                    <circle cx="100" cy="160" r="18" fill="url(#nodeGlow)" />
                    <circle cx="100" cy="160" r="6" fill="var(--accent)" />

                    <circle cx="300" cy="160" r="18" fill="url(#nodeGlow)" />
                    <circle cx="300" cy="160" r="6" fill="var(--accent)" />

                    <circle cx="200" cy="260" r="18" fill="url(#nodeGlow)" />
                    <circle cx="200" cy="260" r="6" fill="var(--accent)" />

                    {/* Labels */}
                    <text x="200" y="32" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" letterSpacing="1">COGNITIVE HUB</text>
                    <text x="50" y="164" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontWeight="700" letterSpacing="1">OWNED CMS</text>
                    <text x="350" y="164" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontWeight="700" letterSpacing="1">CURATED FEED</text>
                    <text x="200" y="292" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" letterSpacing="1">ENTERPRISE CORE</text>
                  </svg>
                </div>
              </div>

              {/* PILLARS SECTION */}
              <section id="platform-pillars" style={{ marginBottom: '6rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
                    Our Pillars for Growth
                  </span>
                  <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)', marginTop: '0.25rem', marginBottom: 0 }}>
                    Unified Operational <span style={{ color: 'var(--accent)' }}>Frameworks</span>
                  </h2>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1.5rem'
                }}>
                  {[
                    {
                      title: 'Enterprise Consulting',
                      description: 'Strategic advisory for high-impact AI implementation, regulatory audits, and data stack modernization.'
                    },
                    {
                      title: 'Tech Services',
                      description: 'End-to-End development of custom headless AI agents, secure databases, and API integrations.'
                    },
                    {
                      title: 'Incubation Hub',
                      description: 'Accelerating early-stage client ventures from strategic concepts to production-grade market deployments.'
                    },
                    {
                      title: 'AI Products',
                      description: 'Proprietary enterprise-grade software packages and orchestration kits designed for deep operational efficiency.'
                    }
                  ].map((pillar, idx) => (
                    <div key={idx} className="glass-panel" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      justifyContent: 'space-between',
                      padding: '1.75rem',
                      position: 'relative'
                    }}>
                      <div>
                        <div style={{ color: 'var(--accent)', marginBottom: '1.25rem' }}>
                          {idx === 0 && <Cpu size={28} />}
                          {idx === 1 && <Layers size={28} />}
                          {idx === 2 && <Activity size={28} />}
                          {idx === 3 && <TrendingUp size={28} />}
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'white' }}>{pillar.title}</h3>
                        <p style={{ color: 'var(--text-gray)', fontSize: '0.88rem', lineHeight: '1.5' }}>{pillar.description}</p>
                      </div>
                      
                      <button
                        className="btn-link"
                        onClick={() => setCurrentTab('case-studies')}
                        style={{ marginTop: '1.5rem', fontSize: '0.85rem' }}
                      >
                        Explore Cases <ChevronRight size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* FEATURED USE CASE SECTION */}
              <section style={{ marginBottom: '6rem' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1.1fr 0.9fr',
                  gap: '4rem',
                  alignItems: 'center'
                }}>
                  <div className="glass-panel" style={{ padding: '3rem', border: '1px solid rgba(163, 255, 51, 0.15)' }}>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-secondary)', fontWeight: 700, display: 'block', marginBottom: '1rem' }}>
                      FEATURED USE CASE
                    </span>
                    <h2 style={{ fontSize: '2.2rem', marginBottom: '1.25rem', lineHeight: '1.2' }}>
                      AI agents that transform your customer service
                    </h2>
                    <p style={{ color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '2rem', fontSize: '1rem' }}>
                      We customize agent infrastructures to act as a seamless front-line support tier, resolving highly complex enterprise inquiries instantly while retaining deep core operational security.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                      {[
                        { value: '92%', label: 'Resolution accuracy rate' },
                        { value: '90%', label: 'Reduced operational overhead' },
                        { value: 'R3.2M', label: 'Annual financial optimization' }
                      ].map((stat, idx) => (
                        <div key={idx}>
                          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: idx === 0 ? 'var(--accent)' : 'white', fontFamily: 'var(--font-title)' }}>
                            {stat.value}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-gray)', marginTop: '0.25rem' }}>
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ paddingLeft: '2rem', borderLeft: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-gray)', fontWeight: 700, display: 'block', marginBottom: '0.75rem' }}>
                      FEATURED ADVISORY
                    </span>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 600, lineHeight: '1.3', marginBottom: '1.25rem' }}>
                      Matured Insight: Future of Incubation Hub
                    </h3>
                    <p style={{ color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '2rem', fontSize: '0.95rem' }}>
                      Executive summary exploring emergent validation metrics in secure generative data pipelines and how custom CMS collections secure client context profiles offline.
                    </p>
                    <button className="btn-solid" onClick={() => setCurrentTab('insights')}>
                      Read Full Case Study <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </section>

              {/* DYNAMIC ROI CALCULATOR SECTION */}
              <section id="platform-calculator" style={{ marginBottom: '6rem' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '3rem',
                  alignItems: 'stretch'
                }}>
                  {/* Calculator Input Form */}
                  <div className="glass-panel" style={{ padding: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calculator size={22} style={{ color: 'var(--accent)' }} /> Operational ROI Calculator
                    </h3>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                      Estimate potential overhead savings achieved by automating support routing and clinical classification layers.
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-gray)', display: 'block', marginBottom: '0.5rem' }}>Continent</label>
                        <select 
                          value={selectedContinent} 
                          onChange={(e) => {
                            setSelectedContinent(e.target.value);
                            setSelectedCountry('');
                            setCalcResults(null);
                          }}
                          style={{
                            width: '100%',
                            padding: '0.65rem 0.85rem',
                            backgroundColor: 'var(--bg-primary)',
                            border: '1px solid var(--border-color)',
                            color: 'white',
                            borderRadius: '6px',
                            outline: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="">Select Continent</option>
                          <option value="Africa">Africa</option>
                          <option value="Oceania">Oceania</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-gray)', display: 'block', marginBottom: '0.5rem' }}>Country</label>
                        <select 
                          value={selectedCountry}
                          disabled={!selectedContinent}
                          onChange={(e) => {
                            setSelectedCountry(e.target.value);
                            setCalcResults(null);
                          }}
                          style={{
                            width: '100%',
                            padding: '0.65rem 0.85rem',
                            backgroundColor: 'var(--bg-primary)',
                            border: '1px solid var(--border-color)',
                            color: 'white',
                            borderRadius: '6px',
                            outline: 'none',
                            cursor: 'pointer',
                            opacity: !selectedContinent ? 0.5 : 1
                          }}
                        >
                          <option value="">Select Country</option>
                          {COUNTRY_DATA.filter(c => c.continent === selectedContinent).map(c => (
                            <option key={c.name} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>Monthly Query Volume</label>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent)' }}>{monthlyVolume.toLocaleString()} queries</span>
                      </div>
                      <input 
                        type="range" 
                        min="500" 
                        max="20000" 
                        step="500"
                        value={monthlyVolume}
                        onChange={(e) => {
                          setMonthlyVolume(parseInt(e.target.value, 10));
                          setCalcResults(null);
                        }}
                        style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'pointer' }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button
                        className="btn-solid"
                        onClick={handleCalculate}
                        disabled={!selectedCountry}
                        style={{ flexGrow: 1, justifyContent: 'center', opacity: !selectedCountry ? 0.6 : 1 }}
                      >
                        Calculate Savings
                      </button>
                      <button
                        className="btn-outline"
                        onClick={handleResetCalc}
                        style={{ justifyContent: 'center' }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  {/* Calculator Results Display */}
                  <div className="glass-panel" style={{
                    padding: '2.5rem',
                    border: '1px solid rgba(163, 255, 51, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    {calcResults ? (
                      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                        <div>
                          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                            ANNUAL ROI PROJECTION
                          </span>
                          <h4 style={{ fontSize: '1.4rem', color: 'white', marginBottom: '1.5rem' }}>
                            Significant Financial Optimization Detected
                          </h4>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                              <span style={{ color: 'var(--text-gray)' }}>Current Manual Overhead Cost:</span>
                              <strong style={{ color: 'white' }}>${calcResults.currentCost.toLocaleString()}/yr</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', fontSize: '1.05rem' }}>
                              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Projected Savings (Year 1):</span>
                              <strong style={{ color: 'var(--accent)', fontWeight: 800 }}>+${calcResults.year1Savings.toLocaleString()}/yr</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                              <span style={{ color: 'white' }}>Projected Savings (Year 3):</span>
                              <strong style={{ color: 'white' }}>+${calcResults.year3Savings.toLocaleString()}/yr</strong>
                            </div>
                          </div>
                        </div>

                        <div style={{
                          backgroundColor: 'rgba(255,255,255,0.01)',
                          border: '1px dashed var(--border-color)',
                          padding: '1rem',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          color: 'var(--text-gray)',
                          lineHeight: '1.4'
                        }}>
                          <Info size={14} style={{ color: 'var(--accent)', display: 'inline', marginRight: '0.25rem' }} />
                          Math evaluates local salaries, packaging, and fine-tuning licensing against average token query volume costs ($0.03/query). Actual yields vary by context.
                        </div>
                      </div>
                    ) : (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: 'var(--text-gray)',
                        textAlign: 'center',
                        gap: '1rem'
                      }}>
                        <Calculator size={48} style={{ opacity: 0.25 }} />
                        <div>
                          <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Awaiting Parameters</h4>
                          <p style={{ fontSize: '0.85rem', maxWidth: '300px', margin: 0 }}>
                            Select a continent and country of operations to execute our financial yield formula.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* CORPORATE INQUIRY CONTACT FORM SECTION */}
              <section style={{ marginBottom: '4rem' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '4rem',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
                      Operational intake
                    </span>
                    <h2 style={{ fontSize: '2.5rem', color: 'white', fontFamily: 'var(--font-title)', margin: 0 }}>
                      Ready to transform your core?
                    </h2>
                    <p style={{ color: 'var(--text-gray)', lineHeight: '1.6', fontSize: '1.05rem', margin: 0 }}>
                      Speak directly with our strategy leads. We help parse complex enterprise operational bottlenecks, map custom relational schemas, and draft pilot implementation roadmaps.
                    </p>
                  </div>

                  <div className="glass-panel" style={{ padding: '2.5rem' }}>
                    {contactSubmitted ? (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        color: 'var(--accent)',
                        minHeight: '260px',
                        textAlign: 'center'
                      }}>
                        <CheckCircle size={48} />
                        <div>
                          <h4 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '0.25rem' }}>Submission Received</h4>
                          <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', margin: 0 }}>Thank you. One of our operational leads will contact you within 24 hours.</p>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: 'var(--text-gray)', display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
                          <input 
                            type="text" 
                            required 
                            value={contactName} 
                            onChange={(e) => setContactName(e.target.value)} 
                            style={{
                              width: '100%',
                              padding: '0.65rem 0.85rem',
                              backgroundColor: 'var(--bg-primary)',
                              border: '1px solid var(--border-color)',
                              color: 'white',
                              borderRadius: '6px',
                              outline: 'none'
                            }} 
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.75rem', color: 'var(--text-gray)', display: 'block', marginBottom: '0.5rem' }}>Corporate Email</label>
                          <input 
                            type="email" 
                            required 
                            value={contactEmail} 
                            onChange={(e) => setContactEmail(e.target.value)} 
                            style={{
                              width: '100%',
                              padding: '0.65rem 0.85rem',
                              backgroundColor: 'var(--bg-primary)',
                              border: '1px solid var(--border-color)',
                              color: 'white',
                              borderRadius: '6px',
                              outline: 'none'
                            }} 
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.75rem', color: 'var(--text-gray)', display: 'block', marginBottom: '0.5rem' }}>Brief Description of bottlenecks</label>
                          <textarea 
                            required 
                            value={contactMsg} 
                            onChange={(e) => setContactMsg(e.target.value)} 
                            rows={3}
                            style={{
                              width: '100%',
                              padding: '0.65rem 0.85rem',
                              backgroundColor: 'var(--bg-primary)',
                              border: '1px solid var(--border-color)',
                              color: 'white',
                              borderRadius: '6px',
                              outline: 'none',
                              resize: 'none'
                            }} 
                          />
                        </div>

                        <button type="submit" className="btn-solid" style={{ width: '100%', justifyContent: 'center' }}>
                          Submit Inquiry <Send size={16} />
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {currentTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <InsightsSection insightsList={insights} />
            </motion.div>
          )}

          {currentTab === 'articles' && (
            <motion.div
              key="articles"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <ArticlesSection articlesList={articles} />
            </motion.div>
          )}

          {currentTab === 'case-studies' && (
            <motion.div
              key="case-studies"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <CaseStudiesSection caseStudiesList={caseStudies} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer credits watermark */}
      <footer style={{
        marginTop: '6rem',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '2rem',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-gray)'
      }}>
        <p style={{ margin: 0 }}>© 2026 Lycoscore Strategic AI Advisory. All rights reserved. Secured via local API snapshots.</p>
      </footer>
    </div>
  );
}
