import { useState } from 'react';
import { CheckCircle2, Cpu, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useRegion } from '../context/RegionContext';

export default function ProtocolKinetic() {
  const { country } = useRegion();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    founderName: '',
    companyName: '',
    modelArchitecture: '',
    currentTraction: '',
    codeRepo: '',
  });

  const stats = [
    { value: '6', label: 'Month engagement horizon' },
    { value: '15-25%', label: 'Equity alignment' },
    { value: `${country.symbol}500K`, label: 'Co-investment (milestone-gated)' },
    { value: '1', label: 'Embedded engineering unit deployed' },
  ];

  const pillars = [
    {
      tag: '01 // ZERO-TRUST DATA ARCHITECTURE',
      title: 'Data Security and Privacy',
      body: 'Data pipeline security, vector database indexing, privacy enclaves, and SOC2/HIPAA compliance readiness to satisfy strict enterprise requirements.',
    },
    {
      tag: '02 // MODEL and INFERENCE ORCHESTRATION',
      title: 'Optimization and Cost Control',
      body: 'Latency optimization, custom fine-tuning, token cost reduction, and fail-safe routing designed for mission-critical production reliability.',
    },
    {
      tag: '03 // ENTERPRISE INTERFACE and UI/UX',
      title: 'High-Performance Design',
      body: 'High-performance, clinical software interfaces designed for rapid operator onboarding, high user retention, and enterprise buyer adoption.',
    },
  ];

  const phases = [
    {
      tag: 'PHASE 01 // MONTHS 1-2',
      title: 'Ingestion and System Architecture',
      body: 'Audit problem space, establish vector and data pipelines, and codify core agentic workflows.',
    },
    {
      tag: 'PHASE 02 // MONTHS 3-4',
      title: 'Production Build and Hardening',
      body: 'Deploy functional MVP into live enterprise sandboxes, execute load/stress testing, and secure the perimeter.',
    },
    {
      tag: 'PHASE 03 // MONTHS 5-6',
      title: 'Enterprise GTM and Capital Routing',
      body: 'Initiate buyer design partner pilots, calibrate institutional data room, and route to seed venture syndicates.',
    },
  ];

  const deliverables = [
    'Embedded Technical Unit',
    'Enterprise GTM Protocol',
    'Institutional Capital Access',
    `Co-Investment Capital (Up to ${country.symbol}500K milestone-gated)`,
  ];

  const faqs = [
    {
      q: 'IP Ownership mechanics?',
      a: '100% retained by founder. Lycos Core operates as a technical builder; we do not claim any intellectual property ownership or carve-outs on code engineered for your platform during the pathway timeline.',
    },
    {
      q: 'How Kinetic differs from accelerators?',
      a: 'Accelerators typically focus on advisory services, pitch decks, and general mentoring. Kinetic is an active technical co-building initiative. We deploy dedicated, full-stack AI engineering units directly into your codebase to build and harden production systems.',
    },
    {
      q: `How ${country.symbol}500K co-investment is allocated?`,
      a: `The co-investment capital of up to ${country.symbol}500K is milestone-gated. As you hit key engineering and architecture milestones over the 6-month timeline, syndicate funds are dynamically unlocked and routed to your corporate account.`,
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.founderName && formData.companyName) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ founderName: '', companyName: '', modelArchitecture: '', currentTraction: '', codeRepo: '' });
      }, 4000);
    }
  };

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <>
      {/* Hero — fullscreen above-the-fold */}
      <section id="kinetic-hero" className="section hero-fullscreen-section">
        <div className="hero-grid">
          <div>
            <div className="eyebrow-tagline-green">
              // INCUBATION PROTOCOL // SEED AND PRE-SEED
            </div>
            <h1 className="hero-heading">
              Protocol: Kinetic<span className="brand-dot">.</span>
            </h1>

            <div className="hero-tags-row">
              {['Seed and Pre-Seed', 'Co-Building', '6-Month Horizon'].map((tag, i) => (
                <span key={i} className="hero-pill-badge">{tag}</span>
              ))}
            </div>

            <p className="hero-body-copy">
              From Zero-State Architecture to Production-Grade Enterprise Reality. We deploy embedded engineering units directly into your core team to eliminate infrastructure debt, harden vector and model pipelines, and accelerate early enterprise buyer deployment.
            </p>

            <div className="subpage-hero-cta-row">
              <button className="cta-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                INITIALIZE PROTOCOL
              </button>
              <button className="cta-secondary" onClick={() => document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' })}>
                VIEW ROADMAP
              </button>
            </div>
          </div>

          <div className="hero-gauge-wrapper">
            <div className="baseline-card hero-gauge-card">
              <span className="hero-gauge-tag">// PATHWAY 01 // SEED AND PRE-SEED</span>
              <div className="hero-gauge-svg-container">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8CFF32" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="0" strokeLinecap="round" />
                </svg>
                <div className="hero-gauge-number-wrap">
                  <span className="stat-metric">6mo</span>
                </div>
              </div>
              <span className="hero-gauge-label">Engagement Horizon</span>
              <div className="hero-gauge-status">
                <CheckCircle2 size={16} className="neon-icon" /> Systems Fully Operational
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Below-fold — Stats + Content */}
      <section className="protocol-content-section">
        {/* Stats Strip */}
        <div className="who-stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="glass-panel who-stat-card">
              <div className="who-stat-value">{s.value}</div>
              <div className="who-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Thesis */}
        <div className="glass-panel who-territory-card">
          <div>
            <div className="eyebrow-tagline">// OPERATIONAL THESIS</div>
            <h3 className="service-heading who-territory-heading">
              The Bottleneck Isn't Ideation. Engineering Production Velocity in a High-Noise Market<span className="brand-dot">.</span>
            </h3>
            <p className="hero-body-copy who-body-copy-flush">
              Most seed-stage AI startups fail at the infrastructure layer—struggling with token costs, latency spikes, brittle prototype code, and complex data governance. We eliminate technical debt before it forms by deploying full-stack engineering units alongside your team to construct zero-trust, enterprise-ready architectures from day zero.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="who-unit-section-block">
          <div className="eyebrow-tagline">// TECHNICAL ARCHITECTURE BREAKDOWN</div>
          <h3 className="service-heading">Modular Build Layers. Zero Compromise<span className="brand-dot">.</span></h3>
          <div className="protocol-disciplines-grid-3">
            {pillars.map((p, i) => (
              <div key={i} className="glass-panel who-discipline-card">
                <div className="icon-badge"><Cpu size={20} className="neon-icon" /></div>
                <div>
                  <div className="eyebrow-tagline">{p.tag}</div>
                  <h4 className="who-discipline-title">{p.title}</h4>
                  <p className="who-discipline-description">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <div id="roadmap" className="who-unit-section-block">
          <div className="eyebrow-tagline">// EXECUTION ROADMAP</div>
          <h3 className="service-heading">Three Phases. Six Months. Zero Drift<span className="brand-dot">.</span></h3>
          <div className="protocol-disciplines-grid-3">
            {phases.map((ph, i) => (
              <div key={i} className="glass-panel who-discipline-card">
                <div>
                  <div className="eyebrow-tagline">{ph.tag}</div>
                  <h4 className="who-discipline-title">{ph.title}</h4>
                  <p className="who-discipline-description">{ph.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div className="glass-panel who-territory-card">
          <div>
            <div className="eyebrow-tagline">// PROGRAMME DELIVERABLES</div>
            <h3 className="service-heading who-territory-heading">What You Walk Away With<span className="brand-dot">.</span></h3>
          </div>
          <div className="who-credentials-list">
            {deliverables.map((d, i) => (
              <div key={i} className="who-credential-item">
                <CheckCircle size={16} className="neon-icon who-credential-icon" />
                <span className="who-credential-text">{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="who-unit-section-block">
          <div className="eyebrow-tagline">// PROTOCOL TELEMETRY and FAQS</div>
          <h3 className="service-heading">Common Questions<span className="brand-dot">.</span></h3>
          <div className="faq-accordion">
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <button className="faq-question-btn" onClick={() => toggleFaq(idx)}>
                  <span>{faq.q}</span>
                  {activeFaq === idx ? <ChevronUp size={18} className="neon-icon" /> : <ChevronDown size={18} className="neon-icon" />}
                </button>
                {activeFaq === idx && <div className="faq-answer">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section hero-fullscreen-section">
        <div className="contact-grid">
          <div className="glass-panel contact-card">
            <h3 className="service-heading">Initialize Protocol: Kinetic<span className="brand-dot">.</span></h3>
            {formSubmitted ? (
              <div className="hero-gauge-status">
                <CheckCircle2 size={48} className="neon-icon" />
                <h4>Protocol Initialized</h4>
                <p>Your technical submission has been received. Our systems unit will reach out to analyze your codebase architecture.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div>
                  <label className="contact-label">Founder Name</label>
                  <input type="text" name="founderName" required value={formData.founderName} onChange={handleInputChange} className="contact-input" placeholder="e.g. Dr. Helen Vance" />
                </div>
                <div>
                  <label className="contact-label">Company Name</label>
                  <input type="text" name="companyName" required value={formData.companyName} onChange={handleInputChange} className="contact-input" placeholder="e.g. SentryFlow" />
                </div>
                <div>
                  <label className="contact-label">Link to Code Repo or Demo</label>
                  <input type="text" name="codeRepo" value={formData.codeRepo} onChange={handleInputChange} className="contact-input" placeholder="e.g. github.com/sentryflow" />
                </div>
                <div>
                  <label className="contact-label">Model Architecture Description</label>
                  <textarea name="modelArchitecture" value={formData.modelArchitecture} onChange={handleInputChange} className="contact-textarea" placeholder="Briefly describe your foundation model base, parameters, or vector pipelines." />
                </div>
                <div>
                  <label className="contact-label">Current Traction / Milestones</label>
                  <textarea name="currentTraction" value={formData.currentTraction} onChange={handleInputChange} className="contact-textarea" placeholder="Summarize validation results, client pilots, or active metrics." />
                </div>
                <button type="submit" className="cta-primary contact-submit-btn">INITIALIZE INCUBATION PROTOCOL</button>
              </form>
            )}
          </div>

          <div className="hero-gauge-wrapper">
            <div className="contact-card">
              <h3 className="hero-heading">Deploy Direct Technical Capital<span className="brand-dot">.</span></h3>
              <p className="hero-body-copy">
                Begin technical co-building alignment. Our embedded engineering units operate directly inside your codebase to eliminate infrastructure debt and accelerate production deployment.
              </p>
              <div className="hero-gauge-status">
                <a href="https://www.linkedin.com/company/lycos-core" target="_blank" rel="noopener noreferrer" className="neon-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="#8CFF32">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
