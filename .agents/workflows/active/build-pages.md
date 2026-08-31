# Playbook: Rewrite Lycos Core Site Content - Site Content Review

This playbook updates all pages of the Lycos Core website based on the copy changes requested in the Site Content Review document.

---

## Step 1: Overwrite TechServicesSection.tsx

### File Target: [TechServicesSection.tsx](file://C:/Users/Homebase/Local Sites/lycoscore/v2-development/frontend/src/components/TechServicesSection.tsx)

```typescript
import { useState } from 'react';
import { ArrowRight, CheckCircle, TrendingUp, Shield, Zap } from 'lucide-react';

const services = [
  {
    icon: '🔗',
    title: 'Systems Integration and Unification',
    summary: 'Eliminate operational fragmentation and low-latency pipeline drag across your core stack.',
    detail: 'We synthesize your CRM, ERP, finance, and operational architectures into a unified, low-latency data fabric—eliminating manual exports, redundant data entry, and systemic reporting latency across your enterprise.',
    outcomes: ['Unified Data Architecture: Real-time synchronization across all operational verticals.', 'Zero Manual Friction: Total elimination of legacy reporting and copy-paste workflows.', 'Executive Telemetry: High-fidelity, real-time command dashboards designed for decisive decision-making.'],
  },
  {
    icon: '⚡',
    title: 'High-Velocity Workflow Automation',
    summary: 'Automate administrative friction to redirect human capital toward high-yield execution.',
    detail: 'We isolate high-volume, latency-heavy operational tasks—client onboarding, multi-stage approvals, compliance verification, and data routing—replacing manual friction with autonomous execution engines engineered to run continuously with deterministic precision.',
    outcomes: ['Overhead Reduction: Up to 60% reduction in non-value administrative overhead per operator.', 'Rapid Execution Cycles: Accelerated onboarding and throughput response times across core pipelines.', 'Deterministic Accuracy: Elimination of manual processing errors to systematically mitigate operational risk.'],
  },
  {
    icon: '🛡️',
    title: 'Zero-Trust Cloud Architecture and Compliance',
    summary: 'Scale enterprise infrastructure within zero-trust enclaves built for strict compliance.',
    detail: 'Whether navigating GDPR, SOC 2, or complex sector-specific mandates, we engineer zero-trust cloud enclaves hardened by default—providing leadership with an unassailable infrastructure engineered for friction-free global scale.',
    outcomes: ['Automated Governance: Immutable audit trails and real-time data lineage integrated into core infrastructure.', 'Regulatory Alignment: Hardened architectures pre-configured for complex global compliance mandates.', 'Proactive Risk Mitigation: Continuous threat isolation designed to safeguard enterprise capital and operational reputation.'],
  },
  {
    icon: '📊',
    title: 'Predictive Data Strategy and Intelligence',
    summary: 'Convert passive data telemetry into real-time operational foresight and executive signal.',
    detail: 'Unstructured organizational data holds critical operational value. We engineer low-latency architectures to ingest, structure, and synthesize your data streams into live telemetry and predictive models—transitioning executive leadership from reactive oversight to proactive foresight.',
    outcomes: ['Command Dashboards: Real-time KPI visibility engineered for key operational decision-makers.', 'Predictive Telemetry: Automated forecasting models isolating demand fluctuations, pipeline velocity, and risk vectors.', 'Competitive Asymmetry: High-fidelity data pipelines that turn raw intelligence into market execution velocity.'],
  },
];

const outcomes = [
  { metric: '60%', label: 'Reduction in Manual Operational Overhead', icon: <TrendingUp size={20} /> },
  { metric: '3×', label: 'Acceleration in Reporting and Intelligence Cycles', icon: <Zap size={20} /> },
  { metric: '99.9%', label: 'Uptime SLA Across Deployed Integrations', icon: <Shield size={20} /> },
  { metric: '90 Days', label: 'Average Time to Initial Measurable ROI', icon: <CheckCircle size={20} /> },
];

const integrations = [
  'Salesforce', 'HubSpot', 'SAP', 'Microsoft 365', 'Slack', 'Snowflake',
  'Stripe', 'Enterprise ERP and Accounting Systems', 'AWS / Azure / GCP', 'Google Workspace',
];

const steps = [
  { num: '01', title: 'Infrastructure Audit and Mapping', desc: 'We map your current data pipelines, isolate operational friction, and calculate the cost of inefficiency prior to architectural deployment.' },
  { num: '02', title: 'Architecture and Systems Design', desc: 'We construct a custom technical roadmap optimized strictly for your high-yield operational targets, free from proprietary vendor bias.' },
  { num: '03', title: 'Deployment and Systemic Integration', desc: 'We engineer, integrate, and validate—delivering a production-ready infrastructure with zero downtime or operational disruption.' },
  { num: '04', title: 'Continuous Telemetry and Optimization', desc: 'Post-deployment, we benchmark system health, monitor quantitative performance metrics, and iterate to ensure compounding operational yield.' },
];

export default function TechServicesSection() {
  const [activeService, setActiveService] = useState(0);

  return (
    <div id="tech-services-section" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', color: 'white' }}>

      {/* Hero Header */}
      <div style={{ marginBottom: '4rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
          // HIGH-YIELD OPERATIONAL INTEGRATION
        </span>
        <h2 style={{ fontSize: '2.8rem', fontFamily: 'var(--font-title)', marginTop: '0.5rem', marginBottom: '1rem', lineHeight: 1.15 }}>
          Engineer the Infrastructure Your<br /><span style={{ color: 'var(--accent)' }}>Scale Demands.</span>
        </h2>
        <p style={{ color: 'var(--text-gray)', fontSize: '1.05rem', maxWidth: '680px', margin: '0 0 2rem 0', lineHeight: 1.7 }}>
          Most enterprises attempt to scale atop fragile, fragmented software architectures. Lycos Core replaces systemic inertia with an integrated, automated, and secure operational foundation—enabling teams to execute faster, leadership to command clear foresight, and operations to maximize ROI.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.75rem', background: 'var(--accent)', color: 'black', fontWeight: 700, borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem' }}>
            Initialize Discovery Protocol <ArrowRight size={16} />
          </a>
          <a href="#case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.75rem', border: '1px solid var(--border-color)', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem' }}>
            Explore Enterprise Yield
          </a>
        </div>
      </div>

      {/* Outcome Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
        {outcomes.map((o, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent)', display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>{o.icon}</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: 'white' }}>{o.metric}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-gray)', marginTop: '0.25rem', lineHeight: 1.4 }}>{o.label}</div>
          </div>
        ))}
      </div>

      {/* Service Selector */}
      <div style={{ marginBottom: '4rem' }}>
        <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', marginBottom: '2rem' }}>Engineered Solutions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {services.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveService(idx)}
                style={{
                  textAlign: 'left', padding: '1.25rem 1.5rem',
                  background: activeService === idx ? 'rgba(163,255,51,0.05)' : 'rgba(255,255,255,0.01)',
                  border: '1px solid ' + (activeService === idx ? 'var(--accent)' : 'var(--border-color)'),
                  borderRadius: '10px', cursor: 'pointer', transition: 'all 0.25s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>{s.title}</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-gray)', paddingLeft: '2rem' }}>{s.summary}</div>
              </button>
            ))}
          </div>
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{services[activeService].icon}</div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem' }}>{services[activeService].title}</h4>
              <p style={{ color: 'var(--text-gray)', lineHeight: 1.7, fontSize: '0.95rem' }}>{services[activeService].detail}</p>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>SYSTEMIC IMPACT</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {services[activeService].outcomes.map((o, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'white' }}>
                    <CheckCircle size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} /> {o}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px' }}>ARCHITECTURAL COMPATIBILITY</div>
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-title)', margin: '0.25rem 0 0' }}>Seamless Interoperability Across Your Existing Stack.</h3>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-gray)', maxWidth: '360px', lineHeight: 1.5 }}>
            Zero rip-and-replace required. We interface directly with your existing infrastructure to optimize speed, security, and data throughput.
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {integrations.map((name, idx) => (
            <span key={idx} style={{ padding: '0.45rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '20px', fontSize: '0.85rem', color: 'white' }}>
              {name}
            </span>
          ))}
          <span style={{ padding: '0.45rem 1rem', background: 'rgba(163,255,51,0.05)', border: '1px solid var(--accent)', borderRadius: '20px', fontSize: '0.85rem', color: 'var(--accent)' }}>
            + Proprietary and Custom Stacks
          </span>
        </div>
      </div>

      {/* Engagement Process */}
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', marginBottom: '2rem', textAlign: 'center' }}>Deployment Protocol</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {steps.map((s, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'rgba(163,255,51,0.25)', fontFamily: 'var(--font-title)', marginBottom: '0.75rem' }}>{s.num}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>{s.title}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
```

---

## Step 2: Overwrite IncubationHubSection.tsx

### File Target: [IncubationHubSection.tsx](file://C:/Users/Homebase/Local Sites/lycoscore/v2-development/frontend/src/components/IncubationHubSection.tsx)

```typescript
import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const tracks = [
  {
    name: 'Architecture to Production',
    tag: 'EARLY-STAGE VENTURE',
    desc: 'Designed for high-conviction teams with early market validation. We embed as full-stack technical co-builders to engineer your AI-native architecture, construct zero-trust data infrastructure, and accelerate initial enterprise buyer deployment.',
    deliverables: ['Full-Stack Build Execution: Dedicated AI engineering, data architecture, and production UI/UX deployment.', 'Enterprise GTM Protocol: Precision Ideal Customer Profile (ICP) targeting, enterprise pricing design, and pipeline activation.', 'Institutional Capital Access: Pitch architecture calibration and direct introductions to top-tier venture syndicates.', 'Co-Investment Capital: Direct deployment of up to $500K in seed-stage syndicate capital.'],
    duration: '6 MONTHS',
    equity: '15–25%',
  },
  {
    name: 'Systemic Scale and Capture',
    tag: 'INSTITUTIONAL EXPANSION',
    desc: 'Designed for scaling ventures seeking exponential revenue multiplication. We optimize your GTM architecture, deploy enterprise deal-structuring frameworks, and build the scalable RevOps infrastructure required to capture market share and secure Series A valuation multiples.',
    deliverables: ['Enterprise GTM Architecture: Custom enterprise sales playbooks, procurement navigation protocols, and team enablement.', 'RevOps and Telemetry Infrastructure: Production-grade CRM pipeline architecture, automated forecasting, and data-driven deal tracking.', 'Proprietary Network Distribution: Direct warm routing to decision-makers across Lycos Core\'s enterprise buyer network.', 'Series A Capitalization Protocol: Institutional data-room engineering, financial modeling, and syndicate investor routing.'],
    duration: '9 MONTHS',
    equity: '8–15%',
  },
  {
    name: 'Corporate Venture Studio',
    tag: 'INTRAPRENEURIAL VENTURES',
    desc: 'Engineered for enterprise organizations commercializing proprietary internal AI capabilities into standalone corporate spin-outs. We execute the end-to-end lifecycle—from IP carve-out and technical validation to independent entity formation—systematically de-risking enterprise capital.',
    deliverables: ['Entity Formation and Corporate Governance: Clean IP carve-outs, independent board structures, and enterprise regulatory compliance protocols.', 'Bespoke Brand Architecture: Autonomous corporate positioning, market go-to-market strategy, and brand execution.', 'Executive Talent Acquisition: Executive search and placement for dedicated, venture-grade founding leadership.', 'Capital Structuring and Equity Design: Institutional capitalization table modeling, enterprise valuation, and management option pool engineering.'],
    duration: '12 MONTHS',
    equity: 'BESPOKE',
  },
];

const portfolio = [
  {
    name: 'SentryFlow',
    sector: 'Fintech / Compliance',
    stage: 'Seed',
    cohort: '2025-A',
    headline: 'Automated compliance audit software for multi-jurisdiction financial institutions.',
    result: 'Closed first enterprise contract within 4 months of program entry. Now processing 1.2M compliance checks per month.',
    metric: '$820K ARR',
  },
  {
    name: 'OmniCore',
    sector: 'RegTech',
    stage: 'Series A',
    cohort: '2025-B',
    headline: 'Real-time transactional monitoring and regulatory flag engine for banks and asset managers.',
    result: 'Grew from 2 to 14 enterprise clients during their 9-month Lycos Core engagement. Raised $2.8M seed round.',
    metric: '$2.1M ARR',
  },
  {
    name: 'QuantVenture',
    sector: 'Asset Management',
    stage: 'Series A',
    cohort: '2024-C',
    headline: 'AI-powered portfolio rebalancing and yield optimisation for family offices and independent advisors.',
    result: 'Achieved 4.2% yield premium over benchmark within first operating year. Now managing $120M in assets.',
    metric: '$120M AUM',
  },
];

const stats = [
  { value: '83%', label: 'of portfolio companies achieve Series A capital velocity within 18 months' },
  { value: '3.2×', label: 'average revenue valuation multiple compared to unassisted market entrants' },
  { value: '$47M', label: 'institutional follow-on syndicate capital raised across active ventures' },
  { value: '140%', label: 'average expansion yield (NDR) across active portfolio enterprise contracts' },
];

export default function IncubationHubSection() {
  const [activeTrack, setActiveTrack] = useState(0);
  const [activePortco, setActivePortco] = useState(0);

  return (
    <div id="incubation-hub-section" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', color: 'white' }}>

      {/* Hero */}
      <div style={{ marginBottom: '4rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
          // ENTERPRISE SPIN-OUTS AND HIGH-GROWTH FOUNDERS
        </span>
        <h2 style={{ fontSize: '2.8rem', fontFamily: 'var(--font-title)', marginTop: '0.5rem', marginBottom: '1rem', lineHeight: 1.15 }}>
          Transforming Validated Models into<br /><span style={{ color: 'var(--accent)' }}>Institutional-Grade AI Enterprises.</span>
        </h2>
        <p style={{ color: 'var(--text-gray)', fontSize: '1.05rem', maxWidth: '680px', margin: '0 0 2rem 0', lineHeight: 1.7 }}>
          The Lycos Core Incubation Hub operates as a technical co-builder, not a traditional accelerator. We deploy full-stack AI engineering, enterprise-grade governance, and direct institutional capital access to construct market-ready spin-outs alongside visionary founders.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.75rem', background: 'var(--accent)', color: 'black', fontWeight: 700, borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem' }}>
            Initialize Incubation Protocol <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
        {stats.map((s, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: 'var(--accent)' }}>{s.value}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-gray)', marginTop: '0.4rem', lineHeight: 1.5 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Programme Tracks */}
      <div style={{ marginBottom: '4rem' }}>
        <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', marginBottom: '0.5rem' }}>Structured Pathways to Venture Scale.</h3>
        <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', marginBottom: '2rem' }}>Architected for stage-specific execution—deploying targeted technical capital from initial validation through enterprise capitalization.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {tracks.map((t, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTrack(idx)}
                style={{
                  textAlign: 'left', padding: '1.25rem 1.5rem',
                  background: activeTrack === idx ? 'rgba(163,255,51,0.05)' : 'rgba(255,255,255,0.01)',
                  border: '1px solid ' + (activeTrack === idx ? 'var(--accent)' : 'var(--border-color)'),
                  borderRadius: '10px', cursor: 'pointer', transition: 'all 0.25s',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'white', marginBottom: '0.2rem' }}>{t.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.tag}</div>
              </button>
            ))}
          </div>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>PROGRAM DURATION: <strong style={{ color: 'white' }}>{tracks[activeTrack].duration}</strong></div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>EQUITY ALIGNMENT: <strong style={{ color: 'var(--accent)' }}>{tracks[activeTrack].equity}</strong></div>
            </div>
            <p style={{ color: 'var(--text-gray)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1.5rem' }}>{tracks[activeTrack].desc}</p>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>PROGRAMME DELIVERABLES</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {tracks[activeTrack].deliverables.map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'white' }}>
                    <CheckCircle size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} /> {d}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Companies */}
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', marginBottom: '0.5rem' }}>ACTIVE INCUBATION ASSETS</h3>
        <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', marginBottom: '2rem' }}>Incubated Assets and Capital Track Record<br/>High-growth AI ventures engineered in partnership with Lycos Core—and their operational milestones.</p>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {portfolio.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setActivePortco(idx)}
              style={{
                padding: '0.5rem 1.25rem',
                background: activePortco === idx ? 'rgba(163,255,51,0.05)' : 'transparent',
                border: '1px solid ' + (activePortco === idx ? 'var(--accent)' : 'var(--border-color)'),
                borderRadius: '20px', cursor: 'pointer', color: 'white', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.25s',
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div className="glass-panel" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ padding: '0.2rem 0.7rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '12px', fontSize: '0.75rem', color: 'var(--text-gray)' }}>{portfolio[activePortco].sector}</span>
              <span style={{ padding: '0.2rem 0.7rem', background: 'rgba(163,255,51,0.05)', border: '1px solid var(--accent)', borderRadius: '12px', fontSize: '0.75rem', color: 'var(--accent)' }}>{portfolio[activePortco].stage}</span>
            </div>
            <h4 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>{portfolio[activePortco].name}</h4>
            <p style={{ color: 'var(--text-gray)', lineHeight: 1.65, fontSize: '0.95rem' }}>{portfolio[activePortco].headline}</p>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '2rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Cohort {portfolio[activePortco].cohort} Result</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-title)', marginBottom: '1rem' }}>{portfolio[activePortco].metric}</div>
            <p style={{ color: 'var(--text-gray)', lineHeight: 1.65, fontSize: '0.9rem' }}>{portfolio[activePortco].result}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
```

---

## Step 3: Overwrite AIProductsSection.tsx

### File Target: [AIProductsSection.tsx](file://C:/Users/Homebase/Local Sites/lycoscore/v2-development/frontend/src/components/AIProductsSection.tsx)

```typescript
import { useState } from 'react';
import { 
  Shield, 
  ArrowRight, 
  Database, 
  Cpu, 
  FileText, 
  ChevronDown, 
  Workflow, 
  Server, 
  Sliders,
  Clock,
  CheckCircle2,
  Lock,
  Activity,
  Key,
  Network,
  Compass,
  TrendingUp,
  Coins
} from 'lucide-react';
import ROISimulatorSection from './ROISimulatorSection';
import VelocityROISimulator from './VelocityROISimulator';
import GuardianROISimulator from './GuardianROISimulator';
import SynapseROISimulator from './SynapseROISimulator';
import HorizonROISimulator from './HorizonROISimulator';

export default function AIProductsSection() {
  const [activeProduct, setActiveProduct] = useState<number>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };



  return (
    <div id="ai-products-section" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', color: 'white' }}>
      
      {/* ============================================================= */}
      {/* 1. HEADER SECTION                                             */}
      {/* ============================================================= */}
      <div style={{ marginBottom: '4rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
          PRODUCTION-GRADE PRODUCT ARSENAL
        </span>
        <h2 style={{ fontSize: '2.8rem', fontFamily: 'var(--font-title)', marginTop: '0.5rem', marginBottom: '1rem', lineHeight: 1.15 }}>
          Autonomous Engine Suites Engineered for Quantifiable Operational Yield.
        </h2>
        <p style={{ color: 'var(--text-gray)', fontSize: '1.05rem', maxWidth: '700px', margin: '0 0 2rem 0', lineHeight: 1.8 }}>
          Every module in the Lycos Core arsenal is engineered around a single constraint: deterministic, measurable operational yield. We bypass traditional per-seat SaaS models to deploy outcome-aligned infrastructure anchored directly to your core performance metrics.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.75rem', background: 'var(--accent)', color: 'black', fontWeight: 700, borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>
            Initialize System Deployment <ArrowRight size={16} />
          </button>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.75rem', border: '1px solid var(--border-color)', background: 'transparent', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
            View Operational Telemetry
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 2. TAB SELECTION AREA                                         */}
      {/* ============================================================= */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '4rem' }}>
        {/* Tab 1: Lycos Sentinel */}
        <button 
          onClick={() => { setActiveProduct(0); setActiveFaq(null); }}
          style={{
            textAlign: 'left', padding: '1.25rem',
            background: activeProduct === 0 ? 'rgba(163,255,51,0.05)' : 'rgba(255,255,255,0.01)',
            border: activeProduct === 0 ? '1px solid var(--accent)' : '1px solid var(--border-color)',
            borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'start', cursor: 'pointer', transition: 'all 0.25s'
          }}
        >
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '1rem', color: activeProduct === 0 ? 'var(--accent)' : 'var(--text-gray)', display: 'flex', alignItems: 'center' }}>
            <Shield size={20} />
          </div>
          <span style={{ fontSize: '0.75rem', color: activeProduct === 0 ? 'var(--accent)' : 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 705, marginBottom: '0.25rem' }}>CUSTOMER OPERATIONS</span>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>Lycos Sentinel</span>
        </button>

        {/* Tab 2: Lycos Velocity */}
        <button 
          onClick={() => { setActiveProduct(1); setActiveFaq(null); }}
          style={{
            textAlign: 'left', padding: '1.25rem',
            background: activeProduct === 1 ? 'rgba(163,255,51,0.05)' : 'rgba(255,255,255,0.01)',
            border: activeProduct === 1 ? '1px solid var(--accent)' : '1px solid var(--border-color)',
            borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'start', cursor: 'pointer', transition: 'all 0.25s'
          }}
        >
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '1rem', color: activeProduct === 1 ? 'var(--accent)' : 'var(--text-gray)', display: 'flex', alignItems: 'center' }}>
            <Cpu size={20} />
          </div>
          <span style={{ fontSize: '0.75rem', color: activeProduct === 1 ? 'var(--accent)' : 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 705, marginBottom: '0.25rem' }}>BACK-OFFICE OPERATIONS</span>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>Lycos Velocity</span>
        </button>

        {/* Tab 3: Lycos Guardian */}
        <button 
          onClick={() => { setActiveProduct(2); setActiveFaq(null); }}
          style={{
            textAlign: 'left', padding: '1.25rem',
            background: activeProduct === 2 ? 'rgba(163,255,51,0.05)' : 'rgba(255,255,255,0.01)',
            border: activeProduct === 2 ? '1px solid var(--accent)' : '1px solid var(--border-color)',
            borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'start', cursor: 'pointer', transition: 'all 0.25s'
          }}
        >
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '1rem', color: activeProduct === 2 ? 'var(--accent)' : 'var(--text-gray)', display: 'flex', alignItems: 'center' }}>
            <Lock size={20} />
          </div>
          <span style={{ fontSize: '0.75rem', color: activeProduct === 2 ? 'var(--accent)' : 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 705, marginBottom: '0.25rem' }}>SECURITY INFRASTRUCTURE</span>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>Lycos Guardian</span>
        </button>

        {/* Tab 4: Lycos Synapse */}
        <button 
          onClick={() => { setActiveProduct(3); setActiveFaq(null); }}
          style={{
            textAlign: 'left', padding: '1.25rem',
            background: activeProduct === 3 ? 'rgba(163,255,51,0.05)' : 'rgba(255,255,255,0.01)',
            border: activeProduct === 3 ? '1px solid var(--accent)' : '1px solid var(--border-color)',
            borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'start', cursor: 'pointer', transition: 'all 0.25s'
          }}
        >
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '1rem', color: activeProduct === 3 ? 'var(--accent)' : 'var(--text-gray)', display: 'flex', alignItems: 'center' }}>
            <Network size={20} />
          </div>
          <span style={{ fontSize: '0.75rem', color: activeProduct === 3 ? 'var(--accent)' : 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 705, marginBottom: '0.25rem' }}>DATA INTEGRATION // REAL-TIME ENTERPRISE ALIGNMENT</span>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>Lycos Synapse</span>
        </button>

        {/* Tab 5: Lycos Horizon */}
        <button 
          onClick={() => { setActiveProduct(4); setActiveFaq(null); }}
          style={{
            textAlign: 'left', padding: '1.25rem',
            background: activeProduct === 4 ? 'rgba(191,255,0,0.05)' : 'rgba(255,255,255,0.01)',
            border: activeProduct === 4 ? '1px solid #bfff00' : '1px solid var(--border-color)',
            borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'start', cursor: 'pointer', transition: 'all 0.25s'
          }}
        >
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '1rem', color: activeProduct === 4 ? '#bfff00' : 'var(--text-gray)', display: 'flex', alignItems: 'center' }}>
            <Compass size={20} />
          </div>
          <span style={{ fontSize: '0.75rem', color: activeProduct === 4 ? '#bfff00' : 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 705, marginBottom: '0.25rem' }}>ENTERPRISE STRATEGY // PREDICTIVE INTELLIGENCE</span>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>Lycos Horizon</span>
        </button>
      </div>

      {/* ============================================================= */}
      {/* 3. DYNAMIC PRODUCT AREA                                       */}
      {/* ============================================================= */}
      
      {/* ------------------------- SENTINEL (Tab 0) ------------------------- */}
      {activeProduct === 0 && (
        <>
          {/* Product Intro */}
          <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '3rem' }}>
            {/* Left Col */}
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', display: 'block' }}>
                CUSTOMER OPERATIONS // Secure Front-Line Automation
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-title)', marginBottom: '0.5rem', color: 'white' }}>
                Lycos Sentinel
              </h3>
              <p style={{ color: 'white', fontStyle: 'italic', marginBottom: '1.25rem', fontSize: '1rem', opacity: 0.85 }}>
                The Intelligent Front-Line Guardian. Autonomous execution. Sovereign data isolation.
              </p>
              <p style={{ color: 'var(--text-gray)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Lycos Sentinel is a custom-engineered, highly autonomous digital agent designed to act as an intuitive, protective extension of your team. Sentinel instinctively navigates complex user workflows and resolves friction points in real-time across email, chat, and voice—keeping your core proprietary databases entirely insulated, secure, and compliant.
              </p>
              
              <div style={{ background: 'rgba(163,255,51,0.04)', border: '1px solid rgba(163,255,51,0.15)', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>
                  The Business Case
                </div>
                <p style={{ color: 'white', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  Customer support teams are expensive, inconsistent, and hard to scale. Lycos Sentinel handles your most common request types autonomously, so your human team focuses only on the cases that genuinely need them.
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Financial Services', 'Insurance', 'E-Commerce', 'Professional Services'].map((tag) => (
                  <span key={tag} style={{ padding: '0.3rem 0.75rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '12px', fontSize: '0.78rem', color: 'var(--text-gray)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Col */}
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                Anatomy of Sentinel
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <Workflow size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>Dynamic Intent Routing</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
                      Sentinel doesn't just match keywords. It uses semantic search and vector embeddings to instantly understand a user's intent, even if they use highly unstructured language.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <Shield size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>The Guardrail Shield (PII Scrubbing)</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
                      An active middleware layer that automatically detects and redacts Personally Identifiable Information (PII) like credit cards, SSNs, and passwords before the data ever touches the language model.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <Database size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>Contextual Memory Vault</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
                      Sentinel maintains a running, secure state during long multi-step interactions, remembering previous user inputs without needing to pass the entire historical database back and forth.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <FileText size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>Multi-Modal Pipeline</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
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
          <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px', marginBottom: '0.5rem', display: 'block' }}>
                PROVEN OUTCOMES
              </span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', marginBottom: '0.5rem', color: 'white' }}>
                Definitive Results, Not Projections
              </h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Lycos Sentinel operates consistently at an enterprise standard, delivering verifiable margins.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={24} /> 65-80%
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginTop: '0.5rem', lineHeight: 1.5, margin: '0.5rem 0 0 0' }}>
                  of inbound customer queries resolved natively without human escalation.
                </p>
              </div>

              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={24} style={{ color: 'var(--accent)' }} /> &lt;90 Sec
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginTop: '0.5rem', lineHeight: 1.5, margin: '0.5rem 0 0 0' }}>
                  average handling time to fully resolve complex multi-step workflows.
                </p>
              </div>
            </div>
          </div>

          {/* Onboarding Playbook */}
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ textTransform: 'uppercase', textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', fontWeight: 600 }}>
                SENTINEL ONBOARDING PLAYBOOK
              </span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.5rem' }}>
                How We Go Live
              </h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginTop: '0.5rem', textTransform: 'none' }}>
                A highly structured execution framework designed to integrate secure AI agents safely within 90 days.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 1 (Weeks 1-2)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Ingestion</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  We connect to your historical ticket logs, knowledge bases, and API documentation to build Sentinel's custom training boundaries.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 2 (Weeks 3-5)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Calibration</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  Our engineers fine-tune the model parameters, testing Sentinel in a sandbox environment against 10,000 synthetic customer conversations to ensure strict alignment.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 3 (Weeks 6-8)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Shadow Mode</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  Sentinel runs quietly in the background of your live operations, generating drafts for your human agents to review and approve, validating accuracy in real-time.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 4 (Weeks 9+)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Active Deployment</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  Sentinel goes live on your front line, actively resolving inquiries while your human team monitors performance through the Lycos telemetry dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div style={{ marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <div style={{ textTransform: 'uppercase', textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', fontWeight: 600 }}>
                SENTINEL TECHNOLOGY PLATFORM
              </span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.5rem' }}>
                Frequently Asked Questions
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(0)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem',
                    background: 'transparent', border: 'none', cursor: 'pointer', color: 'white', textAlign: 'left'
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    How do you prevent Sentinel from making up (hallucinating) false information?
                  </span>
                  <ChevronDown size={16} style={{ color: 'var(--text-gray)', transform: activeFaq === 0 ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                {activeFaq === 0 && (
                  <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: 1.6 }}>
                    Sentinel operates within a strict Retrieval-Augmented Generation (RAG) framework. If a user asks a question that lies outside your approved, ingested knowledge base, Sentinel is hardcoded to gracefully route the query to a human agent rather than guessing.
                  </div>
                )}
              </div>

              <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(1)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem',
                    background: 'transparent', border: 'none', cursor: 'pointer', color: 'white', textAlign: 'left'
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    Do we need to hire a team of AI prompt engineers to maintain this?
                  </span>
                  <ChevronDown size={16} style={{ color: 'var(--text-gray)', transform: activeFaq === 1 ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                {activeFaq === 1 && (
                  <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: 1.6 }}>
                    No. Lycos Sentinel is delivered as a fully managed asset. Our Tech Services team handles the continuous training, updates, and maintenance of your models as part of your enterprise license.
                  </div>
                )}
              </div>

              <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(2)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem',
                    background: 'transparent', border: 'none', cursor: 'pointer', color: 'white', textAlign: 'left'
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    Can Sentinel integrate with our legacy software (e.g., custom ledgers or older CRMs)?
                  </span>
                  <ChevronDown size={16} style={{ color: 'var(--text-gray)', transform: activeFaq === 2 ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                {activeFaq === 2 && (
                  <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: 1.6 }}>
                    Yes. By pairing Sentinel with Lycos Synapse (our integration layer), we build secure API bridges to legacy systems, allowing Sentinel to write data to older databases without exposing security credentials.
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ------------------------- VELOCITY (Tab 1) ------------------------- */}
      {activeProduct === 1 && (
        <>
          {/* Product Intro */}
          <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '3rem' }}>
            {/* Left Col */}
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', display: 'block' }}>
                BACK-OFFICE OPERATIONS // HIGH-VELOCITY PROCESS AUTOMATION
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-title)', marginBottom: '0.5rem', color: 'white' }}>
                Lycos Velocity
              </h3>
              <p style={{ color: 'white', fontStyle: 'italic', marginBottom: '1.25rem', fontSize: '1rem', opacity: 0.85 }}>
                The High-Velocity Automation Engine. Seamless execution. Exponential processing scale.
              </p>
              <p style={{ color: 'var(--text-gray)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Lycos Velocity is a custom-engineered, high-throughput digital engine designed to take complete operational ownership of your highest-volume administrative pipelines. Velocity silently ingests, parses, validates, and routes complex transactional workflows in real-time—keeping your operations moving at machine speed while freeing your human capital to focus entirely on strategic, revenue-generating growth.
              </p>
              
              <div style={{ background: 'rgba(163,255,51,0.04)', border: '1px solid rgba(163,255,51,0.15)', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>
                  The Business Case
                </div>
                <p style={{ color: 'white', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  Back-office administrative bottlenecks, document reconciliation, and manual workflow handoffs are expensive, slow, and prone to human error. Lycos Velocity automates your most complex, repetitive transaction types natively, allowing your organization to scale operational volume exponentially without scaling your headcount or payroll.
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['FinTech and Wealth', 'Property Management', 'Logistics and Supply', 'EdTech and Education', 'Healthcare Admin'].map((tag) => (
                  <span key={tag} style={{ padding: '0.3rem 0.75rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '12px', fontSize: '0.78rem', color: 'var(--text-gray)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Col */}
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                Anatomy of Velocity
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <FileText size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>Intelligent Ingestion Pipeline</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
                      Natively ingests and parses unstructured data from multi-format international bills of lading, PDFs, customs declarations, and transcripts with near-zero latency.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <Workflow size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>Dynamic Workflow Router</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
                      Instantly coordinates complex system handoffs and triggers downstream operational cycles the millisecond a transaction is validated.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <Shield size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>The Zero-Error Guardrail</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
                      An active validation layer that mathematically eliminates manual transcription, routing, and data-entry errors before they impact your ledger.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <Sliders size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>The Scale Coefficient</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
                      Built to handle sudden, massive seasonal spikes in processing volume effortlessly, ensuring your marginal cost per transaction remains virtually zero.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Simulator */}
          <VelocityROISimulator />

          {/* Proven Outcomes */}
          <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px', marginBottom: '0.5rem', display: 'block' }}>
                PROVEN OUTCOMES
              </span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', marginBottom: '0.5rem', color: 'white' }}>
                Verifiable Operational Gains
              </h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Lycos Velocity accelerates back-office operations to structural parity with machine processing limitations.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-title)' }}>90%+</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)', marginTop: '0.25rem', lineHeight: 1.4, margin: '0.25rem 0 0 0' }}>
                  average cycle time reduction, collapsing onboarding and processing pipelines from days to minutes.
                </p>
              </div>

              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', fontFamily: 'var(--font-title)' }}>0%</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)', marginTop: '0.25rem', lineHeight: 1.4, margin: '0.25rem 0 0 0' }}>
                  data-entry defect rate, completely shielding the organization from expensive manual reprocessing loops.
                </p>
              </div>

              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', fontFamily: 'var(--font-title)' }}>3x–18x</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)', marginTop: '0.25rem', lineHeight: 1.4, margin: '0.25rem 0 0 0' }}>
                  transaction capacity scaling achieved across core business divisions without expanding operational headcount.
                </p>
              </div>
            </div>
          </div>

          {/* Onboarding Playbook */}
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ textTransform: 'uppercase', textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', fontWeight: 600 }}>
                VELOCITY ONBOARDING PLAYBOOK
              </span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.5rem' }}>
                Operational Phase Mapping
              </h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginTop: '0.5rem', textTransform: 'none' }}>
                Integrating highly scalable, document-processing pipelines into your legacy workflows inside of 90 days.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 1 (Weeks 1-2)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Ingestion</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  We map your existing manual workflows, connect to your legacy system APIs, and ingest historical transaction logs to establish baseline processing logic.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 2 (Weeks 3-5)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Calibration</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  Our engineers run Velocity in an isolated sandbox, stress-testing the automation pipelines against 10,000 synthetic transactions to ensure strict business-rule compliance.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 3 (Weeks 6-8)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Shadow Mode</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  Velocity operates silently in the background of live operations, drafting and validating transactions side-by-side with your team to mathematically verify accuracy.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 4 (Weeks 9+)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Active Deployment</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  Velocity takes over active pipeline routing. Your team transitions from manual processors to high-level system monitors via the Lycos telemetry dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div style={{ marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <div style={{ textTransform: 'uppercase', textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', fontWeight: 600 }}>
                VELOCITY ENGINE PLATFORM
              </span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.5rem' }}>
                Frequently Asked Questions
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(0)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem',
                    background: 'transparent', border: 'none', cursor: 'pointer', color: 'white', textAlign: 'left'
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    How does Velocity handle unstructured documents like messy PDFs or scans?
                  </span>
                  <ChevronDown size={16} style={{ color: 'var(--text-gray)', transform: activeFaq === 0 ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                {activeFaq === 0 && (
                  <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: 1.6 }}>
                    Velocity uses advanced multi-modal parsing and OCR layers trained specifically on enterprise-grade document layouts. It doesn't just read text; it understands document structure, context, and data relationships to extract information with high precision.
                  </div>
                )}
              </div>

              <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(1)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem',
                    background: 'transparent', border: 'none', cursor: 'pointer', color: 'white', textAlign: 'left'
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    What happens if a transaction fails the validation criteria?
                  </span>
                  <ChevronDown size={16} style={{ color: 'var(--text-gray)', transform: activeFaq === 1 ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                {activeFaq === 1 && (
                  <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: 1.6 }}>
                    Velocity utilizes an automated exception-handling loop. If a file falls below a strict validation confidence threshold, it is instantly routed to a human administrator for single-click approval, preventing system lockups.
                  </div>
                )}
              </div>

              <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(2)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem',
                    background: 'transparent', border: 'none', cursor: 'pointer', color: 'white', textAlign: 'left'
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    Can Velocity securely sync data with our legacy ERP or custom mainframes?
                  </span>
                  <ChevronDown size={16} style={{ color: 'var(--text-gray)', transform: activeFaq === 2 ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                {activeFaq === 2 && (
                  <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: 1.6 }}>
                    Yes. Velocity is engineered to interact with both modern REST APIs and legacy terminal screens or custom databases, serving as an intelligent, secure middleware layer that ensures your core databases remain secure and unsullied.
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ------------------------- GUARDIAN (Tab 2) ------------------------- */}
      {activeProduct === 2 && (
        <>
          {/* Product Intro */}
          <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '3rem' }}>
            {/* Left Col */}
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', display: 'block' }}>
                SECURITY INFRASTRUCTURE // Zero-Trust Cloud Shield
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-title)', marginBottom: '0.5rem', color: 'white' }}>
                Lycos Guardian
              </h3>
              <p style={{ color: 'white', fontStyle: 'italic', marginBottom: '1.25rem', fontSize: '1rem', opacity: 0.85 }}>
                The Sovereign Cloud Shield. Isolated execution. Actuarial risk prevention.
              </p>
              <p style={{ color: 'var(--text-gray)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Lycos Guardian is a robust, state-of-the-art security environment that deploys isolated, compliant cloud spaces. Engineered to protect highly sensitive data pipelines, Guardian continuously monitors for operational anomalies, safeguards your proprietary LLM weights, and ensures your infrastructure can scale safely without creating legal, compliance, or data exposure.
              </p>
              
              <div style={{ background: 'rgba(163,255,51,0.04)', border: '1px solid rgba(163,255,51,0.15)', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>
                  The Business Case
                </div>
                <p style={{ color: 'white', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  Data breaches are an existential risk, resulting in catastrophic brand damage, regulatory fines, and intellectual property theft. Lycos Guardian wraps your data layer in a secure, zero-trust sanctuary, eliminating corporate liabilities before they can materialize.
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['FinTech and Wealth', 'Property Management', 'Logistics and Supply', 'EdTech and Education', 'Healthcare Admin'].map((tag) => (
                  <span key={tag} style={{ padding: '0.3rem 0.75rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '12px', fontSize: '0.78rem', color: 'var(--text-gray)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Col */}
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                Anatomy of Guardian
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <Server size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>Isolated Cloud Sandboxing</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
                      Deploys completely isolated, dedicated cloud environments for data processing, ensuring your proprietary algorithms and models never run on shared infrastructure.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <Shield size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>The Compliance Shield (HIPAA/SOC2)</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
                      An active security and logging layer that guarantees automatic compliance across major logging frameworks, rendering audits hands-free.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <Activity size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>Anomalous Behavioral Monitoring</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
                      A continuous AI-driven telemetry engine that scans data transaction pathways for minor structural variances, flagging issues in milliseconds.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <Key size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>Cryptographic Vaulting</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
                      Wraps highly sensitive database assets—from tenant credit histories to proprietary healthcare logs—in a hardware-secured, sovereign cryptographic layer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Simulator */}
          <GuardianROISimulator />

          {/* Proven Outcomes */}
          <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px', marginBottom: '0.5rem', display: 'block' }}>
                PROVEN OUTCOMES
              </span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', marginBottom: '0.5rem', color: 'white' }}>
                Definitive Results, Not Projections
              </h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Lycos Guardian operates consistently at an enterprise standard, delivering verifiable margins.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={24} /> 90%–99.9%
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginTop: '0.5rem', lineHeight: 1.5, margin: '0.5rem 0 0 0' }}>
                  reduction in vulnerability exposure and anomaly containment speed across connected systems.
                </p>
              </div>

              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={24} style={{ color: 'var(--accent)' }} /> &lt; 10 ms
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginTop: '0.5rem', lineHeight: 1.5, margin: '0.5rem 0 0 0' }}>
                  zero-trust containment time of suspicious activity, preventing threat propagation instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Onboarding Playbook */}
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ textTransform: 'uppercase', textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', fontWeight: 600 }}>
                GUARDIAN ONBOARDING PLAYBOOK
              </span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.5rem' }}>
                How We Go Live
              </h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginTop: '0.5rem', textTransform: 'none' }}>
                A highly structured execution framework designed to integrate secure AI agents safely within 90 days.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 1 (Weeks 1-2)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Ingestion & Threat Modeling</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  We map your active database environments, access control lists, and network topology to pinpoint high-value risk vectors.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 2 (Weeks 3-5)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Sandbox Provisioning</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  Our engineers deploy isolated, zero-trust cloud spaces alongside your legacy systems, running shadow tests to calibrate security rules.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 3 (Weeks 6-8)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Audit Pipeline Alignment</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  We integrate Guardian's automated logging system with your audit targets (SOC2, HIPAA, etc.), verifying compliance telemetry pipelines.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 4 (Weeks 9+)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Active Shielding</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  The zero-trust sanctuary goes live. Your critical data streams pass through Guardian's isolated sandboxes while your CISO monitors via the Lycos telemetry dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div style={{ marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <div style={{ textTransform: 'uppercase', textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', fontWeight: 600 }}>
                GUARDIAN SECURITY PLATFORM
              </span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.5rem' }}>
                Frequently Asked Questions
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(0)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem',
                    background: 'transparent', border: 'none', cursor: 'pointer', color: 'white', textAlign: 'left'
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    How does Guardian prevent performance latency inside zero-trust sandboxes?
                  </span>
                  <ChevronDown size={16} style={{ color: 'var(--text-gray)', transform: activeFaq === 0 ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                {activeFaq === 0 && (
                  <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: 1.6 }}>
                    Guardian's isolated cloud spaces are architected at the edge with microsecond routing pipelines. Your applications experience virtually zero transactional delay while keeping data completely insulated.
                  </div>
                )}
              </div>

              <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(1)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem',
                    background: 'transparent', border: 'none', cursor: 'pointer', color: 'white', textAlign: 'left'
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    Can Guardian integrate directly with existing compliance automation tools like Vanta or Drata?
                  </span>
                  <ChevronDown size={16} style={{ color: 'var(--text-gray)', transform: activeFaq === 1 ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                {activeFaq === 1 && (
                  <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: 1.6 }}>
                    Yes. Guardian acts as the source-of-truth logging engine, automatically exporting structured, cryptographic proof of compliance directly to third-party automation tools via secure API.
                  </div>
                )}
              </div>

              <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(2)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem',
                    background: 'transparent', border: 'none', cursor: 'pointer', color: 'white', textAlign: 'left'
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    How does this affect our liability under cybersecurity insurance policies?
                  </span>
                  <ChevronDown size={16} style={{ color: 'var(--text-gray)', transform: activeFaq === 2 ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                {activeFaq === 2 && (
                  <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: 1.6 }}>
                    By reducing your baseline incident probability (Pi) and securing a proactive risk mitigation profile with mathematical proofs, enterprise clients typically use Guardian's reports to negotiate down premium costs.
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
          <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '3rem' }}>
            {/* Left Col */}
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', display: 'block' }}>
                DATA INTEGRATION // REAL-TIME ENTERPRISE ALIGNMENT
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-title)', marginBottom: '0.5rem', color: 'white' }}>
                Lycos Synapse
              </h3>
              <p style={{ color: 'white', fontStyle: 'italic', marginBottom: '1.25rem', fontSize: '1rem', opacity: 0.85 }}>
                The Unified Nervous System. Zero-latency integration. Sovereign data orchestrator.
              </p>
              <p style={{ color: 'var(--text-gray)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Lycos Synapse is an elegant, low-latency data integration layer custom-engineered to bridge disconnected software tools, legacy systems, and isolated databases into a singular, cohesive ecosystem. Synapse removes system fragmentation friction, alignment delays, and operational bottlenecks to establish a highly reliable, real-time source of truth.
              </p>
              
              <div style={{ background: 'rgba(163,255,51,0.04)', border: '1px solid rgba(163,255,51,0.15)', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>
                  The Business Case
                </div>
                <p style={{ color: 'white', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  Fragmented operational systems are a silent tax on enterprise productivity. Teams spend hours manually copy-pasting data, reconciling broken pipelines, and managing sync lag. Lycos Synapse automates cross-platform data streams, turning disjointed legacy infrastructure into a flawless, unified operating system.
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['FinTech and Wealth', 'Property Management', 'Logistics and Supply', 'EdTech and Education', 'Healthcare Admin'].map((tag) => (
                  <span key={tag} style={{ padding: '0.3rem 0.75rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '12px', fontSize: '0.78rem', color: 'var(--text-gray)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Col */}
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                Anatomy of Synapse
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <Workflow size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>Administrative Eradicator</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
                      Eradicates human copy-paste errors and "swivel-chair operations." Automates complex data replication tasks to shift team capacity toward high-value operations.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <Activity size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>Pipeline Plumber</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
                      Stops revenue leaks by eliminating synchronization lag. Unifies disjointed pipelines with sub-second latency to secure high-value transaction conversions.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <Server size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>Infrastructure Sovereignty</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
                      Deploys natively within your sovereign cloud container. Keeps high-priority data transfers strictly within your security bounds, removing the risks of third-party middle-tier servers.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <Database size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>Multi-System Schema Alignment</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
                      Standardizes disparate data models on the fly. Bridges legacy core mainframes, modern CRMs, and isolated databases without requiring manual translation layers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Simulator */}
          <SynapseROISimulator />

          {/* Proven Outcomes */}
          <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px', marginBottom: '0.5rem', display: 'block' }}>
                PROVEN OUTCOMES
              </span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', marginBottom: '0.5rem', color: 'white' }}>
                Definitive Results, Not Projections
              </h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Lycos Synapse operates consistently at an enterprise standard, delivering verifiable margins.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={24} /> &lt; 1 Sec
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginTop: '0.5rem', lineHeight: 1.5, margin: '0.5rem 0 0 0' }}>
                  average operational synchronization time across cross-departmental databases.
                </p>
              </div>

              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={24} style={{ color: 'var(--accent)' }} /> 99.9%
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginTop: '0.5rem', lineHeight: 1.5, margin: '0.5rem 0 0 0' }}>
                  achieving unmatched Straight-Through Processing (STP) on automated transactions without manual correction loops.
                </p>
              </div>
            </div>
          </div>

          {/* Onboarding Playbook */}
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ textTransform: 'uppercase', textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', fontWeight: 600 }}>
                SYNAPSE ONBOARDING PLAYBOOK
              </span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.5rem' }}>
                How We Go Live
              </h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginTop: '0.5rem', textTransform: 'none' }}>
                A highly structured execution framework designed to integrate secure AI agents safely within 90 days.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 1 (Weeks 1-2)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Mapping and Discovery</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  We audit your active databases, legacy schema structures, and SaaS platforms to map dependency pipelines and isolate security boundaries.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 2 (Weeks 3-5)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Calibration</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  Our integration engineers construct custom schemas and dry-run synchronization pathways inside a secure sandbox container to verify latency targets.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 3 (Weeks 6-8)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Shadow Mode</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  Synapse runs quietly in the background alongside your legacy pipelines, validating data accuracy and transaction flows in real time with zero risk.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 4 (Weeks 9+)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Active Deployment</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  Synapse is deployed natively to your secure cloud instance, orchestrating your systems autonomously with live monitoring active on the Lycos telemetry dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div style={{ marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <div style={{ textTransform: 'uppercase', textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', fontWeight: 600 }}>
                SYNAPSE INTEGRATION PLATFORM
              </span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.5rem' }}>
                Frequently Asked Questions
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(0)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem',
                    background: 'transparent', border: 'none', cursor: 'pointer', color: 'white', textAlign: 'left'
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    Does Lycos Synapse process or store our client data on external servers?
                  </span>
                  <ChevronDown size={16} style={{ color: 'var(--text-gray)', transform: activeFaq === 0 ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                {activeFaq === 0 && (
                  <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: 1.6 }}>
                    No. Unlike traditional third-party middleware, Lycos Synapse deploys natively in your sovereign cloud container. Your data remains entirely inside your infrastructure boundaries.
                  </div>
                )}
              </div>

              <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(1)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem',
                    background: 'transparent', border: 'none', cursor: 'pointer', color: 'white', textAlign: 'left'
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    How does Synapse handle legacy mainframes that don't support modern web APIs?
                  </span>
                  <ChevronDown size={16} style={{ color: 'var(--text-gray)', transform: activeFaq === 1 ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                {activeFaq === 1 && (
                  <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: 1.6 }}>
                    Synapse is engineered with custom legacy adapters capable of bridging older on-premise relational databases, secure file structures, and custom ledger software directly to modern cloud-based CRMs.
                  </div>
                )}
              </div>

              <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(2)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem',
                    background: 'transparent', border: 'none', cursor: 'pointer', color: 'white', textAlign: 'left'
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    What happens if one of our linked applications experiences an outage?
                  </span>
                  <ChevronDown size={16} style={{ color: 'var(--text-gray)', transform: activeFaq === 2 ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                {activeFaq === 2 && (
                  <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: 1.6 }}>
                    Synapse utilizes a robust queueing and state preservation mechanism. If a destination system goes offline, Synapse securely buffers the sync pipeline and executes catching scripts as soon as connection is restored, preventing any data loss.
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ------------------------- HORIZON (Tab 4) ------------------------- */}
      {activeProduct === 4 && (
        <>
          {/* Product Intro */}
          <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '3rem' }}>
            {/* Left Col */}
            <div>
              <span style={{ fontSize: '0.75rem', color: '#bfff00', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', display: 'block' }}>
                ENTERPRISE STRATEGY // PREDICTIVE INTELLIGENCE & CAPITAL EFFICIENCY
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-title)', marginBottom: '0.5rem', color: 'white' }}>
                Lycos Horizon
              </h3>
              <p style={{ color: 'white', fontStyle: 'italic', marginBottom: '1.25rem', fontSize: '1rem', opacity: 0.85 }}>
                "The Predictive Compass. Forward-looking execution. Capital optimization."
              </p>
              <p style={{ color: 'var(--text-gray)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Lycos Horizon is a custom-engineered predictive intelligence engine designed to convert raw operational telemetry into live, actionable foresight. Operating at the C-suite level, Horizon tracks multi-layered data streams to instinctively spot market trends, anticipate supply chain shifts, and dynamically forecast demand—giving leadership the absolute confidence to navigate forward and execute proactive strategic decisions before anomalies impact the balance sheet.
              </p>
              
              <div style={{ background: 'rgba(191,255,0,0.04)', border: '1px solid rgba(191,255,0,0.15)', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#bfff00', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>
                  The Business Case
                </div>
                <p style={{ color: 'white', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  Static historical guessing forces enterprises to hoard expensive "just-in-case" safety capital and over-schedule labor. Lycos Horizon replaces legacy, rearview-mirror planning with real-time predictive machine learning, safely maximizing asset utilization and preventing costly capacity gluts.
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['FinTech and Wealth', 'Property Management', 'Logistics and Supply', 'Healthcare Admin'].map((tag) => (
                  <span key={tag} style={{ padding: '0.3rem 0.75rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '12px', fontSize: '0.78rem', color: 'var(--text-gray)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Col */}
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                Anatomy of Horizon
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: '#bfff00', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <Compass size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>Advanced Telemetry Engine</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
                      Horizon doesn't just analyze isolated spreadsheets. It orchestrates raw enterprise data, historical timelines, and external market signals into a live, multi-variable forecasting matrix.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: '#bfff00', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <Coins size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>Capital Liberator</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
                      Directly targets balance sheet inefficiencies by dramatically tightening forecasting error rates, unlocking trapped cash from bloated safety stock, and reducing carrying costs.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: '#bfff00', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <Activity size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>Capacity Stabilizer</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
                      Dynamically aligns labor scheduling, physical infrastructure, and asset deployment weeks in advance, putting an end to the twin nightmares of paying idle workers or losing customer demand.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: '#bfff00', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.4rem', borderRadius: '6px', flexShrink: 0 }}>
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>Strategic Telescope</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginTop: '0.25rem', margin: 0 }}>
                      Replaces reactive operational tracking with predictive machine learning models, equipping executives with a clear view of upcoming market waves to turn volatility into an unfair competitive advantage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Simulator */}
          <HorizonROISimulator />

          {/* Proven Outcomes */}
          <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#bfff00', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px', marginBottom: '0.5rem', display: 'block' }}>
                PROVEN OUTCOMES
              </span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', marginBottom: '0.5rem', color: 'white' }}>
                Definitive Results, Not Projections
              </h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Lycos Horizon operates consistently at an enterprise standard, delivering verifiable margins.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#bfff00', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={24} /> 30–60%
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginTop: '0.5rem', lineHeight: 1.5, margin: '0.5rem 0 0 0' }}>
                  average reduction in traditional forecasting error rates and planning variances.
                </p>
              </div>

              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={24} style={{ color: '#bfff00' }} /> 15–25%
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginTop: '0.5rem', lineHeight: 1.5, margin: '0.5rem 0 0 0' }}>
                  reclaimed capital from frozen holding and carrying costs on over-stocked inventory or overhead.
                </p>
              </div>
            </div>
          </div>

          {/* Onboarding Playbook */}
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ textTransform: 'uppercase', textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#bfff00', letterSpacing: '2px', fontWeight: 600 }}>
                HORIZON ONBOARDING PLAYBOOK
              </span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.5rem' }}>
                How We Go Live
              </h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginTop: '0.5rem', textTransform: 'none' }}>
                A highly structured execution framework designed to integrate secure AI agents safely within 90 days.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#bfff00', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 1 (Weeks 1-2)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Telemetry Ingestion</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  We securely connect to your historical enterprise databases, ERP, CRM, and supply chain management systems to ingest historical operational logs and build Horizon's baseline dataset.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#bfff00', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 2 (Weeks 3-5)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Model Calibration</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  Our machine learning engineers configure and fine-tune Horizon's predictive algorithms, back-testing the models against your past seasonal cycles to minimize baseline forecast error rates.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#bfff00', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 3 (Weeks 6-8)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Shadow Mode</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  Horizon runs quietly in the background of your live operations, generating predictive forecasts and comparing them to real-time outcomes to validate and prove forecasting precision.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#bfff00', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  PHASE 4 (Weeks 9+)
                </span>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'white' }}>Active Foresight</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.6, margin: 0 }}>
                  Horizon's live predictive insights are integrated directly into your executive dashboards and planning software, empowering your leadership to make proactive, data-backed capital decisions.
                </p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div style={{ marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <div style={{ textTransform: 'uppercase', textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#bfff00', letterSpacing: '2px', fontWeight: 600 }}>
                HORIZON PREDICTIVE SYSTEM
              </span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.5rem' }}>
                Frequently Asked Questions
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(0)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem',
                    background: 'transparent', border: 'none', cursor: 'pointer', color: 'white', textAlign: 'left'
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    How does Horizon maintain forecast accuracy during unexpected market shocks?
                  </span>
                  <ChevronDown size={16} style={{ color: 'var(--text-gray)', transform: activeFaq === 0 ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                {activeFaq === 0 && (
                  <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: 1.6 }}>
                    Horizon does not rely solely on simple historical trends. It utilizes multi-variable, real-time telemetry processing that continuously correlates internal operational data with external market vectors and macroeconomic indicators, dynamically adjusting its models to remain highly accurate even during volatile shifts.
                  </div>
                )}
              </div>

              <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(1)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem',
                    background: 'transparent', border: 'none', cursor: 'pointer', color: 'white', textAlign: 'left'
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    What kind of historical data does Horizon need to begin training its models?
                  </span>
                  <ChevronDown size={16} style={{ color: 'var(--text-gray)', transform: activeFaq === 1 ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                {activeFaq === 1 && (
                  <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: 1.6 }}>
                    To deliver optimal precision, Horizon typically ingests 12 to 36 months of historical data (such as past transaction records, inventory timelines, resource scheduling, or supply chain logs). During the initial Ingestion phase, our platform cleanses, structures, and normalizes this historical data automatically.
                  </div>
                )}
              </div>

              <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(2)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem',
                    background: 'transparent', border: 'none', cursor: 'pointer', color: 'white', textAlign: 'left'
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    Can Horizon sync directly with our ERP, inventory, or scheduling software?
                  </span>
                  <ChevronDown size={16} style={{ color: 'var(--text-gray)', transform: activeFaq === 2 ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                {activeFaq === 2 && (
                  <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: 1.6 }}>
                    Yes. Horizon is custom-engineered to integrate seamlessly with modern enterprise platforms, standard ERP systems (such as SAP or Oracle), and proprietary internal databases via secure, high-throughput APIs. This ensures that predictive insights automatically flow directly into your daily daily planning tools.
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}

```

---

## Step 4: Overwrite WhoWeAreSection.tsx

### File Target: [WhoWeAreSection.tsx](file://C:/Users/Homebase/Local Sites/lycoscore/v2-development/frontend/src/components/WhoWeAreSection.tsx)

```typescript
import { CheckCircle } from 'lucide-react';

const disciplines = [
  {
    icon: '🧠',
    title: 'Neural Architects',
    description: 'Specialists in machine learning architecture, custom model tuning, and agentic orchestration. They construct and deploy resilient, production-grade neural systems built for complex, high-stakes environments.',
  },
  {
    icon: '⚙️',
    title: 'Tactical Operators',
    description: "Field veterans with deep operational history inside global institutions. They translate raw AI capabilities into seamless, high-yield process evolution, bridging the gap between machine deployment and concrete business objectives.",
  },
  {
    icon: '🏗️',
    title: 'Systems Architects',
    description: 'Systems engineers who design the integration framework, ensuring new AI models merge flawlessly with your legacy infrastructure. They own the structural blueprint from telemetry to production, ensuring zero operational friction.',
  },
  {
    icon: '💻',
    title: 'Core Engineers',
    description: 'Full-stack engineers focused on building highly secure, scalable, and resilient platforms. Specialists in API-first architectures, event-driven systems, and the high-performance cloud environments where enterprise AI operates.',
  },
  {
    icon: '📋',
    title: 'Operations Lead',
    description: 'The rhythm of the run. They oversee deployment velocity, align cross-functional resources, and ensure execution phases transition seamlessly from telemetry to production with absolute structural discipline.',
  },
  {
    icon: '🎯',
    title: 'Cognitive Calibrator',
    description: 'Specialists in logic alignment and behavioral tuning. They design, program, and refine the precise instruction sets that govern model outputs, ensuring the system operates with maximum accuracy and zero drift.',
  },
  {
    icon: '🛡️',
    title: 'Adversarial Engineer',
    description: 'The ultimate defense line. They conduct rigorous adversarial testing, stress-test pipelines under heavy loads, and validate outputs to ensure the system is secure, compliant, and completely bulletproof before public deployment.',
  },
  {
    icon: '📈',
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

export default function WhoWeAreSection() {
  return (
    <div id="who-we-are-section" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', color: 'white' }}>

      {/* Hero */}
      <div style={{ marginBottom: '4rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
          // THE COLLECTIVE
        </span>
        <h2 style={{ fontSize: '2.8rem', fontFamily: 'var(--font-title)', marginTop: '0.5rem', marginBottom: '1rem', lineHeight: 1.15 }}>
          Forged by Operators.<br /><span style={{ color: 'var(--accent)' }}>Built for the Field.</span>
        </h2>
        <p style={{ color: 'var(--text-gray)', fontSize: '1.05rem', maxWidth: '700px', margin: 0, lineHeight: 1.8 }}>
          Lycos Core is a highly coordinated collective of AI engineers, system architects, and seasoned deployment specialists. We do not hypothesize or theorize in a vacuum. We design, harden, and execute machine intelligence within the world's most complex, heavily regulated digital territories. We know precisely what it takes to survive contact with reality.
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
        {stats.map((s, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '1.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: 'var(--accent)', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-gray)', marginTop: '0.5rem', lineHeight: 1.5 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Team Disciplines */}
      <div style={{ marginBottom: '4rem' }}>
        <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', marginBottom: '0.5rem' }}>// THE UNIT</h3>
        <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
          Every deployment activates a highly synchronized, cross-functional unit. Real machine intelligence cannot be integrated through a single discipline; it requires a coordinated effort.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
          {disciplines.map((d, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '1.25rem' }}>
              <div style={{ fontSize: '2.2rem', flexShrink: 0, lineHeight: 1 }}>{d.icon}</div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem', color: 'white' }}>{d.title}</h4>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{d.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience & Credentials */}
      <div className="glass-panel" style={{ padding: '2.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px', marginBottom: '0.75rem' }}>
            // PROVEN TERRITORY
          </div>
          <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', marginBottom: '1rem', lineHeight: 1.3 }}>
            Surgically Hardened in Regulated Industries.
          </h3>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Our operators have been embedded inside multinational financial institutions, global insurance giants, and high-security enterprise environments. We do not just navigate regulatory landscapes, risk parameters, and operational friction from the outside - we designed systems from within their core. We build to respect the boundaries while pushing the limits of what is possible.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {credentials.map((c, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '0.92rem', color: 'white', lineHeight: 1.5 }}>{c}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
```

---

## Step 5: Overwrite HowWeOperateSection.tsx

### File Target: [HowWeOperateSection.tsx](file://C:/Users/Homebase/Local Sites/lycoscore/v2-development/frontend/src/components/HowWeOperateSection.tsx)

```typescript
import { CheckCircle } from 'lucide-react';

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

export default function HowWeOperateSection() {
  return (
    <div id="how-we-operate-section" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', color: 'white' }}>

      {/* Hero */}
      <div style={{ marginBottom: '4rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
          // THE RUN
        </span>
        <h2 style={{ fontSize: '2.8rem', fontFamily: 'var(--font-title)', marginTop: '0.5rem', marginBottom: '1rem', lineHeight: 1.15 }}>
          Synchronized Engagement.<br /><span style={{ color: 'var(--accent)' }}>Absolute Accountability.</span>
        </h2>
        <p style={{ color: 'var(--text-gray)', fontSize: '1.05rem', maxWidth: '680px', margin: 0, lineHeight: 1.8 }}>
          We operate on high-velocity sprint cycles defined by absolute transparency, real-time telemetry, and a dedicated, named squad from day one. There are no shifting variables or speculative timelines. Every run is surgically scoped, systematically structured, and continuously benchmarked against hard performance metrics.
        </p>
      </div>

      {/* Engagement phases */}
      <div style={{ marginBottom: '5rem' }}>
        <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', marginBottom: '0.5rem' }}>ENGAGEMENT PROTOCOL</h3>
        <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', marginBottom: '3rem' }}>
          From initiation telemetry to systemic production deployment—the cycle of the run.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {phases.map((phase, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '0.25fr 1.2fr 1fr', gap: '2rem', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: 'rgba(163,255,51,0.2)', fontFamily: 'var(--font-title)', lineHeight: 1 }}>{phase.num}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '0.35rem', fontWeight: 600 }}>{phase.duration}</div>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem', color: 'white' }}>{phase.title}</h4>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>{phase.desc}</p>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>Deliverables</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {phase.deliverables.map((d, dIdx) => (
                    <div key={dIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'white' }}>
                      <CheckCircle size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} /> {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incubation Hub Onboarding */}
      <div>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px', marginBottom: '0.5rem' }}>INCUBATION PROTOCOLS</div>
          <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', marginBottom: '0.75rem' }}>Intake and System Integration</h3>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', maxWidth: '620px', lineHeight: 1.7 }}>
            The Incubation Hub operates on a rigorous, cohort-based integration sequence. We secure dedicated operational bandwidth and technical resources for every selected venture—ensuring your system receives raw, undivided power, never a shared timeslot.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {incubationSteps.map((step, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '1.5rem', position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(163,255,51,0.1)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)', zIndex: 1 }}>
                  {idx + 1}
                </div>
                {idx < incubationSteps.length - 1 && (
                  <div style={{ width: '1px', flexGrow: 1, background: 'rgba(255,255,255,0.06)', minHeight: '32px' }} />
                )}
              </div>
              <div style={{ paddingBottom: idx < incubationSteps.length - 1 ? '2rem' : '0' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'white' }}>{step.label}</h4>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.88rem', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
```

---

## Step 6: Overwrite GovernanceSection.tsx

### File Target: [GovernanceSection.tsx](file://C:/Users/Homebase/Local Sites/lycoscore/v2-development/frontend/src/components/GovernanceSection.tsx)

```typescript
import { CheckCircle, Shield } from 'lucide-react';

const standards = [
  {
    label: 'GDPR',
    full: 'General Data Protection Regulation',
    region: 'European Union',
    desc: 'All client data routed through our architecture is bound by strict GDPR protocols—enforcing systematic data minimization, rigorous lawful-basis logging, and automated access rights management.',
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
  },
  {
    label: 'ISO 27001',
    full: 'Information Security Management',
    region: 'International',
    desc: 'Our security protocols are locked to ISO 27001 principles. We enforce automated access barriers, immediate incident countermeasures, and continuous system threat audits.',
  },
  {
    label: 'FTC AI Guidelines',
    full: 'Federal Trade Commission AI Standards',
    region: 'United States',
    desc: 'Systems deployed into US territories are rigorously tested against FTC AI benchmarks—verifying algorithmic transparency, eliminating bias vectors, and neutralizing deceptive output risks.',
  },
  {
    label: 'POPIA',
    full: 'Protection of Personal Information Act',
    region: 'South Africa',
    desc: 'For African territory deployments, we enforce POPIA-compliant data processing pipelines—establishing clear processing constraints and automated data breach notification protocols.',
  },
  {
    label: 'ISO 42001',
    full: 'Artificial Intelligence Management System',
    region: 'International',
    desc: 'Our entire AI lifecycle—from initial model training and data processing to deployment and feedback loops—is aligned with ISO 42001 parameters to ensure systemic safety, accountability, and ethical integrity.',
  },
  {
    label: 'NIST AI RMF',
    full: 'AI Risk Management Framework',
    region: 'United States',
    desc: 'We map, measure, and govern system risks against the NIST framework—enforcing strict trustworthiness metrics to verify that all active models are secure, resilient, and explainable.',
  },
  {
    label: 'HIPAA',
    full: 'Health Insurance Portability and Accountability Act',
    region: 'United States',
    desc: 'For biomedical and health-tech integrations, we engineer strict data-transmission tunnels and zero-trust storage protocols to safeguard Protected Health Information (PHI).',
  },
  {
    label: 'DORA',
    full: 'Digital Operational Resilience Act',
    region: 'European Union',
    desc: 'We align our deployments with DORA specifications for EU financial markets—hardening our digital infrastructure against systemic ICT risks and guaranteeing operational continuity during high-demand run states.',
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

export default function GovernanceSection() {
  return (
    <div id="governance-section" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', color: 'white' }}>

      {/* Hero */}
      <div style={{ marginBottom: '4rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
          SYSTEM INTEGRITY &amp; SECURE GOVERNANCE
        </span>
        <h2 style={{ fontSize: '2.8rem', fontFamily: 'var(--font-title)', marginTop: '0.5rem', marginBottom: '1rem', lineHeight: 1.15 }}>
          Compliance is not a checklist.<br /><span style={{ color: 'var(--accent)' }}>It is hardcoded into the core.</span>
        </h2>
        <p style={{ color: 'var(--text-gray)', fontSize: '1.05rem', maxWidth: '700px', margin: 0, lineHeight: 1.8 }}>
          We design for high-trust, heavily regulated digital territories. Our governance architecture is never retrofitted as an afterthought—it is compiled directly into our delivery pipelines, from the initial telemetry run to active system deployment. We enforce the same unyielding security parameters within our own collective that we hardcode into your enterprise core.
        </p>
      </div>

      {/* Regulatory standards grid */}
      <div style={{ marginBottom: '5rem' }}>
        <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', marginBottom: '0.5rem' }}>Boundaries of the Run</h3>
        <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
          We do not simply advise on compliance parameters. We build directly to them, operating our entire infrastructure within these global bounds.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {standards.map((s, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{ background: 'rgba(163,255,51,0.08)', border: '1px solid rgba(163,255,51,0.2)', borderRadius: '6px', padding: '0.35rem 0.75rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)' }}>
                  {s.label}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-gray)', textAlign: 'right' }}>{s.region}</div>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-gray)', marginBottom: '0.6rem' }}>{s.full}</div>
              <p style={{ fontSize: '0.88rem', color: 'white', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Operational controls */}
      <div style={{ marginBottom: '5rem' }}>
        <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', marginBottom: '0.5rem' }}>Operational Security Controls</h3>
        <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
          Hardened defense parameters enforced across our internal environment and every active deployment.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
          {operationalControls.map((c, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '1.75rem', display: 'flex', gap: '1rem' }}>
              <Shield size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'white' }}>{c.title}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-gray)', lineHeight: 1.65, margin: 0 }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Internal governance */}
      <div className="glass-panel" style={{ padding: '2.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px', marginBottom: '0.75rem' }}>INTERNAL GOVERNANCE MODEL</div>
          <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-title)', marginBottom: '1rem', lineHeight: 1.3 }}>We govern our collective exactly how we govern AI.</h3>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.92rem', lineHeight: 1.7 }}>
            Accountability is not just a regulatory model we export to clients; it is the core operating system of our own collective. From how we assign dedicated operators to every system run to how we audit and authorize internal model deployments, our operational discipline is absolute and continuous.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {internalGovernance.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle size={15} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '0.9rem', color: 'white', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
```

---

## Step 7: Overwrite App.tsx

### File Target: [App.tsx](file://C:/Users/Homebase/Local Sites/lycoscore/v2-development/frontend/src/App.tsx)

```typescript
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useGSAP } from '@gsap/react'
import { 
  ArrowRight, 
  ChevronRight, 
  Cpu, 
  Layers, 
  Activity, 
  TrendingUp, 
  CheckCircle, 
  Info,
  X,
  Clock
} from 'lucide-react'

// Import 3x3x3 framework assets
import { mockInsights, mockArticles, mockCaseStudies } from './data/mockCmsData'
import InsightsSection from './components/InsightsSection'
import ArticlesSection from './components/ArticlesSection'
import CaseStudiesSection from './components/CaseStudiesSection'
import TechServicesSection from './components/TechServicesSection'
import IncubationHubSection from './components/IncubationHubSection'
import AIProductsSection from './components/AIProductsSection'
import WhoWeAreSection from './components/WhoWeAreSection'
import HowWeOperateSection from './components/HowWeOperateSection'
import GovernanceSection from './components/GovernanceSection'
import { WorldMap } from './components/WorldMap'

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

let isProgrammaticScroll = false;

// Fallback content for the Home page
```typescript
const FALLBACK_HOME = {
  hero: {
    tagline: '// COGNITIVE ENGINEERING. APEX INTELLIGENCE',
    title: 'Precision AI Systems.',
    subtitle: 'Engineered with Instinct.',
    bodyCopy: 'We architect bespoke AI products, orchestrate enterprise-scale cognitive strategy, and run a high-velocity incubation hub to trial next-generation solutions. Systemic machine intelligence, built to navigate market complexity.',
    exploreBtnText: 'Deploy Solutions',
    partnerBtnText: 'Enter Incubation',
  },
  pillars: {
    title: 'Our Core Protocols',
    items: [
      {
        title: 'Cognitive Advisory',
        description: 'Strategic advisory for AI implementation and technology transformation.',
      },// Setup scroll listener for floating header background transformation (subpages only)
  useEffect(() => {
    const handleScroll = () => {
      if (slug !== 'home' && window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [slug])

  // Fetch 3x3x3 collection lists if on their routes
  useEffect(() => {
    if (slug === 'insights') {
      fetch('http://127.0.0.1:3000/api/insights?limit=100')
        .then((res) => {
          if (!res.ok) throw new Error('API failed')
          return res.json()
        })
        .then((data) => {
          if (data.docs && data.docs.length > 0) {
            const mapped = data.docs.map((doc: any) => ({
              ...doc,
              content: serializeLexicalToHtml(doc.content),
              tags: (doc.tags || []).map((t: any) => typeof t === 'string' ? t : t.tag),
              featuredImage: doc.featuredImage?.url || doc.featuredImage || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop',
              author: {
                name: doc.author?.name || '',
                role: doc.author?.role || '',
                bio: doc.author?.bio || '',
                avatar: doc.author?.avatar?.url || doc.author?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop'
              }
            }))
            setInsightsData(mergeAndSort(mockInsights, mapped))
          } else {
            setInsightsData([...mockInsights].sort(sortNewestToOldest))
          }
        })
        .catch(() => {
          console.log('Could not connect to Payload CMS for insights, using local mock data.')
          setInsightsData([...mockInsights].sort(sortNewestToOldest))
        })
    } else if (slug === 'articles') {
      fetch('http://127.0.0.1:3000/api/articles?limit=100')
        .then((res) => {
          if (!res.ok) throw new Error('API failed')
          return res.json()
        })
        .then((data) => {
          if (data.docs && data.docs.length > 0) {
            const mapped = data.docs.map((doc: any) => ({
              ...doc,
              commentary: serializeLexicalToHtml(doc.commentary),
              tags: (doc.tags || []).map((t: any) => typeof t === 'string' ? t : t.tag)
            }))
            setArticlesData(mergeAndSort(mockArticles, mapped))
          } else {
            setArticlesData([...mockArticles].sort(sortNewestToOldest))
          }
        })
        .catch(() => {
          console.log('Could not connect to Payload CMS for articles, using local mock data.')
          setArticlesData([...mockArticles].sort(sortNewestToOldest))
        })
    } else if (slug === 'case-studies') {
      fetch('http://127.0.0.1:3000/api/case-studies?limit=100')
        .then((res) => {
          if (!res.ok) throw new Error('API failed')
          return res.json()
        })
        .then((data) => {
          if (data.docs && data.docs.length > 0) {
            const mapped = data.docs.map((doc: any) => ({
              ...doc,
              solution: serializeLexicalToHtml(doc.solution),
              results: serializeLexicalToHtml(doc.results),
              techStack: (doc.techStack || []).map((t: any) => typeof t === 'string' ? t : t.name),
              heroImage: doc.heroImage?.url || doc.heroImage || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop'
            }))
            setCaseStudiesData(mergeAndSort(mockCaseStudies, mapped))
          } else {
            setCaseStudiesData([...mockCaseStudies])
          }
        })
        .catch(() => {
          console.log('Could not connect to Payload CMS for case-studies, using local mock data.')
          setCaseStudiesData([...mockCaseStudies])
        })
    }
  }, [slug])

  // Dynamically load and initialize mesh.js script (Home page only)
  useEffect(() => {
    if (slug !== 'home') return

    let script = document.querySelector('script[src="/media/mesh.js"]') as HTMLScriptElement
    
    const handleScriptLoad = () => {
      if (typeof (window as any).initMesh === 'function') {
        if (typeof (window as any).meshCleanup === 'function') {
          (window as any).meshCleanup();
        }
        (window as any).meshCleanup = (window as any).initMesh();
      }
    }

    if (!script) {
      script = document.createElement('script');
      script.src = '/media/mesh.js';
      script.async = true;
      script.onload = handleScriptLoad;
      document.body.appendChild(script);
    } else {
      // Re-init if script is already loaded
      handleScriptLoad();
    }

    return () => {
      if (typeof (window as any).meshCleanup === 'function') {
        (window as any).meshCleanup();
        (window as any).meshCleanup = null;
      }
    }
  }, [slug])

  // Initialize display strings to zeroed placeholders before animation triggers
  useEffect(() => {
    if (pageData.useCase?.metrics) {
      setDisplayedUseCaseMetrics(pageData.useCase.metrics.map((m: any) => {
        if (m.value.includes('%')) return '0%'
        if (m.value.includes('R') || m.value.includes('M')) return 'R0.0M'
        return '0'
      }))
    }
    if (pageData.performance?.metrics) {
      setDisplayedPerformanceMetrics(pageData.performance.metrics.map((m: any) => {
        if (m.value.includes(':')) return '00:00'
        if (m.value.includes('%')) return '0%'
        return '0'
      }))
    }
  }, [pageData])

  // Helper to parse metric value details
  const parseMetric = (valStr: string) => {
    const match = valStr.match(/^([^0-9.]*)([0-9.,]+)([^0-9.]*)$/)
    if (!match) return { prefix: '', value: 0, suffix: valStr }
    const prefix = match[1]
    const numStr = match[2].replace(/,/g, '')
    const suffix = match[3]
    const value = parseFloat(numStr)
    return { prefix, value, suffix }
  }

  // Animation triggers based on activeSection (Horizontal home page metrics)
  useEffect(() => {
    if (slug !== 'home') return

    if (activeSection === 1 && !hasLandedOnPillars) {
      setHasLandedOnPillars(true)
      if (pillarsClipRectRef.current) {
        gsap.to(pillarsClipRectRef.current, {
          width: 500,
          duration: 2,
          ease: 'power1.inOut'
        })
      }
    }

    if (activeSection === 2 && !hasLandedOnUseCase) {
      setHasLandedOnUseCase(true)
      if (pageData.useCase?.metrics) {
        const parsed = pageData.useCase.metrics.map((m: any) => parseMetric(m.value))
        const obj = { val0: 0, val1: 0, val2: 0 }
        gsap.to(obj, {
          val0: parsed[0]?.value || 0,
          val1: parsed[1]?.value || 0,
          val2: parsed[2]?.value || 0,
          duration: 2,
          ease: 'power1.out',
          onUpdate: () => {
            const displayValues = pageData.useCase.metrics.map((m: any, idx: number) => {
              const item = parsed[idx]
              if (!item) return m.value
              const animatedVal = obj[`val${idx}` as keyof typeof obj]
              if (idx === 2) {
                const steppedVal = Math.round(animatedVal * 10) / 10
                return `${item.prefix}${steppedVal.toFixed(1)}${item.suffix}`
              } else {
                return `${item.prefix}${Math.round(animatedVal)}${item.suffix}`
              }
            })
            setDisplayedUseCaseMetrics(displayValues)
          }
        })
      }
    }

    if (activeSection === 3 && !hasLandedOnPerformance) {
      setHasLandedOnPerformance(true)
      if (pageData.performance?.metrics) {
        const parsed = pageData.performance.metrics.map((m: any) => {
          if (m.value.includes(':')) {
            const parts = m.value.split(':')
            const totalSec = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10)
            return { isDuration: true, target: totalSec, prefix: '', suffix: '' }
          } else {
            const pm = parseMetric(m.value)
            return { isDuration: false, target: pm.value, prefix: pm.prefix, suffix: pm.suffix }
          }
        })
        const obj = { val0: 0, val1: 0, val2: 0 }
        gsap.to(obj, {
          val0: parsed[0]?.target || 0,
          val1: parsed[1]?.target || 0,
          val2: parsed[2]?.target || 0,
          duration: 2,
          ease: 'power1.out',
          onUpdate: () => {
            const displayValues = pageData.performance.metrics.map((m: any, idx: number) => {
              const item = parsed[idx]
              if (!item) return m.value
              const animatedVal = obj[`val${idx}` as keyof typeof obj]
              if (item.isDuration) {
                const totalSecs = Math.round(animatedVal)
                const mins = Math.floor(totalSecs / 60)
                const secs = totalSecs % 60
                return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
              } else {
                const roundedVal = Math.round(animatedVal)
                if (m.value.includes(',')) {
                  return `${item.prefix}${roundedVal.toLocaleString()}${item.suffix}`
                }
                return `${item.prefix}${roundedVal}${item.suffix}`
              }
            })
            setDisplayedPerformanceMetrics(displayValues)
          }
        })
      }

      if (performanceClipRectRef.current) {
        gsap.to(performanceClipRectRef.current, {
          width: 500,
          duration: 2,
          ease: 'power1.inOut'
        })
      }

      const bubbleObj = { val: 0 }
      gsap.to(bubbleObj, {
        val: 23,
        duration: 2,
        ease: 'power1.out',
        onUpdate: () => {
          setDisplayedEfficiencyGain(`+${Math.round(bubbleObj.val)}%`)
        }
      })
    }
  }, [activeSection, hasLandedOnPillars, hasLandedOnUseCase, hasLandedOnPerformance, pageData, slug])

  // Smooth scroll to anchored section index or offset
  const scrollToSection = (index: number) => {
    if (slug === 'home') {
      const container = containerRef.current
      if (!container) return

      const totalSections = 5

      // Use ScrollTrigger's own scroll setter to avoid fighting the pin/scrub
      const trigger = ScrollTrigger.getById('home-scroll-trigger')
      if (trigger) {
        // Bypass snap temporarily
        isProgrammaticScroll = true
        const targetProgress = index / (totalSections - 1)
        // ScrollTrigger.scroll() sets the actual scroll position directly
        const scrollTotal = trigger.end - trigger.start
        const targetY = trigger.start + targetProgress * scrollTotal
        window.scrollTo({ top: targetY, behavior: 'smooth' })
        setTimeout(() => { isProgrammaticScroll = false }, 800)
      } else {
        // Fallback: compute manually
        ScrollTrigger.refresh()
        const scrollTotal = container.scrollWidth - window.innerWidth
        const targetY = (index / (totalSections - 1)) * scrollTotal
        isProgrammaticScroll = true
        window.scrollTo({ top: targetY, behavior: 'smooth' })
        setTimeout(() => { isProgrammaticScroll = false }, 800)
      }

      setActiveSection(index)
    } else {
      // Subpage navigation back to home section
      setPendingScrollIndex(index)
      navigateTo('home')
    }
  }

  // Handle pending scroll index after navigating back to home
  useEffect(() => {
    if (slug === 'home' && pendingScrollIndex !== null) {
      const timer = setTimeout(() => {
        scrollToSection(pendingScrollIndex)
        setPendingScrollIndex(null)
      }, 200) // 200ms delay to ensure DOM and GSAP are fully ready
      return () => clearTimeout(timer)
    }
  }, [slug, pendingScrollIndex])

  // GSAP Horizontal Scroll Setup (Home Page only)
  useGSAP(() => {
    if (slug !== 'home') return

    const container = containerRef.current
    if (!container) return

    const sections = gsap.utils.toArray('.section')
    const totalSections = sections.length
    console.log("HORIZONTAL SECTIONS DETECTED:", totalSections, sections.map((s: any) => `${s.tagName}#${s.id}`))

    // Create a single timeline for all horizontal animations
    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'home-scroll-trigger',
        trigger: container,
        pin: true,
        scrub: true,
        start: 'top top',
        end: () => '+=' + (container.scrollWidth - window.innerWidth),
        invalidateOnRefresh: true,
        snap: {
          snapTo: (value: number) => {
            if (isProgrammaticScroll) return value; // bypass snapping during menu clicks
            const step = 1 / (totalSections - 1);
            return Math.round(value / step) * step;
          },
          duration: { min: 0.3, max: 0.6 },
          delay: 0.55,
          ease: 'power1.inOut'
        },
        onUpdate: (self) => {
          // Track active section based on progress
          const progress = self.progress
          const sectionIndex = Math.round(progress * (totalSections - 1))
          setActiveSection(sectionIndex)
        }
      }
    })

    // 1. Slide the content wrapper horizontally
    tl.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: 'none'
    }, 0)

    // 2. Parallax layer 1: background (slower)
    tl.to('.parallax-bg', {
      xPercent: -40,
      ease: 'none'
    }, 0)

    // 3. Parallax layer 2: grid pattern (medium)
    tl.to('.parallax-grid', {
      xPercent: -60,
      ease: 'none'
    }, 0)

    return () => {
      tl.scrollTrigger?.kill(true)
      tl.kill()
    }
  }, [pageData, slug])

  // GSAP Vertical Scroll Section Tracker (Subpages only)
  useGSAP(() => {
    if (slug === 'home') return

    const sections = gsap.utils.toArray('.section') as HTMLElement[]
    const triggers: any[] = []

    sections.forEach((sec, idx) => {
      const trigger = ScrollTrigger.create({
        trigger: sec,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(idx)
          }
        }
      })
      triggers.push(trigger)
    })

    // GSAP ScrollTrigger vertical count-up animations
    const countUpTriggers: any[] = []
    gsap.utils.toArray('.count-up-trigger').forEach((el: any) => {
      const targetVal = parseFloat(el.getAttribute('data-target') || '0')
      const isPercentage = el.getAttribute('data-percent') === 'true'
      const obj = { val: 0 }
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(obj, {
            val: targetVal,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
              el.innerText = `${Math.round(obj.val)}${isPercentage ? '%' : ''}`
            }
          })
        }
      })
      countUpTriggers.push(trigger)
    })

    return () => {
      triggers.forEach(t => t.kill())
      countUpTriggers.forEach(t => t.kill())
    }
  }, [pageData, slug])

  // Dynamic Block Renderers for AI Consulting subpage
  const renderHeroBlock = (block: any, idx: number) => {
    let taglines = ['Strategic', 'Ethical', 'Scalable']
    let bodyCopy = block.bodyCopy || ''
    if (block.subtitle) {
      const parts = block.subtitle.split('\n\n')
      if (parts.length > 1) {
        taglines = parts[0].split('.').map((s: string) => s.trim()).filter(Boolean)
        bodyCopy = parts[1]
      } else {
        taglines = block.subtitle.split('.').map((s: string) => s.trim()).filter(Boolean)
      }
    }

    return (
      <section key={idx} id="block-hero" className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '1200px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            {/* Breadcrumb */}
            <div className="breadcrumb" style={{ fontSize: '0.9rem', color: 'var(--text-gray)', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} style={{ color: 'var(--text-gray)', textDecoration: 'none' }}>Home</a>
              <span>&gt;</span>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} style={{ color: 'var(--text-gray)', textDecoration: 'none' }}>Our Pillars</a>
              <span>&gt;</span>
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>AI Consulting</span>
            </div>
            
            <h1 style={{ fontSize: '3.6rem', lineHeight: '1.15', marginBottom: '1.5rem', fontFamily: 'var(--font-title)' }}>
              {block.title || <>
                <span style={{ color: 'var(--accent)' }}>Transformative</span> AI Consulting.
              </>}
            </h1>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              {taglines.map((tag: string, tIdx: number) => (
                <span key={tIdx} style={{ background: 'rgba(138, 75, 243, 0.1)', color: 'var(--accent)', border: '1px solid rgba(138, 75, 243, 0.2)', padding: '0.35rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600 }}>{tag}</span>
              ))}
            </div>

            <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: '1.6' }}>
              {bodyCopy}
            </p>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <button className="btn-solid" onClick={() => scrollToSection(4)}>
                {block.exploreBtnText} <ArrowRight size={18} />
              </button>
              <button className="btn-outline" onClick={() => {
                const el = document.getElementById('block-useCase');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>
                {block.partnerBtnText}
              </button>
            </div>
          </div>

          {/* Visual Gauge widget (Reference Design inspired) */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '340px', border: '1px solid rgba(138, 75, 243, 0.25)', boxShadow: '0 0 25px rgba(138, 75, 243, 0.15)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>Autopilot AI Ready</span>
              
              <div style={{ position: 'relative', width: '160px', height: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="var(--accent)" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="2.5" strokeLinecap="round" />
                </svg>
                <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white', fontFamily: 'var(--font-title)' }}>99%</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>Confidence</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-gray)', fontSize: '0.8rem' }}>
                <CheckCircle size={16} style={{ color: 'var(--accent)' }} /> Compliance Validated
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const renderPillarsBlock = (block: any, idx: number) => {
    return (
      <section key={idx} id="block-pillars" className="section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3.5rem', textTransform: 'none', fontFamily: 'var(--font-title)' }}>
          {block.title.split(' ')[0]} <span style={{ color: 'var(--accent)' }}>{block.title.split(' ').slice(1).join(' ')}</span>
        </h2>

        <div className="services-grid">
          {block.items.map((item: any, cIdx: number) => (
            <div key={cIdx} className="glass-panel purple-glow-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', padding: '2rem', minHeight: '280px', border: '1px solid rgba(138, 75, 243, 0.15)' }}>
              <div>
                <div style={{ color: 'var(--accent)', marginBottom: '1.25rem' }}>
                  {cIdx === 0 && <Cpu size={32} />}
                  {cIdx === 1 && <Layers size={32} />}
                  {cIdx === 2 && <Activity size={32} />}
                  {cIdx === 3 && <TrendingUp size={32} />}
                </div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.92rem', lineHeight: '1.5' }}>{item.description}</p>
              </div>
              <button 
                className="btn-link" 
                onClick={() => {
                  const el = document.getElementById('block-deepDive');
                  if (el) {
                    gsap.to(window, {
                      scrollTo: { y: el.offsetTop - 80, autoKill: false },
                      duration: 0.75,
                      ease: 'power2.inOut'
                    });
                  }
                }} 
                style={{ marginTop: '2rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                Learn more <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const renderFrameworkBlock = (block: any, idx: number) => {
    return (
      <section key={idx} id="block-framework" className="section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3.5rem', textTransform: 'none', fontFamily: 'var(--font-title)' }}>
          Our Strategic <span style={{ color: 'var(--accent)' }}>Framework</span>
        </h2>

        <div className="framework-timeline">
          {block.steps.map((step: any, sIdx: number) => (
            <div key={sIdx} className="framework-step-card">
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'rgba(138, 75, 243, 0.25)', fontFamily: 'var(--font-title)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>0{sIdx + 1}</span>
                <div style={{ width: '40px', height: '1px', background: 'rgba(138, 75, 243, 0.4)' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'white' }}>{step.title.split(': ')[1] || step.title}</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: '1.4' }}>
                <strong style={{ color: 'var(--accent)' }}>Focus:</strong> {step.focus}
              </p>
              <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
                {(Array.isArray(step.deliverables) ? step.deliverables : (typeof step.deliverables === 'string' ? step.deliverables.split('\n').map((d: string) => d.trim()).filter(Boolean) : [])).map((d: string, dIdx: number) => (
                  <li key={dIdx} style={{ fontSize: '0.8rem', color: 'var(--text-gray)', marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start', lineHeight: '1.3' }}>
                    <span style={{ color: 'var(--accent)' }}>•</span> {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const renderDeepDiveBlock = (block: any, idx: number) => {
    return (
      <section key={idx} id="block-deepDive" className="section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.75rem', textTransform: 'none', fontFamily: 'var(--font-title)' }}>
            Core Services <span style={{ color: 'var(--accent)' }}>Deep Dive</span>
          </h2>
          <p style={{ color: 'var(--text-gray)', fontSize: '1rem' }}>{block.subtitle}</p>
        </div>

        <div className="deep-dive-grid">
          {block.panels.map((panel: any, pIdx: number) => (
            <div key={pIdx} className="deep-dive-panel">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', color: 'var(--accent)' }}>{panel.title}</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{panel.overview}</p>
              
              <ul className="deep-dive-bullets" style={{ margin: 0, paddingLeft: 0 }}>
                {(Array.isArray(panel.focusAreas) ? panel.focusAreas : (typeof panel.focusAreas === 'string' ? panel.focusAreas.split('\n').map((fa: string) => fa.trim()).filter(Boolean) : [])).map((fa: string, faIdx: number) => (
                  <li key={faIdx} style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.6rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start', lineHeight: '1.4' }}>
                    <span style={{ color: 'var(--accent)' }}>✓</span> {fa}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const renderUseCaseBlock = (block: any, idx: number) => {
    // Dynamically map CMS usecase fields to frontend layout fields
    const clientContext = block.clientContext || block.description || ''
    
    let problem = block.problem || ''
    let solution = block.solution || ''
    if (!problem && block.insightSummary) {
      const parts = block.insightSummary.split('\n\n')
      const probPart = parts.find((p: string) => p.startsWith('Problem:'))
      const solPart = parts.find((p: string) => p.startsWith('Solution:'))
      problem = probPart ? probPart.replace('Problem:', '').trim() : ''
      solution = solPart ? solPart.replace('Solution:', '').trim() : (parts.length > 1 ? parts[1] : block.insightSummary)
    }

    const rawResults = block.resultsList || (block.metrics ? block.metrics.map((m: any) => `${m.value} ${m.label}`) : [])
    const resultsList = Array.isArray(rawResults) ? rawResults : (typeof rawResults === 'string' ? rawResults.split('\n').map((r: string) => r.trim()).filter(Boolean) : [])

    return (
      <section key={idx} id="block-useCase" className="section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3.5rem', textTransform: 'none', fontFamily: 'var(--font-title)', textAlign: 'center' }}>
          Featured <span style={{ color: 'var(--accent)' }}>Use Case</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', width: '100%', maxWidth: '1200px', alignItems: 'start' }}>
          <div className="glass-panel" style={{ padding: '3rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>{block.badge}</span>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'white' }}>{block.title}</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <strong style={{ color: 'var(--accent)', fontSize: '0.9rem', display: 'block', marginBottom: '0.25rem' }}>Client Context:</strong>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>{clientContext}</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <strong style={{ color: 'var(--accent)', fontSize: '0.9rem', display: 'block', marginBottom: '0.25rem' }}>Problem:</strong>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>{problem}</p>
            </div>

            <div>
              <strong style={{ color: 'var(--accent)', fontSize: '0.9rem', display: 'block', marginBottom: '0.25rem' }}>Solution:</strong>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>{solution}</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '2.5rem', border: '1px solid rgba(138, 75, 243, 0.2)' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'white' }}>Results & Achievements</h4>
              <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
                {resultsList.map((res: string, rIdx: number) => {
                  const match = res.match(/^(\d+%|\w+)\s+(.*)$/)
                  const numVal = match ? parseFloat(match[1]) : 0
                  const hasNum = !isNaN(numVal) && numVal > 0
                  const label = match ? match[2] : res

                  return (
                    <li key={rIdx} style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--text-gray)', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: '1.4' }}>
                      {hasNum ? (
                        <div className="count-up-trigger" data-target={numVal} data-percent={res.includes('%')} style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-title)', minWidth: '60px' }}>0</div>
                      ) : (
                        <CheckCircle size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      )}
                      <div>{label}</div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <button className="btn-solid" style={{ alignSelf: 'stretch', justifyContent: 'center' }} onClick={() => scrollToSection(4)}>
              {block.ctaText || block.insightLink || 'Read Full Use Case'}
            </button>
          </div>
        </div>
      </section>
    )
  }


  // Trigger Modal
  const openInfoModal = (type: string, title: string) => {
    setModalType(type)
    setModalTitle(title)
    setModalOpen(true)
  }

  // Contact Submit — sends directly to CMS backend API
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactSubmitting(true)
    setContactError('')

    try {
      const res = await fetch('http://127.0.0.1:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: contactName, email: contactEmail, message: contactMsg }),
      })

      if (res.ok) {
        setContactSubmitted(true)
        setShowConfirmationPopup(true)
        setContactName('')
        setContactEmail('')
        setContactMsg('')
      } else {
        const data = await res.json()
        setContactError(data.error || 'Failed to send. Please try again.')
      }
    } catch {
      setContactError('Could not reach the server. Please try again.')
    } finally {
      setContactSubmitting(false)
    }
  }

  const menuItems = ['Home', 'Pillars', 'Briefing', 'About Us', 'Contact']

  return (
    <div style={{ position: 'relative' }} ref={rootRef} className={slug === 'home' ? 'horizontal-layout' : 'vertical-layout'}>
      {/* Background elements */}
      <div className="parallax-bg" />
      <div className="parallax-grid" />
      <div className="particles-bg" />

      {/* Floating Header */}
      <header className={`floating-header ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="header-logo" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>
          <img src="/media/LYCOS-CORE-lOGOTYPE-300x100.png" alt="Lycos Core Logo" style={{ height: '4.5rem', display: 'block' }} />
        </a>
        <nav className="header-nav">
          <ul>
            {menuItems.map((label, idx) => {
              // Hide 'Contact' from nav links — kept only for scroll dot sync
              if (label === 'Contact') return null;

              if (label === 'Pillars') {
                return (
                  <li key={idx} className="nav-dropdown-container">
                    <a
                      href="#"
                      className={slug === 'home' && activeSection === idx ? 'active' : ''}
                      onClick={(e) => { e.preventDefault(); scrollToSection(idx); }}
                    >
                      {label}
                    </a>
                    <ul className="nav-dropdown-menu">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('ai-consulting'); }}>Digital Consulting</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('tech-services'); }}>Tech Services</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('incubation-hub'); }}>Incubation Hub</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('ai-products'); }}>AI Products</a></li>
                    </ul>
                  </li>
                )
              }

              if (label === 'Briefing') {
                return (
                  <li key={idx} className="nav-dropdown-container">
                    <a
                      href="#"
                      className={slug === 'home' && activeSection === idx ? 'active' : ''}
                      onClick={(e) => { e.preventDefault(); scrollToSection(idx); }}
                    >
                      {label}
                    </a>
                    <ul className="nav-dropdown-menu">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('insights'); }}>Insights</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('case-studies'); }}>Case Studies</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('articles'); }}>Articles</a></li>
                    </ul>
                  </li>
                )
              }

              if (label === 'About Us') {
                return (
                  <li key={idx} className="nav-dropdown-container">
                    <a
                      href="#"
                      className={slug === 'home' && activeSection === idx ? 'active' : ''}
                      onClick={(e) => { e.preventDefault(); scrollToSection(idx); }}
                    >
                      {label}
                    </a>
                    <ul className="nav-dropdown-menu">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('who-we-are'); }}>Who We Are</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('how-we-operate'); }}>How We Operate</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('governance-security'); }}>Governance &amp; Security</a></li>
                    </ul>
                  </li>
                )
              }

              return (
                <li key={idx}>
                  <a
                    href="#"
                    className={slug === 'home' && activeSection === idx ? 'active' : ''}
                    onClick={(e) => { e.preventDefault(); scrollToSection(idx); }}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <button className="btn-solid" style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem' }} onClick={() => scrollToSection(4)}>
          Contact Us
        </button>
      </header>

      {slug === 'home' ? (
        /* Horizontal Sections Wrapper (Home Page) */
        <div key="home-wrapper" className="scroll-wrapper" ref={containerRef}>
          
          {/* Section 1: Hero */}
          <section className="section">
            <div className="hero-grid">
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--accent)', fontWeight: 700, display: 'block', marginBottom: '1rem' }}>
                  {pageData.hero.tagline}
                </span>
                <h1 style={{ fontSize: '3.6rem', lineHeight: '1.15', marginBottom: '1.5rem', fontFamily: 'var(--font-title)' }}>
                  Strategic Intelligence.<br />
                  <span style={{ opacity: 0.5 }}>Accelerated Core Building.</span><br />
                  Built for the Future.
                </h1>
                <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: '1.6' }}>
                  Re-engineered for a secure, headless architecture. Strategic AI velocity powered by modern APIs and lightweight scroll experiences.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <button className="btn-solid" onClick={() => scrollToSection(1)}>
                    {pageData.hero.exploreBtnText} <ArrowRight size={18} />
                  </button>
                  <button className="btn-outline" onClick={() => scrollToSection(4)}>
                    {pageData.hero.partnerBtnText}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <canvas id="network-canvas" width="500" height="500" style={{ width: '100%', maxWidth: '550px', overflow: 'visible' }} />
              </div>
            </div>
          </section>

          {/* Section 2: Pillars */}
          <section className="section" style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '2.8rem', textTransform: 'none', fontFamily: 'var(--font-title)', margin: 0 }}>
                {pageData.pillars.title.split(' ')[0]} <span style={{ color: 'var(--accent)' }}>{pageData.pillars.title.split(' ').slice(1).join(' ')}</span>
              </h2>
              <div className="pillars-grid" style={{ width: '100%' }}>
                {pageData.pillars.items.map((item: any, idx: number) => (
                  <div key={idx} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', padding: '1.75rem', position: 'relative' }}>
                    <div>
                      <div style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
                        {idx === 0 && <Cpu size={28} />}
                        {idx === 1 && <Layers size={28} />}
                        {idx === 2 && <Activity size={28} />}
                        {idx === 3 && <TrendingUp size={28} />}
                      </div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                      <p style={{ color: 'var(--text-gray)', fontSize: '0.88rem', lineHeight: '1.5' }}>{item.description}</p>
                    </div>
                    <button 
                      className="btn-link" 
                      onClick={() => {
                        if (idx === 0) navigateTo('ai-consulting');
                        else if (idx === 1) navigateTo('tech-services');
                        else if (idx === 2) navigateTo('incubation-hub');
                        else if (idx === 3) navigateTo('ai-products');
                      }} 
                      style={{ marginTop: '1.25rem', fontSize: '0.95rem' }}
                    >
                      Learn more <ChevronRight size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="lycos-chart-box" style={{ padding: '1.5rem', marginTop: '0' }}>
                <div className="chart-header" style={{ marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 600 }}>Operational Efficiency Trend</span>
                  <span style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>+40% Average Gain</span>
                </div>
                <div className="chart-wrapper">
                  <svg viewBox="0 0 500 80" preserveAspectRatio="none" className="line-chart">
                    <defs>
                      <linearGradient id="pillars-chart-glow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                      </linearGradient>
                      <clipPath id="pillars-clip">
                        <rect x="0" y="0" width="0" height="80" ref={pillarsClipRectRef} />
                      </clipPath>
                    </defs>
                    <path d="M0,70 C50,45 100,55 150,30 C200,5 250,25 300,15 C350,5 400,2 500,2 L500,80 L0,80 Z" 
                          fill="url(#pillars-chart-glow)" 
                          clipPath="url(#pillars-clip)" />
                    <path d="M0,70 C50,45 100,55 150,30 C200,5 250,25 300,15 C350,5 400,2 500,2" 
                          fill="none" 
                          stroke="var(--accent)" 
                          strokeWidth="2.5" 
                          className="chart-glow-path"
                          clipPath="url(#pillars-clip)" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Use Case */}
          <section className="section">
            <div className="use-case-grid">
              <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative' }}>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-secondary)', fontWeight: 700, display: 'block', marginBottom: '1rem' }}>
                  {pageData.useCase.badge}
                </span>
                <h2 style={{ fontSize: '2.2rem', marginBottom: '1.25rem', lineHeight: '1.2' }}>
                  {pageData.useCase.title}
                </h2>
                <p style={{ color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '2rem', fontSize: '1rem' }}>
                  {pageData.useCase.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                  {pageData.useCase.metrics.map((m: any, idx: number) => (
                    <div key={idx}>
                      <div style={{ fontSize: '2.2rem', fontWeight: 800, color: idx === 0 ? 'var(--accent)' : 'var(--text-primary)', fontFamily: 'var(--font-title)' }}>
                        {displayedUseCaseMetrics[idx] || m.value}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-gray)', marginTop: '0.25rem' }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ paddingLeft: '2rem', borderLeft: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-gray)', fontWeight: 700, display: 'block', marginBottom: '0.75rem' }}>
                  FEATURED INSIGHT
                </span>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 600, lineHeight: '1.3', marginBottom: '1.25rem' }}>
                  {insightsData[0]?.title || pageData.useCase.insightTitle}
                </h3>
                <p style={{ color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '2rem', fontSize: '0.95rem' }}>
                  {insightsData[0]?.summary || pageData.useCase.insightSummary}
                </p>
                {insightsData[0] ? (
                  <button className="btn-link" onClick={() => setActiveHomeInsight(insightsData[0])}>
                    {pageData.useCase.insightLink} <ArrowRight size={14} />
                  </button>
                ) : (
                  <button className="btn-link" onClick={() => openInfoModal('insight', pageData.useCase.insightTitle)}>
                    {pageData.useCase.insightLink} <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Section 4: About Us */}
          <section className="section">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', width: '100%', maxWidth: '1200px', alignItems: 'start' }}>

              {/* Left — How We Operate Overview */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>How We Work</span>
                  <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-title)', margin: '0.5rem 0 1rem', lineHeight: 1.2 }}>
                    Structured Delivery.<br /><span style={{ color: 'var(--accent)' }}>Measurable Outcomes.</span>
                  </h2>
                  <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: 1.75, margin: 0 }}>
                    Every Lycos Core engagement follows a disciplined four-phase model — Discovery, Architecture, Build, and Optimisation. Clients see working outputs at every stage. No black boxes. No vague timelines.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { num: '01', label: 'Discovery & Diagnostic', desc: 'Stakeholder interviews, system audits, and data maturity assessment — before any code is written.' },
                    { num: '02', label: 'Architecture & Roadmap', desc: 'A concrete technical plan with defined milestones, KPIs, and risk controls.' },
                    { num: '03', label: 'Build & Integration', desc: 'Sprint-based delivery with weekly demos. Zero disruption to your current operations.' },
                    { num: '04', label: 'Optimise & Sustain', desc: 'Managed production deployment, 90-day optimisation cycle, and a dedicated success manager.' },
                  ].map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ minWidth: '36px', height: '36px', borderRadius: '50%', background: 'rgba(163,255,51,0.08)', border: '1px solid rgba(163,255,51,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', flexShrink: 0 }}>
                        {step.num}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'white', marginBottom: '0.2rem' }}>{step.label}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-gray)', lineHeight: 1.55 }}>{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', display: 'flex', gap: '2rem' }}>
                  {[
                    { val: '40+', label: 'Years combined experience' },
                    { val: '12+', label: 'Enterprise institutions served' },
                    { val: '90', label: 'Day avg. time to first outcome' },
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-title)', lineHeight: 1 }}>{stat.val}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)', marginTop: '0.25rem', lineHeight: 1.4 }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — stacked performance panels */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Top: Internal Hub Metrics */}
                <div className="glass-panel" style={{ padding: '1.75rem' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem', color: 'var(--text-primary)' }}>
                    {pageData.performance.title}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
                    {pageData.performance.metrics.map((m: any, idx: number) => (
                      <div key={idx} style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', padding: '0.85rem', borderRadius: '8px' }}>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-gray)', marginBottom: '0.2rem' }}>{m.label}</div>
                        <div style={{ fontSize: '1.35rem', fontWeight: 700, color: idx === 1 ? 'var(--accent)' : 'var(--text-primary)', fontFamily: 'var(--font-title)' }}>
                          {displayedPerformanceMetrics[idx] || m.value}
                        </div>
                        <div style={{ fontSize: '0.62rem', color: 'var(--accent)', marginTop: '0.2rem' }}>{m.change}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.68rem', color: 'var(--text-gray)', marginTop: '1rem' }}>
                    <Info size={11} /> Live metrics synced from internal operations dataset.
                  </div>
                </div>

                {/* Bottom: AI Solution Trends chart */}
                <div className="glass-panel" style={{ padding: '1.75rem' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>AI Solution Trends</h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-gray)', marginBottom: '1rem' }}>Operations Score Improvement / Yield Curve</div>

                  <div style={{ width: '100%', height: '100px', position: 'relative' }}>
                    <svg viewBox="0 0 500 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                        </linearGradient>
                        <clipPath id="performance-clip">
                          <rect x="0" y="0" width="0" height="100" ref={performanceClipRectRef} />
                        </clipPath>
                      </defs>
                      <path d="M0,80 Q75,60 150,80 T300,35 T450,15 L450,100 L0,100 Z" fill="url(#chart-glow)" clipPath="url(#performance-clip)" />
                      <path d="M0,80 Q75,60 150,80 T300,35 T450,15" fill="none" stroke="var(--accent)" strokeWidth="2.5" className="chart-glow-path" clipPath="url(#performance-clip)" />
                      <circle cx="450" cy="15" r="4" fill="var(--accent)" />
                    </svg>
                    <div style={{ position: 'absolute', right: '0', top: '-12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '3px 7px', borderRadius: '4px', fontSize: '0.68rem' }}>
                      Efficiency Gains <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{displayedEfficiencyGain}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-gray)', fontSize: '0.65rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.65rem', marginTop: '0.5rem' }}>
                    <span>Month 1</span><span>Month 2</span><span>Month 3</span><span>Month 4</span><span>Month 5</span><span>Month 6</span>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Section 5: Calculator & Contact */}
          <section className="section">
            <div className="contact-grid">
              {/* Left panel: World Map */}
              <WorldMap />

              {/* Right panel: Contact Form */}
              <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                    Partner With Us
                  </h3>

                  {contactSubmitted ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'var(--accent)', padding: '2rem 0' }}>
                      <CheckCircle size={48} />
                      <h4 style={{ color: 'white' }}>Submission Received</h4>
                      <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', textAlign: 'center' }}>Thank you. One of our operational leads will contact you shortly.</p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-gray)', display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
                        <input type="text" required value={contactName} onChange={(e) => setContactName(e.target.value)} style={{ width: '100%', padding: '0.65rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-gray)', display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
                        <input type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} style={{ width: '100%', padding: '0.65rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-gray)', display: 'block', marginBottom: '0.5rem' }}>Brief Description of operational bottlenecks</label>
                        <textarea required value={contactMsg} onChange={(e) => setContactMsg(e.target.value)} style={{ width: '100%', padding: '0.65rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px', resize: 'none', minHeight: '100px' }} />
                      </div>
                      {contactError && <p style={{ color: '#f87171', fontSize: '0.85rem', margin: 0 }}>{contactError}</p>}
                    </>
                  )}
                </div>

                {/* Submit pinned to bottom — aligns with Calculate/Reset row */}
                {!contactSubmitted && (
                  <button type="button" className="btn-solid" disabled={contactSubmitting} onClick={handleContactSubmit as any} style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                    {contactSubmitting ? 'Sending...' : 'Submit Inquiry'}
                  </button>
                )}
              </div>

            </div>
          </section>

        </div>
      ) : (
        /* Vertical Sections Wrapper (Subpages) */
        <div key="subpage-wrapper" className="vertical-scroll-wrapper" ref={containerRef}>
          {slug === 'tech-services' && (
            <section className="section">
              <TechServicesSection />
            </section>
          )}
          {slug === 'incubation-hub' && (
            <section className="section">
              <IncubationHubSection />
            </section>
          )}
          {slug === 'ai-products' && (
            <section className="section">
              <AIProductsSection />
            </section>
          )}
          {slug === 'insights' && (
            <section className="section">
              <InsightsSection insightsList={insightsData} />
            </section>
          )}
          {slug === 'articles' && (
            <section className="section">
              <ArticlesSection articlesList={articlesData} />
            </section>
          )}
          {slug === 'case-studies' && (
            <section className="section">
              <CaseStudiesSection caseStudiesList={caseStudiesData} />
            </section>
          )}
          {slug === 'who-we-are' && (
            <section className="section"><WhoWeAreSection /></section>
          )}
          {slug === 'how-we-operate' && (
            <section className="section"><HowWeOperateSection /></section>
          )}
          {slug === 'governance-security' && (
            <section className="section"><GovernanceSection /></section>
          )}
          {slug !== 'insights' && slug !== 'articles' && slug !== 'case-studies' && slug !== 'tech-services' && slug !== 'incubation-hub' && slug !== 'ai-products' && slug !== 'who-we-are' && slug !== 'how-we-operate' && slug !== 'governance-security' && pageData.layout ? pageData.layout.map((block: any, idx: number) => {
            if (block.blockType === 'hero') return renderHeroBlock(block, idx)
            if (block.blockType === 'pillars') return renderPillarsBlock(block, idx)
            if (block.blockType === 'framework') return renderFrameworkBlock(block, idx)
            if (block.blockType === 'deepDive') return renderDeepDiveBlock(block, idx)
            if (block.blockType === 'useCase') return renderUseCaseBlock(block, idx)
            return null
          }) : null}

          {/* Contact Section at bottom of subpage — only for Digital Consulting and similar content pages */}
          {(slug === 'ai-consulting') && (
            <section id="block-contact" className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', width: '100%', maxWidth: '1200px', alignItems: 'center' }}>
                <div className="glass-panel" style={{ padding: '2.5rem', border: '1px solid rgba(138, 75, 243, 0.2)' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                    Partner With Us
                  </h3>
                  
                  {contactSubmitted ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, gap: '1rem', color: 'var(--accent)' }}>
                      <CheckCircle size={48} />
                      <h4 style={{ color: 'white' }}>Submission Received</h4>
                      <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', textAlign: 'center' }}>Thank you. One of our operational leads will contact you shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-gray)', display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
                        <input 
                          type="text" 
                          required 
                          value={contactName} 
                          onChange={(e) => setContactName(e.target.value)} 
                          style={{ width: '100%', padding: '0.65rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px' }} 
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-gray)', display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
                        <input 
                          type="email" 
                          required 
                          value={contactEmail} 
                          onChange={(e) => setContactEmail(e.target.value)} 
                          style={{ width: '100%', padding: '0.65rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px' }} 
                        />
                      </div>

                      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-gray)', display: 'block', marginBottom: '0.5rem' }}>Brief Description of operational bottlenecks</label>
                        <textarea 
                          required 
                          value={contactMsg} 
                          onChange={(e) => setContactMsg(e.target.value)} 
                          style={{ width: '100%', padding: '0.65rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px', resize: 'none', flexGrow: 1, minHeight: '80px' }} 
                        />
                      </div>

                      {contactError && (
                        <p style={{ color: '#f87171', fontSize: '0.85rem', margin: 0 }}>{contactError}</p>
                      )}

                      <button type="submit" className="btn-solid" disabled={contactSubmitting} style={{ width: '100%', justifyContent: 'center' }}>
                        {contactSubmitting ? 'Sending...' : 'Submit Inquiry'}
                      </button>
                    </form>
                  )}
                </div>

                <div style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <h3 style={{ fontSize: '2.5rem', color: 'white', fontFamily: 'var(--font-title)' }}>Ready to transform?</h3>
                  <p style={{ color: 'var(--text-gray)', lineHeight: '1.6', fontSize: '1.1rem' }}>
                    Speak directly with our strategy leads. We help parse complex enterprise operational challenges, define quantitative viability vectors, and draft pilot roadmaps.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      )}

      {/* Navigation Indicators (Home page only) */}
      {slug === 'home' && (
        <div className="scroll-indicator">
          {menuItems.map((_, dot) => (
            <div 
              key={dot} 
              className={`scroll-dot ${activeSection === dot ? 'active' : ''}`} 
              onClick={() => scrollToSection(dot)}
            />
          ))}
        </div>
      )}

      {/* Info Modal */}
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(5, 13, 26, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="glass-panel" style={{ width: '90%', maxWidth: '600px', backgroundColor: 'var(--bg-secondary)' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', color: 'var(--accent)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>{modalTitle}</h3>
            
            <div style={{ color: 'var(--text-gray)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              {modalType === 'ai' && (
                <div>
                  <p style={{ marginBottom: '1rem' }}>Our central AI engine coordinates data classification, risk modeling, and natural language routing pipelines across standard REST endpoints.</p>
                  <p>In the headless setup, this coordinates dynamic queries via JSON API schemas, resolving complex data dependencies instantaneously without server-side rendering latency.</p>
                </div>
              )}
              {modalType === 'pillar' && (
                <div>
                  <p style={{ marginBottom: '1rem' }}>This core operational pillar is fully represented in the Payload CMS backend.</p>
                  <p>Content managers can dynamically edit descriptions, add custom metrics, or link case studies, reflecting instantly on the horizontal-scroll React interface without codebase deployments.</p>
                </div>
              )}
              {modalType === 'insight' && (
                <div>
                  <p style={{ marginBottom: '1rem' }}>Generative data pipelines demand extreme regulatory and security validation structures.</p>
                  <p>This matured insight studies model feedback vectors and how structured collections can secure user data contexts while accelerating validation runtimes.</p>
                </div>
              )}
            </div>

            <button className="btn-solid" onClick={() => setModalOpen(false)}>
              Close Overview
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Transmitted Popup Modal */}
      {showConfirmationPopup && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(5, 13, 26, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="glass-panel" style={{ width: '90%', maxWidth: '400px', backgroundColor: 'var(--bg-secondary)', textAlign: 'center', padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--accent)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--accent)', marginBottom: '1rem' }}>
              <CheckCircle size={48} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>Inquiry Transmitted</h3>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Your inquiry has been successfully received by <strong style={{ color: 'white' }}>The Lycos Core Team</strong>. We will be in touch shortly.
            </p>
            <button className="btn-solid" onClick={() => setShowConfirmationPopup(false)}>
              Acknowledge
            </button>
          </div>
        </div>
      )}

      {/* Homepage Dynamic Featured Insight Details Modal */}
      {activeHomeInsight && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(5, 13, 26, 0.92)',
          backdropFilter: 'blur(12px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          overflowY: 'auto',
          padding: '4rem 1.5rem'
        }}>
          <div className="glass-panel" style={{
            width: '100%',
            maxWidth: '850px',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid rgba(163, 255, 51, 0.15)',
            padding: '3.5rem',
            borderRadius: '16px',
            position: 'relative',
            height: 'fit-content'
          }}>
            <button
              onClick={() => setActiveHomeInsight(null)}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(163, 255, 51, 0.15)';
                e.currentTarget.style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--text-gray)', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{activeHomeInsight.category}</span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {activeHomeInsight.readTime} min read</span>
              <span>•</span>
              <span>Published: {activeHomeInsight.publishedDate}</span>
            </div>

            <h1 style={{
              fontSize: '2.5rem',
              lineHeight: '1.2',
              color: 'white',
              fontFamily: 'var(--font-title)',
              marginBottom: '2rem'
            }}>
              {activeHomeInsight.title}
            </h1>

            {activeHomeInsight.author && (
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.01)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                marginBottom: '2.5rem'
              }}>
                <img
                  src={activeHomeInsight.author.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop'}
                  alt={activeHomeInsight.author.name}
                  referrerPolicy="no-referrer"
                  style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--accent)' }}
                />
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'white', margin: '0 0 0.25rem 0' }}>
                    {activeHomeInsight.author.name}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--accent)', margin: '0 0 0.5rem 0', fontWeight: 500 }}>
                    {activeHomeInsight.author.role}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', margin: 0, lineHeight: '1.4' }}>
                    {activeHomeInsight.author.bio}
                  </p>
                </div>
              </div>
            )}

            <div className="markdown-body" style={{
              color: 'var(--text-gray)',
              lineHeight: '1.75',
              fontSize: '1.05rem',
            }} dangerouslySetInnerHTML={{ __html: activeHomeInsight.content }} />

            <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-outline" onClick={() => setActiveHomeInsight(null)}>
                Close Advisory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

```

