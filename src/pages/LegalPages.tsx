import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import LinkedInConnect from '../components/LinkedInConnect';

interface LegalPageProps {
  type: 'terms' | 'privacy' | 'responsible-ai';
}

export const TermsOfUsePage: React.FC = () => (
  <LegalPageContent type="terms" />
);

export const PrivacyPolicyPage: React.FC = () => (
  <LegalPageContent type="privacy" />
);

export const ResponsibleAIPage: React.FC = () => (
  <LegalPageContent type="responsible-ai" />
);

const LegalPageContent: React.FC<LegalPageProps> = ({ type }) => {
  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const contentMap = {
    terms: {
      breadcrumb: '// CORE > // LEGAL > // WEBSITE TERMS OF USE',
      eyebrow: '// LEGAL FRAMEWORK',
      title: 'Website Terms of Use',
      lastUpdated: 'August 4, 2026',
      sections: [
        {
          heading: '1. Acceptance of Terms',
          body: 'By accessing and utilizing the Lycos Core digital infrastructure and services, you agree to be bound by these Terms of Use and all applicable global governance standards. If you do not agree with these terms, you must cease system access immediately.'
        },
        {
          heading: '2. Intellectual Property and System Assets',
          body: 'All proprietary neural architectures, algorithmic models, software suites, trade secrets, logos, and written content displayed on Lycos Core remain the exclusive intellectual property of Lycos Core LLC.'
        },
        {
          heading: '3. Platform Usage and Warranties',
          body: 'Users are strictly prohibited from attempting reverse engineering, unauthorized data extraction, or introducing malicious code into Lycos Core networks. Services are provided "as is" with zero-trust security guardrails.'
        }
      ]
    },
    privacy: {
      breadcrumb: '// CORE > // LEGAL > // PRIVACY POLICY',
      eyebrow: '// DATA GOVERNANCE',
      title: 'Privacy Policy',
      lastUpdated: 'August 4, 2026',
      sections: [
        {
          heading: '1. Data Collection and Telemetry',
          body: 'Lycos Core collects technical telemetry data required to optimize multi-agent orchestration latency and maintain system security. We do not sell or expose enterprise data to third-party model training pipelines.'
        },
        {
          heading: '2. Data Protection and Zero-Trust Standards',
          body: 'All stored information is protected using AES-256 encryption at rest and TLS 1.3 in transit. PII data is automatically sanitized prior to entering vector embedding layers.'
        },
        {
          heading: '3. Compliance Rights',
          body: 'Users possess the right to inspect, audit, or request complete deletion of personal interaction records in accordance with global standards such as GDPR and CCPA.'
        }
      ]
    },
    'responsible-ai': {
      breadcrumb: '// CORE > // LEGAL > // RESPONSIBLE USE OF AI POLICY',
      eyebrow: '// ALGORITHMIC ETHICS',
      title: 'Responsible Use of AI Policy',
      lastUpdated: 'August 4, 2026',
      sections: [
        {
          heading: '1. Ethical Guardrails and Alignment',
          body: 'Lycos Core enforces strict algorithmic safety filters across all autonomous suites to prevent bias, unauthorized autonomous actions, or non-deterministic compliance violations.'
        },
        {
          heading: '2. Human-in-the-Loop Governance',
          body: 'High-risk business operations executed by autonomous agents require continuous telemetry oversight and human authorization triggers for critical financial or operational decisions.'
        },
        {
          heading: '3. Auditability and EU AI Act Aligned Frameworks',
          body: 'Our deployment pipelines generate immutable audit logs for all model inferences, ensuring total compliance with the EU AI Act and global ethical AI standards.'
        }
      ]
    }
  };

  const data = contentMap[type];

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
      <section id="legal-hero" className="section hero-fullscreen-section">
        <div className="hero-grid">
          <div>
            <div className="breadcrumb-text">{data.breadcrumb}</div>
            <h1 className="hero-heading">
              {data.title}<span className="brand-dot">.</span>
            </h1>
            
            <div className="hero-tags-row">
              {[data.eyebrow, 'Corporate Telemetry', 'Zero-Trust Auditing'].map((tag, tIdx) => (
                <span key={tIdx} className="hero-pill-badge">
                  {tag}
                </span>
              ))}
            </div>

            <p className="hero-body-copy">
              Please review the sovereign legal terms, operational boundaries, and compliance frameworks governing the Lycos Core network.
            </p>
            
            <div className="subpage-hero-cta-row">
              <button 
                className="cta-primary" 
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                CONTACT LEGAL OFFICER
              </button>
              <button 
                className="cta-secondary" 
                onClick={() => {
                  const el = document.getElementById('block-legal');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                REVIEW DOCUMENTATION
              </button>
            </div>
          </div>

          {/* Right Hero Baseline Gauge Widget matching Gold-Standard */}
          <div className="hero-gauge-wrapper">
            <div className="baseline-card hero-gauge-card">
              <span className="hero-gauge-tag">
                // COMPLIANCE TELEMETRY
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
                Policy Regulatory Alignment
              </span>

              <div className="hero-gauge-status">
                <CheckCircle2 size={16} className="neon-icon" /> Fully Standards Compliant
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Below-the-Fold Section: Legal Content Card */}
      <section id="block-legal" className="section">
        <div className="centered-narrow-container">
          <div className="legal-block-card">
            <p className="legal-updated-date">Effective Date: {data.lastUpdated}</p>
            <div>
              {data.sections.map((sec, idx) => (
                <div key={idx} className="legal-block-section">
                  <h2 className="legal-section-title">{sec.heading}</h2>
                  <p className="legal-section-body">{sec.body}</p>
                </div>
              ))}
            </div>
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
                  Initialize Protocol
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
