import { useState, useEffect } from 'react';
import { Calculator, ShieldCheck, ShieldAlert, DollarSign, TrendingUp } from 'lucide-react';
import { fetchCalculatorConfig } from '../utils/calculatorConfig';
import { useRegion } from '../context/RegionContext';

export default function AegisROISimulator() {
  const { formatCurrency, country } = useRegion();

  // 1. State Inputs with operational defaults and bounds
  const [recordsHeld, setRecordsHeld] = useState<number>(15000);         // N_rec
  const [costPerRecord, setCostPerRecord] = useState<number>(165);       // C_rec
  const [auditOverhead, setAuditOverhead] = useState<number>(45000);     // A_o
  const [incidentProbability, setIncidentProbability] = useState<number>(4); // P_i
  const [reductionEfficacy, setReductionEfficacy] = useState<number>(95); // E_r
  const [monthlyCost, setMonthlyCost] = useState<number>(3500);          // G_c

  // Fetch live published Google Sheet configuration on mount
  useEffect(() => {
    fetchCalculatorConfig('Aegis').then(cfg => {
      if (cfg) {
        if (typeof cfg.records_held?.Default_Value === 'number') setRecordsHeld(cfg.records_held.Default_Value);
        if (typeof cfg.cost_per_record?.Default_Value === 'number') setCostPerRecord(cfg.cost_per_record.Default_Value);
        if (typeof cfg.audit_overhead?.Default_Value === 'number') setAuditOverhead(cfg.audit_overhead.Default_Value);
        if (typeof cfg.incident_probability?.Default_Value === 'number') setIncidentProbability(cfg.incident_probability.Default_Value);
        if (typeof cfg.reduction_efficacy?.Default_Value === 'number') setReductionEfficacy(cfg.reduction_efficacy.Default_Value);
        if (typeof cfg.monthly_cost?.Default_Value === 'number') setMonthlyCost(cfg.monthly_cost.Default_Value);
      }
    });
  }, []);

  // 2. Calculation States
  const [mitigatedExposure, setMitigatedExposure] = useState<number>(0); // S_r
  const [auditSavings, setAuditSavings] = useState<number>(0);           // S_c
  const [annualInvestment, setAnnualInvestment] = useState<number>(0);   // I_annual
  const [totalBenefit, setTotalBenefit] = useState<number>(0);           // B_total
  const [netRoi, setNetRoi] = useState<number>(0);                       // ROI_net

  useEffect(() => {
    // ALE = (N_rec * C_rec) * (P_i / 100)
    const calcAle = (recordsHeld * costPerRecord) * (incidentProbability / 100);

    // S_r = ALE * (E_r / 100)
    const calcS_r = calcAle * (reductionEfficacy / 100);
    setMitigatedExposure(calcS_r);

    // S_c = A_o * 0.50
    const calcS_c = auditOverhead * 0.50;
    setAuditSavings(calcS_c);

    // I_annual = G_c * 12
    const calcI_annual = monthlyCost * 12;
    setAnnualInvestment(calcI_annual);

    // B_total = S_r + S_c
    const calcB_total = calcS_r + calcS_c;
    setTotalBenefit(calcB_total);

    // ROI_net = ((B_total - I_annual) / I_annual) * 100
    if (calcI_annual > 0) {
      const calcRoi = ((calcB_total - calcI_annual) / calcI_annual) * 100;
      setNetRoi(calcRoi);
    } else {
      setNetRoi(0);
    }
  }, [recordsHeld, costPerRecord, auditOverhead, incidentProbability, reductionEfficacy, monthlyCost]);

  // 3. Scale for Chart
  const maxVal = Math.max(annualInvestment, totalBenefit, 1) * 1.15;
  const investmentWidthPct = Math.min(100, Math.max(1, (annualInvestment / maxVal) * 100));
  const benefitWidthPct = Math.min(100, Math.max(1, (totalBenefit / maxVal) * 100));
  const thresholdPct = investmentWidthPct;

  return (
    <div style={{ marginTop: '4rem', marginBottom: '4rem' }}>
      {/* CSS Styles injection for custom range sliders and focus rings */}
      <style>{`
        input[type="range"].aegis-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.08);
          outline: none;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        input[type="range"].aegis-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid #94a3b8;
          cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.15s ease;
        }
        input[type="range"].aegis-slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(138, 157, 248, 0.4);
          transform: scale(1.1);
        }
        input[type="range"].aegis-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid #94a3b8;
          cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.15s ease;
        }
        input[type="range"].aegis-slider:focus::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(138, 157, 248, 0.4);
          transform: scale(1.1);
        }
      `}</style>

      {/* Callout Banner */}
      <div className="glass-panel roi-callout-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
        <div className="roi-callout-text" style={{ maxWidth: '80%' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
            ROI Simulator
          </span>
          <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', color: 'white', margin: '0 0 0.5rem 0' }}>
            "Do not guess your security posture. Calculate it."
          </h3>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
            Model your compliance expenses and data breach risks in real-time to quantify the total actuarial risk-mitigated return of the Lycos Aegis environment.
          </p>
        </div>
        <div className="roi-callout-actions" style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Calculator size={28} />
        </div>
      </div>

      {/* Core Simulator Container */}
      <div className="glass-panel aegis-simulator-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Top: Monotone Horizontal Comparison Chart */}
        <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '1.5rem 2rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'white', margin: 0 }}>Investment vs Risk-Adjusted Benefit</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>Annualized Comparison</span>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0.5rem 0' }}>
            
            {/* Cost Threshold Vertical Line */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${thresholdPct}%`,
              width: '2px',
              borderLeft: '2px dashed rgba(255, 255, 255, 0.35)',
              zIndex: 10,
              transition: 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              <div style={{
                position: 'absolute',
                top: '-18px',
                transform: 'translateX(-50%)',
                fontSize: '0.68rem',
                color: '#a4b3c6',
                whiteSpace: 'nowrap',
                fontWeight: 600,
                background: '#0a192f',
                padding: '0 6px',
                borderRadius: '3px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                Cost Threshold ({formatCurrency(annualInvestment)})
              </div>
            </div>

            {/* Bar 1: Annual Investment */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>Annual Investment (Monthly Cost x 12)</span>
                <span style={{ fontWeight: 600, color: 'white' }}>{formatCurrency(annualInvestment)}</span>
              </div>
              <div style={{ width: '100%', height: '14px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  width: `${investmentWidthPct}%`,
                  height: '100%',
                  background: '#4b5563', // solid mid-gray
                  borderRadius: '3px',
                  transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }} />
              </div>
            </div>

            {/* Bar 2: Total Risk-Adjusted Benefit */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>Total Risk-Adjusted Benefit (Mitigated Exposure + Audit Savings)</span>
                <span style={{ fontWeight: 600, color: '#8a9df8' }}>{formatCurrency(totalBenefit)}</span>
              </div>
              <div style={{ width: '100%', height: '14px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  width: `${benefitWidthPct}%`,
                  height: '100%',
                  background: '#3b82f6', // corporate slate-blue
                  borderRadius: '3px',
                  transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }} />
              </div>
            </div>
            
          </div>
        </div>

        {/* Middle: Actuarial Summary Metrics */}
        <div className="roi-badges-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {/* Mitigated Exposure */}
          <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#8a9df8' }} />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                Mitigated Exposure
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.25rem', marginBottom: 0 }}>
                {formatCurrency(mitigatedExposure)}
              </h3>
            </div>
            <div style={{ color: 'var(--text-gray)', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '0.5rem', borderRadius: '6px' }}>
              <ShieldCheck size={20} />
            </div>
          </div>

          {/* Audit Savings */}
          <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#8CFF32' }} />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                Audit Savings
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.25rem', marginBottom: 0 }}>
                {formatCurrency(auditSavings)}
              </h3>
            </div>
            <div style={{ color: 'var(--text-gray)', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '0.5rem', borderRadius: '6px' }}>
              <DollarSign size={20} />
            </div>
          </div>

          {/* Net ROI */}
          <div style={{ 
            background: netRoi >= 0 ? 'rgba(140,255,50,0.02)' : 'rgba(239,68,68,0.02)', 
            border: netRoi >= 0 ? '1px solid rgba(140,255,50,0.1)' : '1px solid rgba(239,68,68,0.1)', 
            borderRadius: '12px', 
            padding: '1.25rem 1.5rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            position: 'relative', 
            overflow: 'hidden' 
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent)' }} />
            <div>
              <span style={{ fontSize: '0.7rem', color: netRoi >= 0 ? 'var(--accent)' : '#ef4444', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                Net ROI
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: netRoi >= 0 ? 'var(--accent)' : '#ef4444', marginTop: '0.25rem', marginBottom: 0 }}>
                {netRoi.toFixed(1)}%
              </h3>
            </div>
            <div style={{ color: netRoi >= 0 ? 'var(--accent)' : '#ef4444', background: 'rgba(255,255,255,0.01)', border: netRoi >= 0 ? '1px solid rgba(140,255,50,0.15)' : '1px solid rgba(239,68,68,0.15)', padding: '0.5rem', borderRadius: '6px' }}>
              {netRoi >= 0 ? <TrendingUp size={20} /> : <ShieldAlert size={20} />}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }} />

        {/* Bottom: Interactive Sliders (Split into 2 columns) */}
        <div className="roi-sliders-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
          
          {/* Column 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Input 1: Sensitive Records Held */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Sensitive Records Held (N_rec)</label>
                <input 
                  type="number"
                  min="1000"
                  max="500000"
                  value={recordsHeld}
                  onChange={(e) => setRecordsHeld(Math.max(1000, Math.min(500000, Number(e.target.value) || 0)))}
                  style={{ width: '100px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                />
              </div>
              <input 
                type="range" 
                min="1000" 
                max="500000" 
                step="1000"
                value={recordsHeld}
                onChange={(e) => setRecordsHeld(Number(e.target.value))}
                className="aegis-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>1,000</span>
                <span>500,000</span>
              </div>
            </div>

            {/* Input 2: Cost per Compromised Record */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Cost per Compromised Record (C_rec)</label>
                <input 
                  type="number"
                  min="50"
                  max="500"
                  value={costPerRecord}
                  onChange={(e) => setCostPerRecord(Math.max(50, Math.min(500, Number(e.target.value) || 0)))}
                  style={{ width: '100px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                />
              </div>
              <input 
                type="range" 
                min="50" 
                max="500" 
                step="5"
                value={costPerRecord}
                onChange={(e) => setCostPerRecord(Number(e.target.value))}
                className="aegis-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>{formatCurrency(50)}</span>
                <span>{formatCurrency(500)}</span>
              </div>
            </div>

            {/* Input 3: Annual Security Audit Overhead */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Annual Audit Overhead ({country.symbol})</label>
                <input 
                  type="number"
                  min="10000"
                  max="200000"
                  value={auditOverhead}
                  onChange={(e) => setAuditOverhead(Math.max(10000, Math.min(200000, Number(e.target.value) || 0)))}
                  style={{ width: '100px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                />
              </div>
              <input 
                type="range" 
                min="10000" 
                max="200000" 
                step="2500"
                value={auditOverhead}
                onChange={(e) => setAuditOverhead(Number(e.target.value))}
                className="aegis-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>{formatCurrency(10000)}</span>
                <span>{formatCurrency(200000)}</span>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Input 4: Projected Baseline Incident Probability */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Incident Probability (P_i)</label>
                <input 
                  type="number"
                  min="0"
                  max="100"
                  value={incidentProbability}
                  onChange={(e) => setIncidentProbability(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                  style={{ width: '100px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                />
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="1"
                value={incidentProbability}
                onChange={(e) => setIncidentProbability(Number(e.target.value))}
                className="aegis-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Input 5: Risk Reduction Efficacy */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Risk Reduction Efficacy (E_r)</label>
                <input 
                  type="number"
                  min="50"
                  max="100"
                  value={reductionEfficacy}
                  onChange={(e) => setReductionEfficacy(Math.max(50, Math.min(100, Number(e.target.value) || 0)))}
                  style={{ width: '100px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                />
              </div>
              <input 
                type="range" 
                min="50" 
                max="100" 
                step="1"
                value={reductionEfficacy}
                onChange={(e) => setReductionEfficacy(Number(e.target.value))}
                className="aegis-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Input 6: Monthly Aegis Cost */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Monthly Aegis Cost ({country.symbol})</label>
                <input 
                  type="number"
                  min="500"
                  max="15000"
                  value={monthlyCost}
                  onChange={(e) => setMonthlyCost(Math.max(500, Math.min(15000, Number(e.target.value) || 0)))}
                  style={{ width: '100px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                />
              </div>
              <input 
                type="range" 
                min="500" 
                max="15000" 
                step="100"
                value={monthlyCost}
                onChange={(e) => setMonthlyCost(Number(e.target.value))}
                className="aegis-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>{formatCurrency(500)}</span>
                <span>{formatCurrency(15000)}</span>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
}
