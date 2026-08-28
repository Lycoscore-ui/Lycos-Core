import React, { useState } from 'react';
import { CheckCircle, CheckCircle2 } from 'lucide-react';

const phases = [
  {
    num: '01',
    title: 'Telemetry and Diagnosis',
    duration: 'Weeks 1–2',
    desc: 'We initiate every run with a clinical telemetry sweep. This involves aggressive system audits, comprehensive data maturity assessments, and a direct, unfiltered analysis of where your systemic bottlenecks actually exist—bypassing assumptions to target real friction.',
    deliverables: [
      'Systemic bottleneck mapping',
      'Data infrastructure telemetry audit',
      'Stakeholder logic alignment workshop',
      'Prioritized vector opportunity register',
    ],
  },
  {
    num: '02',
    title: 'Architecture and System Design',
    duration: 'Weeks 3–4',
    desc: 'Telemetry outputs are synthesized into a hardened technical blueprint. We architect the neural structure, mathematically define every API integration point, and engineer the tactical roadmap—complete with explicit risk mitigation protocols.',
    deliverables: [
      'Target technical architecture blueprint',
      'Phased implementation deployment map',
      'Systemic KPI validation framework',
      'Adversarial risk and compliance protocol',
    ],
  },
  {
    num: '03',
    title: 'Synthesis and Integration',
    duration: 'Weeks 5–12',
    desc: 'Our core engineers build in high-frequency sprints with structured weekly system demos. There are no sudden reveals; you interface with active code at every stage. We run integration testing in parallel to guarantee zero operational friction.',
    deliverables: [
      'Sprint-based build cycles with weekly system demos',
      'Parallel interface and integration testing',
      'Comprehensive user acceptance validation',
      'System deployment to target environments',
    ],
  },
  {
    num: '04',
    title: 'Run and Evolution',
    duration: 'Ongoing',
    desc: 'Our deployment unit manages the live launch. We continuous-monitor system health, track performance vectors in real time, and run a rigorous 90-day post-launch optimization cycle to ensure the intelligence continuously scales and never plateaus.',
    deliverables: [
      'Managed live production deployment',
      '90-day continuous performance tuning',
      'System telemetry review and metric reporting',
      'Dedicated systems engineering support',
    ],
  },
];

const incubationSteps = [
  {
    label: 'Telemetry and Vetting',
    desc: 'Founders submit system schematics outlining the core bottleneck, initial market validation, and team structure. We run a comprehensive review and schedule an alignment session within 5 business cycles.',
  },
  {
    label: 'Vector Allocation',
    desc: 'We analyze your current stage and trajectory to allocate your venture to one of three high-impact vectors: Concept to Product, Scale and Capture, or Corporate Venture. This alignment determines our execution framework.',
  },
  {
    label: 'Consensus and Onboarding',
    desc: 'We formalize equitable terms, execution scope, and precise success parameters before initiating work. Founders are rapidly integrated into our core digital infrastructure, matched with their dedicated squad, and assigned a high-velocity sprint sequence.',
  },
  {
    label: 'Embedded Execution',
    desc: 'Our specialized operators function as a native extension of your team—syncing on daily standups, owning technical delivery pipelines, and steering strategic tactical moves in real time.',
  },
  {
    label: 'Calibration Cycles',
    desc: 'At precise 6-week intervals, we execute comprehensive milestone audits against locked KPIs. We calibrate technical roadmaps based on live market telemetry and hard operational metrics—never speculation.',
  },
];

export const HowWeOperateSection: React.FC = () => {
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
      <section id="operate-hero" className="section hero-fullscreen-section">
        <div className="hero-grid">
          <div>
            <div className="eyebrow-tagline-green">
              // OPERATIONAL PARADIGM
            </div>
            <h1 className="hero-heading">
              Synchronized Runs. Absolute Accountability<span className="brand-dot">.</span>
            </h1>
            
            <div className="hero-tags-row">
              {['Telemetry diagnosis', 'Target architecture', 'Weekly system demos'].map((tag, tIdx) => (
                <span key={tIdx} className="hero-pill-badge">
                  {tag}
                </span>
              ))}
            </div>

            <p className="hero-body-copy">
              We operate on high-velocity sprint cycles defined by absolute transparency, real-time telemetry, and a dedicated, named squad from day one. Every run is systematically structured and continuously benchmarked.
            </p>
          </div>

          {/* Right Hero Baseline Gauge Widget matching Gold-Standard */}
          <div className="hero-gauge-wrapper">
            <div className="baseline-card hero-gauge-card">
              <span className="hero-gauge-tag">
                // VELOCITY TELEMETRY ACTIVE
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
                Operational Telemetry Uptime
              </span>

              <div className="hero-gauge-status">
                <CheckCircle2 size={16} className="neon-icon" /> Systems Fully Operational
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Below-the-Fold Content Section */}
      <section id="block-protocol" className="section">
        {/* Engagement phases */}
        <div className="operate-phases-block">
          <div className="eyebrow-tagline-green">// THE PROTOCOL</div>
          <h3 className="service-heading">Engagement Phases and Sprint Sequences<span className="brand-dot">.</span></h3>
          <p className="hero-body-copy operate-body-copy-spaced">
            From initiation telemetry to systemic production deployment—the cycle of the run.
          </p>
          <div className="operate-phases-list">
            {phases.map((phase, idx) => (
              <div key={idx} className="glass-panel operate-phase-card">
                <div>
                  <div className="operate-phase-number">{phase.num}</div>
                  <div className="operate-phase-duration">{phase.duration}</div>
                </div>
                <div>
                  <h4 className="operate-phase-title">{phase.title}</h4>
                  <p className="operate-phase-desc">{phase.desc}</p>
                </div>
                <div>
                  <div className="operate-phase-deliverables-title">Deliverables</div>
                  <div className="operate-phase-deliverables-list">
                    {phase.deliverables.map((d, dIdx) => (
                      <div key={dIdx} className="operate-phase-deliverable-item">
                        <CheckCircle size={13} className="neon-icon operate-deliverable-icon" /> {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incubation Hub Onboarding */}
        <div className="operate-intake-block">
          <div className="operate-intake-header">
            <div className="eyebrow-tagline">// THE INTAKE</div>
            <h2 className="service-heading">System Schematic Vetting and Integration<span className="brand-dot">.</span></h2>
            <p className="hero-body-copy">
              The Incubation Hub operates on a rigorous, cohort-based integration sequence. We secure dedicated operational bandwidth and technical resources for every selected venture—ensuring your system receives raw, undivided power.
            </p>
          </div>
          <div className="operate-timeline-list">
            {incubationSteps.map((step, idx) => (
              <div key={idx} className="operate-timeline-step">
                <div className="operate-timeline-badge-column">
                  <div className="operate-timeline-badge">
                    {idx + 1}
                  </div>
                  {idx < incubationSteps.length - 1 && (
                    <div className="operate-timeline-connector" />
                  )}
                </div>
                <div className="operate-timeline-content">
                  <h4 className="operate-timeline-label">{step.label}</h4>
                  <p className="operate-timeline-desc">{step.desc}</p>
                </div>
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

export default HowWeOperateSection;