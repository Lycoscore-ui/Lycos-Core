import { useState } from 'react';
import { CheckCircle, TrendingUp, Shield, Zap, Link as LinkIcon, BarChart3 } from 'lucide-react';
import LinkedInConnect from './LinkedInConnect';

const services = [
  {
    icon: <LinkIcon size={20} className="neon-icon" />,
    title: 'Systems Integration and Unification',
    summary: 'Eliminate operational fragmentation and low-latency pipeline drag across your core stack.',
    detail: 'We synthesize your CRM, ERP, finance, and operational architectures into a unified, low-latency data fabric—eliminating manual exports, redundant data entry, and systemic reporting latency across your enterprise.',
    outcomes: ['Unified Data Architecture: Real-time synchronization across all operational verticals.', 'Zero Manual Friction: Total elimination of legacy reporting and copy-paste workflows.', 'Executive Telemetry: High-fidelity, real-time command dashboards designed for decisive decision-making.'],
  },
  {
    icon: <Zap size={20} className="neon-icon" />,
    title: 'High-Velocity Workflow Automation',
    summary: 'Automate administrative friction to redirect human capital toward high-yield execution.',
    detail: 'We isolate high-volume, latency-heavy operational tasks—client onboarding, multi-stage approvals, compliance verification, and data routing—replacing manual friction with autonomous execution engines engineered to run continuously with deterministic precision.',
    outcomes: ['Overhead Reduction: Up to 60% reduction in non-value administrative overhead per operator.', 'Overhead Reduction: Accelerated onboarding and throughput response times across core pipelines.', 'Deterministic Accuracy: Elimination of manual processing errors to systematically mitigate operational risk.'],
  },
  {
    icon: <Shield size={20} className="neon-icon" />,
    title: 'Zero-Trust Cloud Architecture and Compliance',
    summary: 'Scale enterprise infrastructure within zero-trust enclaves built for strict compliance.',
    detail: 'Whether navigating GDPR, SOC 2, or complex sector-specific mandates, we engineer zero-trust cloud enclaves hardened by default—providing leadership with an unassailable infrastructure engineered for friction-free global scale.',
    outcomes: ['Automated Governance: Immutable audit trails and real-time data lineage integrated into core infrastructure.', 'Regulatory Alignment: Hardened architectures pre-configured for complex global compliance mandates.', 'Proactive Risk Mitigation: Continuous threat isolation designed to safeguard enterprise capital and operational reputation.'],
  },
  {
    icon: <BarChart3 size={20} className="neon-icon" />,
    title: 'Predictive Data Strategy and Intelligence',
    summary: 'Convert passive data telemetry into real-time operational foresight and executive signal.',
    detail: 'Unstructured organizational data holds critical operational value. We engineer low-latency architectures to ingest, structure, and synthesize your data streams into live telemetry and predictive models—transitioning executive leadership from reactive oversight to proactive foresight.',
    outcomes: ['Command Dashboards: Real-time KPI visibility engineered for key operational decision-makers.', 'Predictive Telemetry: Automated forecasting models isolating demand fluctuations, pipeline velocity, and risk vectors.', 'Competitive Asymmetry: High-fidelity, data pipelines that turn raw intelligence into market execution velocity.'],
  },
];

const outcomes = [
  { target: 60, isPercent: true, suffix: '%', label: 'Reduction in Manual Operational Overhead', icon: <TrendingUp size={20} className="neon-icon" /> },
  { target: 3, isPercent: false, suffix: '×', label: 'Acceleration in Reporting and Intelligence Cycles', icon: <Zap size={20} className="neon-icon" /> },
  { target: 99.9, isPercent: true, suffix: '%', label: 'Uptime SLA Across Deployed Integrations', icon: <Shield size={20} className="neon-icon" /> },
  { target: 90, isPercent: false, suffix: ' Days', label: 'Average Time to Initial Measurable ROI', icon: <CheckCircle size={20} className="neon-icon" /> },
];

const integrations = [
  'Salesforce', 'HubSpot', 'SAP', 'Microsoft 365', 'Slack', 'Snowflake',
  'Stripe', 'Enterprise ERP and Accounting Systems', 'AWS / Azure / GCP', 'Google Workspace',
];

const steps = [
  { num: '01', title: 'Infrastructure Audit and Mapping', focus: 'Map existing data pipelines, isolate operational friction, and calculate baseline efficiency vectors.', desc: 'We map your current data pipelines, isolate operational friction, and calculate the cost of inefficiency prior to architectural deployment.' },
  { num: '02', title: 'Architecture and Systems Design', focus: 'Construct custom technical roadmaps optimized strictly for high-yield operational targets.', desc: 'We construct a custom technical roadmap optimized strictly for your high-yield operational targets, free from proprietary vendor bias.' },
  { num: '03', title: 'Deployment and Systemic Integration', focus: 'Engineer, integrate, and validate with zero downtime or operational disruption.', desc: 'We engineer, integrate, and validate—delivering a production-ready infrastructure with zero downtime or operational disruption.' },
  { num: '04', title: 'Continuous Telemetry and Optimization', focus: 'Benchmark system health, monitor quantitative yield metrics, and continuously iterate.', desc: 'Post-deployment, we benchmark system health, monitor quantitative performance metrics, and iterate to ensure compounding operational yield.' },
];

export default function TechServicesSection() {
  const [activeService, setActiveService] = useState(0);
  
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
      <section id="tech-services-hero" className="section hero-fullscreen-section">
        <div className="hero-grid">
          <div>
            <div className="eyebrow-tagline-green">
              // HIGH-YIELD OPERATIONAL INTEGRATION
            </div>
            <h1 className="hero-heading">
              Engineer the Infrastructure Your Scale Demands<span className="brand-dot">.</span>
            </h1>
            
            <div className="hero-tags-row">
              {['Systems Integration', 'Workflow Automation', 'Zero-Trust Enclaves'].map((tag, tIdx) => (
                <span key={tIdx} className="hero-pill-badge">
                  {tag}
                </span>
              ))}
            </div>

            <p className="hero-body-copy">
              Most enterprises attempt to scale atop fragile, fragmented software architectures. Lycos Core replaces systemic inertia with an integrated, automated, and secure operational foundation—enabling teams to execute faster, leadership to command clear foresight, and operations to maximize ROI.
            </p>
            
            <div className="subpage-hero-cta-row">
              <button 
                className="cta-primary" 
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                INITIALIZE DISCOVERY PROTOCOL
              </button>
              <button 
                className="cta-secondary" 
                onClick={() => {
                  const el = document.getElementById('block-services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                EXPLORE ENTERPRISE YIELD
              </button>
            </div>
          </div>

          {/* Right Hero Baseline Gauge Widget matching Gold-Standard */}
          <div className="hero-gauge-wrapper">
            <div className="baseline-card hero-gauge-card">
              <span className="hero-gauge-tag">
                // SYSTEM SYNTHESIS ACTIVE
              </span>
              
              <div className="hero-gauge-svg-container">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8CFF32" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="0.25" strokeLinecap="round" />
                </svg>
                <div className="hero-gauge-number-wrap">
                  <span className="count-up-trigger stat-metric" data-target="99.9" data-percent="true">99.9%</span>
                </div>
              </div>

              {/* Metric Label Strictly Underneath */}
              <span className="hero-gauge-label">
                Uptime Reliability Index
              </span>

              <div className="hero-gauge-status">
                <CheckCircle size={16} className="neon-icon" /> Zero Data Fragmentation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Below-the-Fold Section: Outcome Stats and Solutions */}
      <section id="block-services" className="section">
        {/* Outcome Stats */}
        <div className="outcome-stats-grid">
          {outcomes.map((o, idx) => (
            <div key={idx} className="baseline-card outcome-stat-card">
              <div className="count-up-trigger stat-metric" data-target={o.target} data-percent={o.isPercent} style={{ color: '#8ce63f', fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-title)' }}>
                {o.target}{o.suffix}
              </div>
              <div className="stat-label" style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{o.label}</div>
            </div>
          ))}
        </div>

        {/* Service Selector */}
        <div>
          <div className="section-header-center">
            <h2 className="section-title">
              Engineered <span className="brand-dot">Solutions.</span>
            </h2>
            <p className="section-desc">
              Custom-engineered enterprise deployments designed to bridge system fragmentation, automate high-velocity workflows, and secure infrastructure under zero-trust protocols.
            </p>
          </div>
          <div className="services-split-grid">
            <div className="services-nav-list">
              {services.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveService(idx)}
                  className={`baseline-card service-nav-btn ${activeService === idx ? 'active' : ''}`}
                >
                  <div className="service-title-wrap">
                    <div className="icon-badge">{s.icon}</div>
                    <span className="service-title-text">{s.title}</span>
                  </div>
                  <div className="service-summary-text">{s.summary}</div>
                </button>
              ))}
            </div>
            <div className="baseline-card service-detail-panel">
              <div>
                <div className="service-icon-badge">
                  <div className="icon-badge">{services[activeService].icon}</div>
                </div>
                <h4 className="service-heading">{services[activeService].title}</h4>
                <p className="service-desc">{services[activeService].detail}</p>
              </div>
              <div className="service-impact-divider">
                <div className="service-impact-title">SYSTEMIC IMPACT</div>
                <div className="service-impact-list">
                  {services[activeService].outcomes.map((o, i) => (
                    <div key={i} className="service-impact-item">
                      <CheckCircle size={16} className="neon-icon" /> {o}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Panel */}
      <section className="section">
        <div className="baseline-card integrations-panel">
          <div className="integrations-header">
            <div>
              <div className="integrations-eyebrow">ARCHITECTURAL COMPATIBILITY</div>
              <h3 className="integrations-title">
                Seamless Interoperability Across Your Existing Stack<span className="brand-dot">.</span>
              </h3>
            </div>
            <div className="integrations-subtext">
              Zero rip-and-replace required. We interface directly with your existing infrastructure to optimize speed, security, and data throughput.
            </div>
          </div>
          <div className="integrations-tags">
            {integrations.map((name, idx) => (
              <span key={idx} className="integration-chip">
                {name}
              </span>
            ))}
            <span className="integration-chip-custom">
              + Proprietary and Custom Stacks
            </span>
          </div>
        </div>
      </section>

      {/* 4 Horizontal Glass Step Cards Deployment Protocol */}
      <section className="section">
        <div className="section-header-center">
          <h2 className="section-title">
            Deployment <span className="brand-dot">Protocol.</span>
          </h2>
          <p className="section-desc">
            A rigorous, end-to-end execution path that transitions complex enterprise systems from initial audit to production-grade deployment with zero operational downtime.
          </p>
        </div>

        <div className="framework-4col-grid">
          {steps.map((s, idx) => (
            <div key={idx} className="baseline-card framework-step-card-body">
              <span className="step-number">{s.num}</span>
              <h3 className="step-heading">{s.title}</h3>
              <p className="step-focus">
                <strong className="step-focus-strong">Focus:</strong> {s.focus}
              </p>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
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