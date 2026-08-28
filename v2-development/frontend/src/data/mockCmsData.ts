/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Insight, CuratedArticle, CaseStudy } from '../types/cms';

export const mockInsights: Insight[] = [
  {
    id: 'insight-1',
    title: 'Unlocking Agentic Velocity: Architecting Resilient Decision Engines',
    slug: 'unlocking-agentic-velocity-decision-engines',
    summary: 'Discover how multi-agent frameworks are transitioning from toy demonstrations to server-authoritative enterprise decision pipelines, securing extreme speed and compliance.',
    content: `
      <p>The first generation of enterprise Large Language Model (LLM) deployments was characterized by simple retrieval-augmented generation (RAG) — answering FAQs, drafting emails, and summarizing documents. While valuable, these workflows are ultimately passive. Today, a paradigm shift is underway toward <strong>Agentic Architectures</strong>: autonomous systems that can analyze, reason, plan, use tools, and execute multi-step operations to achieve complex business goals.</p>
      
      <h3>The Architecture of Autonomy</h3>
      <p>True operational velocity requires agents that can run asynchronously and collaborate with other specialized models. An enterprise-grade agentic stack consists of three primary layers:</p>
      <ul>
        <li><strong>The Cognitive Core:</strong> Powered by advanced reasoning models, this layer manages task decomposition, memory storage (short-term state and long-term vector embeddings), and self-reflection loops.</li>
        <li><strong>The Tool Registry:</strong> A secure, sandboxed API layer allowing the agent to read and write database records, execute calculations, and interact with external SaaS systems safely.</li>
        <li><strong>The Guardrail Middleware:</strong> An absolute necessity for enterprise deployment. This layer intercepts input and output streams, validating compliance, ensuring privacy constraints (e.g., stripping PII), and checking safety thresholds.</li>
      </ul>

      <blockquote>
        "The difference between an LLM chatbot and an autonomous agent is the difference between a consultant who gives advice and an executive who gets things done."
      </blockquote>

      <h3>Securing Operational Velocity</h3>
      <p>When deploying multi-agent systems, organizations often encounter latency and non-deterministic behavior. To combat this, we recommend a <em>headless, server-authoritative setup</em>. By constraining agent environments with strict state machines and routing protocols, we can guarantee consistent execution times and complete auditable history of agent actions.</p>
      
      <p>In our recent deployments, replacing legacy synchronous processes with agentic execution streams reduced decision-making latency by up to 88% while increasing accuracy in regulatory filings. The future belongs to organizations that can build, govern, and scale these cognitive workers.</p>
    `,
    category: 'Agentic Frameworks',
    readTime: 6,
    publishedDate: '2026-06-15',
    featuredImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop',
    status: 'Published',
    tags: ['Agents', 'Orchestration', 'Cognitive Layer', 'Architecture'],
    author: {
      name: 'Dr. Helen Vance',
      role: 'Principal AI Systems Architect',
      bio: 'Dr. Helen Vance specializes in distributed intelligence and agentic runtime orchestration. Formerly a research lead at MIT, she guides Lycoscore\'s core technical frameworks.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop'
    }
  },
  {
    id: 'insight-2',
    title: 'The EU AI Act and Enterprise Compliance: Establishing Ethical Model Governance',
    slug: 'eu-ai-act-enterprise-compliance-governance',
    summary: 'A deep dive into the regulatory demands of modern AI governance, explaining the practical frameworks required to build compliant, audit-ready machine learning pipelines.',
    content: `
      <p>As the European Union AI Act begins its phased enforcement, global enterprises are realizing that compliance is not just a legal hurdle — it is an engineering requirement. Any organization deploying machine learning models that affect European citizens, regardless of where the servers reside, must implement rigorous auditing and risk-assessment systems immediately.</p>
      
      <h3>Classifying Model Risk</h3>
      <p>The EU AI Act categorizes AI applications into distinct risk tiers, each with escalating levels of mandatory oversight:</p>
      <ol>
        <li><strong>Unacceptable Risk:</strong> Cognitive manipulation, social scoring, and real-time biometric identification in public spaces (with minor exceptions). These systems are strictly prohibited.</li>
        <li><strong>High Risk:</strong> Systems managing critical infrastructure, educational access, hiring algorithms, credit scoring, or law enforcement. These demand comprehensive compliance frameworks, explainability logs, and human oversight.</li>
        <li><strong>Limited/Minimal Risk:</strong> Generative systems like chatbots and content summarizers. These carry light transparency obligations (e.g., users must know they are interacting with AI).</li>
      </ol>

      <h3>Building the Audit-Ready ML Pipeline</h3>
      <p>To establish compliance without stifling developer velocity, organizations should build automated governance guardrails directly into their MLOps continuous integration pipelines. This involves:</p>
      <ul>
        <li><strong>Data Lineage Mapping:</strong> Programmatic tracking of raw training sets, preprocessing scripts, and validation splits to prove fair sourcing and compliance.</li>
        <li><strong>Continuous Bias Testing:</strong> Evaluating model inferences against demographic cohorts to detect and mitigate systemic algorithmic bias before deployment.</li>
        <li><strong>Explainability Logs:</strong> Deploying SHAP or LIME-based explainability layers to translate high-dimensional model decisions into human-interpretable rationale for high-risk credit or operational decisions.</li>
      </ul>

      <p>At Lycoscore, we believe that robust governance is the ultimate enabler of scaling AI. By treating ethics as a system parameter, enterprises can deploy with absolute confidence, staying far ahead of the regulatory curve.</p>
    `,
    category: 'AI Governance',
    readTime: 8,
    publishedDate: '2026-05-28',
    featuredImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=600&auto=format&fit=crop',
    status: 'Published',
    tags: ['Compliance', 'AI Law', 'Ethics', 'MLOps', 'Governance'],
    author: {
      name: 'Marcus Thorne',
      role: 'Director of AI Policy and Governance',
      bio: 'Marcus Thorne leads enterprise compliance strategy at Lycoscore. He has advised federal regulatory bodies on algorithm accountability and data privacy standards.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop'
    }
  },
  {
    id: 'insight-3',
    title: 'Beyond RAG: Leveraging Semantic Caching for Sub-10ms Context Injection',
    slug: 'beyond-rag-semantic-caching-context-injection',
    summary: 'Discover how semantic caching eliminates redundant vector database queries, cutting compute costs and optimizing LLM latency down to single-digit milliseconds.',
    content: `
      <p>Retrieval-Augmented Generation (RAG) is the gold standard for connecting LLMs to private corporate knowledge. However, as query volumes scale, RAG pipelines quickly become cost-prohibitive and slow. The bottleneck lies in executing constant vector database searches and embedding generation. To build truly responsive applications, we need a faster way to supply context: <strong>Semantic Caching</strong>.</p>
      
      <h3>The Inefficiency of Redundant Inquiries</h3>
      <p>In typical enterprise support or search applications, up to 40% of user queries are semantically similar. For instance, "How do I reset my password?" and "I forgot my password, how to change it?" ask the same core question. Executing vector queries, pulling context, and calling LLM APIs for both is incredibly wasteful.</p>
      
      <h3>How Semantic Caching Works</h3>
      <p>A semantic cache resides between the user and the RAG pipeline. Instead of looking for exact string matches (like traditional database caches), it performs a fast cosine similarity calculation on the query's vector embedding against a local, high-speed cache of previously resolved queries.</p>
      
      <ul>
        <li>If a query achieves a similarity score above a strict threshold (e.g., 0.96), the cache directly serves the previously validated answer. <strong>Time to resolve: &lt;10ms. Cost: $0.00.</strong></li>
        <li>If the query falls below the similarity threshold, it proceeds to the full RAG pipeline and LLM generation, saving the new result in the cache for future use.</li>
      </ul>

      <p>By implementing semantic caching layers on top of Redis or high-performance edge key-value databases, Lycoscore has helped clients reduce annual OpenAI/Gemini API expenses by up to 55% while delivering lightning-fast, ultra-low-latency interface interactions.</p>
    `,
    category: 'Neural Architectures',
    readTime: 5,
    publishedDate: '2026-04-12',
    featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
    status: 'Published',
    tags: ['RAG', 'Semantic Cache', 'Redis', 'Latency', 'Optimization'],
    author: {
      name: 'Siddharth Mehta',
      role: 'Principal Research Scientist',
      bio: 'Siddharth Mehta works on high-frequency semantic storage and vector query optimization. He holds over 12 patents in neural information retrieval systems.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
    }
  },
  {
    id: 'insight-4',
    title: 'Operational Synergy in Edge AI Computing: Bypassing Cloud Congestion',
    slug: 'operational-synergy-edge-ai-computing-cloud-congestion',
    category: 'Strategic Advisory',
    publishedDate: '2026-06-02',
    readTime: 5,
    status: 'Published',
    summary: 'Explore how edge computing nodes remove traditional transiting dependencies, offering local network speed and absolute control over sensitive data footprints.',
    content: `
      <p>As model logic expands, cloud latency is becoming an operational bottleneck. Deploying compact reasoning models at the edge removes dependency on persistent network availability.</p>
      <p>Our client pilots indicate that localized intelligence pipelines can bypass cloud routing completely, reducing data package sizes and network congestion by up to 74%.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
    author: {
      name: 'Marcus Thorne',
      role: 'Director of AI Policy and Governance',
      bio: 'Marcus Thorne leads enterprise compliance strategy at Lycoscore. He has advised federal regulatory bodies on algorithm accountability and data privacy standards.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop'
    },
    tags: ['Edge AI', 'Infrastructure', 'Latency', 'Cloud Bypass']
  },
  {
    id: 'insight-5',
    title: 'Regulatory Frameworks for Agent Autonomy: Mapping Compliance in Multi-State Systems',
    slug: 'regulatory-frameworks-agent-autonomy-compliance',
    category: 'AI Governance',
    publishedDate: '2026-04-20',
    readTime: 7,
    status: 'Published',
    summary: 'Analyze the evolving regulatory compliance requirements governing multi-agent system execution loops, with a step-by-step roadmap for compliance audits.',
    content: `
      <p>Autonomy demands strict auditability. Under new regulatory frameworks, multi-agent decisions must be logged and explainable to third-party observers.</p>
      <p>We advise developers to implement read-only state validation checkpoints that log every API command requested by agents, guaranteeing audit-ready compliance.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=600&auto=format&fit=crop',
    author: {
      name: 'Dr. Helen Vance',
      role: 'Principal AI Systems Architect',
      bio: 'Dr. Helen Vance specializes in distributed intelligence and agentic runtime orchestration. Formerly a research lead at MIT, she guides Lycoscore\'s core technical frameworks.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop'
    },
    tags: ['Compliance', 'Governance', 'Agent Audit', 'Ethics']
  },
  {
    id: 'insight-6',
    title: 'The Cost-Efficiency Curve of Quantized Model Deployments in Production',
    slug: 'cost-efficiency-quantized-model-deployments',
    category: 'Neural Architectures',
    publishedDate: '2026-03-05',
    readTime: 6,
    status: 'Published',
    summary: 'An exploration of how 4-bit and 8-bit model quantization reduces hosting costs, making local compute architectures highly viable for enterprise applications.',
    content: `
      <p>Deploying models in-house is often perceived as a cost barrier. By leveraging advanced 4-bit quantization, modern reasoning networks can be run on standard server hardware without sacrificing precision.</p>
      <p>This curve allows scaling query throughput exponentially while decreasing active hardware costs down to fractional levels compared to hosted SaaS options.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop',
    author: {
      name: 'Siddharth Mehta',
      role: 'Principal Research Scientist',
      bio: 'Siddharth Mehta works on high-frequency semantic storage and vector query optimization. He holds over 12 patents in neural information retrieval systems.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
    },
    tags: ['Quantization', 'Production compute', 'Model Size', 'Frugal AI']
  },
  {
    id: 'insight-7',
    title: 'Neural Routing Pipelines: Context-Aware Prompt Orchestration at Scale',
    slug: 'neural-routing-pipelines-prompt-orchestration',
    category: 'Agentic Frameworks',
    publishedDate: '2026-01-18',
    readTime: 5,
    status: 'Published',
    summary: 'Discover how context-aware routers direct natural language inquiries to specialized micro-models, optimizing compute load and task accuracy.',
    content: `
      <p>Routing queries to a single frontier model is highly inefficient. Neural routing pipelines categorize incoming context parameters to map prompts onto small, specialized models.</p>
      <p>By routing simple classification tasks to sub-3B parameter systems, overall token expenses are optimized, reserving large models only for complex reasoning tasks.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
    author: {
      name: 'Dr. Helen Vance',
      role: 'Principal AI Systems Architect',
      bio: 'Dr. Helen Vance specializes in distributed intelligence and agentic runtime orchestration. Formerly a research lead at MIT, she guides Lycoscore\'s core technical frameworks.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop'
    },
    tags: ['Prompt Routing', 'Orchestration', 'Micro-Models', 'Token Optimization']
  }
];

export const mockArticles: CuratedArticle[] = [
  {
    id: 'article-1',
    title: 'The Emergence of Highly Compact LLMs in On-Device Processing',
    url: 'https://www.wired.com/compact-llm-on-device',
    sourceName: 'Wired',
    publishedDate: '2026-07-02',
    category: 'Core Infrastructure',
    importance: 'High',
    customSummary: 'Industry shift accelerating towards sub-4B parameter models specifically trained on ultra-dense high-quality datasets. These compact models achieve comparable performance to frontier models on specialized tasks while running entirely offline on consumer hardware.',
    commentary: `
      <p>This development is highly aligned with our thesis on <strong>Headless AI Architecture</strong>. For security-sensitive industries like banking and healthcare, the ability to run inferences completely on-device without transiting public cloud networks solves massive compliance headaches.</p>
      <p>We are actively implementing 4-bit quantized versions of these compact models inside local IoT sensors and client terminals. The cost of running these is effectively zero after initial deployment, completely bypassing SaaS subscription dependency.</p>
    `,
    curator: 'Lycos Intelligence Team',
    tags: ['Compact LLMs', 'On-Device', 'Quantization', 'Local Inference']
  },
  {
    id: 'article-2',
    title: 'Global Tech Consortium Proposes Standard for AI Agent Tool Interoperability',
    url: 'https://techcrunch.com/agent-tool-interoperability',
    sourceName: 'TechCrunch',
    publishedDate: '2026-06-20',
    category: 'Tech Trends',
    importance: 'Medium',
    customSummary: 'Leading technology organizations have formed a coalition to draft standard protocol specifications for how autonomous agents request, authorize, and consume external API tools. The goal is to establish a universal interface reminiscent of the OpenAPI specification.',
    commentary: `
      <p>A universal interoperability standard for agent tools will accelerate ecosystem development exponentially. Currently, developers must write custom wrappers for every API that an agent needs to call. Standardizing these interfaces will allow different agent systems to collaborate seamlessly.</p>
      <p>At Lycoscore, we are ahead of this curve by building our <em>Tool Registry</em> around strict JSON Schema definitions, ensuring that any system we design today will be fully compatible with tomorrow\'s universal specifications.</p>
    `,
    curator: 'Dr. Helen Vance',
    tags: ['Agent Standards', 'APIs', 'Consortium', 'Tool Call']
  },
  {
    id: 'article-3',
    title: 'Supreme Court Issues Landmark Ruling on Synthetic Training Data Fair Use',
    url: 'https://www.nytimes.com/synthetic-data-ruling',
    sourceName: 'The New York Times',
    publishedDate: '2026-05-14',
    category: 'AI Policy',
    importance: 'Critical',
    customSummary: 'The court ruled that synthetic datasets generated by computer models based on copyrighted public data fall under fair use doctrines, provided the synthetic outputs do not copy or clone unique stylistic signatures or trade secrets of the original creators.',
    commentary: `
      <p>This is a <strong>critical advisory</strong>. Intellectual property bottlenecks have been a primary risk factor for enterprise generative AI adoption. This legal victory provides a green light for training specialized models on high-fidelity synthetic data pipelines.</p>
      <p>We advise clients to establish a rigorous "Synthetic Sandbox" where generated datasets are analyzed by compliance scripts before being loaded into active training arrays. This ensures compliance while maximizing data volumes.</p>
    `,
    curator: 'Marcus Thorne',
    tags: ['Synthetic Data', 'IP Law', 'Supreme Court', 'Fair Use']
  },
  {
    id: 'article-4',
    title: 'Gartner Predicts 40% of Enterprise Workloads to Contain Autonomous Agents by 2027',
    url: 'https://www.gartner.com/autonomous-agents-workloads-2027',
    sourceName: 'Gartner',
    publishedDate: '2026-06-25',
    category: 'Tech Trends',
    importance: 'High',
    customSummary: 'Gartner reports that the shift from simple RAG chatbots to active agentic frameworks is accelerating, predicting that nearly half of standard workflows will rely on autonomous execution units.',
    commentary: `
      <p>This projection highlights the urgency for enterprise strategy alignment. Businesses that fail to build secure, auditable agent frameworks today will face massive operational deficits tomorrow.</p>
      <p>We are advising our partners to establish internal agent sandboxes now, focusing on database-safe execution patterns and middleware safety guardrails.</p>
    `,
    curator: 'Lycos Intelligence Team',
    tags: ['Gartner', 'Workloads', 'Agent Adoption', 'Future of Work']
  },
  {
    id: 'article-5',
    title: 'MIT Technology Review Explores the Security Pitfalls of RAG Architectures',
    url: 'https://www.technologyreview.com/rag-security-pitfalls',
    sourceName: 'MIT Technology Review',
    publishedDate: '2026-05-18',
    category: 'Core Infrastructure',
    importance: 'High',
    customSummary: 'A comprehensive study highlighting vulnerability vectors in classic retrieval-augmented systems, including prompt injection risks and unstructured data leaks.',
    commentary: `
      <p>RAG pipelines are highly susceptible to malicious prompt injection if they lack input filtering layer. We recommend implementing compliance checkers on raw data retrieval feeds.</p>
      <p>At Lycoscore, we build strict validator checkpoints directly within RAG pipelines to sanitize retrieved documents before presenting them to the model.</p>
    `,
    curator: 'Siddharth Mehta',
    tags: ['RAG Security', 'Injections', 'Data Leaks', 'Compliance']
  },
  {
    id: 'article-6',
    title: 'Frontier Labs Announce Open-Weights Reasoning Model with Native Code Interpreter',
    url: 'https://techcrunch.com/open-weights-reasoning-model',
    sourceName: 'TechCrunch',
    publishedDate: '2026-04-09',
    category: 'Tech Trends',
    importance: 'Medium',
    customSummary: 'Frontier Labs released a highly optimized open-weights reasoning model equipped with sandboxed runtime environments allowing the model to write and execute python code.',
    commentary: `
      <p>Open-weights models with native code interpreters allow deploying code execution agents entirely on-premises. This is a game-changer for financial institutions requiring strict data isolation.</p>
      <p>We are testing this model inside local Docker containers, evaluating sandbox security constraints and calculation efficiency for risk modeling.</p>
    `,
    curator: 'Dr. Helen Vance',
    tags: ['Open Weights', 'Code Execution', 'On-Premises', 'Reasoning']
  },
  {
    id: 'article-7',
    title: 'Regulatory Hurdles Mount for Cross-Border Enterprise Data Governance',
    url: 'https://www.bloomberg.com/cross-border-data-governance',
    sourceName: 'Bloomberg',
    publishedDate: '2026-03-12',
    category: 'AI Policy',
    importance: 'Critical',
    customSummary: 'Global data regulators are tightening rules governing where training sets can be stored and processed, mounting compliance hurdles for multinational enterprises.',
    commentary: `
      <p>This is a critical alert for global operations. Sharing user contexts across borders now carries high litigation risk. Localized deployment arrays and local model execution are the only robust solutions.</p>
      <p>We are helping our enterprise partners migrate data pipelines to region-locked virtual networks, establishing compliance checkpoints at national boundaries.</p>
    `,
    curator: 'Marcus Thorne',
    tags: ['Data Policy', 'Data Sovereignty', 'Compliance', 'Cross-Border']
  },
  {
    id: 'article-8',
    title: 'The Rise of Custom Hardware Accelerators for Edge Model Inferences',
    url: 'https://www.wired.com/custom-hardware-edge-inference',
    sourceName: 'Wired',
    publishedDate: '2026-02-22',
    category: 'Core Infrastructure',
    importance: 'Low',
    customSummary: 'Chipmakers are releasing highly efficient custom accelerators tailored specifically to compute low-precision matrix operations on local client devices and sensors.',
    commentary: `
      <p>Custom accelerators bring advanced model inferences to small, low-power devices. This enables offline processing in remote areas or inside mobile logistics units.</p>
      <p>Our hardware divisions are currently testing local diagnostic routines using these accelerators, targeting zero-latency physical sensory auditing.</p>
    `,
    curator: 'Lycos Intelligence Team',
    tags: ['Silicon', 'Accelerators', 'Edge Compute', 'Hardware']
  },
  {
    id: 'article-9',
    title: 'Venture Capital Infusion in Agentic Startups Reaches Record Heights in Q1',
    url: 'https://www.forbes.com/vc-investment-agentic-startups',
    sourceName: 'Forbes',
    publishedDate: '2026-01-30',
    category: 'Tech Trends',
    importance: 'Medium',
    customSummary: 'Investment funds poured billions into agentic and cognitive orchestration startups, signaling strong investor confidence in the transition to autonomous software.',
    commentary: `
      <p>The heavy flow of capital guarantees rapid developer ecosystem maturation. Standard tooling and libraries for agentic operations will improve exponentially this year.</p>
      <p>We monitor this startup pipeline closely, integrating top-tier open-source tools into our systems to maintain state-of-the-art architectures.</p>
    `,
    curator: 'Lycos Intelligence Team',
    tags: ['Venture Capital', 'Q1 Funding', 'Agent Ecosystem', 'Startups']
  }
];

export const mockCaseStudies: CaseStudy[] = [
  {
    id: 'case-1',
    clientName: 'Lyra Logistics Group',
    title: 'Autonomous Customer Support Optimization with Cognitive Agent Pipelines',
    slug: 'autonomous-customer-support-agent-pipelines',
    industry: 'Logistics and Supply Chain',
    featured: true,
    projectDuration: '5 Months (Q1-Q2 2026)',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop',
    metrics: [
      { value: '92%', label: 'Resolution Accuracy Rate', isHighlight: true },
      { value: '90%', label: 'Reduced Operational Overhead', isHighlight: true },
      { value: 'R3.2M', label: 'Annual Financial Optimization', isHighlight: true },
      { value: '1.8s', label: 'Average Response Time', isHighlight: false }
    ],
    problem: 'Lyra Logistics was facing a massive influx of customer inquiries regarding real-time package rerouting, custom clearance status, and tracking disputes. Their manual support queue had average wait times of over 4 hours, driving customer satisfaction down and operational overhead up.',
    solution: `
      <p>Lycoscore built a headless, multi-agent support orchestrator integrated directly into Lyra\'s enterprise resource planning (ERP) database. The system uses a three-tier cognitive routing pipeline:</p>
      <ul>
        <li><strong>Intent Classifier Agent:</strong> Analyzes incoming natural language requests, parses entities (tracking numbers, addresses), and checks confidence thresholds.</li>
        <li><strong>Database Integration Agent:</strong> Executes parameterized database queries to pull tracking logs and clearance documents without displaying direct database access to users.</li>
        <li><strong>Resolution and Compliance Agent:</strong> Synthesizes answers, verifies compliance with customs rules, and formulates response templates.</li>
      </ul>
      <p>For complex edge cases, the system seamlessly escalates to human agents alongside a summarized context packet, preserving customer trust.</p>
    `,
    results: `
      <p>Within 30 days of active production, the cognitive agents resolved <strong>92% of queries autonomously</strong> without human intervention. The immediate deflection of routine support cases allowed Lyra to restructure their support divisions, reducing overhead by 90% and yielding an annual savings of <strong>R3.2M</strong>.</p>
      <p>Customer satisfaction scores soared as average response latency dropped from 4 hours to just <strong>1.8 seconds</strong>.</p>
    `,
    techStack: ['Node.js', 'FastAPI', 'Gemini Pro 1.5', 'PostgreSQL', 'LangChain', 'Redis']
  },
  {
    id: 'case-2',
    clientName: 'Apex Health Systems',
    title: 'Structuring Clinical Insights via Secure On-Premises Neural Extraction',
    slug: 'structuring-clinical-insights-neural-extraction',
    industry: 'Healthcare',
    featured: true,
    projectDuration: '6 Months',
    heroImage: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?q=80&w=600&auto=format&fit=crop',
    metrics: [
      { value: '99.4%', label: 'HIPAA Data Leakage Prevention', isHighlight: true },
      { value: '82%', label: 'Accelerated Diagnosis Auditing', isHighlight: true },
      { value: '55%', label: 'Reduction in Chart Review Time', isHighlight: true },
      { value: '0%', label: 'External Cloud Transits', isHighlight: false }
    ],
    problem: 'Apex Health managed millions of unstructured physician notes, clinical audio files, and referral PDFs. Because of strict HIPAA regulations, they could not upload these sensitive patient datasets to public cloud APIs, leaving valuable clinical trends completely locked in unsearchable text files.',
    solution: `
      <p>We engineered and deployed a series of local, fine-tuned, 8-bit quantized models running on secure, on-premises GPU servers. The system ingests clinical note logs, standardizes terminology to the unified medical language system (UMLS), and populates a secure relational PostgreSQL database with structured clinical parameters.</p>
      <p>A local semantic search engine was layered on top, allowing researchers to queries things like "patients with atypical cardiac patterns on beta-blockers" across millions of historic records instantly.</p>
    `,
    results: `
      <p>The on-premise pipeline extracted diagnostic records with over <strong>95% accuracy</strong>, matching the performance of public models. By automating the extraction, Apex reduced physician chart review times by <strong>55%</strong>, allowing clinics to handle greater patient volumes.</p>
      <p>Most importantly, the 100% offline network configuration guaranteed that <strong>zero patient data ever crossed cloud borders</strong>, maintaining absolute HIPAA compliance.</p>
    `,
    techStack: ['Llama 3 8B (Quantized)', 'vLLM', 'PostgreSQL (pgvector)', 'Docker', 'Python', 'React']
  },
  {
    id: 'case-3',
    clientName: 'Vanguard Asset Management',
    title: 'Generative Risk Modeling and Portfolio Optimization Engine',
    slug: 'generative-risk-modeling-portfolio-optimization',
    industry: 'Investment Banking',
    featured: false,
    projectDuration: '4 Months',
    heroImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop',
    metrics: [
      { value: '+14.6%', label: 'Increased Portfolio Yield', isHighlight: true },
      { value: '64%', label: 'Faster Scenario Simulation', isHighlight: true },
      { value: '25x', label: 'More Scenario Paths Explored', isHighlight: false }
    ],
    problem: 'Vanguard\'s legacy portfolio risk models relied on static Monte Carlo simulations that took hours to compute. In volatile market conditions, their traders received risk assessments that were already outdated, leading to conservative hedges and reduced overall yield.',
    solution: `
      <p>We developed a generative risk-modeling engine that leverages fine-tuned transformer networks to model complex financial timeseries interactions. By combining machine learning estimators with parallelized GPU calculations, the system can simulate 100,000 macroeconomic scenario paths in under 3 minutes.</p>
      <p>Traders can input custom text parameters (e.g., "simulated Fed rate cuts paired with crude oil shocks") and immediately visualize portfolio exposure graphs.</p>
    `,
    results: `
      <p>The real-time risk assessment allowed traders to dynamically adjust positions, increasing portfolio yields by an average of <strong>14.6%</strong> during market corrections.</p>
      <p>Scenario simulation velocity accelerated by <strong>64%</strong>, giving trading desks immediate access to validated predictive modeling when executing high-value positions.</p>
    `,
    techStack: ['PyTorch', 'FastAPI', 'Redis', 'NVIDIA CUDA', 'Tailwind', 'Recharts']
  }
];
