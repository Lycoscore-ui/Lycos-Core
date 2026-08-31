import React, { useState } from 'react';
import { CheckCircle, CheckCircle2, Cpu, Settings, Layers, Terminal, ClipboardList, Target, Shield, TrendingUp } from 'lucide-react';
import LinkedInConnect from './LinkedInConnect';

const disciplines = [
  {
    icon: <Cpu size={24} className="neon-icon" />,
    title: 'Neural Architects',
    description: 'Specialists in machine learning architecture, custom model tuning, and agentic orchestration. They construct and deploy resilient, production-grade neural systems built for complex, high-stakes environments.',
  },
  {
    icon: <Settings size={24} className="neon-icon" />,
    title: 'Tactical Operators',
    description: "Field veterans with deep operational history inside global institutions. They translate raw AI capabilities into seamless, high-yield process evolution, bridging the gap between machine deployment and concrete business objectives.",
  },
  {
    icon: <Layers size={24} className="neon-icon" />,
    title: 'Systems Architects',
    description: 'Systems engineers who design the integration framework, ensuring new AI models merge flawlessly with your legacy infrastructure. They own the structural blueprint from telemetry to production, ensuring zero operational friction.',
  },
  {
    icon: <Terminal size={24} className="neon-icon" />,
    title: 'Core Engineers',
    description: 'Full-stack engineers focused on building highly secure, scalable, and resilient platforms. Specialists in API-first architectures, event-driven systems, and the high-performance cloud environments where enterprise AI operates.',
  },
  {
    icon: <ClipboardList size={24} className="neon-icon" />,
    title: 'Operations Lead',
    description: 'The rhythm of the run. They oversee deployment velocity, align cross-functional resources, and ensure execution phases transition seamlessly from telemetry to production with absolute structural discipline.',
  },
  {
    icon: <Target size={24} className="neon-icon" />,
    title: 'Cognitive Calibrator',
    description: 'Specialists in logic alignment and behavioral tuning. They design, program, and refine the precise instruction sets that govern model outputs, ensuring the system operates with maximum accuracy and zero drift.',
  },
  {
    icon: <Shield size={24} className="neon-icon" />,
    title: 'Adversarial Engineer',
    description: 'The ultimate defense line. They conduct rigorous adversarial testing, stress-test pipelines under heavy loads, and validate outputs to ensure the system is secure, compliant, and completely bulletproof before public deployment.',
  },
  {
    icon: <TrendingUp size={24} className="neon-icon" />,
    title: 'Growth Architect',
    description: 'Your dedicated alignment partner. They continuously evaluate the system\'s performance against your business objectives, mapping out future integration paths to ensure your AI core scales alongside your market ambitions.',
  },
];

const credentials = [
  'Deep-domain execution across heavily regulated sectors',
  'Architected systems for Tier-1 financial institutions and global corporations',
  'Scaled production-grade AI and automation frameworks across massive infrastructures',
  'Hardened expertise: Finance, Insurance, Healthcare, and High-Trust Markets',
  'Highly synchronized units—engineered to operate without silos',
];

const stats = [
  { value: '40+', label: 'Years of collective field execution' },
  { value: '12+', label: 'Global systems deployed and secured' },
  { value: '4', label: 'Integrated core disciplines' },
  { value: '3', label: 'Continents of active operations' },
];

const leadershipTeam = [
  {
    name: 'Alexander Vance',
    role: 'Chief Systems Architect',
    bio: 'Pioneered zero-trust cognitive architectures and high-throughput vector pipelines for multinational financial institutions and tier-1 intelligence infrastructures.',
    linkedin: 'https://www.linkedin.com/company/lycos-core',
    avatar: 'AV'
  },
  {
    name: 'Marcus Reid',
    role: 'Head of Autonomous Engineering',
    bio: 'Former principal ML engineer leading large-scale autonomous agent deployments, model calibration frameworks, and mission-critical production pipelines.',
    linkedin: 'https://www.linkedin.com/company/lycos-core',
    avatar: 'MR'
  },
  {
    name: 'Elena Rostov',
    role: 'Principal Cognitive Strategist',
    bio: 'Specialist in algorithmic governance, EU AI Act compliance, and executive transformation across complex and heavily regulated digital environments.',
    linkedin: 'https://www.linkedin.com/company/lycos-core',
    avatar: 'ER'
  }
];

export const WhoWeAreSection: React.FC = () => {
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
      <section id="who-hero" className="section hero-fullscreen-section">
        <div className="hero-grid">
          <div>
            <div className="eyebrow-tagline-green">
              // SYSTEMIC EXPERTISE
            </div>
            <h1 className="hero-heading">
              Forged by Operators. Built for the Field<span className="brand-dot">.</span>
            </h1>
            
            <div className="hero-tags-row">
              {['Neural Architects', 'Tactical Operators', 'Systems Engineering'].map((tag, tIdx) => (
                <span key={tIdx} className="hero-pill-badge">
                  {tag}
                </span>
              ))}
            </div>

            <p className="hero-body-copy">
              Lycos Core is a highly coordinated collective of AI engineers, system architects, and seasoned deployment specialists. We design, harden, and execute machine intelligence within the world's most complex, heavily regulated digital environments.
            </p>
          </div>

          {/* Right Hero Baseline Gauge Widget matching Gold-Standard */}
          <div className="hero-gauge-wrapper">
            <div className="baseline-card hero-gauge-card">
              <span className="hero-gauge-tag">
                // SYSTEMIC EXPERTISE ACTIVE
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
                Collective Operational Safety
              </span>

              <div className="hero-gauge-status">
                <CheckCircle2 size={16} className="neon-icon" /> Systems Fully Operational
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Below-the-Fold Content Section */}
      <section id="block-unit" className="section">
        {/* Stats row */}
        <div className="outcome-stats-grid">
          {stats.map((s, idx) => (
            <div key={idx} className="baseline-card outcome-stat-card">
              <div className="count-up-trigger stat-metric" data-target={s.value.replace(/[^0-9.]/g, '')} data-percent={s.value.includes('%')}>
                {s.value}
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Leadership Bio Cards Section */}
        <div className="who-unit-section-block">
          <div className="eyebrow-tagline-green">// LEADERSHIP</div>
          <h3 className="service-heading">Operational Leadership<span className="brand-dot">.</span></h3>
          <p className="hero-body-copy who-body-copy-spaced">
            Architecting the future of systemic intelligence with rigorous engineering discipline and proven enterprise track records.
          </p>

          <div className="leadership-grid">
            {leadershipTeam.map((leader, lIdx) => (
              <div key={lIdx} className="glass-panel purple-glow-card leadership-card">
                <div>
                  <div className="leadership-header">
                    <div className="leadership-avatar">
                      {leader.avatar}
                    </div>
                    <div>
                      <h4 className="leadership-name">{leader.name}</h4>
                      <span className="leadership-role">{leader.role}</span>
                    </div>
                  </div>
                  <p className="leadership-bio">
                    {leader.bio}
                  </p>
                </div>

                <a 
                  href={leader.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="leadership-link"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
                  </svg>
                  CONNECT ON LINKEDIN &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Team Disciplines */}
        <div className="who-unit-section-block">
          <div className="eyebrow-tagline-green">// THE UNIT</div>
          <h3 className="service-heading">Modular Disciplines. Synchronized Execution<span className="brand-dot">.</span></h3>
          <p className="hero-body-copy who-body-copy-spaced">
            Every deployment activates a highly synchronized, cross-functional unit. Real machine intelligence cannot be integrated through a single discipline; it requires a coordinated effort.
          </p>
          
          <div className="who-disciplines-grid">
            {disciplines.map((d, idx) => (
              <div key={idx} className="glass-panel purple-glow-card who-discipline-card">
                <div className="icon-badge">{d.icon}</div>
                <div>
                  <h4 className="who-discipline-title">{d.title}</h4>
                  <p className="who-discipline-description">{d.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience and Credentials */}
        <div className="glass-panel purple-glow-card who-territory-card">
          <div>
            <div className="eyebrow-tagline-green">
              // PROVEN TERRITORY
            </div>
            <h3 className="service-heading who-territory-heading">
              Surgically Hardened in Regulated Industries<span className="brand-dot">.</span>
            </h3>
            <p className="hero-body-copy who-body-copy-flush">
              Our operators have been embedded inside multinational financial institutions, global insurance giants, and high-security enterprise environments. We build to respect the boundaries while pushing the limits of what is possible.
            </p>
          </div>
          <div className="who-credentials-list">
            {credentials.map((c, idx) => (
              <div key={idx} className="who-credential-item">
                <CheckCircle size={16} className="neon-icon who-credential-icon" />
                <span className="who-credential-text">{c}</span>
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
              <LinkedInConnect />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhoWeAreSection;