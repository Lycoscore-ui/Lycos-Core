import { submitContactForm } from '../services/contactService';
import { useState } from 'react';
import { CheckCircle2, BarChart3, FileCheck, Coins, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
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
    gtmBottleneck: '',
    targetSeriesADate: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const stats = [
    { value: '9', label: 'Month engagement horizon' },
    { value: '8-15%', label: 'Equity alignment' },
    { value: `${country.symbol}250K+`, label: 'ARR entry threshold' },
    { value: '1', label: 'Series A capitalization target' },
  ];

  const pillars = [
    {
      icon: <BarChart3 size={20} className="neon-icon" />,
      tag: '01 // REVOPS and TELEMETRY INFRASTRUCTURE',
      title: 'Pipeline Telemetry',
      body: 'Production-grade CRM pipeline architecture, automated forecasting, usage-based billing telemetry, and real-time ACV/NDR analytics.',
    },
    {
      icon: <FileCheck size={20} className="neon-icon" />,
      tag: '02 // ENTERPRISE PROCUREMENT NAVIGATION',
      title: 'Procurement and MSAs',
      body: 'Security questionnaire automation, standardized legal MSA/SLA frameworks, enterprise tier pricing, and vendor risk clearance protocols.',
    },
    {
      icon: <Coins size={20} className="neon-icon" />,
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
      body: 'Engage top-tier lead investors with audited telemetry, institutional data room, and coordinated partner pitches.',
    },
  ];

  const deliverables = [
    'Enterprise GTM Architecture',
    'RevOps and Telemetry Infrastructure',
    'Proprietary Network Distribution',
    'Series A Capitalization Protocol',
  ];

  const faqs = [
    {
      q: 'Criteria for Apex Protocol qualification?',
      a: `Ventures must show demonstrated initial PMF with a minimum ARR threshold of ${country.symbol}250K+ (or equivalent pilot volume) and a live, deployed software architecture.`,
    },
    {
      q: 'Do you take equity or cash fees?',
      a: 'We align purely on equity (8–15%) alongside performance-linked milestone incentives, ensuring zero misalignment with existing cap table shareholders.',
    },
    {
      q: 'What does warm routing into the Lycos buyer network entail?',
      a: 'We provide direct, vetted warm introductions to VP and C-level decision-makers across our enterprise consulting and institutional client roster.',
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
      `Venture Name: ${formData.ventureName}`,
      formData.currentArr ? `Current ARR: ${formData.currentArr}` : '',
      formData.targetSeriesADate ? `Target Series A Date: ${formData.targetSeriesADate}` : '',
      formData.gtmBottleneck ? `GTM Bottlenecks: ${formData.gtmBottleneck}` : ''
    ].filter(Boolean).join('\n\n');

    const res = await submitContactForm({
      name: formData.executiveName,
      email: formData.email,
      company: formData.ventureName,
      message: fullMessage,
      serviceContext: 'Protocol: Apex (Scale & Institutional Capture)'
    });

    setFormLoading(false);
    if (res.success) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ executiveName: '', email: '', ventureName: '', currentArr: '', gtmBottleneck: '', targetSeriesADate: '' });
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
              // INCUBATION PROTOCOL // REVENUE SCALE & CAPTURE
            </div>
            <h1 className="hero-heading">
              Protocol: Apex<span className="brand-dot">.</span>
            </h1>

            <div className="hero-tags-row">
              {['Series A Acceleration', 'Enterprise GTM', '9-Month Horizon'].map((tag, i) => (
                <span key={i} className="hero-pill-badge">{tag}</span>
              ))}
            </div>

            <p className="hero-body-copy">
              For post-revenue ventures ready to capture institutional market share. We deploy enterprise GTM playbooks, streamline complex procurement cycles, and architect high-conviction Series A capitalization rounds.
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
              <span className="hero-gauge-tag">// PATHWAY 02 // SCALE & CAPTURE</span>
              <div className="hero-gauge-svg-container">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8CFF32" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="0" strokeLinecap="round" />
                </svg>
                <div className="hero-gauge-number-wrap">
                  <span className="stat-metric">9mo</span>
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
              Apply for Protocol: Apex
            </h3>

            {formSubmitted ? (
              <div className="hero-gauge-status">
                <CheckCircle size={48} className="neon-icon" />
                <h4>Application Received</h4>
                <p>Our capital and GTM leads will review your metrics and respond within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div>
                  <label className="contact-label">Executive / Founder Name</label>
                  <input
                    type="text"
                    name="executiveName"
                    required
                    value={formData.executiveName}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="e.g. Jordan Lee"
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
                    placeholder="jordan@growthventure.ai"
                  />
                </div>

                <div>
                  <label className="contact-label">Venture / Organization Name</label>
                  <input
                    type="text"
                    name="ventureName"
                    required
                    value={formData.ventureName}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="e.g. OmniCore Technologies"
                  />
                </div>

                <div>
                  <label className="contact-label">Current ARR / TTM Revenue Run-Rate</label>
                  <input
                    type="text"
                    name="currentArr"
                    value={formData.currentArr}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="e.g. $450K ARR"
                  />
                </div>

                <div>
                  <label className="contact-label">Primary GTM / Scaling Bottleneck</label>
                  <textarea
                    name="gtmBottleneck"
                    value={formData.gtmBottleneck}
                    onChange={handleInputChange}
                    className="contact-textarea"
                    placeholder="Describe procurement delays, pipeline leakage, sales team scaling bottlenecks..."
                  />
                </div>

                <div>
                  <label className="contact-label">Target Series A Capitalization Window</label>
                  <input
                    type="text"
                    name="targetSeriesADate"
                    value={formData.targetSeriesADate}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="e.g. Q4 2026"
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
              <h3 className="hero-heading">Growth Architecture Consult</h3>
              <p className="hero-body-copy">
                Directly interface with our venture co-builders. We evaluate seed-stage model defensibility, infrastructure scalings, and capital velocity parameters.
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
