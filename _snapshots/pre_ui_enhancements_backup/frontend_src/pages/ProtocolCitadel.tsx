import { useState } from 'react';
import { CheckCircle2, Shield, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function ProtocolCitadel() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    orgName: '',
    execLead: '',
    ipOverview: '',
    commercialObjective: '',
    corpDevTimeline: '',
  });

  const stats = [
    { value: '12', label: 'Month engagement horizon' },
    { value: 'Custom', label: 'Bespoke equity alignment' },
    { value: '100%', label: 'IP firewall protection' },
    { value: '1', label: 'Independent board and entity' },
  ];

  const pillars = [
    {
      tag: '01 // IP CARVE-OUT and REGULATORY FIREWALLS',
      title: 'Risk Isolation',
      body: 'Risk isolation blueprints, regulatory partition mapping, legal entity separation, and comprehensive codebase intellectual property audits.',
    },
    {
      tag: '02 // VENTURE GOVERNANCE and CAP TABLE ENGINEERING',
      title: 'Clean Governance',
      body: 'Structured spin-out cap table modeling, corporate parent equity allocations, key management option pools, and independent entity board configurations.',
    },
    {
      tag: '03 // EXECUTIVE TALENT DEPLOYMENT',
      title: 'Leadership Sourcing',
      body: 'Venture-grade CEO and CTO search, candidate pipelines, alignment workshops, and founding management option pool routing structures.',
    },
  ];

  const phases = [
    {
      tag: 'PHASE 01 // MONTHS 1-3',
      title: 'IP Assessment and Feasibility',
      body: 'Audit internal codebase, verify patent/IP landscapes, map regulatory boundaries, and model standalone market potential.',
    },
    {
      tag: 'PHASE 02 // MONTHS 4-6',
      title: 'Structuring and Leadership',
      body: 'Define spin-out equity splits, establish clean corporate legal structures, and secure dedicated venture CEO/CTO leadership.',
    },
    {
      tag: 'PHASE 03 // MONTHS 7-9',
      title: 'Technical and Brand Separation',
      body: 'Fork the codebase into isolated developer architectures, implement security boundary firewalls, and launch standalone branding.',
    },
    {
      tag: 'PHASE 04 // MONTHS 10-12',
      title: 'Capitalization and Scaling',
      body: 'Compile the spin-out data room, map institutional syndicate leads, and close external venture capitalization rounds.',
    },
  ];

  const deliverables = [
    'IP Audits and Clean Carve-Out Firewalls',
    'Corporate Spin-out Entity Formation',
    'Venture Leadership Sourcing and Placement',
    'Third-Party Capitalization and LP/VC Syndication',
  ];

  const faqs = [
    {
      q: "How is the parent enterprise's core business protected?",
      a: "We implement risk-isolated structural firewalls, IP licensing agreements, and clean corporate regulatory separation. This ensures the spin-out operates as an independent entity, preventing any legal or security liabilities from impacting the parent business.",
    },
    {
      q: 'How is executive leadership (CEO/CTO) sourced?',
      a: 'We conduct a targeted venture-grade search, leveraging our private talent network to recruit experienced founders and operators who possess deep industry expertise and a track record of scaling high-growth ventures.',
    },
    {
      q: 'What are the typical equity split models?',
      a: "Equity splits are custom and bespoke. They are designed to balance the parent corporation's IP contribution, the new executive team's operational incentives, and the requirements of incoming venture capital partners.",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.orgName && formData.execLead) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ orgName: '', execLead: '', ipOverview: '', commercialObjective: '', corpDevTimeline: '' });
      }, 4000);
    }
  };

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <>
      {/* Hero — fullscreen above-the-fold */}
      <section id="citadel-hero" className="section hero-fullscreen-section">
        <div className="hero-grid">
          <div>
            <div className="eyebrow-tagline-green">
              // INCUBATION PROTOCOL // ENTERPRISE SPIN-OUTS
            </div>
            <h1 className="hero-heading">
              Protocol: Citadel<span className="brand-dot">.</span>
            </h1>

            <div className="hero-tags-row">
              {['Enterprise Spin-Outs', 'IP Carve-Out', '12-Month Horizon'].map((tag, i) => (
                <span key={i} className="hero-pill-badge">{tag}</span>
              ))}
            </div>

            <p className="hero-body-copy">
              Transforming Trapped Enterprise Technology into High-Yield Standalone Ventures. Protocol: Citadel governs the complete spin-out lifecycle for enterprise-developed AI capabilities — from IP carve-out to independent board formation and institutional capitalization.
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
              <span className="hero-gauge-tag">// PATHWAY 03 // ENTERPRISE SPIN-OUTS</span>
              <div className="hero-gauge-svg-container">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8CFF32" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="0" strokeLinecap="round" />
                </svg>
                <div className="hero-gauge-number-wrap">
                  <span className="stat-metric">100%</span>
                </div>
              </div>
              <span className="hero-gauge-label">IP Firewall Protection</span>
              <div className="hero-gauge-status">
                <CheckCircle2 size={16} className="neon-icon" /> Risk Firewall Active
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
              Unlocking Trapped Value. Commercializing Internal IP Without Distracting the Core Business<span className="brand-dot">.</span>
            </h3>
            <p className="hero-body-copy who-body-copy-flush">
              Large enterprises frequently build groundbreaking internal AI technologies that stall due to corporate bureaucracy, shifting internal priorities, or risk aversion. Protocol: Citadel provides the structural firewall, corporate development expertise, and dedicated leadership required to carve out trapped intellectual property and transform it into an autonomous, high-growth venture asset.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="who-unit-section-block">
          <div className="eyebrow-tagline">// INSTITUTIONAL CARVE-OUT ARCHITECTURE</div>
          <h3 className="service-heading">Three Structural Pillars. One Clean Separation<span className="brand-dot">.</span></h3>
          <div className="protocol-disciplines-grid-3">
            {pillars.map((p, i) => (
              <div key={i} className="glass-panel who-discipline-card">
                <div className="icon-badge"><Shield size={20} className="neon-icon" /></div>
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
          <h3 className="service-heading">Four Phases. Twelve Months. Full Independence<span className="brand-dot">.</span></h3>
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
            <h3 className="service-heading">Initialize Protocol: Citadel<span className="brand-dot">.</span></h3>
            {formSubmitted ? (
              <div className="hero-gauge-status">
                <CheckCircle2 size={48} className="neon-icon" />
                <h4>Protocol Initialized</h4>
                <p>Your spin-out registration has been received. Our corporate development unit will schedule an initial IP assessment.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div>
                  <label className="contact-label">Enterprise Organization Name</label>
                  <input type="text" name="orgName" required value={formData.orgName} onChange={handleInputChange} className="contact-input" placeholder="e.g. Lycos Core Corp" />
                </div>
                <div>
                  <label className="contact-label">Executive Lead Name and Title</label>
                  <input type="text" name="execLead" required value={formData.execLead} onChange={handleInputChange} className="contact-input" placeholder="e.g. Elizabeth Chen, VP of Corp Dev" />
                </div>
                <div>
                  <label className="contact-label">Internal IP / Technology Overview</label>
                  <textarea name="ipOverview" value={formData.ipOverview} onChange={handleInputChange} className="contact-textarea" placeholder="Briefly describe the internal software tool, algorithm, or data pipeline model you are seeking to carve out." />
                </div>
                <div>
                  <label className="contact-label">Primary Commercial Objective</label>
                  <input type="text" name="commercialObjective" value={formData.commercialObjective} onChange={handleInputChange} className="contact-input" placeholder="e.g. Build external SaaS business model" />
                </div>
                <div>
                  <label className="contact-label">Corporate Development Timeline</label>
                  <input type="text" name="corpDevTimeline" value={formData.corpDevTimeline} onChange={handleInputChange} className="contact-input" placeholder="e.g. Launch spin-out in 12 months" />
                </div>
                <button type="submit" className="cta-primary contact-submit-btn">INITIALIZE INCUBATION PROTOCOL</button>
              </form>
            )}
          </div>

          <div className="hero-gauge-wrapper">
            <div className="contact-card">
              <h3 className="hero-heading">Initialize Spin-Out Feasibility<span className="brand-dot">.</span></h3>
              <p className="hero-body-copy">
                Initialize enterprise spin-out feasibility assessment and IP carve-out protocol. Our corporate development unit will conduct a full IP audit and model your standalone market potential.
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
