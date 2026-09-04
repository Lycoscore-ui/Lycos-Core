import { useState, useMemo } from 'react';
import type { CuratedArticle } from '../types/cms';
import { getPublishedArticles } from '../services/adminStorage';
import { Search, ExternalLink, Calendar, MessageSquareQuote, Newspaper, AlertTriangle, CheckCircle2 } from 'lucide-react';
import LinkedInConnect from './LinkedInConnect';

interface ArticlesSectionProps {
  articlesList?: CuratedArticle[];
}

export default function ArticlesSection({ articlesList }: ArticlesSectionProps) {
  const effectiveArticles = articlesList || getPublishedArticles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImportance, setSelectedImportance] = useState<string>('All');

  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const filteredArticles = useMemo(() => {
    return effectiveArticles.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.customSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.sourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesImportance = selectedImportance === 'All' || item.importance === selectedImportance;
      return matchesSearch && matchesImportance;
    });
  }, [effectiveArticles, searchTerm, selectedImportance]);

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
      <section id="articles-hero" className="section hero-fullscreen-section">
        <div className="hero-grid">
          <div>
            <div className="breadcrumb-text">// CORE &gt; // INTEL &gt; // CURATED ADVISORIES</div>
            <h1 className="hero-heading">
              Curated Technical News and Market Advisories<span className="brand-dot">.</span>
            </h1>
            
            <div className="hero-tags-row">
              {['Risk Assessment', 'Market Intel', 'Regulatory Curation'].map((tag, tIdx) => (
                <span key={tIdx} className="hero-pill-badge">
                  {tag}
                </span>
              ))}
            </div>

            <p className="hero-body-copy">
              Review our curated technical advisories and risk alerts. We track dynamic market developments, regulatory updates, and architectural events to advise enterprise leaders and safeguard operations.
            </p>
            
            <div className="subpage-hero-cta-row">
              <button 
                className="cta-primary" 
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                INITIALIZE ADVISORY BRIEFING
              </button>
              <button 
                className="cta-secondary" 
                onClick={() => {
                  const el = document.getElementById('block-articles');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                EXPLORE CURATION STREAM
              </button>
            </div>
          </div>

          {/* Right Hero Baseline Gauge Widget matching Gold-Standard */}
          <div className="hero-gauge-wrapper">
            <div className="baseline-card hero-gauge-card">
              <span className="hero-gauge-tag">
                // LIVE ADVISORY INTEL FEED
              </span>
              
              <div className="hero-visual-centerpiece">
                <div className="threat-radar-container">
                  <svg className="threat-radar-svg" viewBox="0 0 240 140">
                    <defs>
                      <radialGradient id="radarSweepGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FF3232" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#FF3232" stopOpacity="0.0" />
                      </radialGradient>
                    </defs>

                    {/* Radar Diamond / Grid Coordinates */}
                    <polygon points="120,15 210,70 120,125 30,70" fill="none" stroke="rgba(255,50,50,0.15)" strokeWidth="1" />
                    <polygon points="120,35 180,70 120,105 60,70" fill="none" stroke="rgba(255,50,50,0.25)" strokeWidth="1" strokeDasharray="3 3" />
                    <polygon points="120,55 150,70 120,85 90,70" fill="none" stroke="rgba(255,50,50,0.35)" strokeWidth="1" />

                    {/* Crosshairs */}
                    <line x1="30" y1="70" x2="210" y2="70" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    <line x1="120" y1="15" x2="120" y2="125" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                    {/* Rotating Radar Sweep Line */}
                    <g className="radar-sweep-line">
                      <line x1="120" y1="70" x2="120" y2="15" stroke="#FF3232" strokeWidth="2" filter="drop-shadow(0 0 6px #FF3232)" />
                    </g>

                    {/* Center Core */}
                    <circle cx="120" cy="70" r="4" fill="#FF3232" />

                    {/* Live Advisory Blips */}
                    <circle cx="155" cy="45" r="4" fill="#FF3232" className="radar-blip" />
                    <circle cx="85" cy="85" r="3.5" fill="#00f0ff" className="radar-blip" style={{ animationDelay: '0.8s' }} />
                    <circle cx="165" cy="80" r="3" fill="#8CFF32" className="radar-blip" style={{ animationDelay: '1.4s' }} />
                  </svg>

                  <div className="radar-hud-pill">
                    <AlertTriangle size={12} />
                    <span>12 ACTIVE SIGNALS • LIVE FEED</span>
                  </div>
                </div>
              </div>

              {/* Metric Label Strictly Underneath */}
              <span className="hero-gauge-label">
                Real-Time Advisory Intel Matrix
              </span>

              <div className="hero-gauge-status">
                <CheckCircle2 size={16} className="neon-icon threat-color" /> Live Curation Stream Active
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Below-the-Fold Section: Curated Advisories Stream */}
      <section id="block-articles" className="section">
        {/* Header and Controls */}
        <div className="articles-header-row">
          <div>
            <span className="eyebrow-tagline">// MARKET INTELLIGENCE</span>
            <h2 className="service-heading">Curation Advisory</h2>
          </div>

          {/* Inputs */}
          <div className="articles-filter-wrap">
            {/* Importance Filter */}
            <select
              value={selectedImportance}
              onChange={(e) => setSelectedImportance(e.target.value)}
              className="articles-importance-select"
            >
              <option value="All">All Risk Alerts</option>
              <option value="Critical">Critical Advisory</option>
              <option value="High">High Alert</option>
              <option value="Medium">Medium Alert</option>
              <option value="Low">Low Alert</option>
            </select>

            {/* Search bar */}
            <div className="articles-search-field-box">
              <span className="articles-search-input-icon">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Filter headlines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="articles-search-field"
              />
            </div>
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="articles-fallback-card">
            <p className="case-detail-partner">No curated advisories matched your filter criteria.</p>
          </div>
        ) : (
          /* Card stream */
          <div className="articles-stream-layout">
            {filteredArticles.map((item) => {
              const impClass = item.importance.toLowerCase();
              return (
                <div
                  key={item.id}
                  className={`glass-panel articles-card ${impClass}`}
                >
                  {/* Header indicators */}
                  <div className="articles-card-header">
                    {/* Left: Source and category */}
                    <div className="articles-card-meta-left">
                      <span className="articles-source-tag">
                        <Newspaper size={12} className="neon-icon" /> {item.sourceName}
                      </span>
                      <span className="case-bullet-divider">•</span>
                      <span className="case-duration-text font-semibold">
                        {item.category}
                      </span>
                      <span className="case-bullet-divider">•</span>
                      <span className="case-duration-text">
                        <Calendar size={12} /> {item.publishedDate}
                      </span>
                    </div>

                    {/* Right: Importance badge */}
                    <span className={`importance-badge ${impClass}`}>
                      <AlertTriangle size={12} /> {item.importance} ALERT
                    </span>
                  </div>

                  {/* Article Headline */}
                  <h3 className="articles-card-title">
                    {item.title}
                  </h3>

                  {/* Dense Layout Columns: Summary and Commentary */}
                  <div className="articles-card-columns">
                    {/* Left Column: Custom Summary */}
                    <div className="articles-summary-column">
                      <h4 className="articles-summary-title">
                        Market Event Summary
                      </h4>
                      <p className="articles-summary-text">
                        {item.customSummary}
                      </p>

                      <div className="articles-tags-row">
                        {item.tags.map(t => (
                          <span key={t} className="articles-tag-badge">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Strategic Commentary Block */}
                    <div className="articles-advisory-column">
                      {/* Tiny watermark watermark style icon */}
                      <span className="articles-advisory-watermark">
                        <MessageSquareQuote size={40} />
                      </span>

                      <h4 className="articles-advisory-title">
                        Lycos Strategic Advisory Commentary
                      </h4>

                      <div
                        className="articles-advisory-text"
                        dangerouslySetInnerHTML={{ __html: item.commentary }}
                      />

                      <div className="articles-advisory-reviewer">
                        Reviewed by {item.curator}
                      </div>
                    </div>
                  </div>

                  {/* Footer anchor */}
                  <div className="articles-card-footer">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-secondary"
                    >
                      READ ORIGINAL CURATION SOURCE <ExternalLink size={14} />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

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
