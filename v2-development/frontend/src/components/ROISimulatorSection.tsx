import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Clock, ShieldCheck, FileDown } from 'lucide-react';
import { fetchCalculatorConfig } from '../utils/calculatorConfig';
import { useRegion } from '../context/RegionContext';
import ExecutiveBriefModal, { type SimulatorBriefData } from './ExecutiveBriefModal';

export default function ROISimulatorSection() {
  const { formatCurrency, country } = useRegion();
  const [isBriefOpen, setIsBriefOpen] = useState(false);

  // 1. Inputs with operational baselines
  const [monthlyVolume, setMonthlyVolume] = useState<number>(8000); // SV_m
  const [costPerTicket, setCostPerTicket] = useState<number>(12);   // C_t
  const [deflectionRate, setDeflectionRate] = useState<number>(55); // D_r (as percentage)
  const [avgHandlingTime, setAvgHandlingTime] = useState<number>(12); // T_aht (in minutes)
  const [sentinelCost, setSentinelCost] = useState<number>(1500);   // M_c

  // Fetch live published Google Sheet configuration on mount
  useEffect(() => {
    fetchCalculatorConfig('Sentinel').then(cfg => {
      if (cfg) {
        if (typeof cfg.monthly_volume?.Default_Value === 'number') setMonthlyVolume(cfg.monthly_volume.Default_Value);
        if (typeof cfg.cost_per_ticket?.Default_Value === 'number') setCostPerTicket(cfg.cost_per_ticket.Default_Value);
        if (typeof cfg.deflection_rate?.Default_Value === 'number') setDeflectionRate(cfg.deflection_rate.Default_Value);
        if (typeof cfg.avg_handling_time?.Default_Value === 'number') setAvgHandlingTime(cfg.avg_handling_time.Default_Value);
        if (typeof cfg.sentinel_cost?.Default_Value === 'number') setSentinelCost(cfg.sentinel_cost.Default_Value);
      }
    });
  }, []);

  // 2. Calculated state variables
  const [annualNetSavings, setAnnualNetSavings] = useState<number>(0);
  const [reclaimedCapacity, setReclaimedCapacity] = useState<number>(0);
  const [annualRoi, setAnnualRoi] = useState<number>(0);

  useEffect(() => {
    // A. Monthly Deflected Ticket Savings (Sm = Vm * Dr * Ct)
    const monthlySavings = monthlyVolume * (deflectionRate / 100) * costPerTicket;
    
    // Annual Gross Savings = Sm * 12
    const annualGrossSavings = monthlySavings * 12;
    // Annual Sentinel Cost = Mc * 12
    const annualSentinelCost = sentinelCost * 12;

    // Annual Net Savings = Annual Gross Savings - Annual Sentinel Cost
    const netSavings = Math.max(0, annualGrossSavings - annualSentinelCost);
    setAnnualNetSavings(netSavings);

    // B. Reclaimed Human Capacity (Hr = (Vm * Dr * Taht) / 60) * 12 (for Annual hours reclaimed)
    const monthlyHours = (monthlyVolume * (deflectionRate / 100) * avgHandlingTime) / 60;
    const annualHours = Math.round(monthlyHours * 12);
    setReclaimedCapacity(annualHours);

    // C. Net Annual ROI = (((Sm * 12) - (Mc * 12)) / (Mc * 12)) * 100
    if (annualSentinelCost > 0) {
      const netRoiPct = ((annualGrossSavings - annualSentinelCost) / annualSentinelCost) * 100;
      setAnnualRoi(Math.round(netRoiPct));
    } else {
      setAnnualRoi(0);
    }
  }, [monthlyVolume, costPerTicket, deflectionRate, avgHandlingTime, sentinelCost]);

  const briefData: SimulatorBriefData = {
    productName: 'Lycos Sentinel',
    tagline: 'Autonomous Customer Operations and Resolution Deflection Engine',
    metrics: [
      { label: 'Annual Net Savings', value: formatCurrency(annualNetSavings), isHighlight: true },
      { label: 'Reclaimed Capacity', value: `${reclaimedCapacity.toLocaleString()} hrs / yr` },
      { label: 'Annual Net ROI', value: `${annualRoi}%` },
    ],
    inputs: [
      { label: 'Monthly Ticket Volume', value: `${monthlyVolume.toLocaleString()} tickets` },
      { label: 'Cost Per Ticket Baseline', value: formatCurrency(costPerTicket) },
      { label: 'Target Deflection Rate', value: `${deflectionRate}%` },
      { label: 'Average Handling Time', value: `${avgHandlingTime} minutes` },
      { label: 'Monthly Sentinel Platform Cost', value: formatCurrency(sentinelCost) },
    ],
    calculatedOutputs: [
      { label: 'Annual Gross Resolution Savings', value: formatCurrency(monthlyVolume * (deflectionRate / 100) * costPerTicket * 12) },
      { label: 'Annual Platform Investment', value: formatCurrency(sentinelCost * 12) },
      { label: 'Annual Net Projected Savings', value: formatCurrency(annualNetSavings), highlight: true },
      { label: 'Total Annual Reclaimed Hours', value: `${reclaimedCapacity.toLocaleString()} hours`, highlight: true },
    ],
  };

  return (
    <div style={{ marginTop: '4rem', marginBottom: '4rem' }}>
      
      {/* Executive Brief Modal */}
      <ExecutiveBriefModal
        isOpen={isBriefOpen}
        onClose={() => setIsBriefOpen(false)}
        data={briefData}
      />

      {/* Callout Banner */}
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ maxWidth: '75%' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
            ROI Simulator
          </span>
          <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', color: 'white', margin: '0 0 0.5rem 0' }}>
            "Do not guess your efficiency. Calculate it."
          </h3>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
            Use our operational simulator below to map your current conversation volume against target deflection rates and instantly see the capital and capacity reclaimed by Lycos Sentinel.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className="cta-secondary"
            onClick={() => setIsBriefOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
          >
            <FileDown size={15} /> EXPORT ROI MODEL (.PDF)
          </button>
          <div style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Calculator size={28} />
          </div>
        </div>
      </div>

      {/* Core Simulator Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '2rem' }}>
        
        {/* LEFT COLUMN: Input Control Panel */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', margin: '0 0 0.5rem 0' }}>
            Operational Baselines
          </h4>

          {/* Input 1: Monthly Volume */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Monthly Volume</label>
              <span style={{ fontSize: '0.85rem', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem' }}>
                {monthlyVolume.toLocaleString()}
              </span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="100000" 
              step="500"
              value={monthlyVolume}
              onChange={(e) => setMonthlyVolume(Number(e.target.value))}
              style={{ width: '100%', height: '6px', borderRadius: '3px', accentColor: 'var(--accent)', background: 'rgba(255,255,255,0.08)', outline: 'none', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
              <span>1,000</span>
              <span>100,000</span>
            </div>
          </div>

          {/* Input 2: Cost per Ticket */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Cost per Ticket ({country.symbol})</label>
              <input 
                type="number"
                min="5"
                max="100"
                value={costPerTicket}
                onChange={(e) => setCostPerTicket(Number(e.target.value))}
                style={{ width: '90px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
              />
            </div>
            <input 
              type="range" 
              min="5" 
              max="100" 
              value={costPerTicket}
              onChange={(e) => setCostPerTicket(Number(e.target.value))}
              style={{ width: '100%', height: '6px', borderRadius: '3px', accentColor: 'var(--accent)', background: 'rgba(255,255,255,0.08)', outline: 'none', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
              <span>{formatCurrency(5)}</span>
              <span>{formatCurrency(100)}</span>
            </div>
          </div>

          {/* Input 3: Target Deflection Rate */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Target Deflection Rate (%)</label>
              <span style={{ fontSize: '0.85rem', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem' }}>
                {deflectionRate}%
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={deflectionRate}
              onChange={(e) => setDeflectionRate(Number(e.target.value))}
              style={{ width: '100%', height: '6px', borderRadius: '3px', accentColor: 'var(--accent)', background: 'rgba(255,255,255,0.08)', outline: 'none', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Input 4: Avg Handling Time */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Avg Handling Time (min)</label>
              <span style={{ fontSize: '0.85rem', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem' }}>
                {avgHandlingTime} min
              </span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="60" 
              value={avgHandlingTime}
              onChange={(e) => setAvgHandlingTime(Number(e.target.value))}
              style={{ width: '100%', height: '6px', borderRadius: '3px', accentColor: 'var(--accent)', background: 'rgba(255,255,255,0.08)', outline: 'none', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
              <span>1 min</span>
              <span>60 min</span>
            </div>
          </div>

          {/* Input 5: Sentinel Cost */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>Sentinel Cost ({country.symbol}/mo)</label>
              <input 
                type="number"
                min="500"
                max="10000"
                step="100"
                value={sentinelCost}
                onChange={(e) => setSentinelCost(Number(e.target.value))}
                style={{ width: '90px', textAlign: 'right', fontFamily: 'var(--font-title)', color: 'white', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
              />
            </div>
            <input 
              type="range" 
              min="500" 
              max="10000" 
              step="250"
              value={sentinelCost}
              onChange={(e) => setSentinelCost(Number(e.target.value))}
              style={{ width: '100%', height: '6px', borderRadius: '3px', accentColor: 'var(--accent)', background: 'rgba(255,255,255,0.08)', outline: 'none', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
              <span>{formatCurrency(500)}/mo</span>
              <span>{formatCurrency(10000)}/mo</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Dashboard Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Metric Card 1: Annual Net Savings */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent)' }} />
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, margin: 0 }}>
                Annual Net Savings
              </p>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.25rem', margin: '0.25rem 0 0 0' }}>
                {formatCurrency(annualNetSavings)}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.4rem', margin: '0.4rem 0 0 0' }}>
                Gross savings minus Sentinel licensing.
              </p>
            </div>
            <div style={{ color: 'var(--text-gray)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
              <TrendingUp size={20} />
            </div>
          </div>

          {/* Metric Card 2: Reclaimed Capacity */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent)' }} />
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, margin: 0 }}>
                Reclaimed Capacity
              </p>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: 'white', marginTop: '0.25rem', margin: '0.25rem 0 0 0' }}>
                {reclaimedCapacity.toLocaleString()} hrs
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.4rem', margin: '0.4rem 0 0 0' }}>
                Human hours redirected to complex tasks.
              </p>
            </div>
            <div style={{ color: 'var(--text-gray)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
              <Clock size={20} />
            </div>
          </div>

          {/* Metric Card 3: Annual Net ROI */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden', background: annualRoi >= 0 ? 'rgba(163,255,51,0.03)' : 'rgba(239,68,68,0.03)', border: annualRoi >= 0 ? '1px solid rgba(163,255,51,0.15)' : '1px solid rgba(239,68,68,0.15)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: annualRoi >= 0 ? 'var(--accent)' : '#ef4444' }} />
            <div>
              <p style={{ fontSize: '0.75rem', color: annualRoi >= 0 ? 'var(--accent)' : '#ef4444', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, margin: 0 }}>
                Annual Net ROI
              </p>
              <h3 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: annualRoi >= 0 ? 'var(--accent)' : '#ef4444', marginTop: '0.25rem', margin: '0.25rem 0 0 0' }}>
                {annualRoi.toLocaleString()}%
              </h3>
              <p style={{ fontSize: '0.75rem', color: annualRoi >= 0 ? 'rgba(163,255,51,0.6)' : 'rgba(239,68,68,0.6)', marginTop: '0.4rem', margin: '0.4rem 0 0 0' }}>
                Return on Sentinel investment.
              </p>
            </div>
            <div style={{ color: annualRoi >= 0 ? 'var(--accent)' : '#ef4444', background: 'rgba(255,255,255,0.02)', border: annualRoi >= 0 ? '1px solid var(--accent)' : '1px solid #ef4444', padding: '0.5rem', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
              <ShieldCheck size={20} />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
