import { useState } from 'react';
import { submitContactForm } from '../services/contactService';
import { 
  CheckCircle, 
  Shield, 
  TrendingUp, 
  Zap, 
  Building2, 
  Layers, 
  ArrowRight 
} from 'lucide-react';
import LinkedInConnect from './LinkedInConnect';

const tracks = [
  {
    name: 'Architecture to Production',
    tag: 'EARLY-STAGE VENTURE',
    icon: <Layers size={20} className="neon-icon" />,
    desc: 'Designed for high-conviction teams with early market validation. We embed as full-stack technical co-builders to engineer your AI-native architecture, construct zero-trust data infrastructure, and accelerate initial enterprise buyer deployment.',
    deliverables: [
      'Full-Stack Build Execution: Dedicated AI engineering, data architecture, and production UI/UX deployment.',
      'Enterprise GTM Protocol: Precision Ideal Customer Profile (ICP) targeting, enterprise pricing design, and pipeline activation.',
      'Institutional Capital Access: Pitch architecture calibration and direct introductions to top-tier venture syndicates.',
      'Co-Investment Capital: Direct deployment of up to $500K in seed-stage syndicate capital.'
    ],
    duration: '6 MONTHS',
    equity: '15–25%',
  },
  {
    name: 'Systemic Scale and Capture',
    tag: 'INSTITUTIONAL EXPANSION',
    icon: <TrendingUp size={20} className="neon-icon" />,
    desc: 'Designed for scaling ventures seeking exponential revenue multiplication. We optimize your GTM architecture, deploy enterprise deal-structuring frameworks, and build the scalable RevOps infrastructure required to capture market share and secure Series A valuation multiples.',
    deliverables: [
      'Enterprise GTM Architecture: Custom enterprise sales playbooks, procurement navigation protocols, and team enablement.',
      'RevOps and Telemetry Infrastructure: Production-grade CRM pipeline architecture, automated forecasting, and data-driven deal tracking.',
      'Proprietary Network Distribution: Direct warm routing to decision-makers across Lycos Core\'s enterprise buyer network.',
      'Series A Capitalization Protocol: Institutional data-room engineering, financial modeling, and syndicate investor routing.'
    ],
    duration: '9 MONTHS',
    equity: '8–15%',
  },
  {
    name: 'Corporate Venture Studio',
    tag: 'INTRAPRENEURIAL VENTURES',
    icon: <Building2 size={20} className="neon-icon" />,
    desc: 'Engineered for enterprise organizations commercializing proprietary internal AI capabilities into standalone corporate spin-outs. We execute the end-to-end lifecycle—from IP carve-out and technical validation to independent entity formation—systematically de-risking enterprise capital.',
    deliverables: [
      'Entity Formation and Corporate Governance: Clean IP carve-outs, independent board structures, and enterprise regulatory compliance protocols.',
      'Bespoke Brand Architecture: Autonomous corporate positioning, market go-to-market strategy, and brand execution.',
      'Executive Talent Acquisition: Executive search and placement for dedicated, venture-grade founding leadership.',
      'Capital Structuring and Equity Design: Institutional capitalization table modeling, enterprise valuation, and management option pool engineering.'
    ],
    duration: '12 MONTHS',
    equity: 'BESPOKE',
  },
];

const protocols = [
  {
    id: 'kinetic',
    tag: 'ARCHITECTURE TO PRODUCTION',
    title: 'Kinetic Protocol',
    icon: <Layers size={24} className="neon-icon" />,
    desc: 'Full-stack technical co-building for early-stage teams. Zero-trust data infrastructure, rapid PMF validation, and seed syndication.',
    meta: '6 Months • 15–25% Equity • Up to $500K Syndicate',
    route: '/incubation/kinetic'
  },
  {
    id: 'apex',
    tag: 'SYSTEMIC SCALE & CAPTURE',
    title: 'Apex Protocol',
    icon: <TrendingUp size={24} className="neon-icon" />,
    desc: 'Institutional revenue multiplication and RevOps infrastructure. Deal-structuring playbooks, buyer routing, and Series A positioning.',
    meta: '9 Months • 8–15% Equity • Series A Readiness',
    route: '/incubation/apex'
  },
  {
    id: 'citadel',
    tag: 'CORPORATE VENTURE STUDIO',
    title: 'Citadel Protocol',
    icon: <Building2 size={24} className="neon-icon" />,
    desc: 'Commercializing internal enterprise AI IP into autonomous venture spin-outs with clean corporate carve-outs and governance.',
    meta: '12 Months • Bespoke Terms • Clean IP Carve-Out',
    route: '/incubation/citadel'
  }
];

const portfolio = [
  {
    name: 'SentryFlow',
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
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo(0, 0);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMsg.trim()) return;

    setContactLoading(true);
    setContactError(null);

    const res = await submitContactForm({
      name: contactName.trim(),
      email: contactEmail.trim(),
      message: contactMsg.trim(),
      serviceContext: 'Incubation Hub & Venture Studio'
    });

    setContactLoading(false);
    if (res.success) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactName('');
        setContactEmail('');
        setContactMsg('');
      }, 6000);
    } else {
      setContactError(res.error || 'Failed to submit engagement request.');
    }
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
                // VENTURE ACCELERATION ENGINE
              </span>
              
              <div className="hero-visual-centerpiece">
                <div className="ascent-chart-container">
                  <svg className="ascent-svg" viewBox="0 0 240 100">
                    <defs>
                      <linearGradient id="ascentGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8a4bf3" />
                        <stop offset="50%" stopColor="#00f0ff" />
                        <stop offset="100%" stopColor="#8CFF32" />
                      </linearGradient>
                      <linearGradient id="ascentAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8CFF32" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#8a4bf3" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Chart Grid Lines */}
                    <line x1="10" y1="20" x2="230" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 4" />
                    <line x1="10" y1="50" x2="230" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 4" />
                    <line x1="10" y1="80" x2="230" y2="80" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 4" />

                    {/* Area under curve */}
                    <path
                      d="M 10,85 C 60,85 100,75 140,45 C 170,25 200,12 230,8 L 230,85 L 10,85 Z"
                      className="ascent-area-fill"
                    />

                    {/* Glowing Ascent Curve */}
                    <path
                      d="M 10,85 C 60,85 100,75 140,45 C 170,25 200,12 230,8"
                      className="ascent-curve-path"
                    />

                    {/* Milestone 1: Seed */}
                    <circle cx="60" cy="83" r="3.5" fill="#8a4bf3" stroke="#fff" strokeWidth="1" />
                    {/* Milestone 2: PMF */}
                    <circle cx="140" cy="45" r="4" fill="#00f0ff" stroke="#fff" strokeWidth="1" />
                    {/* Milestone 3: Series A (Pulsing) */}
                    <circle cx="230" cy="8" r="5" fill="#8CFF32" className="ascent-node-pulse" filter="drop-shadow(0 0 8px #8CFF32)" />
                  </svg>

                  {/* Milestones Row */}
                  <div className="ascent-milestones-row">
                    <span className="ascent-milestone-pill">SEED ✓</span>
                    <span className="ascent-milestone-pill">PMF ✓</span>
                    <span className="ascent-milestone-pill active-pill">SERIES A</span>
                    <div className="ascent-velocity-badge">
                      <TrendingUp size={12} />
                      <span>3.4x</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metric Label Strictly Underneath */}
              <div className="hero-gauge-label">
                <div className="integrations-eyebrow">Cohort {portfolio[activePortco].cohort} Benchmark</div>
                <div className="stat-metric accent-highlight">
                  {portfolio[activePortco].metric}
                </div>
                <p className="service-desc">{portfolio[activePortco].result}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcome Stats Grid Section */}
      <section id="block-outcomes" className="section outcome-stats-section">
        <div className="section-header-centered">
          <div className="eyebrow-tagline-green">// VALIDATED PERFORMANCE METRICS</div>
          <h2 className="section-title">Institutional Acceleration Yield<span className="accent-dot">.</span></h2>
        </div>
        <div className="outcome-stats-grid">
          {stats.map((st, sIdx) => (
            <div key={sIdx} className="glass-panel outcome-stat-card">
              <div className="outcome-stat-top">
                <div className="icon-badge">{st.icon}</div>
                <div className="outcome-stat-val accent-highlight">{st.value}</div>
              </div>
              <p className="outcome-stat-desc">{st.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Structured Incubation Pathways Section */}
      <section id="block-pathways" className="section structured-pathways-section">
        <div className="section-header-centered">
          <div className="eyebrow-tagline-green">// PROGRAM ARCHITECTURE</div>
          <h2 className="section-title">Structured Incubation Pathways<span className="accent-dot">.</span></h2>
        </div>

        {/* Pathway Tabs */}
        <div className="pathway-tabs-row">
          {tracks.map((t, idx) => (
            <button
              key={idx}
              className={`pathway-tab-btn ${activeTrack === idx ? 'active' : ''}`}
              onClick={() => setActiveTrack(idx)}
            >
              {t.icon}
              <span>{t.name}</span>
            </button>
          ))}
        </div>

        {/* Active Pathway Detail Card */}
        <div className="glass-panel pathway-detail-card">
          <div className="pathway-detail-header">
            <div>
              <span className="pathway-tag">{tracks[activeTrack].tag}</span>
              <h3 className="pathway-name">{tracks[activeTrack].name}</h3>
            </div>
            <div className="pathway-meta-badges">
              <span className="pathway-meta-pill">DURATION: {tracks[activeTrack].duration}</span>
              <span className="pathway-meta-pill">EQUITY: {tracks[activeTrack].equity}</span>
            </div>
          </div>
          <p className="pathway-desc">{tracks[activeTrack].desc}</p>
          
          <div className="pathway-deliverables-header">Key Protocol Deliverables:</div>
          <div className="pathway-deliverables-grid">
            {tracks[activeTrack].deliverables.map((d, dIdx) => (
              <div key={dIdx} className="pathway-deliverable-item">
                <CheckCircle size={18} className="neon-icon deliverable-icon" />
                <span>{d}</span>
              </div>
            ))}
          </div>

          <div className="pathway-card-footer">
            <button 
              className="cta-primary"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              APPLY FOR THIS TRACK
            </button>
          </div>
        </div>
      </section>

      {/* Select Protocol Deep-Dive Cards */}
      <section id="block-protocols" className="section protocol-cards-section">
        <div className="section-header-centered">
          <div className="eyebrow-tagline-green">// PROTOCOL DIRECTORY</div>
          <h2 className="section-title">Select Incubation Protocol<span className="accent-dot">.</span></h2>
          <p className="section-sub">Direct access to specialized venture acceleration playbooks and governance frameworks.</p>
        </div>

        <div className="incubation-protocol-grid">
          {protocols.map((p, idx) => (
            <div key={idx} className="glass-panel incubation-protocol-card">
              <div className="protocol-card-head">
                <div className="icon-badge">{p.icon}</div>
                <span className="protocol-badge-tag">{p.tag}</span>
              </div>
              <h3 className="protocol-card-title">{p.title}</h3>
              <p className="protocol-card-desc">{p.desc}</p>
              <div className="protocol-card-meta">{p.meta}</div>
              <button 
                className="cta-secondary protocol-action-btn"
                onClick={() => navigateTo(p.route)}
              >
                <span>INITIALIZE PROTOCOL</span>
                <ArrowRight size={16} className="neon-icon" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Incubation Portfolio Explorer */}
      <section id="block-portfolio" className="section portfolio-explorer-section">
        <div className="section-header-centered">
          <div className="eyebrow-tagline-green">// PROVEN DEPLOYMENTS</div>
          <h2 className="section-title">Portfolio Cohort Milestones<span className="accent-dot">.</span></h2>
        </div>

        <div className="portfolio-tabs-row">
          {portfolio.map((p, idx) => (
            <button
              key={idx}
              className={`portfolio-tab-btn ${activePortco === idx ? 'active' : ''}`}
              onClick={() => setActivePortco(idx)}
            >
              <span className="portco-tab-name">{p.name}</span>
              <span className="portco-tab-stage">{p.stage}</span>
            </button>
          ))}
        </div>

        <div className="glass-panel portfolio-active-card">
          <div className="portfolio-card-grid">
            <div>
              <div className="portfolio-meta-row">
                <span className="portfolio-cohort-badge">Cohort {portfolio[activePortco].cohort}</span>
                <span className="portfolio-stage-badge">{portfolio[activePortco].stage} Stage</span>
              </div>
              <h3 className="portfolio-headline">{portfolio[activePortco].headline}</h3>
              <p className="portfolio-result">{portfolio[activePortco].result}</p>
            </div>
            <div className="portfolio-metric-box">
              <span className="portfolio-metric-label">Key Growth Metric</span>
              <div className="portfolio-metric-value accent-highlight">{portfolio[activePortco].metric}</div>
              <span className="portfolio-metric-verified">✓ Telemetry Verified</span>
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

                {contactError && (
                  <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '0.75rem', fontFamily: 'monospace' }}>
                    {contactError}
                  </div>
                )}
                <button type="submit" className="cta-primary contact-submit-btn" disabled={contactLoading}>
                  {contactLoading ? 'TRANSMITTING...' : 'INITIALIZE PROTOCOL'}
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