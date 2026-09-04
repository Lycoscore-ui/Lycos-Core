import { useState, useMemo, useEffect } from 'react';
import type { Insight } from '../types/cms';
import { getPublishedInsights } from '../services/adminStorage';
import NewsletterCTA from './NewsletterCTA';
import { Search, Clock, ArrowRight, X, Sparkles, CheckCircle2 } from 'lucide-react';
import LinkedInConnect from './LinkedInConnect';

interface InsightsSectionProps {
  insightsList?: Insight[];
}

export default function InsightsSection({ insightsList }: InsightsSectionProps) {
  const effectiveInsights = insightsList || getPublishedInsights();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeInsight, setActiveInsight] = useState<Insight | null>(null);
  const [modalScrollProgress, setModalScrollProgress] = useState(0);

  // Lock body scroll when deep-dive modal is open
  useEffect(() => {
    if (activeInsight) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeInsight]);

  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const categories = useMemo(() => {
    return ['All', 'AI Governance', 'Agentic Frameworks', 'Neural Architectures', 'Strategic Advisory'];
  }, []);

  const filteredInsights = useMemo(() => {
    return effectiveInsights.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory && item.status === 'Published';
    });
  }, [effectiveInsights, searchTerm, selectedCategory]);

  const featuredInsight = useMemo(() => {
    return filteredInsights[0] || null;
  }, [filteredInsights]);

  const secondaryInsights = useMemo(() => {
    return filteredInsights.slice(1);
  }, [filteredInsights]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactMsg('');
    }, 3000);
  };

  return (
    <>
      {/* Above-the-Fold Dedicated Hero Section (Strictly 100vh) */}
      <section id="insights-hero" className="section hero-fullscreen-section">
        <div className="hero-grid">
          <div>
            <div className="breadcrumb-text">// CORE &gt; // INTEL &gt; // OWNED INDUSTRY INSIGHTS</div>
            <h1 className="hero-heading">
              Owned Thought Leadership and Sovereign Industry Insights<span className="brand-dot">.</span>
            </h1>
            
            <div className="hero-tags-row">
              {['Agentic Frameworks', 'AI Governance', 'Neural Architectures'].map((tag, tIdx) => (
                <span key={tIdx} className="hero-pill-badge">
                  {tag}
                </span>
              ))}
            </div>

            <p className="hero-body-copy">
              Access our quantitative advisory and industry research briefings. We analyze complex neural workloads, establish compliance benchmarks, and publish technical blueprints to optimize enterprise velocity.
            </p>
            
            <div className="subpage-hero-cta-row">
              <button 
                className="cta-primary" 
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                INITIALIZE BRIEFING REQUEST
              </button>
              <button 
                className="cta-secondary" 
                onClick={() => {
                  const el = document.getElementById('block-insights');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                ACCESS RESEARCH CATALOG
              </button>
            </div>
          </div>

          {/* Right Hero Baseline Gauge Widget matching Gold-Standard */}
          <div className="hero-gauge-wrapper">
            <div className="baseline-card hero-gauge-card">
              <span className="hero-gauge-tag">
                // QUANTUM INTEL FREQUENCY
              </span>
              
              <div className="hero-visual-centerpiece">
                <div className="spectral-eq-container">
                  <div className="spectral-hologram-beam" />
                  
                  <div className="spectral-bars-wrapper">
                    <div className="spectral-bar-col">
                      <div className="spectral-bar-track" style={{ height: '100%' }}>
                        <div className="spectral-bar-fill bar-1" />
                      </div>
                    </div>
                    <div className="spectral-bar-col">
                      <div className="spectral-bar-track" style={{ height: '100%' }}>
                        <div className="spectral-bar-fill bar-2" />
                      </div>
                    </div>
                    <div className="spectral-bar-col">
                      <div className="spectral-bar-track" style={{ height: '100%' }}>
                        <div className="spectral-bar-fill bar-3" />
                      </div>
                    </div>
                    <div className="spectral-bar-col">
                      <div className="spectral-bar-track" style={{ height: '100%' }}>
                        <div className="spectral-bar-fill bar-4" />
                      </div>
                    </div>
                    <div className="spectral-bar-col">
                      <div className="spectral-bar-track" style={{ height: '100%' }}>
                        <div className="spectral-bar-fill bar-5" />
                      </div>
                    </div>
                    <div className="spectral-bar-col">
                      <div className="spectral-bar-track" style={{ height: '100%' }}>
                        <div className="spectral-bar-fill bar-6" />
                      </div>
                    </div>
                    <div className="spectral-bar-col">
                      <div className="spectral-bar-track" style={{ height: '100%' }}>
                        <div className="spectral-bar-fill bar-7" />
                      </div>
                    </div>
                    <div className="spectral-bar-col">
                      <div className="spectral-bar-track" style={{ height: '100%' }}>
                        <div className="spectral-bar-fill bar-8" />
                      </div>
                    </div>
                  </div>

                  <div className="spectral-footer-row">
                    <span className="spectral-tag-left">INDEXED: 1,420+ PAPERS</span>
                    <span className="spectral-tag-right">CONF: 99.8%</span>
                  </div>
                </div>
              </div>

              {/* Metric Label Strictly Underneath */}
              <span className="hero-gauge-label">
                Predictive Research Synthesis
              </span>

              <div className="hero-gauge-status">
                <CheckCircle2 size={16} className="neon-icon" /> Sovereign Technical Assets
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Below-the-Fold Section: Research Catalog */}
      <section id="block-insights" className="section">
        {/* Filters and Header Bar */}
        <div className="insights-filters-row">
          <div>
            <span className="eyebrow-tagline">// LYCOS INTELLIGENCE</span>
            <h2 className="service-heading">Research Explorer</h2>
          </div>

          {/* Search */}
          <div className="insights-search-wrap">
            <div className="insights-search-input-box">
              <span className="insights-search-icon">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search research, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="insights-search-field"
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="insights-categories-row">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`insights-category-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredInsights.length === 0 ? (
          <div className="insights-empty-card">
            <p className="case-detail-partner">No matching thought leadership insights found.</p>
          </div>
        ) : (
          /* Editorial Grid Layout */
          <div className="insights-editorial-layout">
            
            {/* Main Featured Editorial Card */}
            {featuredInsight && (
              <div className="glass-panel insights-featured-card">
                {/* Image banner */}
                <div className="insights-featured-image-container">
                  <img
                    src={featuredInsight.featuredImage}
                    alt={featuredInsight.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="insights-featured-badge">
                    <Sparkles size={12} /> FEATURED INSIGHT
                  </div>
                </div>

                {/* Text info */}
                <div className="insights-featured-info">
                  <div>
                    <div className="insights-featured-meta">
                      <span className="case-sidebar-industry">{featuredInsight.category}</span>
                      <span>•</span>
                      <span className="case-duration-text"><Clock size={12} /> {featuredInsight.readTime} min read</span>
                      <span>•</span>
                      <span>{featuredInsight.publishedDate}</span>
                    </div>

                    <h3 className="insights-featured-title">
                      {featuredInsight.title}
                    </h3>

                    <p className="hero-body-copy insights-featured-summary">
                      {featuredInsight.summary}
                    </p>
                  </div>

                  <div>
                    {/* Author block preview */}
                    <div className="insights-author-block">
                      <img
                        src={featuredInsight.author.avatar}
                        alt={featuredInsight.author.name}
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="case-sidebar-title insights-author-name-reset">{featuredInsight.author.name}</h4>
                        <p className="insights-secondary-meta insights-author-role-reset">{featuredInsight.author.role}</p>
                      </div>
                    </div>

                    <button className="cta-primary" onClick={() => setActiveInsight(featuredInsight)}>
                      READ FULL BLUEPRINT <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Secondary Editorial Grid */}
            {secondaryInsights.length > 0 && (
              <div className="insights-secondary-grid">
                {secondaryInsights.map((item) => (
                  <div key={item.id} className="glass-panel insights-secondary-card">
                    <div>
                      {/* Header meta */}
                      <div className="insights-secondary-meta">
                        <span className="case-sidebar-industry">{item.category}</span>
                        <span>•</span>
                        <span className="case-duration-text"><Clock size={12} /> {item.readTime} min read</span>
                      </div>

                      <h4 className="insights-secondary-title">
                        {item.title}
                      </h4>

                      <p className="hero-body-copy insights-secondary-summary">
                        {item.summary}
                      </p>
                    </div>

                    <div>
                      {/* Author sub-block */}
                      <div className="insights-secondary-author">
                        <img
                          src={item.author.avatar}
                          alt={item.author.name}
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h5 className="case-sidebar-title insights-author-name-reset">{item.author.name}</h5>
                          <p className="insights-secondary-meta insights-author-role-reset">{item.author.role}</p>
                        </div>
                      </div>

                      <button className="cta-secondary" onClick={() => setActiveInsight(item)}>
                        ACCESS ADVISORY <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Embed Newsletter CTA */}
            <NewsletterCTA />

          </div>
        )}
      </section>

      {/* Deep-Read Article Modal Detail View */}
      {activeInsight && (
        <div 
          className="insights-modal-overlay"
          onScroll={(e) => {
            const el = e.currentTarget;
            const progress = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
            setModalScrollProgress(Math.min(100, Math.max(0, progress || 0)));
          }}
        >
          <div className="glass-panel insights-modal-content">
            {/* Top Sticky Reading Progress Indicator */}
            <div className="insight-reading-progress">
              <div className="insight-reading-progress-bar" style={{ width: `${modalScrollProgress}%` }} />
            </div>

            {/* Close Button */}
            <button
              onClick={() => { setActiveInsight(null); setModalScrollProgress(0); }}
              className="insights-modal-close-btn"
              aria-label="Close Insight"
            >
              <X size={18} />
            </button>

            {/* Modal Header Meta */}
            <div className="insights-modal-meta">
              <span className="insights-modal-author-role">{activeInsight.category}</span>
              <span>•</span>
              <span className="case-duration-text"><Clock size={14} /> {activeInsight.readTime} min read</span>
              <span>•</span>
              <span>Published: {activeInsight.publishedDate}</span>
            </div>

            <h1 className="insights-modal-title">
              {activeInsight.title}
            </h1>

            {/* Author Block Profile */}
            <div className="insights-modal-author">
              <img
                src={activeInsight.author.avatar}
                alt={activeInsight.author.name}
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="insights-modal-author-name">
                  {activeInsight.author.name}
                </h4>
                <p className="insights-modal-author-role">
                  {activeInsight.author.role}
                </p>
                <p className="insights-modal-author-bio">
                  {activeInsight.author.bio}
                </p>
              </div>
            </div>

            {/* Content rendering */}
            <div className="markdown-body insights-modal-markdown" dangerouslySetInnerHTML={{ __html: activeInsight.content }} />

            {/* Tags footer */}
            <div className="insights-modal-tags-row">
              <span className="case-sidebar-industry insights-core-vectors-tag">Core Vectors:</span>
              {activeInsight.tags.map(tag => (
                <span key={tag} className="insights-modal-tag-chip">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Bottom action to close */}
            <div className="insights-modal-footer">
              <button className="cta-secondary" onClick={() => { setActiveInsight(null); setModalScrollProgress(0); }}>
                CLOSE ADVISORY
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Contact Section at bottom of page matching Gold-Standard */}
      <section id="contact" className="section hero-fullscreen-section">
        <div className="contact-grid">
          <div className="glass-panel contact-card">
            <h3 className="service-heading">
              Initiate Engagement
            </h3>
            
            {contactSubmitted ? (
              <div className="hero-gauge-status">
                <CheckCircle2 size={48} className="neon-icon" />
                <h4>Submission Received</h4>
                <p>Thank you. One of our operational leads will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="contact-form">
                <div>
                  <label className="contact-label">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={contactName} 
                    onChange={(e) => setContactName(e.target.value)} 
                    className="contact-input"
                  />
                </div>

                <div>
                  <label className="contact-label">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={contactEmail} 
                    onChange={(e) => setContactEmail(e.target.value)} 
                    className="contact-input"
                  />
                </div>

                <div className="contact-form">
                  <label className="contact-label">Brief Description of operational bottlenecks</label>
                  <textarea 
                    required 
                    value={contactMsg} 
                    onChange={(e) => setContactMsg(e.target.value)} 
                    className="contact-textarea"
                  />
                </div>

                <button type="submit" className="cta-primary contact-submit-btn">
                  Initialize Protocol
                </button>
              </form>
            )}
          </div>

          <div className="hero-gauge-wrapper">
            <div className="contact-card">
              <h3 className="hero-heading">Initialize System Engagement</h3>
              <p className="hero-body-copy">
                Consult directly with our system architects. We analyze complex enterprise bottlenecks, establish quantitative viability vectors, and engineer precision deployment roadmaps.
              </p>
              
              {/* Official LinkedIn Social Link */}
              <LinkedInConnect />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
