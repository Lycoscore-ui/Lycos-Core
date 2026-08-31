import { useState } from 'react';
import { 
   Shield, 
   Cpu, 
   ChevronDown, 
   CheckCircle2,
   Lock,
   Network,
   Compass
} from 'lucide-react';
import ROISimulatorSection from './ROISimulatorSection';
import VectorROISimulator from './VectorROISimulator';
import AegisROISimulator from './AegisROISimulator';
import SynapseROISimulator from './SynapseROISimulator';
import VanguardROISimulator from './VanguardROISimulator';
import AegisNodeNetwork from './AegisNodeNetwork';
import LinkedInConnect from './LinkedInConnect';

export default function AIProductsSection() {
  const [activeProduct, setActiveProduct] = useState<number>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
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
      <section id="products-hero" className="section hero-fullscreen-section">
        <div className="hero-grid">
          <div>
            <div className="eyebrow-tagline-green">
              // PRODUCTION-GRADE PRODUCT ARSENAL
            </div>
            <h1 className="hero-heading">
              Autonomous Engine Suites Engineered for Quantifiable Operational Yield<span className="brand-dot">.</span>
            </h1>
            
            <div className="hero-tags-row">
              {['Sovereign Agents', 'Process Automation', 'Security Gateways'].map((tag, tIdx) => (
                <span key={tIdx} className="hero-pill-badge">
                  {tag}
                </span>
              ))}
            </div>

            <p className="hero-body-copy">
              Every module in the Lycos Core arsenal is engineered around a single constraint: deterministic, measurable operational yield. We bypass traditional per-seat SaaS models to deploy outcome-aligned infrastructure anchored directly to your core performance metrics.
            </p>
            
            <div className="subpage-hero-cta-row">
              <button 
                className="cta-primary" 
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                INITIALIZE SYSTEM DEPLOYMENT
              </button>
              <button 
                className="cta-secondary" 
                onClick={() => {
                  const el = document.getElementById('block-products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                VIEW OPERATIONAL TELEMETRY
              </button>
            </div>
          </div>

          {/* Right Hero Baseline Gauge Widget matching Gold-Standard */}
          <div className="hero-gauge-wrapper">
            <div className="baseline-card hero-gauge-card">
              <span className="hero-gauge-tag">
                // REAL-TIME YIELD COEFFICIENT
              </span>
              
              <div className="hero-gauge-svg-container">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8CFF32" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="0.1" strokeLinecap="round" />
                </svg>
                <div className="hero-gauge-number-wrap">
                  <span className="count-up-trigger stat-metric" data-target="95.6" data-percent="true">95.6%</span>
                </div>
              </div>

              {/* Metric Label Strictly Underneath */}
              <span className="hero-gauge-label">
                Average Operational Defect Reduction
              </span>

              <div className="hero-gauge-status">
                <CheckCircle2 size={16} className="neon-icon" /> Deterministic Pipeline Speed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Below-the-Fold Section: Products Tab Area */}
      <section id="block-products" className="section">
        {/* Tab Selection Area */}
        <div className="products-tabs-grid">
          {/* Tab 1: Sentinel */}
          <button 
            onClick={() => { setActiveProduct(0); setActiveFaq(null); }}
            className={`product-tab-btn ${activeProduct === 0 ? 'active' : ''}`}
          >
            <div className="tab-icon-wrap">
              <Shield size={20} />
            </div>
            <span className="tab-tag">CUSTOMER OPERATIONS</span>
            <span className="tab-title">Lycos Sentinel</span>
          </button>

          {/* Tab 2: Vector */}
          <button 
            onClick={() => { setActiveProduct(1); setActiveFaq(null); }}
            className={`product-tab-btn ${activeProduct === 1 ? 'active' : ''}`}
          >
            <div className="tab-icon-wrap">
              <Cpu size={20} />
            </div>
            <span className="tab-tag">BACK-OFFICE OPERATIONS</span>
            <span className="tab-title">Lycos Vector</span>
          </button>

          {/* Tab 3: Aegis */}
          <button 
            onClick={() => { setActiveProduct(2); setActiveFaq(null); }}
            className={`product-tab-btn ${activeProduct === 2 ? 'active' : ''}`}
          >
            <div className="tab-icon-wrap">
              <Lock size={20} />
            </div>
            <span className="tab-tag">SECURITY INFRASTRUCTURE</span>
            <span className="tab-title">Lycos Aegis</span>
          </button>

          {/* Tab 4: Synapse */}
          <button 
            onClick={() => { setActiveProduct(3); setActiveFaq(null); }}
            className={`product-tab-btn ${activeProduct === 3 ? 'active' : ''}`}
          >
            <div className="tab-icon-wrap">
              <Network size={20} />
            </div>
            <span className="tab-tag">DATA INTEGRATION</span>
            <span className="tab-title">Lycos Synapse</span>
          </button>

          {/* Tab 5: Vanguard */}
          <button 
            onClick={() => { setActiveProduct(4); setActiveFaq(null); }}
            className={`product-tab-btn ${activeProduct === 4 ? 'active' : ''}`}
          >
            <div className="tab-icon-wrap">
              <Compass size={20} />
            </div>
            <span className="tab-tag">PREDICTIVE INTELLIGENCE</span>
            <span className="tab-title">Lycos Vanguard</span>
          </button>
        </div>

        {/* ------------------------- SENTINEL (Tab 0) ------------------------- */}
        {activeProduct === 0 && (
          <>
            {/* Product Intro */}
            <div className="glass-panel product-detail-card">
              {/* Left Col */}
              <div>
                <span className="eyebrow-tagline">
                  CUSTOMER OPERATIONS // Secure Front-Line Automation
                </span>
                <h3 className="service-heading">
                  Lycos Sentinel
                </h3>
                <p className="product-tagline">
                  The Intelligent Front-Line Guardian. Autonomous execution. Sovereign data isolation.
                </p>
                <p className="service-desc">
                  Lycos Sentinel is a custom-engineered, highly autonomous digital agent designed to act as an intuitive, protective extension of your team. Sentinel instinctively navigates complex user workflows and resolves friction points in real-time across email, chat, and voice—keeping your core proprietary databases entirely insulated, secure, and compliant.
                </p>
                
                <div className="product-business-case">
                  <div className="product-business-case-title">
                    The Business Case
                  </div>
                  <p className="product-business-case-desc">
                    Customer support teams are expensive, inconsistent, and hard to scale. Lycos Sentinel handles your most common request types autonomously, so your human team focuses only on the cases that genuinely need them.
                  </p>
                </div>

                <div className="tags-row">
                  {['Financial Services', 'Insurance', 'E-Commerce', 'Professional Services'].map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Col */}
              <div>
                <div className="integrations-eyebrow">
                  Anatomy of Sentinel
                </div>

                <div className="anatomy-list">
                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">Dynamic Intent Routing</h4>
                      <p className="service-desc">
                        Sentinel doesn't just match keywords. It uses semantic search and vector embeddings to instantly understand a user's intent, even if they use unstructured language.
                      </p>
                    </div>
                  </div>

                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">The Guardrail Shield (PII Scrubbing)</h4>
                      <p className="service-desc">
                        An active middleware layer that automatically detects and redacts Personally Identifiable Information (PII) like credit cards, SSNs, and passwords before the data ever touches the language model.
                      </p>
                    </div>
                  </div>

                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">Contextual Memory Vault</h4>
                      <p className="service-desc">
                        Sentinel maintains a running, secure state during long multi-step interactions, remembering previous user inputs without needing to pass the entire historical database back and forth.
                      </p>
                    </div>
                  </div>

                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">Multi-Modal Pipeline</h4>
                      <p className="service-desc">
                        Built to natively ingest not just text, but images, PDFs, billing sheets, and voice notes, analyzing the data on the fly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Simulator */}
            <ROISimulatorSection />

            {/* Proven Outcomes */}
            <div className="glass-panel outcomes-split-grid">
              <div>
                <span className="eyebrow-tagline">
                  PROVEN OUTCOMES
                </span>
                <h3 className="service-heading">
                  Definitive Results, Not Projections
                </h3>
                <p className="service-desc">
                  Lycos Sentinel operates consistently at an enterprise standard, delivering verifiable margins.
                </p>
              </div>

              <div className="outcomes-metrics-grid-2">
                <div>
                  <div className="count-up-trigger stat-metric">
                    65-80%
                  </div>
                  <p className="service-desc">
                    of inbound customer queries resolved natively without human escalation.
                  </p>
                </div>

                <div>
                  <div className="count-up-trigger stat-metric">
                    &lt;90 Sec
                  </div>
                  <p className="service-desc">
                    average handling time to fully resolve complex multi-step workflows.
                  </p>
                </div>
              </div>
            </div>

            {/* Onboarding Playbook */}
            <div className="roadmap-section">
              <div className="section-header-center">
                <span className="eyebrow-tagline">
                  SENTINEL ONBOARDING PLAYBOOK
                </span>
                <h2 className="section-title">
                  How We Go <span className="brand-dot">Live.</span>
                </h2>
                <p className="section-desc">
                  A highly structured execution framework designed to integrate secure AI agents safely within 90 days.
                </p>
              </div>

              <div className="playbook-grid">
                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 1 (Weeks 1-2)
                  </span>
                  <h4 className="faq-btn-text">Ingestion</h4>
                  <p className="service-desc">
                    We connect to your historical ticket logs, knowledge bases, and API documentation to build Sentinel's custom training boundaries.
                  </p>
                </div>

                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 2 (Weeks 3-5)
                  </span>
                  <h4 className="faq-btn-text">Calibration</h4>
                  <p className="service-desc">
                    Our engineers fine-tune the model parameters, testing Sentinel in a sandbox environment against 10,000 synthetic customer conversations to ensure alignment.
                  </p>
                </div>

                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 3 (Weeks 6-8)
                  </span>
                  <h4 className="faq-btn-text">Shadow Mode</h4>
                  <p className="service-desc">
                    Sentinel runs quietly in the background of your live operations, generating drafts for your human agents to review and approve, validating accuracy.
                  </p>
                </div>

                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 4 (Weeks 9+)
                  </span>
                  <h4 className="faq-btn-text">Active Deployment</h4>
                  <p className="service-desc">
                    Sentinel goes live on your front line, actively resolving inquiries while your human team monitors performance through the telemetry dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="faq-container">
              <div className="section-header-center">
                <span className="eyebrow-tagline">
                  SENTINEL TECHNOLOGY PLATFORM
                </span>
                <h3 className="section-title">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="faq-list">
                <div className="glass-panel">
                  <button onClick={() => toggleFaq(0)} className="faq-btn">
                    <span className="faq-btn-text">
                      How do you prevent Sentinel from making up (hallucinating) false information?
                    </span>
                    <ChevronDown size={16} className={`neon-icon transition-transform ${activeFaq === 0 ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === 0 && (
                    <div className="faq-content">
                      Sentinel operates within a strict Retrieval-Augmented Generation (RAG) framework. If a user asks a question that lies outside your approved knowledge base, Sentinel is programmed to gracefully route the query to a human agent.
                    </div>
                  )}
                </div>

                <div className="glass-panel">
                  <button onClick={() => toggleFaq(1)} className="faq-btn">
                    <span className="faq-btn-text">
                      Do we need to hire a team of AI prompt engineers to maintain this?
                    </span>
                    <ChevronDown size={16} className={`neon-icon transition-transform ${activeFaq === 1 ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === 1 && (
                    <div className="faq-content">
                      No. Lycos Sentinel is delivered as a fully managed asset. Our Tech Services team handles the continuous training, updates, and maintenance of your models as part of your enterprise license.
                    </div>
                  )}
                </div>

                <div className="glass-panel">
                  <button onClick={() => toggleFaq(2)} className="faq-btn">
                    <span className="faq-btn-text">
                      Can Sentinel integrate with our legacy software (e.g., custom ledgers or older CRMs)?
                    </span>
                    <ChevronDown size={16} className={`neon-icon transition-transform ${activeFaq === 2 ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === 2 && (
                    <div className="faq-content">
                      Yes. By pairing Sentinel with Lycos Synapse (our integration layer), we build secure API bridges to legacy systems, allowing Sentinel to write data to older databases without exposing security credentials.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ------------------------- VECTOR (Tab 1) ------------------------- */}
        {activeProduct === 1 && (
          <>
            {/* Product Intro */}
            <div className="glass-panel product-detail-card">
              {/* Left Col */}
              <div>
                <span className="eyebrow-tagline">
                  BACK-OFFICE OPERATIONS // HIGH-VELOCITY PROCESS AUTOMATION
                </span>
                <h3 className="service-heading">
                  Lycos Vector
                </h3>
                <p className="product-tagline">
                  The High-Velocity Automation Engine. Seamless execution. Exponential processing scale.
                </p>
                <p className="service-desc">
                  Lycos Vector is a custom-engineered, high-throughput digital engine designed to take complete operational ownership of your highest-volume administrative pipelines. Vector silently ingests, parses, validates, and routes complex transactional workflows in real-time—keeping your operations moving at machine speed.
                </p>
                
                <div className="product-business-case">
                  <div className="product-business-case-title">
                    The Business Case
                  </div>
                  <p className="product-business-case-desc">
                    Back-office administrative bottlenecks, document reconciliation, and manual workflow handoffs are expensive, slow, and prone to human error. Lycos Vector automates your most complex, repetitive transaction types natively, allowing your organization to scale operational volume exponentially.
                  </p>
                </div>

                <div className="tags-row">
                  {['FinTech and Wealth', 'Property Management', 'Logistics and Supply', 'EdTech and Education', 'Healthcare Admin'].map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Col */}
              <div>
                <div className="integrations-eyebrow">
                  Anatomy of Vector
                </div>

                <div className="anatomy-list">
                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">Intelligent Ingestion Pipeline</h4>
                      <p className="service-desc">
                        Natively ingests and parses unstructured data from multi-format international bills of lading, PDFs, customs declarations, and transcripts with near-zero latency.
                      </p>
                    </div>
                  </div>

                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">Dynamic Workflow Router</h4>
                      <p className="service-desc">
                        Instantly coordinates complex system handoffs and triggers downstream operational cycles the millisecond a transaction is validated.
                      </p>
                    </div>
                  </div>

                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">The Zero-Error Guardrail</h4>
                      <p className="service-desc">
                        An active validation layer that mathematically eliminates manual transcription, routing, and data-entry errors before they impact your ledger.
                      </p>
                    </div>
                  </div>

                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">The Scale Coefficient</h4>
                      <p className="service-desc">
                        Built to handle sudden, massive seasonal spikes in processing volume effortlessly, ensuring your marginal cost per transaction remains virtually zero.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Simulator */}
            <VectorROISimulator />

            {/* Proven Outcomes */}
            <div className="glass-panel outcomes-split-grid">
              <div>
                <span className="eyebrow-tagline">
                  PROVEN OUTCOMES
                </span>
                <h3 className="service-heading">
                  Verifiable Operational Gains
                </h3>
                <p className="service-desc">
                  Lycos Vector accelerates back-office operations to structural parity with machine processing limitations.
                </p>
              </div>

              <div className="outcomes-metrics-grid">
                <div>
                  <div className="count-up-trigger stat-metric">90%+</div>
                  <p className="service-desc">
                    average cycle time reduction, collapsing onboarding and processing pipelines from days to minutes.
                  </p>
                </div>

                <div>
                  <div className="count-up-trigger stat-metric">0%</div>
                  <p className="service-desc">
                    data-entry defect rate, completely shielding the organization from expensive manual reprocessing loops.
                  </p>
                </div>

                <div>
                  <div className="count-up-trigger stat-metric">3x–18x</div>
                  <p className="service-desc">
                    transaction capacity scaling achieved across core business divisions without expanding operational headcount.
                  </p>
                </div>
              </div>
            </div>

            {/* Onboarding Playbook */}
            <div className="roadmap-section">
              <div className="section-header-center">
                <span className="eyebrow-tagline">
                  VECTOR ONBOARDING PLAYBOOK
                </span>
                <h2 className="section-title">
                  Operational Phase <span className="brand-dot">Mapping.</span>
                </h2>
                <p className="section-desc">
                  Integrating highly scalable, document-processing pipelines into your legacy workflows inside of 90 days.
                </p>
              </div>

              <div className="playbook-grid">
                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 1 (Weeks 1-2)
                  </span>
                  <h4 className="faq-btn-text">Ingestion</h4>
                  <p className="service-desc">
                    We map your existing manual workflows, connect to your legacy system APIs, and ingest historical transaction logs to establish baseline processing logic.
                  </p>
                </div>

                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 2 (Weeks 3-5)
                  </span>
                  <h4 className="faq-btn-text">Calibration</h4>
                  <p className="service-desc">
                    Our engineers run Vector in an isolated sandbox, stress-testing the automation pipelines against 10,000 synthetic transactions to ensure compliance.
                  </p>
                </div>

                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 3 (Weeks 6-8)
                  </span>
                  <h4 className="faq-btn-text">Shadow Mode</h4>
                  <p className="service-desc">
                    Vector operates silently in the background of live operations, drafting and validating transactions side-by-side with your team to mathematically verify accuracy.
                  </p>
                </div>

                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 4 (Weeks 9+)
                  </span>
                  <h4 className="faq-btn-text">Active Deployment</h4>
                  <p className="service-desc">
                    Vector takes over active pipeline routing. Your team transitions from manual processors to high-level system monitors via the telemetry dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="faq-container-wide">
              <div className="section-header-center">
                <span className="eyebrow-tagline">
                  VECTOR ENGINE PLATFORM
                </span>
                <h3 className="section-title">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="faq-list-wide">
                <div className="glass-panel">
                  <button onClick={() => toggleFaq(0)} className="faq-btn-wide">
                    <span className="faq-btn-text-wide">
                      How does Vector handle unstructured documents like messy PDFs or scans?
                    </span>
                    <ChevronDown size={16} className={`neon-icon transition-transform ${activeFaq === 0 ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === 0 && (
                    <div className="faq-content-wide">
                      Vector uses advanced multi-modal parsing and OCR layers trained specifically on enterprise-grade document layouts. It doesn't just read text; it understands document structure, context, and data relationships to extract information.
                    </div>
                  )}
                </div>

                <div className="glass-panel">
                  <button onClick={() => toggleFaq(1)} className="faq-btn-wide">
                    <span className="faq-btn-text-wide">
                      What happens if a transaction fails the validation criteria?
                    </span>
                    <ChevronDown size={16} className={`neon-icon transition-transform ${activeFaq === 1 ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === 1 && (
                    <div className="faq-content-wide">
                      Vector utilizes an automated exception-handling loop. If a file falls below a strict validation confidence threshold, it is instantly routed to a human administrator for single-click approval, preventing system lockups.
                    </div>
                  )}
                </div>

                <div className="glass-panel">
                  <button onClick={() => toggleFaq(2)} className="faq-btn-wide">
                    <span className="faq-btn-text-wide">
                      Can Vector bridge data directly to older ERP mainframes without modern API endpoints?
                    </span>
                    <ChevronDown size={16} className={`neon-icon transition-transform ${activeFaq === 2 ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === 2 && (
                    <div className="faq-content-wide">
                      Yes. By combining Vector with Lycos Synapse, we construct secure database connectors and remote file system pipelines to bridge legacy transaction systems without requiring database upgrades.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ------------------------- AEGIS (Tab 2) ------------------------- */}
        {activeProduct === 2 && (
          <>
            {/* Product Intro */}
            <div className="glass-panel product-detail-card">
              {/* Left Col */}
              <div>
                <span className="eyebrow-tagline">
                  SECURITY INFRASTRUCTURE // SOVEREIGN ZERO-TRUST PROTOCOLS
                </span>
                <h3 className="service-heading">
                  Lycos Aegis
                </h3>
                <p className="product-tagline">
                  The Zero-Trust Isolation Gateway. Deterministic firewalling. Sovereign containerization.
                </p>
                <p className="service-desc">
                  Lycos Aegis is a custom-engineered, sovereign security gateway designed to establish a deterministic containment sanctuary for all AI operations. Aegis acts as a defensive shield between your core enterprise databases and third-party AI pipelines.
                </p>
                
                <div className="product-business-case">
                  <div className="product-business-case-title">
                    The Business Case
                  </div>
                  <p className="product-business-case-desc">
                    Traditional cloud-API calls expose proprietary intelligence and PII to third-party model providers, creating severe regulatory liability. Lycos Aegis ensures your enterprise data streams are cryptographically scrubbed, isolated, and contained.
                  </p>
                </div>

                <div className="tags-row">
                  {['Sovereign Enterprise', 'SOC2 / HIPAA Compliance', 'FinTech Security', 'Defense and Aerospace'].map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Col */}
              <div>
                <div className="integrations-eyebrow">
                  Anatomy of Aegis
                </div>

                <div className="anatomy-list">
                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">Sovereign Cloud Isolation</h4>
                      <p className="service-desc">
                        Aegis containerizes your active workloads inside fully isolated cloud sub-systems, ensuring zero-state leakages to public databases.
                      </p>
                    </div>
                  </div>

                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">Cryptographic PII Masking</h4>
                      <p className="service-desc">
                        Automatically substitutes customer records, API keys, and sensitive financial logs with tokenized mock hashes before sending outbound prompts.
                      </p>
                    </div>
                  </div>

                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">Audit Log Telemetry</h4>
                      <p className="service-desc">
                        Generates secure, tamper-proof audit trails for all LLM transactions, satisfying regulatory criteria for SOC2, HIPAA, and GDPR.
                      </p>
                    </div>
                  </div>

                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">Access Gateway Rules</h4>
                      <p className="service-desc">
                        Enforces precise fine-grained permission protocols to control exactly which operational agents are permitted to query specific internal data arrays.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Aegis Node Network */}
            <div className="roadmap-section">
              <div className="section-header-center">
                <span className="eyebrow-tagline">
                  AEGIS ACTIVE TELEMETRY
                </span>
                <h2 className="section-title">
                  Visual Containment <span className="brand-dot">Map.</span>
                </h2>
                <p className="section-desc">
                  Interactive representation of Aegis's zero-trust gateway isolating core databases from public model environments in real time.
                </p>
              </div>

              <AegisNodeNetwork />
            </div>

            {/* ROI Simulator */}
            <AegisROISimulator />

            {/* Proven Outcomes */}
            <div className="glass-panel outcomes-split-grid">
              <div>
                <span className="eyebrow-tagline">
                  PROVEN OUTCOMES
                </span>
                <h3 className="service-heading">
                  Definitive Results, Not Projections
                </h3>
                <p className="service-desc">
                  Lycos Aegis operates consistently at an enterprise standard, delivering verifiable margins.
                </p>
              </div>

              <div className="outcomes-metrics-grid-2">
                <div>
                  <div className="count-up-trigger stat-metric">
                    90%–99.9%
                  </div>
                  <p className="service-desc">
                    reduction in vulnerability exposure and anomaly containment speed across connected systems.
                  </p>
                </div>

                <div>
                  <div className="count-up-trigger stat-metric">
                    &lt; 10 ms
                  </div>
                  <p className="service-desc">
                    zero-trust containment time of suspicious activity, preventing threat propagation instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* Onboarding Playbook */}
            <div className="roadmap-section">
              <div className="section-header-center">
                <span className="eyebrow-tagline">
                  AEGIS ONBOARDING PLAYBOOK
                </span>
                <h2 className="section-title">
                  How We Go <span className="brand-dot">Live.</span>
                </h2>
                <p className="section-desc">
                  A highly structured execution framework designed to integrate secure AI agents safely within 90 days.
                </p>
              </div>

              <div className="playbook-grid">
                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 1 (Weeks 1-2)
                  </span>
                  <h4 className="faq-btn-text">Ingestion and Threat Modeling</h4>
                  <p className="service-desc">
                    We map your active database environments, access control lists, and network topology to pinpoint high-value risk vectors.
                  </p>
                </div>

                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 2 (Weeks 3-5)
                  </span>
                  <h4 className="faq-btn-text">Sandbox Provisioning</h4>
                  <p className="service-desc">
                    Our engineers deploy isolated, zero-trust cloud spaces alongside your legacy systems, running shadow tests to calibrate security rules.
                  </p>
                </div>

                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 3 (Weeks 6-8)
                  </span>
                  <h4 className="faq-btn-text">Audit Pipeline Alignment</h4>
                  <p className="service-desc">
                    We integrate Aegis's automated logging system with your audit targets (SOC2, HIPAA, etc.), verifying compliance telemetry pipelines.
                  </p>
                </div>

                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 4 (Weeks 9+)
                  </span>
                  <h4 className="faq-btn-text">Active Shielding</h4>
                  <p className="service-desc">
                    The zero-trust sanctuary goes live. Your data streams pass through Aegis's isolated sandboxes while your CISO monitors via the telemetry dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="faq-container-wide">
              <div className="section-header-center">
                <span className="eyebrow-tagline">
                  AEGIS SECURITY PLATFORM
                </span>
                <h3 className="section-title">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="faq-list-wide">
                <div className="glass-panel">
                  <button onClick={() => toggleFaq(0)} className="faq-btn-wide">
                    <span className="faq-btn-text-wide">
                      How does Aegis prevent performance latency inside zero-trust sandboxes?
                    </span>
                    <ChevronDown size={16} className={`neon-icon transition-transform ${activeFaq === 0 ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === 0 && (
                    <div className="faq-content-wide">
                      Aegis's isolated cloud spaces are architected at the edge with microsecond routing pipelines. Your applications experience virtually zero transactional delay while keeping data completely insulated.
                    </div>
                  )}
                </div>

                <div className="glass-panel">
                  <button onClick={() => toggleFaq(1)} className="faq-btn-wide">
                    <span className="faq-btn-text-wide">
                      Can Aegis integrate directly with existing compliance automation tools like Vanta or Drata?
                    </span>
                    <ChevronDown size={16} className={`neon-icon transition-transform ${activeFaq === 1 ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === 1 && (
                    <div className="faq-content-wide">
                      Yes. Aegis acts as the source-of-truth logging engine, automatically exporting structured, cryptographic proof of compliance directly to third-party automation tools via secure API.
                    </div>
                  )}
                </div>

                <div className="glass-panel">
                  <button onClick={() => toggleFaq(2)} className="faq-btn-wide">
                    <span className="faq-btn-text-wide">
                      How does this affect our liability under cybersecurity insurance policies?
                    </span>
                    <ChevronDown size={16} className={`neon-icon transition-transform ${activeFaq === 2 ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === 2 && (
                    <div className="faq-content-wide">
                      By reducing your baseline incident probability (Pi) and securing a proactive risk mitigation profile with mathematical proofs, enterprise clients typically use Aegis's reports to negotiate down premium costs.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ------------------------- SYNAPSE (Tab 3) ------------------------- */}
        {activeProduct === 3 && (
          <>
            {/* Product Intro */}
            <div className="glass-panel product-detail-card">
              {/* Left Col */}
              <div>
                <span className="eyebrow-tagline">
                  DATA INTEGRATION // REAL-TIME ENTERPRISE ALIGNMENT
                </span>
                <h3 className="service-heading">
                  Lycos Synapse
                </h3>
                <p className="product-tagline">
                  The Unified Nervous System. Zero-latency integration. Sovereign data orchestrator.
                </p>
                <p className="service-desc">
                  Lycos Synapse is an elegant, low-latency data integration layer custom-engineered to bridge disconnected software tools, legacy systems, and isolated databases into a singular, cohesive ecosystem.
                </p>
                
                <div className="product-business-case">
                  <div className="product-business-case-title">
                    The Business Case
                  </div>
                  <p className="product-business-case-desc">
                    Fragmented operational systems are a silent tax on enterprise productivity. Teams spend hours manually copy-pasting data and reconciling broken pipelines. Lycos Synapse automates cross-platform data streams.
                  </p>
                </div>

                <div className="tags-row">
                  {['FinTech and Wealth', 'Property Management', 'Logistics and Supply', 'EdTech and Education', 'Healthcare Admin'].map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Col */}
              <div>
                <div className="integrations-eyebrow">
                  Anatomy of Synapse
                </div>

                <div className="anatomy-list">
                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">Administrative Eradicator</h4>
                      <p className="service-desc">
                        Eradicates human copy-paste errors and "swivel-chair operations." Automates complex data replication tasks to shift team capacity toward high-value operations.
                      </p>
                    </div>
                  </div>

                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">Pipeline Plumber</h4>
                      <p className="service-desc">
                        Stops revenue leaks by eliminating synchronization lag. Unifies disjointed pipelines with sub-second latency to secure high-value transaction conversions.
                      </p>
                    </div>
                  </div>

                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">Infrastructure Sovereignty</h4>
                      <p className="service-desc">
                        Deploys natively within your sovereign cloud container. Keeps high-priority data transfers strictly within your security bounds.
                      </p>
                    </div>
                  </div>

                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">Multi-System Schema Alignment</h4>
                      <p className="service-desc">
                        Standardizes disparate data models on the fly. Bridges legacy core mainframes, CRMs, and isolated databases without requiring manual translation layers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Simulator */}
            <SynapseROISimulator />

            {/* Proven Outcomes */}
            <div className="glass-panel outcomes-split-grid">
              <div>
                <span className="eyebrow-tagline">
                  PROVEN OUTCOMES
                </span>
                <h3 className="service-heading">
                  Definitive Results, Not Projections
                </h3>
                <p className="service-desc">
                  Lycos Synapse operates consistently at an enterprise standard, delivering verifiable margins.
                </p>
              </div>

              <div className="outcomes-metrics-grid-2">
                <div>
                  <div className="count-up-trigger stat-metric">
                    &lt; 1 Sec
                  </div>
                  <p className="service-desc">
                    average operational synchronization time across cross-departmental databases.
                  </p>
                </div>

                <div>
                  <div className="count-up-trigger stat-metric">
                    99.9%
                  </div>
                  <p className="service-desc">
                    achieving Straight-Through Processing (STP) on automated transactions without manual correction loops.
                  </p>
                </div>
              </div>
            </div>

            {/* Onboarding Playbook */}
            <div className="roadmap-section">
              <div className="section-header-center">
                <span className="eyebrow-tagline">
                  SYNAPSE ONBOARDING PLAYBOOK
                </span>
                <h2 className="section-title">
                  How We Go <span className="brand-dot">Live.</span>
                </h2>
                <p className="section-desc">
                  A highly structured execution framework designed to integrate secure AI agents safely within 90 days.
                </p>
              </div>

              <div className="playbook-grid">
                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 1 (Weeks 1-2)
                  </span>
                  <h4 className="faq-btn-text">Mapping and Discovery</h4>
                  <p className="service-desc">
                    We audit your active databases, legacy schema structures, and SaaS platforms to map dependency pipelines and isolate security boundaries.
                  </p>
                </div>

                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 2 (Weeks 3-5)
                  </span>
                  <h4 className="faq-btn-text">Calibration</h4>
                  <p className="service-desc">
                    Our integration engineers construct custom schemas and dry-run synchronization pathways inside a secure sandbox container to verify latency targets.
                  </p>
                </div>

                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 3 (Weeks 6-8)
                  </span>
                  <h4 className="faq-btn-text">Shadow Mode</h4>
                  <p className="service-desc">
                    Synapse runs quietly in the background alongside your legacy pipelines, validating data accuracy and transaction flows in real time with zero risk.
                  </p>
                </div>

                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 4 (Weeks 9+)
                  </span>
                  <h4 className="faq-btn-text">Active Deployment</h4>
                  <p className="service-desc">
                    Synapse is deployed natively to your secure cloud instance, orchestrating your systems autonomously with live monitoring active on the telemetry dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="faq-container-wide">
              <div className="section-header-center">
                <span className="eyebrow-tagline">
                  SYNAPSE INTEGRATION PLATFORM
                </span>
                <h3 className="section-title">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="faq-list-wide">
                <div className="glass-panel">
                  <button onClick={() => toggleFaq(0)} className="faq-btn-wide">
                    <span className="faq-btn-text-wide">
                      Does Lycos Synapse process or store our client data on external servers?
                    </span>
                    <ChevronDown size={16} className={`neon-icon transition-transform ${activeFaq === 0 ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === 0 && (
                    <div className="faq-content-wide">
                      No. Unlike traditional third-party middleware, Lycos Synapse deploys natively in your sovereign cloud container. Your data remains entirely inside your infrastructure boundaries.
                    </div>
                  )}
                </div>

                <div className="glass-panel">
                  <button onClick={() => toggleFaq(1)} className="faq-btn-wide">
                    <span className="faq-btn-text-wide">
                      How does Synapse handle legacy mainframes that don't support modern web APIs?
                    </span>
                    <ChevronDown size={16} className={`neon-icon transition-transform ${activeFaq === 1 ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === 1 && (
                    <div className="faq-content-wide">
                      Synapse is engineered with custom legacy adapters capable of bridging older on-premise relational databases, secure file structures, and custom ledger software directly to modern cloud-based CRMs.
                    </div>
                  )}
                </div>

                <div className="glass-panel">
                  <button onClick={() => toggleFaq(2)} className="faq-btn-wide">
                    <span className="faq-btn-text-wide">
                      What happens if one of our linked applications experiences an outage?
                    </span>
                    <ChevronDown size={16} className={`neon-icon transition-transform ${activeFaq === 2 ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === 2 && (
                    <div className="faq-content-wide">
                      Synapse utilizes a robust queueing and state preservation mechanism. If a destination system goes offline, Synapse securely buffers the sync pipeline and executes catching scripts as soon as connection is restored.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ------------------------- VANGUARD (Tab 4) ------------------------- */}
        {activeProduct === 4 && (
          <>
            {/* Product Intro */}
            <div className="glass-panel product-detail-card">
              {/* Left Col */}
              <div>
                <span className="eyebrow-tagline">
                  ENTERPRISE STRATEGY // PREDICTIVE INTELLIGENCE and CAPITAL EFFICIENCY
                </span>
                <h3 className="service-heading">
                  Lycos Vanguard
                </h3>
                <p className="product-tagline">
                  The Predictive Compass. Forward-looking execution. Capital optimization.
                </p>
                <p className="service-desc">
                  Lycos Vanguard is a custom-engineered predictive intelligence engine designed to convert raw operational telemetry into live, actionable foresight. Operating at the C-suite level, Vanguard tracks multi-layered data streams.
                </p>
                
                <div className="product-business-case">
                  <div className="product-business-case-title">
                    The Business Case
                  </div>
                  <p className="product-business-case-desc">
                    Static historical guessing forces enterprises to hoard expensive safety capital and over-schedule labor. Lycos Vanguard replaces rearview-mirror planning with real-time predictive machine learning, maximizing asset utilization.
                  </p>
                </div>

                <div className="tags-row">
                  {['FinTech and Wealth', 'Property Management', 'Logistics and Supply', 'Healthcare Admin'].map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Col */}
              <div>
                <div className="integrations-eyebrow">
                  Anatomy of Vanguard
                </div>

                <div className="anatomy-list">
                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">Advanced Telemetry Engine</h4>
                      <p className="service-desc">
                        Vanguard doesn't just analyze isolated spreadsheets. It orchestrates raw enterprise data, historical timelines, and external market signals into a live, multi-variable forecasting matrix.
                      </p>
                    </div>
                  </div>

                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">Capital Liberator</h4>
                      <p className="service-desc">
                        Directly targets balance sheet inefficiencies by dramatically tightening forecasting error rates, unlocking trapped cash from bloated safety stock.
                      </p>
                    </div>
                  </div>

                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">Capacity Stabilizer</h4>
                      <p className="service-desc">
                        Dynamically aligns labor scheduling, physical infrastructure, and asset deployment weeks in advance, putting an end to capacity mismatches.
                      </p>
                    </div>
                  </div>

                  <div className="anatomy-item">
                    <div className="anatomy-icon-badge"><CheckCircle2 size={16} className="neon-icon" style={{ color: "#8ce63f" }} /></div>
                    <div>
                      <h4 className="faq-btn-text">Strategic Telescope</h4>
                      <p className="service-desc">
                        Replaces reactive operational tracking with predictive machine learning models, equipping executives with a clear view of upcoming market waves.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Simulator */}
            <VanguardROISimulator />

            {/* Proven Outcomes */}
            <div className="glass-panel outcomes-split-grid">
              <div>
                <span className="eyebrow-tagline">
                  PROVEN OUTCOMES
                </span>
                <h3 className="service-heading">
                  Definitive Results, Not Projections
                </h3>
                <p className="service-desc">
                  Lycos Vanguard operates consistently at an enterprise standard, delivering verifiable margins.
                </p>
              </div>

              <div className="outcomes-metrics-grid-2">
                <div>
                  <div className="count-up-trigger stat-metric">
                    30–60%
                  </div>
                  <p className="service-desc">
                    average reduction in traditional forecasting error rates and planning variances.
                  </p>
                </div>

                <div>
                  <div className="count-up-trigger stat-metric">
                    15–25%
                  </div>
                  <p className="service-desc">
                    reclaimed capital from frozen holding and carrying costs on over-stocked inventory or overhead.
                  </p>
                </div>
              </div>
            </div>

            {/* Onboarding Playbook */}
            <div className="roadmap-section">
              <div className="section-header-center">
                <span className="eyebrow-tagline">
                  VANGUARD ONBOARDING PLAYBOOK
                </span>
                <h2 className="section-title">
                  How We Go <span className="brand-dot">Live.</span>
                </h2>
                <p className="section-desc">
                  A highly structured execution framework designed to integrate secure AI agents safely within 90 days.
                </p>
              </div>

              <div className="playbook-grid">
                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 1 (Weeks 1-2)
                  </span>
                  <h4 className="faq-btn-text">Telemetry Ingestion</h4>
                  <p className="service-desc">
                    We securely connect to your historical enterprise databases, ERP, CRM, and supply chain management systems to build Vanguard's baseline dataset.
                  </p>
                </div>

                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 2 (Weeks 3-5)
                  </span>
                  <h4 className="faq-btn-text">Model Calibration</h4>
                  <p className="service-desc">
                    Our machine learning engineers configure and fine-tune Vanguard's predictive algorithms, back-testing the models against your past seasonal cycles.
                  </p>
                </div>

                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 3 (Weeks 6-8)
                  </span>
                  <h4 className="faq-btn-text">Shadow Mode</h4>
                  <p className="service-desc">
                    Vanguard runs quietly in the background of your live operations, generating predictive forecasts and comparing them to real-time outcomes.
                  </p>
                </div>

                <div className="glass-panel">
                  <span className="playbook-phase-badge">
                    PHASE 4 (Weeks 9+)
                  </span>
                  <h4 className="faq-btn-text">Active Foresight</h4>
                  <p className="service-desc">
                    Vanguard's live predictive insights are integrated directly into your executive dashboards and planning software.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="faq-container-wide">
              <div className="section-header-center">
                <span className="eyebrow-tagline">
                  VANGUARD PREDICTIVE SYSTEM
                </span>
                <h3 className="section-title">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="faq-list-wide">
                <div className="glass-panel">
                  <button onClick={() => toggleFaq(0)} className="faq-btn-wide">
                    <span className="faq-btn-text-wide">
                      How long does it take for Vanguard's forecasting models to reach peak accuracy?
                    </span>
                    <ChevronDown size={16} className={`neon-icon transition-transform ${activeFaq === 0 ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === 0 && (
                    <div className="faq-content-wide">
                      While Vanguard achieves baseline alignment within the first 30 days of ingestion, the engine's internal weights calibrate continuously, increasing forecasting accuracy as it processes more live transaction logs.
                    </div>
                  )}
                </div>

                <div className="glass-panel">
                  <button onClick={() => toggleFaq(1)} className="faq-btn-wide">
                    <span className="faq-btn-text-wide">
                      Can Vanguard operate on fragmented or sparse historical data?
                    </span>
                    <ChevronDown size={16} className={`neon-icon transition-transform ${activeFaq === 1 ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === 1 && (
                    <div className="faq-content-wide">
                      Yes. Vanguard incorporates specialized synthetic data expansion models to safely fill in historical record gaps, ensuring reliable forecasts even if legacy files are fragmented.
                    </div>
                  )}
                </div>

                <div className="glass-panel">
                  <button onClick={() => toggleFaq(2)} className="faq-btn-wide">
                    <span className="faq-btn-text-wide">
                      Can Vanguard sync directly with our ERP, inventory, or scheduling software?
                    </span>
                    <ChevronDown size={16} className={`neon-icon transition-transform ${activeFaq === 2 ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === 2 && (
                    <div className="faq-content-wide">
                      Yes. Vanguard is custom-engineered to integrate seamlessly with modern enterprise platforms, standard ERP systems (such as SAP or Oracle), and proprietary internal databases via secure, high-throughput APIs.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
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
}