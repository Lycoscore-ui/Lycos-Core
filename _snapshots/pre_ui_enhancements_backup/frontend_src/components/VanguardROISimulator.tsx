import { useState, useEffect } from 'react';
import { TrendingUp, Coins, Compass, Activity, ShieldAlert } from 'lucide-react';
import { fetchCalculatorConfig } from '../utils/calculatorConfig';
import { useRegion } from '../context/RegionContext';

export default function VanguardROISimulator() {
  const { formatCurrency, country } = useRegion();

  // 1. State Inputs with operational defaults and bounds
  const [workingCapital, setWorkingCapital] = useState<number>(3500000);     // W_c
  const [carryingCostRate, setCarryingCostRate] = useState<number>(28);       // H_r
  const [forecastErrorRate, setForecastErrorRate] = useState<number>(22);     // E_f
  const [idleCost, setIdleCost] = useState<number>(12500);                  // I_m
  const [outOfStockCost, setOutOfStockCost] = useState<number>(18000);          // C_o
  const [accuracyBoost, setAccuracyBoost] = useState<number>(45);            // B_a
  const [platformCost, setPlatformCost] = useState<number>(3000);            // H_c

  // Fetch live published Google Sheet configuration on mount
  useEffect(() => {
    fetchCalculatorConfig('Vanguard').then(cfg => {
      if (cfg) {
        if (typeof cfg.working_capital?.Default_Value === 'number') setWorkingCapital(cfg.working_capital.Default_Value);
        if (typeof cfg.carrying_cost_rate?.Default_Value === 'number') setCarryingCostRate(cfg.carrying_cost_rate.Default_Value);
        if (typeof cfg.forecast_error_rate?.Default_Value === 'number') setForecastErrorRate(cfg.forecast_error_rate.Default_Value);
        if (typeof cfg.idle_cost?.Default_Value === 'number') setIdleCost(cfg.idle_cost.Default_Value);
        if (typeof cfg.out_of_stock_cost?.Default_Value === 'number') setOutOfStockCost(cfg.out_of_stock_cost.Default_Value);
        if (typeof cfg.accuracy_boost?.Default_Value === 'number') setAccuracyBoost(cfg.accuracy_boost.Default_Value);
        if (typeof cfg.platform_cost?.Default_Value === 'number') setPlatformCost(cfg.platform_cost.Default_Value);
      }
    });
  }, []);

  // 2. Calculation States
  const [workingCapitalReclaimed, setWorkingCapitalReclaimed] = useState<number>(0); // S_w
  const [demandCapacityRecovery, setDemandCapacityRecovery] = useState<number>(0);   // S_c
  const [totalGrossBenefit, setTotalGrossBenefit] = useState<number>(0);             // B_total
  const [annualVanguardCost, setAnnualVanguardCost] = useState<number>(0);             // I_annual
  const [netEconomicImpact, setNetEconomicImpact] = useState<number>(0);             // Impact_net
  const [netRoi, setNetRoi] = useState<number>(0);                                   // ROI_net

  useEffect(() => {
    // S_w = (W_c * (E_f / 100) * (B_a / 100)) * (H_r / 100)
    const s_w = (workingCapital * (forecastErrorRate / 100) * (accuracyBoost / 100)) * (carryingCostRate / 100);
    setWorkingCapitalReclaimed(Math.round(s_w));

    // S_c = ((I_m + C_o) * 12) * (B_a / 100)
    const s_c = ((idleCost + outOfStockCost) * 12) * (accuracyBoost / 100);
    setDemandCapacityRecovery(Math.round(s_c));

    // B_total = S_w + S_c
    const b_total = s_w + s_c;
    setTotalGrossBenefit(Math.round(b_total));

    // I_annual = H_c * 12
    const i_annual = platformCost * 12;
    setAnnualVanguardCost(Math.round(i_annual));

    // Impact_net = B_total - I_annual
    const impact_net = b_total - i_annual;
    setNetEconomicImpact(Math.round(impact_net));

    // ROI_net = ((B_total - I_annual) / I_annual) * 100
    if (i_annual > 0) {
      const roi = ((b_total - i_annual) / i_annual) * 100;
      setNetRoi(roi);
    } else {
      setNetRoi(0);
    }
  }, [workingCapital, carryingCostRate, forecastErrorRate, idleCost, outOfStockCost, accuracyBoost, platformCost]);

  return (
    <div style={{ marginTop: '4rem', marginBottom: '4rem' }}>
      {/* CSS Styles injection for custom range sliders and focus rings */}
      <style>{`
        input[type="range"].vanguard-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.08);
          outline: none;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        input[type="range"].vanguard-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--accent); /* Neon Lime accent */
          border: 1px solid #94a3b8;
          cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.15s ease;
        }
        input[type="range"].vanguard-slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(163, 255, 51, 0.4);
          transform: scale(1.1);
        }
        input[type="range"].vanguard-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--accent);
          border: 1px solid #94a3b8;
          cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.15s ease;
        }
        input[type="range"].vanguard-slider:focus::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(163, 255, 51, 0.4);
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
            "Do not guess your efficiency. Calculate it."
          </h3>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
            Use our operational simulator below to map your current forecasting parameters against target optimization rates and instantly see the capital and capacity reclaimed by Lycos Vanguard.
          </p>
        </div>
        <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Compass size={28} className="neon-icon" />
        </div>
      </div>

      {/* Core Simulator Container */}
      <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Top: Predictive Impact Table */}
        <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '1.5rem 2rem', overflowX: 'auto' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'white', margin: '0 0 1.25rem 0' }}>Predictive Impact Ledger</h4>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white', fontSize: '0.9rem', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem 1rem', color: 'var(--text-gray)', fontWeight: 600, width: '40%' }}>Dimension and Metric</th>
                <th style={{ padding: '0.75rem 1rem', color: 'var(--text-gray)', fontWeight: 600, width: '35%' }}>Operational Logic</th>
                <th style={{ padding: '0.75rem 1rem', color: 'var(--text-gray)', fontWeight: 600, textAlign: 'right', width: '13%' }}>Annual Value</th>
                <th style={{ padding: '0.75rem 1rem', color: 'var(--text-gray)', fontWeight: 600, textAlign: 'center', width: '12%' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1: Sw */}
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }}>
                  Inventory Strategy <span style={{ color: 'var(--text-gray)', fontWeight: 400, fontSize: '0.8rem' }}>// Working Capital Optimization</span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-gray)', fontSize: '0.85rem' }}>
                  Reduced carrying costs via forecast precision
                </td>
                <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, color: 'white' }}>
                  {formatCurrency(workingCapitalReclaimed)}
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(163, 255, 51, 0.08)', color: 'var(--accent)', border: '1px solid rgba(163, 255, 51, 0.2)' }}>
                    High Impact
                  </span>
                </td>
              </tr>

              {/* Row 2: Sc */}
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }}>
                  Operations <span style={{ color: 'var(--text-gray)', fontWeight: 400, fontSize: '0.8rem' }}>// Capacity and Demand Alignment</span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-gray)', fontSize: '0.85rem' }}>
                  Avoided idle labor and demand loss
                </td>
                <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, color: 'white' }}>
                  {formatCurrency(demandCapacityRecovery)}
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(163, 255, 51, 0.08)', color: 'var(--accent)', border: '1px solid rgba(163, 255, 51, 0.2)' }}>
                    Operational Yield
                  </span>
                </td>
              </tr>

              {/* Row 3: B_total */}
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }}>
                  Financials <span style={{ color: 'var(--text-gray)', fontWeight: 400, fontSize: '0.8rem' }}>// Total Gross Benefit</span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-gray)', fontSize: '0.85rem' }}>
                  Combined annual operational savings
                </td>
                <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 700, color: 'white' }}>
                  {formatCurrency(totalGrossBenefit)}
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.05)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                    Total Revenue Recovery
                  </span>
                </td>
              </tr>

              {/* Row 4: Cost */}
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }}>
                  Lycos Vanguard Licensing <span style={{ color: 'var(--text-gray)', fontWeight: 400, fontSize: '0.8rem' }}>// Enterprise Engine Tier</span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-gray)', fontSize: '0.85rem' }}>
                  Predictive platform subscription and compute overhead
                </td>
                <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, color: '#f87171' }}>
                  -{formatCurrency(annualVanguardCost)}
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    Software Expense
                  </span>
                </td>
              </tr>

              {/* Row 5: Impact_net */}
              <tr style={{ background: 'rgba(163, 255, 51, 0.01)' }}>
                <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--accent)' }}>
                  Profitability <span style={{ color: 'var(--text-gray)', fontWeight: 400, fontSize: '0.8rem' }}>// Net Annual Economic Impact</span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-gray)', fontSize: '0.85rem' }}>
                  Net value added to EBITA
                </td>
                <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 800, color: 'var(--accent)' }}>
                  {formatCurrency(netEconomicImpact)}
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'var(--accent)', color: 'black' }}>
                    Bottom Line Delta
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Middle: Actuarial Summary Badges */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {/* Badge 1: Sw */}
          <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent)' }} />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                Working Capital Reclaimed
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.25rem', marginBottom: 0 }}>
                {formatCurrency(workingCapitalReclaimed)}
              </h3>
            </div>
            <div style={{ color: 'var(--text-gray)', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '0.5rem', borderRadius: '6px' }}>
              <Coins size={20} className="neon-icon" />
            </div>
          </div>

          {/* Badge 2: Sc */}
          <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent)' }} />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                Capacity and Demand Savings
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.25rem', marginBottom: 0 }}>
                {formatCurrency(demandCapacityRecovery)}
              </h3>
            </div>
            <div style={{ color: 'var(--text-gray)', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '0.5rem', borderRadius: '6px' }}>
              <Activity size={20} className="neon-icon" />
            </div>
          </div>

          {/* Badge 3: ROI net */}
          <div style={{ 
            background: netRoi >= 0 ? 'rgba(163,255,51,0.02)' : 'rgba(239,68,68,0.02)', 
            border: netRoi >= 0 ? '1px solid rgba(163,255,51,0.1)' : '1px solid rgba(239,68,68,0.1)', 
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
              <span style={{ fontSize: '0.7rem', color: netRoi >= 0 ? 'var(--accent)' : '#ef4444', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                Annual Net ROI
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: netRoi >= 0 ? 'var(--accent)' : '#ef4444', marginTop: '0.25rem', marginBottom: 0 }}>
                {netRoi.toFixed(1)}%
              </h3>
            </div>
            <div style={{ color: netRoi >= 0 ? 'var(--accent)' : '#ef4444', background: 'rgba(255,255,255,0.01)', border: netRoi >= 0 ? '1px solid rgba(163,255,51,0.15)' : '1px solid rgba(239,68,68,0.15)', padding: '0.5rem', borderRadius: '6px' }}>
              {netRoi >= 0 ? <TrendingUp size={20} className="neon-icon" /> : <ShieldAlert size={20} style={{ color: '#ef4444' }} />}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }} />

        {/* Bottom: Interactive Sliders (Split into 2 columns) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
          
          {/* Column 1: Working Capital and Forecast Accuracy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Input 1: Annual Working Capital */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Annual Working Capital (W_c)</label>
                <input 
                  type="number"
                  min="100000"
                  max="10000000"
                  value={workingCapital}
                  onChange={(e) => setWorkingCapital(Math.max(100000, Math.min(10000000, Number(e.target.value) || 0)))}
                  style={{ width: '110px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                />
              </div>
              <input 
                type="range" 
                min="100000" 
                max="10000000" 
                step="50000"
                value={workingCapital}
                onChange={(e) => setWorkingCapital(Number(e.target.value))}
                className="vanguard-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>{formatCurrency(100000)}</span>
                <span>{formatCurrency(10000000)}</span>
              </div>
            </div>

            {/* Input 2: Holding/Carrying Cost Rate */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Carrying Cost Rate (H_r)</label>
                <input 
                  type="number"
                  min="0"
                  max="50"
                  value={carryingCostRate}
                  onChange={(e) => setCarryingCostRate(Math.max(0, Math.min(50, Number(e.target.value) || 0)))}
                  style={{ width: '80px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                />
              </div>
              <input 
                type="range" 
                min="0" 
                max="50" 
                step="1"
                value={carryingCostRate}
                onChange={(e) => setCarryingCostRate(Number(e.target.value))}
                className="vanguard-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>0%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Input 3: Current Forecast Error Rate */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Current Forecast Error (E_f)</label>
                <input 
                  type="number"
                  min="0"
                  max="100"
                  value={forecastErrorRate}
                  onChange={(e) => setForecastErrorRate(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                  style={{ width: '80px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                />
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="1"
                value={forecastErrorRate}
                onChange={(e) => setForecastErrorRate(Number(e.target.value))}
                className="vanguard-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Input 4: Accuracy Boost */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Forecast Accuracy Boost (B_a)</label>
                <input 
                  type="number"
                  min="0"
                  max="100"
                  value={accuracyBoost}
                  onChange={(e) => setAccuracyBoost(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                  style={{ width: '80px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                />
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="1"
                value={accuracyBoost}
                onChange={(e) => setAccuracyBoost(Number(e.target.value))}
                className="vanguard-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Column 2: Operations Costs and Platform Subscription */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Input 5: Idle Cost */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Monthly Idle Cost (I_m)</label>
                <input 
                  type="number"
                  min="1000"
                  max="100000"
                  value={idleCost}
                  onChange={(e) => setIdleCost(Math.max(1000, Math.min(100000, Number(e.target.value) || 0)))}
                  style={{ width: '100px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                />
              </div>
              <input 
                type="range" 
                min="1000" 
                max="100000" 
                step="500"
                value={idleCost}
                onChange={(e) => setIdleCost(Number(e.target.value))}
                className="vanguard-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>{formatCurrency(1000)}</span>
                <span>{formatCurrency(100000)}</span>
              </div>
            </div>

            {/* Input 6: Out of stock cost */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Avg Out-of-Stock/Missed Demand (C_o)</label>
                <input 
                  type="number"
                  min="1000"
                  max="100000"
                  value={outOfStockCost}
                  onChange={(e) => setOutOfStockCost(Math.max(1000, Math.min(100000, Number(e.target.value) || 0)))}
                  style={{ width: '100px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                />
              </div>
              <input 
                type="range" 
                min="1000" 
                max="100000" 
                step="500"
                value={outOfStockCost}
                onChange={(e) => setOutOfStockCost(Number(e.target.value))}
                className="vanguard-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                <span>{formatCurrency(1000)}</span>
                <span>{formatCurrency(100000)}</span>
              </div>
            </div>

            {/* Input 7: Platform subscription cost */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Monthly Vanguard Platform Cost ({country.symbol})</label>
                <input 
                  type="number"
                  min="500"
                  max="15000"
                  value={platformCost}
                  onChange={(e) => setPlatformCost(Math.max(500, Math.min(15000, Number(e.target.value) || 0)))}
                  style={{ width: '90px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                />
              </div>
              <input 
                type="range" 
                min="500" 
                max="15000" 
                step="100"
                value={platformCost}
                onChange={(e) => setPlatformCost(Number(e.target.value))}
                className="vanguard-slider"
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
