import { submitContactForm } from '../services/contactService';
import { useState } from 'react';
import { ShieldCheck, Zap, Layers, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useRegion } from '../context/RegionContext';
import LinkedInConnect from '../components/LinkedInConnect';

export default function ProtocolKinetic() {
  const { country } = useRegion();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    founderName: '',
    email: '',
    companyName: '',
    modelArchitecture: '',
    currentTraction: '',
    codeRepo: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const stats = [
    { value: '6', label: 'Month engagement horizon' },
    { value: '15-25%', label: 'Equity alignment' },
    { value: `${country.symbol}500K`, label: 'Co-investment (milestone-gated)' },
    { value: '1', label: 'Embedded engineering unit deployed' },
  ];

  const pillars = [
    {
      icon: <ShieldCheck size={20} className="neon-icon" />,
      tag: '01 // ZERO-TRUST DATA ARCHITECTURE',
      title: 'Data Security and Privacy',
      body: 'Data pipeline security, vector database indexing, privacy enclaves, and SOC2/HIPAA compliance readiness to satisfy strict enterprise requirements.',
    },
    {
      icon: <Zap size={20} className="neon-icon" />,
      tag: '02 // MODEL and INFERENCE ORCHESTRATION',
      title: 'Optimization and Cost Control',
      body: 'Latency optimization, custom fine-tuning, token cost reduction, and fail-safe routing designed for mission-critical production reliability.',
    },
    {
      icon: <Layers size={20} className="neon-icon" />,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.founderName || !formData.email || !formData.companyName) return;

    setFormLoading(true);
    setFormError(null);

    const fullMessage = [
      `Company / Startup: ${formData.companyName}`,
      formData.codeRepo ? `Repo / Demo: ${formData.codeRepo}` : '',
      formData.modelArchitecture ? `Model Architecture: ${formData.modelArchitecture}` : '',
      formData.currentTraction ? `Traction / Milestones: ${formData.currentTraction}` : ''
    ].filter(Boolean).join('\n\n');

    const res = await submitContactForm({
      name: formData.founderName,
      email: formData.email,
      company: formData.companyName,
      message: fullMessage,
      serviceContext: 'Protocol: Kinetic (Seed & Pre-Seed Incubation)'
    });

    setFormLoading(false);
    if (res.success) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ founderName: '', email: '', companyName: '', modelArchitecture: '', currentTraction: '', codeRepo: '' });
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

          <div className="proto-hero-visual">
            <div className="proto-visual-card">
              <div className="proto-visual-eyebrow">// KINETIC // BUILD-TO-PRODUCTION PATHWAY</div>
              <div className="kinetic-timeline">
                {[
                  { tag: 'MONTHS 1–2', title: 'Zero-State Architecture', meta: 'Data Pipelines · Vector Infra · Compliance', active: true },
                  { tag: 'MONTHS 3–4', title: 'Production Build & Hardening', meta: 'Enterprise MVP · Load Testing · Security', active: true },
                  { tag: 'MONTHS 5–6', title: 'Enterprise GTM & Capital', meta: `Seed Syndicate · Buyer Pilots · ${country.symbol}500K`, active: false },
                ].map((m, i, arr) => (
                  <div key={i} className="kinetic-milestone">
                    <div className="kinetic-milestone-dot-col">
                      <div className={`kinetic-milestone-dot${m.active ? '' : ' dim'}`} />
                      {i < arr.length - 1 && <div className="kinetic-milestone-line" />}
                    </div>
                    <div className="kinetic-milestone-body">
                      <div className="kinetic-milestone-tag">{m.tag}</div>
                      <div className="kinetic-milestone-title">{m.title}</div>
                      <div className="kinetic-milestone-meta">{m.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="proto-visual-stats">
                <div className="proto-stat-item">
                  <div className="proto-stat-val">6</div>
                  <div className="proto-stat-lbl">Month Horizon</div>
                </div>
                <div className="proto-stat-item">
                  <div className="proto-stat-val">{country.symbol}500K</div>
                  <div className="proto-stat-lbl">Co-Investment</div>
                </div>
                <div className="proto-stat-item">
                  <div className="proto-stat-val">15–25%</div>
                  <div className="proto-stat-lbl">Equity Alignment</div>
                </div>
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
              Apply for Protocol: Kinetic
            </h3>

            {formSubmitted ? (
              <div className="hero-gauge-status">
                <CheckCircle size={48} className="neon-icon" />
                <h4>Application Received</h4>
                <p>Our technical team will review your application and respond within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div>
                  <label className="contact-label">Founder / Technical Lead Name</label>
                  <input
                    type="text"
                    name="founderName"
                    required
                    value={formData.founderName}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="e.g. Alex Morgan"
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
                    placeholder="alex@venture.ai"
                  />
                </div>

                <div>
                  <label className="contact-label">Company / Venture Name</label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="e.g. SentryFlow Systems"
                  />
                </div>

                <div>
                  <label className="contact-label">Model Architecture / Stack Overview</label>
                  <textarea
                    name="modelArchitecture"
                    value={formData.modelArchitecture}
                    onChange={handleInputChange}
                    className="contact-textarea"
                    placeholder="Briefly describe your model stack, embeddings, database, and infrastructure..."
                  />
                </div>

                <div>
                  <label className="contact-label">Current Traction / Enterprise Pilots</label>
                  <input
                    type="text"
                    name="currentTraction"
                    value={formData.currentTraction}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="e.g. 2 LOIs signed, beta testing with 500 users"
                  />
                </div>

                <div>
                  <label className="contact-label">Code Repository / Demo Link (Optional)</label>
                  <input
                    type="text"
                    name="codeRepo"
                    value={formData.codeRepo}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="https://github.com/... or loom.com/..."
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
              <h3 className="hero-heading">Venture Architecture Consult</h3>
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
