import React, { useState } from 'react';
import { CheckCircle, CheckCircle2, Shield } from 'lucide-react';

interface StandardItem {
  label: string;
  full: string;
  region: string;
  desc: string;
  link?: string;
}

const standards: StandardItem[] = [
  {
    label: 'GDPR',
    full: 'General Data Protection Regulation',
    region: 'European Union',
    desc: 'All client data routed through our architecture is bound by strict GDPR protocols—enforcing systematic data minimization, rigorous lawful-basis logging, and automated access rights management.',
    link: 'https://gdpr-info.eu/',
  },
  {
    label: 'SOC 2 Type II',
    full: 'Service Organization Control 2',
    region: 'International',
    desc: 'Our internal core and deployment pipelines are engineered to mirror SOC 2 Type II trust criteria—guaranteeing continuous operational integrity, secure data containment, and systemic privacy.',
  },
  {
    label: 'EU AI Act',
    full: 'European Union Artificial Intelligence Act',
    region: 'European Union',
    desc: 'We calibrate all neural deployments against EU AI Act threat-classification matrices—hardcoding risk boundaries, maintaining complete operator-in-the-loop oversight, and compiling flawless system documentation.',
    link: 'https://artificialintelligenceact.eu/',
  },
  {
    label: 'ISO 27001',
    full: 'Information Security Management',
    region: 'International',
    desc: 'Our security protocols are locked to ISO 27001 principles. We enforce automated access barriers, immediate incident countermeasures, and continuous system threat audits.',
    link: 'https://www.iso.org/standard/27001',
  },
  {
    label: 'FTC AI Guidelines',
    full: 'Federal Trade Commission AI Standards',
    region: 'United States',
    desc: 'Systems deployed into US territories are rigorously tested against FTC AI benchmarks—verifying algorithmic transparency, eliminating bias vectors, and neutralizing deceptive output risks.',
    link: 'https://www.ftc.gov/ai',
  },
  {
    label: 'POPIA',
    full: 'Protection of Personal Information Act',
    region: 'South Africa',
    desc: 'For African territory deployments, we enforce POPIA-compliant data processing pipelines—establishing clear processing constraints and automated data breach notification protocols.',
    link: 'https://popia.co.za/',
  },
  {
    label: 'ISO 42001',
    full: 'Artificial Intelligence Management System',
    region: 'International',
    desc: 'Our entire AI lifecycle—from initial model training and data processing to deployment and feedback loops—is aligned with ISO 42001 parameters to ensure systemic safety, accountability, and ethical integrity.',
    link: 'https://www.iso.org/standard/42001',
  },
  {
    label: 'NIST AI RMF',
    full: 'AI Risk Management Framework',
    region: 'United States',
    desc: 'We map, measure, and govern system risks against the NIST framework—enforcing strict trustworthiness metrics to verify that all active models are secure, resilient, and explainable.',
    link: 'https://www.nist.gov/itl/ai-risk-management-framework',
  },
  {
    label: 'HIPAA',
    full: 'Health Insurance Portability and Accountability Act',
    region: 'United States',
    desc: 'For biomedical and health-tech integrations, we engineer strict data-transmission tunnels and zero-trust storage protocols to safeguard Protected Health Information (PHI).',
    link: 'https://www.cdc.gov/phlp/php/resources/health-insurance-portability-and-accountability-act-of-1996-hipaa.html',
  },
  {
    label: 'DORA',
    full: 'Digital Operational Resilience Act',
    region: 'European Union',
    desc: 'We align our deployments with DORA specifications for EU financial markets—hardening our digital infrastructure against systemic ICT risks and guaranteeing operational continuity during high-demand run states.',
    link: 'https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en',
  },
];

const operationalControls = [
  {
    title: 'Access Control',
    desc: 'We enforce strict Role-Based Access Control (RBAC) across all systems. Operational access to target environments is provisioned on a per-run basis—strictly neutralizing standing access to live production environments. Every access vector is continuously logged and audited.',
  },
  {
    title: 'Data Isolation',
    desc: 'Zero commingling. Each client environment is isolated within a dedicated, hardcoded infrastructure perimeter. Cross-tenant data transfer is rendered architecturally impossible at the code level—not merely prohibited by policy.',
  },
  {
    title: 'Encryption',
    desc: 'Every data stream routed through our ecosystem is secured at rest via AES-256 and in motion via TLS 1.3. Cryptographic key management is synchronized to NIST standards, executing automated periodic rotation cycles.',
  },
  {
    title: 'Incident Response',
    desc: 'We operate a systematic, high-alert incident response framework with automated escalation paths, strict containment SLAs, and instant client telemetry updates. Any detected threat triggers structured logging, immediate countermeasures, and regulatory alignment.',
  },
  {
    title: 'Vendor Assessment',
    desc: 'Every third-party component introduced to our delivery pipeline must clear rigorous security vetting before deployment. We maintain a strict whitelist of validated integrations and run deep annual compliance audits on all active assets.',
  },
  {
    title: 'AI Model Governance',
    desc: 'Every deployed model undergoes an exhaustive pre-launch review—evaluating bias metrics, mapping explainability paths, and validating adversarial failure modes. Active model vectors are continuously monitored in production against locked performance and drift thresholds.',
  },
];

const internalGovernance = [
  'Designated, named operator accountable for every active system run',
  'Quarterly internal security and compliance calibration cycles',
  'Algorithmic bias and vector drift reviews mandated for all active models',
  'Documented, continuously auditable client data containment logs per project',
  'Strict codebase change-management with hardcoded approval gates',
  'Immediate, secure escalation pathways for internal compliance vectors',
];

export const GovernanceSection: React.FC = () => {
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
      <section id="gov-hero" className="section hero-fullscreen-section">
        <div className="hero-grid">
          <div>
            <div className="eyebrow-tagline-green">
              // ZERO-TRUST COMPLIANCE
            </div>
            <h1 className="hero-heading">
              Hardcoded Algorithmic Safety and Governance<span className="brand-dot">.</span>
            </h1>
            
            <div className="hero-tags-row">
              {['EU AI Act Compliance', 'NIST Risk Management', 'SOC 2 Mirroring'].map((tag, tIdx) => (
                <span key={tIdx} className="hero-pill-badge">
                  {tag}
                </span>
              ))}
            </div>

            <p className="hero-body-copy">
              We design for high-trust, heavily regulated digital territories. Our governance architecture is compiled directly into our delivery pipelines, from telemetry diagnosis to active deployment.
            </p>
          </div>

          {/* Right Hero Baseline Gauge Widget matching Gold-Standard */}
          <div className="hero-gauge-wrapper">
            <div className="baseline-card hero-gauge-card">
              <span className="hero-gauge-tag">
                // SEGREGATION MONITOR ACTIVE
              </span>
              
              <div className="hero-gauge-svg-container">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8CFF32" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="0" strokeLinecap="round" />
                </svg>
                <div className="hero-gauge-number-wrap">
                  <span className="count-up-trigger stat-metric" data-target="100" data-percent="true">100%</span>
                </div>
              </div>

              {/* Metric Label Strictly Underneath */}
              <span className="hero-gauge-label">
                Tenant Space Isolation
              </span>

              <div className="hero-gauge-status">
                <CheckCircle2 size={16} className="neon-icon" /> Systems Fully Operational
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Below-the-Fold Content Section */}
      <section id="block-gov" className="section">
        {/* Regulatory standards grid */}
        <div className="gov-standards-block">
          <div className="eyebrow-tagline-green">// THE BOUNDARIES</div>
          <h3 className="service-heading">Regulatory Standards and Compliance Frameworks<span className="brand-dot">.</span></h3>
          <p className="hero-body-copy gov-body-copy-spaced">
            We build directly to compliance parameters, operating our entire infrastructure within these global bounds.
          </p>
          <div className="gov-standards-grid">
            {standards.map((s, idx) => (
              <div key={idx} className="glass-panel gov-standard-card">
                <div>
                  <div className="gov-standard-header">
                    <div className="gov-standard-badge">
                      {s.label}
                    </div>
                    <div className="gov-standard-region">{s.region}</div>
                  </div>
                  <div className="gov-standard-fullname">{s.full}</div>
                  <p className="gov-standard-desc">{s.desc}</p>
                </div>
                {s.link ? (
                  <div className="gov-standard-link-wrap">
<a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-link gov-explore-link"
                    >
                      Explore Standard
                    </a>
                  </div>
                ) : (
                  <div className="gov-standard-link-placeholder"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Operational controls */}
        <div className="gov-controls-block">
          <div className="eyebrow-tagline">// THE CONTROLS</div>
          <h3 className="service-heading">Operational Security and Integrity Safeguards<span className="brand-dot">.</span></h3>
          <p className="hero-body-copy gov-body-copy-spaced">
            Hardened defense parameters enforced across our internal environment and every active deployment.
          </p>
          <div className="gov-controls-grid">
            {operationalControls.map((c, idx) => (
              <div key={idx} className="glass-panel gov-control-card">
                <Shield size={20} className="neon-icon gov-control-icon" />
                <div>
                  <h4 className="gov-control-title">{c.title}</h4>
                  <p className="gov-control-desc">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Internal governance */}
        <div className="glass-panel gov-internal-card">
          <div>
            <div className="eyebrow-tagline">INTERNAL GOVERNANCE MODEL</div>
            <h3 className="service-heading gov-internal-heading">We govern our collective exactly how we govern AI<span className="brand-dot">.</span></h3>
            <p className="hero-body-copy gov-body-copy-flush">
              Accountability is the core operating system of our own collective. From how we assign dedicated operators to every system run to how we audit and authorize internal model deployments, our operational discipline is absolute and continuous.
            </p>
          </div>
          <div className="gov-internal-list">
            {internalGovernance.map((item, idx) => (
              <div key={idx} className="gov-internal-item">
                <CheckCircle size={15} className="neon-icon gov-internal-icon" />
                <span className="gov-internal-text">{item}</span>
              </div>
            ))}
          </div>
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
                <CheckCircle2 size={48} className="neon-icon" />
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
              <div className="hero-gauge-status">
                <a 
                  href="https://www.linkedin.com/company/lycos-core" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="neon-icon"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" width="20" height="20" fill="#8CFF32">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 0 0 0 0-3.24z"/>
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
};

export default GovernanceSection;