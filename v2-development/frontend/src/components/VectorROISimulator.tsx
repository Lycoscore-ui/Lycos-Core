import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { fetchCalculatorConfig } from '../utils/calculatorConfig';
import { useRegion } from '../context/RegionContext';

export default function VectorROISimulator() {
  const { formatCurrency, country } = useRegion();

  // 1. Inputs with operational baselines
  const [monthlyTransactions, setMonthlyTransactions] = useState<number>(5000); // T_m
  const [handlingTime, setHandlingTime] = useState<number>(25);                 // H_f (minutes per file)
  const [laborCost, setLaborCost] = useState<number>(30);                       // L_c (hourly rate)
  const [errorRate, setErrorRate] = useState<number>(8);                        // E_r (as percentage)
  const [errorCorrectionCost, setErrorCorrectionCost] = useState<number>(45);   // C_e (cost to fix an error)
  const [automationRate, setAutomationRate] = useState<number>(75);             // A_r (as percentage)
  const [vectorCost, setVectorCost] = useState<number>(2500);               // V_c (monthly system cost)

  // Fetch live published Google Sheet configuration on mount
  useEffect(() => {
    fetchCalculatorConfig('Vector').then(cfg => {
      if (cfg) {
        if (typeof cfg.monthly_transactions?.Default_Value === 'number') setMonthlyTransactions(cfg.monthly_transactions.Default_Value);
        if (typeof cfg.handling_time?.Default_Value === 'number') setHandlingTime(cfg.handling_time.Default_Value);
        if (typeof cfg.labor_cost?.Default_Value === 'number') setLaborCost(cfg.labor_cost.Default_Value);
        if (typeof cfg.error_rate?.Default_Value === 'number') setErrorRate(cfg.error_rate.Default_Value);
        if (typeof cfg.error_correction_cost?.Default_Value === 'number') setErrorCorrectionCost(cfg.error_correction_cost.Default_Value);
        if (typeof cfg.automation_rate?.Default_Value === 'number') setAutomationRate(cfg.automation_rate.Default_Value);
        if (typeof cfg.vector_cost?.Default_Value === 'number') setVectorCost(cfg.vector_cost.Default_Value);
      }
    });
  }, []);

  // 2. Calculated state variables
  const [annualLaborSavings, setAnnualLaborSavings] = useState<number>(0);
  const [annualErrorSavings, setAnnualErrorSavings] = useState<number>(0);
  const [totalAnnualNetRoi, setTotalAnnualNetRoi] = useState<number>(0);

  useEffect(() => {
    // A. Annual Labor Cost Savings: Sl = ((T_m * A_r * H_f) / 60) * L_c * 12
    const laborSavings = ((monthlyTransactions * (automationRate / 100) * handlingTime) / 60) * laborCost * 12;
    setAnnualLaborSavings(Math.round(laborSavings));

    // B. Annual Error Correction Savings: Se = (T_m * A_r * E_r) * C_e * 12
    const errorSavings = (monthlyTransactions * (automationRate / 100) * (errorRate / 100)) * errorCorrectionCost * 12;
    setAnnualErrorSavings(Math.round(errorSavings));

    // C. Net Annual ROI: ROI_net = (((S_l + S_e) - (V_c * 12)) / (V_c * 12)) * 100
    const annualVectorCost = vectorCost * 12;
    const combinedSavings = laborSavings + errorSavings;

    if (annualVectorCost > 0) {
      const netRoiPct = ((combinedSavings - annualVectorCost) / annualVectorCost) * 100;
      setTotalAnnualNetRoi(Math.round(netRoiPct * 10) / 10); // keep one decimal point for exact match (e.g., 2,315.0%)
    } else {
      setTotalAnnualNetRoi(0);
    }
  }, [monthlyTransactions, handlingTime, laborCost, errorRate, errorCorrectionCost, automationRate, vectorCost]);

  return (
    <div style={{ marginTop: '4rem', marginBottom: '4rem' }}>
      
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
            Use our operational simulator below to map your current process parameters against target automation rates and instantly see the capital and capacity reclaimed by Lycos Vector.
          </p>
        </div>
        <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Calculator size={28} />
        </div>
      </div>

      {/* Core Simulator Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '2rem' }}>
        
        {/* LEFT COLUMN: Input Control Panel */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', margin: '0 0 0.5rem 0' }}>
            Manual Processing Bottlenecks
          </h4>

          {/* Input 1: Monthly Transactions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Monthly Transactions</label>
              <input 
                type="number"
                min="1000"
                max="100000"
                value={monthlyTransactions}
                onChange={(e) => setMonthlyTransactions(Number(e.target.value))}
                style={{ width: '90px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
              />
            </div>
            <input 
              type="range" 
              min="1000" 
              max="100000" 
              step="500"
              value={monthlyTransactions}
              onChange={(e) => setMonthlyTransactions(Number(e.target.value))}
              style={{ width: '100%', height: '6px', borderRadius: '3px', accentColor: 'var(--accent)', background: 'rgba(255,255,255,0.08)', outline: 'none', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
              <span>1,000</span>
              <span>100,000</span>
            </div>
          </div>

          {/* Input 2: Handling Time */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Handling Time (min/file)</label>
              <span style={{ fontSize: '0.85rem', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem' }}>
                {handlingTime} min
              </span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="120" 
              value={handlingTime}
              onChange={(e) => setHandlingTime(Number(e.target.value))}
              style={{ width: '100%', height: '6px', borderRadius: '3px', accentColor: 'var(--accent)', background: 'rgba(255,255,255,0.08)', outline: 'none', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
              <span>1 min</span>
              <span>120 min</span>
            </div>
          </div>

          {/* Input 3: Cost per Labor Hour */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Cost per Labor Hour ({country.symbol})</label>
              <input 
                type="number"
                min="5"
                max="150"
                value={laborCost}
                onChange={(e) => setLaborCost(Number(e.target.value))}
                style={{ width: '90px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
              />
            </div>
            <input 
              type="range" 
              min="5" 
              max="150" 
              value={laborCost}
              onChange={(e) => setLaborCost(Number(e.target.value))}
              style={{ width: '100%', height: '6px', borderRadius: '3px', accentColor: 'var(--accent)', background: 'rgba(255,255,255,0.08)', outline: 'none', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
              <span>{formatCurrency(5)}</span>
              <span>{formatCurrency(150)}</span>
            </div>
          </div>

          {/* Input 4: Error Rate */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Error Rate (%)</label>
              <span style={{ fontSize: '0.85rem', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem' }}>
                {errorRate}%
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={errorRate}
              onChange={(e) => setErrorRate(Number(e.target.value))}
              style={{ width: '100%', height: '6px', borderRadius: '3px', accentColor: 'var(--accent)', background: 'rgba(255,255,255,0.08)', outline: 'none', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Input 5: Automation Rate */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Automation Rate (%)</label>
              <span style={{ fontSize: '0.85rem', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem' }}>
                {automationRate}%
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={automationRate}
              onChange={(e) => setAutomationRate(Number(e.target.value))}
              style={{ width: '100%', height: '6px', borderRadius: '3px', accentColor: 'var(--accent)', background: 'rgba(255,255,255,0.08)', outline: 'none', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Input 6: Vector Cost */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Vector Monthly Cost ({country.symbol})</label>
              <input 
                type="number"
                min="500"
                max="20000"
                step="250"
                value={vectorCost}
                onChange={(e) => setVectorCost(Number(e.target.value))}
                style={{ width: '90px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
              />
            </div>
            <input 
              type="range" 
              min="500" 
              max="20000" 
              step="250"
              value={vectorCost}
              onChange={(e) => setVectorCost(Number(e.target.value))}
              style={{ width: '100%', height: '6px', borderRadius: '3px', accentColor: 'var(--accent)', background: 'rgba(255,255,255,0.08)', outline: 'none', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
              <span>{formatCurrency(500)}/mo</span>
              <span>{formatCurrency(20000)}/mo</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Dashboard Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Metric Card 1: Annual Labor Savings */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent)' }} />
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, margin: 0 }}>
                Annual Labor Savings
              </p>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.25rem', margin: '0.25rem 0 0 0' }}>
                {formatCurrency(annualLaborSavings)}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.4rem', margin: '0.4rem 0 0 0' }}>
                Direct human hours freed up by automation.
              </p>
            </div>
            <div style={{ color: 'var(--text-gray)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
              <Clock size={20} />
            </div>
          </div>

          {/* Metric Card 2: Annual Error Savings */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent)' }} />
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, margin: 0 }}>
                Annual Error Savings
              </p>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.25rem', margin: '0.25rem 0 0 0' }}>
                {formatCurrency(annualErrorSavings)}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.4rem', margin: '0.4rem 0 0 0' }}>
                Expenses saved from manual rework and errors.
              </p>
            </div>
            <div style={{ color: 'var(--text-gray)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
              <AlertTriangle size={20} />
            </div>
          </div>

          {/* Metric Card 3: Total Annual Net ROI */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden', background: 'rgba(163,255,51,0.03)', border: '1px solid rgba(163,255,51,0.15)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent)' }} />
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, margin: 0 }}>
                Total Annual Net ROI
              </p>
              <h3 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: 'var(--accent)', marginTop: '0.25rem', margin: '0.25rem 0 0 0' }}>
                {totalAnnualNetRoi.toLocaleString()}%
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'rgba(163,255,51,0.6)', marginTop: '0.4rem', margin: '0.4rem 0 0 0' }}>
                Net return on your pipeline implementation.
              </p>
            </div>
            <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--accent)', padding: '0.5rem', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
              <TrendingUp size={20} />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
