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
    category: 'Cognitive Advisory & Strategic Roadmaps',
    items: [
      {
        question: 'What is the Lycos Core Cognitive Advisory protocol?',
        answer: 'Our Cognitive Advisory protocol provides high-yield strategic roadmap formulation, zero-trust governance architecture, and infrastructure readiness assessments for enterprise AI adoption.'
      },
      {
        question: 'How do you measure AI operational readiness and enterprise ROI?',
        answer: 'We evaluate data pipeline latency, compliance posture, vector database infrastructure, model explainability layers, and quantitative ROI feasibility across custom multi-phase scoring metrics.'
      },
      {
        question: 'How does Lycos Core structure legacy enterprise migrations?',
        answer: 'We deploy semantic abstraction layers and zero-trust middleware that interface with existing on-premises ERP, CRM, and mainframe databases without disrupting active business operations.'
      }
    ]
  },
  {
    category: 'Systems Synthesis & Infrastructure Engineering',
    items: [
      {
        question: 'What technologies power the System Synthesis stack?',
        answer: 'We leverage high-performance neural caching, headless server-authoritative agents, custom vector storage, and zero-downtime orchestration pipelines.'
      },
      {
        question: 'How are custom AI models deployed with zero operational downtime?',
        answer: 'Deployments utilize continuous integration guardrails, shadow model validation, and automated rollback triggers to ensure 99.99% uptime during active transitions.'
      },
      {
        question: 'Can Lycos Core models be deployed on sovereign private cloud infrastructure?',
        answer: 'Yes. All systems support on-premises edge appliances, air-gapped private enclaves, and localized cloud regions (AWS, Azure, GCP) to meet strict regional data sovereignty requirements.'
      }
    ]
  },
  {
    category: 'Autonomous Product Suites (Sentinel, Vector, Aegis, Synapse, Vanguard)',
    items: [
      {
        question: 'What is Lycos Sentinel and how does it handle front-line enterprise support?',
        answer: 'Lycos Sentinel is an autonomous customer resolution engine engineered for 92%+ deflection accuracy, resolving complex tier-1 and tier-2 operational inquiries in sub-second latency with strict compliance safeguards.'
      },
      {
        question: 'What does the Lycos Aegis Zero-Trust Matrix manage?',
        answer: 'Lycos Aegis coordinates multi-agent node networks, balancing data ingestion, context harmonization, cryptographic isolation, and real-time compliance filtering with sub-12ms orchestration latency.'
      },
      {
        question: 'How do Lycos Vector, Synapse, and Vanguard operate across operational workflows?',
        answer: 'Vector automates complex multi-step robotic workflows; Synapse maintains real-time cross-database contextual synchronization; Vanguard delivers predictive operational foresight and risk modeling.'
      },
      {
        question: 'Are Autonomous Suites customizable for existing custom software stacks?',
        answer: 'Yes, all suites feature modular REST and GraphQL API connectors, semantic caching layers, and zero-trust middleware compatible with existing cloud and on-premise infrastructure.'
      }
    ]
  },
  {
    category: 'Incubation Den (Kinetic, Apex, Citadel Protocols)',
    items: [
      {
        question: 'What is the distinction between Kinetic, Apex, and Citadel protocols?',
        answer: 'Kinetic accelerates early-stage MVP models into production with embedded engineering units; Apex scales revenue infrastructure and procurement channels for $250K+ ARR ventures; Citadel provides corporate spin-out entity formation, IP firewalls, and institutional capitalization.'
      },
      {
        question: 'How does intellectual property (IP) ownership work in the Incubation Den?',
        answer: '100% of IP is retained by the founder or enterprise parent. Lycos Core operates as an active technical builder; we do not claim any proprietary carve-outs on code engineered for your platform during the pathway timeline.'
      },
      {
        question: 'How is Kinetic co-investment capital allocated?',
        answer: 'Co-investment capital (milestone-gated) is unlocked dynamically as key engineering, architectural, and production deployment milestones are validated by our technical syndicate leads.'
      },
      {
        question: 'How does Citadel protect the parent corporation during a venture spin-out?',
        answer: 'We implement risk-isolated structural firewalls, IP licensing agreements, and clean corporate regulatory separation, ensuring the spin-out operates as an independent entity without exposing parent liabilities.'
      }
    ]
  },
  {
    category: 'Governance, Security, POPIA/GDPR & Zero-Trust Compliance',
    items: [
      {
        question: 'How does Lycos Core guarantee zero data leakage and non-training of public models?',
        answer: 'Client proprietary data, confidential codebases, and personal records processed through our systems are strictly isolated in memory. Client data is never used to train public or third-party foundation models.'
      },
      {
        question: 'How are POPIA, GDPR, and EU AI Act regulations enforced?',
        answer: 'Every input and output payload passes through real-time telemetry filters, PII sanitizers, and immutable auditability logs aligned with global standards such as the EU AI Act risk classification matrix.'
      },
      {
        question: 'What human-in-the-loop controls exist for high-stakes decision workflows?',
        answer: 'High-risk business operations executed by autonomous agents include mandatory human oversight checkpoints and override mechanisms before final authorization and execution.'
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

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Above-the-Fold Dedicated Hero Section (Strictly 100vh) */}
      <section id="kb-hero" className="section hero-fullscreen-section">
        <div className="hero-grid">
          <div>
            <div className="eyebrow-tagline-green">// TECHNICAL KNOWLEDGE BASE</div>
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
                  const el = document.getElementById('block-kb');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                BROWSE ALL SPECIFICATIONS
              </button>
              <button 
                className="cta-secondary" 
                onClick={() => {
                  const el = document.getElementById('block-kb');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                ACCESS PROTOCOL RUNBOOKS
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
    </>
  );
};

export default MasterFAQPage;
