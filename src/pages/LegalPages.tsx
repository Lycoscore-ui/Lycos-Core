import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import LinkedInConnect from '../components/LinkedInConnect';

interface LegalSection {
  heading: string;
  body?: string;
  bullets?: { label?: string; text: string }[];
  table?: { headers: string[]; rows: string[][] };
  subsections?: { subhead: string; text: string; subbullets?: string[] }[];
}

interface LegalPageData {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

interface LegalPageProps {
  type: 'terms' | 'privacy' | 'responsible-ai' | 'cookies';
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

export const CookiePolicyPage: React.FC = () => (
  <LegalPageContent type="cookies" />
);

const LegalPageContent: React.FC<LegalPageProps> = ({ type }) => {
  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const contentMap: Record<string, LegalPageData> = {
    cookies: {
      eyebrow: '// Cookie Governance',
      title: 'Cookie Policy',
      lastUpdated: 'September 4, 2026',
      sections: [
        {
          heading: '1. What Are Cookies',
          body: 'Cookies are small text files placed on your computer or mobile device when you visit a website. They are widely used to make websites work efficiently, enhance security, provide personalized features, and furnish analytical site metrics to owners.'
        },
        {
          heading: '2. How Lycos Core Uses Cookies',
          body: 'Lycos Core (Pty) Ltd uses cookies and similar telemetry technologies (such as local storage and session tokens) across lycoscore.com. In accordance with our Responsible Use of AI Policy and Privacy Policy:',
          bullets: [
            {
              label: 'No AI Training',
              text: 'Cookies and local telemetry are never used to feed, fine-tune, or train public or third-party artificial intelligence models.'
            },
            {
              label: 'No Data Brokerage',
              text: 'We do not track your activity across unrelated third-party websites to serve targeted third-party advertising.'
            }
          ]
        },
        {
          heading: '3. Categories of Cookies We Use',
          table: {
            headers: ['Category', 'Purpose', 'Legal Basis', 'Classification'],
            rows: [
              [
                'Strictly Necessary',
                'Enable core functionality such as secure login sessions, user authentication, interactive sandbox states, and security verification (e.g., bot detection).',
                'Legitimate Interest / Contractual Necessity',
                'Essential (Cannot be turned off)'
              ],
              [
                'Performance & Analytics',
                'Collect anonymized telemetry regarding site traffic, page load times, popular navigation paths, and error rates to optimize UI performance.',
                'Consent',
                'Optional'
              ],
              [
                'Functionality & Preferences',
                'Remember your settings and preferences across sessions, such as language preferences or theme state (e.g., dark mode preferences).',
                'Consent / Legitimate Interest',
                'Optional'
              ]
            ]
          }
        },
        {
          heading: '4. Interactive Tool & Simulation Telemetry',
          body: 'When using interactive tools, ROI simulators, or enterprise demonstration modules on our platform (including components powering Lycos Aegis, Lycos Sentinel, Lycos Synapse, Lycos Vector, Lycos Vanguard, and the Incubation Den), temporary session cookies or local storage objects may be generated to preserve your inputs during your active browser session.',
          bullets: [
            {
              text: 'Session storage data is purged automatically upon closing your browser tab.'
            },
            {
              text: 'No submitted parameters are linked to profiling cookies for ad-targeting purposes.'
            }
          ]
        },
        {
          heading: '5. Managing Your Cookie Preferences',
          body: 'You can control or modify your cookie choices at any time through the following mechanisms:',
          subsections: [
            {
              subhead: 'On-Site Consent Tool',
              text: 'Click the "Cookie Settings" link in our website footer at any time to reopen the preferences manager and toggle optional analytics or performance cookies on or off.'
            },
            {
              subhead: 'Browser Settings',
              text: 'Most web browsers allow you to manage cookie settings through their preferences menu. You can configure your browser to block all cookies, accept only first-party cookies, or delete cookies upon exit.',
              subbullets: [
                'Note on essential cookies: If you disable strictly necessary cookies via your browser, certain parts of our website and interactive demos may not function properly.'
              ]
            }
          ]
        },
        {
          heading: '6. Updates to This Policy',
          body: 'We may update this Cookie Policy periodically to reflect changes in our technology, regulatory guidelines under POPIA or GDPR, or operational practices. Any changes will be posted on this page with an updated "Effective Date".'
        },
        {
          heading: '7. Contact Us',
          body: 'If you have questions about our use of cookies or privacy protocols, contact our Information Officer:',
          bullets: [
            { label: 'Entity', text: 'Lycos Core (Pty) Ltd' },
            { label: 'Email', text: 'privacy@lycoscore.com' }
          ]
        }
      ]
    },
    terms: {
      eyebrow: '// Legal Framework',
      title: 'Website Terms of Use Policy',
      lastUpdated: 'September 4, 2026',
      sections: [
        {
          heading: '1. Acceptance of Terms',
          body: 'By accessing and using this website (lycoscore.com), you agree to be bound by these Terms of Use and all applicable laws and regulations in South Africa, including the Protection of Personal Information Act 4 of 2013 (POPIA) and the Electronic Communications and Transactions Act 25 of 2002 (ECTA). If you do not agree with any part of these terms, you must discontinue use immediately.'
        },
        {
          heading: '2. Intellectual Property Rights',
          body: 'All proprietary technology, codebases, user interfaces, branding assets, software documentation, and structural architecture published on or accessible via this site are the exclusive intellectual property of Lycos Core (Pty) Ltd ("Lycos Core") or its licensors.',
          bullets: [
            {
              label: 'Lycos Core Engines',
              text: 'The algorithms, interfaces, and underlying frameworks powering Lycos Aegis, Lycos Sentinel, Lycos Synapse, Lycos Vector, Lycos Vanguard, and the Incubation Den are protected under South African and international copyright, trademark, and trade secret laws.'
            },
            {
              label: 'Usage Restrictions',
              text: 'You are granted a limited, revocable, non-transferable license to view website content for informational purposes. You may not copy, reproduce, reverse-engineer, frame, mirror, scrape, or extract data from any part of the site or its underlying modules without express written consent.'
            }
          ]
        },
        {
          heading: '3. Permitted & Prohibited Use',
          body: 'You agree to use this website only for lawful business, consulting, and informational purposes. You agree not to:',
          bullets: [
            { text: 'Attempt to gain unauthorized access to any port, server, engine module, or administrative interface of Lycos Core.' },
            { text: 'Submit malicious code, automated bots, scrapers, or excessive traffic payloads designed to disrupt service availability or impair platform security.' },
            { text: 'Use any communications or submission channels to transmit unlawful, defamatory, or privacy-violating materials.' },
            { text: 'Misrepresent your identity or affiliation with Lycos Core or its enterprise software platforms.' }
          ]
        },
        {
          heading: '4. Enterprise Services & Demonstrations',
          body: 'Any interactive tools, return-on-investment (ROI) simulators, platform product demonstrations, or service estimates provided on this website are for illustrative and informational purposes only.',
          bullets: [
            { text: 'An interactive sandbox or ROI simulation does not constitute a binding legal contract, guaranteed performance SLA, or formal software delivery agreement.' },
            { text: 'Formal engagement with Lycos Core for bespoke software development, consulting, or venture incubation requires an executed Master Services Agreement (MSA) and Statement of Work (SOW).' }
          ]
        },
        {
          heading: '5. Privacy, POPIA Compliance & Cookies',
          body: 'Your privacy and data sovereignty are central to our operational principles.',
          bullets: [
            {
              label: 'Data Processing',
              text: 'Any personal information collected via contact forms, project briefs, or newsletter sign-ups is processed strictly in accordance with POPIA.'
            },
            {
              label: 'Responsible AI & Governance',
              text: 'Data submitted through our web channels is handled under our Responsible Use of AI framework, prioritizing data minimization, security safeguards, and strict confidentiality.'
            },
            {
              label: 'Cookies',
              text: 'This website utilizes cookies and similar telemetry technology for functionality and analytics. Details regarding your choices and cookie consent can be found in our Privacy Policy and Cookie Policy.'
            }
          ]
        },
        {
          heading: '6. Disclaimers & Limitation of Liability',
          bullets: [
            {
              label: '"As Is" Basis',
              text: 'The website and its contents are provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied.'
            },
            {
              label: 'No Guarantee',
              text: 'While we implement enterprise-grade security controls (including POPIA-compliant data handling), Lycos Core does not guarantee uninterrupted access or complete immunity from cyber threats or third-party outages.'
            },
            {
              label: 'Limitation',
              text: 'To the maximum extent permitted by South African law, Lycos Core, its directors, employees, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, reliance on, or inability to use this website.'
            }
          ]
        },
        {
          heading: '7. Third-Party Links & Services',
          body: 'This website may contain links to third-party platforms, resources, or client showcases. Lycos Core does not control, endorse, or assume responsibility for the content, privacy practices, or security policies of third-party websites.'
        },
        {
          heading: '8. Governing Law & Jurisdiction',
          body: 'These terms are governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising in connection with these terms or site access shall be subject to the exclusive jurisdiction of the South African courts.'
        },
        {
          heading: '9. Amendments',
          body: 'Lycos Core reserves the right to modify these Terms of Use at any time. Updated terms will take effect immediately upon publication on this page. Your continued use of the website following any changes constitutes acceptance of the updated policy.'
        },
        {
          heading: '10. Contact Information',
          body: 'For legal inquiries, POPIA access requests, or regulatory communications:',
          bullets: [
            { label: 'Entity', text: 'Lycos Core Legal & Governance' },
            { label: 'Email', text: 'legal@lycoscore.com' },
            { label: 'Location', text: 'Republic of South Africa' }
          ]
        }
      ]
    },
    privacy: {
      eyebrow: '// Data Governance',
      title: 'Privacy Policy',
      lastUpdated: 'September 4, 2026',
      sections: [
        {
          heading: '1. Introduction and Responsible Party',
          body: 'Lycos Core (Pty) Ltd ("Lycos Core", "we", "us", or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy outlines how we collect, use, store, process, and safeguard your data when you visit our website (lycoscore.com / lycos.ai), use our interactive tools, or engage with our enterprise services.\n\nUnder South Africa’s Protection of Personal Information Act 4 of 2013 (POPIA), Lycos Core acts as the Responsible Party. For users accessing our platforms from the European Union, United Kingdom, or other international regions, we also align with the General Data Protection Regulation (GDPR) and local applicable data protection frameworks.'
        },
        {
          heading: '2. Information We Collect',
          body: 'We limit collection strictly to information required for legitimate business purposes, technical security, and service delivery:',
          bullets: [
            {
              label: 'Voluntarily Provided Data',
              text: 'Name, business email, phone number, job title, company name, and project specifications submitted via contact forms, project briefs, or newsletter sign-ups.'
            },
            {
              label: 'Interactive Tool Payload Data',
              text: 'Information entered into our website features (such as return-on-investment simulators or interactive demos). This data is processed in real time and is governed by our strict non-training guarantees.'
            },
            {
              label: 'Automated Technical Data',
              text: 'IP addresses, browser types, device specifications, operating system details, referring URLs, and website navigation paths collected via log files and essential cookies.'
            }
          ]
        },
        {
          heading: '3. Purpose and Legal Basis for Processing',
          body: 'We process your personal information only when a lawful ground exists under POPIA Section 11 or GDPR Article 6:',
          table: {
            headers: ['Category of Processing', 'Purpose', 'Lawful / Legal Basis'],
            rows: [
              [
                'Consulting & Inquiry Responses',
                'Responding to project inquiries, scheduling discovery calls, providing quotes.',
                'Legitimate interest / Pre-contractual steps'
              ],
              [
                'Platform Demonstrations',
                'Delivering interactive simulations and tool outputs on the site.',
                'Consent / Performance of requested service'
              ],
              [
                'Security & Analytics',
                'Protecting infrastructure against cyber threats, optimizing site performance.',
                'Legitimate interest (system security)'
              ],
              [
                'Legal & Compliance',
                'Fulfilling statutory duties, audit logs, and regulatory reporting.',
                'Legal obligation under POPIA / ECTA'
              ]
            ]
          }
        },
        {
          heading: '4. Non-Training Commitment & AI Safeguards',
          body: 'In accordance with our Responsible Use of AI Policy:',
          bullets: [
            {
              label: 'No Public Model Training',
              text: 'Any input, query, or file uploaded through our website or platform engines (Lycos Aegis, Lycos Sentinel, Lycos Synapse, Lycos Vector, Lycos Vanguard, or the Incubation Den) is never used to train public or third-party AI models.'
            },
            {
              label: 'Data Isolation',
              text: 'All sandbox interactions and inquiries remain isolated within secured server environments.'
            }
          ]
        },
        {
          heading: '5. Cross-Border Data Transfers',
          body: 'Because Lycos Core operates internationally, your personal information may be stored or processed outside of your home country.',
          bullets: [
            {
              label: 'POPIA Compliance (Section 72)',
              text: 'We only transfer personal data outside South Africa if the recipient country offers an adequate level of data protection, or where the transfer is governed by a binding agreement (such as Standard Contractual Clauses) providing equivalent safeguards.'
            },
            {
              label: 'GDPR Compliance (Chapter V)',
              text: 'International transfers outside the EEA are secured using standard contractual mechanisms approved by the European Commission.'
            }
          ]
        },
        {
          heading: '6. Data Retention & Security Measures',
          bullets: [
            {
              label: 'Security Safeguards',
              text: 'We enforce administrative, technical, and physical controls to prevent unauthorized access, loss, or disclosure—including end-to-end encryption in transit (TLS 1.3), encrypted databases at rest (AES-256), and regular security vulnerability assessments.'
            },
            {
              label: 'Retention Limits',
              text: 'Personal data is retained only for as long as necessary to fulfill the purposes for which it was collected or as required by statutory record-keeping laws. Once expired, records are securely shredded or permanently anonymized.'
            }
          ]
        },
        {
          heading: '7. Cookies & Tracking Technologies',
          body: 'We use cookies and similar web technologies to enable core site functionality and analyze operational telemetry:',
          bullets: [
            {
              label: 'Strictly Necessary Cookies',
              text: 'Essential for navigation and security access.'
            },
            {
              label: 'Performance & Analytics Cookies',
              text: 'Help us measure traffic patterns and optimize platform usability.'
            }
          ],
          subsections: [
            {
              subhead: 'Preferences Management',
              text: 'You can adjust your browser settings to refuse non-essential cookies or manage your preferences via our on-site cookie banner and settings link.'
            }
          ]
        },
        {
          heading: '8. Your Data Subject Rights',
          body: 'Depending on your jurisdiction, under POPIA (Sections 23–25) and GDPR (Articles 15–22), you have the right to:',
          bullets: [
            { label: 'Access', text: 'Request confirmation of whether we hold your personal information and obtain a copy.' },
            { label: 'Correction', text: 'Request the correction or deletion of inaccurate, incomplete, or outdated information.' },
            { label: 'Objection & Restriction', text: 'Object to processing based on legitimate interest or restrict automated processing.' },
            { label: 'Data Portability', text: 'Request a structured machine-readable copy of your data (where applicable).' },
            { label: 'Withdraw Consent', text: 'Revoke consent at any time without affecting prior lawful processing.' }
          ]
        },
        {
          heading: '9. Complaints & Regulatory Recourse',
          body: 'If you believe your personal data has been handled unlawfully, we encourage you to contact us first so we can address your concern. However, you retain the right to lodge a complaint with the relevant supervisory authority:',
          bullets: [
            {
              label: 'South Africa',
              text: 'The Information Regulator (South Africa) — complaints.IR@inforegulator.org.za'
            },
            {
              label: 'European Union',
              text: 'Your local national Data Protection Authority (DPA).'
            }
          ]
        },
        {
          heading: '10. Contact Details & Information Officer',
          body: 'For privacy inquiries, POPIA access requests, or regulatory communications:',
          bullets: [
            { label: 'Entity', text: 'Lycos Core (Pty) Ltd' },
            { label: 'Office', text: 'Information Officer / Legal & Governance' },
            { label: 'Email', text: 'privacy@lycoscore.com' }
          ]
        }
      ]
    },
    'responsible-ai': {
      eyebrow: '// Algorithmic Ethics',
      title: 'Responsible Use of AI Policy',
      lastUpdated: 'September 4, 2026',
      sections: [
        {
          heading: '1. Purpose and Core Philosophy',
          body: 'Lycos Core (Pty) Ltd ("Lycos Core") designs, builds, and deploys enterprise artificial intelligence software, proprietary engines, and custom model implementations. This Policy sets out our binding framework for ethical design, algorithmic accountability, data sovereignty, and safety across all operations within South Africa and international jurisdictions.\n\nWe adhere to a principle of governance by design—ensuring safety, transparency, and data privacy are embedded into our software tools, client deliverables, and venture incubation workflows.'
        },
        {
          heading: '2. Multi-Jurisdictional Regulatory Alignment',
          body: 'Lycos Core operates under a dual-tier compliance framework to satisfy both domestic statutory duties and international extra-territorial AI governance requirements:',
          bullets: [
            {
              label: 'Data Protection & Privacy Sovereignty',
              text: 'Strict adherence to South Africa’s POPIA (Protection of Personal Information Act), the European Union’s GDPR (General Data Protection Regulation), and applicable regional data protection statutes governing cross-border data transfers.'
            },
            {
              label: 'Risk-Based AI Governance Frameworks',
              text: 'Full alignment with the risk tiers of the EU AI Act, the NIST AI Risk Management Framework, and the OECD Principles on AI, ensuring high-risk deployment vectors are subjected to strict conformity assessments before launch.'
            }
          ]
        },
        {
          heading: '3. Key Principles of AI Governance',
          subsections: [
            {
              subhead: 'Data Sovereignty & Zero Data Leakage',
              text: 'Client proprietary data, trade secrets, confidential codebase elements, and personal identity information processed through our systems—including Lycos Aegis, Lycos Sentinel, Lycos Synapse, Lycos Vector, and Lycos Vanguard—are strictly isolated. Client data is never used to train public third-party foundation models without explicit written authorization.',
              subbullets: [
                'Data Minimization: Models are engineered to collect, retain, and process only the minimal data payloads required to perform designated tasks.'
              ]
            },
            {
              subhead: 'Human Oversight & System Control (Human-in-the-Loop)',
              text: 'Autonomous decision loops operating in high-stakes operational environments are designed with mandatory human oversight checkpoints. Automated outputs that directly affect individuals, organizational workflows, or resource allocations must allow for human intervention, review, and override.'
            },
            {
              subhead: 'Algorithmic Transparency & Explainability',
              text: 'We reject "black box" implementations where safety or legal compliance is involved. System architectures are audited to provide clear audit trails, traceable reasoning paths, and transparent reporting on data provenance and model parameters.'
            },
            {
              subhead: 'Fairness, Bias Mitigation & Ethical Safety',
              text: 'Systems undergo systematic red-teaming and bias testing prior to deployment to identify and mitigate discrimination based on race, gender, geographic origin, socio-economic status, or language. Models are built with guardrails to prevent harmful, deceptive, or non-consensual output generation.'
            }
          ]
        },
        {
          heading: '4. Multi-Jurisdictional Regulatory Alignment & Cross-Border Compliance',
          body: 'For operations, enterprise integrations, and clients located outside of South Africa:',
          bullets: [
            {
              label: 'Cross-Border Transfer Safeguards',
              text: 'Personal and proprietary data transferred across borders is protected using Standard Contractual Clauses (SCCs), Binding Corporate Rules, or equivalent adequacy frameworks to maintain compliance with POPIA Section 72 and GDPR Chapter V.'
            },
            {
              label: 'Jurisdictional Sovereignty',
              text: 'Where clients require localized hosting to meet regional data residency laws, models are deployed within designated region-specific cloud infrastructure or local edge hardware.'
            }
          ]
        },
        {
          heading: '5. Deployment Protocols & Security Architecture',
          bullets: [
            {
              label: 'Risk Classification',
              text: 'Every AI module, custom model deployment, and venture incubation project undergo a mandatory pre-deployment Risk Impact Assessment (RIA) to categorize risk profile (Minimal, Specific Transparency, High, Unacceptable).'
            },
            {
              label: 'Hardened Security',
              text: 'System interfaces are secured with continuous monitoring, robust encryption protocols (in transit and at rest), and threat modeling against prompt injection, model poisoning, and data exfiltration.'
            }
          ]
        },
        {
          heading: '6. Client Responsibilities & Acceptable Use',
          body: 'Clients and partners utilizing Lycos Core platforms or custom deployments agree not to:',
          bullets: [
            { text: 'Re-configure or bypass built-in safety filters, rate limits, or oversight mechanisms.' },
            { text: 'Deploy Lycos Core systems for prohibited uses under global regulations, including unauthorized surveillance, social scoring, or deceptive deepfake generation.' },
            { text: 'Process sensitive personal categories without valid lawful processing grounds under local data protection laws.' }
          ]
        },
        {
          heading: '7. Governance, Incident Reporting & Policy Review',
          bullets: [
            {
              label: 'Governance Oversight',
              text: 'Operational compliance with this Policy is overseen by the Lycos Core AI Governance & Legal Committee.'
            },
            {
              label: 'Incident Escalation',
              text: 'Any identified model vulnerability, data drift issue, algorithmic anomaly, or potential privacy breach must be reported immediately to governance@lycoscore.com.'
            },
            {
              label: 'Annual Audit',
              text: 'This policy is evaluated and updated annually to account for evolving international standards, technological shifts, and legislative developments.'
            }
          ]
        }
      ]
    }
  };

  const data = contentMap[type] || contentMap.terms;

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
        <div className="hero-grid" style={{ alignItems: 'center' }}>
          <div>
            <div className="eyebrow-tagline-green">{data.eyebrow}</div>
            <h1 className="hero-heading">
              {data.title}<span className="brand-dot">.</span>
            </h1>
            
            <p className="hero-body-copy" style={{ marginBottom: '2rem' }}>
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

          {/* Right Column: Full-width double-height stacked pills */}
          <div className="legal-hero-pills-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.25rem', width: '100%', maxWidth: '440px', marginLeft: 'auto' }}>
            {[data.eyebrow, 'Corporate Telemetry', 'Zero-Trust Auditing'].map((tag, tIdx) => (
              <div 
                key={tIdx} 
                className="hero-pill-badge legal-pill-expanded"
                style={{ 
                  width: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: '1.15rem 1.75rem', 
                  fontSize: '1.05rem', 
                  fontWeight: 600,
                  textTransform: 'none',
                  textAlign: 'center',
                  borderRadius: '36px',
                  boxShadow: '0 4px 20px rgba(138, 75, 243, 0.15)',
                  letterSpacing: '0.5px'
                }}
              >
                {tag}
              </div>
            ))}
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
                  
                  {sec.body && (
                    <div className="legal-section-body" style={{ whiteSpace: 'pre-line', marginBottom: sec.bullets || sec.table || sec.subsections ? '1rem' : '0' }}>
                      {sec.body}
                    </div>
                  )}

                  {sec.table && (
                    <div className="legal-table-wrapper" style={{ overflowX: 'auto', margin: '1.25rem 0' }}>
                      <table className="legal-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                        <thead>
                          <tr>
                            {sec.table.headers.map((h, hIdx) => (
                              <th key={hIdx} style={{ padding: '0.85rem 1rem', border: '1px solid var(--border-color)', background: 'rgba(138, 75, 243, 0.12)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sec.table.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} style={{ padding: '0.85rem 1rem', border: '1px solid var(--border-color)', color: 'var(--text-gray)', verticalAlign: 'top' }}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {sec.bullets && (
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', margin: '0.75rem 0', color: 'var(--text-gray)', lineHeight: '1.75' }}>
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} style={{ marginBottom: '0.6rem' }}>
                          {b.label && <strong style={{ color: 'var(--text-primary)' }}>{b.label}: </strong>}
                          {b.text}
                        </li>
                      ))}
                    </ul>
                  )}

                  {sec.subsections && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
                      {sec.subsections.map((sub, sIdx) => (
                        <div key={sIdx} style={{ borderLeft: '2px solid rgba(140, 255, 50, 0.4)', paddingLeft: '1.25rem' }}>
                          <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.4rem', fontFamily: 'var(--font-title)' }}>
                            {sub.subhead}
                          </h3>
                          <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.75', margin: 0 }}>
                            {sub.text}
                          </p>
                          {sub.subbullets && (
                            <ul style={{ listStyleType: 'circle', paddingLeft: '1.25rem', marginTop: '0.5rem', color: 'var(--text-gray)' }}>
                              {sub.subbullets.map((sb, sbIdx) => (
                                <li key={sbIdx} style={{ fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                                  {sb}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
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
