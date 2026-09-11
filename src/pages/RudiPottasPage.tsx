import React, { useState } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  Layers, 
  Bot, 
  Compass, 
  CheckCircle, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  ChevronRight, 
  GraduationCap, 
  Globe, 
  Calendar,
  Building2,
  Workflow,
  Target,
  Cpu
} from 'lucide-react';
import { submitContactForm } from '../services/contactService';
import rudiPhoto from '../assets/rudi-pottas.jpg';

export default function RudiPottasPage() {
  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMsg.trim()) return;

    setContactLoading(true);
    setContactError(null);

    const messageBody = contactSubject.trim() 
      ? `[Subject: ${contactSubject.trim()}]\n\n${contactMsg.trim()}`
      : contactMsg.trim();

    const res = await submitContactForm({
      name: contactName.trim(),
      email: contactEmail.trim(),
      message: messageBody,
      serviceContext: 'Rudi Pottas Portfolio Direct Contact (rudi@lycoscore.com)'
    });

    setContactLoading(false);
    if (res.success) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactName('');
        setContactEmail('');
        setContactSubject('');
        setContactMsg('');
      }, 6000);
    } else {
      setContactError(res.error || 'Failed to transmit message. Please contact rudi@lycoscore.com directly.');
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const telemetryStats = [
    {
      value: '15+',
      label: 'Years Leadership',
      sub: 'AI Strategy & Enterprise Delivery',
      highlight: true
    },
    {
      value: 'Principal',
      label: 'Architecture Lead',
      sub: 'Neural Systems & Cognitive Calibration',
      highlight: false
    },
    {
      value: 'Tier-1',
      label: 'Enterprise Portfolios',
      sub: 'The King James Group, FCB Global, Ericsson',
      highlight: false
    },
    {
      value: '100%',
      label: 'Delivery Precision',
      sub: 'Autonomous Workflows & Scaled Systems',
      highlight: true
    }
  ];

  const competencies = [
    {
      category: 'ai',
      icon: <Bot size={26} className="neon-icon" />,
      tag: '01 // AI STRATEGY & ARCHITECTURE',
      title: 'Artificial Intelligence Strategy & Architecture',
      description: 'Translating complex enterprise challenges into bespoke software engines, autonomous agentic workflows, and high-yield cognitive infrastructures.',
      skills: [
        'AI Strategy & Architecture',
        'Cognitive Calibration',
        'Workflow Optimization',
        'Autonomous Agents & LLMs',
        'Responsible AI Governance'
      ]
    },
    {
      category: 'strategy',
      icon: <Compass size={26} className="neon-icon" />,
      tag: '02 // STRATEGIC PLANNING & ANALYSIS',
      title: 'Strategic Planning & Business Analysis',
      description: 'Bridging commercial vision and technical execution through data-driven business modeling, unit economic analysis, risk assessment, and go-to-market strategies.',
      skills: [
        'Enterprise Venture Incubation',
        'Bespoke Product Management',
        'Commercial Business Cases',
        'Operational Bottleneck Audits',
        'Market Positioning & Messaging'
      ]
    },
    {
      category: 'operations',
      icon: <Workflow size={26} className="neon-icon" />,
      tag: '03 // DELIVERY & OPERATIONS LEADERSHIP',
      title: 'Technical Operations & Delivery Governance',
      description: 'Governing multi-tiered project lifecycles, enterprise budgets, cross-functional sprints, and complex vendor ecosystems with rigorous Agile/Waterfall discipline.',
      skills: [
        'Production Pipeline Optimization',
        'Agile & Waterfall Delivery',
        'Resource & Capacity Planning',
        'Cross-Functional Team Leadership',
        'Vendor & Scope Management'
      ]
    },
    {
      category: 'strategy',
      icon: <Target size={26} className="neon-icon" />,
      tag: '04 // COMMERCIAL MARKETING & STAKEHOLDERS',
      title: 'Integrated Strategy & Client Governance',
      description: 'Directing high-stakes integrated campaigns, aligning C-suite stakeholders, managing global brand governance, and optimizing conversion funnels.',
      skills: [
        'Executive & C-Suite Reporting',
        'Digital & Integrated Strategy',
        'Global Compliance Governance',
        'Cross-Department Alignment',
        'Campaign Telemetry & Analytics'
      ]
    }
  ];

  const toolsList = [
    { name: 'Generative AI & LLMs', type: 'Neural & Agentic Systems' },
    { name: 'Jira & Confluence', type: 'Agile Governance' },
    { name: 'Monday.com & Asana', type: 'Workflow Tracking' },
    { name: 'Figma', type: 'Product Design & UI/UX' },
    { name: 'WordPress', type: 'CMS & Web Deployments' },
    { name: 'Google Workspace & MS 365', type: 'Enterprise Operations' },
    { name: 'Trello & Slack', type: 'Team Coordination' },
    { name: 'Analytics & BI Platforms', type: 'Telemetry & Reporting' }
  ];

  const careerHistory = [
    {
      period: 'JUN 2026 – PRESENT',
      role: 'Founder & Principal Architect',
      company: 'Lycos Core · Full-time',
      location: 'South Africa',
      type: 'AI Technology Consulting, Product Studio & Venture Incubator',
      badge: 'CURRENT ROLE',
      summary: 'Spearhead the strategic vision, technical design, and operational execution of Lycos Core—an AI technology consulting firm, product studio, and venture incubator. Function as a Neural Architect and Cognitive Calibrator, translating complex enterprise challenges into bespoke software engines and autonomous workflows. Oversee the development of specialized AI platforms, establish robust governance frameworks, and partner with leadership teams to transition traditional operational architectures into high-yield, AI-driven capabilities.',
      skills: [
        'Artificial Intelligence Strategy & Architecture',
        'Cognitive Calibration & Workflow Optimization',
        'Enterprise Venture Incubation',
        'Bespoke Software Product Management',
        'Responsible AI Governance & Compliance'
      ],
      tags: ['AI Strategy', 'Neural Architect', 'Cognitive Calibration', 'Venture Incubation', 'Product Studio']
    },
    {
      period: 'JUN 2018 – NOV 2023 · 5 YRS 6 MOS',
      role: 'Senior Project Manager',
      company: 'The King James Group · Full-time',
      location: 'Cape Town, Western Cape, South Africa',
      type: 'Tier-1 Advertising & Digital Transformation Network',
      badge: 'ENTERPRISE PORTFOLIOS',
      summary: 'Led end-to-end delivery of high-stakes digital, brand, and integrated marketing campaigns for major enterprise client portfolios. Direct cross-functional teams spanning creative, technical, and strategy departments to ensure precision execution on complex scopes. Standardized agency operations, optimized production pipelines, and managed large-scale project budgets, maintaining rigorous quality control and delivery alignment with client business objectives.',
      skills: [
        'Digital & Integrated Strategy Execution',
        'Enterprise Program & Scope Management',
        'Cross-Functional Team Leadership',
        'Production Pipeline Optimization',
        'Client Stakeholder Management'
      ],
      tags: ['Enterprise Portfolios', 'Digital Strategy', 'Production Pipelines', 'Stakeholder Management', 'Budget Governance']
    },
    {
      period: 'JUN 2015 – APR 2018 · 2 YRS 11 MOS',
      role: 'Technical Project / Operations Manager',
      company: 'FCB Global',
      location: 'Sandton, Gauteng, South Africa',
      type: 'Global Brand & Digital Production Network',
      badge: 'TECHNICAL OPERATIONS',
      summary: 'Managed technical operations and digital production frameworks, bridging creative strategy with technical delivery. Oversee digital campaign builds, system integrations, and operational resourcing to meet aggressive performance metrics. Streamlined agency workflows, implemented project management governance, and ensured seamless collaboration between technical development teams and brand strategists.',
      skills: [
        'Technical Operations Management',
        'Digital Production & Delivery',
        'Operational Process Engineering',
        'Resource & Capacity Planning',
        'Agile & Waterfall Delivery Methodologies'
      ],
      tags: ['Technical Operations', 'Digital Production', 'Process Engineering', 'Capacity Planning', 'Agile/Waterfall']
    },
    {
      period: 'MAY 2010 – MAY 2015 · 5 YRS 1 MO',
      role: 'Unit Production Manager / Project Manager',
      company: 'Ericsson',
      location: 'Johannesburg, Gauteng, South Africa',
      type: 'Global Telecommunications & Infrastructure Leader',
      badge: 'TELECOMMUNICATIONS',
      summary: 'Directed unit-level production schedules, resource allocations, and operational deliverables within a global telecommunications environment. Managed multi-tiered project lifecycles, ensuring strict adherence to global compliance standards, technical specifications, and delivery timelines. Coordinated cross-departmental operations to drive cost efficiencies, risk mitigation, and consistent operational uptime across service deployments.',
      skills: [
        'Telecommunications Operations & Production',
        'Infrastructure Project Management',
        'Resource & Logistics Scheduling',
        'Operational Risk Mitigation',
        'Vendor & Performance Management'
      ],
      tags: ['Telecommunications', 'Infrastructure PM', 'Logistics Scheduling', 'Risk Mitigation', 'Global Compliance']
    }
  ];

  const education = [
    {
      institution: 'University of Cape Town (UCT)',
      degree: 'Advanced Diploma in Project Management',
      year: '2024',
      badge: 'POSTGRADUATE',
      focus: 'Advanced project governance, risk mitigation, strategic stakeholder management, and agile enterprise delivery frameworks.'
    },
    {
      institution: 'CityVarsity',
      degree: 'Diploma in Multimedia Design & Production',
      year: '2007',
      badge: 'MULTIMEDIA & DESIGN',
      focus: 'Digital production, interactive media design, visual communication, creative technology integration, and interface architecture.'
    }
  ];

  return (
    <div id="subpage-wrapper" className="vertical-scroll-wrapper rudi-portfolio-page">
      {/* SECTION 1: HERO EXECUTIVE PROFILE */}
      <section className="section hero-fullscreen-section rudi-hero-section">
        <div className="rudi-hero-container">
          {/* Left Column: Portrait & Cyber Frame */}
          <div className="rudi-portrait-col">
            <div className="rudi-portrait-wrapper glass-panel">
              <div className="hud-corner hud-tl" />
              <div className="hud-corner hud-tr" />
              <div className="hud-corner hud-bl" />
              <div className="hud-corner hud-br" />
              
              <div className="rudi-image-frame">
                <img 
                  src={rudiPhoto} 
                  alt="Rudi Pottas - Lead AI Architect & Founder" 
                  className="rudi-portrait-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/media/rudi-pottas.jpg';
                  }}
                />
                <div className="rudi-image-overlay" />
                <div className="rudi-status-badge-floating">
                  <span className="live-pulse-dot" />
                  <span>LEAD AI ARCHITECT</span>
                </div>
              </div>

              {/* Quick Contact Chips Under Portrait */}
              <div className="rudi-quick-links-card">
                <a 
                  href="https://www.linkedin.com/in/rudi-pottas-59895192/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="rudi-social-chip linkedin"
                  title="Connect on LinkedIn"
                >
                  <svg className="linkedin-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                  </svg>
                  <span>LinkedIn Profile</span>
                  <ExternalLink size={14} className="chip-arrow" />
                </a>

                <a 
                  href="mailto:rudi@lycoscore.com" 
                  className="rudi-social-chip email"
                  title="Send Direct Email"
                >
                  <Mail size={16} className="neon-icon" />
                  <span>rudi@lycoscore.com</span>
                </a>

                <a 
                  href="tel:+27834176623" 
                  className="rudi-social-chip phone"
                  title="Call Direct"
                >
                  <Phone size={16} className="neon-icon" />
                  <span>+27 83 417 6623</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Executive Narrative & Bio */}
          <div className="rudi-bio-col">
            <div className="eyebrow-tagline-green">
              // EXECUTIVE LEADERSHIP DOSSIER
            </div>

            <h1 className="rudi-hero-name">
              RUDI POTTAS<span className="brand-dot">.</span>
            </h1>

            <div className="rudi-hero-title">
              Lead AI Architect & Founder
              <span className="rudi-title-separator">|</span>
              <span className="text-secondary">Lycos Core</span>
            </div>

            {/* Badges Row */}
            <div className="rudi-badges-row">
              <span className="hero-pill-badge highlight">
                <Globe size={13} className="neon-icon" />
                Location: Remote
              </span>
              <span className="hero-pill-badge">
                <Cpu size={13} className="neon-icon" />
                Neural Architecture
              </span>
              <span className="hero-pill-badge">
                <Sparkles size={13} className="neon-icon" />
                Cognitive Calibration
              </span>
            </div>

            {/* Summary Box */}
            <div className="glass-panel rudi-summary-panel">
              <h3 className="rudi-summary-heading">
                <Briefcase size={18} className="neon-icon" />
                Executive Summary
              </h3>
              <p className="rudi-summary-text">
                Founder & Principal Architect spearheading the strategic vision, technical design, and operational execution of <strong>Lycos Core</strong>—an AI technology consulting firm, product studio, and venture incubator.
              </p>
              <p className="rudi-summary-text">
                Functions as a <strong>Neural Architect and Cognitive Calibrator</strong>, translating complex enterprise challenges into bespoke software engines and autonomous workflows. Combines 15+ years of senior delivery and technical operations pedigree across <strong>The King James Group, FCB Global, and Ericsson</strong> to engineer resilient, high-yield AI capabilities for modern enterprises.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="rudi-hero-actions">
              <button 
                className="cta-primary"
                onClick={() => scrollToSection('rudi-contact-section')}
              >
                INITIATE ENGAGEMENT <ChevronRight size={16} />
              </button>
              
              <button 
                className="btn-outline"
                onClick={() => scrollToSection('rudi-experience-section')}
              >
                VIEW CAREER DOSSIER
              </button>

              <a 
                href="https://www.linkedin.com/in/rudi-pottas-59895192/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-link rudi-linkedin-cta"
              >
                <svg className="linkedin-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                </svg>
                CONNECT ON LINKEDIN
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TELEMETRY & KEY IMPACT METRICS */}
      <section className="section rudi-stats-section">
        <div className="subpage-block-header">
          <div className="eyebrow-tagline-green">// FIELD TELEMETRY</div>
          <h2 className="subpage-block-title">
            Commercial & Delivery <span className="brand-dot">Track Record</span>
          </h2>
          <p className="subpage-block-desc">
            Quantifiable scale and execution pedigree across AI architecture, enterprise delivery, and operational leadership.
          </p>
        </div>

        <div className="rudi-stats-grid">
          {telemetryStats.map((stat, idx) => (
            <div key={idx} className="glass-panel rudi-stat-card baseline-card">
              <div className={`rudi-stat-value ${stat.highlight ? 'accent-highlight' : ''}`}>
                {stat.value}
              </div>
              <div className="rudi-stat-label">{stat.label}</div>
              <div className="rudi-stat-sub">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: CORE COMPETENCIES & SPECIALIZATIONS */}
      <section id="rudi-competencies-section" className="section rudi-competencies-section">
        <div className="subpage-block-header">
          <div className="eyebrow-tagline-green">// STRATEGIC CAPABILITIES</div>
          <h2 className="subpage-block-title">
            Core Competencies & <span className="brand-dot">Specializations</span>
          </h2>
          <p className="subpage-block-desc">
            Synthesizing AI systems architecture with strategic planning, cognitive workflow calibration, and rigorous delivery governance.
          </p>
        </div>

        <div className="rudi-competencies-grid">
          {competencies.map((comp, idx) => (
            <div key={idx} className="glass-panel rudi-competency-card baseline-card">
              <div className="rudi-comp-header">
                <div className="rudi-comp-icon-box">
                  {comp.icon}
                </div>
                <span className="rudi-comp-tag">{comp.tag}</span>
              </div>

              <h3 className="rudi-comp-title">{comp.title}</h3>
              <p className="rudi-comp-desc">{comp.description}</p>

              <div className="rudi-comp-skills-list">
                {comp.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="rudi-skill-pill">
                    <CheckCircle2 size={13} className="neon-icon" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools & Platform Arsenal */}
        <div className="rudi-tools-wrapper glass-panel">
          <div className="rudi-tools-header">
            <h3 className="rudi-tools-title">
              <Layers size={20} className="neon-icon" />
              Platforms, Frameworks & Tooling Stack
            </h3>
            <span className="eyebrow-tagline-green">// OPERATIONAL ARSENAL</span>
          </div>

          <div className="rudi-tools-grid">
            {toolsList.map((tool, tIdx) => (
              <div key={tIdx} className="rudi-tool-item">
                <div className="rudi-tool-name">{tool.name}</div>
                <div className="rudi-tool-type">{tool.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PROFESSIONAL EXPERIENCE / CAREER TRAJECTORY */}
      <section id="rudi-experience-section" className="section rudi-experience-section">
        <div className="subpage-block-header">
          <div className="eyebrow-tagline-green">// CAREER TRAJECTORY</div>
          <h2 className="subpage-block-title">
            Professional <span className="brand-dot">Experience</span>
          </h2>
          <p className="subpage-block-desc">
            15+ years of high-stakes AI architecture, enterprise digital transformations, and technical operations governance.
          </p>
        </div>

        <div className="rudi-timeline">
          {careerHistory.map((item, idx) => (
            <div key={idx} className="rudi-timeline-node glass-panel baseline-card">
              <div className="rudi-timeline-header">
                <div className="rudi-timeline-meta">
                  <span className="rudi-timeline-period">
                    <Calendar size={14} className="neon-icon" />
                    {item.period}
                  </span>
                  <span className="rudi-timeline-location">
                    <MapPin size={14} />
                    {item.location}
                  </span>
                  <span className="rudi-timeline-badge">{item.badge}</span>
                </div>

                <h3 className="rudi-timeline-role">{item.role}</h3>
                <div className="rudi-timeline-company">
                  <Building2 size={16} className="neon-icon" />
                  <span>{item.company}</span>
                  <span className="rudi-company-type">• {item.type}</span>
                </div>
              </div>

              {/* Summary Description */}
              <div className="rudi-timeline-body">
                <p className="rudi-timeline-summary-text">
                  {item.summary}
                </p>

                {/* Skills Section */}
                <div className="rudi-timeline-skills-section">
                  <div className="rudi-timeline-skills-heading">
                    <CheckCircle size={14} className="neon-icon" />
                    <strong>Key Skills & Competencies:</strong>
                  </div>
                  <div className="rudi-timeline-skills-grid">
                    {item.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="rudi-skill-pill">
                        <CheckCircle2 size={12} className="neon-icon" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags Row */}
              <div className="rudi-timeline-tags">
                {item.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="rudi-role-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: EDUCATION & CERTIFICATIONS */}
      <section className="section rudi-education-section">
        <div className="subpage-block-header">
          <div className="eyebrow-tagline-green">// INSTITUTIONAL CREDENTIALS</div>
          <h2 className="subpage-block-title">
            Education & <span className="brand-dot">Qualifications</span>
          </h2>
          <p className="subpage-block-desc">
            Formal foundations in advanced project governance and multimedia design production architecture.
          </p>
        </div>

        <div className="rudi-education-grid">
          {education.map((edu, idx) => (
            <div key={idx} className="glass-panel rudi-edu-card baseline-card">
              <div className="rudi-edu-top">
                <div className="rudi-edu-icon-wrap">
                  <GraduationCap size={28} className="neon-icon" />
                </div>
                <span className="rudi-edu-badge">{edu.badge}</span>
              </div>

              <h3 className="rudi-edu-degree">{edu.degree}</h3>
              <div className="rudi-edu-institution">
                <span>{edu.institution}</span>
                <span className="rudi-edu-year">({edu.year})</span>
              </div>

              <p className="rudi-edu-focus">{edu.focus}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: EXECUTIVE ENGAGEMENT / DIRECT CONTACT */}
      <section id="rudi-contact-section" className="section rudi-contact-section">
        <div className="subpage-block-header">
          <div className="eyebrow-tagline-green">// DIRECT TRANSMISSION</div>
          <h2 className="subpage-block-title">
            Initiate <span className="brand-dot">Engagement</span>
          </h2>
          <p className="subpage-block-desc">
            Explore AI architecture advisory, cognitive workflow systems, bespoke product studio projects, or executive inquiries directly.
          </p>
        </div>

        <div className="rudi-contact-grid contact-grid">
          {/* Left: Contact Info Dossier */}
          <div className="glass-panel rudi-contact-info-panel">
            <h3 className="rudi-contact-info-title">
              Executive Direct Contact
            </h3>
            <p className="rudi-contact-info-desc">
              Available for AI systems architecture, venture incubation, enterprise cognitive calibration, and advisory leadership.
            </p>

            <div className="rudi-direct-channels">
              <a href="mailto:rudi@lycoscore.com" className="rudi-channel-row">
                <div className="rudi-channel-icon">
                  <Mail size={20} className="neon-icon" />
                </div>
                <div className="rudi-channel-content">
                  <span className="rudi-channel-label">DIRECT EMAIL</span>
                  <span className="rudi-channel-value">rudi@lycoscore.com</span>
                </div>
              </a>

              <a href="tel:+27834176623" className="rudi-channel-row">
                <div className="rudi-channel-icon">
                  <Phone size={20} className="neon-icon" />
                </div>
                <div className="rudi-channel-content">
                  <span className="rudi-channel-label">MOBILE TELEMETRY</span>
                  <span className="rudi-channel-value">+27 83 417 6623</span>
                </div>
              </a>

              <a 
                href="https://www.linkedin.com/in/rudi-pottas-59895192/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="rudi-channel-row linkedin-row"
              >
                <div className="rudi-channel-icon linkedin-bg">
                  <svg className="linkedin-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                  </svg>
                </div>
                <div className="rudi-channel-content">
                  <span className="rudi-channel-label">LINKEDIN NETWORK</span>
                  <span className="rudi-channel-value">linkedin.com/in/rudi-pottas-59895192/</span>
                </div>
                <ExternalLink size={16} className="channel-ext-arrow" />
              </a>

              <div className="rudi-channel-row">
                <div className="rudi-channel-icon">
                  <MapPin size={20} className="neon-icon" />
                </div>
                <div className="rudi-channel-content">
                  <span className="rudi-channel-label">LOCATION</span>
                  <span className="rudi-channel-value">Remote</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Direct Transmission Form */}
          <div className="glass-panel rudi-contact-form-panel">
            <h3 className="rudi-form-title">
              Send Direct Message
            </h3>

            {contactSubmitted ? (
              <div className="home-contact-success">
                <CheckCircle size={48} className="neon-icon" />
                <h4 className="home-contact-success-title">Message Transmitted</h4>
                <p className="home-contact-success-text">
                  Thank you for reaching out. Rudi Pottas has received your transmission and will respond promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="rudi-contact-form">
                <div className="home-contact-form-group">
                  <label className="home-contact-label">Your Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={contactName} 
                    onChange={(e) => setContactName(e.target.value)} 
                    placeholder="e.g. Sarah Jenkins"
                    className="home-contact-input"
                  />
                </div>

                <div className="home-contact-form-group">
                  <label className="home-contact-label">Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    value={contactEmail} 
                    onChange={(e) => setContactEmail(e.target.value)} 
                    placeholder="e.g. s.jenkins@enterprise.com"
                    className="home-contact-input"
                  />
                </div>

                <div className="home-contact-form-group">
                  <label className="home-contact-label">Engagement Subject / Scope</label>
                  <input 
                    type="text" 
                    value={contactSubject} 
                    onChange={(e) => setContactSubject(e.target.value)} 
                    placeholder="e.g. AI Strategy / Neural Architecture / Advisory"
                    className="home-contact-input"
                  />
                </div>

                <div className="home-contact-form-group-grow">
                  <label className="home-contact-label">Message Details *</label>
                  <textarea 
                    required 
                    value={contactMsg} 
                    onChange={(e) => setContactMsg(e.target.value)} 
                    placeholder="Provide details regarding your inquiry, organization, or project scope..."
                    className="home-contact-textarea"
                    rows={4}
                  />
                </div>

                {contactError && (
                  <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '0.75rem', fontFamily: 'monospace' }}>
                    {contactError}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn-solid rudi-form-submit-btn" 
                  disabled={contactLoading}
                >
                  {contactLoading ? 'TRANSMITTING MESSAGE...' : 'TRANSMIT DIRECT INQUIRY'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
