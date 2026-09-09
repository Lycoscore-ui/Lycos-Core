import { submitContactForm } from '../services/contactService';
import { useState } from 'react';
import { CheckCircle2, ShieldAlert, Scale, Users, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import LinkedInConnect from '../components/LinkedInConnect';

export default function ProtocolCitadel() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    orgName: '',
    execLead: '',
    email: '',
    ipOverview: '',
    commercialObjective: '',
    corpDevTimeline: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const stats = [
    { value: '12', label: 'Month engagement horizon' },
    { value: 'Custom', label: 'Bespoke equity alignment' },
    { value: '100%', label: 'IP firewall protection' },
    { value: '1', label: 'Independent board and entity' },
  ];

  const pillars = [
    {
      icon: <ShieldAlert size={20} className="neon-icon" />,
      tag: '01 // IP CARVE-OUT and REGULATORY FIREWALLS',
      title: 'Risk Isolation',
      body: 'Risk isolation blueprints, regulatory partition mapping, legal entity separation, and comprehensive codebase intellectual property audits.',
    },
    {
      icon: <Scale size={20} className="neon-icon" />,
      tag: '02 // VENTURE GOVERNANCE and CAP TABLE ENGINEERING',
      title: 'Clean Governance',
      body: 'Structured spin-out cap table modeling, corporate parent equity allocations, key management option pools, and independent entity board configurations.',
    },
    {
      icon: <Users size={20} className="neon-icon" />,
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
      title: 'External Capital and Market Launch',
      body: 'Close institutional syndicate funding, execute customer migration protocols, and transition to independent corporate governance.',
    },
  ];

  const deliverables = [
    'Entity Formation & Corporate Governance',
    'Bespoke Brand Architecture',
    'Executive Talent Acquisition',
    'Capital Structuring & Equity Design',
  ];

  const faqs = [
    {
      q: 'How does Lycos Core protect corporate IP during spin-out?',
      a: 'We implement institutional-grade legal and technical firewalls. The parent organization retains clean licensing or non-dilutive equity stakes while fully isolating core enterprise IP from external exposure.',
    },
    {
      q: 'How is founding executive compensation structured?',
      a: 'We design venture-grade management incentive option pools (typically 15–20%) to attract tier-one founding operators without burdening parent enterprise payroll.',
    },
    {
      q: 'Can the parent company retain a controlling interest?',
      a: 'Governance structures are customized. While outside institutional syndicates often require balanced governance, the parent corporation can retain board seats, preferred commercial terms, and strategic rights.',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.orgName || !formData.execLead || !formData.email) return;

    setFormLoading(true);
    setFormError(null);

    const fullMessage = [
      `Enterprise Organization: ${formData.orgName}`,
      `Executive Lead: ${formData.execLead}`,
      formData.corpDevTimeline ? `Corp Dev Timeline: ${formData.corpDevTimeline}` : '',
      formData.commercialObjective ? `Commercial Objective: ${formData.commercialObjective}` : '',
      formData.ipOverview ? `IP / Technology Overview: ${formData.ipOverview}` : ''
    ].filter(Boolean).join('\n\n');

    const res = await submitContactForm({
      name: formData.execLead,
      email: formData.email,
      company: formData.orgName,
      message: fullMessage,
      serviceContext: 'Protocol: Citadel (Corporate Venture Studio & Spin-Outs)'
    });

    setFormLoading(false);
    if (res.success) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ orgName: '', execLead: '', email: '', ipOverview: '', commercialObjective: '', corpDevTimeline: '' });
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
      <section id="citadel-hero" className="section hero-fullscreen-section">
        <div className="hero-grid">
          <div>
            <div className="eyebrow-tagline-green">
              // INCUBATION PROTOCOL // CORPORATE VENTURE STUDIO
            </div>
            <h1 className="hero-heading">
              Protocol: Citadel<span className="brand-dot">.</span>
            </h1>

            <div className="hero-tags-row">
              {['Corporate Spin-Outs', 'IP Carve-Outs', '12-Month Horizon'].map((tag, i) => (
                <span key={i} className="hero-pill-badge">{tag}</span>
              ))}
            </div>

            <p className="hero-body-copy">
              Commercializing proprietary enterprise AI models into standalone corporate spin-outs. We engineer the complete venture lifecycle—from clean IP carve-outs to executive talent placement and institutional capitalization.
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
              <span className="hero-gauge-tag">// PATHWAY 03 // CORPORATE STUDIO</span>
              <div className="hero-gauge-svg-container">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8CFF32" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="0" strokeLinecap="round" />
                </svg>
                <div className="hero-gauge-number-wrap">
                  <span className="stat-metric">12mo</span>
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
              Trapped Enterprise IP Is Unmonetized Alpha. Unlocking Sovereign Market Value Through Structured Spin-Outs<span className="brand-dot">.</span>
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
                <div className="icon-badge">{p.icon}</div>
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
          <h3 className="service-heading">Four Phases. Twelve Months. Enterprise De-risked<span className="brand-dot">.</span></h3>
          <div className="protocol-disciplines-grid-4">
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
          <div className="eyebrow-tagline">// FREQUENTLY ASKED QUESTIONS</div>
          <h3 className="service-heading">Protocol Parameters<span className="brand-dot">.</span></h3>
          <div className="protocol-faq-list">
            {faqs.map((f, i) => (
              <div key={i} className="glass-panel who-faq-card">
                <button
                  className="who-faq-question-row"
                  onClick={() => toggleFaq(i)}
                >
                  <span className="who-faq-question-text">{f.q}</span>
                  {activeFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {activeFaq === i && (
                  <p className="who-faq-answer-text">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Application Form & Contact Matrix */}
        <div id="contact" className="contact-grid">
          <div className="glass-panel contact-card">
            <h3 className="service-heading">
              Initialize Protocol: Citadel
            </h3>

            {formSubmitted ? (
              <div className="hero-gauge-status">
                <CheckCircle size={48} className="neon-icon" />
                <h4>Engagement Received</h4>
                <p>Our Corporate Development team will reach out under strict NDA within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div>
                  <label className="contact-label">Enterprise / Corporate Entity Name</label>
                  <input
                    type="text"
                    name="orgName"
                    required
                    value={formData.orgName}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="e.g. Apex Global Logistics Corp"
                  />
                </div>

                <div>
                  <label className="contact-label">Executive Sponsor / Lead Name</label>
                  <input
                    type="text"
                    name="execLead"
                    required
                    value={formData.execLead}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="e.g. Elena Rostova, VP Innovation"
                  />
                </div>

                <div>
                  <label className="contact-label">Corporate Work Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="e.rostova@apexlogistics.com"
                  />
                </div>

                <div>
                  <label className="contact-label">Proprietary IP / Technology Overview</label>
                  <textarea
                    name="ipOverview"
                    value={formData.ipOverview}
                    onChange={handleInputChange}
                    className="contact-textarea"
                    placeholder="Summarize the internal AI software/model asset, data origin, and initial internal validation..."
                  />
                </div>

                <div>
                  <label className="contact-label">Primary Commercial Spin-Out Objective</label>
                  <textarea
                    name="commercialObjective"
                    value={formData.commercialObjective}
                    onChange={handleInputChange}
                    className="contact-textarea"
                    placeholder="e.g. Monetize non-core software asset, attract external venture syndicate capital..."
                  />
                </div>

                <div>
                  <label className="contact-label">Target Corporate Development Timeline</label>
                  <input
                    type="text"
                    name="corpDevTimeline"
                    value={formData.corpDevTimeline}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="e.g. Q3 2026 Board Approval"
                  />
                </div>

                {formError && (
                  <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '0.75rem', fontFamily: 'monospace' }}>
                    {formError}
                  </div>
                )}

                <button type="submit" className="cta-primary contact-submit-btn" disabled={formLoading}>
                  {formLoading ? 'TRANSMITTING...' : 'INITIALIZE CITADEL PROTOCOL'}
                </button>
              </form>
            )}
          </div>

          <div className="hero-gauge-wrapper">
            <div className="contact-card">
              <h3 className="hero-heading">Corporate Spin-Out Consult</h3>
              <p className="hero-body-copy">
                Directly interface with our venture co-builders. We evaluate seed-stage model defensibility, infrastructure scalings, and capital velocity parameters under strict NDA.
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
