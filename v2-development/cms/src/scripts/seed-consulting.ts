import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const run = async () => {
  console.log('Initializing Payload...')
  const payload = await getPayload({ config })

  console.log('Checking for existing media to link...')
  const mediaDocs = await payload.find({
    collection: 'media',
    limit: 1,
  })
  const imageId = mediaDocs.docs[0]?.id || null
  console.log('Using image ID for deep dive panels:', imageId)

  console.log('Searching for "AI Consulting" page...')
  const existingPages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'ai-consulting',
      },
    },
  })

  const layout = [
    {
      blockType: 'hero',
      tagline: '// STRATEGIC AI ARCHITECTURE AND ADVISORY.',
      title: 'Transformative AI Consulting.',
      subtitle: 'Precision-Engineered. Grounded Governance. Enterprise Scale.\n\nIntegrate with Lycos Core to architect, govern, and deploy high-yield AI systems. We bridge the gap between complex model architectures and measurable enterprise performance—transforming raw algorithmic capability into secure, operational advantage.',
      exploreBtnText: 'Initialize Consultation',
      partnerBtnText: 'Explore Mission Dossiers',
    },
    {
      blockType: 'pillars',
      title: 'Core Services',
      description: 'Architectural capabilities engineered to transition enterprise operations from legacy inertia to high-yield intelligence.',
      items: [
        {
          title: 'AI Strategy & Infrastructure Audit',
          description: 'Rigorous enterprise evaluation to map high-impact model deployments, construct long-range execution roadmaps, and quantify underlying data pipeline readiness.',
        },
        {
          title: 'AI Governance and Compliance Protocols',
          description: 'Institutional framework design ensuring algorithmic auditability, bias mitigation, and total compliance with evolving global standards like the EU AI Act.',
        },
        {
          title: 'Technical Enablement and Upskilling',
          description: 'Targeted technical protocols engineered to bridge internal execution gaps—equipping engineering units and aligning executive leadership around modern AI workflows.',
        },
        {
          title: 'Deployment Orchestration and Delivery',
          description: 'End-to-end tactical execution from initial discovery to active production deployment—leveraging hardened engineering methodologies to mitigate operational risk.',
        },
      ],
    },
    {
      blockType: 'framework',
      title: 'Execution Protocol',
      steps: [
        {
          stepNumber: 'Step 01',
          title: '01: Discovery and Architectural Alignment',
          focus: 'Establishing baseline infrastructure readiness and defining high-yield strategic vectors.',
          deliverables: 'Executive alignment and strategic vector calibration.\nData infrastructure and pipeline maturity audits.\nIdentification of operational bottlenecks and isolated data silos.',
        },
        {
          stepNumber: 'Step 02',
          title: '02: Vector and ROI Mapping',
          focus: 'Rigorous prioritization of technical deployments based on technical feasibility and enterprise ROI.',
          deliverables: 'Quantitative algorithmic feasibility and latency studies.\nFinancial yield modeling and compute cost projections.\nComprehensive risk mitigation and resource allocation blueprints.',
        },
        {
          stepNumber: 'Step 03',
          title: '03: Deployment and Governance',
          focus: 'Transitioning architectural designs into hardened, production-grade enterprise systems.',
          deliverables: 'Cross-functional, agile engineering deployment.\nZero-trust data privacy, bias detection, and compliance guardrails.\nAutomated pipeline validation and rigorous load testing.',
        },
        {
          stepNumber: 'Step 04',
          title: '04: Telemetry and Continuous Optimization',
          focus: 'Real-time telemetry monitoring, performance benchmarking, and system scaling.',
          deliverables: 'Post-deployment telemetry dashboards and yield tracking.\nContinuous monitoring of latency, compute overhead, and model drift.\nIterative model tuning, context refactoring, and runtime optimization.',
        },
      ],
    },
    {
      blockType: 'deepDive',
      title: 'Architectural Deep Dive',
      subtitle: 'In-depth operational breakdown of our core engineering and governance capabilities.',
      panels: [
        {
          title: 'AI Strategy & Infrastructure Audit',
          overview: 'High-yield AI initiatives do not begin with raw code; they begin with rigorous architecture. Our deep-dive assessment analyzes your data stack, compute infrastructure, and operational bottlenecks to construct an unassailable deployment roadmap.',
          focusAreas: 'Comprehensive data audits and automated quality profiling.\nTotal Cost of Ownership (TCO) and compute architecture sizing.\nTarget Operating Model (TOM) design for internal AI units.\nMulti-year execution timelines with defined technical milestones.',
          image: imageId,
        },
        {
          title: 'AI Governance and Compliance Protocols',
          overview: 'As global regulatory environments tighten, deployment security demands zero-trust compliance. We engineer the structural guardrails, audit trails, and execution frameworks required to keep your models safe, compliant, and fully explainable.',
          focusAreas: 'EU AI Act, FTC directives, and GDPR compliance mapping.\nAlgorithmic fairness testing and bias-mitigation pipelines.\nExplainable AI (XAI) frameworks for stakeholder auditability.\nContinuous, automated security and vulnerability monitoring systems.',
          image: imageId,
        },
        {
          title: 'Technical Enablement and Workforce Calibration',
          overview: 'Autonomous software is only as effective as the engineering force directing it. We deploy specialized enablement pipelines that upgrade your existing talent and operational teams into high-capacity AI operators.',
          focusAreas: 'Technical skills gap analysis for software and data engineering units.\nApplied protocols for prompt engineering, agentic orchestration, and LLM fine-tuning.\nOperational workflows for continuous integration and model monitoring (MLOps).\nExecutive briefings focusing on AI risk mitigation and ROI optimization.',
          image: imageId,
        },
        {
          title: 'Deployment Orchestration and Delivery',
          overview: 'Complex model deployments collapse without structured, domain-specific engineering oversight. We deliver elite technical leadership to transition your assets out of sandbox environments and into production with absolute stability.',
          focusAreas: 'Cross-functional engineering leadership (Data, MLOps, and System Architects).\nAgile sprint management optimized specifically for non-deterministic AI development.\nRigorous QA engineering, automated test harnesses, and performance validation.\nProduction migration strategies with built-in zero-downtime rollback contingencies.',
          image: imageId,
        },
      ],
    },
    {
      blockType: 'useCase',
      badge: 'FEATURED USE CASE',
      title: 'Featured Use Case: Streamlining Operations with AI',
      description: 'A leading global manufacturer experiencing costly, unpredictable equipment downtime across multiple automated facilities, looking to replace reactive repairs with an intelligent, preventative maintenance system.',
      insightTitle: 'Problem & Solution',
      insightSummary: 'Problem:\nUnplanned maintenance events caused severe production bottlenecks and massive financial losses. Existing manual sensory checks were highly inefficient, prone to human error, and incapable of detecting microscopic performance variations.\n\nSolution:\nLycos Core engineered and deployed a custom, edge-integrated predictive maintenance model. The system ingests real-time IoT multi-sensor streams, executes advanced time-series anomaly analysis, and pushes automated failure-prediction alerts to operations dashboards 72 hours before a breakdown occurs.',
      insightLink: 'Read Full Use Case',
      metrics: [
        { value: '32%', label: 'Reduction in factory downtime' },
        { value: '20%', label: 'Operational cost savings' },
        { value: 'Lifespan', label: 'Long-term asset utilization' },
      ],
    },
  ]

  if (existingPages.totalDocs > 0) {
    const docId = existingPages.docs[0].id
    console.log(`Page "AI Consulting" exists (ID: ${docId}). Updating layout content...`)
    await payload.update({
      collection: 'pages',
      id: docId,
      data: {
        title: 'AI Consulting',
        layout: layout,
      },
    })
    console.log('Page updated successfully.')
  } else {
    console.log('Page "AI Consulting" does not exist. Creating it...')
    await payload.create({
      collection: 'pages',
      data: {
        title: 'AI Consulting',
        slug: 'ai-consulting',
        layout: layout,
      },
    })
    console.log('Page created successfully.')
  }

  console.log('Seeding completed successfully!')
  process.exit(0)
}

run().catch(err => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
