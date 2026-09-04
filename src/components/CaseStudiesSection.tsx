import { useState } from 'react';
import type { CaseStudy } from '../types/cms';
import { mockCaseStudies } from '../data/mockCmsData';
import { Database, Clock, ChevronRight, Activity, Cpu, CheckCircle2 } from 'lucide-react';
import LinkedInConnect from './LinkedInConnect';

interface CaseStudiesSectionProps {
  caseStudiesList?: CaseStudy[];
}

export default function CaseStudiesSection({ caseStudiesList = mockCaseStudies }: CaseStudiesSectionProps) {
  const [activeId, setActiveId] = useState<string>(caseStudiesList[0]?.id || '');

  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const activeCase = caseStudiesList.find(c => c.id === activeId) || caseStudiesList[0];

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
      <section id="case-studies-hero" className="section hero-fullscreen-section">
        <div className="hero-grid">
          <div>
            <div className="eyebrow-tagline-green">// ENTERPRISE CASE EXPLORER</div>
            <h1 className="hero-heading">
              Quantifiable Performance Yield and Proven Implementations<span className="brand-dot">.</span>
            </h1>
            
            <div className="hero-tags-row">
              {['Enterprise Deploys', 'Operational Audits', 'Sovereign Architecture'].map((tag, tIdx) => (
                <span key={tIdx} className="hero-pill-badge">
                  {tag}
                </span>
              ))}
            </div>

            <p className="hero-body-copy">
              Review our active production-grade deployments. We partner with leading financial, compliance, and enterprise teams to resolve critical operational bottlenecks, maximize capital velocity, and deploy zero-trust sovereign systems.
            </p>
            
            <div className="subpage-hero-cta-row">
              <button 
                className="cta-primary" 
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                INITIALIZE PROJECT BRIEF
              </button>
              <button 
                className="cta-secondary" 
                onClick={() => {
                  const el = document.getElementById('block-case-studies');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                EXPLORE CASE EXPLORER
              </button>
            </div>
          </div>

          {/* Right Hero Baseline Gauge Widget matching Gold-Standard */}
          <div className="hero-gauge-wrapper">
            <div className="baseline-card hero-gauge-card">
              <span className="hero-gauge-tag">
                // VERIFIED ENTERPRISE RESULTS
              </span>
              
              <div className="hero-visual-centerpiece">
                <div className="roi-comparator-container">
                  {/* Metric 1: OPEX Reduction */}
                  <div className="roi-metric-row">
                    <div className="roi-metric-header">
                      <span className="roi-metric-title">OPEX REDUCTION</span>
                      <span className="roi-metric-value">-74%</span>
                    </div>
                    <div className="roi-progress-track">
                      <div className="roi-progress-fill row-1" />
                    </div>
                  </div>

                  {/* Metric 2: Throughput Velocity */}
                  <div className="roi-metric-row">
                    <div className="roi-metric-header">
                      <span className="roi-metric-title">THROUGHPUT MULTIPLIER</span>
                      <span className="roi-metric-value" style={{ color: '#00f0ff' }}>3.2x</span>
                    </div>
                    <div className="roi-progress-track">
                      <div className="roi-progress-fill row-2" />
                    </div>
                  </div>

                  {/* Metric 3: Execution Fidelity */}
                  <div className="roi-metric-row">
                    <div className="roi-metric-header">
                      <span className="roi-metric-title">EXECUTION ACCURACY</span>
                      <span className="roi-metric-value">99.9%</span>
                    </div>
                    <div className="roi-progress-track">
                      <div className="roi-progress-fill row-3" />
                    </div>
                  </div>

                  <div className="roi-footer-badge">
                    <span style={{ color: '#94a3b8' }}>DEPLOYMENTS: 100% SUCCESS</span>
                    <span style={{ color: '#8CFF32', fontWeight: 700 }}>AVG ROI: 3.2x</span>
                  </div>
                </div>
              </div>

              {/* Metric Label Strictly Underneath */}
              <span className="hero-gauge-label">
                Verified Enterprise Multiplier
              </span>

              <div className="hero-gauge-status">
                <CheckCircle2 size={16} className="neon-icon" /> 100% Deployed Success
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Below-the-Fold Section: Case Studies Explorer */}
      <section id="block-case-studies" className="section">
        {caseStudiesList.length === 0 ? (
          <div className="baseline-card empty-fallback-card">
            <p className="case-detail-partner">No case studies available.</p>
          </div>
        ) : (
          /* Bento Grid Explorer */
          <div className="case-studies-explorer-grid">
            
            {/* Left Selection Sidebar */}
            <div className="case-sidebar-list">
              <span className="case-metrics-title">
                Select Case Study
              </span>

              {caseStudiesList.map((cs) => {
                const isActive = cs.id === activeId;
                const primaryMetric = cs.metrics.find(m => m.isHighlight) || cs.metrics[0];

                return (
                  <button
                    key={cs.id}
                    onClick={() => setActiveId(cs.id)}
                    className={`case-sidebar-btn ${isActive ? 'active' : ''}`}
                  >
                    <div className="case-sidebar-top-row">
                      <span className="case-sidebar-industry">{cs.industry}</span>
                      <ChevronRight size={14} className={isActive ? 'neon-icon' : ''} />
                    </div>

                    <h4 className="case-sidebar-title">
                      {cs.clientName}
                    </h4>

                    {/* Tiny metric teaser */}
                    <div className="case-sidebar-teaser">
                      <span className="case-sidebar-teaser-value">{primaryMetric.value}</span>
                      <span className="case-sidebar-teaser-label">{primaryMetric.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Explorer View - Detailed Case Study Workspace */}
            {activeCase && (
              <div className="glass-panel case-detail-workspace">
                
                {/* Workspace Header */}
                <div className="case-detail-header">
                  <div>
                    <div className="case-detail-header-left">
                      <span className="case-industry-tag">
                        {activeCase.industry}
                      </span>
                      <span className="case-bullet-divider">•</span>
                      <span className="case-duration-text">
                        <Clock size={12} /> {activeCase.projectDuration}
                      </span>
                    </div>

                    <h3 className="case-detail-title">
                      {activeCase.title}
                    </h3>
                    <p className="case-detail-partner">
                      Client Partner: <strong>{activeCase.clientName}</strong>
                    </p>
                  </div>
                </div>

                {/* Structured Metric Framework Board */}
                <div className="case-detail-workspace-wrapper">
                  <h4 className="case-metrics-title">
                    Impact Metrics and Performance Yield
                  </h4>

                  <div className="case-metrics-grid">
                    {activeCase.metrics.map((m, idx) => (
                      <div key={idx} className="case-metric-card">
                        <div className="case-metric-icon">
                          {idx === 0 && <Activity size={20} />}
                          {idx !== 0 && <Cpu size={20} />}
                        </div>

                        <div className={`case-metric-value ${m.isHighlight ? 'highlight' : ''}`}>
                          {m.value}
                        </div>

                        <div className="case-metric-label">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Content split: Problem-Solution-Results layout vs Tech Stack Sidebar */}
                <div className="case-content-grid">
                  
                  {/* Problem, Solution, Results block layout */}
                  <div className="case-story-blocks">
                    
                    {/* Problem Block */}
                    <div className="case-problem-block">
                      <h4 className="case-story-block-title">
                        <span className="case-story-block-dot" />
                        Operational Problem
                      </h4>
                      <p className="case-story-block-title-text">
                        {activeCase.problem}
                      </p>
                    </div>

                    {/* Solution Block */}
                    <div className="case-solution-block">
                      <h4 className="case-story-block-title">
                        <span className="case-story-block-dot" />
                        Strategic Solution
                      </h4>
                      <div className="case-story-block-title-text" dangerouslySetInnerHTML={{ __html: activeCase.solution }} />
                    </div>

                    {/* Results Block */}
                    <div className="case-results-block">
                      <h4 className="case-story-block-title">
                        <span className="case-story-block-dot" />
                        Quantitative Results
                      </h4>
                      <div className="case-story-block-title-text" dangerouslySetInnerHTML={{ __html: activeCase.results }} />
                    </div>

                  </div>

                  {/* Tech Stack Sidebar */}
                  <div className="case-tech-sidebar">
                    <h4 className="case-tech-title">
                      <Database size={16} className="neon-icon" /> Technology Stack
                    </h4>

                    <div className="case-tech-list">
                      {activeCase.techStack.map((tech) => (
                        <div key={tech} className="case-tech-item">
                          <span className="case-tech-bullet" />
                          {tech}
                        </div>
                      ))}
                    </div>

                    <div className="case-tech-footer">
                      This technical implementation stack is locked in our server-side secure deployment environment.
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}
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
}
