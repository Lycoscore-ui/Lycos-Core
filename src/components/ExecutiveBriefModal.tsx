import React from 'react';
import { X, Printer, Shield, CheckCircle2 } from 'lucide-react';
import { useRegion } from '../context/RegionContext';

export interface SimulatorBriefData {
  productName: string;
  tagline: string;
  metrics: { label: string; value: string; isHighlight?: boolean }[];
  inputs: { label: string; value: string }[];
  calculatedOutputs: { label: string; value: string; highlight?: boolean }[];
}

interface ExecutiveBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: SimulatorBriefData | null;
}

export const ExecutiveBriefModal: React.FC<ExecutiveBriefModalProps> = ({ isOpen, onClose, data }) => {
  const { country, continent } = useRegion();

  if (!isOpen || !data) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="exec-brief-backdrop" onClick={onClose}>
      <div className="exec-brief-dialog baseline-card" onClick={(e) => e.stopPropagation()}>
        {/* Header Actions */}
        <div className="exec-brief-action-bar no-print">
          <div className="exec-brief-brand">
            <Shield size={18} className="neon-icon" />
            <span>EXECUTIVE ROI SIMULATION BRIEF // CONFIDENTIAL</span>
          </div>
          <div className="exec-brief-actions">
            <button className="cta-primary exec-print-btn" onClick={handlePrint}>
              <Printer size={15} /> PRINT / SAVE AS PDF
            </button>
            <button className="exec-close-btn" onClick={onClose} aria-label="Close Modal">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Document Content */}
        <div className="exec-brief-document">
          {/* Document Header */}
          <div className="exec-doc-header">
            <div>
              <div className="eyebrow-tagline-green">// LYCOS CORE ENTERPRISE INTELLIGENCE</div>
              <h2 className="exec-doc-title">{data.productName} ROI Projection<span className="brand-dot">.</span></h2>
              <p className="exec-doc-subtitle">{data.tagline}</p>
            </div>
            <div className="exec-doc-meta">
              <div className="exec-meta-item">
                <span className="exec-meta-label">TERRITORY:</span>
                <span className="exec-meta-val">{country.name} ({continent})</span>
              </div>
              <div className="exec-meta-item">
                <span className="exec-meta-label">CURRENCY:</span>
                <span className="exec-meta-val">{country.currency} ({country.symbol})</span>
              </div>
              <div className="exec-meta-item">
                <span className="exec-meta-label">DATE:</span>
                <span className="exec-meta-val">{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
          </div>

          {/* Key Metric Highlights */}
          <div className="exec-doc-metrics-grid">
            {data.metrics.map((m, idx) => (
              <div key={idx} className="exec-doc-metric-box">
                <div className="exec-metric-val">{m.value}</div>
                <div className="exec-metric-label">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Two-Column Breakdown */}
          <div className="exec-doc-breakdown-grid">
            {/* Column 1: Configured Inputs */}
            <div className="exec-doc-column">
              <h4 className="exec-column-title">Calibrated Enterprise Inputs</h4>
              <div className="exec-doc-table">
                {data.inputs.map((inp, idx) => (
                  <div key={idx} className="exec-table-row">
                    <span className="exec-row-label">{inp.label}</span>
                    <span className="exec-row-value">{inp.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Calculated Yield Outputs */}
            <div className="exec-doc-column">
              <h4 className="exec-column-title">Projected Yield and Financial Returns</h4>
              <div className="exec-doc-table">
                {data.calculatedOutputs.map((out, idx) => (
                  <div key={idx} className={`exec-table-row ${out.highlight ? 'highlight' : ''}`}>
                    <span className="exec-row-label">{out.label}</span>
                    <span className="exec-row-value">{out.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compliance & Assurance Seal */}
          <div className="exec-doc-seal-box">
            <div className="exec-seal-header">
              <CheckCircle2 size={16} className="neon-icon" />
              <span>Zero-Trust Assurance and Compliance Protocol</span>
            </div>
            <p className="exec-seal-desc">
              Projections modeled under sovereign zero-trust isolation. Architectures align directly with EU AI Act, NIST AI RMF, and SOC 2 Type II governance frameworks. Figures are illustrative based on telemetry inputs.
            </p>
          </div>

          {/* Footer */}
          <div className="exec-doc-footer">
            <span>© 2026 Lycos Core LLC. All rights reserved.</span>
            <span>https://lycos-core.local</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveBriefModal;
