/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  Server,
  Terminal as TermIcon,
  Play,
  RotateCcw,
  Cpu,
  ArrowRight,
  GitFork,
  AlertTriangle,
  Flame,
  Zap,
} from 'lucide-react';
import { ClusterNode, ApiEndpoint, IntegrationService } from '../types';

export default function TechServicesMockup() {
  // 1. Cluster State
  const [clusterNodes, setClusterNodes] = useState<ClusterNode[]>([
    { id: 'node-us', name: 'Cluster-US-East', region: 'us-east-1', status: 'healthy', cpu: 42, memory: 55, connections: 2480 },
    { id: 'node-eu', name: 'Cluster-EU-West', region: 'eu-west-3', status: 'healthy', cpu: 38, memory: 48, connections: 1890 },
    { id: 'node-ap', name: 'Cluster-AP-South', region: 'ap-southeast-1', status: 'healthy', cpu: 31, memory: 40, connections: 1250 },
    { id: 'node-af', name: 'Cluster-AF-South', region: 'af-south-1', status: 'healthy', cpu: 22, memory: 33, connections: 450 },
  ]);
  const [systemLoad, setSystemLoad] = useState({ rps: 6070, errorRate: '0.00%', latency: '14ms' });
  const [isSimulatingLoad, setIsSimulatingLoad] = useState(false);

  // 2. API Playground State
  const endpoints: ApiEndpoint[] = [
    {
      path: '/api/v1/pipelines/status',
      method: 'GET',
      description: 'Fetch global ingestion pipelines & worker health specs.',
      parameters: ['include_metrics=true', 'cluster_id=all'],
      mockResponse: {
        status: 'operational',
        synchronized_at: '2026-07-07T10:05:00Z',
        active_workers: 18,
        pipelines: [
          { name: 'VentureIngress-Core', throughput_mb: 48.2, status: 'nominal' },
          { name: 'PredictiveSync-Edge', throughput_mb: 124.5, status: 'nominal' },
        ],
        load_balancer_health: '100%',
      },
    },
    {
      path: '/api/v1/agents/deploy',
      method: 'POST',
      description: 'Initialize and warm up a custom agentic pipeline.',
      parameters: ['blueprint_id="fin-audit"', 'sandbox_mode=false'],
      mockResponse: {
        deploy_status: 'completed',
        agent_id: 'agent_3a9df82c',
        warmup_time_ms: 124,
        sandbox_secure: true,
        cluster_region: 'us-east-1',
        metrics: { concurrency: 50, memory_limit: '2048Mi' },
      },
    },
    {
      path: '/api/v1/integrations/sync',
      method: 'POST',
      description: 'Trigger immediate delta-sync with external data structures.',
      parameters: ['target="snowflake"', 'incremental=true'],
      mockResponse: {
        sync_initiated: true,
        session_id: 'sync_938a9018c',
        records_scanned: 148209,
        deltas_applied: 4810,
        sync_duration_seconds: 1.84,
        network_overhead: '0.04%',
      },
    },
  ];
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(endpoints[0]);
  const [apiTerminalOutput, setApiTerminalOutput] = useState<string>('// Ready to query. Click "Send Secure Request" below.');
  const [isQuerying, setIsQuerying] = useState(false);
  const [queryLatency, setQueryLatency] = useState<number | null>(null);

  // 3. Pipeline Designer State
  const [pipelineSteps, setPipelineSteps] = useState([
    { id: 'step-ingest', name: 'Ingest Router', type: 'Ingress', active: true, latency: 2, scale: 3 },
    { id: 'step-dedup', name: 'De-duplication', type: 'Transform', active: true, latency: 4, scale: 2 },
    { id: 'step-enrich', name: 'AI Enrichment', type: 'Transform', active: true, latency: 18, scale: 5 },
    { id: 'step-threat', name: 'Anomaly Filter', type: 'Safety', active: true, latency: 8, scale: 4 },
    { id: 'step-db', name: 'Hybrid VectorDB', type: 'Storage', active: true, latency: 3, scale: 3 },
  ]);

  // 4. Integrations Health State
  const [integrations] = useState<IntegrationService[]>([
    { name: 'Kubernetes (K8s)', category: 'Cloud', uptime: 99.999, latency: 4, status: 'operational' },
    { name: 'Apache Kafka', category: 'Messaging', uptime: 100.0, latency: 2, status: 'operational' },
    { name: 'Snowflake', category: 'Database', uptime: 99.995, latency: 12, status: 'operational' },
    { name: 'Amazon Web Services', category: 'Cloud', uptime: 99.99, latency: 6, status: 'operational' },
    { name: 'Stripe Corporate', category: 'Finance', uptime: 100.0, latency: 18, status: 'operational' },
    { name: 'Salesforce Core', category: 'Analytics', uptime: 99.98, latency: 24, status: 'operational' },
  ]);

  // Interval ticks for live cluster noise
  useEffect(() => {
    const interval = setInterval(() => {
      setClusterNodes((prev) =>
        prev.map((node) => {
          if (node.status === 'degraded') return node;
          const cpuNoise = Math.floor(Math.random() * 5) - 2;
          const connNoise = Math.floor(Math.random() * 40) - 20;
          return {
            ...node,
            cpu: Math.max(10, Math.min(95, node.cpu + cpuNoise)),
            connections: Math.max(100, node.connections + connNoise),
          };
        })
      );

      if (!isSimulatingLoad) {
        setSystemLoad({
          rps: 6000 + Math.floor(Math.random() * 200) - 100,
          errorRate: '0.00%',
          latency: `${12 + Math.floor(Math.random() * 4)}ms`,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulatingLoad]);

  // Action: Trigger Outage and Failover
  const handleSimulateOutage = () => {
    setIsSimulatingLoad(true);
    setClusterNodes((prev) =>
      prev.map((node) => {
        if (node.id === 'node-us') {
          return { ...node, status: 'degraded', cpu: 98, connections: 0 };
        }
        if (node.id === 'node-eu') {
          return { ...node, connections: node.connections + 1500, cpu: 75 };
        }
        if (node.id === 'node-ap') {
          return { ...node, connections: node.connections + 980, cpu: 55 };
        }
        return node;
      })
    );

    setSystemLoad({
      rps: 5980,
      errorRate: '0.02%',
      latency: '45ms',
    });

    setTimeout(() => {
      setClusterNodes((prev) =>
        prev.map((node) => {
          if (node.id === 'node-us') {
            return { ...node, status: 'healthy', cpu: 35, connections: 2400 };
          }
          if (node.id === 'node-eu') {
            return { ...node, cpu: 42, connections: 1950 };
          }
          if (node.id === 'node-ap') {
            return { ...node, cpu: 32, connections: 1280 };
          }
          return node;
        })
      );
      setSystemLoad({ rps: 6050, errorRate: '0.00%', latency: '14ms' });
      setIsSimulatingLoad(false);
    }, 6000);
  };

  // Action: Run API Query simulation
  const handleQueryApi = () => {
    setIsQuerying(true);
    setApiTerminalOutput('// Routing request through Strategic edge gateway...\n// Resolving security tokens...');
    const startTime = Date.now();

    setTimeout(() => {
      const elapsed = Date.now() - startTime;
      setQueryLatency(elapsed);
      setApiTerminalOutput(JSON.stringify(selectedEndpoint.mockResponse, null, 2));
      setIsQuerying(false);
    }, 800);
  };

  // Toggle active node in pipeline constructor
  const togglePipelineStep = (id: string) => {
    setPipelineSteps((prev) =>
      prev.map((step) => {
        if (step.id === id) {
          return { ...step, active: !step.active };
        }
        return step;
      })
    );
  };

  return (
    <div id="tech-services-mockup-root" className="space-y-12 pb-16">
      {/* Intro Hero banner */}
      <div className="relative border-b border-white/10 bg-[#050505] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 max-w-3xl">
            <span className="font-mono text-xs font-bold text-white/50 uppercase tracking-[0.2em] block">
              // Pillar Mockup 01
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase italic tracking-tighter">
              Tech Services Division
            </h1>
            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
              End-to-end engineering, robust API development, data pipeline construction, and seamless platform integrations designed for zero operational downtime. Experience our live infrastructure blueprints.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-emerald-500/5 border border-emerald-500/20">
            <span className="w-2 h-2 bg-emerald-400 animate-pulse block" />
            <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              GLOBAL ACTIVE DEPLOYMENTS
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SECTION 1: End-to-End Cluster Simulation (2 cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-none border border-white/10 bg-white/[0.01] p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tight">
                  <Server className="w-5 h-5 text-white" />
                  Multi-Region Cluster & Ingress Gateway
                </h2>
                <p className="font-sans text-xs text-white/55">
                  Global active-active replication. Failovers trigger in micro-seconds when nodes degrade.
                </p>
              </div>

              <button
                id="btn-simulate-outage"
                disabled={isSimulatingLoad}
                onClick={handleSimulateOutage}
                className={`px-4 py-3 rounded-none font-mono text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2 transition-all border ${
                  isSimulatingLoad
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : 'bg-red-500/10 hover:bg-red-500 hover:text-black text-red-400 border-red-500/30 cursor-pointer'
                }`}
              >
                <Flame className="w-4 h-4" />
                {isSimulatingLoad ? 'Routing Workloads...' : 'Simulate Failover'}
              </button>
            </div>

            {/* Quick dashboard metrics */}
            <div className="grid grid-cols-3 gap-4 p-5 rounded-none bg-black/60 border border-white/10">
              <div>
                <span className="block font-mono text-[8px] text-white/40 uppercase tracking-wider">SYSTEM INGRESS</span>
                <span className="font-mono text-sm sm:text-base font-bold text-white">
                  {systemLoad.rps.toLocaleString()} RPS
                </span>
              </div>
              <div>
                <span className="block font-mono text-[8px] text-white/40 uppercase tracking-wider">ROUTING LATENCY</span>
                <span className={`font-mono text-sm sm:text-base font-bold transition-colors duration-300 ${isSimulatingLoad ? 'text-amber-400' : 'text-white'}`}>
                  {systemLoad.latency}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[8px] text-white/40 uppercase tracking-wider">GLOBAL LOSS</span>
                <span className={`font-mono text-sm sm:text-base font-bold transition-colors duration-300 ${isSimulatingLoad ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {systemLoad.errorRate}
                </span>
              </div>
            </div>

            {/* Clusters map list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {clusterNodes.map((node) => (
                <div
                  key={node.id}
                  className={`p-5 rounded-none border transition-all ${
                    node.status === 'degraded'
                      ? 'bg-red-950/10 border-red-500/40'
                      : node.cpu > 70
                      ? 'bg-amber-950/10 border-amber-500/40'
                      : 'bg-black/30 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Cpu className={`w-4 h-4 ${node.status === 'degraded' ? 'text-red-400' : 'text-white/60'}`} />
                      <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">{node.name}</span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-none font-mono text-[8px] uppercase font-bold ${
                        node.status === 'healthy'
                          ? 'bg-emerald-500/5 text-emerald-400 border border-emerald-500/10'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse'
                      }`}
                    >
                      {node.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between font-mono text-[9px] text-white/50">
                      <span>LOAD (CPU / MEM)</span>
                      <span className="text-white font-bold">
                        {node.cpu}% / {node.memory}%
                      </span>
                    </div>
                    {/* Simulated progress bar */}
                    <div className="w-full h-1 bg-white/10 rounded-none overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${
                          node.status === 'degraded'
                            ? 'bg-red-500'
                            : node.cpu > 70
                            ? 'bg-amber-500'
                            : 'bg-white'
                        }`}
                        style={{ width: `${node.cpu}%` }}
                      />
                    </div>

                    <div className="flex justify-between font-mono text-[9px] text-white/50">
                      <span>CONCURRENCY</span>
                      <span className="text-white font-bold">{node.connections.toLocaleString()} SE</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isSimulatingLoad && (
              <div className="p-4 rounded-none bg-amber-500/5 border border-amber-500/20 flex gap-3 text-amber-400 font-sans text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>
                  <strong>Cluster-US-East degraded simulation active.</strong> Border router automatically redirected all US workloads to European and Asian edge networks. Core system downtime: <strong>0.00ms.</strong>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: Integrations Status Panel (1 col wide) */}
        <div className="space-y-6">
          <div className="rounded-none border border-white/10 bg-white/[0.01] p-8 space-y-4 shadow-2xl h-full flex flex-col justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tight">
                <Zap className="w-5 h-5 text-white" />
                Platform Hooks
              </h2>
              <p className="font-sans text-xs text-white/55">
                Core hooks into external database clusters and cloud resources.
              </p>
            </div>

            <div className="space-y-3 flex-1 pt-6">
              {integrations.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-none bg-black/40 border border-white/5 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <span className="block font-mono text-xs font-bold text-white uppercase tracking-wide">{item.name}</span>
                    <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest">
                      {item.category} • {item.latency}ms Latency
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block font-mono text-xs font-bold text-white">{item.uptime}%</span>
                    <span className="inline-flex items-center gap-1 font-mono text-[8px] text-emerald-400 uppercase tracking-widest">
                      ● active
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="block font-sans text-[10px] text-white/40 leading-relaxed text-center">
                Cross-platform hooks secured via dynamic HSM credentials.
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 3: Live API Playground (Full width grid breakout) */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Controls list */}
          <div className="md:col-span-1 space-y-4">
            <div className="rounded-none border border-white/10 bg-white/[0.01] p-8 space-y-4 shadow-2xl">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 uppercase tracking-tight">
                  <TermIcon className="w-4.5 h-4.5 text-white" />
                  API Playroom
                </h3>
                <p className="font-sans text-xs text-white/55">
                  Select an endpoint to query. Real-time schema validation is active.
                </p>
              </div>

              <div className="space-y-2">
                {endpoints.map((ep) => (
                  <button
                    key={ep.path}
                    onClick={() => setSelectedEndpoint(ep)}
                    className={`w-full text-left p-4 rounded-none border transition-all flex items-center justify-between cursor-pointer ${
                      selectedEndpoint.path === ep.path
                        ? 'bg-white/5 border-white/35'
                        : 'bg-black/30 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="block font-mono text-xs font-bold text-white">
                        {ep.path}
                      </span>
                      <span className="block font-sans text-[10px] text-white/50 leading-snug">
                        {ep.description}
                      </span>
                    </div>
                    <span
                      className={`font-mono text-[8px] font-bold px-2 py-0.5 rounded-none ${
                        ep.method === 'GET' ? 'bg-white/10 text-white' : 'bg-white text-black'
                      }`}
                    >
                      {ep.method}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Code display terminal */}
          <div className="md:col-span-2 space-y-4">
            <div className="rounded-none border border-white/10 bg-white/[0.01] p-8 space-y-4 shadow-2xl h-full flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-white/20" />
                  <div className="w-2.5 h-2.5 bg-white/20" />
                  <div className="w-2.5 h-2.5 bg-white/20" />
                  <span className="font-mono text-[10px] text-white/40 ml-2 uppercase tracking-wider">secure_edge_gateway.sh</span>
                </div>
                {queryLatency && (
                  <span className="font-mono text-[9px] text-white uppercase tracking-widest font-bold">
                    [ LATENCY: {queryLatency}MS • 200 OK ]
                  </span>
                )}
              </div>

              {/* Terminal shell preform */}
              <div className="flex-1 bg-[#030303] p-5 rounded-none border border-white/10 font-mono text-xs text-white/80 min-h-[180px] overflow-auto whitespace-pre">
                {apiTerminalOutput}
              </div>

              {/* Play buttons */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest">Active Parameters</span>
                  <span className="font-mono text-[10px] text-white font-bold">
                    {selectedEndpoint.parameters.join(' & ')}
                  </span>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    id="btn-send-api-query"
                    onClick={handleQueryApi}
                    disabled={isQuerying}
                    className="px-6 py-4 rounded-none bg-white text-black font-mono font-bold text-[10px] uppercase tracking-[0.25em] flex items-center gap-2 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    {isQuerying ? 'Querying...' : 'Send Secure Request'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: Data Ingestion Pipeline Visualizer */}
        <div className="lg:col-span-3">
          <div className="rounded-none border border-white/10 bg-white/[0.01] p-8 space-y-6 shadow-2xl">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tight">
                <GitFork className="w-5 h-5 text-white" />
                Data Pipeline Constructor (Active Blueprints)
              </h2>
              <p className="font-sans text-xs text-white/55">
                Zero downtime ingestion. Toggle worker configurations to test streaming failure isolations in sandbox environments.
              </p>
            </div>

            {/* Ingestion blocks flow diagram */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative items-center">
              {pipelineSteps.map((step, idx) => (
                <div key={step.id} className="relative flex flex-col items-center">
                  <div
                    onClick={() => togglePipelineStep(step.id)}
                    className={`w-full p-5 rounded-none border text-center transition-all cursor-pointer relative z-10 ${
                      step.active
                        ? 'bg-black/80 border-white/30 shadow-2xl hover:border-white'
                        : 'bg-transparent border-white/5 opacity-30 hover:opacity-50'
                    }`}
                  >
                    <span className="block font-mono text-[8px] text-white/40 uppercase tracking-widest mb-1.5 font-bold">
                      {step.type}
                    </span>
                    <span className="block font-mono text-xs font-bold text-white uppercase tracking-wide">{step.name}</span>
                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[9px]">
                      <span className="text-white/40">Workers</span>
                      <span className="text-white font-bold">{step.active ? step.scale : 0} / {step.scale}</span>
                    </div>
                  </div>

                  {idx < pipelineSteps.length - 1 && (
                    <div className="hidden sm:block absolute top-[50%] -translate-y-2/3 right-[-14px] z-0 text-white font-bold opacity-30">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-none bg-black/40 border border-white/10 gap-4 text-xs">
              <span className="font-sans text-white/60">
                Total pipeline traversal latency:{' '}
                <strong className="text-white font-bold font-mono">
                  {pipelineSteps.reduce((acc, step) => acc + (step.active ? step.latency : 0), 0)}ms
                </strong>
                . Automatic retry-loops and backpressures are configured natively.
              </span>
              <button
                id="btn-reset-pipeline"
                onClick={() => setPipelineSteps((prev) => prev.map((s) => ({ ...s, active: true })))}
                className="px-5 py-3 rounded-none border border-white/20 text-white font-mono text-[9px] uppercase font-bold tracking-[0.2em] hover:bg-white hover:text-black flex items-center gap-1.5 transition-all cursor-pointer bg-transparent"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Pipeline Workers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
