import { submitContactForm } from '../services/contactService';
import { useState } from 'react';
import { ShieldCheck, Zap, Layers, CheckCircle, CheckCircle2, ChevronDown } from 'lucide-react';
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
    { value: '6mo', label: 'Engagement Horizon' },
    { value: '15–25%', label: 'Equity Alignment' },
    { value: `${country.symbol}500K`, label: 'Co-Investment (Milestone-Gated)' },
    { value: '1 Unit', label: 'Embedded Engineering Squad' },
  ];

  const pillars = [
    {
      icon: <ShieldCheck size={28} className="neon-icon" />,
      tag: '01 // ZERO-TRUST DATA ARCHITECTURE',
      title: 'Data Security and Privacy',
      body: 'Data pipeline security, vector database indexing, privacy enclaves, and SOC2/HIPAA compliance readiness to satisfy strict enterprise requirements.',
    },
    {
      icon: <Zap size={28} className="neon-icon" />,
      tag: '02 // MODEL & INFERENCE ORCHESTRATION',
      title: 'Optimization and Cost Control',
      body: 'Latency optimization, custom fine-tuning, token cost reduction, and fail-safe routing designed for mission-critical production reliability.',
    },
    {
      icon: <Layers size={28} className="neon-icon" />,
      tag: '03 // ENTERPRISE INTERFACE & UI/UX',
      title: 'High-Performance Design',
      body: 'High-performance, clinical software interfaces designed for rapid operator onboarding, high user retention, and enterprise buyer adoption.',
    },
  ];

  const phases = [
    {
      phase: 'PHASE 1 (Months 1–2)',
      title: 'Ingestion and System Architecture',
      body: 'Audit problem space, establish vector and data pipelines, and codify core deterministic agentic workflows.',
    },
    {
      phase: 'PHASE 2 (Months 3–4)',
      title: 'Production Build and Hardening',
      body: 'Deploy functional MVP into live enterprise sandboxes, execute load/stress testing, and secure the perimeter.',
    },
    {
      phase: 'PHASE 3 (Months 5–6)',
      title: 'Enterprise GTM and Capital Routing',
      body: 'Initiate buyer design partner pilots, calibrate institutional data room, and route to seed venture syndicates.',
    },
  ];

  const deliverables = [
    'Embedded Technical Engineering Unit',
    'Enterprise GTM Deployment Protocol',
    'Institutional Capital Access & Syndicate Routing',
    `Co-Investment Capital (Up to ${country.symbol}500K milestone-gated)`,
  ];

  const faqs = [
    {
      q: 'What are the IP ownership mechanics?',
      a: '100% retained by founder. Lycos Core operates as a technical co-builder; we do not claim any intellectual property ownership or carve-outs on code engineered for your platform during the pathway timeline.',
    },
    {
      q: 'How does Kinetic differ from traditional accelerators?',
      a: 'Accelerators typically focus on advisory services, pitch decks, and general mentoring. Kinetic is an active technical co-building initiative. We deploy dedicated, full-stack AI engineering units directly into your codebase to build and harden production systems.',
    },
    {
      q: `How is the ${country.symbol}500K co-investment allocated?`,
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
                  { tag: 'MONTHS 3–4', title: 'Production Build and Hardening', meta: 'Enterprise MVP · Load Testing · Security', active: true },
                  { tag: 'MONTHS 5–6', title: 'Enterprise GTM and Capital', meta: `Seed Syndicate · Buyer Pilots · ${country.symbol}500K`, active: false },
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
              The Bottleneck Isn't Ideation. Engineering Production Velocity in a High-Noise Market<span className="brand-dot">.</span>
            </h3>
          </div>
          <div>
            <p className="service-desc" style={{ fontSize: '1rem', lineHeight: '1.7' }}>
              Most seed-stage AI startups fail at the infrastructure layer—struggling with token costs, latency spikes, brittle prototype code, and complex data governance. We eliminate technical debt before it forms by deploying full-stack engineering units alongside your team to construct zero-trust, enterprise-ready architectures from day zero.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars / Technical Architecture */}
      <section className="section" style={{ padding: '2rem 0 4rem' }}>
        <div className="subpage-block-header">
          <span className="eyebrow-tagline">// TECHNICAL ARCHITECTURE BREAKDOWN</span>
          <h2 className="subpage-block-title">
            Modular Build <span className="brand-dot">Layers</span>
          </h2>
          <p className="subpage-block-desc">
            Three foundational pillars built to ensure production reliability, regulatory readiness, and rapid operator adoption.
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
              Three Phases. Six Months. <span className="brand-dot">Zero Drift.</span>
            </h2>
            <p className="section-desc">
              A structured engineering acceleration framework designed to transition from zero-state prototypes to enterprise-ready deployments within 180 days.
            </p>
          </div>

          <div className="playbook-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
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
              Every Kinetic cohort venture leaves with production-hardened assets, institutional documentation, and direct commercial relationships.
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
            <h3 className="subpage-contact-heading">Apply for Protocol: Kinetic</h3>

            {formSubmitted ? (
              <div className="hero-gauge-status" style={{ padding: '2rem 0', flexDirection: 'column', textAlign: 'center' }}>
                <CheckCircle size={48} className="neon-icon" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Application Received</h4>
                <p style={{ color: 'var(--text-gray)' }}>Our technical team will review your application and respond within 48 hours.</p>
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
              <h3 className="subpage-contact-sidebar-heading">Venture Architecture Consult</h3>
              <p className="subpage-contact-sidebar-desc">
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
