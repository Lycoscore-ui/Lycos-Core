import React, { useEffect, useState } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQGroup {
  category: string;
  items: FAQItem[];
}

const masterFaqs: FAQGroup[] = [
  {
    category: 'Cognitive Advisory and Strategy',
    items: [
      {
        question: 'What is the Lycos Core Cognitive Advisory protocol?',
        answer: 'Our Cognitive Advisory protocol provides high-yield strategic roadmap formulation, zero-trust governance architecture, and infrastructure readiness assessments for enterprise AI adoption.'
      },
      {
        question: 'How do you measure AI operational readiness?',
        answer: 'We evaluate data pipeline latency, compliance posture, vector database infrastructure, model explainability layers, and ROI feasibility across custom multi-phase scoring metrics.'
      }
    ]
  },
  {
    category: 'System Synthesis and Engineering',
    items: [
      {
        question: 'What technologies power the System Synthesis stack?',
        answer: 'We leverage high-performance neural caching, headless server-authoritative agents, custom vector storage, and zero-downtime orchestration pipelines.'
      },
      {
        question: 'How are custom AI models deployed with zero operational downtime?',
        answer: 'Deployments utilize continuous integration guardrails, shadow model validation, and automated rollback triggers to ensure 99.99% uptime during active transitions.'
      }
    ]
  },
  {
    category: 'Incubation Den (Kinetic, Apex, Citadel)',
    items: [
      {
        question: 'What is the distinction between Kinetic, Apex, and Citadel protocols?',
        answer: 'Kinetic accelerates early-stage MVP models into production; Apex scales revenue infrastructure and data monetization; Citadel provides enterprise-grade governance for high-yield spin-outs.'
      },
      {
        question: 'How do startups enter the Lycos Core Incubation Den?',
        answer: 'Founders submit architectural vector blueprints through our evaluation portal for multi-agent technical feasibility analysis and venture alignment.'
      }
    ]
  },
  {
    category: 'Autonomous Suites (Sentinel, Vector, Aegis, Synapse, Vanguard)',
    items: [
      {
        question: 'What does the Aegis Orchestration Matrix manage?',
        answer: 'Aegis coordinates multi-agent node networks, balancing data ingestion, context harmonization, and real-time compliance filtering with sub-12ms orchestration latency.'
      },
      {
        question: 'Are Autonomous Suites customizable for existing legacy software?',
        answer: 'Yes, all suites feature modular API connectors, semantic caching layers, and zero-trust middleware compatible with existing cloud and on-premise infrastructure.'
      }
    ]
  },
  {
    category: 'Governance, Security and Ethics',
    items: [
      {
        question: 'How does Lycos Core enforce zero-trust AI guardrails?',
        answer: 'Every input and output payload passes through real-time telemetry filters, PII sanitizers, and auditability logs aligned with global standards such as the EU AI Act.'
      }
    ]
  }
];

const MasterFAQPage: React.FC = () => {
  useEffect(() => {
    // Inject noindex, nofollow meta tag
    let metaRobots = document.querySelector('meta[name="robots"]');
    let created = false;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
      created = true;
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');

    return () => {
      if (created && metaRobots) {
        document.head.removeChild(metaRobots);
      }
    };
  }, []);

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

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
      <section id="kb-hero" className="section hero-fullscreen-section">
        <div className="hero-grid">
          <div>
            <div className="breadcrumb-text">// CORE &gt; // SUPPORT &gt; // KNOWLEDGE BASE</div>
            <h1 className="hero-heading">
              Master Knowledge Base and Spec Repository<span className="brand-dot">.</span>
            </h1>
            
            <div className="hero-tags-row">
              {['Telemetry Standards', 'API Specifications', 'System Runbooks'].map((tag, tIdx) => (
                <span key={tIdx} className="hero-pill-badge">
                  {tag}
                </span>
              ))}
            </div>

            <p className="hero-body-copy">
              Access comprehensive technical documentation, protocol specifications, and operational runbooks for the Lycos Core autonomous ecosystem.
            </p>
            
            <div className="subpage-hero-cta-row">
              <button 
                className="cta-primary" 
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                REQUEST TELEMETRY AUDIT
              </button>
              <button 
                className="cta-secondary" 
                onClick={() => {
                  const el = document.getElementById('block-kb');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                ACCESS SPEC CATALOG
              </button>
            </div>
          </div>

          {/* Right Hero Baseline Gauge Widget matching Gold-Standard */}
          <div className="hero-gauge-wrapper">
            <div className="baseline-card hero-gauge-card">
              <span className="hero-gauge-tag">
                // INTEL RESOLVER ACTIVE
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

      {/* Below-the-Fold Section: FAQ Dropdowns */}
      <section id="block-kb" className="section">
        <div className="centered-narrow-container">
          {masterFaqs.map((group, groupIdx) => (
            <div key={groupIdx} className="kb-group-card">
              <h2 className="kb-group-title">
                {group.category}
              </h2>
              <div>
                {group.items.map((item, itemIdx) => {
                  const itemKey = `${groupIdx}-${itemIdx}`;
                  const isOpen = !!openItems[itemKey];
                  return (
                    <div 
                      key={itemIdx} 
                      className={`kb-item-wrapper ${isOpen ? 'active' : ''}`}
                    >
                      <button
                        onClick={() => toggleItem(itemKey)}
                        className="kb-question-btn"
                      >
                        <span>{item.question}</span>
                        <ChevronDown size={16} className={`neon-icon transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="kb-answer-block">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
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

export default MasterFAQPage;
