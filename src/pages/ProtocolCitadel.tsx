import { submitContactForm } from '../services/contactService';
import { useState } from 'react';
import { ShieldAlert, Scale, Users, CheckCircle, CheckCircle2, ChevronDown } from 'lucide-react';
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
    spinOutTimeline: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const stats = [
    { value: '12mo', label: 'Studio Horizon' },
    { value: 'Bespoke', label: 'Carve-Out Terms' },
    { value: '100%', label: 'IP Ring-Fenced' },
    { value: 'Tier-1', label: 'Spin-Out Syndicates' },
  ];

  const pillars = [
    {
      icon: <ShieldAlert size={28} className="neon-icon" />,
      tag: '01 // LEGAL & IP FIREWALL',
      title: 'Clean IP Carve-Out',
      body: 'Complete legal ring-fencing, proprietary licensing architectures, clean capital structures, and patent defense isolation from the parent enterprise.',
    },
    {
      icon: <Scale size={28} className="neon-icon" />,
      tag: '02 // CORPORATE STRUCTURING',
      title: 'Spin-Out Corporate Development',
      body: 'Dual-class equity structuring, non-dilutive internal licensing, governance boundaries, and alignment with corporate parent strategic objectives.',
    },
    {
      icon: <Users size={28} className="neon-icon" />,
      tag: '03 // EXECUTIVE PLACEMENT',
      title: 'Founding Leadership Recruitment',
      body: 'Vetted entrepreneurial CEO and CTO placement with specialized track records in high-growth AI spin-outs and venture scaling.',
    },
  ];

  const phases = [
    {
      phase: 'PHASE 1 (Months 1–3)',
      title: 'IP Audit and Ring-Fencing',
      body: 'Map internal AI codebase, establish IP boundaries, draft licensing agreements, and construct clean corporate vehicle.',
    },
    {
      phase: 'PHASE 2 (Months 4–6)',
      title: 'Productization and Architecture',
      body: 'Refactor internal tooling into multi-tenant, market-ready enterprise software platform with sovereign security gates.',
    },
    {
      phase: 'PHASE 3 (Months 7–9)',
      title: 'Executive Placement and Beta Pilots',
      body: 'Place proven venture leadership team and deploy spin-out software into first 3 external non-competing enterprise buyers.',
    },
    {
      phase: 'PHASE 4 (Months 10–12)',
      title: 'Institutional Capitalization',
      body: 'Route standalone entity to Tier-1 venture syndicates for institutional Series A capitalization with parent upside retention.',
    },
  ];

  const deliverables = [
    'Clean Legal & IP Ring-Fenced Entity',
    'Standalone Multi-Tenant Software Platform',
    'Vetted Founding Executive Team (CEO/CTO)',
    'Institutional Series A Capital Syndicate',
  ];

  const faqs = [
    {
      q: 'How does Lycos protect corporate parent proprietary data?',
      a: 'We establish cryptographic and legal firewalls between the enterprise parent and the spin-out entity. The spin-out receives licensed access to specific algorithmic frameworks without exposing parent operational databases or customer records.',
    },
    {
      q: 'What is the parent company equity retention model?',
      a: 'The corporate parent typically retains a significant, non-dilutive minority equity position and proprietary internal licensing terms while external venture capital funds the growth of the new entity.',
    },
    {
      q: 'Who manages the spin-out venture post-carve-out?',
      a: 'Protocol: Citadel recruits vetted, experienced entrepreneurial executive leadership (CEO/CTO) to operate the new company autonomously, freeing corporate management from daily venture operations.',
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
      `Parent Enterprise / Org: ${formData.orgName}`,
      `Executive Lead: ${formData.execLead}`,
      formData.ipOverview ? `IP / Technology Overview: ${formData.ipOverview}` : '',
      formData.commercialObjective ? `Commercial Objective: ${formData.commercialObjective}` : '',
      formData.spinOutTimeline ? `Desired Timeline: ${formData.spinOutTimeline}` : ''
    ].filter(Boolean).join('\n\n');

    const res = await submitContactForm({
      name: formData.execLead,
      email: formData.email,
      company: formData.orgName,
      message: fullMessage,
      serviceContext: 'Protocol: Citadel (Corporate Studio & IP Carve-Out)'
    });

    setFormLoading(false);
    if (res.success) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ orgName: '', execLead: '', email: '', ipOverview: '', commercialObjective: '', spinOutTimeline: '' });
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
              // INCUBATION PROTOCOL // CORPORATE STUDIO
            </div>
            <h1 className="hero-heading">
              Protocol: Citadel<span className="brand-dot">.</span>
            </h1>

            <div className="hero-tags-row">
              {['Corporate Studio', 'IP Carve-Out', '12-Month Horizon'].map((tag, i) => (
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

          <div className="proto-hero-visual">
            <div className="proto-visual-card">
              <div className="proto-visual-eyebrow">// CITADEL // IP CARVE-OUT ARCHITECTURE</div>
              <div className="citadel-structure">
                <div className="citadel-node">
                  <div className="citadel-node-box corp">CORPORATE PARENT</div>
                  <div className="citadel-node-sub">Proprietary AI / Enterprise IP</div>
                </div>
                <div className="citadel-connector blue" />
                <div className="citadel-firewall-label">▼ LYCOS CITADEL PROTOCOL ▼</div>
                <div className="citadel-connector" />
                <div className="citadel-node">
                  <div className="citadel-node-box firewall">IP FIREWALL STRUCTURE</div>
                  <div className="citadel-node-sub">Legal Carve-Out · Clean Capital Table · NDA Architecture</div>
                </div>
                <div className="citadel-connector" />
                <div className="citadel-node">
                  <div className="citadel-node-box spinout">AUTONOMOUS SPIN-OUT ENTITY</div>
                  <div className="citadel-node-sub">Executive Placement · Institutional Capital · Market-Ready</div>
                </div>
              </div>
              <div className="proto-visual-stats">
                <div className="proto-stat-item">
                  <div className="proto-stat-val">12</div>
                  <div className="proto-stat-lbl">Month Horizon</div>
                </div>
                <div className="proto-stat-item">
                  <div className="proto-stat-val">Bespoke</div>
                  <div className="proto-stat-lbl">Equity Terms</div>
                </div>
                <div className="proto-stat-item">
                  <div className="proto-stat-val">100%</div>
                  <div className="proto-stat-lbl">IP Firewall</div>
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
              Trapped Enterprise IP Is Unmonetized Alpha. Unlocking Sovereign Market Value Through Structured Spin-Outs<span className="brand-dot">.</span>
            </h3>
          </div>
          <div>
            <p className="service-desc" style={{ fontSize: '1rem', lineHeight: '1.7' }}>
              Large enterprises frequently build groundbreaking internal AI technologies that stall due to corporate bureaucracy, shifting internal priorities, or risk aversion. Protocol: Citadel provides the structural firewall, corporate development expertise, and dedicated leadership required to carve out trapped intellectual property and transform it into an autonomous, high-growth venture asset.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars / Carve-Out Infrastructure */}
      <section className="section" style={{ padding: '2rem 0 4rem' }}>
        <div className="subpage-block-header">
          <span className="eyebrow-tagline">// INSTITUTIONAL CARVE-OUT ARCHITECTURE</span>
          <h2 className="subpage-block-title">
            Three Structural <span className="brand-dot">Pillars</span>
          </h2>
          <p className="subpage-block-desc">
            A comprehensive legal, organizational, and operational framework engineered for frictionless enterprise separation.
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
              Four Phases. Twelve Months. <span className="brand-dot">Sovereign Spin-Out.</span>
            </h2>
            <p className="section-desc">
              A disciplined venture formation protocol transforming proprietary corporate AI into an independently capitalized market leader.
            </p>
          </div>

          <div className="playbook-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
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
              Every Citadel corporate carve-out yields a sovereign corporate entity, complete with operational team, IP firewalls, and Tier-1 growth capitalization.
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
            <h3 className="subpage-contact-heading">Apply for Protocol: Citadel</h3>

            {formSubmitted ? (
              <div className="hero-gauge-status" style={{ padding: '2rem 0', flexDirection: 'column', textAlign: 'center' }}>
                <CheckCircle size={48} className="neon-icon" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Application Received</h4>
                <p style={{ color: 'var(--text-gray)' }}>Our corporate development team will review your application and respond within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div>
                  <label className="contact-label">Parent Enterprise / Corporation Name</label>
                  <input
                    type="text"
                    name="orgName"
                    required
                    value={formData.orgName}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="e.g. Acme Financial Holdings"
                  />
                </div>

                <div>
                  <label className="contact-label">Executive Lead / Sponsor Name</label>
                  <input
                    type="text"
                    name="execLead"
                    required
                    value={formData.execLead}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="e.g. Dr. Eleanor Vance (VP of Innovation)"
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
                    placeholder="e.vance@acme-holdings.com"
                  />
                </div>

                <div>
                  <label className="contact-label">Proprietary AI / IP Overview</label>
                  <textarea
                    name="ipOverview"
                    value={formData.ipOverview}
                    onChange={handleInputChange}
                    className="contact-textarea"
                    placeholder="Briefly describe the proprietary AI models, datasets, or algorithms targeted for carve-out..."
                  />
                </div>

                <div>
                  <label className="contact-label">Commercial Objective / Market Opportunity</label>
                  <textarea
                    name="commercialObjective"
                    value={formData.commercialObjective}
                    onChange={handleInputChange}
                    className="contact-textarea"
                    placeholder="What commercial problems does this spin-out solve for the broader external market?"
                  />
                </div>

                <div>
                  <label className="contact-label">Desired Carve-Out Timeline</label>
                  <input
                    type="text"
                    name="spinOutTimeline"
                    value={formData.spinOutTimeline}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="e.g. 6–12 months, Q3 2026 target spin-out"
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
              <h3 className="subpage-contact-sidebar-heading">Corporate Studio Consult</h3>
              <p className="subpage-contact-sidebar-desc">
                Consult directly with our venture carve-out architects. We evaluate IP sovereign defensibility, parent governance terms, and institutional spin-out capitalization.
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
