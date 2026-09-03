import type { CandidateArticle, GeneratedArticleDraft, N8nWebhookConfig, DeploymentResult, UnsplashImageOption } from '../types/admin';
import type { CuratedArticle, Insight } from '../types/cms';
import { mockArticles, mockInsights } from '../data/mockCmsData';
import publishedContentData from '../data/publishedContent.json';

const STORAGE_KEYS = {
  ADMIN_PASSWORD: 'lycos_admin_pwd_hash',
  ADMIN_SESSION: 'lycos_admin_session',
  N8N_CONFIG: 'lycos_n8n_config',
  CUSTOM_ARTICLES: 'lycos_custom_articles',
  CUSTOM_INSIGHTS: 'lycos_custom_insights',
  SAVED_DRAFTS: 'lycos_saved_drafts',
};

const DEFAULT_N8N_CONFIG: N8nWebhookConfig = {
  searchWebhookUrl: 'http://localhost:5678/webhook/lycos-article-search',
  generateWebhookUrl: 'http://localhost:5678/webhook/lycos-article-generate',
  industrySearchWebhookUrl: 'http://localhost:5678/webhook/lycos-industry-search',
  industryScrapeWebhookUrl: 'http://localhost:5678/webhook/lycos-industry-scrape',
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

// 3.2 Industry Articles Generator for Explicit Demo / Fallback Mode
export function generateFallbackIndustryCandidates(_weekLabel: string, genre: string, startDateStr?: string): CandidateArticle[] {
  const sampleSources = ['Reuters Tech', 'Bloomberg Technology', 'The Verge', 'TechCrunch', 'Ars Technica', 'Wired Enterprise', 'The Wall Street Journal', 'Financial Times'];
  const baseDate = startDateStr ? new Date(startDateStr) : new Date();

  const industryHeadlines: string[] = [
    'NVIDIA Unveils Next-Gen Blackwell Ultra Architecture for Enterprise Inference',
    'OpenAI Expands Autonomous Agent Protocol for Enterprise Cloud Workflows',
    'Google DeepMind Announces Scalable Multi-Modal Reasoning Framework',
    'EU Regulators Clarify General Purpose AI Model Governance Guidelines',
    'Microsoft and Palantir Expand Sovereign Cloud Partnership for Defense Intelligence',
    'Anthropic Introduces Context Caching Reducing Model Compute Latency by 80%',
    'AWS Launches Dedicated Private AI Clusters with Zero-Trust Safeguards',
    'TSMC Advances 2nm Silicon Process Aimed at High-Density AI Accelerators',
    'Meta Open-Sources Llama 4 Infrastructure Suite with Distributed MoE Weights',
    'Apple Integrates On-Device Neural Engine Acceleration into Enterprise Security API',
    'Oracle Expands Sovereign Multi-Agent Datacenters Across EMEA Region',
    'Hugging Face and IBM Partner to Release Enterprise-Grade Open Governance Stack',
    'Intel Announces Gaudi 3 Silicon Benchmark Validating 2.5x Cost-Efficiency',
    'Snowflake and Databricks Converge on Unified Iceberg Semantic Graph Engine',
    'Cisco Deploys Real-Time Neural Network Telemetry Defenses for Tier-1 Operators'
  ];

  return industryHeadlines.map((title, idx) => {
    const pubDate = new Date(baseDate);
    pubDate.setDate(pubDate.getDate() + (idx % 6));
    const dateStr = pubDate.toISOString().split('T')[0];

    return {
      id: `ind-mock-${idx + 1}`,
      title,
      sourceName: sampleSources[idx % sampleSources.length],
      url: `https://www.${sampleSources[idx % sampleSources.length].toLowerCase().replace(/\s+/g, '')}.com/article/${idx + 101}`,
      publishedDate: dateStr,
      snippet: `Industry overview of ${title.toLowerCase()}, examining commercial deployment velocity, compute efficiencies, and strategic market impact for enterprise infrastructure.`,
      category: idx % 3 === 0 ? 'AI Policy' : idx % 3 === 1 ? 'Tech Trends' : 'Core Infrastructure',
      matchScore: Math.floor(93 + Math.random() * 6),
      tags: [genre === 'All' ? 'Industry News' : genre, 'Global Tech', '2026 Telemetry']
    };
  });
}

// 4.2 Fetch Industry Candidates via N8N Webhook (lycos-industry-search)
export async function fetchIndustryCandidatesFromN8n(
  weekInfo: { weekNumber: number; label: string; range: string; startDate: string; endDate: string },
  genre: string = 'All',
  config: N8nWebhookConfig = getN8nConfig()
): Promise<{ candidates: CandidateArticle[]; fromN8n: boolean; error?: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000);

    const webhookUrl = config.industrySearchWebhookUrl || 'http://localhost:5678/webhook/lycos-industry-search';

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey ? { 'Authorization': `Bearer ${config.apiKey}` } : {})
      },
      body: JSON.stringify({
        week: weekInfo.weekNumber,
        weekLabel: weekInfo.label,
        weekRange: weekInfo.range,
        startDate: weekInfo.startDate,
        endDate: weekInfo.endDate,
        genre,
        limit: 15,
        pipeline: 'industry-search',
        timestamp: new Date().toISOString()
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`N8N Industry Search Webhook returned HTTP ${response.status}: ${errText || response.statusText}`);
    }

    const data = await response.json();
    
    let rawList: any[] = [];
    if (Array.isArray(data)) {
      rawList = data;
    } else if (Array.isArray(data.articles)) {
      rawList = data.articles;
    } else if (Array.isArray(data.candidates)) {
      rawList = data.candidates;
    } else if (Array.isArray(data.data)) {
      rawList = data.data;
    } else if (Array.isArray(data.output)) {
      rawList = data.output;
    } else if (typeof data === 'object') {
      const values = Object.values(data).find(v => Array.isArray(v));
      if (values) rawList = values as any[];
    }

    if (rawList.length > 0) {
      const formattedCandidates: CandidateArticle[] = rawList.map((item, idx) => ({
        id: item.id || `ind-n8n-${Date.now()}-${idx}`,
        title: item.title || item.headline || `Industry News #${idx + 1}`,
        sourceName: item.sourceName || item.source || item.publisher || 'Tech News Wire',
        url: item.url || item.link || item.sourceUrl || '#',
        publishedDate: item.publishedDate || item.date || weekInfo.startDate,
        snippet: item.snippet || item.summary || item.description || '',
        category: (item.category || (genre === 'All' ? 'Tech Trends' : genre)) as any,
        matchScore: item.matchScore || item.score || Math.floor(93 + (Math.random() * 6)),
        tags: Array.isArray(item.tags) ? item.tags : [genre, 'Industry Intel']
      }));

      return { candidates: formattedCandidates, fromN8n: true };
    } else {
      throw new Error('N8N Industry Search response did not return an array of articles. Check your Qwen Industry Search workflow.');
    }
  } catch (err: any) {
    console.error('N8N industry search fetch error:', err);
    return {
      candidates: [],
      fromN8n: false,
      error: err.name === 'AbortError'
        ? 'N8N Industry Search timed out after 2 minutes. Please check your LM Studio execution in N8N.'
        : `N8N Industry Connection Error: ${err.message || 'Failed to reach ' + config.industrySearchWebhookUrl}`
    };
  }
}

// 5.2 Scrape & Extract Industry Article Metadata via N8N Webhook (lycos-industry-scrape)
export async function scrapeIndustryArticleWithN8n(
  candidate: CandidateArticle,
  config: N8nWebhookConfig = getN8nConfig()
): Promise<{ draft: GeneratedArticleDraft | null; fromN8n: boolean; error?: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000);

    const webhookUrl = config.industryScrapeWebhookUrl || 'http://localhost:5678/webhook/lycos-industry-scrape';

    const response = await fetch(webhookUrl, {
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
        publishedDate: candidate.publishedDate,
        snippet: candidate.snippet,
        category: candidate.category,
        pipeline: 'industry-scrape',
        timestamp: new Date().toISOString()
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`N8N Industry Scrape Webhook returned HTTP ${response.status}: ${errText || response.statusText}`);
    }

    const data = await response.json();
    if (data && (data.title || data.headline)) {
      let options: UnsplashImageOption[] = [];
      if (Array.isArray(data.imageOptions) && data.imageOptions.length > 0) {
        options = data.imageOptions.map((img: any, idx: number) => ({
          id: img.id || `ind-img-${idx + 1}`,
          url: img.url || img.regular || img.raw || img.thumb,
          thumb: img.thumb || img.small || img.url,
          alt: img.alt || img.description || 'Scraped Industry Asset',
          photographer: img.photographer || (img.user ? img.user.name : candidate.sourceName),
          photographerUrl: img.photographerUrl || (img.user && img.user.links ? img.user.links.html : undefined),
          downloadLocation: img.downloadLocation || (img.links ? img.links.download_location : undefined)
        }));
      } else if (Array.isArray(data.images) && data.images.length > 0) {
        options = data.images.map((img: any, idx: number) => ({
          id: img.id || `ind-img-${idx + 1}`,
          url: img.url || img.regular || img.thumb,
          thumb: img.thumb || img.url,
          alt: img.alt || 'Scraped Industry Asset',
          photographer: img.photographer || candidate.sourceName,
          photographerUrl: img.photographerUrl
        }));
      } else {
        options = generateFallbackImageOptions(data.imageSearchQuery || candidate.title);
      }

      const defaultSelected = options[0];

      return {
        draft: {
          id: `art-ind-${Date.now()}`,
          candidateId: candidate.id,
          title: data.title || candidate.title,
          sourceName: data.sourceName || data.publisher || candidate.sourceName,
          sourceUrl: data.sourceUrl || data.url || candidate.url,
          publishedDate: data.publishedDate || candidate.publishedDate,
          category: data.category || candidate.category,
          importance: data.importance || 'High',
          tags: data.tags || candidate.tags,
          customSummary: data.summary || data.customSummary || candidate.snippet,
          commentary: data.commentary || `Lycos Core Industry Telemetry: Verified reporting from ${candidate.sourceName}. Demonstrates active enterprise market momentum and infrastructure scaling.`,
          content: data.content || data.body || `### Scraped Metadata Report\n\n**Source**: [${candidate.sourceName}](${candidate.url})\n**Published Date**: ${candidate.publishedDate}\n\n${candidate.snippet}\n\n### Strategic Relevance\n\nThis industry development directly impacts enterprise multi-agent deployment patterns and cloud acceleration strategies.`,
          imageUrl: data.imageUrl || (defaultSelected ? defaultSelected.url : './media/Parallax.png'),
          imagePrompt: data.imagePrompt || `High-tech journalism photography covering ${candidate.title}`,
          imageSearchQuery: data.imageSearchQuery || `${candidate.category} tech news enterprise`,
          imageOptions: options,
          selectedImageOptionId: defaultSelected ? defaultSelected.id : undefined,
          curator: data.curator || `Lycos Industry Desk (${candidate.sourceName})`,
          contentType: 'curated_news',
          linkedInPost: {
            headline: data.linkedInHeadline || `📰 Industry Wire: ${candidate.title}`,
            body: data.linkedInBody || `Major industry movement reported by ${candidate.sourceName}: ${candidate.title}.\n\nExplore how this impacts cognitive architecture and autonomous workflows.\n\n🔗 Full industry brief on Lycos Core.`,
            hashtags: data.hashtags || ['#TechNews', '#IndustryAdvisory', '#EnterpriseAI', '#LycosCore'],
            status: 'draft'
          },
          status: 'draft'
        },
        fromN8n: true
      };
    } else {
      throw new Error('N8N Scrape output missing required metadata. Check Parse Scraped HTML / LLM node.');
    }
  } catch (err: any) {
    console.error('N8N industry scrape fetch error:', err);
    return {
      draft: null,
      fromN8n: false,
      error: err.name === 'AbortError'
        ? 'N8N Industry Scrape timed out after 2 minutes. Check scraper response in N8N.'
        : `N8N Industry Scrape Error: ${err.message || 'Failed to reach ' + config.industryScrapeWebhookUrl}`
    };
  }
}

// 4.1 Unsplash Fallback Image Options Generator
export function generateFallbackImageOptions(_query = 'AI Neural Systems'): UnsplashImageOption[] {
  return [
    {
      id: 'unsplash-ai-1',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
      alt: 'Abstract Neural Mesh and Optical Grids',
      photographer: 'Milad Fakurian',
      photographerUrl: 'https://unsplash.com/@fakurian'
    },
    {
      id: 'unsplash-ai-2',
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80',
      alt: 'High-Density Server Architecture & Hardware Telemetry',
      photographer: 'Conny Schneider',
      photographerUrl: 'https://unsplash.com/@connyschneider'
    },
    {
      id: 'unsplash-ai-3',
      url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=400&q=80',
      alt: 'Quantum Cognitive Nodes and Deterministic Systems',
      photographer: 'Google DeepMind',
      photographerUrl: 'https://unsplash.com/@deepmind'
    }
  ];
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
      // Map Unsplash imageOptions from N8N response if provided
      let options: UnsplashImageOption[] = [];
      if (Array.isArray(data.imageOptions) && data.imageOptions.length > 0) {
        options = data.imageOptions.map((img: any, idx: number) => ({
          id: img.id || `img-${idx + 1}`,
          url: img.url || img.regular || img.raw || img.thumb,
          thumb: img.thumb || img.small || img.url,
          alt: img.alt || img.description || img.alt_description || 'Curated Unsplash Asset',
          photographer: img.photographer || (img.user ? img.user.name : 'Unsplash Contributor'),
          photographerUrl: img.photographerUrl || (img.user && img.user.links ? img.user.links.html : undefined),
          downloadLocation: img.downloadLocation || (img.links ? img.links.download_location : undefined)
        }));
      } else if (Array.isArray(data.images) && data.images.length > 0) {
        options = data.images.map((img: any, idx: number) => ({
          id: img.id || `img-${idx + 1}`,
          url: img.url || img.regular || img.thumb,
          thumb: img.thumb || img.url,
          alt: img.alt || 'Curated Unsplash Asset',
          photographer: img.photographer || 'Unsplash Contributor',
          photographerUrl: img.photographerUrl
        }));
      } else {
        options = generateFallbackImageOptions(data.imageSearchQuery || candidate.title);
      }

      const defaultSelected = options[0];

      return {
        draft: {
          id: `art-${Date.now()}`,
          candidateId: candidate.id,
          title: data.title || data.headline,
          sourceName: data.sourceName || 'Lycos Core Intel',
          sourceUrl: candidate.url,
          publishedDate: candidate.publishedDate,
          category: data.category || candidate.category,
          importance: data.importance || 'High',
          tags: data.tags || candidate.tags,
          customSummary: data.summary || data.customSummary || candidate.snippet,
          commentary: data.commentary || 'Lycos Core Analysis: This breakthrough establishes clear viability for autonomous agent integration in high-throughput enterprise infrastructure.',
          content: data.content || data.body,
          imageUrl: data.imageUrl || (defaultSelected ? defaultSelected.url : './media/Parallax.png'),
          imagePrompt: data.imagePrompt || 'Cinematic futuristic server room with glowing green neural nodes and glass interfaces',
          imageSearchQuery: data.imageSearchQuery || `${candidate.category} neural network server technology`,
          imageOptions: options,
          selectedImageOptionId: defaultSelected ? defaultSelected.id : undefined,
          curator: 'Lycos Core Intelligence Desk',
          contentType: 'owned_insight',
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

// 7.1 Sync Content to GitHub Repository before deployment
export async function syncPublishedContentToGitHub(
  owner: string,
  repo: string,
  branch: string,
  token: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const currentArticles = getPublishedArticles();
    const currentInsights = getPublishedInsights();

    const contentPayload = {
      updatedAt: new Date().toISOString(),
      articles: currentArticles,
      insights: currentInsights
    };

    const jsonString = JSON.stringify(contentPayload, null, 2);
    const encodedContent = btoa(unescape(encodeURIComponent(jsonString)));
    const filePath = 'src/data/publishedContent.json';

    // 1. Get current SHA if file exists in the branch
    let sha: string | undefined;
    try {
      const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`, {
        headers: {
          'Authorization': `Bearer ${token.trim()}`,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
      if (getRes.ok) {
        const fileData = await getRes.json();
        sha = fileData.sha;
      }
    } catch {
      // New file creation
    }

    // 2. Commit updated publishedContent.json to branch
    const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token.trim()}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `chore(cms): sync ${currentArticles.length} articles and ${currentInsights.length} insights to ${branch} [skip ci]`,
        content: encodedContent,
        branch: branch,
        ...(sha ? { sha } : {})
      })
    });

    if (putRes.ok || putRes.status === 201 || putRes.status === 200) {
      return { success: true };
    } else {
      const errData = await putRes.json().catch(() => ({}));
      return { success: false, message: errData.message || `GitHub returned ${putRes.status}` };
    }
  } catch (err: any) {
    return { success: false, message: err.message || 'Network error syncing content to GitHub' };
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
      // 1. Sync published articles & insights to the branch first
      const syncResult = await syncPublishedContentToGitHub(owner, repo, branch, config.githubToken);
      if (!syncResult.success) {
        console.warn('GitHub content sync note:', syncResult.message);
      }

      // 2. Trigger workflow dispatch
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
          message: `✓ Articles synchronized to GitHub & Actions pipeline triggered! Deploying to ${target.toUpperCase()} via branch '${branch}'.`,
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

// 8. Articles & Insights Local Storage Management
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

  const baseList: CuratedArticle[] = (publishedContentData && Array.isArray((publishedContentData as any).articles) && (publishedContentData as any).articles.length > 0)
    ? (publishedContentData as any).articles
    : mockArticles;

  const map = new Map<string, CuratedArticle>();
  baseList.forEach(a => map.set(a.id, a));
  customList.forEach(a => map.set(a.id, a));
  return Array.from(map.values()).reverse();
}

export function getPublishedInsights(): Insight[] {
  const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_INSIGHTS);
  let customList: Insight[] = [];
  if (custom) {
    try {
      customList = JSON.parse(custom);
    } catch {
      customList = [];
    }
  }

  const baseList: Insight[] = (publishedContentData && Array.isArray((publishedContentData as any).insights) && (publishedContentData as any).insights.length > 0)
    ? (publishedContentData as any).insights
    : mockInsights;

  const map = new Map<string, Insight>();
  baseList.forEach(i => map.set(i.id, i));
  customList.forEach(i => map.set(i.id, i));
  return Array.from(map.values()).reverse();
}

export function publishArticleToSite(draft: GeneratedArticleDraft): CuratedArticle {
  const selectedOption = draft.imageOptions?.find(o => o.id === draft.selectedImageOptionId);
  const photographer = selectedOption?.photographer;
  const contentType = draft.contentType || (draft.sourceName === 'Lycos Core Intel' || draft.curator?.includes('Intelligence') ? 'owned_insight' : 'curated_news');

  const newArticle: CuratedArticle = {
    id: draft.id,
    title: draft.title,
    url: draft.sourceUrl || (contentType === 'owned_insight' ? `https://lycoscore.com/#/insights` : `https://lycoscore.com/#/articles`),
    sourceName: draft.sourceName || (contentType === 'owned_insight' ? 'Lycos Core Intel' : 'Industry Wire'),
    publishedDate: draft.publishedDate,
    category: (draft.category as any) || (contentType === 'owned_insight' ? 'Strategic Advisory' : 'Core Infrastructure'),
    customSummary: draft.customSummary,
    commentary: draft.commentary,
    curator: draft.curator || (contentType === 'owned_insight' ? 'Lycos Core Intelligence Desk' : 'Lycos Intelligence Team'),
    importance: draft.importance,
    tags: draft.tags,
    imageUrl: draft.imageUrl,
    photographer: photographer,
    contentType: contentType,
    content: draft.content
  };

  // 1. Save to Unified Repository (CUSTOM_ARTICLES)
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

  // 2. If Owned Industry Insight, also sync directly to Owned Insights Repository (CUSTOM_INSIGHTS)
  if (contentType === 'owned_insight') {
    const formattedContent = draft.content && draft.content.startsWith('<')
      ? draft.content
      : draft.content
        ? draft.content.split('\n\n').map(p => p.startsWith('#') ? `<h3>${p.replace(/^#+\s*/, '')}</h3>` : `<p>${p}</p>`).join('')
        : `<p>${draft.customSummary}</p><p>${draft.commentary}</p>`;

    const newInsight: Insight = {
      id: draft.id,
      title: draft.title,
      slug: draft.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      summary: draft.customSummary,
      content: formattedContent,
      author: {
        name: 'Lycos Core Intelligence Desk',
        role: 'Principal AI Strategy & Architecture',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
        bio: 'Proprietary architectural and strategic intelligence produced by the Lycos Core technical desk.'
      },
      category: (['AI Governance', 'Agentic Frameworks', 'Neural Architectures', 'Strategic Advisory'].includes(draft.category as any)
        ? draft.category
        : 'Strategic Advisory') as any,
      readTime: Math.max(3, Math.ceil((draft.content?.length || 600) / 450)),
      publishedDate: draft.publishedDate,
      featuredImage: draft.imageUrl || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop',
      status: 'Published',
      tags: draft.tags
    };

    const customInsightsRaw = localStorage.getItem(STORAGE_KEYS.CUSTOM_INSIGHTS);
    let customInsightsList: Insight[] = [];
    if (customInsightsRaw) {
      try {
        customInsightsList = JSON.parse(customInsightsRaw);
      } catch {
        customInsightsList = [];
      }
    }
    customInsightsList = [newInsight, ...customInsightsList.filter(i => i.id !== newInsight.id)];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_INSIGHTS, JSON.stringify(customInsightsList));
  }

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

  const customInsightsRaw = localStorage.getItem(STORAGE_KEYS.CUSTOM_INSIGHTS);
  if (customInsightsRaw) {
    try {
      const customInsightsList: Insight[] = JSON.parse(customInsightsRaw);
      const filtered = customInsightsList.filter(i => i.id !== articleId);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_INSIGHTS, JSON.stringify(filtered));
    } catch {
      // Ignored
    }
  }
}