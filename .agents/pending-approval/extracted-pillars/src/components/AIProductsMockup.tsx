/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Brain,
  Cpu,
  Terminal,
  Play,
  AlertOctagon,
  Settings,
  Sliders,
} from 'lucide-react';
import { Agent, AgentLog, AgentBlueprint } from '../types';

export default function AIProductsMockup() {
  // 1. Model Registry
  const models = [
    { name: 'FinSentry-70B-v4', type: 'Financial Compliance LLM', parameters: '70B', latency: '45ms', precision: 'FP16', state: 'active' },
    { name: 'AssetPulse-8B-v2', type: 'Predictive Volatility Predictor', parameters: '8B', latency: '12ms', precision: 'INT8', state: 'active' },
    { name: 'ProtocolGuard-v1', type: 'Intrusion Detection Classifier', parameters: '1.2B', latency: '6ms', precision: 'INT4', state: 'standby' },
  ];

  // 2. Multi-Agent Simulator State
  const bluePrints: AgentBlueprint[] = [
    {
      id: 'bp-audit',
      name: 'Institutional Compliance Auditor',
      description: 'Ingests financial ledger data, flags regulatory drift, and drafts verified compliance declarations.',
      agents: [
        { id: 'ingest', name: 'IngestAgent', role: 'Telemetry Sanitizer', avatar: '📥', color: 'text-white' },
        { id: 'analyzer', name: 'AnalyzeAgent', role: 'Inference Architect', avatar: '🧠', color: 'text-white' },
        { id: 'auditor', name: 'VerifyAgent', role: 'Sandbox Auditor', avatar: '🛡️', color: 'text-white/60' },
      ],
      sampleTasks: [
        'Analyze Q2 transactional flow for BSA Compliance.',
        'Review cross-border assets for potential sanction matches.',
      ],
    },
    {
      id: 'bp-threat',
      name: 'Autonomous Patch Coordinator',
      description: 'Monitors ingress networks, isolates anomalous packet spikes, and automatically crafts firewall guidelines.',
      agents: [
        { id: 'sensor', name: 'SensorAgent', role: 'Traffic Analyst', avatar: '📡', color: 'text-white' },
        { id: 'patcher', name: 'PatchAgent', role: 'Heuristic Deployer', avatar: '🔧', color: 'text-white' },
        { id: 'inspector', name: 'SecureGuard', role: 'Access Supervisor', avatar: '⚖️', color: 'text-white/60' },
      ],
      sampleTasks: [
        'Investigate intermittent cluster latency in Europe-West.',
        'Deploy delta patch to neutralize CVE-2026 stack buffer overflows.',
      ],
    },
  ];

  const [activeBlueprint, setActiveBlueprint] = useState<AgentBlueprint>(bluePrints[0]);
  const [selectedTask, setSelectedTask] = useState<string>(bluePrints[0].sampleTasks[0]);
  const [agentLogs, setAgentLogs] = useState<AgentLog[]>([]);
  const [isRunningWorkspace, setIsRunningWorkspace] = useState(false);
  const [activeTypingAgent, setActiveTypingAgent] = useState<string | null>(null);
  const [workspaceCompleted, setWorkspaceCompleted] = useState(false);

  // Sync selected task when blueprint changes
  const handleBlueprintChange = (bp: AgentBlueprint) => {
    setActiveBlueprint(bp);
    setSelectedTask(bp.sampleTasks[0]);
    setAgentLogs([]);
    setWorkspaceCompleted(false);
  };

  // Run the multi-agent chat simulation
  const handleRunWorkspace = () => {
    setIsRunningWorkspace(true);
    setWorkspaceCompleted(false);
    setAgentLogs([]);

    const steps: Omit<AgentLog, 'id' | 'timestamp'>[] =
      activeBlueprint.id === 'bp-audit'
        ? [
            {
              agentId: 'ingest',
              type: 'tool_call',
              message: 'Calling secure ledger DB gateway... Querying transaction entries containing flag "high_value_transfers".',
              toolUsed: 'query_ledger_db()',
            },
            {
              agentId: 'ingest',
              type: 'chat',
              message: 'Database query successfully fetched 1,480 ledger records. Applying SHA-256 hashing to clear all Personally Identifiable Information (PII) elements. Records clean and ready for analysis.',
            },
            {
              agentId: 'analyzer',
              type: 'thought',
              message: 'Initializing FinSentry-70B model inference... Token budget configured: 4,096 max. Scanning for BSA anomaly thresholds.',
            },
            {
              agentId: 'analyzer',
              type: 'chat',
              message: 'Scanning complete. Identified three anomalous transactions in Cluster-US-East under high_value_transfers. Workloads correlate with unverified offshore routing. Probability score: 94.2%.',
            },
            {
              agentId: 'auditor',
              type: 'tool_call',
              message: 'Creating sandboxed simulation cell to trace routing anomalies. Checking validation signatures.',
              toolUsed: 'sandbox_trace_route()',
            },
            {
              agentId: 'auditor',
              type: 'output',
              message: 'Verification complete. Ledger transactions match known legal compliance boundaries but require human oversight. Drafted automated audit documentation: SEC-BSA-DECL-2026. Ready for review.',
            },
          ]
        : [
            {
              agentId: 'sensor',
              type: 'tool_call',
              message: 'Querying border firewall traffic spikes. Ingress packet filter configured for port 3000.',
              toolUsed: 'read_network_stats()',
            },
            {
              agentId: 'sensor',
              type: 'chat',
              message: 'Spike detected! Ingress traffic on EU-West router increased 400% above threshold. Packet signature points to repeating HTTP recursive payload attempts.',
            },
            {
              agentId: 'patcher',
              type: 'thought',
              message: 'Assessing vulnerability catalog. Correlating signature with CVE-2026-3190 heap overflows. Initiating patch assembly.',
            },
            {
              agentId: 'patcher',
              type: 'chat',
              message: 'Generated temporary firewall restriction rule: DENY /api/v1/* from anomalous IP pool 142.250.0.0/16. Compiling secure delta policy.',
            },
            {
              agentId: 'inspector',
              type: 'tool_call',
              message: 'Loading candidate firewall rules inside container network simulation to test for side-effects.',
              toolUsed: 'sandbox_dry_run()',
            },
            {
              agentId: 'inspector',
              type: 'output',
              message: 'Audit verification PASSED. Core system functionality is unaffected by security deny policy. Rule committed to cloud active edge gateways. Traffic stabilized.',
            },
          ];

    let currentStep = 0;

    const executeNextStep = () => {
      if (currentStep >= steps.length) {
        setIsRunningWorkspace(false);
        setActiveTypingAgent(null);
        setWorkspaceCompleted(true);
        return;
      }

      const step = steps[currentStep];
      setActiveTypingAgent(step.agentId);

      setTimeout(() => {
        const newLog: AgentLog = {
          ...step,
          id: `log-${Date.now()}-${currentStep}`,
          timestamp: new Date().toLocaleTimeString(),
        };

        setAgentLogs((prev) => [...prev, newLog]);
        currentStep++;
        executeNextStep();
      }, 1500);
    };

    executeNextStep();
  };

  // 3. Predictive Analytics Sensitivity Simulator States
  const [anomalySensitivity, setAnomalySensitivity] = useState(70);
  const [forecastHorizon, setForecastHorizon] = useState(12);

  // Raw telemetry curve values
  const telemetryPoints = [
    { x: 1, val: 42, label: '09:00' },
    { x: 2, val: 48, label: '10:00' },
    { x: 3, val: 52, label: '11:00' },
    { x: 4, val: 88, label: '12:00' },
    { x: 5, val: 61, label: '13:00' },
    { x: 6, val: 55, label: '14:00' },
    { x: 7, val: 49, label: '15:00' },
    { x: 8, val: 94, label: '16:00' },
    { x: 9, val: 68, label: '17:00' },
    { x: 10, val: 58, label: '18:00' },
    { x: 11, val: 62, label: '19:00' },
    { x: 12, val: 78, label: '20:00' },
  ];

  const getAnomaliesCount = () => {
    return telemetryPoints.filter((p) => p.val > anomalySensitivity).length;
  };

  return (
    <div id="ai-products-mockup-root" className="space-y-12 pb-16">
      {/* Intro Hero banner */}
      <div className="relative border-b border-white/10 bg-[#050505] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 max-w-3xl">
            <span className="font-mono text-xs font-bold text-white/50 uppercase tracking-[0.2em] block">
              // Pillar Mockup 03
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase italic tracking-tighter">
              AI Products Division
            </h1>
            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
              Proprietary, production-grade AI software, secure agentic workflows, and predictive analytics suites engineered for complex institutional challenges. Test our live model playground.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-white/5 border border-white/20">
            <span className="w-2 h-2 bg-white animate-pulse block" />
            <span className="font-mono text-[10px] font-bold text-white uppercase tracking-widest">
              PROP-AGENTS ONLINE
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SECTION 1: Interactive Multi-Agent Workspace Simulator (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-none border border-white/10 bg-white/[0.01] p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tight">
                  <Brain className="w-5 h-5 text-white" />
                  Secure Agentic Workspace
                </h2>
                <p className="font-sans text-xs text-white/55">
                  Observe proprietary server-authoritative agents coordinate complex institutional audit pipelines safely.
                </p>
              </div>

              {/* Selector blueprint */}
              <div className="flex gap-2 font-mono">
                {bluePrints.map((bp) => (
                  <button
                    key={bp.id}
                    onClick={() => handleBlueprintChange(bp)}
                    disabled={isRunningWorkspace}
                    className={`px-3 py-1.5 rounded-none text-[9px] uppercase font-bold tracking-widest transition-all border cursor-pointer ${
                      activeBlueprint.id === bp.id
                        ? 'bg-white text-black border-transparent'
                        : 'bg-black border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    {bp.id === 'bp-audit' ? 'Compliance' : 'Patching'}
                  </button>
                ))}
              </div>
            </div>

            {/* Task selecting panel */}
            <div className="p-5 rounded-none bg-black/60 border border-white/10 space-y-3">
              <span className="block font-mono text-[8px] text-white/40 uppercase tracking-widest">
                Select Workload Task Specification
              </span>
              <div className="flex flex-col gap-2">
                {activeBlueprint.sampleTasks.map((task) => (
                  <button
                    key={task}
                    onClick={() => setSelectedTask(task)}
                    disabled={isRunningWorkspace}
                    className={`text-left p-2 rounded-none font-sans text-xs flex items-center gap-2 border transition-all cursor-pointer ${
                      selectedTask === task
                        ? 'bg-white/5 border-white/20 text-white font-bold'
                        : 'bg-transparent border-transparent text-white/40 hover:text-white/60'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 ${selectedTask === task ? 'bg-white' : 'bg-white/10'}`} />
                    {task}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulator Dialog Output Box */}
            <div className="rounded-none border border-white/10 bg-black/40 p-5 space-y-4 min-h-[250px] max-h-[350px] overflow-y-auto">
              {agentLogs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-3 text-white/30 font-mono text-xs uppercase tracking-widest">
                  <Cpu className="w-8 h-8 text-white/20 animate-pulse" />
                  <span>
                    No active processes in sandbox. Click run to launch.
                  </span>
                </div>
              ) : (
                <div className="space-y-4">
                  {agentLogs.map((log) => {
                    const agent = activeBlueprint.agents.find((a) => a.id === log.agentId) || activeBlueprint.agents[0];
                    return (
                      <div
                        key={log.id}
                        className={`p-4 rounded-none border transition-all flex flex-col gap-2 ${
                          log.type === 'tool_call'
                            ? 'bg-white/[0.02] border-white/20'
                            : log.type === 'output'
                            ? 'bg-white/5 border-emerald-500/20'
                            : log.type === 'thought'
                            ? 'bg-white/[0.01] border-white/10 border-dashed'
                            : 'bg-black/60 border-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                              {agent.name}
                            </span>
                            <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest">
                              ({agent.role})
                            </span>
                          </div>
                          <span className="font-mono text-[8px] text-white/30">
                            {log.timestamp} • {log.type.toUpperCase()}
                          </span>
                        </div>

                        <p className="font-sans text-xs text-white/70 leading-relaxed">
                          {log.message}
                        </p>

                        {log.toolUsed && (
                          <div className="mt-1 inline-flex items-center gap-1.5 font-mono text-[8px] text-white bg-white/5 px-2 py-1 rounded-none border border-white/20 self-start uppercase tracking-widest">
                            <Terminal className="w-3 h-3" />
                            EXEC: {log.toolUsed}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {activeTypingAgent && (
                    <div className="flex items-center gap-2 p-2 font-mono text-[8px] text-white/40 uppercase tracking-widest">
                      <span className="inline-block w-1.5 h-1.5 bg-white animate-ping" />
                      <span>
                        {activeBlueprint.agents.find((a) => a.id === activeTypingAgent)?.name} is calculating next decision...
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Simulated report payout */}
            {workspaceCompleted && (
              <div className="p-4 rounded-none bg-emerald-500/5 border border-emerald-500/20 space-y-2 animate-[fadeIn_0.5s_ease-out]">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                  ✓ Cognitive Task Completed
                </div>
                <p className="font-sans text-xs text-white/60 leading-relaxed">
                  Final compliance report compiled and signed. SHA-256 state matching payload generated: <span className="font-mono text-white font-bold">a9d82c...91a0c</span>.
                </p>
              </div>
            )}

            {/* Run control triggers */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4 gap-4">
              <span className="font-sans text-[10px] text-white/45">
                Agent orchestration utilizes a secure multi-region consensus model.
              </span>
              <button
                id="btn-run-agentic-workspace"
                onClick={handleRunWorkspace}
                disabled={isRunningWorkspace}
                className="px-6 py-4 rounded-none bg-white text-black font-mono font-bold text-[10px] uppercase tracking-[0.25em] flex items-center gap-2 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                {isRunningWorkspace ? 'Orchestrating...' : 'Run Cognitive Workspace'}
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: Model Registry (1 col) */}
        <div className="space-y-6">
          <div className="rounded-none border border-white/10 bg-white/[0.01] p-8 space-y-4 shadow-2xl h-full flex flex-col justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tight">
                <Cpu className="w-5 h-5 text-white" />
                Model Registry
              </h2>
              <p className="font-sans text-xs text-white/55">
                Proprietary pre-trained LLMs tuned for institutional workloads.
              </p>
            </div>

            <div className="space-y-3 flex-1 pt-6">
              {models.map((mod, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-none bg-black/40 border border-white/5 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">{mod.name}</span>
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-none font-mono text-[8px] font-bold uppercase ${
                        mod.state === 'active' ? 'bg-emerald-500/5 text-emerald-400 border border-emerald-500/10' : 'bg-white/5 text-white/35'
                      }`}
                    >
                      {mod.state}
                    </span>
                  </div>

                  <div className="flex items-center justify-between font-mono text-[9px] text-white/40">
                    <span>{mod.type}</span>
                    <span className="text-white font-bold">{mod.latency} API</span>
                  </div>

                  <div className="mt-3 flex justify-between border-t border-white/5 pt-2 font-mono text-[8px] text-white/30 uppercase">
                    <span>PARAMS: {mod.parameters}</span>
                    <span>PREC: {mod.precision}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="block font-sans text-[10px] text-white/40 leading-relaxed text-center">
                All models compiled with secure INT4/FP16 weights.
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 3: Predictive Analytics & Anomaly Sensitivity Simulator */}
        <div className="lg:col-span-3">
          <div className="rounded-none border border-white/10 bg-white/[0.01] p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tight">
                  <Sliders className="w-5 h-5 text-white" />
                  Predictive Analytics Anomaly Simulator
                </h2>
                <p className="font-sans text-xs text-white/55">
                  Model heuristic thresholds and observe how many threats are automatically isolated in real-time.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none bg-red-500/5 border border-red-500/20 font-mono text-[10px] font-bold text-red-400 uppercase tracking-widest">
                <AlertOctagon className="w-4 h-4 animate-bounce" />
                {getAnomaliesCount()} THREATS ISOLATED
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Sliders panel */}
              <div className="space-y-6 md:col-span-1">
                <div className="space-y-3">
                  <div className="flex justify-between font-mono text-[9px] text-white/50 uppercase tracking-wider">
                    <span>Anomaly Sensitivity Level</span>
                    <span className="text-red-400 font-bold">{anomalySensitivity}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="95"
                    step="1"
                    value={anomalySensitivity}
                    onChange={(e) => setAnomalySensitivity(Number(e.target.value))}
                    className="w-full accent-white cursor-pointer h-1 rounded-none bg-white/10"
                  />
                  <span className="block font-sans text-[10px] text-white/40">
                    Lower values increase trigger sensitivity, isolating moderate data fluctuations as anomalies.
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex justify-between font-mono text-[9px] text-white/50 uppercase tracking-wider">
                    <span>Predictive Forecast Horizon</span>
                    <span className="text-white font-bold">{forecastHorizon} Hours</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="24"
                    step="1"
                    value={forecastHorizon}
                    onChange={(e) => setForecastHorizon(Number(e.target.value))}
                    className="w-full accent-white cursor-pointer h-1 rounded-none bg-white/10"
                  />
                </div>
              </div>

              {/* Chart */}
              <div className="md:col-span-2 space-y-4">
                <div className="p-5 rounded-none bg-black/40 border border-white/10 h-56 relative flex flex-col justify-between">
                  <span className="block font-mono text-[8px] text-white/40 uppercase tracking-widest">
                    Real-time Threat Classifier Trajectory (24h stream)
                  </span>

                  {/* SVG graph showing spikes, marking anomalies dynamically */}
                  <div className="h-40 w-full relative">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 120">
                      {/* Grid lines */}
                      <line x1="0" y1="90" x2="600" y2="90" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" />
                      <line x1="0" y1="60" x2="600" y2="60" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" />
                      <line x1="0" y1="30" x2="600" y2="30" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" />

                      {/* Threshold line */}
                      {(() => {
                        const thresholdY = 120 - (anomalySensitivity * 1.1);
                        return (
                          <g>
                            <line
                              x1="0"
                              y1={thresholdY}
                              x2="600"
                              y2={thresholdY}
                              stroke="rgba(239, 68, 68, 0.6)"
                              strokeWidth="1.5"
                              strokeDasharray="4, 4"
                            />
                            <text x="8" y={thresholdY - 4} fill="rgba(239, 68, 68, 0.8)" className="font-mono text-[8px] uppercase tracking-wider">
                              Threshold: {anomalySensitivity}%
                            </text>
                          </g>
                        );
                      })()}

                      {/* Telemetry line */}
                      <path
                        d={telemetryPoints
                          .map((p, idx) => {
                            const xCoord = 50 + idx * 45;
                            const yCoord = 120 - p.val * 1;
                            return `${idx === 0 ? 'M' : 'L'} ${xCoord},${yCoord}`;
                          })
                          .join(' ')}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2.5"
                      />

                      {/* Data dots */}
                      {telemetryPoints.map((p, idx) => {
                        const xCoord = 50 + idx * 45;
                        const yCoord = 120 - p.val * 1;
                        const isAnomaly = p.val > anomalySensitivity;
                        return (
                          <g key={idx}>
                            <circle
                              cx={xCoord}
                              cy={yCoord}
                              r={isAnomaly ? 5 : 3}
                              fill={isAnomaly ? '#ef4444' : '#000000'}
                              stroke={isAnomaly ? '#ef4444' : '#ffffff'}
                              strokeWidth="1.5"
                            />
                            {isAnomaly && (
                              <circle
                                cx={xCoord}
                                cy={yCoord}
                                r="10"
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="1"
                                className="animate-ping"
                              />
                            )}
                          </g>
                        );
                      })}
                    </svg>

                    {/* X axis */}
                    <div className="flex justify-between px-10 pt-1 font-mono text-[8px] text-white/35 uppercase tracking-wider">
                      {telemetryPoints.map((p, idx) => (
                        <span key={idx}>{p.label}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
