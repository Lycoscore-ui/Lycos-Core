import { useState } from 'react';
import { CheckCircle2, Workflow, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useRegion } from '../context/RegionContext';

export default function ProtocolApex() {
  const { country } = useRegion();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    executiveName: '',
    ventureName: '',
    currentArr: '',
    gtmBottleneck: '',
    targetSeriesADate: '',
  });

  const stats = [
    { value: '9', label: 'Month engagement horizon' },
    { value: '8-15%', label: 'Equity alignment' },
    { value: `${country.symbol}250K+`, label: 'ARR entry threshold' },
    { value: '1', label: 'Series A capitalization target' },
  ];

  const pillars = [
    {
      tag: '01 // REVOPS and TELEMETRY INFRASTRUCTURE',
      title: 'Pipeline Telemetry',
      body: 'Production-grade CRM pipeline architecture, automated forecasting, usage-based billing telemetry, and real-time ACV/NDR analytics.',
    },
    {
      tag: '02 // ENTERPRISE PROCUREMENT NAVIGATION',
      title: 'Procurement and MSAs',
      body: 'Security questionnaire automation, standardized legal MSA/SLA frameworks, enterprise tier pricing, and vendor risk clearance protocols.',
    },
    {
      tag: '03 // SYNDICATE CAPITALIZATION ENGINE',
      title: 'Capital Strategy',
      body: 'Financial model auditing, cohort analysis, institutional data-room engineering, and targeted Series A LP/VC mapping models.',
    },
  ];

  const phases = [
    {
      tag: 'PHASE 01 // MONTHS 1-3',
      title: 'Pipeline Diagnostics and Playbook Construction',
      body: 'Audit current sales pipeline, establish CRM tracking standards, and draft enterprise sales playbooks.',
    },
    {
      tag: 'PHASE 02 // MONTHS 4-6',
      title: 'Contract Velocity and Network Route',
      body: 'Automate procurement security answers, clear vendor risk hurdles, and activate warm routes into Lycos buyer networks.',
    },
    {
      tag: 'PHASE 03 // MONTHS 7-9',
      title: 'Series A Capitalization Run',
      body: 'Harden financial models, assemble secure institutional data rooms, and launch targeted Series A capitalization campaigns.',
    },
  ];

  const deliverables = [
    'RevOps System Setup and CRM Telemetry',
    'Procurement and Deal Structuring Playbooks',
    'Warm Buyer Introductions and Channel Routing',
    'Series A Syndicate LP/VC Investor Mapping',
  ];

  const faqs = [
    {
      q: 'What are the $250K ARR entry requirements?',
      a: 'We require a verified run-rate of $250K+ ARR. This demonstrates initial product-market validation and ensures that our revenue engineering mechanisms can immediately be applied to scaling, rather than discovering initial customer demand.',
    },
    {
      q: 'Does Apex assist directly with enterprise deal closure?',
      a: 'Yes. Our senior corporate developers and advisors embed within your pipeline to navigate procurement hurdles, security reviews, and MSA/SLA negotiations, accelerating time-to-close by up to 60%.',
    },
    {
      q: 'What does the Series A capitalization protocol involve?',
      a: 'We build your institutional data room from scratch—auditing financial models, preparing cohort analyses, and structuring mapping matrices to align your venture with the exact investment thesis of top-tier Series A venture capital firms.',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.executiveName && formData.ventureName) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ executiveName: '', ventureName: '', currentArr: '', gtmBottleneck: '', targetSeriesADate: '' });
      }, 4000);
    }
  };

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <>
      {/* Hero — fullscreen above-the-fold */}
      <section id="apex-hero" className="section hero-fullscreen-section">
        <div className="hero-grid">
          <div>
            <div className="eyebrow-tagline-green">
              // INCUBATION PROTOCOL // SERIES A AND SCALE
            </div>
            <h1 className="hero-heading">
              Protocol: Apex<span className="brand-dot">.</span>
            </h1>

            <div className="hero-tags-row">
              {['Series A Readiness', 'RevOps Engine', '9-Month Horizon'].map((tag, i) => (
                <span key={i} className="hero-pill-badge">{tag}</span>
              ))}
            </div>

            <p className="hero-body-copy">
              Systemic Revenue Engineering for Scaling Enterprise Operations. Protocol: Apex equips post-revenue AI ventures with high-velocity GTM engines and RevOps telemetry to compress procurement cycles and command top-tier Series A valuation multiples.
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
              <span className="hero-gauge-tag">// PATHWAY 02 // SERIES A READINESS</span>
              <div className="hero-gauge-svg-container">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8CFF32" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="63" strokeLinecap="round" />
                </svg>
                <div className="hero-gauge-number-wrap">
                  <span className="stat-metric">9mo</span>
                </div>
              </div>
              <span className="hero-gauge-label">Engagement Horizon</span>
              <div className="hero-gauge-status">
                <CheckCircle2 size={16} className="neon-icon" /> Revenue Stage Verified
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
              Initial Traction Isn't Scalability. Transitioning from Founder-Led Sales to Systemic Engine Mechanics<span className="brand-dot">.</span>
            </h3>
            <p className="hero-body-copy who-body-copy-flush">
              Generating early revenue proves market demand; scaling it requires institutional architecture. Post-revenue AI ventures often hit performance plateaus due to elongated procurement cycles, fragmented sales workflows, and informal pipeline tracking. Protocol: Apex replaces ad-hoc selling with automated RevOps telemetry, standardized enterprise playbooks, and direct routing into institutional buyer networks.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="who-unit-section-block">
          <div className="eyebrow-tagline">// HARDENED REVENUE INFRASTRUCTURE</div>
          <h3 className="service-heading">Three Revenue Pillars. One Scalable Engine<span className="brand-dot">.</span></h3>
          <div className="protocol-disciplines-grid-3">
            {pillars.map((p, i) => (
              <div key={i} className="glass-panel who-discipline-card">
                <div className="icon-badge"><Workflow size={20} className="neon-icon" /></div>
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
          <h3 className="service-heading">Three Phases. Nine Months. Series A Ready<span className="brand-dot">.</span></h3>
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
            <h3 className="service-heading">Initialize Protocol: Apex<span className="brand-dot">.</span></h3>
            {formSubmitted ? (
              <div className="hero-gauge-status">
                <CheckCircle2 size={48} className="neon-icon" />
                <h4>Protocol Initialized</h4>
                <p>Your venture submission has been received. Our revenue operations lead will contact you to perform a telemetry audit.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div>
                  <label className="contact-label">Executive Name</label>
                  <input type="text" name="executiveName" required value={formData.executiveName} onChange={handleInputChange} className="contact-input" placeholder="e.g. Marcus Vance" />
                </div>
                <div>
                  <label className="contact-label">Venture Name</label>
                  <input type="text" name="ventureName" required value={formData.ventureName} onChange={handleInputChange} className="contact-input" placeholder="e.g. OmniCore" />
                </div>
                <div>
                  <label className="contact-label">Current ARR ($250K+)</label>
                  <input type="text" name="currentArr" required value={formData.currentArr} onChange={handleInputChange} className="contact-input" placeholder="e.g. $420,000" />
                </div>
                <div>
                  <label className="contact-label">ACV and Primary GTM Bottleneck</label>
                  <textarea name="gtmBottleneck" value={formData.gtmBottleneck} onChange={handleInputChange} className="contact-textarea" placeholder="State your average contract value and specify roadblocks." />
                </div>
                <div>
                  <label className="contact-label">Target Series A Date</label>
                  <input type="text" name="targetSeriesADate" value={formData.targetSeriesADate} onChange={handleInputChange} className="contact-input" placeholder="e.g. Q4 2026" />
                </div>
                <button type="submit" className="cta-primary contact-submit-btn">INITIALIZE INCUBATION PROTOCOL</button>
              </form>
            )}
          </div>

          <div className="hero-gauge-wrapper">
            <div className="contact-card">
              <h3 className="hero-heading">Initialize Revenue Diagnostics<span className="brand-dot">.</span></h3>
              <p className="hero-body-copy">
                Initialize revenue diagnostics and Series A readiness protocol. Our senior operators embed within your pipeline to compress procurement cycles and route directly into institutional capital networks.
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
