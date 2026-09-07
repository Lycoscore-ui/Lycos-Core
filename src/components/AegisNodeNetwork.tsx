import React, { useState } from 'react';
import { Cpu, ShieldCheck, Database, Globe, Lock, Radio } from 'lucide-react';

interface NodeInfo {
  id: string;
  name: string;
  category: string;
  status: string;
  protocol: string;
  metric: string;
  description: string;
}

const AegisNodeNetwork: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>('aegis');

  const nodes: Record<string, NodeInfo> = {
    aegis: {
      id: 'aegis',
      name: 'LYCOS AEGIS GATEWAY',
      category: 'MASTER ZERO-TRUST CONTROLLER',
      status: 'AIR-GAPPED & ENFORCING',
      protocol: 'POLICY INTERCEPTION V4.2',
      metric: '< 8.4ms Latency',
      description: 'Central autonomous security bastion enforcing multi-layer prompt scrubbing, PII redaction, and deterministic policy isolation.'
    },
    ingestion: {
      id: 'ingestion',
      name: 'ENTERPRISE DATA & ERP',
      category: 'PROTECTED SYSTEM OF RECORD',
      status: 'SECURE INGESTION ACTIVE',
      protocol: 'TLS 1.3 + TOKENIZED REPLACEMENT',
      metric: '99.99% Redaction Rate',
      description: 'Core databases, CRM, and financial data vaults sanitized at the source before any model-level vector ingestion occurs.'
    },
    context: {
      id: 'context',
      name: 'CONTEXT & VECTOR MEMORY',
      category: 'ENTERPRISE RAG CORE',
      status: 'SOVEREIGN ISOLATION',
      protocol: 'ROLE-BASED ACL ENFORCEMENT',
      metric: 'Zero Context Leakage',
      description: 'Harmonized vector stores and semantic memory clusters segmented by cryptographic tenant permissions.'
    },
    external: {
      id: 'external',
      name: 'PUBLIC LLMs & AGENTS',
      category: 'UNTRUSTED EXTERNAL COMPUTE',
      status: 'QUARANTINE ENFORCED',
      protocol: 'DETERMINISTIC OUTPUT SCRUBBING',
      metric: '0.00% Vulnerability Exposure',
      description: 'OpenAI, Anthropic, and open-source models process sanitized tokens without retaining raw corporate training intelligence.'
    }
  };

  const currentInfo = nodes[activeNode] || nodes.aegis;

  return (
    <div className="containment-map-wrapper">
      <div className="glass-panel containment-map-card">
        {/* Telemetry Header Bar */}
        <div className="containment-telemetry-bar">
          <div className="containment-telemetry-item">
            <span className="containment-live-radar">
              <span className="containment-radar-ping"></span>
              <span className="containment-radar-dot"></span>
            </span>
            <span className="containment-telemetry-label">Active Policy Nodes:</span>
            <span className="containment-telemetry-value highlight">14 ACTIVE</span>
          </div>

          <div className="containment-telemetry-item">
            <Radio size={14} className="containment-telemetry-icon" />
            <span className="containment-telemetry-label">Gateway Latency:</span>
            <span className="containment-telemetry-value">8.4ms</span>
          </div>

          <div className="containment-telemetry-item">
            <Lock size={14} className="containment-telemetry-icon" />
            <span className="containment-telemetry-label">Compliance Baseline:</span>
            <span className="containment-telemetry-value highlight">SOC 2 / EU AI ACT</span>
          </div>
        </div>

        {/* Dynamic Multi-Agent SVG Canvas */}
        <div className="containment-canvas">
          {/* Animated Circuit Canvas SVG */}
          <svg className="containment-svg" viewBox="0 0 700 360" fill="none">
            <defs>
              <linearGradient id="aegisGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8CFF32" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8a9df8" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="lineGradIngest" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8a9df8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#8CFF32" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="lineGradContext" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8CFF32" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#8a9df8" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="lineGradExternal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8CFF32" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#8a9df8" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Ambient Background Aura Rings */}
            <circle cx="350" cy="175" r="140" stroke="rgba(140, 255, 50, 0.12)" strokeWidth="1" strokeDasharray="4 8" className="containment-spin-slow" />
            <circle cx="350" cy="175" r="95" stroke="rgba(138, 157, 248, 0.15)" strokeWidth="1" />
            <circle cx="350" cy="175" r="55" fill="rgba(140, 255, 50, 0.05)" />

            {/* Connection Lines from Aegis Center (350, 175) to Satellite Nodes */}
            {/* 1. Left Node: Ingestion (140, 95) */}
            <line 
              x1="350" y1="175" x2="140" y2="95" 
              stroke="url(#lineGradIngest)" 
              strokeWidth="2.5" 
              strokeDasharray="6 6" 
              className="containment-pulse-line" 
            />
            {/* 2. Right Node: Context (560, 95) */}
            <line 
              x1="350" y1="175" x2="560" y2="95" 
              stroke="url(#lineGradContext)" 
              strokeWidth="2.5" 
              strokeDasharray="6 6" 
              className="containment-pulse-line" 
            />
            {/* 3. Bottom Node: External Models (350, 290) */}
            <line 
              x1="350" y1="175" x2="350" y2="290" 
              stroke="url(#lineGradExternal)" 
              strokeWidth="2.5" 
              strokeDasharray="6 6" 
              className="containment-pulse-line" 
            />

            {/* Node Ambient Spots */}
            <circle cx="140" cy="95" r="32" fill="rgba(138, 157, 248, 0.08)" />
            <circle cx="560" cy="95" r="32" fill="rgba(140, 255, 50, 0.08)" />
            <circle cx="350" cy="290" r="32" fill="rgba(138, 157, 248, 0.08)" />
          </svg>

          {/* Node 1: Left - Ingestion */}
          <div 
            className={`containment-node-anchor node-ingestion ${activeNode === 'ingestion' ? 'is-active' : ''}`}
            onClick={() => setActiveNode('ingestion')}
            onMouseEnter={() => setActiveNode('ingestion')}
          >
            <div className="containment-node-circle satellite">
              <Database size={24} className="containment-node-icon blue" />
            </div>
            <div className="containment-node-badge">
              <span className="containment-node-name">Data Ingestion</span>
              <span className="containment-node-sub">PII Sanitization</span>
            </div>
          </div>

          {/* Node 2: Center - Lycos Aegis Master Gateway */}
          <div 
            className={`containment-node-anchor node-center ${activeNode === 'aegis' ? 'is-active' : ''}`}
            onClick={() => setActiveNode('aegis')}
            onMouseEnter={() => setActiveNode('aegis')}
          >
            <div className="containment-node-circle master-core">
              <div className="containment-core-pulse"></div>
              <ShieldCheck size={38} className="containment-node-icon neon-green" />
            </div>
            <div className="containment-node-badge master-badge">
              <span className="containment-master-tag">GATEWAY</span>
              <span className="containment-node-name">LYCOS AEGIS</span>
            </div>
          </div>

          {/* Node 3: Right - Context Harmonization */}
          <div 
            className={`containment-node-anchor node-context ${activeNode === 'context' ? 'is-active' : ''}`}
            onClick={() => setActiveNode('context')}
            onMouseEnter={() => setActiveNode('context')}
          >
            <div className="containment-node-circle satellite">
              <Cpu size={24} className="containment-node-icon neon-green" />
            </div>
            <div className="containment-node-badge">
              <span className="containment-node-name">Context Core</span>
              <span className="containment-node-sub">Vector Memory</span>
            </div>
          </div>

          {/* Node 4: Bottom - External LLMs / Public Cloud */}
          <div 
            className={`containment-node-anchor node-external ${activeNode === 'external' ? 'is-active' : ''}`}
            onClick={() => setActiveNode('external')}
            onMouseEnter={() => setActiveNode('external')}
          >
            <div className="containment-node-circle satellite">
              <Globe size={24} className="containment-node-icon blue" />
            </div>
            <div className="containment-node-badge">
              <span className="containment-node-name">Public LLMs</span>
              <span className="containment-node-sub">Zero-Trust Isolation</span>
            </div>
          </div>
        </div>

        {/* Interactive Dynamic Telemetry Drawer */}
        <div className="containment-detail-drawer">
          <div className="containment-drawer-header">
            <div>
              <span className="containment-drawer-category">{currentInfo.category}</span>
              <h4 className="containment-drawer-title">{currentInfo.name}</h4>
            </div>
            <div className="containment-drawer-badges">
              <span className="containment-status-pill">{currentInfo.status}</span>
              <span className="containment-metric-pill">{currentInfo.metric}</span>
            </div>
          </div>
          <p className="containment-drawer-desc">{currentInfo.description}</p>
          <div className="containment-drawer-protocol">
            <span className="containment-protocol-label">SECURITY PROTOCOL:</span>
            <span className="containment-protocol-val">{currentInfo.protocol}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AegisNodeNetwork;
