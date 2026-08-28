import { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, RefreshCw, AlertTriangle } from 'lucide-react';
import { fetchCalculatorConfig } from '../utils/calculatorConfig';
import { useRegion } from '../context/RegionContext';

export default function SynapseROISimulator() {
  const { formatCurrency, country } = useRegion();

  // 1. State Inputs with operational defaults and bounds
  const [monthlySyncedRecords, setMonthlySyncedRecords] = useState<number>(3500); // R_m (1,000 to 250,000)
  const [timePerSync, setTimePerSync] = useState<number>(15);                     // S_t (1 to 60 minutes)
  const [employeeHourCost, setEmployeeHourCost] = useState<number>(30);           // L_c ($15 to $120)
  const [monthlyDelayedTx, setMonthlyDelayedTx] = useState<number>(120);          // D_m (10 to 5,000)
  const [revenueLeakage, setRevenueLeakage] = useState<number>(75);               // R_l ($10 to $500)
  const [syncAccuracy, setSyncAccuracy] = useState<number>(98);                   // A_s (80% to 100%)
  const [monthlySynapseCost, setMonthlySynapseCost] = useState<number>(2000);      // S_c ($500 to $15,000)

  // Fetch live published Google Sheet configuration on mount
  useEffect(() => {
    fetchCalculatorConfig('Synapse').then(cfg => {
      if (cfg) {
        if (typeof cfg.monthly_synced_records?.Default_Value === 'number') setMonthlySyncedRecords(cfg.monthly_synced_records.Default_Value);
        if (typeof cfg.time_per_sync?.Default_Value === 'number') setTimePerSync(cfg.time_per_sync.Default_Value);
        if (typeof cfg.employee_hour_cost?.Default_Value === 'number') setEmployeeHourCost(cfg.employee_hour_cost.Default_Value);
        if (typeof cfg.monthly_delayed_tx?.Default_Value === 'number') setMonthlyDelayedTx(cfg.monthly_delayed_tx.Default_Value);
        if (typeof cfg.revenue_leakage?.Default_Value === 'number') setRevenueLeakage(cfg.revenue_leakage.Default_Value);
        if (typeof cfg.sync_accuracy?.Default_Value === 'number') setSyncAccuracy(cfg.sync_accuracy.Default_Value);
        if (typeof cfg.monthly_synapse_cost?.Default_Value === 'number') setMonthlySynapseCost(cfg.monthly_synapse_cost.Default_Value);
      }
    });
  }, []);

  // 2. Calculation States
  const [annualSa, setAnnualSa] = useState<number>(0);
  const [annualSr, setAnnualSr] = useState<number>(0);
  const [totalBenefit, setTotalBenefit] = useState<number>(0);
  const [annualInvestment, setAnnualInvestment] = useState<number>(0);
  const [netRoi, setNetRoi] = useState<number>(0);

  useEffect(() => {
    // S_a = ((R_m * (A_s / 100) * S_t) / 60) * L_c * 12
    const s_a = ((monthlySyncedRecords * (syncAccuracy / 100) * timePerSync) / 60) * employeeHourCost * 12;
    setAnnualSa(Math.round(s_a));

    // S_r = (D_m * (A_s / 100) * R_l) * 12
    const s_r = (monthlyDelayedTx * (syncAccuracy / 100) * revenueLeakage) * 12;
    setAnnualSr(Math.round(s_r));

    // B_total = S_a + S_r
    const b_total = s_a + s_r;
    setTotalBenefit(Math.round(b_total));

    // C_annual = S_c * 12
    const c_annual = monthlySynapseCost * 12;
    setAnnualInvestment(c_annual);

    // ROI_net = ((B_total - C_annual) / C_annual) * 100
    if (c_annual > 0) {
      const roi = ((b_total - c_annual) / c_annual) * 100;
      setNetRoi(roi);
    } else {
      setNetRoi(0);
    }
  }, [monthlySyncedRecords, timePerSync, employeeHourCost, monthlyDelayedTx, revenueLeakage, syncAccuracy, monthlySynapseCost]);

  // Scale for comparison chart
  const maxVal = Math.max(annualInvestment, totalBenefit, 1) * 1.15;
  const investmentWidthPct = Math.min(100, Math.max(1, (annualInvestment / maxVal) * 100));
  const benefitWidthPct = Math.min(100, Math.max(1, (totalBenefit / maxVal) * 100));
  const thresholdPct = investmentWidthPct;

  return (
    <div style={{ marginTop: '4rem', marginBottom: '4rem' }}>
      {/* CSS Styles injection for custom range sliders and focus rings */}
      <style>{`
        input[type="range"].synapse-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.08);
          outline: none;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        input[type="range"].synapse-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid #94a3b8;
          cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.15s ease;
        }
        input[type="range"].synapse-slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(140, 255, 50, 0.4);
          transform: scale(1.1);
        }
        input[type="range"].synapse-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid #94a3b8;
          cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.15s ease;
        }
        input[type="range"].synapse-slider:focus::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(140, 255, 50, 0.4);
          transform: scale(1.1);
        }
      `}</style>

      {/* Callout Banner */}
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ maxWidth: '80%' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
            ROI Simulator
          </span>
          <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', color: 'white', margin: '0 0 0.5rem 0' }}>
            "Do not guess your integration efficiency. Calculate it."
          </h3>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
            Model your system synchronization parameters and delayed transaction leakage in real-time to quantify the total reclaimed value of Lycos Synapse.
          </p>
        </div>
        <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Calculator size={28} />
        </div>
      </div>

      {/* Core Simulator Container */}
      <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Top: Monotone Horizontal Comparison Chart */}
        <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '1.5rem 2rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'white', margin: 0 }}>Investment vs Reclaimed Benefit</h4>
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
                  background: '#334155', // deep flat-slate finish
                  borderRadius: '3px',
                  transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }} />
              </div>
            </div>

            {/* Bar 2: Total Reclaimed Benefit */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>Total Reclaimed Benefit (Admin Reclaim + Revenue Recovered)</span>
                <span style={{ fontWeight: 600, color: '#3b82f6' }}>{formatCurrency(totalBenefit)}</span>
              </div>
              <div style={{ width: '100%', height: '14px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  width: `${benefitWidthPct}%`,
                  height: '100%',
                  background: '#3b82f6', // solid brand-aligned blue
                  borderRadius: '3px',
                  transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }} />
              </div>
            </div>
            
          </div>
        </div>

        {/* Middle: Actuarial Summary Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {/* Annual Reclaim */}
          <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#3b82f6' }} />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                Annual Reclaim
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.25rem', marginBottom: 0 }}>
                {formatCurrency(annualSa)}
              </h3>
            </div>
            <div style={{ color: 'var(--text-gray)', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '0.5rem', borderRadius: '6px' }}>
              <RefreshCw size={20} />
            </div>
          </div>

          {/* Revenue Recovered */}
          <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#8CFF32' }} />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                Revenue Recovered
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.25rem', marginBottom: 0 }}>
                {formatCurrency(annualSr)}
              </h3>
            </div>
            <div style={{ color: 'var(--text-gray)', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '0.5rem', borderRadius: '6px' }}>
              <DollarSign size={20} />
            </div>
          </div>

          {/* Total Net ROI */}
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
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: netRoi >= 0 ? 'var(--accent)' : '#ef4444' }} />
            <div>
              <span style={{ fontSize: '0.7rem', color: netRoi >= 0 ? 'var(--accent)' : '#ef4444', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Total Net ROI 
                {netRoi >= 500 && (
                  <span style={{ fontSize: '0.6rem', background: 'var(--accent)', color: 'black', padding: '1px 4px', borderRadius: '3px', fontWeight: 800 }}>
                    (High Perf)
                  </span>
                )}
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: netRoi >= 0 ? 'var(--accent)' : '#ef4444', marginTop: '0.25rem', marginBottom: 0 }}>
                {netRoi.toFixed(1)}%
              </h3>
            </div>
            <div style={{ color: netRoi >= 0 ? 'var(--accent)' : '#ef4444', background: 'rgba(255,255,255,0.01)', border: netRoi >= 0 ? '1px solid rgba(140,255,50,0.15)' : '1px solid rgba(239,68,68,0.15)', padding: '0.5rem', borderRadius: '6px' }}>
              {netRoi >= 0 ? <TrendingUp size={20} /> : <AlertTriangle size={20} />}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }} />

        {/* Bottom: Interactive Sliders (Split into 2 columns) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
          
          {/* Column 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Input 1: Monthly Synced Records */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Monthly Synced Records (R_m)</label>
                <input 
                  type="number"
                  min="1000"
                  max="250000"
                  value={monthlySyncedRecords}
                  onChange={(e) => setMonthlySyncedRecords(Math.max(1000, Math.min(250000, Number(e.target.value) || 0)))}
                  style={{ width: '100px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                />
              </div>
              <input 
                type="range" 
                min="1000" 
                max="250000" 
                step="1000"
                value={monthlySyncedRecords}
                onChange={(e) => setMonthlySyncedRecords(Number(e.target.value))}
                className="synapse-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>1,000</span>
                <span>250,000</span>
              </div>
            </div>

            {/* Input 2: Time Spent per Manual Sync */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Time Spent per Manual Sync (S_t)</label>
                <span style={{ fontSize: '0.85rem', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem' }}>
                  {timePerSync} min
                </span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="60" 
                step="1"
                value={timePerSync}
                onChange={(e) => setTimePerSync(Number(e.target.value))}
                className="synapse-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>1 min</span>
                <span>60 min</span>
              </div>
            </div>

            {/* Input 3: Fully-Loaded Cost per Employee Hour */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Cost per Employee Hour ({country.symbol})</label>
                <input 
                  type="number"
                  min="15"
                  max="120"
                  value={employeeHourCost}
                  onChange={(e) => setEmployeeHourCost(Math.max(15, Math.min(120, Number(e.target.value) || 0)))}
                  style={{ width: '100px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                />
              </div>
              <input 
                type="range" 
                min="15" 
                max="120" 
                step="1"
                value={employeeHourCost}
                onChange={(e) => setEmployeeHourCost(Number(e.target.value))}
                className="synapse-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>{formatCurrency(15)}/hr</span>
                <span>{formatCurrency(120)}/hr</span>
              </div>
            </div>

            {/* Input 4: Sync Accuracy Rate */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Sync Accuracy Rate (A_s)</label>
                <span style={{ fontSize: '0.85rem', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem' }}>
                  {syncAccuracy}%
                </span>
              </div>
              <input 
                type="range" 
                min="80" 
                max="100" 
                step="1"
                value={syncAccuracy}
                onChange={(e) => setSyncAccuracy(Number(e.target.value))}
                className="synapse-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>80%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Input 5: Monthly Delayed Transactions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Monthly Delayed Transactions (D_m)</label>
                <input 
                  type="number"
                  min="10"
                  max="5000"
                  value={monthlyDelayedTx}
                  onChange={(e) => setMonthlyDelayedTx(Math.max(10, Math.min(5000, Number(e.target.value) || 0)))}
                  style={{ width: '100px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                />
              </div>
              <input 
                type="range" 
                min="10" 
                max="5000" 
                step="10"
                value={monthlyDelayedTx}
                onChange={(e) => setMonthlyDelayedTx(Number(e.target.value))}
                className="synapse-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>10</span>
                <span>5,000</span>
              </div>
            </div>

            {/* Input 6: Average Revenue Leakage per Delay */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Average Revenue Leakage (R_l)</label>
                <span style={{ fontSize: '0.85rem', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem' }}>
                  {formatCurrency(revenueLeakage)}
                </span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="500" 
                step="5"
                value={revenueLeakage}
                onChange={(e) => setRevenueLeakage(Number(e.target.value))}
                className="synapse-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>{formatCurrency(10)}</span>
                <span>{formatCurrency(500)}</span>
              </div>
            </div>

            {/* Input 7: Monthly Synapse Platform Cost */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Monthly Synapse Cost ({country.symbol})</label>
                <input 
                  type="number"
                  min="500"
                  max="15000"
                  value={monthlySynapseCost}
                  onChange={(e) => setMonthlySynapseCost(Math.max(500, Math.min(15000, Number(e.target.value) || 0)))}
                  style={{ width: '100px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                />
              </div>
              <input 
                type="range" 
                min="500" 
                max="15000" 
                step="100"
                value={monthlySynapseCost}
                onChange={(e) => setMonthlySynapseCost(Number(e.target.value))}
                className="synapse-slider"
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
