/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ActivePage = 'home' | 'tech' | 'incubation' | 'products';

// Tech Services Types
export interface ClusterNode {
  id: string;
  name: string;
  region: string;
  status: 'healthy' | 'warning' | 'degraded';
  cpu: number;
  memory: number;
  connections: number;
}

export interface ApiEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  parameters: string[];
  mockResponse: Record<string, any>;
}

export interface IntegrationService {
  name: string;
  category: 'Cloud' | 'Database' | 'Messaging' | 'Finance' | 'Analytics';
  uptime: number;
  latency: number;
  status: 'operational' | 'intermittent' | 'down';
}

// Incubation Hub Types
export interface VentureCompany {
  id: string;
  name: string;
  tagline: string;
  description: string;
  cohort: string;
  sector: string;
  logoColor: string;
  fundingStage: string;
  raised: string;
  metrics: {
    label: string;
    value: string;
    trend: string;
  }[];
}

export interface MetricCard {
  label: string;
  value: string;
  subtext: string;
  trend: 'up' | 'down' | 'neutral';
}

// AI Products Types
export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
}

export interface AgentLog {
  id: string;
  agentId: string;
  message: string;
  timestamp: string;
  type: 'thought' | 'tool_call' | 'output' | 'chat';
  toolUsed?: string;
}

export interface AgentBlueprint {
  id: string;
  name: string;
  description: string;
  agents: Agent[];
  sampleTasks: string[];
}
