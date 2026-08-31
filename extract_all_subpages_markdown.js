const fs = require('fs');
const path = require('path');

// Helper to strip HTML / JSX tags cleanly to plain Markdown text
function cleanText(text) {
    if (!text) return '';
    return text
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<h1>(.*?)<\/h1>/gi, '# $1\n\n')
        .replace(/<h2>(.*?)<\/h2>/gi, '## $1\n\n')
        .replace(/<h3>(.*?)<\/h3>/gi, '### $1\n\n')
        .replace(/<h4>(.*?)<\/h4>/gi, '#### $1\n\n')
        .replace(/<h5>(.*?)<\/h5>/gi, '##### $1\n\n')
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
        .replace(/\{['"`](.*?)['"`]\}/g, '$1')
        .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

// Extract human readable strings inside JSX or TS files
function extractHumanStringsFromFile(filePath, sectionTitle) {
    if (!fs.existsSync(filePath)) return '';
    const content = fs.readFileSync(filePath, 'utf8');
    
    let section = `\n\n=========================================================\n`;
    section += `SECTION / SUBPAGE: ${sectionTitle}\n`;
    section += `File: ${path.basename(filePath)}\n`;
    section += `=========================================================\n\n`;
    
    // Extract string literals, headers, paragraphs, and lists
    const lines = content.split('\n');
    let cleanLines = [];
    
    for (let line of lines) {
        let trimmed = line.trim();
        // Skip imports, style blocks, SVG paths, regex
        if (trimmed.startsWith('import ') || trimmed.startsWith('export interface') || trimmed.startsWith('interface ') || trimmed.startsWith('type ') || trimmed.includes('path d=') || trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('//')) {
            continue;
        }
        
        // Strip JSX tags
        let clean = cleanText(trimmed);
        if (clean && clean.length > 2 && !clean.startsWith('const ') && !clean.startsWith('let ') && !clean.startsWith('function ') && !clean.startsWith('return (') && !clean.startsWith('className=')) {
            cleanLines.push(clean);
        }
    }
    
    section += cleanLines.join('\n') + '\n';
    return section;
}

let doc = `# LYCOS CORE — COMPLETE SITE & SUBPAGES KNOWLEDGE ARCHIVE\n\n`;
doc += `*Generated: ${new Date().toISOString().split('T')[0]}*\n`;
doc += `*Includes: Main Landing, All Subpages, All Simulators, All Governance Standards & CMS Content*\n\n`;

// 1. OVERVIEW & ABOUT
doc += `## 1. Executive Summary & About Lycos Core\n\n`;
doc += `**Lycos Core** is an elite AI systems architecture firm, technical co-builder, and enterprise incubation studio.\n`;
doc += `We engineer, harden, and deploy machine intelligence, zero-trust cloud infrastructure, and autonomous agent frameworks within complex, heavily regulated digital territories.\n\n`;

// 2. INCUBATION SUBPAGES (Kinetic, Apex, Citadel)
doc += `## 2. Dedicated Incubation Protocol Subpages\n`;

const pagesDir = path.join(__dirname, 'v2-development', 'frontend', 'src', 'pages');

doc += extractHumanStringsFromFile(path.join(pagesDir, 'ProtocolKinetic.tsx'), 'Protocol: Kinetic Subpage (Pathway 01 — Seed & Pre-Seed)');
doc += extractHumanStringsFromFile(path.join(pagesDir, 'ProtocolApex.tsx'), 'Protocol: Apex Subpage (Pathway 02 — Series A Readiness)');
doc += extractHumanStringsFromFile(path.join(pagesDir, 'ProtocolCitadel.tsx'), 'Protocol: Citadel Subpage (Pathway 03 — Enterprise Spin-Outs)');

// 3. PRODUCT ROI SIMULATORS
doc += `## 3. Product Telemetry & ROI Simulators\n`;

const compDir = path.join(__dirname, 'v2-development', 'frontend', 'src', 'components');

doc += extractHumanStringsFromFile(path.join(compDir, 'AegisROISimulator.tsx'), 'Lycos Aegis Compliance Engine ROI Simulator');
doc += extractHumanStringsFromFile(path.join(compDir, 'SynapseROISimulator.tsx'), 'Lycos Synapse Neural Orchestrator ROI Simulator');
doc += extractHumanStringsFromFile(path.join(compDir, 'VanguardROISimulator.tsx'), 'Lycos Vanguard Predictive Intelligence ROI Simulator');
doc += extractHumanStringsFromFile(path.join(compDir, 'VectorROISimulator.tsx'), 'Lycos Vector Ingestion Fabric ROI Simulator');

// 4. CORE FUNCTIONAL SECTIONS
doc += `## 4. Systems, Governance & Execution Sections\n`;

doc += extractHumanStringsFromFile(path.join(compDir, 'AIProductsSection.tsx'), 'AI Products & Engine Architecture');
doc += extractHumanStringsFromFile(path.join(compDir, 'TechServicesSection.tsx'), 'High-Yield Operational Tech Services');
doc += extractHumanStringsFromFile(path.join(compDir, 'GovernanceSection.tsx'), 'System Integrity & Governance Standards');
doc += extractHumanStringsFromFile(path.join(compDir, 'HowWeOperateSection.tsx'), 'Engagement Protocol & Incubation Integration');
doc += extractHumanStringsFromFile(path.join(compDir, 'WhoWeAreSection.tsx'), 'The Collective, Unit Disciplines & Credentials');
doc += extractHumanStringsFromFile(path.join(compDir, 'IncubationHubSection.tsx'), 'Incubation Hub & Portfolio Track Record');
doc += extractHumanStringsFromFile(path.join(compDir, 'CaseStudiesSection.tsx'), 'Enterprise Case Studies');
doc += extractHumanStringsFromFile(path.join(compDir, 'InsightsSection.tsx'), 'Research Advisories & Insights');
doc += extractHumanStringsFromFile(path.join(compDir, 'NewsletterCTA.tsx'), 'Strategic Intelligence Dispatch Subscription');

// 5. CMS ARTICLES & RESEARCH CONTENT
doc += `## 5. CMS Articles, Insights & Research Content\n\n`;

const cmsPath = path.join(__dirname, 'v2-development', 'frontend', 'src', 'data', 'mockCmsData.ts');
if (fs.existsSync(cmsPath)) {
    const rawCms = fs.readFileSync(cmsPath, 'utf8');
    const matches = rawCms.matchAll(/title:\s*['"](.*?)['"][\s\S]*?summary:\s*['"](.*?)['"][\s\S]*?content:\s*`([\s\S]*?)`/g);
    for (const m of matches) {
        doc += `### ${m[1]}\n\n`;
        doc += `**Summary:** ${m[2]}\n\n`;
        doc += `${cleanText(m[3])}\n\n`;
        doc += `---------------------------------------------------------\n\n`;
    }
}

// Write output
const targetRoot = path.join(__dirname, 'lycos_core_knowledge.txt');
const targetPublic = path.join(__dirname, 'app', 'public', 'lycos_core_knowledge.txt');

fs.writeFileSync(targetRoot, doc, 'utf8');
fs.writeFileSync(targetPublic, doc, 'utf8');

console.log('Exhaustive knowledge export complete: ' + targetRoot + ' (' + doc.length + ' chars / ' + fs.statSync(targetRoot).size + ' bytes)');
