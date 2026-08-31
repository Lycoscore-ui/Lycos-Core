const fs = require('fs');
const path = require('path');

// Helper to clean HTML tags to plain Markdown text
function cleanHtml(html) {
    if (!html) return '';
    return html
        .replace(/<h1>(.*?)<\/h1>/gi, '# $1\n\n')
        .replace(/<h2>(.*?)<\/h2>/gi, '## $1\n\n')
        .replace(/<h3>(.*?)<\/h3>/gi, '### $1\n\n')
        .replace(/<h4>(.*?)<\/h4>/gi, '#### $1\n\n')
        .replace(/<p>(.*?)<\/p>/gi, '$1\n\n')
        .replace(/<li>(.*?)<\/li>/gi, '- $1\n')
        .replace(/<ul>(.*?)<\/ul>/gi, '$1\n')
        .replace(/<ol>(.*?)<\/ol>/gi, '$1\n')
        .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
        .replace(/<b>(.*?)<\/b>/gi, '**$1**')
        .replace(/<em>(.*?)<\/em>/gi, '*$1*')
        .replace(/<i>(.*?)<\/i>/gi, '*$1*')
        .replace(/<blockquote>(.*?)<\/blockquote>/gi, '> $1\n\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

let md = `# LYCOS CORE — SYSTEM KNOWLEDGE & CONTENT ARCHIVE\n\n`;
md += `*Generated: ${new Date().toISOString().split('T')[0]}*\n\n`;

// 1. OVERVIEW & ABOUT INFO
md += `## 1. About Lycos Core\n\n`;
md += `**Lycos Core** is a specialized AI collective, technical co-builder, and systems engineering firm. We design, harden, and execute machine intelligence, zero-trust cloud infrastructure, and autonomous agent frameworks within high-stakes, heavily regulated digital territories.\n\n`;
md += `### Core Value Proposition\n`;
md += `- **Forged by Operators:** Built by field-tested AI engineers, systems architects, and security specialists with collective execution experience inside Tier-1 institutions.\n`;
md += `- **Synchronized Engagement:** Operating on high-velocity sprint cycles defined by absolute transparency, real-time telemetry, and named squads.\n`;
md += `- **Hardcoded Compliance:** Compliance is not a checklist — it is hardcoded directly into delivery pipelines (GDPR, SOC 2 Type II, EU AI Act, ISO 27001, ISO 42001, NIST AI RMF, POPIA, DORA, HIPAA).\n\n`;

// 2. CORE PILLARS & SERVICES
md += `## 2. Core Service Pillars & Offerings\n\n`;
md += `### Pillar 01: Systems Integration & Unification\n`;
md += `- **Description:** Synthesizes CRM, ERP, finance, and operational architectures into a unified, low-latency data fabric — eliminating manual exports, redundant data entry, and systemic reporting latency.\n`;
md += `- **Outcomes:** 60% reduction in manual operational overhead, zero manual copy-paste friction, and real-time executive command dashboards.\n\n`;

md += `### Pillar 02: High-Velocity Workflow Automation\n`;
md += `- **Description:** Isolates high-volume, latency-heavy operational tasks (onboarding, multi-stage approvals, compliance verification, and data routing) and replaces manual friction with autonomous execution engines.\n`;
md += `- **Outcomes:** Accelerated response times, deterministic accuracy, and 3x acceleration in reporting cycles.\n\n`;

md += `### Pillar 03: Zero-Trust Cloud Architecture & Compliance\n`;
md += `- **Description:** Scales enterprise infrastructure within zero-trust enclaves pre-configured for global regulatory alignment.\n`;
md += `- **Outcomes:** 99.9% uptime SLA across deployed integrations, immutable audit trails, and automated data lineage.\n\n`;

md += `### Pillar 04: Predictive Data Strategy & Intelligence\n`;
md += `- **Description:** Ingests, structures, and synthesizes unstructured organizational data into live telemetry and predictive models, transitioning leadership from reactive oversight to proactive foresight.\n`;
md += `- **Outcomes:** 90-day average time to initial measurable ROI, real-time KPI visibility, and predictive demand forecasting.\n\n`;

// 3. INCUBATION PROTOCOLS & VENTURE PATHWAYS
md += `## 3. Incubation Protocols & Venture Pathways\n\n`;

md += `### Protocol: Kinetic (Pathway 01 — Seed & Pre-Seed)\n`;
md += `- **Target:** Early-stage AI ventures requiring zero-state architecture and technical co-building.\n`;
md += `- **Deliverables:** Full-stack build execution, dedicated AI engineering, production UI/UX deployment, enterprise GTM protocol, and direct co-investment capital up to $500K.\n`;
md += `- **Duration:** 6 Months | **Equity Alignment:** 15–25%\n\n`;

md += `### Protocol: Apex (Pathway 02 — Series A Readiness)\n`;
md += `- **Target:** Scaling ventures seeking systemic revenue engineering and RevOps telemetry ($250K+ ARR).\n`;
md += `- **Deliverables:** Enterprise GTM architecture, custom sales playbooks, RevOps telemetry infrastructure, proprietary buyer network routing, and Series A data-room capitalization.\n`;
md += `- **Duration:** 9 Months | **Equity Alignment:** 8–15%\n\n`;

md += `### Protocol: Citadel (Pathway 03 — Enterprise Spin-Outs)\n`;
md += `- **Target:** Enterprise organizations commercializing proprietary internal AI capabilities into standalone corporate spin-outs.\n`;
md += `- **Deliverables:** Entity formation, corporate governance, clean IP carve-outs, autonomous brand architecture, executive talent acquisition, and capital structuring.\n`;
md += `- **Duration:** 12 Months | **Equity Alignment:** Bespoke\n\n`;

// 4. ENTERPRISE AI PRODUCTS
md += `## 4. Proprietary Enterprise AI Products\n\n`;

md += `### Lycos Aegis (Real-Time Compliance Engine)\n`;
md += `- **Function:** Continuous regulatory verification, automated threat classification, and immutable audit trail generation.\n`;
md += `- **Core Metric:** 99.98% audit compliance score across multi-jurisdiction frameworks.\n\n`;

md += `### Lycos Synapse (Neural Agent Orchestrator)\n`;
md += `- **Function:** Server-authoritative multi-agent runtime managing tool execution, state memory, and guardrail middleware.\n`;
md += `- **Core Metric:** 88% reduction in decision-making latency for complex workflows.\n\n`;

md += `### Lycos Vanguard (Predictive Operational Compass)\n`;
md += `- **Function:** Real-time telemetry forecasting, working capital reclamation, and capacity-demand alignment.\n`;
md += `- **Core Metric:** Average working capital recovery of $420K+ annually per enterprise node.\n\n`;

md += `### Lycos Vector (High-Throughput Data Ingestion Fabric)\n`;
md += `- **Function:** Sub-10ms semantic caching, vector database query optimization, and structured telemetry pipeline.\n`;
md += `- **Core Metric:** 10x throughput increase with sub-10ms context injection.\n\n`;

// 5. CASE STUDIES
md += `## 5. Enterprise Case Studies\n\n`;
md += `### Case Study 01: Tier-1 European Investment Bank\n`;
md += `- **Challenge:** Manual compliance checks on cross-border transactions causing 48-hour approval delays and high operational overhead.\n`;
md += `- **Solution:** Deployed Lycos Aegis compliance engine with automated threat classification and zero-trust logging.\n`;
md += `- **Impact:** Reduced audit processing time by 92%, saving $1.4M annually in compliance overhead.\n\n`;

md += `### Case Study 02: Multinational Logistics & Supply Chain Group\n`;
md += `- **Challenge:** Unpredictable inventory bottlenecks and idle warehouse capacity resulting in $3.2M annual carrying costs.\n`;
md += `- **Solution:** Integrated Lycos Vanguard predictive compass for real-time telemetry forecasting and demand alignment.\n`;
md += `- **Impact:** Reclaimed $850K in working capital within 120 days of deployment.\n\n`;

md += `### Case Study 03: Global Insurtech Venture (Incubated Asset)\n`;
md += `- **Challenge:** Complex claim intake processing requiring manual human verification across multi-language documentation.\n`;
md += `- **Solution:** Co-built Protocol Apex RevOps pipeline and deployed Lycos Synapse neural agent orchestrator.\n`;
md += `- **Impact:** Scaled ARR from $250K to $2.1M in 9 months, securing $2.8M Series A capitalization.\n\n`;

// 6. FREQUENTLY ASKED QUESTIONS (FAQs)
md += `## 6. Frequently Asked Questions (FAQs)\n\n`;
md += `**Q: How does Lycos Core interface with our existing tech stack?**\n`;
md += `A: We operate on an API-first, zero rip-and-replace methodology. Our architectures interface directly with your existing CRM (Salesforce, HubSpot), ERP (SAP, Oracle), cloud enclaves (AWS, Azure, GCP), and legacy databases.\n\n`;

md += `**Q: How do you guarantee data security and regulatory compliance?**\n`;
md += `A: All data processing is strictly bound by hardcoded guardrail middleware. Data is encrypted via AES-256 at rest and TLS 1.3 in motion. Client environments are isolated within dedicated infrastructure perimeters with zero cross-tenant commingling.\n\n`;

md += `**Q: What is the typical timeframe to see measurable ROI?**\n`;
md += `A: Our telemetry and discovery phase completes in Weeks 1–2, architecture blueprint in Weeks 3–4, and production build deployment between Weeks 5–12. Initial quantitative ROI is measured within 90 days of deployment.\n\n`;

md += `**Q: What is the difference between your Incubation Hub and a traditional accelerator?**\n`;
md += `A: We do not offer generic advice or pitch coaching. We operate as embedded technical co-builders, deploying full-stack AI engineering, enterprise-grade governance, and direct syndicate capital alongside founders.\n\n`;

// 7. ARTICLES & ORIGINAL RESEARCH (From mockCmsData.ts)
md += `## 7. Strategic Research & Advisories\n\n`;

try {
    const cmsPath = path.join(__dirname, 'v2-development', 'frontend', 'src', 'data', 'mockCmsData.ts');
    if (fs.existsSync(cmsPath)) {
        const rawCms = fs.readFileSync(cmsPath, 'utf8');
        
        // Extract title, summary, content from mockInsights
        const insightMatches = rawCms.matchAll(/title:\s*['"](.*?)['"][\s\S]*?summary:\s*['"](.*?)['"][\s\S]*?content:\s*`([\s\S]*?)`/g);
        for (const m of insightMatches) {
            md += `### ${m[1]}\n\n`;
            md += `**Summary:** ${m[2]}\n\n`;
            md += `${cleanHtml(m[3])}\n\n`;
        }
    }
} catch (e) {
    console.error('Error reading mockCmsData.ts:', e);
}

// 8. CONTACT & DISPATCH INFORMATION
md += `## 8. Contact & Command Dispatch\n\n`;
md += `- **Primary Website:** [https://lycos-core.local](https://lycos-core.local)\n`;
md += `- **Discovery Protocol:** Initialize Discovery Protocol via the command interface or contact form.\n`;
md += `- **Incubation Protocol Intake:** Select venture pathway (Kinetic, Apex, or Citadel) to schedule alignment vetting.\n`;
md += `- **Strategic Dispatch:** Bi-weekly operational advisories and regulatory risk audits delivered directly to corporate subscribers.\n`;
md += `- **Data Protection:** All corporate communications and data streams are protected by strict AES-256 / TLS 1.3 encryption protocols.\n`;

// Save to lycos_core_knowledge.txt (both root and app/public)
const rootPath = path.join(__dirname, 'lycos_core_knowledge.txt');
const publicPath = path.join(__dirname, 'app', 'public', 'lycos_core_knowledge.txt');

fs.writeFileSync(rootPath, md, 'utf8');
fs.writeFileSync(publicPath, md, 'utf8');

console.log('Successfully wrote clean human-readable Markdown to ' + rootPath + ' (' + md.length + ' chars / ' + fs.statSync(rootPath).size + ' bytes)');
