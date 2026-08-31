import { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Activity, Globe2, X, ArrowLeft } from 'lucide-react';
import LinkedInConnect from '../components/LinkedInConnect';

interface LegalContent {
  title: string;
  eyebrow: string;
  lastUpdated: string;
  sections: Array<{ heading: string; body: string }>;
}

const LEGAL_DOCS: Record<string, LegalContent> = {
  terms: {
    eyebrow: '// LEGAL FRAMEWORK',
    title: 'Website Terms of Use',
    lastUpdated: 'August 2026',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        body: 'By accessing and utilizing the Lycos Core digital infrastructure, you agree to be bound by these Terms of Use and all applicable global governance standards. If you do not agree with these terms, you must cease system access immediately.'
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
    eyebrow: '// DATA GOVERNANCE',
    title: 'Privacy Policy',
    lastUpdated: 'August 2026',
    sections: [
      {
        heading: '1. Data Collection and Telemetry',
        body: 'Lycos Core collects technical telemetry data required to optimize multi-agent orchestration latency and maintain system security. We do not sell or expose enterprise data to third-party model training pipelines.'
      },
      {
        heading: '2. Data Protection and Zero-Trust Standards',
        body: 'All system logs and communications are encrypted in transit via TLS 1.3 and at rest with AES-256 military-grade encryption. Access permissions follow strict least-privilege principles.'
      },
      {
        heading: '3. User Rights and Compliance',
        body: 'In accordance with GDPR, CCPA, and global privacy mandates, stakeholders hold the right to inspect, rectify, or purge stored transmission records by contacting security@lycoscore.com.'
      }
    ]
  },
  'responsible-ai': {
    eyebrow: '// ETHICAL GOVERNANCE',
    title: 'Responsible AI Policy',
    lastUpdated: 'August 2026',
    sections: [
      {
        heading: '1. Core Ethical Tenets',
        body: 'Lycos Core prioritizes transparency, accountability, and deterministic safety controls in every autonomous system and cognitive pipeline we engineer.'
      },
      {
        heading: '2. Human-in-the-Loop Safeguards',
        body: 'High-impact enterprise workflows incorporate hard-coded human oversight gates, ensuring critical strategic decisions retain executive accountability.'
      },
      {
        heading: '3. Bias Mitigation and Algorithmic Audits',
        body: 'We subject our model suites to continuous automated stress-testing against synthetic adversarial vectors to detect and mitigate algorithmic drift, hallucinations, and unintended bias.'
      }
    ]
  }
};

export default function SplashPage() {
  const [activeLegalModal, setActiveLegalModal] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize rotating 3D particle sphere on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Array<{
      lx: number;
      ly: number;
      lz: number;
      size: number;
      alpha: number;
      speed: number;
      isOuter: boolean;
    }> = [];

    const particleCount = 750;
    const phi = Math.PI * (Math.sqrt(5) - 1);
    const outerCount = Math.floor(particleCount * 0.7);
    const innerCount = particleCount - outerCount;

    // Outer Sphere
    for (let i = 0; i < outerCount; i++) {
      const y = 1 - (i / (outerCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      const r = 112 + (Math.random() - 0.5) * 16;

      particles.push({
        lx: x * r,
        ly: y * r,
        lz: z * r,
        size: 0.75 + Math.random() * 0.9,
        alpha: 0.35 + Math.random() * 0.45,
        speed: 0.6 + Math.random() * 0.4,
        isOuter: true,
      });
    }

    // Inner Core
    for (let i = 0; i < innerCount; i++) {
      const y = 1 - (i / (innerCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      const r = 60 + (Math.random() - 0.5) * 10;

      particles.push({
        lx: x * r,
        ly: y * r,
        lz: z * r,
        size: 1.1 + Math.random() * 1.0,
        alpha: 0.7 + Math.random() * 0.3,
        speed: 1.0 + Math.random() * 0.5,
        isOuter: false,
      });
    }

    let angleX = 0.2;
    let angleY = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const fov = 340;

      angleY += 0.007;
      angleX = 0.2 + Math.sin(angleY * 0.5) * 0.1;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Project and sort by depth
      const projected = particles.map((p) => {
        const x1 = p.lx * cosY - p.lz * sinY;
        const z1 = p.lz * cosY + p.lx * sinY;

        const y1 = p.ly * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.ly * sinX;

        const scale = fov / (fov + z2 + 200);
        const px = centerX + x1 * scale;
        const py = centerY + y1 * scale;

        return {
          px,
          py,
          scale,
          z: z2,
          size: p.size * scale,
          alpha: Math.max(0.1, Math.min(1, p.alpha * (scale * 1.2))),
          isOuter: p.isOuter,
        };
      });

      projected.sort((a, b) => b.z - a.z);

      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(0.5, p.size), 0, Math.PI * 2);
        if (p.isOuter) {
          ctx.fillStyle = `rgba(140, 255, 50, ${p.alpha * 0.75})`;
        } else {
          ctx.fillStyle = `rgba(138, 157, 248, ${p.alpha * 0.9})`;
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const activeDoc = activeLegalModal ? LEGAL_DOCS[activeLegalModal] : null;

  return (
    <div className="splash-viewport">
      {/* Top Header */}
      <header className="splash-header">
        <div className="splash-header-inner">
          <div className="splash-brand">
            <img
              src="./media/LYCOS-CORE-lOGOTYPE-300x100.png"
              alt="Lycos Core Logo"
              className="splash-logo"
            />
          </div>

          <div className="splash-status-pill">
            <span className="splash-status-indicator" />
            <span className="splash-status-text">SYSTEM INITIALIZATION // STAGING STABLE</span>
          </div>
        </div>
      </header>

      {/* Main Centerpiece */}
      <main className="splash-main">
        <div className="splash-content-grid">
          {/* Left Text Column */}
          <div className="splash-text-col">
            <div className="splash-tagline">
              // COGNITIVE INFRASTRUCTURE & APEX INTELLIGENCE
            </div>

            <h1 className="splash-title">
              Precision AI Systems<span className="brand-dot">.</span>
              <br />
              <span className="splash-title-sub">
                Engineered with Instinct<span className="accent-dot">.</span>
              </span>
            </h1>

            <p className="splash-description">
              We architect bespoke cognitive architectures, orchestrate enterprise-grade agentic frameworks, and operate a high-velocity incubation hub to trial next-generation solutions. Our public deployment sequence is currently active.
            </p>

            {/* Telemetry Indicator Row */}
            <div className="splash-telemetry-row">
              <div className="splash-telemetry-item">
                <div className="splash-telemetry-icon">
                  <Activity size={18} className="neon-icon" />
                </div>
                <div>
                  <div className="splash-telemetry-val">98.4%</div>
                  <div className="splash-telemetry-lbl">Synthesis Readiness</div>
                </div>
              </div>

              <div className="splash-telemetry-item">
                <div className="splash-telemetry-icon">
                  <ShieldCheck size={18} className="neon-icon" />
                </div>
                <div>
                  <div className="splash-telemetry-val">ZERO-TRUST</div>
                  <div className="splash-telemetry-lbl">Enclave Security</div>
                </div>
              </div>

              <div className="splash-telemetry-item">
                <div className="splash-telemetry-icon">
                  <Globe2 size={18} className="neon-icon" />
                </div>
                <div>
                  <div className="splash-telemetry-val">5 HUBS</div>
                  <div className="splash-telemetry-lbl">Global Operational Nodes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Volumetric Canvas Column */}
          <div className="splash-visual-col">
            <div className="splash-canvas-wrapper">
              <canvas
                ref={canvasRef}
                width={540}
                height={540}
                className="splash-network-canvas"
              />
              <div className="splash-canvas-overlay-tag">
                <span className="splash-pulse-dot" />
                <span>CIPHER // 3D COGNITIVE ORCHESTRATION</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Splash Footer */}
      <footer className="splash-footer">
        <div className="splash-footer-inner">
          <div className="splash-footer-copy">
            © 2026 Lycos Core LLC. All rights reserved. Precision machine intelligence.
          </div>

          <div className="splash-footer-social">
            <LinkedInConnect />
          </div>

          <div className="splash-footer-links">
            <button
              onClick={() => setActiveLegalModal('terms')}
              className="splash-legal-btn"
            >
              Terms of Use
            </button>
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="splash-legal-btn"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveLegalModal('responsible-ai')}
              className="splash-legal-btn"
            >
              Responsible AI Policy
            </button>
          </div>
        </div>
      </footer>

      {/* Standalone Legal Modal Overlay (Keeps user on Splash Page) */}
      {activeDoc && (
        <div className="splash-modal-overlay" onClick={() => setActiveLegalModal(null)}>
          <div className="splash-modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="splash-modal-header">
              <div>
                <span className="splash-modal-eyebrow">{activeDoc.eyebrow}</span>
                <h2 className="splash-modal-title">{activeDoc.title}</h2>
                <span className="splash-modal-updated">Last Updated: {activeDoc.lastUpdated}</span>
              </div>
              <button 
                className="splash-modal-close-btn" 
                onClick={() => setActiveLegalModal(null)}
                title="Return to Splash Page"
              >
                <X size={20} />
              </button>
            </div>

            <div className="splash-modal-body">
              {activeDoc.sections.map((sec, idx) => (
                <div key={idx} className="splash-legal-section">
                  <h3 className="splash-legal-sec-title">{sec.heading}</h3>
                  <p className="splash-legal-sec-body">{sec.body}</p>
                </div>
              ))}
            </div>

            <div className="splash-modal-footer">
              <button 
                className="cta-primary splash-back-btn" 
                onClick={() => setActiveLegalModal(null)}
              >
                <ArrowLeft size={16} /> RETURN TO HOMEPAGE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}