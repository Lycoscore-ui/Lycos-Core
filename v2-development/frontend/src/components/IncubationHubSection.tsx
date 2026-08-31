import { useState } from 'react';
import { CheckCircle, Cpu, Workflow, Shield, TrendingUp, Zap } from 'lucide-react';
import LinkedInConnect from './LinkedInConnect';

const tracks = [
  {
    name: 'Architecture to Production',
    tag: 'EARLY-STAGE VENTURE',
    desc: 'Designed for high-conviction teams with early market validation. We embed as full-stack technical co-builders to engineer your AI-native architecture, construct zero-trust data infrastructure, and accelerate initial enterprise buyer deployment.',
    deliverables: ['Full-Stack Build Execution: Dedicated AI engineering, data architecture, and production UI/UX deployment.', 'Enterprise GTM Protocol: Precision Ideal Customer Profile (ICP) targeting, enterprise pricing design, and pipeline activation.', 'Institutional Capital Access: Pitch architecture calibration and direct introductions to top-tier venture syndicates.', 'Co-Investment Capital: Direct deployment of up to $500K in seed-stage syndicate capital.'],
    duration: '6 MONTHS',
    equity: '15–25%',
  },
  {
    name: 'Systemic Scale and Capture',
    tag: 'INSTITUTIONAL EXPANSION',
    desc: 'Designed for scaling ventures seeking exponential revenue multiplication. We optimize your GTM architecture, deploy enterprise deal-structuring frameworks, and build the scalable RevOps infrastructure required to capture market share and secure Series A valuation multiples.',
    deliverables: ['Enterprise GTM Architecture: Custom enterprise sales playbooks, procurement navigation protocols, and team enablement.', 'RevOps and Telemetry Infrastructure: Production-grade CRM pipeline architecture, automated forecasting, and data-driven deal tracking.', 'Proprietary Network Distribution: Direct warm routing to decision-makers across Lycos Core\'s enterprise buyer network.', 'Series A Capitalization Protocol: Institutional data-room engineering, financial modeling, and syndicate investor routing.'],
    duration: '9 MONTHS',
    equity: '8–15%',
  },
  {
    name: 'Corporate Venture Studio',
    tag: 'INTRAPRENEURIAL VENTURES',
    desc: 'Engineered for enterprise organizations commercializing proprietary internal AI capabilities into standalone corporate spin-outs. We execute the end-to-end lifecycle—from IP carve-out and technical validation to independent entity formation—systematically de-risking enterprise capital.',
    deliverables: ['Entity Formation and Corporate Governance: Clean IP carve-outs, independent board structures, and enterprise regulatory compliance protocols.', 'Bespoke Brand Architecture: Autonomous corporate positioning, market go-to-market strategy, and brand execution.', 'Executive Talent Acquisition: Executive search and placement for dedicated, venture-grade founding leadership.', 'Capital Structuring and Equity Design: Institutional capitalization table modeling, enterprise valuation, and management option pool engineering.'],
    duration: '12 MONTHS',
    equity: 'BESPOKE',
  },
];

const portfolio = [
  {
    name: 'SentryFlow',
    sector: 'Fintech / Compliance',
    stage: 'Seed',
    cohort: '2025-A',
    headline: 'Automated compliance audit software for multi-jurisdiction financial institutions.',
    result: 'Closed first enterprise contract within 4 months of program entry. Now processing 1.2M compliance checks per month.',
    metric: '$820K ARR',
  },
  {
    name: 'OmniCore',
    sector: 'RegTech',
    stage: 'Series A',
    cohort: '2025-B',
    headline: 'Real-time transactional monitoring and regulatory flag engine for banks and asset managers.',
    result: 'Grew from 2 to 14 enterprise clients during their 9-month Lycos Core engagement. Raised $2.8M seed round.',
    metric: '$2.1M ARR',
  },
  {
    name: 'QuantVenture',
    sector: 'Asset Management',
    stage: 'Series A',
    cohort: '2024-C',
    headline: 'AI-powered portfolio rebalancing and yield optimisation for family offices and independent advisors.',
    result: 'Achieved 4.2% yield premium over benchmark within first operating year. Now managing $120M in assets.',
    metric: '$120M AUM',
  },
];

const stats = [
  { value: '83%', label: 'of portfolio companies achieve Series A capital velocity within 18 months', icon: <TrendingUp size={20} className="neon-icon" /> },
  { value: '3.2×', label: 'average revenue valuation multiple compared to unassisted market entrants', icon: <Zap size={20} className="neon-icon" /> },
  { value: '$47M', label: 'institutional follow-on syndicate capital raised across active ventures', icon: <Shield size={20} className="neon-icon" /> },
  { value: '140%', label: 'average expansion yield (NDR) across active portfolio enterprise contracts', icon: <CheckCircle size={20} className="neon-icon" /> },
];

export default function IncubationHubSection() {
  const [activeTrack, setActiveTrack] = useState(0);
  const [activePortco, setActivePortco] = useState(0);

  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactMsg('');
    }, 3000);
  };

  return (
    <>
      {/* Above-the-Fold Dedicated Hero Section (Strictly 100vh) */}
      <section id="incubation-hero" className="section hero-fullscreen-section">
        <div className="hero-grid">
          <div>
            <div className="eyebrow-tagline-green">
              // ENTERPRISE SPIN-OUTS AND HIGH-GROWTH FOUNDERS
            </div>
            <h1 className="hero-heading">
              Transforming Validated Models into Institutional-Grade AI Enterprises<span className="brand-dot">.</span>
            </h1>
            
            <div className="hero-tags-row">
              {['Venture Studio', 'Scale and Capture', 'Corporate Spin-outs'].map((tag, tIdx) => (
                <span key={tIdx} className="hero-pill-badge">
                  {tag}
                </span>
              ))}
            </div>

            <p className="hero-body-copy">
              The Lycos Core Incubation Hub operates as a technical co-builder, not a traditional accelerator. We deploy full-stack AI engineering, enterprise-grade governance, and direct institutional capital access to construct market-ready spin-outs alongside visionary founders.
            </p>
            
            <div className="subpage-hero-cta-row">
              <button 
                className="cta-primary" 
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                INITIALIZE INCUBATION PROTOCOL
              </button>
              <button 
                className="cta-secondary" 
                onClick={() => {
                  const el = document.getElementById('block-outcomes');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                EXPLORE COHORT MILESTONES
              </button>
            </div>
          </div>

          {/* Right Hero Baseline Gauge Widget matching Gold-Standard */}
          <div className="hero-gauge-wrapper">
            <div className="baseline-card hero-gauge-card">
              <span className="hero-gauge-tag">
                // COHORT INCUBATION ACTIVE
              </span>
              
              <div className="hero-gauge-svg-container">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8CFF32" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="0.25" strokeLinecap="round" />
                </svg>
                <div className="hero-gauge-number-wrap">
                  <span className="count-up-trigger stat-metric" data-target="83" data-percent="true">83%</span>
                </div>
              </div>

              {/* Metric Label Strictly Underneath */}
              <span className="hero-gauge-label">
                Series A Capital Velocity
              </span>

              <div className="hero-gauge-status">
                <CheckCircle size={16} className="neon-icon" /> Institutional-Grade Hardening
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Below-the-Fold Section: Cohort Performance Stats */}
      <section id="block-outcomes" className="section">
        {/* Outcome Stats (Grid of 4 Horizontal Cards) */}
        <div className="outcome-stats-grid">
          {stats.map((s, idx) => (
            <div key={idx} className="baseline-card outcome-stat-card">
              <div className="count-up-trigger stat-metric" data-target={s.value.replace(/[^0-9.]/g, '')} data-percent={s.value.includes('%')} style={{ color: '#8ce63f', fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-title)' }}>
                {s.value}
              </div>
              <div className="stat-label" style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Programme Tracks Selector Section */}
        <div>
          <div className="section-header-center">
            <h2 className="section-title">
              Structured <span className="brand-dot">Pathways.</span>
            </h2>
            <p className="section-desc">
              Architected for stage-specific execution—deploying targeted technical capital from initial validation through enterprise capitalization.
            </p>
          </div>
          
          <div className="services-split-grid">
            <div className="services-nav-list">
              {tracks.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTrack(idx)}
                  className={`baseline-card service-nav-btn ${activeTrack === idx ? 'active' : ''}`}
                >
                  <div className="service-title-wrap">
                    <div className="icon-badge">
                      <Cpu size={20} className="neon-icon" />
                    </div>
                    <span className="service-title-text">{t.name}</span>
                  </div>
                  <div className="service-summary-text">{t.tag}</div>
                </button>
              ))}
            </div>

            <div className="baseline-card service-detail-panel">
              <div>
                <div className="service-icon-badge">
                  <div className="icon-badge">
                    <Cpu size={20} className="neon-icon" />
                  </div>
                </div>
                <h4 className="service-heading">{tracks[activeTrack].name}</h4>
                <div className="hero-tags-row">
                  <span className="hero-pill-badge">DURATION: {tracks[activeTrack].duration}</span>
                  <span className="hero-pill-badge">EQUITY: {tracks[activeTrack].equity}</span>
                </div>
                <p className="service-desc">{tracks[activeTrack].desc}</p>
              </div>
              <div className="service-impact-divider">
                <div className="service-impact-title">PROGRAMME DELIVERABLES</div>
                <div className="service-impact-list">
                  {tracks[activeTrack].deliverables.map((d, i) => (
                    <div key={i} className="service-impact-item">
                      <CheckCircle size={16} className="neon-icon" /> {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Select Protocol Pathways (Grid of 3 Horizontal Cards) */}
      <section className="section">
        <div className="section-header-center">
          <h2 className="section-title">
            Select <span className="brand-dot">Protocol.</span>
          </h2>
          <p className="section-desc">
            Tailored venture incubation tracks engineered to scale early-stage AI startups, optimize revenue infrastructure, and govern high-yield enterprise spin-outs.
          </p>
        </div>

        <div className="grid-3col">
          {/* Card 1: Protocol Kinetic */}
          <a 
            href="/incubation/kinetic" 
            target="_blank" 
            rel="noopener noreferrer"
            className="pathway-card group"
          >
            <div className="icon-badge">
              <Cpu size={22} className="neon-icon" />
            </div>
            <span className="pathway-tag">
              PATHWAY 01 // SEED and PRE-SEED
            </span>
            <h3 className="pathway-title">
              Protocol: Kinetic
            </h3>
            <p className="pathway-desc">
              Technical Co-Building and Zero-State Architecture for Seed-Stage AI.
            </p>
          </a>

          {/* Card 2: Protocol Apex */}
          <a 
            href="/incubation/apex" 
            target="_blank" 
            rel="noopener noreferrer"
            className="pathway-card group"
          >
            <div className="icon-badge">
              <Workflow size={22} className="neon-icon" />
            </div>
            <span className="pathway-tag">
              PATHWAY 02 // SERIES A READINESS
            </span>
            <h3 className="pathway-title">
              Protocol: Apex
            </h3>
            <p className="pathway-desc">
              Systemic Revenue Engineering and RevOps Telemetry ($250K+ ARR).
            </p>
          </a>

          {/* Card 3: Protocol Citadel */}
          <a 
            href="/incubation/citadel" 
            target="_blank" 
            rel="noopener noreferrer"
            className="pathway-card group"
          >
            <div className="icon-badge">
              <Shield size={22} className="neon-icon" />
            </div>
            <span className="pathway-tag">
              PATHWAY 03 // ENTERPRISE SPIN-OUTS
            </span>
            <h3 className="pathway-title">
              Protocol: Citadel
            </h3>
            <p className="pathway-desc">
              IP Carve-Outs and High-Yield Enterprise Spin-Out Governance.
            </p>
          </a>
        </div>
      </section>

      {/* Active Incubation Assets (Portfolio Selector) */}
      <section className="section">
        <div className="section-header-center">
          <h2 className="section-title">
            Incubation <span className="brand-dot">Assets.</span>
          </h2>
          <p className="section-desc">
            High-growth AI ventures engineered in partnership with Lycos Core—and their operational milestones.
          </p>
        </div>

        <div>
          <div className="hero-tags-row">
            {portfolio.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setActivePortco(idx)}
                className={`integration-chip ${activePortco === idx ? 'active' : ''}`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="baseline-card service-detail-panel portfolio-detail-card">
            <div>
              <div className="hero-tags-row">
                <span className="hero-pill-badge">{portfolio[activePortco].sector}</span>
                <span className="hero-pill-badge">{portfolio[activePortco].stage}</span>
              </div>
              <h4 className="service-heading">{portfolio[activePortco].name}</h4>
              <p className="service-desc">{portfolio[activePortco].headline}</p>
            </div>
            <div className="portfolio-metrics-col">
              <div className="integrations-eyebrow">Cohort {portfolio[activePortco].cohort} Result</div>
              <div className="count-up-trigger stat-metric" data-target={portfolio[activePortco].metric.replace(/[^0-9.]/g, '')}>
                {portfolio[activePortco].metric}
              </div>
              <p className="service-desc">{portfolio[activePortco].result}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section at bottom of page matching Gold-Standard */}
      <section id="contact" className="section hero-fullscreen-section">
        <div className="contact-grid">
          <div className="glass-panel contact-card">
            <h3 className="service-heading">
              Initiate Engagement
            </h3>
            
            {contactSubmitted ? (
              <div className="hero-gauge-status">
                <CheckCircle size={48} className="neon-icon" />
                <h4>Submission Received</h4>
                <p>Thank you. One of our operational leads will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="contact-form">
                <div>
                  <label className="contact-label">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={contactName} 
                    onChange={(e) => setContactName(e.target.value)} 
                    className="contact-input"
                  />
                </div>

                <div>
                  <label className="contact-label">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={contactEmail} 
                    onChange={(e) => setContactEmail(e.target.value)} 
                    className="contact-input"
                  />
                </div>

                <div className="contact-form">
                  <label className="contact-label">Brief Description of operational bottlenecks</label>
                  <textarea 
                    required 
                    value={contactMsg} 
                    onChange={(e) => setContactMsg(e.target.value)} 
                    className="contact-textarea"
                  />
                </div>

                <button type="submit" className="cta-primary contact-submit-btn">
                  INITIALIZE PROTOCOL
                </button>
              </form>
            )}
          </div>

          <div className="hero-gauge-wrapper">
            <div className="contact-card">
              <h3 className="hero-heading">Initialize System Engagement</h3>
              <p className="hero-body-copy">
                Consult directly with our system architects. We analyze complex enterprise bottlenecks, establish quantitative viability vectors, and engineer precision deployment roadmaps.
              </p>
              
              {/* Official LinkedIn Social Link */}
              <LinkedInConnect />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}