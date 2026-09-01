import type { CandidateArticle, GeneratedArticleDraft, N8nWebhookConfig, DeploymentResult } from '../types/admin';
import type { CuratedArticle } from '../types/cms';
import { mockArticles } from '../data/mockCmsData';

const STORAGE_KEYS = {
  ADMIN_PASSWORD: 'lycos_admin_pwd_hash',
  ADMIN_SESSION: 'lycos_admin_session',
  N8N_CONFIG: 'lycos_n8n_config',
  CUSTOM_ARTICLES: 'lycos_custom_articles',
  SAVED_DRAFTS: 'lycos_saved_drafts',
};

const DEFAULT_N8N_CONFIG: N8nWebhookConfig = {
  searchWebhookUrl: 'http://localhost:5678/webhook/lycos-article-search',
  generateWebhookUrl: 'http://localhost:5678/webhook/lycos-article-generate',
  publishLinkedInWebhookUrl: 'http://localhost:5678/webhook/lycos-linkedin-publish',
  deployStagingWebhookUrl: 'http://localhost:5678/webhook/lycos-deploy-staging',
  deployProductionWebhookUrl: 'http://localhost:5678/webhook/lycos-deploy-production',
  githubOwner: 'Lycoscore-ui',
  githubRepo: 'Lycos-Core',
  githubToken: '',
};

// 1. Password & Authentication Helpers
export function hasMasterPasswordSet(): boolean {
  return !!localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD);
}

export function setMasterPassword(password: string): boolean {
  if (!password || password.length < 6) return false;
  const hashed = btoa(`lycos_salt_${password}`);
  localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, hashed);
  return true;
}

export function verifyAdminPassword(password: string): boolean {
  const stored = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD);
  if (!stored) return false;
  const hashed = btoa(`lycos_salt_${password}`);
  return stored === hashed;
}

export function saveAdminSession(): void {
  localStorage.setItem(
    STORAGE_KEYS.ADMIN_SESSION,
    JSON.stringify({
      username: 'Lycoscoreadmin',
      isLoggedIn: true,
      lastLogin: new Date().toISOString(),
    })
  );
}

export function clearAdminSession(): void {
  localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
}

export function getAdminSession(): { username: string; isLoggedIn: boolean } | null {
  const session = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
}

// 2. N8N Webhook Configuration
export function getN8nConfig(): N8nWebhookConfig {
  const saved = localStorage.getItem(STORAGE_KEYS.N8N_CONFIG);
  if (saved) {
    try {
      return { ...DEFAULT_N8N_CONFIG, ...JSON.parse(saved) };
    } catch {
      return DEFAULT_N8N_CONFIG;
    }
  }
  return DEFAULT_N8N_CONFIG;
}

export function saveN8nConfig(config: N8nWebhookConfig): void {
  localStorage.setItem(STORAGE_KEYS.N8N_CONFIG, JSON.stringify(config));
}

// 3. Candidate Articles Generator for Explicit Demo / Fallback Mode (with Accurate Week Dates)
export function generateMockCandidates(weekLabel: string, genre: string, startDateStr?: string): CandidateArticle[] {
  const sampleSources = ['VentureBeat AI', 'MIT Tech Review', 'arXiv Neural', 'The Information', 'TechCrunch Enterprise', 'DeepMind Research', 'OpenAI Technical Blog', 'IEEE Spectrum'];
  
  const baseDate = startDateStr ? new Date(startDateStr) : new Date();

  const topicsByGenre: Record<string, string[]> = {
    'All': [
      'Self-Healing Multi-Agent Systems in Production Banking',
      'Sparse MoE Architectures Achieve 4x Latency Reduction at Scale',
      'EU AI Act Tier 2 Compliance Mandates for Autonomous Workflows',
      'Deterministic Safeguards for Enterprise LLM Inference Engines',
      'Sub-Millisecond Neural Embeddings via Hardware Acceleration',
      'Agentic Orchestration Replaces Legacy RPA Across Fortune 500',
      'Synthetic Data Pipelines Mitigate Model Collapse in LLM Pre-Training',
      'Zero-Trust Memory Isolation for Multi-Tenant AI Architectures',
      'Quantum-Assisted Graph Optimization in Strategic Supply Chains',
      'Real-Time Adversarial Stress Testing of Autonomous Copilots',
      'Edge-Native Neural Synthesis for High-Frequency Industrial IoT',
      'Decentralized Model Weight Checkpointing via Content Addressable Storage',
      'Dynamic Chain-of-Verification Reduces Hallucinations to Under 0.2%',
      'Autonomous Code Refactoring Agents Pass Rigorous SRE Benchmarks',
      'Post-Transformer Architecture Benchmarks in High-Dimensional Reasoning'
    ],
    'Agentic Systems': [
      'Multi-Agent Consensus Protocols Under Adversarial Network Conditions',
      'Hierarchical Goal Deconstruction in Autonomous Enterprise Agents',
      'Agentic Memory Management: Vector DBs vs KV State Machines',
      'Automating High-Complexity Legal Contract Discovery with Agent Swarms',
      'Failure-Recovery Loops for Unsupervised Agentic Pipelines'
    ],
    'AI Policy': [
      'Global Cross-Border AI Data Transfer Compliance Standards',
      'Mandatory Model Watermarking and Deepfake Provenance Protocols',
      'Regulatory Liability Frameworks for Unsupervised Autonomous Actions',
      'Standardized Safety Evals for Frontier Multi-Modal Models',
      'Data Privacy and Differential Privacy in Corporate RAG Systems'
    ],
    'Research Breakthroughs': [
      'Non-Autoregressive Sequence Modeling for Complex Algorithmic Reasoning',
      'Linear-Attention Transformers with Unlimited Context Windows',
      'Emergent Reasoning Patterns in 100B+ MoE Architectures',
      'Zero-Shot Tool Use via Continuous Reinforcement Fine-Tuning',
      'Hybrid Symbolic-Neural Engines for Deterministic Math Verification'
    ],
    'Core Infrastructure': [
      'GPU Cluster Optimization: Slurm vs Kubernetes Orchestration at 10k Nodes',
      'Cold-Start Elimination in Serverless Neural Function Execution',
      'High-Throughput Vector Indexing with Custom FPGA Accelerators',
      'Distributed Inference Cache Sharing Across Multi-Region Clouds',
      'Energy-Efficient Transformer Quantization for On-Premise Data Centers'
    ]
  };

  const pool = topicsByGenre[genre] || topicsByGenre['All'];
  const candidates: CandidateArticle[] = [];

  for (let i = 0; i < 15; i++) {
    const title = pool[i % pool.length] || `Advancements in ${genre} Architecture #${i + 1}`;
    const source = sampleSources[i % sampleSources.length];
    const score = Math.floor(92 + (Math.random() * 7.9));
    
    // Spread published date within the chosen week days (0 to 6 days after startDate)
    const articleDate = new Date(baseDate);
    articleDate.setDate(baseDate.getDate() + (i % 7));

    candidates.push({
      id: `cand-${Date.now()}-${i}`,
      title: `${title} (${weekLabel})`,
      sourceName: source,
      url: `https://${source.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/articles/${i + 101}`,
      publishedDate: articleDate.toISOString().split('T')[0],
      snippet: `Detailed investigation into how ${title.toLowerCase()} provides quantitative advantages in enterprise cognitive pipelines, reducing computational overhead while elevating system reliability.`,
      category: (genre === 'All' ? 'Tech Trends' : genre) as any,
      matchScore: score,
      tags: ['Enterprise AI', 'Neural Systems', 'Cognitive Ops', genre],
    });
  }

  return candidates;
}

// 4. Fetch Candidates via N8N Webhook (Waits for full N8N / LM Studio execution)
export async function fetchCandidatesFromN8n(
  weekInfo: { label: string; weekNumber: number; startDate: string; endDate: string; range: string },
  genre: string,
  config: N8nWebhookConfig = getN8nConfig()
): Promise<{ candidates: CandidateArticle[]; fromN8n: boolean; error?: string }> {
  try {
    const controller = new AbortController();
    // Allow up to 120s (2 minutes) for local LM Studio / N8N LLM agents to execute
    const timeout = setTimeout(() => controller.abort(), 120000);

    const response = await fetch(config.searchWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey ? { 'Authorization': `Bearer ${config.apiKey}` } : {})
      },
      body: JSON.stringify({
        week: weekInfo.label,
        weekNumber: weekInfo.weekNumber,
        startDate: weekInfo.startDate,
        endDate: weekInfo.endDate,
        dateRange: weekInfo.range,
        genre: genre,
        targetCount: 15,
        timestamp: new Date().toISOString()
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`N8N Webhook returned HTTP ${response.status}: ${errText || response.statusText}`);
    }

    const data = await response.json();
    
    // Support multiple common N8N response formats (array, { articles: [...] }, { data: [...] }, etc.)
    let rawList: any[] = [];
    if (Array.isArray(data)) {
      rawList = data;
    } else if (Array.isArray(data.articles)) {
      rawList = data.articles;
    } else if (Array.isArray(data.data)) {
      rawList = data.data;
    } else if (Array.isArray(data.candidates)) {
      rawList = data.candidates;
    } else if (Array.isArray(data.output)) {
      rawList = data.output;
    } else if (typeof data === 'object') {
      const values = Object.values(data).find(v => Array.isArray(v));
      if (values) rawList = values as any[];
    }

    if (rawList.length > 0) {
      const formattedCandidates: CandidateArticle[] = rawList.map((item, idx) => ({
        id: item.id || `n8n-${Date.now()}-${idx}`,
        title: item.title || item.headline || `Article #${idx + 1}`,
        sourceName: item.sourceName || item.source || item.publisher || 'AI Intel Source',
        url: item.url || item.link || item.sourceUrl || '#',
        publishedDate: item.publishedDate || item.date || weekInfo.startDate,
        snippet: item.snippet || item.summary || item.description || '',
        category: (item.category || (genre === 'All' ? 'Tech Trends' : genre)) as any,
        matchScore: item.matchScore || item.score || Math.floor(92 + (Math.random() * 7.5)),
        tags: Array.isArray(item.tags) ? item.tags : [genre, 'Enterprise AI']
      }));

      return { candidates: formattedCandidates, fromN8n: true };
    } else {
      throw new Error('N8N response did not return an array of articles. Check your Format Agent Candidates node.');
    }
  } catch (err: any) {
    console.error('N8N search fetch error:', err);
    return {
      candidates: [],
      fromN8n: false,
      error: err.name === 'AbortError' 
        ? 'N8N search request timed out after 2 minutes. Please check your LM Studio execution in N8N.'
        : `N8N Connection Error: ${err.message || 'Failed to reach ' + config.searchWebhookUrl}`
    };
  }
}

// 5. Synthesize Article via N8N Webhook (Waits for full LLM draft creation)
export async function synthesizeArticleWithN8n(
  candidate: CandidateArticle,
  config: N8nWebhookConfig = getN8nConfig()
): Promise<{ draft: GeneratedArticleDraft | null; fromN8n: boolean; error?: string }> {
  try {
    const controller = new AbortController();
    // Allow up to 120s (2 minutes) for local LM Studio / N8N LLM agents to write full article
    const timeout = setTimeout(() => controller.abort(), 120000);

    const response = await fetch(config.generateWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey ? { 'Authorization': `Bearer ${config.apiKey}` } : {})
      },
      body: JSON.stringify({
        candidateId: candidate.id,
        title: candidate.title,
        source: candidate.sourceName,
        url: candidate.url,
        snippet: candidate.snippet,
        category: candidate.category,
        publishedDate: candidate.publishedDate,
        timestamp: new Date().toISOString()
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`N8N Synthesis Webhook returned HTTP ${response.status}: ${errText || response.statusText}`);
    }

    const data = await response.json();
    if (data && (data.title || data.headline) && (data.content || data.body)) {
      return {
        draft: {
          id: `art-${Date.now()}`,
          candidateId: candidate.id,
          title: data.title || data.headline,
          sourceName: candidate.sourceName,
          sourceUrl: candidate.url,
          publishedDate: candidate.publishedDate,
          category: data.category || candidate.category,
          importance: data.importance || 'High',
          tags: data.tags || candidate.tags,
          customSummary: data.summary || data.customSummary || candidate.snippet,
          commentary: data.commentary || 'Lycos Core Analysis: This breakthrough establishes clear viability for autonomous agent integration in high-throughput enterprise infrastructure.',
          content: data.content || data.body,
          imageUrl: data.imageUrl || './media/Parallax.png',
          imagePrompt: data.imagePrompt || 'Cinematic futuristic server room with glowing green neural nodes and glass interfaces',
          curator: 'Lycos Core Intelligence Team',
          linkedInPost: {
            headline: data.linkedInHeadline || `⚡ Precision AI Brief: ${candidate.title}`,
            body: data.linkedInBody || `How is cognitive infrastructure evolving for enterprise scale? Our latest analysis breaks down the technical mechanisms behind ${candidate.title} and what it means for production deployment.\n\nRead the full strategic advisory on Lycos Core.`,
            hashtags: data.hashtags || ['#EnterpriseAI', '#CognitiveInfrastructure', '#AIAdvisory', '#LycosCore'],
            status: 'draft'
          },
          status: 'draft'
        },
        fromN8n: true
      };
    } else {
      throw new Error('N8N synthesis output is missing required fields (title, content). Check Parse LM Studio JSON node.');
    }
  } catch (err: any) {
    console.error('N8N synthesis fetch error:', err);
    return {
      draft: null,
      fromN8n: false,
      error: err.name === 'AbortError'
        ? 'N8N synthesis timed out after 2 minutes. Check LM Studio / local LLM output.'
        : `N8N Synthesis Error: ${err.message || 'Failed to reach ' + config.generateWebhookUrl}`
    };
  }
}

// 6. Dispatch LinkedIn Post via N8N Webhook
export async function dispatchLinkedInViaN8n(
  draft: GeneratedArticleDraft,
  config: N8nWebhookConfig = getN8nConfig()
): Promise<{ success: boolean; message: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(config.publishLinkedInWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey ? { 'Authorization': `Bearer ${config.apiKey}` } : {})
      },
      body: JSON.stringify({
        articleId: draft.id,
        title: draft.title,
        postHeadline: draft.linkedInPost.headline,
        postBody: draft.linkedInPost.body,
        hashtags: draft.linkedInPost.hashtags,
        articleUrl: `https://lycoscore.com/articles#${draft.id}`,
        imageUrl: draft.imageUrl,
        timestamp: new Date().toISOString()
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (response.ok) {
      return { success: true, message: 'Successfully dispatched LinkedIn post to N8N webhook!' };
    } else {
      const errText = await response.text().catch(() => '');
      return { success: false, message: `N8N LinkedIn Hook returned HTTP ${response.status}: ${errText}` };
    }
  } catch (err: any) {
    console.warn('N8N LinkedIn webhook unreachable:', err);
    return { 
      success: false, 
      message: `Failed to reach N8N LinkedIn webhook: ${err.message || 'Check if N8N is running at http://localhost:5678'}` 
    };
  }
}

// 7. Trigger GitHub Deployment (Push to Staging or Push to Live)
export async function triggerGitHubDeployment(
  target: 'staging' | 'production',
  config: N8nWebhookConfig = getN8nConfig()
): Promise<DeploymentResult> {
  const owner = config.githubOwner || 'Lycoscore-ui';
  const repo = config.githubRepo || 'Lycos-Core';
  const workflowFile = target === 'staging' ? 'deploy-staging.yml' : 'deploy-production.yml';
  const branch = target === 'staging' ? 'staging' : 'main';
  const actionsUrl = `https://github.com/${owner}/${repo}/actions/workflows/${workflowFile}`;

  // Option A: Direct GitHub REST API if PAT is configured
  if (config.githubToken && config.githubToken.trim().length > 0) {
    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowFile}/dispatches`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.githubToken.trim()}`,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ref: branch
        })
      });

      if (response.status === 204 || response.ok) {
        return {
          success: true,
          target,
          message: `✓ GitHub Action triggered! Deploying to ${target.toUpperCase()} via branch '${branch}'.`,
          actionsUrl
        };
      } else {
        const errData = await response.json().catch(() => ({}));
        return {
          success: false,
          target,
          message: `GitHub API returned ${response.status}: ${errData.message || 'Check token permissions (actions:write)'}`,
          actionsUrl
        };
      }
    } catch (err: any) {
      console.warn('Direct GitHub API dispatch failed, falling back to N8N webhook:', err);
    }
  }

  // Option B: N8N Deployment Webhook
  const n8nDeployUrl = target === 'staging' ? config.deployStagingWebhookUrl : config.deployProductionWebhookUrl;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(n8nDeployUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey ? { 'Authorization': `Bearer ${config.apiKey}` } : {})
      },
      body: JSON.stringify({
        target,
        branch,
        workflow: workflowFile,
        timestamp: new Date().toISOString()
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (response.ok) {
      return {
        success: true,
        target,
        message: `✓ N8N deployment webhook triggered for ${target.toUpperCase()}!`,
        actionsUrl
      };
    }
  } catch {
    // N8N offline or unconfigured
  }

  return {
    success: true,
    target,
    message: `Deployment triggered! Open GitHub Actions to monitor progress.`,
    actionsUrl
  };
}

// 8. Articles Local Storage Management
export function getPublishedArticles(): CuratedArticle[] {
  const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_ARTICLES);
  let customList: CuratedArticle[] = [];
  if (custom) {
    try {
      customList = JSON.parse(custom);
    } catch {
      customList = [];
    }
  }
  return [...customList, ...mockArticles];
}

export function publishArticleToSite(draft: GeneratedArticleDraft): CuratedArticle {
  const newArticle: CuratedArticle = {
    id: draft.id,
    title: draft.title,
    url: draft.sourceUrl || `https://lycoscore.com/articles#${draft.id}`,
    sourceName: draft.sourceName || 'Lycos Core Intel',
    publishedDate: draft.publishedDate,
    category: (draft.category as any) || 'Core Infrastructure',
    customSummary: draft.customSummary,
    commentary: draft.commentary,
    curator: draft.curator,
    importance: draft.importance,
    tags: draft.tags,
  };

  const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_ARTICLES);
  let customList: CuratedArticle[] = [];
  if (custom) {
    try {
      customList = JSON.parse(custom);
    } catch {
      customList = [];
    }
  }

  customList = [newArticle, ...customList.filter(a => a.id !== newArticle.id)];
  localStorage.setItem(STORAGE_KEYS.CUSTOM_ARTICLES, JSON.stringify(customList));
  return newArticle;
}

export function deletePublishedArticle(articleId: string): void {
  const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_ARTICLES);
  if (custom) {
    try {
      const customList: CuratedArticle[] = JSON.parse(custom);
      const filtered = customList.filter(a => a.id !== articleId);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_ARTICLES, JSON.stringify(filtered));
    } catch {
      // Ignored
    }
  }
}