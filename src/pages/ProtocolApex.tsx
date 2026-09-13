import { submitContactForm } from '../services/contactService';
import { useState } from 'react';
import { BarChart3, FileCheck, Coins, CheckCircle, CheckCircle2, ChevronDown } from 'lucide-react';
import { useRegion } from '../context/RegionContext';
import LinkedInConnect from '../components/LinkedInConnect';

export default function ProtocolApex() {
  const { country } = useRegion();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    executiveName: '',
    email: '',
    ventureName: '',
    currentArr: '',
    commercialModel: '',
    pipelineStage: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const stats = [
    { value: '9mo', label: 'Scale Horizon' },
    { value: '8–15%', label: 'Equity Alignment' },
    { value: `${country.symbol}250K+`, label: 'Minimum Entry ARR' },
    { value: '340%', label: 'Target ARR Acceleration' },
  ];

  const pillars = [
    {
      icon: <BarChart3 size={28} className="neon-icon" />,
      tag: '01 // REVENUE ENGINE & REVOPS',
      title: 'Automated Sales Telemetry',
      body: 'Automated deal qualification pipelines, programmatic buyer outreach, and structured multi-stakeholder contract acceleration telemetry.',
    },
    {
      icon: <FileCheck size={28} className="neon-icon" />,
      tag: '02 // PROCUREMENT & COMPLIANCE',
      title: 'Audit-Ready Security Dossiers',
      body: 'SOC 2, ISO 27001, and HIPAA compliance readiness kits packaged for rapid enterprise security and legal reviews.',
    },
    {
      icon: <Coins size={28} className="neon-icon" />,
      tag: '03 // PRICING & UNIT ECONOMICS',
      title: 'Margin Optimization',
      body: 'Token-cost pass-through pricing, tiered enterprise SLAs, consumption-based billing models, and gross margin optimization.',
    },
  ];

  const phases = [
    {
      phase: 'PHASE 1 (Months 1–3)',
      title: 'RevOps Audit and Packaging',
      body: 'Standardize sales collateral, pricing calculators, security documentation, and inbound qualification pipelines.',
    },
    {
      phase: 'PHASE 2 (Months 4–6)',
      title: 'Enterprise Pipeline Blitz',
      body: 'Deploy structured enterprise sales playbooks across high-value prospect pipelines with dedicated deal architecture support.',
    },
    {
      phase: 'PHASE 3 (Months 7–9)',
      title: 'Series A Institutional Routing',
      body: 'Calibrate growth telemetry, audit retention Cohorts, and route into vetted Tier-1 growth venture syndicates.',
    },
  ];

  const deliverables = [
    'Enterprise RevOps Infrastructure',
    'Procurement & Compliance Fast-Track Kit',
    'Pricing & Margin Optimization Model',
    'Series A Institutional Data Room',
  ];

  const faqs = [
    {
      q: 'What is the target profile for Protocol: Apex?',
      a: `Apex is engineered for AI startups with active market traction and early commercial validation (${country.symbol}250K+ ARR) who need institutional RevOps systems and enterprise sales architecture to scale toward Series A.`,
    },
    {
      q: 'How does Apex accelerate sales velocity?',
      a: 'We eliminate procurement friction by pre-building enterprise-grade compliance dossiers, standardizing MSA frameworks, and optimizing consumption pricing models to compress deal cycles from 6 months down to weeks.',
    },
    {
      q: 'What is the equity structure for Apex?',
      a: 'Apex operates on an 8–15% equity alignment structured against revenue milestones and institutional capital routing, ensuring complete alignment with founding teams.',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.executiveName || !formData.email || !formData.ventureName) return;

    setFormLoading(true);
    setFormError(null);

    const fullMessage = [
      `Venture / Company: ${formData.ventureName}`,
      formData.currentArr ? `Current ARR: ${formData.currentArr}` : '',
      formData.commercialModel ? `Commercial Model: ${formData.commercialModel}` : '',
      formData.pipelineStage ? `Pipeline Stage / Target: ${formData.pipelineStage}` : ''
    ].filter(Boolean).join('\n\n');

    const res = await submitContactForm({
      name: formData.executiveName,
      email: formData.email,
      company: formData.ventureName,
      message: fullMessage,
      serviceContext: 'Protocol: Apex (Scale & Commercialization)'
    });

    setFormLoading(false);
    if (res.success) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ executiveName: '', email: '', ventureName: '', currentArr: '', commercialModel: '', pipelineStage: '' });
      }, 6000);
    } else {
      setFormError(res.error || 'Failed to submit application.');
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
              // INCUBATION PROTOCOL // SCALE & CAPTURE
            </div>
            <h1 className="hero-heading">
              Protocol: Apex<span className="brand-dot">.</span>
            </h1>

            <div className="hero-tags-row">
              {['Scale and Capture', 'RevOps Telemetry', '9-Month Horizon'].map((tag, i) => (
                <span key={i} className="hero-pill-badge">{tag}</span>
              ))}
            </div>

            <p className="hero-body-copy">
              Transitioning from initial traction to institutional revenue engine. We deploy RevOps automation, enterprise procurement playbooks, and margin calibration to accelerate your pathway to Series A.
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

          <div className="proto-hero-visual">
            <div className="proto-visual-card">
              <div className="proto-visual-eyebrow">// APEX // REVENUE ACCELERATION TRAJECTORY</div>
              <div className="apex-chart-area">
                <div className="apex-chart-label-row">
                  <div>
                    <div className="apex-chart-main-val">{country.symbol}2.4M</div>
                    <div className="apex-chart-sub">ARR Target at Exit</div>
                  </div>
                  <div className="apex-chart-trend">↑ +340% ARR Growth</div>
                </div>
                <svg viewBox="0 0 340 80" style={{ width: '100%', height: '80px' }} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="apex-arr-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8ce63f" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#8ce63f" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  <path d="M0,75 C50,70 100,60 140,50 C180,38 240,20 300,8 L340,3 L340,80 L0,80 Z" fill="url(#apex-arr-grad)" />
                  <path d="M0,75 C50,70 100,60 140,50 C180,38 240,20 300,8 L340,3" fill="none" stroke="#8ce63f" strokeWidth="2" />
                  <circle cx="0" cy="75" r="3.5" fill="#8ce63f" />
                  <circle cx="140" cy="50" r="3.5" fill="#8ce63f" />
                  <circle cx="340" cy="3" r="3.5" fill="#8ce63f" />
                </svg>
                <div className="apex-milestones">
                  {[
                    { label: 'Entry: First Enterprise Contract', val: `${country.symbol}250K ARR` },
                    { label: 'Midpoint: Series A Readiness', val: `${country.symbol}900K ARR` },
                    { label: 'Exit: Institutional Placement', val: `${country.symbol}2.4M ARR` },
                  ].map((m, i) => (
                    <div key={i} className="apex-milestone-row">
                      <div className="apex-milestone-dot" />
                      <span className="apex-milestone-label">{m.label}</span>
                      <span className="apex-milestone-val">{m.val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="proto-visual-stats">
                <div className="proto-stat-item">
                  <div className="proto-stat-val">9</div>
                  <div className="proto-stat-lbl">Month Horizon</div>
                </div>
                <div className="proto-stat-item">
                  <div className="proto-stat-val">8–15%</div>
                  <div className="proto-stat-lbl">Equity Alignment</div>
                </div>
                <div className="proto-stat-item">
                  <div className="proto-stat-val">340%</div>
                  <div className="proto-stat-lbl">ARR Growth Target</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="section" style={{ padding: '3rem 0 2rem' }}>
        <div className="outcome-stats-grid subpage-block-container">
          {stats.map((s, i) => (
            <div key={i} className="baseline-card outcome-stat-card">
              <div className="stat-metric">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Thesis */}
      <section className="section" style={{ padding: '2rem 0 4rem' }}>
        <div className="glass-panel outcomes-split-grid subpage-block-container">
          <div>
            <span className="eyebrow-tagline">// OPERATIONAL THESIS</span>
            <h3 className="service-heading" style={{ marginTop: '0.5rem' }}>
              Initial Traction Isn't Scalability. Transitioning from Founder-Led Sales to Systemic Engine Mechanics<span className="brand-dot">.</span>
            </h3>
          </div>
          <div>
            <p className="service-desc" style={{ fontSize: '1rem', lineHeight: '1.7' }}>
              Generating early revenue proves market demand; scaling it requires institutional architecture. Post-revenue AI ventures often hit performance plateaus due to elongated procurement cycles, fragmented sales workflows, and informal pipeline tracking. Protocol: Apex replaces ad-hoc selling with automated RevOps telemetry, standardized enterprise playbooks, and direct routing into institutional buyer networks.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars / Revenue Infrastructure */}
      <section className="section" style={{ padding: '2rem 0 4rem' }}>
        <div className="subpage-block-header">
          <span className="eyebrow-tagline">// HARDENED REVENUE INFRASTRUCTURE</span>
          <h2 className="subpage-block-title">
            Three Revenue <span className="brand-dot">Pillars</span>
          </h2>
          <p className="subpage-block-desc">
            A hardened commercial stack designed to compress sales cycles and institutionalize buyer acquisition.
          </p>
        </div>

        <div className="services-grid-3 subpage-block-container">
          {pillars.map((p, i) => (
            <div key={i} className="glass-panel purple-glow-card service-panel-card">
              <div>
                <div className="service-icon-wrap">
                  <div className="icon-badge">{p.icon}</div>
                </div>
                <span className="protocol-card-tag">{p.tag}</span>
                <h3 className="service-card-title">{p.title}</h3>
                <p className="service-card-desc">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Execution Roadmap / Playbook */}
      <section id="roadmap" className="section" style={{ padding: '2rem 0 4rem' }}>
        <div className="roadmap-section subpage-block-container">
          <div className="section-header-center">
            <span className="eyebrow-tagline">// EXECUTION ROADMAP</span>
            <h2 className="section-title">
              Three Phases. Nine Months. <span className="brand-dot">Institutional Scale.</span>
            </h2>
            <p className="section-desc">
              A phased commercial acceleration program engineered to scale post-revenue AI products into enterprise category leaders.
            </p>
          </div>

          <div className="playbook-grid playbook-grid-3">
            {phases.map((ph, i) => (
              <div key={i} className="glass-panel">
                <span className="playbook-phase-badge">{ph.phase}</span>
                <h4 className="faq-btn-text" style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{ph.title}</h4>
                <p className="service-desc">{ph.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="section" style={{ padding: '2rem 0 4rem' }}>
        <div className="glass-panel outcomes-split-grid subpage-block-container">
          <div>
            <span className="eyebrow-tagline">// PROGRAMME DELIVERABLES</span>
            <h3 className="service-heading" style={{ marginTop: '0.5rem' }}>
              What You Walk Away With<span className="brand-dot">.</span>
            </h3>
            <p className="service-desc" style={{ marginTop: '0.75rem' }}>
              Every Apex cohort venture leaves with institutional RevOps infrastructure, audit-ready compliance kits, and direct Tier-1 syndicate access.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {deliverables.map((d, i) => (
              <div key={i} className="anatomy-item">
                <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" /></div>
                <div>
                  <h4 className="faq-btn-text" style={{ fontSize: '1rem', color: '#fff' }}>{d}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section" style={{ padding: '2rem 0 4rem' }}>
        <div className="faq-container-wide subpage-block-container">
          <div className="section-header-center">
            <span className="eyebrow-tagline">// PROTOCOL PARAMETERS</span>
            <h3 className="section-title">Frequently Asked Questions</h3>
          </div>

          <div className="faq-list-wide">
            {faqs.map((f, i) => (
              <div key={i} className="glass-panel">
                <button onClick={() => toggleFaq(i)} className="faq-btn-wide">
                  <span className="faq-btn-text-wide">{f.q}</span>
                  <ChevronDown size={16} className={`neon-icon transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === i && (
                  <div className="faq-content-wide">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form & Consult */}
      <section id="contact" className="section hero-fullscreen-section" style={{ minHeight: 'auto', padding: '4rem 0 6rem' }}>
        <div className="subpage-contact-grid contact-grid">
          <div className="glass-panel subpage-contact-card">
            <h3 className="subpage-contact-heading">Apply for Protocol: Apex</h3>

            {formSubmitted ? (
              <div className="hero-gauge-status" style={{ padding: '2rem 0', flexDirection: 'column', textAlign: 'center' }}>
                <CheckCircle size={48} className="neon-icon" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Application Received</h4>
                <p style={{ color: 'var(--text-gray)' }}>Our commercial growth team will review your application and respond within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div>
                  <label className="contact-label">Commercial Lead / Founder Name</label>
                  <input
                    type="text"
                    name="executiveName"
                    required
                    value={formData.executiveName}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="e.g. Jordan Vance"
                  />
                </div>

                <div>
                  <label className="contact-label">Direct Work Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="jordan@enterprise-ai.com"
                  />
                </div>

                <div>
                  <label className="contact-label">Company / Venture Name</label>
                  <input
                    type="text"
                    name="ventureName"
                    required
                    value={formData.ventureName}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="e.g. Apex Neural Core"
                  />
                </div>

                <div>
                  <label className="contact-label">Current ARR / Monthly Revenue</label>
                  <input
                    type="text"
                    name="currentArr"
                    value={formData.currentArr}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="e.g. $350K ARR ($30K MRR)"
                  />
                </div>

                <div>
                  <label className="contact-label">Commercial Model / Pricing Structure</label>
                  <textarea
                    name="commercialModel"
                    value={formData.commercialModel}
                    onChange={handleInputChange}
                    className="contact-textarea"
                    placeholder="Briefly describe your pricing tiers, contract sizes, and sales cycles..."
                  />
                </div>

                <div>
                  <label className="contact-label">Active Enterprise Pipeline Stage</label>
                  <input
                    type="text"
                    name="pipelineStage"
                    value={formData.pipelineStage}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="e.g. 4 pilots in evaluation, 2 enterprise contracts in legal"
                  />
                </div>

                {formError && (
                  <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '0.75rem', fontFamily: 'monospace' }}>
                    {formError}
                  </div>
                )}

                <button type="submit" className="cta-primary contact-submit-btn" disabled={formLoading}>
                  {formLoading ? 'TRANSMITTING...' : 'INITIALIZE PROTOCOL APPLICATION'}
                </button>
              </form>
            )}
          </div>

          <div className="hero-gauge-wrapper">
            <div className="contact-card">
              <h3 className="subpage-contact-sidebar-heading">Commercial Architecture Consult</h3>
              <p className="subpage-contact-sidebar-desc">
                Consult directly with our growth architects. We analyze your commercial pipeline telemetry, pricing power, and institutional capitalization roadmap.
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
