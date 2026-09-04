import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  ArrowRight, 
  Cpu, 
  Shield, 
  Layers, 
  Network, 
  Compass, 
  FileText, 
  BookOpen, 
  HelpCircle, 
  Briefcase, 
  Lock, 
  Zap, 
  Activity 
} from 'lucide-react';

interface SearchItem {
  id: string;
  title: string;
  category: 'Products and Simulators' | 'Protocols and Incubation' | 'The Collective' | 'Intelligence and Research' | 'Legal and Governance';
  description: string;
  slug: string;
  iconName: string;
  tags: string[];
}

const SEARCH_DATABASE: SearchItem[] = [
  {
    id: 'prod-sentinel',
    title: 'Lycos Sentinel // Customer Operations & ROI Simulator',
    category: 'Products and Simulators',
    description: 'Autonomous customer operations, defect reduction, and resolution accuracy model.',
    slug: 'ai-products',
    iconName: 'Shield',
    tags: ['sentinel', 'roi', 'calculator', 'support', 'customer ops']
  },
  {
    id: 'prod-vector',
    title: 'Lycos Vector // Back-Office Operations & ROI Simulator',
    category: 'Products and Simulators',
    description: 'Automated invoice processing, claims, and back-office workforce optimization.',
    slug: 'ai-products',
    iconName: 'Cpu',
    tags: ['vector', 'roi', 'back-office', 'invoices', 'claims', 'simulator']
  },
  {
    id: 'prod-aegis',
    title: 'Lycos Aegis // Security & Node Network Simulator',
    category: 'Products and Simulators',
    description: 'Zero-trust agent orchestration matrix, node network security, and compliance telemetry.',
    slug: 'ai-products',
    iconName: 'Lock',
    tags: ['aegis', 'security', 'zero-trust', 'network', 'orchestration']
  },
  {
    id: 'prod-synapse',
    title: 'Lycos Synapse // Data Integration & ETL Simulator',
    category: 'Products and Simulators',
    description: 'Autonomous schema mapping, ETL latency reduction, and multi-source pipeline synthesis.',
    slug: 'ai-products',
    iconName: 'Network',
    tags: ['synapse', 'etl', 'data integration', 'pipelines', 'schema']
  },
  {
    id: 'prod-vanguard',
    title: 'Lycos Vanguard // Predictive Intelligence & Inventory Simulator',
    category: 'Products and Simulators',
    description: 'Demand forecasting, carrying cost optimization, and stockout prevention engine.',
    slug: 'ai-products',
    iconName: 'Compass',
    tags: ['vanguard', 'inventory', 'forecasting', 'demand', 'carrying cost']
  },
  {
    id: 'proto-kinetic',
    title: 'Protocol: Kinetic // Seed & Pre-Seed Co-Building',
    category: 'Protocols and Incubation',
    description: 'Zero-state architecture, embedded technical co-building, and milestone-gated capital.',
    slug: 'incubation/kinetic',
    iconName: 'Zap',
    tags: ['kinetic', 'seed', 'pre-seed', 'co-building', 'incubation']
  },
  {
    id: 'proto-apex',
    title: 'Protocol: Apex // Series A Revenue Engineering',
    category: 'Protocols and Incubation',
    description: 'RevOps telemetry, enterprise procurement MSAs, and Series A institutional capitalization.',
    slug: 'incubation/apex',
    iconName: 'Activity',
    tags: ['apex', 'series a', 'revops', 'procurement', 'arr']
  },
  {
    id: 'proto-citadel',
    title: 'Protocol: Citadel // Enterprise Spin-Out Governance',
    category: 'Protocols and Incubation',
    description: 'IP carve-outs, regulatory partition mapping, and high-yield venture governance.',
    slug: 'incubation/citadel',
    iconName: 'Shield',
    tags: ['citadel', 'spin-out', 'ip carve-out', 'governance', 'enterprise']
  },
  {
    id: 'proto-hub',
    title: 'Incubation Hub // Overview & Cohort Pathways',
    category: 'Protocols and Incubation',
    description: 'Stage-specific venture tracks and full-stack technical capital allocation.',
    slug: 'incubation-hub',
    iconName: 'Layers',
    tags: ['incubation', 'hub', 'tracks', 'portfolio', 'founders']
  },
  {
    id: 'coll-consulting',
    title: 'AI Consulting // Enterprise Architecture & Strategy',
    category: 'The Collective',
    description: 'Strategic roadmap formulation, infrastructure audits, and operational integration.',
    slug: 'ai-consulting',
    iconName: 'Briefcase',
    tags: ['consulting', 'strategy', 'audit', 'advisory', 'architecture']
  },
  {
    id: 'coll-services',
    title: 'Tech Services // High-Yield Operational Integration',
    category: 'The Collective',
    description: 'Systems integration, automated execution pipelines, and zero-trust enclaves.',
    slug: 'tech-services',
    iconName: 'Cpu',
    tags: ['tech services', 'systems integration', 'infrastructure', 'automation']
  },
  {
    id: 'coll-who',
    title: 'Who We Are // Modular Disciplines & Leadership',
    category: 'The Collective',
    description: 'Our cross-functional unit of neural architects, tactical operators, and engineers.',
    slug: 'who-we-are',
    iconName: 'Layers',
    tags: ['who we are', 'team', 'leadership', 'engineers', 'operators']
  },
  {
    id: 'coll-operate',
    title: 'How We Operate // High-Velocity Sprints & Telemetry',
    category: 'The Collective',
    description: 'Clinical telemetry sweeps, target blueprints, weekly demos, and 90-day tuning.',
    slug: 'how-we-operate',
    iconName: 'Activity',
    tags: ['how we operate', 'sprints', 'methodology', 'phases', 'deliverables']
  },
  {
    id: 'coll-governance',
    title: 'Governance & Security // Zero-Trust Compliance',
    category: 'The Collective',
    description: 'EU AI Act, NIST AI RMF, HIPAA, SOC 2, and hardcoded tenant isolation guardrails.',
    slug: 'governance-security',
    iconName: 'Lock',
    tags: ['governance', 'security', 'compliance', 'eu ai act', 'nist', 'hipaa', 'soc2']
  },
  {
    id: 'intel-case-studies',
    title: 'Case Studies // Verified Enterprise Results',
    category: 'Intelligence and Research',
    description: 'Proven production deployments across logistics, healthcare, and investment banking.',
    slug: 'case-studies',
    iconName: 'FileText',
    tags: ['case studies', 'results', 'deployments', 'lyra', 'apex health', 'vanguard']
  },
  {
    id: 'intel-insights',
    title: 'Industry Insights // Owned Thought Leadership',
    category: 'Intelligence and Research',
    description: 'Advisory blueprints covering agentic velocity, EU AI Act compliance, and semantic caching.',
    slug: 'insights',
    iconName: 'BookOpen',
    tags: ['insights', 'articles', 'whitepapers', 'research', 'agentic']
  },
  {
    id: 'intel-articles',
    title: 'Curated Articles // Realtime Market Advisories',
    category: 'Intelligence and Research',
    description: 'Curated market intelligence, architectural events, and strategic commentary.',
    slug: 'articles',
    iconName: 'FileText',
    tags: ['articles', 'curation', 'news', 'market events', 'intel']
  },
  {
    id: 'intel-kb',
    title: 'Master Knowledge Base // FAQs & Spec Repository',
    category: 'Intelligence and Research',
    description: 'Complete operational runbooks, technical FAQs, and protocol specifications.',
    slug: 'knowledge-base',
    iconName: 'HelpCircle',
    tags: ['faq', 'knowledge base', 'specs', 'support', 'questions']
  },
  {
    id: 'legal-terms',
    title: 'Website Terms of Use // Legal Framework',
    category: 'Legal and Governance',
    description: 'System access terms, intellectual property protections, and platform usage standards.',
    slug: 'terms-of-use',
    iconName: 'FileText',
    tags: ['terms', 'terms of use', 'legal']
  },
  {
    id: 'legal-privacy',
    title: 'Privacy Policy // Data Governance',
    category: 'Legal and Governance',
    description: 'Zero-trust telemetry handling, AES-256 storage, and GDPR/CCPA data protection.',
    slug: 'privacy-policy',
    iconName: 'Lock',
    tags: ['privacy', 'privacy policy', 'data protection', 'gdpr']
  },
  {
    id: 'legal-responsible-ai',
    title: 'Responsible AI Policy // Algorithmic Ethics',
    category: 'Legal and Governance',
    description: 'Ethical model guardrails, human-in-the-loop triggers, and explainability audit logs.',
    slug: 'responsible-ai-policy',
    iconName: 'Shield',
    tags: ['ethics', 'responsible ai', 'safety', 'bias', 'audit']
  },
  {
    id: 'legal-cookies',
    title: 'Cookie Policy // Telemetry & Consent',
    category: 'Legal and Governance',
    description: 'On-site cookie preferences, zero ad-brokerage, non-training telemetry protocols.',
    slug: 'cookie-policy',
    iconName: 'FileText',
    tags: ['cookie', 'cookie policy', 'consent', 'telemetry', 'privacy']
  },
  {
    id: 'system-splash',
    title: 'Splash & Coming Soon // Public Initialization Preview',
    category: 'Protocols and Incubation',
    description: 'Executive briefing intake, 3D Cipher volumetric particle sphere, and readiness telemetry.',
    slug: 'coming-soon',
    iconName: 'Zap',
    tags: ['splash', 'coming soon', 'launch', 'briefing', 'preview', 'initialization']
  }
];

const renderIcon = (name: string) => {
  switch (name) {
    case 'Shield': return <Shield size={18} className="neon-icon" />;
    case 'Cpu': return <Cpu size={18} className="neon-icon" />;
    case 'Lock': return <Lock size={18} className="neon-icon" />;
    case 'Network': return <Network size={18} className="neon-icon" />;
    case 'Compass': return <Compass size={18} className="neon-icon" />;
    case 'Zap': return <Zap size={18} className="neon-icon" />;
    case 'Activity': return <Activity size={18} className="neon-icon" />;
    case 'Briefcase': return <Briefcase size={18} className="neon-icon" />;
    case 'FileText': return <FileText size={18} className="neon-icon" />;
    case 'BookOpen': return <BookOpen size={18} className="neon-icon" />;
    case 'HelpCircle': return <HelpCircle size={18} className="neon-icon" />;
    default: return <Layers size={18} className="neon-icon" />;
  }
};

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return SEARCH_DATABASE;
    const lower = query.toLowerCase();
    return SEARCH_DATABASE.filter(item => 
      item.title.toLowerCase().includes(lower) ||
      item.description.toLowerCase().includes(lower) ||
      item.category.toLowerCase().includes(lower) ||
      item.tags.some(t => t.toLowerCase().includes(lower))
    );
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const handleSelect = (item: SearchItem) => {
    onNavigate(item.slug);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="cmd-palette-backdrop" onClick={onClose}>
      <div className="cmd-palette-dialog baseline-card" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-palette-search-wrap">
          <Search size={20} className="neon-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, product, simulator, or protocol..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="cmd-palette-input"
          />
          <button className="cmd-palette-esc-badge" onClick={onClose} aria-label="Close Search">
            ESC
          </button>
        </div>

        <div className="cmd-palette-results" ref={listRef}>
          {filteredItems.length === 0 ? (
            <div className="cmd-palette-empty">
              <span>No telemetry matches found for "{query}"</span>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`cmd-palette-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="cmd-palette-item-icon">
                    {renderIcon(item.iconName)}
                  </div>
                  <div className="cmd-palette-item-content">
                    <div className="cmd-palette-item-top">
                      <span className="cmd-palette-item-title">{item.title}</span>
                      <span className="cmd-palette-category-badge">{item.category}</span>
                    </div>
                    <p className="cmd-palette-item-desc">{item.description}</p>
                  </div>
                  <ArrowRight size={16} className={`cmd-palette-arrow ${isSelected ? 'visible' : ''}`} />
                </div>
              );
            })
          )}
        </div>

        <div className="cmd-palette-footer">
          <div className="cmd-palette-shortcuts">
            <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Select</span>
            <span><kbd>esc</kbd> Dismiss</span>
          </div>
          <span className="cmd-palette-brand">// LYCOS CORE INTELLIGENCE ROUTER</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
