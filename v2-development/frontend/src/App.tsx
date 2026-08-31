import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useGSAP } from '@gsap/react'
import { 
  ArrowRight, 
  Cpu, 
  Layers, 
  Activity, 
  TrendingUp, 
  CheckCircle, 
  Info,
  Search 
} from 'lucide-react'
import AIProductsSection from './components/AIProductsSection'
import TechServicesSection from './components/TechServicesSection'
import IncubationHubSection from './components/IncubationHubSection'
import WhoWeAreSection from './components/WhoWeAreSection'
import HowWeOperateSection from './components/HowWeOperateSection'
import GovernanceSection from './components/GovernanceSection'
import WorldMap from './components/WorldMap'
import CaseStudiesSection from './components/CaseStudiesSection'
import InsightsSection from './components/InsightsSection'
import ArticlesSection from './components/ArticlesSection'
import ProtocolKinetic from './pages/ProtocolKinetic'
import ProtocolApex from './pages/ProtocolApex'
import ProtocolCitadel from './pages/ProtocolCitadel'
import MasterFAQPage from './pages/MasterFAQPage'
import { TermsOfUsePage, PrivacyPolicyPage, ResponsibleAIPage } from './pages/LegalPages'
import CipherWidget from './components/CipherWidget'
import AttestationModal from './components/AttestationModal'
import RegionSelector from './components/RegionSelector'
import CommandPalette from './components/CommandPalette'
import NavigationHUD from './components/NavigationHUD'
import LinkedInConnect from './components/LinkedInConnect'

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

let isProgrammaticScroll = false;

// Fallback content for the Home page
const FALLBACK_HOME = {
  hero: {
    tagline: '// COGNITIVE ENGINEERING. APEX INTELLIGENCE',
    title: 'Precision AI Systems.',
    subtitle: 'Engineered with Instinct.',
    exploreBtnText: 'DEPLOY SOLUTIONS',
    partnerBtnText: 'ENTER INCUBATION',
  },
  pillars: {
    title: 'Our Core Protocols',
    items: [
      {
        title: 'Cognitive Advisory',
        description: 'Strategic advisory for AI implementation and technology transformation.',
      },
      {
        title: 'System Synthesis',
        description: 'End-to-End development of custom AI tools and platform integrations.',
      },
      {
        title: 'Incubation Den',
        description: 'Accelerating early-stage AI ventures from concept to product market fit.',
      },
      {
        title: 'Autonomous Suites',
        description: 'Developed AI software and service suites for diverse business challenges.',
      },
    ],
  },
  useCase: {
    badge: 'FEATURED USE CASE',
    title: 'AI agents that transform your customer service',
    description: 'We customize agent infrastructures to act as a seamless front-line support tier, resolving highly complex enterprise inquiries instantly while retaining deep core operational security.',
    metrics: [
      { value: '92%', label: 'Resolution accuracy rate' },
      { value: '90%', label: 'Reduced operational overhead' },
      { value: 'R3.2M', label: 'Annual financial optimization' },
    ],
    insightTitle: 'Matured Insight: Future of Incubation Hub',
    insightSummary: 'Executive summary exploring emergent validation metrics in secure generative data pipelines.',
    insightLink: 'Read the full case study',
  },
  performance: {
    title: 'Internal Hub Performance',
    metrics: [
      { label: 'Resolved Queries', value: '12,842', change: '+22.6% vs last 30 days' },
      { label: 'Resolution Rate', value: '92%', change: '92%' },
      { label: 'Avg. Handle Time', value: '02:18', change: '+1.3% vs last 30 days' },
    ],
  },
}

// Fallback content in case CMS is not running or has empty layouts for subpages
const FALLBACK_PAGES: Record<string, any> = {
  'ai-consulting': {
    title: 'AI Consulting',
    slug: 'ai-consulting',
    layout: [
      {
        blockType: 'hero',
        tagline: '// ENTERPRISE INTELLIGENCE ARCHITECTURE',
        title: 'Transformative AI Consulting.',
        subtitle: 'Precision-Engineered. Grounded Governance. Enterprise Scale.',
        bodyCopy: 'Integrate with Lycos Core to architect, govern, and deploy high-yield AI systems. We bridge the gap between complex model architectures and measurable enterprise performance—transforming raw algorithmic capability into secure, operational advantage.',
        exploreBtnText: 'INITIALIZE CONSULTATION',
        partnerBtnText: 'EXPLORE MISSION DOSSIERS',
      },
      {
        blockType: 'metrics',
        metrics: [
          { value: '100+', label: 'Enterprise Audits Completed' },
          { value: '99.9%', label: 'System Uptime Architecture' },
          { value: '40%', label: 'Average Latency Reduction' },
          { value: 'SOC2', label: 'Zero-Trust and Compliance Aligned' },
        ]
      },
      {
        blockType: 'pillars',
        title: 'Core Services',
        description: 'Architectural capabilities engineered to transition enterprise operations from legacy inertia to high-yield intelligence.',
        items: [
          {
            title: 'AI Strategy and Infrastructure Audit',
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
        ]
      },
      {
        blockType: 'framework',
        title: 'Execution Protocol',
        steps: [
          {
            title: '01: Discovery and Architectural Alignment',
            focus: 'Establishing baseline infrastructure readiness and defining high-yield strategic vectors.',
            deliverables: [
              'Executive alignment and strategic vector calibration.',
              'Data infrastructure and pipeline maturity audits.',
              'Identification of operational bottlenecks and isolated data silos.'
            ]
          },
          {
            title: '02: Vector and ROI Mapping',
            focus: 'Rigorous prioritization of technical deployments based on technical feasibility and enterprise ROI.',
            deliverables: [
              'Quantitative algorithmic feasibility and latency studies.',
              'Financial yield modeling and compute cost projections.',
              'Comprehensive risk mitigation and resource allocation blueprints.'
            ]
          },
          {
            title: '03: Deployment and Governance',
            focus: 'Transitioning architectural designs into hardened, production-grade enterprise systems.',
            deliverables: [
              'Cross-functional, agile engineering deployment.',
              'Zero-trust data privacy, bias detection, and compliance guardrails.',
              'Automated pipeline validation and rigorous load testing.'
            ]
          },
          {
            title: '04: Telemetry and Continuous Optimization',
            focus: 'Real-time telemetry monitoring, performance benchmarking, and system scaling.',
            deliverables: [
              'Post-deployment telemetry dashboards and yield tracking.',
              'Continuous monitoring of latency, compute overhead, and model drift.',
              'Iterative model tuning, context refactoring, and runtime optimization.'
            ]
          }
        ]
      },
      {
        blockType: 'deepDive',
        title: 'Architectural Deep Dive',
        subtitle: 'In-depth operational breakdown of our core engineering and governance capabilities.',
        panels: [
          {
            title: 'AI Strategy and Infrastructure Audit',
            overview: 'High-yield AI initiatives do not begin with raw code; they begin with rigorous architecture. Our deep-dive assessment analyzes your data stack, compute infrastructure, and operational bottlenecks to construct an unassailable deployment roadmap.',
            focusAreas: [
              'Comprehensive data audits and automated quality profiling.',
              'Total Cost of Ownership (TCO) and compute architecture sizing.',
              'Target Operating Model (TOM) design for internal AI units.',
              'Multi-year execution timelines with defined technical milestones.'
            ]
          },
          {
            title: 'AI Governance and Compliance Protocols',
            overview: 'As global regulatory environments tighten, deployment security demands zero-trust compliance. We engineer the structural guardrails, audit trails, and execution frameworks required to keep your models safe, compliant, and fully explainable.',
            focusAreas: [
              'EU AI Act, FTC directives, and GDPR compliance mapping.',
              'Algorithmic fairness testing and bias-mitigation pipelines.',
              'Explainable AI (XAI) frameworks for stakeholder auditability.',
              'Continuous, automated security and vulnerability monitoring systems.'
            ]
          },
          {
            title: 'Technical Enablement and Workforce Calibration',
            overview: 'Autonomous software is only as effective as the engineering force directing it. We deploy specialized enablement pipelines that upgrade your existing talent and operational teams into high-capacity AI operators.',
            focusAreas: [
              'Technical skills gap analysis for software and data engineering units.',
              'Applied protocols for prompt engineering, agentic orchestration, and LLM fine-tuning.',
              'Operational workflows for continuous integration and model monitoring (MLOps).',
              'Executive briefings focusing on AI risk mitigation and ROI optimization.'
            ]
          },
          {
            title: 'Deployment Orchestration and Delivery',
            overview: 'Complex model deployments collapse without structured, domain-specific engineering oversight. We deliver elite technical leadership to transition your assets out of sandbox environments and into production with absolute stability.',
            focusAreas: [
              'Cross-functional engineering leadership (Data, MLOps, and System Architects).',
              'Agile sprint management optimized specifically for non-deterministic AI development.',
              'Rigorous QA engineering, automated test harnesses, and performance validation.',
              'Production migration strategies with built-in zero-downtime rollback contingencies.'
            ]
          }
        ]
      },
      {
        blockType: 'useCase',
        title: 'Featured Use Case: Streamlining Operations with AI',
        badge: 'FEATURED USE CASE',
        clientContext: 'A leading global manufacturer experiencing costly, unpredictable equipment downtime across multiple automated facilities, looking to replace reactive repairs with an intelligent, preventative maintenance system.',
        problem: 'Unplanned maintenance events caused severe production bottlenecks and massive financial losses. Existing manual sensory checks were highly inefficient, prone to human error, and incapable of detecting microscopic performance variations.',
        solution: 'Lycos Core engineered and deployed a custom, edge-integrated predictive maintenance model. The system ingests real-time IoT multi-sensor streams, executes advanced time-series anomaly analysis, and pushes automated failure-prediction alerts to operations dashboards 72 hours before a breakdown occurs.',
        resultsList: [
          '32% reduction in total factory downtime.',
          '20% operational cost savings via optimized maintenance scheduling.',
          'Significant improvement in long-term asset utilization and machinery lifespan.'
        ],
        ctaText: 'Read Full Use Case'
      }
    ]
  }
}


export default function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const gsapContextRef = useRef<gsap.Context | null>(null)
  const [activeSection, setActiveSection] = useState(0)
  const [pendingScrollIndex, setPendingScrollIndex] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  
  // Single Page Client-side Routing state
  const [slug, setSlug] = useState(() => {
    const path = window.location.pathname.replace(/^\//, '')
    return path || 'home'
  })

  // Handle header background on scroll (disabled on home page for horizontal layout)
  useEffect(() => {
    const handleScroll = () => {
      if (slug !== 'home' && window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [slug])

  const [pageData, setPageData] = useState<any>(() => {
    return slug === 'home' ? FALLBACK_HOME : (FALLBACK_PAGES[slug] || FALLBACK_PAGES['ai-consulting'])
  })
  
  // SVG clip path refs
  const pillarsClipRectRef = useRef<SVGRectElement>(null)
  const performanceClipRectRef = useRef<SVGRectElement>(null)

  // Tracking section animations state
  const [hasLandedOnPillars, setHasLandedOnPillars] = useState(false)
  const [hasLandedOnUseCase, setHasLandedOnUseCase] = useState(false)
  const [hasLandedOnPerformance, setHasLandedOnPerformance] = useState(false)

  // Count up animated values
  const [displayedUseCaseMetrics, setDisplayedUseCaseMetrics] = useState<string[]>([])
  const [displayedPerformanceMetrics, setDisplayedPerformanceMetrics] = useState<string[]>([])
  const [displayedEfficiencyGain, setDisplayedEfficiencyGain] = useState<string>('+0%')
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalType, setModalType] = useState('')
  
  // Contact Form state
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMsg, setContactMsg] = useState('')
  const [contactSubmitted, setContactSubmitted] = useState(false)

  // Cipher AI Chatbot Hero Morphing and Controlled Open State
  const [isCipherOpen, setIsCipherOpen] = useState(false)
  const isHeroState = slug === 'home' && activeSection === 0

  // Command Palette State
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false)

  // Global Command Palette Key Listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Global Mouse Coordinate Tracking for Interactive Radial Card Glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.glass-panel, .baseline-card, .protocol-card, .roi-card, .case-sidebar-item');
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [slug]);

  // Client Navigation helper
  const navigateTo = (newSlug: string) => {
    // Revert active GSAP Context synchronously before unmounting elements
    if (gsapContextRef.current) {
      gsapContextRef.current.revert()
      gsapContextRef.current = null
    }

    // Kill and revert any remaining global ScrollTriggers
    ScrollTrigger.getAll().forEach(t => t.kill(true))
    
    // Scroll window back to top immediately
    window.scrollTo(0, 0)

    // Defer React state update to next animation frame to allow ScrollTrigger DOM reversion to paint/settle
    requestAnimationFrame(() => {
      window.history.pushState(null, '', `/${newSlug === 'home' ? '' : newSlug}`)
      setSlug(newSlug)
      setPageData(newSlug === 'home' ? FALLBACK_HOME : (FALLBACK_PAGES[newSlug] || FALLBACK_PAGES['ai-consulting']))
      setHasLandedOnPillars(false)
      setHasLandedOnUseCase(false)
      setHasLandedOnPerformance(false)
      setActiveSection(0)
      
      // Reset indicators/clips immediately
      if (pillarsClipRectRef.current) pillarsClipRectRef.current.setAttribute('width', '0')
      if (performanceClipRectRef.current) performanceClipRectRef.current.setAttribute('width', '0')
    })
  }

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '')
      const newSlug = path || 'home'
      
      // Revert active GSAP Context synchronously
      if (gsapContextRef.current) {
        gsapContextRef.current.revert()
        gsapContextRef.current = null
      }

      // Kill and revert any remaining global ScrollTriggers
      ScrollTrigger.getAll().forEach(t => t.kill(true))
      window.scrollTo(0, 0)

      // Defer React state update to next animation frame
      requestAnimationFrame(() => {
        setSlug(newSlug)
        setPageData(newSlug === 'home' ? FALLBACK_HOME : (FALLBACK_PAGES[newSlug] || FALLBACK_PAGES['ai-consulting']))
        setHasLandedOnPillars(false)
        setHasLandedOnUseCase(false)
        setHasLandedOnPerformance(false)
        setActiveSection(0)
      })
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Fetch page data from local Payload CMS if running
  useEffect(() => {
    const activeSlug = slug === 'home' ? 'home' : slug
    fetch(`http://localhost:3000/api/pages?where[slug][equals]=${activeSlug}`)
      .then((res) => {
        if (!res.ok) throw new Error('API failed')
        return res.json()
      })
      .then((data) => {
        if (data.docs && data.docs.length > 0) {
          const doc = data.docs[0]
          if (slug === 'home') {
            const layout = doc.layout || []
            const hero = layout.find((l: any) => l.blockType === 'hero')
            const pillars = layout.find((l: any) => l.blockType === 'pillars')
            const useCase = layout.find((l: any) => l.blockType === 'useCase')
            const performance = layout.find((l: any) => l.blockType === 'performance')
            setPageData({
              hero: hero || FALLBACK_HOME.hero,
              pillars: pillars || FALLBACK_HOME.pillars,
              useCase: useCase || FALLBACK_HOME.useCase,
              performance: performance || FALLBACK_HOME.performance,
            })
          } else {
            setPageData(doc)
          }
          console.log(`Loaded live content for page "${slug}" successfully!`)
        } else {
          setPageData(slug === 'home' ? FALLBACK_HOME : (FALLBACK_PAGES[slug] || FALLBACK_PAGES['ai-consulting']))
        }
      })
      .catch(() => {
        console.log(`Could not connect to Payload CMS, using fallback data for page "${slug}".`)
        setPageData(slug === 'home' ? FALLBACK_HOME : (FALLBACK_PAGES[slug] || FALLBACK_PAGES['ai-consulting']))
      })
  }, [slug])

  // Dynamically load and initialize mesh.js script once for global canvas portal
  useEffect(() => {
    let script = document.querySelector('script[src="/media/mesh.js"]') as HTMLScriptElement

    const handleScriptLoad = () => {
      if (typeof (window as any).initMesh === 'function') {
        if (typeof (window as any).meshCleanup === 'function') {
          (window as any).meshCleanup()
        }
        (window as any).meshCleanup = (window as any).initMesh()
      }
    }

    if (!script) {
      script = document.createElement('script')
      script.src = '/media/mesh.js'
      script.async = true
      script.onload = handleScriptLoad
      document.body.appendChild(script)
    } else {
      // Re-init if script is already loaded
      handleScriptLoad()
    }
  }, [])

  // Initialize display strings to zeroed placeholders before animation triggers
  useEffect(() => {
    if (pageData.useCase?.metrics) {
      setDisplayedUseCaseMetrics(pageData.useCase.metrics.map((m: any) => {
        if (m.value.includes('%')) return '0%'
        if (m.value.includes('R') || m.value.includes('M')) return 'R0.0M'
        return '0'
      }))
    }
    if (pageData.performance?.metrics) {
      setDisplayedPerformanceMetrics(pageData.performance.metrics.map((m: any) => {
        if (m.value.includes(':')) return '00:00'
        if (m.value.includes('%')) return '0%'
        return '0'
      }))
    }
  }, [pageData])

  // Helper to parse metric value details
  const parseMetric = (valStr: string) => {
    const match = valStr.match(/^([^0-9.]*)([0-9.,]+)([^0-9.]*)$/)
    if (!match) return { prefix: '', value: 0, suffix: valStr }
    const prefix = match[1]
    const numStr = match[2].replace(/,/g, '')
    const suffix = match[3]
    const value = parseFloat(numStr)
    return { prefix, value, suffix }
  }

  // Animation triggers based on activeSection (Horizontal home page metrics)
  useEffect(() => {
    if (slug !== 'home') return

    if (activeSection === 1 && !hasLandedOnPillars) {
      setHasLandedOnPillars(true)
      if (pillarsClipRectRef.current) {
        gsap.to(pillarsClipRectRef.current, {
          width: 500,
          duration: 2,
          ease: 'power1.inOut'
        })
      }
    }

    if (activeSection === 2 && !hasLandedOnUseCase) {
      setHasLandedOnUseCase(true)
      if (pageData.useCase?.metrics) {
        const parsed = pageData.useCase.metrics.map((m: any) => parseMetric(m.value))
        const obj = { val0: 0, val1: 0, val2: 0 }
        gsap.to(obj, {
          val0: parsed[0]?.value || 0,
          val1: parsed[1]?.value || 0,
          val2: parsed[2]?.value || 0,
          duration: 2,
          ease: 'power1.out',
          onUpdate: () => {
            const displayValues = pageData.useCase.metrics.map((m: any, idx: number) => {
              const item = parsed[idx]
              if (!item) return m.value
              const animatedVal = obj[`val${idx}` as keyof typeof obj]
              if (idx === 2) {
                const steppedVal = Math.round(animatedVal * 10) / 10
                return `${item.prefix}${steppedVal.toFixed(1)}${item.suffix}`
              } else {
                return `${item.prefix}${Math.round(animatedVal)}${item.suffix}`
              }
            })
            setDisplayedUseCaseMetrics(displayValues)
          }
        })
      }
    }

    if (activeSection === 3 && !hasLandedOnPerformance) {
      setHasLandedOnPerformance(true)
      if (pageData.performance?.metrics) {
        const parsed = pageData.performance.metrics.map((m: any) => {
          if (m.value.includes(':')) {
            const parts = m.value.split(':')
            const totalSec = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10)
            return { isDuration: true, target: totalSec, prefix: '', suffix: '' }
          } else {
            const pm = parseMetric(m.value)
            return { isDuration: false, target: pm.value, prefix: pm.prefix, suffix: pm.suffix }
          }
        })
        const obj = { val0: 0, val1: 0, val2: 0 }
        gsap.to(obj, {
          val0: parsed[0]?.target || 0,
          val1: parsed[1]?.target || 0,
          val2: parsed[2]?.target || 0,
          duration: 2,
          ease: 'power1.out',
          onUpdate: () => {
            const displayValues = pageData.performance.metrics.map((m: any, idx: number) => {
              const item = parsed[idx]
              if (!item) return m.value
              const animatedVal = obj[`val${idx}` as keyof typeof obj]
              if (item.isDuration) {
                const totalSecs = Math.round(animatedVal)
                const mins = Math.floor(totalSecs / 60)
                const secs = totalSecs % 60
                return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
              } else {
                const roundedVal = Math.round(animatedVal)
                if (m.value.includes(',')) {
                  return `${item.prefix}${roundedVal.toLocaleString()}${item.suffix}`
                }
                return `${item.prefix}${roundedVal}${item.suffix}`
              }
            })
            setDisplayedPerformanceMetrics(displayValues)
          }
        })
      }

      if (performanceClipRectRef.current) {
        gsap.to(performanceClipRectRef.current, {
          width: 500,
          duration: 2,
          ease: 'power1.inOut'
        })
      }

      const bubbleObj = { val: 0 }
      gsap.to(bubbleObj, {
        val: 23,
        duration: 2,
        ease: 'power1.out',
        onUpdate: () => {
          setDisplayedEfficiencyGain(`+${Math.round(bubbleObj.val)}%`)
        }
      })
    }
  }, [activeSection, hasLandedOnPillars, hasLandedOnUseCase, hasLandedOnPerformance, pageData, slug])

  // Smooth scroll to anchored section index or offset
  const scrollToSection = (index: number) => {
    if (slug === 'home') {
      // Force ScrollTrigger refresh to ensure container.scrollWidth is fully computed and accurate
      ScrollTrigger.refresh()
      
      const container = containerRef.current
      if (!container) return
      const totalSections = 5
      const scrollTotal = container.scrollWidth - window.innerWidth
      const targetScrollY = (index / (totalSections - 1)) * scrollTotal

      // Smooth scroll the window directly. Snap bypass ensures it won't fight snapping.
      isProgrammaticScroll = true;
      gsap.to(window, {
        scrollTo: { y: targetScrollY },
        duration: 0.75,
        ease: 'power2.inOut',
        overwrite: 'auto',
        onComplete: () => {
          setTimeout(() => {
            isProgrammaticScroll = false;
          }, 80);
        }
      })
      setActiveSection(index)
    } else {
      // Subpage navigation back to home section
      setPendingScrollIndex(index)
      navigateTo('home')
    }
  }

  // Handle pending scroll index after navigating back to home
  useEffect(() => {
    if (slug === 'home' && pendingScrollIndex !== null) {
      const timer = setTimeout(() => {
        scrollToSection(pendingScrollIndex)
        setPendingScrollIndex(null)
      }, 200) // 200ms delay to ensure DOM and GSAP are fully ready
      return () => clearTimeout(timer)
    }
  }, [slug, pendingScrollIndex])

  // GSAP Horizontal Scroll Setup (Home Page only)
  useGSAP((self) => {
    if (slug !== 'home') return
    gsapContextRef.current = self

    const container = containerRef.current
    if (!container) return

    const sections = gsap.utils.toArray('.section')
    const totalSections = sections.length
    console.log("HORIZONTAL SECTIONS DETECTED:", totalSections, sections.map((s: any) => `${s.tagName}#${s.id}`))

    // Create a single timeline for all horizontal animations
    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'home-scroll-trigger',
        trigger: container,
        pin: true,
        scrub: true,
        start: 'top top',
        end: () => '+=' + (container.scrollWidth - window.innerWidth),
        invalidateOnRefresh: true,
        snap: {
          snapTo: (value: number) => {
            if (isProgrammaticScroll) return value; // bypass snapping during menu clicks
            const step = 1 / (totalSections - 1);
            return Math.round(value / step) * step;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0.12,
          ease: 'power1.inOut'
        },
        onUpdate: (self) => {
          // Track active section based on progress
          const progress = self.progress
          const sectionIndex = Math.round(progress * (totalSections - 1))
          setActiveSection(sectionIndex)
        }
      }
    })

    // 1. Slide the content wrapper horizontally
    tl.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: 'none'
    }, 0)

    // 2. Parallax layer 1: background (slower)
    tl.to('.parallax-bg', {
      xPercent: -40,
      ease: 'none'
    }, 0)

    // 3. Parallax layer 2: grid pattern (medium)
    tl.to('.parallax-grid', {
      xPercent: -60,
      ease: 'none'
    }, 0)

    return () => {
      tl.scrollTrigger?.kill(true)
      tl.kill()
    }
  }, [pageData, slug])

  // GSAP Vertical Scroll Section Tracker (Subpages only)
  useGSAP((self) => {
    if (slug === 'home') return
    gsapContextRef.current = self

    const sections = gsap.utils.toArray('.section') as HTMLElement[]
    const triggers: any[] = []

    sections.forEach((sec, idx) => {
      const trigger = ScrollTrigger.create({
        trigger: sec,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(idx)
          }
        }
      })
      triggers.push(trigger)
    })

    // GSAP ScrollTrigger vertical count-up animations
    const countUpTriggers: any[] = []
    gsap.utils.toArray('.count-up-trigger').forEach((el: any) => {
      const targetVal = parseFloat(el.getAttribute('data-target') || '0')
      const isPercentage = el.getAttribute('data-percent') === 'true'
      const obj = { val: 0 }
      const hasDecimals = targetVal % 1 !== 0
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => {
          obj.val = 0
          gsap.to(obj, {
            val: targetVal,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => {
              el.innerText = `${hasDecimals ? obj.val.toFixed(1) : Math.round(obj.val)}${isPercentage ? '%' : ''}`
            }
          })
        },
        onEnterBack: () => {
          obj.val = 0
          gsap.to(obj, {
            val: targetVal,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => {
              el.innerText = `${hasDecimals ? obj.val.toFixed(1) : Math.round(obj.val)}${isPercentage ? '%' : ''}`
            }
          })
        }
      })
      countUpTriggers.push(trigger)
    })

    return () => {
      triggers.forEach(t => t.kill())
      countUpTriggers.forEach(t => t.kill())
    }
  }, [pageData, slug])

  // Dynamic Block Renderers for subpages
  const renderHeroBlock = (block: any, idx: number) => {
    let taglines = ['Strategic', 'Ethical', 'Scalable']
    let bodyCopy = block.bodyCopy || ''
    if (block.subtitle) {
      const parts = block.subtitle.split('\n\n')
      if (parts.length > 1) {
        taglines = parts[0].split('.').map((s: string) => s.trim()).filter(Boolean)
        bodyCopy = parts[1]
      } else {
        taglines = block.subtitle.split('.').map((s: string) => s.trim()).filter(Boolean)
      }
    }

    return (
      <section key={idx} id="block-hero" className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '1200px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            {/* Standardized Green Eyebrow Tagline */}
            <div style={{ color: '#8ce63f', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, marginBottom: '1rem', fontFamily: 'monospace' }}>
              {block.tagline || '// ENTERPRISE INTELLIGENCE ARCHITECTURE'}
            </div>
            
            <h1 style={{ fontSize: '3.6rem', lineHeight: '1.15', marginBottom: '1.5rem', fontFamily: 'var(--font-title)', color: '#FFFFFF' }}>
              {block.title ? (
                <>{block.title.replace(/\.$/, '')}<span className="accent-period">.</span></>
              ) : (
                <>Transformative AI Consulting<span className="accent-period">.</span></>
              )}
            </h1>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              {taglines.map((tag: string, tIdx: number) => (
                <span key={tIdx} style={{ background: 'rgba(138, 75, 243, 0.1)', color: 'var(--accent)', border: '1px solid rgba(138, 75, 243, 0.2)', padding: '0.35rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600 }}>{tag}</span>
              ))}
            </div>

            <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: '1.6' }}>
              {bodyCopy}
            </p>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <button className="cta-primary" onClick={() => scrollToSection(4)}>
                {(block.exploreBtnText || 'INITIALIZE CONSULTATION').toUpperCase()}
              </button>
              <button className="cta-secondary" onClick={() => {
                const el = document.getElementById('block-useCase');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>
                {(block.partnerBtnText || 'EXPLORE MISSION DOSSIERS').toUpperCase()}
              </button>
            </div>
          </div>

          {/* Visual Gauge widget */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="baseline-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '340px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>// AUTOPILOT AI ACTIVE</span>
              
              <div style={{ position: 'relative', width: '160px', height: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8CFF32" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="2.5" strokeLinecap="round" />
                </svg>
                <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span className="count-up-trigger" data-target="99.4" data-percent="true" style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white', fontFamily: 'var(--font-title)' }}>99.4%</span>
                </div>
              </div>

              {/* Operational Confidence label placed directly UNDERNEATH the circle */}
              <span style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginTop: '0.75rem', marginBottom: '1.25rem', fontWeight: 600 }}>Operational Confidence</span>

              <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-gray)', fontSize: '0.8rem', alignItems: 'center' }}>
                <CheckCircle size={16} style={{ color: '#8CFF32' }} /> Compliance Vectors Validated
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const renderMetricsBlock = (block: any, idx: number) => {
    return (
      <section key={idx} id="block-metrics" className="section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="outcome-stats-grid" style={{ width: '100%', maxWidth: '1200px' }}>
          {block.metrics.map((m: any, mIdx: number) => (
            <div key={mIdx} className="baseline-card outcome-stat-card">
              <div className="count-up-trigger stat-metric" data-target={m.value.replace(/[^0-9.]/g, '')} data-percent={m.value.includes('%')} style={{ color: '#8ce63f', fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-title)' }}>
                {m.value}
              </div>
              <div className="stat-label" style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{m.label}</div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const renderPillarsBlock = (block: any, idx: number) => {
    return (
      <section key={idx} id="block-pillars" className="section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.75rem', textTransform: 'none', fontFamily: 'var(--font-title)' }}>
            Our Core <span style={{ color: '#8CFF32' }}>Protocols</span>
          </h2>
          <p style={{ color: 'var(--text-gray)', fontSize: '1rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
            Lycos Core orchestrates a complete AI lifecycle through foundational protocols designed for strategic transformation, end-to-end systems, venture growth, and specialized business solutions.
          </p>
        </div>

        <div className="services-grid">
          {block.items.map((item: any, cIdx: number) => (
            <div key={cIdx} className="glass-panel purple-glow-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', padding: '2rem', minHeight: '280px', border: '1px solid rgba(138, 75, 243, 0.15)' }}>
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <div className="icon-badge">
                    {cIdx === 0 && <Cpu size={32} className="neon-icon" />}
                    {cIdx === 1 && <Layers size={32} className="neon-icon" />}
                    {cIdx === 2 && <Activity size={32} className="neon-icon" />}
                    {cIdx === 3 && <TrendingUp size={32} className="neon-icon" />}
                  </div>
                </div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.92rem', lineHeight: '1.5' }}>{item.description}</p>
              </div>
              <button 
                className="btn-link" 
                onClick={() => {
                  const el = document.getElementById('block-deepDive');
                  if (el) {
                    gsap.to(window, {
                      scrollTo: { y: el.offsetTop - 80, autoKill: false },
                      duration: 0.75,
                      ease: 'power2.inOut'
                    });
                  }
                }} 
                style={{ marginTop: '2rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#8ce63f' }}
              >
                INSPECT PROTOCOL &gt;
              </button>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const renderFrameworkBlock = (block: any, idx: number) => {
    return (
      <section key={idx} id="block-framework" className="section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.75rem', textTransform: 'none', fontFamily: 'var(--font-title)' }}>
            Our Strategic <span style={{ color: '#8CFF32' }}>Framework</span>
          </h2>
          <p style={{ color: 'var(--text-gray)', fontSize: '1rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
            A systematic four-phase methodology that transforms enterprise AI concepts into measurable financial yield through precise engineering, zero-trust governance, and real-time telemetry.
          </p>
        </div>

        {/* 4 Horizontal Glass Cards Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', width: '100%', maxWidth: '1200px' }}>
          {block.steps.map((step: any, sIdx: number) => (
            <div key={sIdx} className="baseline-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <span style={{ fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: 700, color: '#8CFF32', marginBottom: '0.5rem', display: 'block' }}>0{sIdx + 1}</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem', lineHeight: '1.3' }}>{step.title.split(': ')[1] || step.title}</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '1rem', flexGrow: 1 }}>
                <strong style={{ color: '#8CFF32' }}>Focus:</strong> {step.focus}
              </p>
              <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {(Array.isArray(step.deliverables) ? step.deliverables : (typeof step.deliverables === 'string' ? step.deliverables.split('\n').map((d: string) => d.trim()).filter(Boolean) : [])).map((d: string, dIdx: number) => (
                  <li key={dIdx} style={{ fontSize: '0.8rem', color: 'var(--text-gray)', display: 'flex', gap: '0.4rem', alignItems: 'flex-start', lineHeight: '1.4' }}>
                    <span style={{ color: '#8CFF32', flexShrink: 0 }}>•</span> {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const renderDeepDiveBlock = (block: any, idx: number) => {
    const eyebrows = [
      '// ARCHITECTURAL ASSESSMENT',
      '// ZERO-TRUST GUARDRAILS',
      '// HUMAN CAPITAL UPGRADES',
      '// PRODUCTION INTEGRATION'
    ];

    return (
      <section key={idx} id="block-deepDive" className="section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.75rem', textTransform: 'none', fontFamily: 'var(--font-title)' }}>
            Core Services <span style={{ color: '#8CFF32' }}>Deep Dive</span>
          </h2>
          <p style={{ color: 'var(--text-gray)', fontSize: '1rem' }}>{block.subtitle}</p>
        </div>

        <div className="deep-dive-grid">
          {block.panels.map((panel: any, pIdx: number) => (
            <div key={pIdx} className="deep-dive-panel">
              <span className="eyebrow-tagline" style={{ display: 'block', marginBottom: '0.5rem' }}>
                {eyebrows[pIdx % eyebrows.length]}
              </span>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', color: '#FFFFFF' }}>{panel.title}</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{panel.overview}</p>
              
              <ul className="deep-dive-bullets" style={{ margin: 0, paddingLeft: 0 }}>
                {(Array.isArray(panel.focusAreas) ? panel.focusAreas : (typeof panel.focusAreas === 'string' ? panel.focusAreas.split('\n').map((fa: string) => fa.trim()).filter(Boolean) : [])).map((fa: string, faIdx: number) => (
                  <li key={faIdx} style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.6rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start', lineHeight: '1.4' }}>
                    <CheckCircle size={15} className="neon-icon" style={{ flexShrink: 0 }} /> {fa}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const renderUseCaseBlock = (block: any, idx: number) => {
    // Dynamically map CMS usecase fields to frontend layout fields
    const clientContext = block.clientContext || block.description || ''
    
    let problem = block.problem || ''
    let solution = block.solution || ''
    if (!problem && block.insightSummary) {
      const parts = block.insightSummary.split('\n\n')
      const probPart = parts.find((p: string) => p.startsWith('Problem:'))
      const solPart = parts.find((p: string) => p.startsWith('Solution:'))
      problem = probPart ? probPart.replace('Problem:', '').trim() : ''
      solution = solPart ? solPart.replace('Solution:', '').trim() : (parts.length > 1 ? parts[1] : block.insightSummary)
    }

    const rawResults = block.resultsList || (block.metrics ? block.metrics.map((m: any) => `${m.value} ${m.label}`) : [])
    const resultsList = Array.isArray(rawResults) ? rawResults : (typeof rawResults === 'string' ? rawResults.split('\n').map((r: string) => r.trim()).filter(Boolean) : [])

    return (
      <section key={idx} id="block-useCase" className="section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.75rem', textTransform: 'none', fontFamily: 'var(--font-title)' }}>
            Featured <span style={{ color: '#8CFF32' }}>Use Case</span>
          </h2>
          <p style={{ color: 'var(--text-gray)', fontSize: '1rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
            Discover how Lycos Core deployed edge-integrated predictive maintenance to eliminate factory downtime and deliver immediate, measurable ROI for a global manufacturing leader.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', width: '100%', maxWidth: '1200px', alignItems: 'start' }}>
          <div className="glass-panel" style={{ padding: '3rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>{block.badge}</span>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'white' }}>{block.title}</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <strong style={{ color: 'var(--accent)', fontSize: '0.9rem', display: 'block', marginBottom: '0.25rem' }}>Client Context:</strong>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>{clientContext}</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <strong style={{ color: 'var(--accent)', fontSize: '0.9rem', display: 'block', marginBottom: '0.25rem' }}>Problem:</strong>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>{problem}</p>
            </div>

            <div>
              <strong style={{ color: 'var(--accent)', fontSize: '0.9rem', display: 'block', marginBottom: '0.25rem' }}>Solution:</strong>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>{solution}</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '2.5rem', border: '1px solid rgba(138, 75, 243, 0.2)' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'white' }}>Results and Achievements</h4>
              <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
                {resultsList.map((res: string, rIdx: number) => {
                  const match = res.match(/^(\d+%|\w+)\s+(.*)$/)
                  const numVal = match ? parseFloat(match[1]) : 0
                  const hasNum = !isNaN(numVal) && numVal > 0
                  const label = match ? match[2] : res

                  return (
                    <li key={rIdx} style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--text-gray)', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: '1.4' }}>
                      {hasNum ? (
                        <div className="count-up-trigger" data-target={numVal} data-percent={res.includes('%')} style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-title)', minWidth: '60px' }}>0</div>
                      ) : (
                        <CheckCircle size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      )}
                      <div>{label}</div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <button className="cta-primary" style={{ alignSelf: 'stretch', justifyContent: 'center' }} onClick={() => scrollToSection(4)}>
              {block.ctaText || block.insightLink || 'Read Full Use Case'}
            </button>
          </div>
        </div>
      </section>
    )
  }


  // Trigger Modal
  const openInfoModal = (type: string, title: string) => {
    setModalType(type)
    setModalTitle(title)
    setModalOpen(true)
  }

  // Contact Submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setContactSubmitted(true)
    setTimeout(() => {
      setContactSubmitted(false)
      setContactName('')
      setContactEmail('')
      setContactMsg('')
    }, 4000)
  }

  const menuConfig = [
    {
      label: '// CORE',
      type: 'scroll',
      target: 0
    },
    {
      label: '// PROTOCOLS',
      type: 'dropdown',
      items: [
        { label: 'Cognitive Advisory', slug: 'ai-consulting' },
        { label: 'System Synthesis', slug: 'tech-services' },
        { label: 'Incubation Den', slug: 'incubation-hub' },
        { label: 'Autonomous Suites', slug: 'ai-products' }
      ]
    },
    {
      label: '// INTEL',
      type: 'dropdown',
      items: [
        { label: 'Case Studies Explorer', slug: 'case-studies' },
        { label: 'Owned Industry Insights', slug: 'insights' },
        { label: 'Curated Tech News', slug: 'articles' }
      ]
    },
    {
      label: '// THE COLLECTIVE',
      type: 'dropdown',
      items: [
        { label: 'Who We Are', slug: 'who-we-are' },
        { label: 'How We Operate', slug: 'how-we-operate' },
        { label: 'Governance and Security', slug: 'governance-security' }
      ]
    }
  ]

  const isItemActive = (item: any) => {
    if (item.type === 'scroll') {
      return slug === 'home' && activeSection === item.target;
    }
    if (item.label === '// PROTOCOLS' && slug === 'home' && activeSection === 1) {
      return true;
    }
    if (item.label === '// INTEL' && slug === 'home' && activeSection === 2) {
      return true;
    }
    if (item.items) {
      return item.items.some((sub: any) => {
        if (sub.type === 'scroll') {
          return slug === 'home' && activeSection === sub.target;
        }
        return slug === sub.slug;
      });
    }
    return false;
  };

  return (
    <div style={{ position: 'relative' }} ref={rootRef} className={slug === 'home' ? 'horizontal-layout' : 'vertical-layout'}>
      {/* Film grain subtle cinematic overlay */}
      <div className="film-grain-overlay" />

      {/* Global Command Palette (Cmd + K / Ctrl + K) */}
      <CommandPalette 
        isOpen={isCmdPaletteOpen} 
        onClose={() => setIsCmdPaletteOpen(false)} 
        onNavigate={navigateTo} 
      />

      {/* First-time landing regional compliance & currency attestation */}
      <AttestationModal />

      {/* Background elements */}
      <div className="parallax-bg" />
      <div className="parallax-grid" />
      <div className="particles-bg" />

      {/* Floating Header */}
      <header className={`floating-header ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="header-logo" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>
          <img src="/media/LYCOS-CORE-lOGOTYPE-300x100.png" alt="Lycos Core Logo" style={{ height: '3rem', display: 'block' }} />
        </a>
        <nav className="header-nav">
          <ul>
            {menuConfig.map((item, idx) => (
              <li key={idx} className={item.items ? 'dropdown-container' : ''}>
                {item.type === 'scroll' ? (
                  <a 
                    href="#" 
                    className={isItemActive(item) ? 'active' : ''} 
                    onClick={(e) => { e.preventDefault(); if (item.target !== undefined) scrollToSection(item.target); }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <>
                    <a 
                      href="#" 
                      className={isItemActive(item) ? 'active' : ''}
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.label === '// PROTOCOLS') {
                          scrollToSection(1);
                        } else if (item.label === '// INTEL') {
                          scrollToSection(2);
                        }
                      }}
                    >
                      {item.label} <span className="dropdown-arrow">▼</span>
                    </a>
                    <ul className="dropdown-menu">
                      {item.items?.map((subItem: any, sIdx: number) => (
                        <li key={sIdx}>
                          {subItem.type === 'scroll' ? (
                            <a 
                              href="#"
                              onClick={(e) => { 
                                e.preventDefault(); 
                                if (subItem.target !== undefined) {
                                  scrollToSection(subItem.target); 
                                }
                              }}
                            >
                              {subItem.label}
                            </a>
                          ) : (
                            <a 
                              href="#" 
                              onClick={(e) => { 
                                e.preventDefault(); 
                                navigateTo(subItem.slug); 
                              }}
                            >
                              {subItem.label}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            className="cmd-palette-trigger-btn"
            onClick={() => setIsCmdPaletteOpen(true)}
            title="Quick Search (Cmd+K / Ctrl+K)"
          >
            <Search size={13} className="neon-icon" />
            <span>SEARCH</span>
            <kbd>⌘K</kbd>
          </button>
          <button className="btn-solid" style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem' }} onClick={() => scrollToSection(4)}>
            INITIATE CONNECTION
          </button>
        </div>
      </header>

      {slug === 'home' ? (
        /* Horizontal Sections Wrapper (Home Page) */
        <div key="home-wrapper" className="scroll-wrapper" ref={containerRef}>
          
          {/* Section 1: Hero */}
          <section className="section">
            <div className="hero-grid">
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--accent)', fontWeight: 700, display: 'block', marginBottom: '1rem' }}>
                  {pageData.hero.tagline}
                </span>
                <h1 style={{ fontSize: '3.6rem', lineHeight: '1.15', marginBottom: '1.5rem', fontFamily: 'var(--font-title)' }}>
                  Precision AI Systems<span className="brand-dot">.</span><br />
                  <span style={{ opacity: 0.5 }}>Engineered with Instinct<span className="accent-dot">.</span></span>
                </h1>
                <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: '1.6' }}>
                  We architect bespoke AI products, orchestrate enterprise-scale cognitive strategy, and run a high-velocity incubation hub to trial next-generation solutions. Systemic machine intelligence, built to navigate market complexity.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <button className="btn-solid" onClick={() => scrollToSection(1)}>
                    {pageData.hero.exploreBtnText}
                  </button>
                  <button className="btn-outline" onClick={() => scrollToSection(4)}>
                    {pageData.hero.partnerBtnText}
                  </button>
                </div>
              </div>

              {/* Layout Spacer for Section 1 Right Column (Global Canvas is mounted globally) */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '440px', pointerEvents: 'none' }} />
            </div>
          </section>

          {/* Section 2: Pillars */}
          <section className="section" style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '2.8rem', textTransform: 'none', fontFamily: 'var(--font-title)', margin: 0 }}>
                {pageData.pillars.title.split(' ')[0]} <span style={{ color: 'var(--color-accent-green)' }}>{pageData.pillars.title.split(' ').slice(1).join(' ')}<span className="accent-dot">.</span></span>
              </h2>
              <div className="pillars-grid" style={{ width: '100%' }}>
                {pageData.pillars.items.map((item: any, idx: number) => (
                  <div key={idx} className="protocol-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', padding: '1.75rem', position: 'relative' }}>
                    <div>
                      <div style={{ marginBottom: '1rem' }}>
                        <div className="icon-badge">
                          {idx === 0 && <Cpu size={28} className="neon-icon" />}
                          {idx === 1 && <Layers size={28} className="neon-icon" />}
                          {idx === 2 && <Activity size={28} className="neon-icon" />}
                          {idx === 3 && <TrendingUp size={28} className="neon-icon" />}
                        </div>
                      </div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                      <p style={{ color: 'var(--text-gray)', fontSize: '0.88rem', lineHeight: '1.5' }}>{item.description}</p>
                    </div>
                    <button 
                      className="btn-link" 
                      onClick={() => {
                        const slugs = ['ai-consulting', 'tech-services', 'incubation-hub', 'ai-products'];
                        navigateTo(slugs[idx]);
                      }} 
                      style={{ marginTop: '1.25rem', fontSize: '0.95rem' }}
                    >
                      INSPECT PROTOCOL &gt;
                    </button>
                  </div>
                ))}
              </div>

              <div className="lycos-chart-box" style={{ padding: '1.5rem', marginTop: '0' }}>
                <div className="chart-header" style={{ marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 600 }}>Operational Efficiency Trend</span>
                  <span style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>+40% Average Gain</span>
                </div>
                <div className="chart-wrapper">
                  <svg viewBox="0 0 500 80" preserveAspectRatio="none" className="line-chart">
                    <defs>
                      <linearGradient id="pillars-chart-glow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                      </linearGradient>
                      <clipPath id="pillars-clip">
                        <rect x="0" y="0" width="0" height="80" ref={pillarsClipRectRef} />
                      </clipPath>
                    </defs>
                    <path d="M0,70 C50,45 100,55 150,30 C200,5 250,25 300,15 C350,5 400,2 500,2 L500,80 L0,80 Z" 
                          fill="url(#pillars-chart-glow)" 
                          clipPath="url(#pillars-clip)" />
                    <path d="M0,70 C50,45 100,55 150,30 C200,5 250,25 300,15 C350,5 400,2 500,2" 
                          fill="none" 
                          stroke="var(--accent)" 
                          strokeWidth="2.5" 
                          className="chart-glow-path"
                          clipPath="url(#pillars-clip)" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Use Case */}
          <section className="section">
            <div className="use-case-grid">
              <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative' }}>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-secondary)', fontWeight: 700, display: 'block', marginBottom: '1rem' }}>
                  {pageData.useCase.badge}
                </span>
                <h2 style={{ fontSize: '2.2rem', marginBottom: '1.25rem', lineHeight: '1.2' }}>
                  {pageData.useCase.title}
                </h2>
                <p style={{ color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '2rem', fontSize: '1rem' }}>
                  {pageData.useCase.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                  {pageData.useCase.metrics.map((m: any, idx: number) => (
                    <div key={idx}>
                      <div style={{ fontSize: '2.2rem', fontWeight: 800, color: idx === 0 ? 'var(--accent)' : 'var(--text-primary)', fontFamily: 'var(--font-title)' }}>
                        {displayedUseCaseMetrics[idx] || m.value}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-gray)', marginTop: '0.25rem' }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ paddingLeft: '2rem', borderLeft: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-gray)', fontWeight: 700, display: 'block', marginBottom: '0.75rem' }}>
                  FEATURED INSIGHT
                </span>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 600, lineHeight: '1.3', marginBottom: '1.25rem' }}>
                  {pageData.useCase.insightTitle}
                </h3>
                <p style={{ color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '2rem', fontSize: '0.95rem' }}>
                  {pageData.useCase.insightSummary}
                </p>
                <button className="btn-link" onClick={() => openInfoModal('insight', pageData.useCase.insightTitle)}>
                  {(pageData.useCase.insightLink || 'READ DOSSIER').toUpperCase()} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </section>

          {/* Section 4: Performance */}
          <section className="section">
            <div className="performance-grid">
              <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  {pageData.performance.title}
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  {pageData.performance.metrics.map((m: any, idx: number) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-gray)', marginBottom: '0.25rem' }}>{m.label}</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: idx === 1 ? 'var(--accent)' : 'var(--text-primary)', fontFamily: 'var(--font-title)' }}>
                        {displayedPerformanceMetrics[idx] || m.value}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--accent)', marginTop: '0.25rem' }}>{m.change}</div>
                    </div>
                  ))}
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                  <Info size={12} /> Metric updates are synchronized directly from local dataset pools.
                </div>
              </div>

              <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>AI Solution Trends</h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-gray)', marginBottom: '1rem' }}>Operations Score Improvement / Yield Curve</div>
                </div>

                <div style={{ width: '100%', height: '110px', position: 'relative' }}>
                  <svg viewBox="0 0 500 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    <defs>
                      <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                      </linearGradient>
                      <clipPath id="performance-clip">
                        <rect x="0" y="0" width="0" height="100" ref={performanceClipRectRef} />
                      </clipPath>
                    </defs>
                    <path d="M0,80 Q75,60 150,80 T300,35 T450,15 L450,100 L0,100 Z" fill="url(#chart-glow)" clipPath="url(#performance-clip)" />
                    <path d="M0,80 Q75,60 150,80 T300,35 T450,15" fill="none" stroke="var(--accent)" strokeWidth="2.5" className="chart-glow-path" clipPath="url(#performance-clip)" />
                    <circle cx="450" cy="15" r="4" fill="var(--accent)" />
                  </svg>
                  <div style={{ position: 'absolute', right: '0', top: '-15px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>
                    Efficiency Gains <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{displayedEfficiencyGain}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-gray)', fontSize: '0.7rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                  <span>Month 1</span><span>Month 2</span><span>Month 3</span><span>Month 4</span><span>Month 5</span><span>Month 6</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Calculator and Contact */}
          <section className="section home-section-contact">
            <div className="contact-grid">
              <div className="glass-panel home-contact-wrapper">
                <h3 className="home-contact-title">
                  Global Operational Footprint
                </h3>
                <WorldMap />
              </div>

              {/* Simple Contact Form */}
              <div className="glass-panel home-contact-form-panel">
                <h3 className="home-contact-form-title">
                  Initiate Engagement
                </h3>
                
                {contactSubmitted ? (
                  <div className="home-contact-success">
                    <CheckCircle size={48} />
                    <h4 className="home-contact-success-title">Submission Received</h4>
                    <p className="home-contact-success-text">Thank you. One of our operational leads will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="home-contact-form">
                    <div className="home-contact-form-group">
                      <label className="home-contact-label">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        value={contactName} 
                        onChange={(e) => setContactName(e.target.value)} 
                        className="home-contact-input"
                      />
                    </div>

                    <div className="home-contact-form-group">
                      <label className="home-contact-label">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={contactEmail} 
                        onChange={(e) => setContactEmail(e.target.value)} 
                        className="home-contact-input"
                      />
                    </div>

                    <div className="home-contact-form-group-grow">
                      <label className="home-contact-label">Brief Description of operational bottlenecks</label>
                      <textarea 
                        required 
                        value={contactMsg} 
                        onChange={(e) => setContactMsg(e.target.value)} 
                        className="home-contact-textarea"
                      />
                    </div>

                    <button type="submit" className="btn-solid home-contact-submit">
                      INITIALIZE PROTOCOL
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Horizontal Links Row Underneath the 2 Cards */}
            <div className="home-links-row">
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('knowledge-base'); }} className="home-link-item">Master Knowledge Base</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('terms-of-use'); }} className="home-link-item">Terms of Use</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('privacy-policy'); }} className="home-link-item">Privacy Policy</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('responsible-ai-policy'); }} className="home-link-item">Responsible AI Policy</a>
            </div>
          </section>

        </div>
      ) : (
        /* Standalone Component Pages */
        <>
          {slug === 'ai-products' && (
            <div id="subpage-wrapper" className="vertical-scroll-wrapper" ref={containerRef}>
              <AIProductsSection />
            </div>
          )}
          {slug === 'tech-services' && (
            <div id="subpage-wrapper" className="vertical-scroll-wrapper" ref={containerRef}>
              <TechServicesSection />
            </div>
          )}
          {slug === 'incubation-hub' && (
            <div id="subpage-wrapper" className="vertical-scroll-wrapper" ref={containerRef}>
              <IncubationHubSection />
            </div>
          )}
          {slug === 'who-we-are' && (
            <div id="subpage-wrapper" className="vertical-scroll-wrapper" ref={containerRef}>
              <WhoWeAreSection />
            </div>
          )}
          {slug === 'how-we-operate' && (
            <div id="subpage-wrapper" className="vertical-scroll-wrapper" ref={containerRef}>
              <HowWeOperateSection />
            </div>
          )}
          {slug === 'governance-security' && (
            <div id="subpage-wrapper" className="vertical-scroll-wrapper" ref={containerRef}>
              <GovernanceSection />
            </div>
          )}
          {slug === 'case-studies' && (
            <div id="subpage-wrapper" className="vertical-scroll-wrapper" ref={containerRef}>
              <CaseStudiesSection />
            </div>
          )}
          {slug === 'insights' && (
            <div id="subpage-wrapper" className="vertical-scroll-wrapper" ref={containerRef}>
              <InsightsSection />
            </div>
          )}
          {slug === 'articles' && (
            <div id="subpage-wrapper" className="vertical-scroll-wrapper" ref={containerRef}>
              <ArticlesSection />
            </div>
          )}
          {slug === 'incubation/kinetic' && <div id="subpage-wrapper" className="vertical-scroll-wrapper"><ProtocolKinetic /></div>}
          {slug === 'incubation/apex' && <div id="subpage-wrapper" className="vertical-scroll-wrapper"><ProtocolApex /></div>}
          {slug === 'incubation/citadel' && <div id="subpage-wrapper" className="vertical-scroll-wrapper"><ProtocolCitadel /></div>}
          {(slug === 'knowledge-base' || slug === 'faqs') && (
            <div id="subpage-wrapper" className="vertical-scroll-wrapper" ref={containerRef}>
              <MasterFAQPage />
            </div>
          )}
          {slug === 'terms-of-use' && (
            <div id="subpage-wrapper" className="vertical-scroll-wrapper" ref={containerRef}>
              <TermsOfUsePage />
            </div>
          )}
          {slug === 'privacy-policy' && (
            <div id="subpage-wrapper" className="vertical-scroll-wrapper" ref={containerRef}>
              <PrivacyPolicyPage />
            </div>
          )}
          {slug === 'responsible-ai-policy' && (
            <div id="subpage-wrapper" className="vertical-scroll-wrapper" ref={containerRef}>
              <ResponsibleAIPage />
            </div>
          )}
          {!['home','ai-products','tech-services','incubation-hub','who-we-are','how-we-operate','governance-security','case-studies','insights','articles','incubation/kinetic','incubation/apex','incubation/citadel','knowledge-base','faqs','terms-of-use','privacy-policy','responsible-ai-policy'].includes(slug) && (
            /* Vertical Sections Wrapper (Subpages like ai-consulting) */
            <div key="subpage-wrapper" id="subpage-wrapper" className="vertical-scroll-wrapper" ref={containerRef}>
          {pageData.layout ? pageData.layout.map((block: any, idx: number) => {
            if (block.blockType === 'hero') return renderHeroBlock(block, idx)
            if (block.blockType === 'metrics') return renderMetricsBlock(block, idx)
            if (block.blockType === 'pillars') return renderPillarsBlock(block, idx)
            if (block.blockType === 'framework') return renderFrameworkBlock(block, idx)
            if (block.blockType === 'deepDive') return renderDeepDiveBlock(block, idx)
            if (block.blockType === 'useCase') return renderUseCaseBlock(block, idx)
            return null
          }) : null}

          {/* Contact Section at bottom of subpage */}
          <section id="block-contact" className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', width: '100%', maxWidth: '1200px', alignItems: 'center' }}>
              <div className="glass-panel" style={{ padding: '2.5rem', border: '1px solid rgba(138, 75, 243, 0.2)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                  Initiate Engagement
                </h3>
                
                {contactSubmitted ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, gap: '1rem', color: 'var(--accent)' }}>
                    <CheckCircle size={48} />
                    <h4 style={{ color: 'white' }}>Submission Received</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', textAlign: 'center' }}>Thank you. One of our operational leads will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-gray)', display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
                      <input 
                        type="text" 
                        required 
                        value={contactName} 
                        onChange={(e) => setContactName(e.target.value)} 
                        style={{ width: '100%', padding: '0.65rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px' }} 
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-gray)', display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={contactEmail} 
                        onChange={(e) => setContactEmail(e.target.value)} 
                        style={{ width: '100%', padding: '0.65rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px' }} 
                      />
                    </div>

                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-gray)', display: 'block', marginBottom: '0.5rem' }}>Brief Description of operational bottlenecks</label>
                      <textarea 
                        required 
                        value={contactMsg} 
                        onChange={(e) => setContactMsg(e.target.value)} 
                        style={{ width: '100%', padding: '0.65rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px', resize: 'none', flexGrow: 1, minHeight: '80px' }} 
                      />
                    </div>

                    <button type="submit" className="cta-primary" style={{ width: '100%', justifyContent: 'center' }}>
                      INITIALIZE PROTOCOL
                    </button>
                  </form>
                )}
              </div>

              <div style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '2.5rem', color: 'white', fontFamily: 'var(--font-title)' }}>Initialize System Engagement</h3>
                <p style={{ color: 'var(--text-gray)', lineHeight: '1.6', fontSize: '1.1rem' }}>
                  Consult directly with our system architects. We analyze complex enterprise bottlenecks, establish quantitative viability vectors, and engineer precision deployment roadmaps.
                </p>
                {/* Official LinkedIn Social Link */}
                <LinkedInConnect />
              </div>
            </div>

          </section>
            </div>
          )}
        </>
      )}

      {/* Append Global Footer to all non-home subpages */}
      {slug !== 'home' && (
        <footer style={{ width: '100%', backgroundColor: '#050d1a', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '2rem 1.5rem', color: 'var(--text-gray)', fontSize: '0.85rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
            <div>© 2026 Lycos Core LLC. All rights reserved.</div>
            <RegionSelector variant="footer" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('knowledge-base'); }} style={{ color: 'var(--text-gray)', textDecoration: 'none', transition: 'color 0.2s' }}>Master Knowledge Base</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('terms-of-use'); }} style={{ color: 'var(--text-gray)', textDecoration: 'none', transition: 'color 0.2s' }}>Terms of Use</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('privacy-policy'); }} style={{ color: 'var(--text-gray)', textDecoration: 'none', transition: 'color 0.2s' }}>Privacy Policy</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('responsible-ai-policy'); }} style={{ color: 'var(--text-gray)', textDecoration: 'none', transition: 'color 0.2s' }}>Responsible AI Policy</a>
            </div>
          </div>
        </footer>
      )}

      {/* Navigation HUD (Home page only) */}
      {slug === 'home' && (
        <NavigationHUD 
          currentSection={activeSection} 
          totalSections={5} 
          onSectionClick={scrollToSection} 
        />
      )}

      {/* Info Modal */}
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(5, 13, 26, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="glass-panel" style={{ width: '90%', maxWidth: '600px', backgroundColor: 'var(--bg-secondary)' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', color: 'var(--accent)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>{modalTitle}</h3>
            
            <div style={{ color: 'var(--text-gray)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              {modalType === 'ai' && (
                <div>
                  <p style={{ marginBottom: '1rem' }}>Our central AI engine coordinates data classification, risk modeling, and natural language routing pipelines across standard REST endpoints.</p>
                  <p>In the headless setup, this coordinates dynamic queries via JSON API schemas, resolving complex data dependencies instantaneously without server-side rendering latency.</p>
                </div>
              )}
              {modalType === 'pillar' && (
                <div>
                  <p style={{ marginBottom: '1rem' }}>This core operational pillar is fully represented in the Payload CMS backend.</p>
                  <p>Content managers can dynamically edit descriptions, add custom metrics, or link case studies, reflecting instantly on the horizontal-scroll React interface without codebase deployments.</p>
                </div>
              )}
              {modalType === 'insight' && (
                <div>
                  <p style={{ marginBottom: '1rem' }}>Generative data pipelines demand extreme regulatory and security validation structures.</p>
                  <p>This matured insight studies model feedback vectors and how structured collections can secure user data contexts while accelerating validation runtimes.</p>
                </div>
              )}
            </div>

            <button className="btn-solid" onClick={() => setModalOpen(false)}>
              Close Overview
            </button>
          </div>
        </div>
      )}

      {/* Global Fixed Particle Sphere Portal Canvas (Single Continuous Element) */}
      <div
        className={`global-sphere-container ${
          isHeroState ? 'sphere-hero' : 'sphere-docked'
        }`}
        onClick={() => setIsCipherOpen((prev) => !prev)}
        title="Interact with Cipher AI Representative"
      >
        <canvas id="network-canvas" width="500" height="500" />
      </div>

      {/* Cipher Persona AI Chat Widget (ALWAYS Bottom-Right Docked) */}
      <CipherWidget
        isOpenControlled={isCipherOpen}
        onToggleControlled={() => setIsCipherOpen((prev) => !prev)}
      />
    </div>
  )
}