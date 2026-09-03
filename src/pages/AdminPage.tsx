import { useState, useEffect } from 'react';
import { 
  Calendar, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  Trash2, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Radio, 
  Image as ImageIcon, 
  Share2, 
  Copy, 
  FileText,
  Activity,
  Layers,
  Search,
  X,
  Rocket,
  Zap,
  Key,
  Globe,
  Newspaper
} from 'lucide-react';
import type { CandidateArticle, GeneratedArticleDraft, N8nWebhookConfig } from '../types/admin';
import type { CuratedArticle } from '../types/cms';
import { 
  getAdminSession, 
  clearAdminSession, 
  getN8nConfig, 
  saveN8nConfig, 
  fetchCandidatesFromN8n, 
  synthesizeArticleWithN8n, 
  fetchIndustryCandidatesFromN8n,
  scrapeIndustryArticleWithN8n,
  generateFallbackIndustryCandidates,
  dispatchLinkedInViaN8n, 
  triggerGitHubDeployment,
  getPublishedArticles, 
  publishArticleToSite, 
  deletePublishedArticle,
  generateMockCandidates
} from '../services/adminStorage';
import AdminLoginModal from '../components/AdminLoginModal';

function getWeekDetails(dateOffsetWeeks = 0): { 
  weekNumber: number; 
  label: string; 
  range: string;
  startDate: string;
  endDate: string;
} {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + (dateOffsetWeeks * 7));

  // Compute Monday of that week
  const day = targetDate.getDay();
  const diffToMonday = targetDate.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(targetDate.getFullYear(), targetDate.getMonth(), diffToMonday);
  const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);

  // Compute standard ISO week number
  const jan4 = new Date(monday.getFullYear(), 0, 4);
  const jan4Day = jan4.getDay() || 7;
  const startOfYear = new Date(jan4.getFullYear(), 0, jan4.getDate() - jan4Day + 1);
  const weekNumber = Math.max(1, Math.round(((monday.getTime() - startOfYear.getTime()) / 86400000) / 7) + 1);

  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const range = `${monday.toLocaleDateString('en-US', options)} – ${sunday.toLocaleDateString('en-US', options)}, ${sunday.getFullYear()}`;

  const startDate = `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, '0')}-${String(monday.getDate()).padStart(2, '0')}`;
  const endDate = `${sunday.getFullYear()}-${String(sunday.getMonth() + 1).padStart(2, '0')}-${String(sunday.getDate()).padStart(2, '0')}`;

  return {
    weekNumber,
    label: `Week ${weekNumber}`,
    range,
    startDate,
    endDate
  };
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'rewrite' | 'industry' | 'published'>('rewrite');
  
  // Week & Filter State
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  
  // Pipeline 1: Article AI Rewrite Data States
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(false);
  const [candidates, setCandidates] = useState<CandidateArticle[]>([]);
  const [fromN8nSearch, setFromN8nSearch] = useState(false);
  
  // Synthesis & Review State for AI Rewrite
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [activeDraft, setActiveDraft] = useState<GeneratedArticleDraft | null>(null);
  const [fromN8nSynthesis, setFromN8nSynthesis] = useState(false);

  // Pipeline 2: Industry Articles Matrix & Scraper Data States
  const [isLoadingIndustryCandidates, setIsLoadingIndustryCandidates] = useState(false);
  const [industryCandidates, setIndustryCandidates] = useState<CandidateArticle[]>([]);
  const [fromN8nIndustrySearch, setFromN8nIndustrySearch] = useState(false);
  const [isScrapingIndustry, setIsScrapingIndustry] = useState(false);
  const [activeIndustryDraft, setActiveIndustryDraft] = useState<GeneratedArticleDraft | null>(null);
  const [fromN8nIndustryScrape, setFromN8nIndustryScrape] = useState(false);

  // Deployment States
  const [isDeployingStaging, setIsDeployingStaging] = useState(false);
  const [isDeployingProd, setIsDeployingProd] = useState(false);
  const [lastActionsUrl, setLastActionsUrl] = useState<string | null>(null);
  
  // Action notifications
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [isDispatchingLinkedIn, setIsDispatchingLinkedIn] = useState(false);

  // Published articles & Filter State
  const [publishedList, setPublishedList] = useState<CuratedArticle[]>([]);
  const [repoFilter, setRepoFilter] = useState<'all' | 'owned_insight' | 'curated_news'>('all');

  const isOwnedInsight = (art: CuratedArticle) => {
    return art.contentType === 'owned_insight' || art.sourceName === 'Lycos Core Intel' || !!art.curator?.includes('Intelligence');
  };

  const ownedCount = publishedList.filter(isOwnedInsight).length;
  const curatedCount = publishedList.filter(a => !isOwnedInsight(a)).length;

  const filteredPublishedList = publishedList.filter(art => {
    if (repoFilter === 'owned_insight') return isOwnedInsight(art);
    if (repoFilter === 'curated_news') return !isOwnedInsight(art);
    return true;
  });

  // Webhook settings modal state
  const [n8nConfig, setN8nConfigState] = useState<N8nWebhookConfig>(getN8nConfig());
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const weekInfo = getWeekDetails(weekOffset);

  useEffect(() => {
    const session = getAdminSession();
    if (session && session.isLoggedIn) {
      setIsAuthenticated(true);
      loadPublishedList();
    }
  }, []);

  const loadPublishedList = () => {
    setPublishedList(getPublishedArticles());
  };

  const handleLogout = () => {
    clearAdminSession();
    setIsAuthenticated(false);
  };

  // 1. Fetch Weekly Candidates for AI Rewrite Pipeline
  const handleFetchCandidates = async () => {
    setIsLoadingCandidates(true);
    setActionSuccess(null);
    setActionError(null);
    setCandidates([]);
    setActiveDraft(null);

    const res = await fetchCandidatesFromN8n(weekInfo, selectedGenre, n8nConfig);
    setIsLoadingCandidates(false);

    if (res.fromN8n && res.candidates.length > 0) {
      setCandidates(res.candidates);
      setFromN8nSearch(true);
      setActionSuccess(`✓ Fetched ${res.candidates.length} AI rewrite candidate articles live from N8N search pipeline!`);
    } else {
      setCandidates([]);
      setFromN8nSearch(false);
      setActionError(res.error || 'N8N did not return any candidate articles. Check N8N workflow execution.');
    }
  };

  // Fallback Demo Generator for AI Rewrite Pipeline
  const handleLoadDemoCandidates = () => {
    const demo = generateMockCandidates(weekInfo.label, selectedGenre, weekInfo.startDate);
    setCandidates(demo);
    setFromN8nSearch(false);
    setActionSuccess(`Loaded 15 demo AI rewrite candidate articles for ${weekInfo.label} (${weekInfo.range}).`);
  };

  // 2. Synthesize AI Rewrite Candidate into Full Draft
  const handleSynthesizeCandidate = async (candidate: CandidateArticle) => {
    setIsSynthesizing(true);
    setActionSuccess(null);
    setActionError(null);

    const res = await synthesizeArticleWithN8n(candidate, n8nConfig);
    setIsSynthesizing(false);

    if (res.fromN8n && res.draft) {
      setActiveDraft(res.draft);
      setFromN8nSynthesis(true);
      setActionSuccess(`✓ Draft synthesized live by Qwen/N8N for "${candidate.title}"`);
    } else {
      setActionError(res.error || 'N8N synthesis failed. Please inspect your N8N workflow execution.');
    }
  };

  // 3. Fetch 15 Industry News Candidates (lycos-industry-search)
  const handleFetchIndustryCandidates = async () => {
    setIsLoadingIndustryCandidates(true);
    setActionSuccess(null);
    setActionError(null);
    setIndustryCandidates([]);
    setActiveIndustryDraft(null);

    const res = await fetchIndustryCandidatesFromN8n(weekInfo, selectedGenre, n8nConfig);
    setIsLoadingIndustryCandidates(false);

    if (res.fromN8n && res.candidates.length > 0) {
      setIndustryCandidates(res.candidates);
      setFromN8nIndustrySearch(true);
      setActionSuccess(`✓ Discovered ${res.candidates.length} industry news candidates live via N8N (lycos-industry-search)!`);
    } else {
      setIndustryCandidates([]);
      setFromN8nIndustrySearch(false);
      setActionError(res.error || 'N8N Industry Search did not return candidates. Check N8N workflow execution.');
    }
  };

  // Fallback Demo Generator for Industry Articles
  const handleLoadDemoIndustryCandidates = () => {
    const demo = generateFallbackIndustryCandidates(weekInfo.label, selectedGenre, weekInfo.startDate);
    setIndustryCandidates(demo);
    setFromN8nIndustrySearch(false);
    setActionSuccess(`Loaded 15 demo industry news articles for ${weekInfo.label} (${weekInfo.range}).`);
  };

  // 4. Scrape & Extract Industry Candidate Deep Metadata (lycos-industry-scrape)
  const handleScrapeIndustryCandidate = async (candidate: CandidateArticle) => {
    setIsScrapingIndustry(true);
    setActionSuccess(null);
    setActionError(null);

    const res = await scrapeIndustryArticleWithN8n(candidate, n8nConfig);
    setIsScrapingIndustry(false);

    if (res.fromN8n && res.draft) {
      setActiveIndustryDraft(res.draft);
      setFromN8nIndustryScrape(true);
      setActionSuccess(`✓ Scraped metadata & imagery harvested for "${candidate.title}" via N8N!`);
    } else {
      setActionError(res.error || 'N8N Industry Scrape failed. Please check your N8N workflow.');
    }
  };

  // 5. Publish AI Rewrite Draft
  const handleApproveAndPublish = () => {
    if (!activeDraft) return;

    publishArticleToSite(activeDraft);
    loadPublishedList();
    setActionSuccess(`Article "${activeDraft.title}" successfully published to the live website!`);
    setActiveDraft(prev => prev ? { ...prev, status: 'published' } : null);
  };

  // 6. Publish Industry Draft
  const handleApproveAndPublishIndustry = () => {
    if (!activeIndustryDraft) return;

    publishArticleToSite(activeIndustryDraft);
    loadPublishedList();
    setActionSuccess(`Industry article "${activeIndustryDraft.title}" successfully published to the live website!`);
    setActiveIndustryDraft(prev => prev ? { ...prev, status: 'published' } : null);
  };

  // 7. Dispatch LinkedIn Post via N8N (AI Rewrite)
  const handleDispatchLinkedIn = async () => {
    if (!activeDraft) return;

    setIsDispatchingLinkedIn(true);
    const res = await dispatchLinkedInViaN8n(activeDraft, n8nConfig);
    setIsDispatchingLinkedIn(false);

    if (res.success) {
      setActionSuccess(`LinkedIn post dispatched to N8N automation workflow!`);
      setActiveDraft(prev => prev ? {
        ...prev,
        linkedInPost: { ...prev.linkedInPost, status: 'dispatched' }
      } : null);
    } else {
      setActionError('Failed to trigger N8N LinkedIn dispatch.');
    }
  };

  // 8. Dispatch LinkedIn Post via N8N (Industry Article)
  const handleDispatchIndustryLinkedIn = async () => {
    if (!activeIndustryDraft) return;

    setIsDispatchingLinkedIn(true);
    const res = await dispatchLinkedInViaN8n(activeIndustryDraft, n8nConfig);
    setIsDispatchingLinkedIn(false);

    if (res.success) {
      setActionSuccess(`Industry LinkedIn post dispatched to N8N automation workflow!`);
      setActiveIndustryDraft(prev => prev ? {
        ...prev,
        linkedInPost: { ...prev.linkedInPost, status: 'dispatched' }
      } : null);
    } else {
      setActionError('Failed to trigger N8N LinkedIn dispatch.');
    }
  };

  // 5. Trigger GitHub Deployment: Push to Staging
  const handleDeployStaging = async () => {
    setIsDeployingStaging(true);
    setActionSuccess(null);
    setActionError(null);

    const result = await triggerGitHubDeployment('staging', n8nConfig);
    setIsDeployingStaging(false);
    setLastActionsUrl(result.actionsUrl || null);

    if (result.success) {
      setActionSuccess(result.message);
    } else {
      setActionError(result.message);
    }
  };

  // 6. Trigger GitHub Deployment: Push to Live
  const handleDeployProduction = async () => {
    const confirmLive = window.confirm('Are you sure you want to deploy the latest approved build directly to LIVE PRODUCTION (lycoscore.com)?');
    if (!confirmLive) return;

    setIsDeployingProd(true);
    setActionSuccess(null);
    setActionError(null);

    const result = await triggerGitHubDeployment('production', n8nConfig);
    setIsDeployingProd(false);
    setLastActionsUrl(result.actionsUrl || null);

    if (result.success) {
      setActionSuccess(result.message);
    } else {
      setActionError(result.message);
    }
  };

  // 7. Delete Article
  const handleDeleteArticle = (id: string) => {
    deletePublishedArticle(id);
    loadPublishedList();
    setActionSuccess('Article removed from website repository.');
  };

  // 6. Save N8N Configuration
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveN8nConfig(n8nConfig);
    setShowSettingsModal(false);
    setActionSuccess('N8N Webhook configurations saved successfully!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setActionSuccess('Copied to clipboard!');
    setTimeout(() => setActionSuccess(null), 2000);
  };

  if (!isAuthenticated) {
    return <AdminLoginModal onLoginSuccess={() => { setIsAuthenticated(true); loadPublishedList(); }} />;
  }

  return (
    <div className="admin-root-viewport">
      {/* Top Administrative Navigation HUD */}
      <header className="admin-nav-bar glass-panel">
        <div className="admin-nav-left">
          <div className="admin-logo-lockup">
            <img src="./media/LYCOS-CORE-lOGOTYPE-300x100.png" alt="Lycos Core" className="admin-header-logo" />
            <span className="admin-env-pill">ADMIN MATRIX // L-9</span>
          </div>

          <nav className="admin-tab-group">
            <button 
              className={`admin-tab-btn ${activeTab === 'rewrite' ? 'active' : ''}`}
              onClick={() => { setActiveTab('rewrite'); setActiveDraft(null); }}
            >
              <Sparkles size={16} /> Article AI rewrite
            </button>
            <button 
              className={`admin-tab-btn ${activeTab === 'industry' ? 'active' : ''}`}
              onClick={() => { setActiveTab('industry'); setActiveIndustryDraft(null); }}
            >
              <Globe size={16} /> Industry Articles
            </button>
            <button 
              className={`admin-tab-btn ${activeTab === 'published' ? 'active' : ''}`}
              onClick={() => setActiveTab('published')}
            >
              <Layers size={16} /> Published Repository ({publishedList.length})
            </button>
          </nav>
        </div>

        <div className="admin-nav-right">
          {/* Quick Deployment Action Buttons */}
          <div className="admin-deploy-buttons-group">
            <button 
              className="admin-deploy-btn admin-staging-btn"
              onClick={handleDeployStaging}
              disabled={isDeployingStaging}
              title="Trigger GitHub deployment to staging.lycoscore.com"
            >
              {isDeployingStaging ? (
                <Activity size={14} className="spin-icon" />
              ) : (
                <Rocket size={14} />
              )}
              <span>PUSH TO STAGING</span>
            </button>

            <button 
              className="admin-deploy-btn admin-prod-btn"
              onClick={handleDeployProduction}
              disabled={isDeployingProd}
              title="Trigger GitHub deployment directly to lycoscore.com (LIVE)"
            >
              {isDeployingProd ? (
                <Activity size={14} className="spin-icon" />
              ) : (
                <Zap size={14} />
              )}
              <span>PUSH TO LIVE</span>
            </button>
          </div>

          <div className="admin-n8n-status-indicator" title="Local N8N Automation Status">
            <Radio size={14} className="neon-icon" />
            <span>N8N: localhost:5678</span>
          </div>

          <button 
            className="admin-icon-btn" 
            onClick={() => setShowSettingsModal(true)} 
            title="Configure N8N & GitHub Integration"
          >
            <Settings size={18} />
          </button>

          <div className="admin-user-pill">
            <span className="admin-dot-active" />
            <span>Lycoscoreadmin</span>
          </div>

          <button 
            className="admin-logout-btn" 
            onClick={handleLogout} 
            title="End Session"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Global Action Banner Notification */}
      {actionSuccess && (
        <div className="admin-toast-banner admin-toast-success">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <CheckCircle2 size={16} />
            <span>{actionSuccess}</span>
            {lastActionsUrl && (
              <a 
                href={lastActionsUrl} 
                target="_blank" 
                rel="noreferrer" 
                style={{ color: 'var(--accent, #8CFF32)', textDecoration: 'underline', marginLeft: '0.5rem', fontWeight: 600 }}
              >
                View GitHub Workflow Run ↗
              </a>
            )}
          </div>
          <button onClick={() => { setActionSuccess(null); setLastActionsUrl(null); }} className="admin-toast-close">
            <X size={14} />
          </button>
        </div>
      )}

      {actionError && (
        <div className="admin-toast-banner admin-toast-error">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <X size={16} />
            <span>{actionError}</span>
            {lastActionsUrl && (
              <a 
                href={lastActionsUrl} 
                target="_blank" 
                rel="noreferrer" 
                style={{ color: '#fff', textDecoration: 'underline', marginLeft: '0.5rem' }}
              >
                Inspect Actions ↗
              </a>
            )}
          </div>
          <button onClick={() => { setActionError(null); setLastActionsUrl(null); }} className="admin-toast-close">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Administrative Container */}
      <main className="admin-main-container">
        {activeTab === 'rewrite' && (
          <div className="admin-pipeline-layout">
            
            {/* Top Control Bar: Week Picker & Genre Filters */}
            <div className="admin-control-panel glass-panel">
              <div className="admin-week-selector">
                <span className="admin-control-label">CALENDAR WEEK</span>
                <div className="admin-week-nav">
                  <button 
                    className="admin-btn-icon" 
                    onClick={() => setWeekOffset(prev => prev - 1)}
                    title="Previous Week"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <div className="admin-week-badge">
                    <Calendar size={15} className="neon-icon" />
                    <strong>{weekInfo.label}</strong>
                    <span className="admin-week-range">({weekInfo.range})</span>
                  </div>
                  <button 
                    className="admin-btn-icon" 
                    onClick={() => setWeekOffset(prev => prev + 1)}
                    title="Next Week"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="admin-genre-selector">
                <span className="admin-control-label">TOPIC FOCUS</span>
                <div className="admin-genre-pills">
                  {['All', 'Agentic Systems', 'AI Policy', 'Research Breakthroughs', 'Core Infrastructure'].map(genre => (
                    <button
                      key={genre}
                      className={`admin-genre-pill ${selectedGenre === genre ? 'active' : ''}`}
                      onClick={() => setSelectedGenre(genre)}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                className="cta-primary admin-fetch-btn" 
                onClick={handleFetchCandidates}
                disabled={isLoadingCandidates}
              >
                {isLoadingCandidates ? (
                  <>
                    <Activity size={16} className="spin-icon" /> FETCHING CANDIDATES...
                  </>
                ) : (
                  <>
                    <Search size={16} /> FETCH 15 CANDIDATES (N8N)
                  </>
                )}
              </button>
            </div>

            {/* If Draft Studio is Active: Show Studio, else Candidate Grid */}
            {activeDraft ? (
              /* Review & Editorial Studio */
              <div className="admin-studio-grid">
                
                {/* Left Studio Column: Draft Editor */}
                <div className="admin-editor-card glass-panel">
                  <div className="admin-card-header">
                    <div className="admin-header-title-wrap">
                      <Sparkles size={18} className="neon-icon" />
                      <h3>Owned Industry Insight (AI Copywriting Studio)</h3>
                    </div>
                    <div className="admin-draft-meta-tags">
                      <span className="admin-pub-corner-badge admin-badge-owned">
                        <Sparkles size={11} /> OWNED INSIGHT
                      </span>
                      <span className="admin-meta-pill">{fromN8nSynthesis ? 'N8N SYNCED' : 'AI DRAFT'}</span>
                      <span className="admin-meta-pill accent">{activeDraft.category}</span>
                    </div>
                  </div>

                  <div className="admin-editor-form">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Article Headline</label>
                      <input 
                        type="text" 
                        value={activeDraft.title}
                        onChange={(e) => setActiveDraft({ ...activeDraft, title: e.target.value })}
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label className="admin-form-label">Category</label>
                        <select 
                          value={activeDraft.category}
                          onChange={(e) => setActiveDraft({ ...activeDraft, category: e.target.value as any })}
                          className="admin-select"
                        >
                          <option value="Agentic Systems">Agentic Systems</option>
                          <option value="AI Policy">AI Policy</option>
                          <option value="Research Breakthroughs">Research Breakthroughs</option>
                          <option value="Core Infrastructure">Core Infrastructure</option>
                          <option value="Tech Trends">Tech Trends</option>
                        </select>
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-form-label">Importance</label>
                        <select 
                          value={activeDraft.importance}
                          onChange={(e) => setActiveDraft({ ...activeDraft, importance: e.target.value as any })}
                          className="admin-select"
                        >
                          <option value="Critical">Critical</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Tags (comma-separated)</label>
                      <input 
                        type="text" 
                        value={activeDraft.tags.join(', ')}
                        onChange={(e) => setActiveDraft({ 
                          ...activeDraft, 
                          tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) 
                        })}
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Executive Summary</label>
                      <textarea 
                        rows={3}
                        value={activeDraft.customSummary}
                        onChange={(e) => setActiveDraft({ ...activeDraft, customSummary: e.target.value })}
                        className="admin-textarea"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Lycos Core Strategic Commentary</label>
                      <textarea 
                        rows={3}
                        value={activeDraft.commentary}
                        onChange={(e) => setActiveDraft({ ...activeDraft, commentary: e.target.value })}
                        className="admin-textarea"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Full Technical Body (Markdown)</label>
                      <textarea 
                        rows={7}
                        value={activeDraft.content}
                        onChange={(e) => setActiveDraft({ ...activeDraft, content: e.target.value })}
                        className="admin-textarea code-font"
                      />
                    </div>

                    <div className="admin-form-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                        <label className="admin-form-label" style={{ margin: 0 }}>
                          Featured Editorial Asset (Unsplash Candidates)
                        </label>
                        {activeDraft.imageSearchQuery && (
                          <span className="admin-input-badge" style={{ position: 'static' }}>
                            KEYWORDS: "{activeDraft.imageSearchQuery}"
                          </span>
                        )}
                      </div>

                      {/* 3-Column Unsplash Thumbnail Selection Grid */}
                      {activeDraft.imageOptions && activeDraft.imageOptions.length > 0 ? (
                        <div className="admin-unsplash-grid">
                          {activeDraft.imageOptions.map((opt) => {
                            const isSelected = activeDraft.imageUrl === opt.url || activeDraft.selectedImageOptionId === opt.id;
                            return (
                              <div
                                key={opt.id}
                                className={`admin-unsplash-card ${isSelected ? 'selected' : ''}`}
                                onClick={() => setActiveDraft({
                                  ...activeDraft,
                                  imageUrl: opt.url,
                                  selectedImageOptionId: opt.id
                                })}
                              >
                                <div className="admin-unsplash-thumb-wrap">
                                  <img src={opt.thumb} alt={opt.alt} className="admin-unsplash-thumb" />
                                  {isSelected && (
                                    <div className="admin-unsplash-selected-badge">
                                      <CheckCircle2 size={12} /> SELECTED
                                    </div>
                                  )}
                                </div>
                                <div className="admin-unsplash-info">
                                  <span className="admin-unsplash-alt" title={opt.alt}>{opt.alt}</span>
                                  <span className="admin-unsplash-credit">
                                    Photo by {opt.photographer}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="admin-input-wrapper">
                          <input 
                            type="text" 
                            value={activeDraft.imageUrl}
                            onChange={(e) => setActiveDraft({ ...activeDraft, imageUrl: e.target.value })}
                            className="admin-input"
                            placeholder="https://images.unsplash.com/..."
                          />
                          <ImageIcon size={16} className="admin-input-icon" />
                        </div>
                      )}

                      {/* Custom Image URL Override Input */}
                      <div style={{ marginTop: '0.75rem' }}>
                        <div className="admin-input-wrapper">
                          <input 
                            type="text" 
                            value={activeDraft.imageUrl}
                            onChange={(e) => setActiveDraft({ ...activeDraft, imageUrl: e.target.value, selectedImageOptionId: undefined })}
                            className="admin-input code-font"
                            style={{ fontSize: '0.75rem', padding: '0.45rem 0.75rem' }}
                            placeholder="Selected High-Res Asset URL override..."
                          />
                          <ImageIcon size={14} className="admin-input-icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Studio Column: Live Website Card Preview & LinkedIn Social Dispatch */}
                <div className="admin-preview-col">
                  
                  {/* LinkedIn Social Post Card */}
                  <div className="admin-linkedin-card glass-panel">
                    <div className="admin-card-header">
                      <div className="admin-header-title-wrap">
                        <Share2 size={18} className="neon-icon" />
                        <h3>N8N LinkedIn Social Post</h3>
                      </div>
                      <button 
                        className="admin-btn-ghost"
                        onClick={() => copyToClipboard(`${activeDraft.linkedInPost.headline}\n\n${activeDraft.linkedInPost.body}\n\n${activeDraft.linkedInPost.hashtags.join(' ')}`)}
                        title="Copy LinkedIn Text"
                      >
                        <Copy size={14} /> Copy
                      </button>
                    </div>

                    <div className="admin-linkedin-editor">
                      <input 
                        type="text"
                        value={activeDraft.linkedInPost.headline}
                        onChange={(e) => setActiveDraft({
                          ...activeDraft,
                          linkedInPost: { ...activeDraft.linkedInPost, headline: e.target.value }
                        })}
                        className="admin-input"
                        placeholder="LinkedIn Headline..."
                      />
                      <textarea 
                        rows={4}
                        value={activeDraft.linkedInPost.body}
                        onChange={(e) => setActiveDraft({
                          ...activeDraft,
                          linkedInPost: { ...activeDraft.linkedInPost, body: e.target.value }
                        })}
                        className="admin-textarea"
                      />
                      <div className="admin-hashtags-row">
                        {activeDraft.linkedInPost.hashtags.map((ht, idx) => (
                          <span key={idx} className="admin-hashtag-badge">{ht}</span>
                        ))}
                      </div>
                    </div>

                    <button 
                      className="cta-secondary admin-linkedin-btn"
                      onClick={handleDispatchLinkedIn}
                      disabled={isDispatchingLinkedIn}
                    >
                      {isDispatchingLinkedIn ? (
                        <>
                          <Activity size={16} className="spin-icon" /> DISPATCHING TO N8N...
                        </>
                      ) : (
                        <>
                          <Send size={16} /> DISPATCH LINKEDIN POST VIA N8N
                        </>
                      )}
                    </button>
                  </div>

                  {/* Live Website Preview Card */}
                  <div className="admin-preview-card glass-panel">
                    <div className="admin-card-header">
                      <div className="admin-header-title-wrap">
                        <FileText size={18} className="neon-icon" />
                        <h3>Live Website Article Preview</h3>
                      </div>
                      <span className="admin-live-tag">PREVIEW</span>
                    </div>

                    <div className="admin-website-mockup">
                      <div className="admin-mock-card">
                        {activeDraft.imageUrl && (
                          <div className="admin-mock-image-wrap" style={{ width: '100%', height: '140px', overflow: 'hidden', borderRadius: '6px', marginBottom: '0.85rem' }}>
                            <img src={activeDraft.imageUrl} alt={activeDraft.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        )}
                        <div className="admin-mock-badge-row">
                          <span className="admin-mock-pill">{activeDraft.category}</span>
                          <span className="admin-mock-importance">{activeDraft.importance} Priority</span>
                        </div>
                        <h4 className="admin-mock-title">{activeDraft.title}</h4>
                        <p className="admin-mock-summary">{activeDraft.customSummary}</p>
                        <div className="admin-mock-commentary">
                          <strong>Strategic Insight:</strong> {activeDraft.commentary}
                        </div>
                        <div className="admin-mock-tags">
                          {activeDraft.tags.map((t, idx) => (
                            <span key={idx} className="admin-mock-tag">#{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Master Publishing Action Bar */}
                    <div className="admin-studio-actions">
                      <button 
                        className="cta-primary admin-publish-btn"
                        onClick={handleApproveAndPublish}
                      >
                        <CheckCircle2 size={18} /> APPROVE & PUBLISH TO OWNED INSIGHTS
                      </button>
                      <button 
                        className="admin-btn-ghost"
                        onClick={() => setActiveDraft(null)}
                      >
                        Back to 15 Candidates
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              /* 15 Candidate Articles Selection Grid */
              <div className="admin-candidates-section">
                <div className="admin-section-heading-row">
                  <div>
                    <h3 className="admin-sec-title">
                      {candidates.length > 0 ? `15 Source Candidates for Owned Insights (${weekInfo.label})` : 'Weekly Candidate Discovery Matrix'}
                    </h3>
                    <p className="admin-sec-subtitle">
                      {candidates.length > 0 
                        ? 'Select any candidate below to trigger Qwen/N8N copywriting — rewriting the topic into a proprietary Owned Industry Insight with Lycos Core strategic advisory.' 
                        : 'Click "Fetch 15 Candidates (N8N)" above to discover source candidates.'}
                    </p>
                  </div>
                  {candidates.length > 0 && (
                    <span className="admin-source-badge">
                      {fromN8nSearch ? 'SOURCE: N8N LIVE AGENT' : 'SOURCE: DEMO PREVIEW'}
                    </span>
                  )}
                </div>

                {isLoadingCandidates && (
                  <div className="admin-loading-card glass-panel">
                    <Activity size={36} className="spin-icon neon-icon" />
                    <h4>Executing N8N Candidate Discovery Pipeline...</h4>
                    <p>Contacting local N8N webhook (<code>{n8nConfig.searchWebhookUrl}</code>) & awaiting LM Studio reasoning engine.</p>
                  </div>
                )}

                {isSynthesizing && (
                  <div className="admin-loading-card glass-panel">
                    <Activity size={36} className="spin-icon neon-icon" />
                    <h4>Synthesizing Full Technical Article via N8N...</h4>
                    <p>Generating technical body, metadata tags, image prompt, and LinkedIn social release.</p>
                  </div>
                )}

                {candidates.length === 0 && !isLoadingCandidates && !isSynthesizing && (
                  <div className="admin-empty-state glass-panel">
                    <Search size={40} className="neon-icon" style={{ opacity: 0.7, marginBottom: '0.75rem' }} />
                    <h4>No Candidates Loaded for {weekInfo.label} ({weekInfo.range})</h4>
                    <p style={{ maxWidth: '500px', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                      Click <strong>"FETCH 15 CANDIDATES (N8N)"</strong> above to trigger your local N8N workflow. Articles will only appear once N8N and LM Studio have completed execution.
                    </p>
                    <button 
                      className="admin-btn-ghost" 
                      onClick={handleLoadDemoCandidates}
                      title="Load synthetic preview data with accurate dates"
                    >
                      <Sparkles size={14} /> Or Load Demo Preview Candidates ({weekInfo.label})
                    </button>
                  </div>
                )}

                {candidates.length > 0 && !isLoadingCandidates && !isSynthesizing && (
                  <div className="admin-candidate-grid">
                    {candidates.map((cand, idx) => (
                      <div key={cand.id} className="admin-candidate-card glass-panel">
                        <div className="admin-cand-header">
                          <span className="admin-cand-index">#{idx + 1}</span>
                          <span className="admin-cand-score">{cand.matchScore}% RELEVANCE</span>
                        </div>

                        <h4 className="admin-cand-title">{cand.title}</h4>
                        
                        <div className="admin-cand-meta">
                          <span>{cand.sourceName}</span>
                          <span>•</span>
                          <span>{cand.publishedDate}</span>
                        </div>

                        <p className="admin-cand-snippet">{cand.snippet}</p>

                        <div className="admin-cand-tags">
                          {cand.tags.slice(0, 3).map((t, tIdx) => (
                            <span key={tIdx} className="admin-cand-tag">#{t}</span>
                          ))}
                        </div>

                        <div className="admin-cand-actions">
                          <a 
                            href={cand.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="admin-cand-link"
                          >
                            <ExternalLink size={13} /> Source
                          </a>
                          <button 
                            className="cta-primary admin-synthesize-btn"
                            onClick={() => handleSynthesizeCandidate(cand)}
                          >
                            <Sparkles size={14} /> SYNTHESIZE ARTICLE
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* Tab 2: Industry Articles Intelligence Matrix (Scrape & Metadata Pipeline) */}
        {activeTab === 'industry' && (
          <div className="admin-pipeline-layout">
            
            {/* Top Control Bar: Week Picker & Genre Filters */}
            <div className="admin-control-panel glass-panel">
              <div className="admin-week-selector">
                <span className="admin-control-label">CALENDAR WEEK</span>
                <div className="admin-week-nav">
                  <button 
                    className="admin-btn-icon" 
                    onClick={() => setWeekOffset(prev => prev - 1)}
                    title="Previous Week"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <div className="admin-week-badge">
                    <Calendar size={15} className="neon-icon" />
                    <strong>{weekInfo.label}</strong>
                    <span className="admin-week-range">({weekInfo.range})</span>
                  </div>
                  <button 
                    className="admin-btn-icon" 
                    onClick={() => setWeekOffset(prev => prev + 1)}
                    title="Next Week"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="admin-genre-selector">
                <span className="admin-control-label">TOPIC FOCUS</span>
                <div className="admin-genre-pills">
                  {['All', 'Agentic Systems', 'AI Policy', 'Research Breakthroughs', 'Core Infrastructure'].map(genre => (
                    <button
                      key={genre}
                      className={`admin-genre-pill ${selectedGenre === genre ? 'active' : ''}`}
                      onClick={() => setSelectedGenre(genre)}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                className="cta-primary admin-fetch-btn" 
                onClick={handleFetchIndustryCandidates}
                disabled={isLoadingIndustryCandidates}
              >
                {isLoadingIndustryCandidates ? (
                  <>
                    <Activity size={16} className="spin-icon" /> DISCOVERING INDUSTRY NEWS...
                  </>
                ) : (
                  <>
                    <Globe size={16} /> FETCH 15 INDUSTRY NEWS (N8N)
                  </>
                )}
              </button>
            </div>

            {/* If Draft Studio is Active: Show Scraped Metadata Studio, else Candidate Grid */}
            {activeIndustryDraft ? (
              /* Review & Editorial Studio for Industry Article */
              <div className="admin-studio-grid">
                
                {/* Left Studio Column: Scraped Metadata & Editorial Editor */}
                <div className="admin-editor-card glass-panel">
                  <div className="admin-card-header">
                    <div className="admin-header-title-wrap">
                      <Newspaper size={18} className="neon-icon" />
                      <h3>Industry Metadata & Curation Studio</h3>
                    </div>
                    <div className="admin-draft-meta-tags">
                      <span className="admin-meta-pill">{fromN8nIndustryScrape ? 'N8N SCRAPED' : 'INDUSTRY DRAFT'}</span>
                      <span className="admin-importance-pill">{activeIndustryDraft.importance} Priority</span>
                    </div>
                  </div>

                  <div className="admin-form-body">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Headline / Title</label>
                      <input 
                        type="text" 
                        value={activeIndustryDraft.title}
                        onChange={(e) => setActiveIndustryDraft({ ...activeIndustryDraft, title: e.target.value })}
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label className="admin-form-label">Publisher / Source</label>
                        <input 
                          type="text" 
                          value={activeIndustryDraft.sourceName}
                          onChange={(e) => setActiveIndustryDraft({ ...activeIndustryDraft, sourceName: e.target.value })}
                          className="admin-input"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Original Source Link</label>
                        <div className="admin-input-wrapper">
                          <input 
                            type="text" 
                            value={activeIndustryDraft.sourceUrl}
                            onChange={(e) => setActiveIndustryDraft({ ...activeIndustryDraft, sourceUrl: e.target.value })}
                            className="admin-input code-font"
                          />
                          <a 
                            href={activeIndustryDraft.sourceUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="admin-input-icon" 
                            title="Open Link"
                          >
                            <ExternalLink size={15} />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label className="admin-form-label">Category</label>
                        <select 
                          value={activeIndustryDraft.category}
                          onChange={(e) => setActiveIndustryDraft({ ...activeIndustryDraft, category: e.target.value as any })}
                          className="admin-select"
                        >
                          <option value="AI Policy">AI Policy</option>
                          <option value="Tech Trends">Tech Trends</option>
                          <option value="Research Breakthroughs">Research Breakthroughs</option>
                          <option value="Core Infrastructure">Core Infrastructure</option>
                          <option value="Agentic Systems">Agentic Systems</option>
                        </select>
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Published Date</label>
                        <input 
                          type="text" 
                          value={activeIndustryDraft.publishedDate}
                          onChange={(e) => setActiveIndustryDraft({ ...activeIndustryDraft, publishedDate: e.target.value })}
                          className="admin-input"
                        />
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Editorial Tags (Comma separated)</label>
                      <input 
                        type="text" 
                        value={activeIndustryDraft.tags.join(', ')}
                        onChange={(e) => setActiveIndustryDraft({ 
                          ...activeIndustryDraft, 
                          tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                        })}
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Scraped Executive Summary</label>
                      <textarea 
                        rows={3}
                        value={activeIndustryDraft.customSummary}
                        onChange={(e) => setActiveIndustryDraft({ ...activeIndustryDraft, customSummary: e.target.value })}
                        className="admin-textarea"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Lycos Core Strategic Commentary</label>
                      <textarea 
                        rows={3}
                        value={activeIndustryDraft.commentary}
                        onChange={(e) => setActiveIndustryDraft({ ...activeIndustryDraft, commentary: e.target.value })}
                        className="admin-textarea"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Extracted Technical Body & Metadata (Markdown)</label>
                      <textarea 
                        rows={7}
                        value={activeIndustryDraft.content}
                        onChange={(e) => setActiveIndustryDraft({ ...activeIndustryDraft, content: e.target.value })}
                        className="admin-textarea code-font"
                      />
                    </div>

                    <div className="admin-form-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                        <label className="admin-form-label" style={{ margin: 0 }}>
                          Featured Editorial Asset (Unsplash / Scraped Candidates)
                        </label>
                        {activeIndustryDraft.imageSearchQuery && (
                          <span className="admin-input-badge" style={{ position: 'static' }}>
                            KEYWORDS: "{activeIndustryDraft.imageSearchQuery}"
                          </span>
                        )}
                      </div>

                      {/* 3-Column Unsplash / Scraped Thumbnail Selection Grid */}
                      {activeIndustryDraft.imageOptions && activeIndustryDraft.imageOptions.length > 0 ? (
                        <div className="admin-unsplash-grid">
                          {activeIndustryDraft.imageOptions.map((opt) => {
                            const isSelected = activeIndustryDraft.imageUrl === opt.url || activeIndustryDraft.selectedImageOptionId === opt.id;
                            return (
                              <div
                                key={opt.id}
                                className={`admin-unsplash-card ${isSelected ? 'selected' : ''}`}
                                onClick={() => setActiveIndustryDraft({
                                  ...activeIndustryDraft,
                                  imageUrl: opt.url,
                                  selectedImageOptionId: opt.id
                                })}
                              >
                                <div className="admin-unsplash-thumb-wrap">
                                  <img src={opt.thumb} alt={opt.alt} className="admin-unsplash-thumb" />
                                  {isSelected && (
                                    <div className="admin-unsplash-selected-badge">
                                      <CheckCircle2 size={12} /> SELECTED
                                    </div>
                                  )}
                                </div>
                                <div className="admin-unsplash-info">
                                  <span className="admin-unsplash-alt" title={opt.alt}>{opt.alt}</span>
                                  <span className="admin-unsplash-credit">
                                    Photo by {opt.photographer}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="admin-input-wrapper">
                          <input 
                            type="text" 
                            value={activeIndustryDraft.imageUrl}
                            onChange={(e) => setActiveIndustryDraft({ ...activeIndustryDraft, imageUrl: e.target.value })}
                            className="admin-input"
                            placeholder="https://images.unsplash.com/..."
                          />
                          <ImageIcon size={16} className="admin-input-icon" />
                        </div>
                      )}

                      {/* Custom Image URL Override Input */}
                      <div style={{ marginTop: '0.75rem' }}>
                        <div className="admin-input-wrapper">
                          <input 
                            type="text" 
                            value={activeIndustryDraft.imageUrl}
                            onChange={(e) => setActiveIndustryDraft({ ...activeIndustryDraft, imageUrl: e.target.value, selectedImageOptionId: undefined })}
                            className="admin-input code-font"
                            style={{ fontSize: '0.75rem', padding: '0.45rem 0.75rem' }}
                            placeholder="Selected High-Res Asset URL override..."
                          />
                          <ImageIcon size={14} className="admin-input-icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Studio Column: Live Preview & LinkedIn Social Dispatch */}
                <div className="admin-preview-col">
                  
                  {/* LinkedIn Social Post Card */}
                  <div className="admin-linkedin-card glass-panel">
                    <div className="admin-card-header">
                      <div className="admin-header-title-wrap">
                        <Share2 size={18} className="neon-icon" />
                        <h3>N8N LinkedIn Industry Post</h3>
                      </div>
                      <button 
                        className="admin-copy-btn"
                        onClick={() => copyToClipboard(`${activeIndustryDraft.linkedInPost.headline}\n\n${activeIndustryDraft.linkedInPost.body}\n\n${activeIndustryDraft.linkedInPost.hashtags.join(' ')}`)}
                        title="Copy LinkedIn Text"
                      >
                        <Copy size={14} /> Copy
                      </button>
                    </div>

                    <div className="admin-linkedin-body">
                      <div className="admin-linkedin-headline">
                        <input 
                          type="text" 
                          value={activeIndustryDraft.linkedInPost.headline}
                          onChange={(e) => setActiveIndustryDraft({
                            ...activeIndustryDraft,
                            linkedInPost: { ...activeIndustryDraft.linkedInPost, headline: e.target.value }
                          })}
                          className="admin-input"
                        />
                      </div>
                      <textarea 
                        rows={5}
                        value={activeIndustryDraft.linkedInPost.body}
                        onChange={(e) => setActiveIndustryDraft({
                          ...activeIndustryDraft,
                          linkedInPost: { ...activeIndustryDraft.linkedInPost, body: e.target.value }
                        })}
                        className="admin-textarea"
                      />
                      <div className="admin-hashtags-row">
                        {activeIndustryDraft.linkedInPost.hashtags.map((ht, idx) => (
                          <span key={idx} className="admin-hashtag-badge">{ht}</span>
                        ))}
                      </div>
                    </div>

                    <button 
                      className="cta-secondary admin-linkedin-btn"
                      onClick={handleDispatchIndustryLinkedIn}
                      disabled={isDispatchingLinkedIn}
                    >
                      {isDispatchingLinkedIn ? (
                        <>
                          <Activity size={16} className="spin-icon" /> DISPATCHING TO N8N...
                        </>
                      ) : (
                        <>
                          <Send size={16} /> DISPATCH LINKEDIN POST VIA N8N
                        </>
                      )}
                    </button>
                  </div>

                  {/* Live Website Preview Card */}
                  <div className="admin-preview-card glass-panel">
                    <div className="admin-card-header">
                      <div className="admin-header-title-wrap">
                        <FileText size={18} className="neon-icon" />
                        <h3>Live Website Article Preview</h3>
                      </div>
                      <span className="admin-live-tag">PREVIEW</span>
                    </div>

                    <div className="admin-website-mockup">
                      <div className="admin-mock-card">
                        {activeIndustryDraft.imageUrl && (
                          <div className="admin-mock-image-wrap" style={{ width: '100%', height: '140px', overflow: 'hidden', borderRadius: '6px', marginBottom: '0.85rem' }}>
                            <img src={activeIndustryDraft.imageUrl} alt={activeIndustryDraft.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        )}
                        <div className="admin-mock-badge-row">
                          <span className="admin-mock-pill">{activeIndustryDraft.category}</span>
                          <span className="admin-mock-importance">{activeIndustryDraft.importance} Priority</span>
                        </div>
                        <h4 className="admin-mock-title">{activeIndustryDraft.title}</h4>
                        <p className="admin-mock-summary">{activeIndustryDraft.customSummary}</p>
                        <div className="admin-mock-commentary">
                          <strong>Strategic Insight:</strong> {activeIndustryDraft.commentary}
                        </div>
                        <div className="admin-mock-tags">
                          {activeIndustryDraft.tags.map((t, idx) => (
                            <span key={idx} className="admin-mock-tag">#{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Master Publishing Action Bar */}
                    <div className="admin-studio-actions">
                      <button 
                        className="cta-primary admin-publish-btn"
                        onClick={handleApproveAndPublishIndustry}
                      >
                        <CheckCircle2 size={18} /> APPROVE & PUBLISH TO WEBSITE
                      </button>
                      <button 
                        className="admin-btn-ghost"
                        onClick={() => setActiveIndustryDraft(null)}
                      >
                        Back to 15 Industry News
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              /* 15 Industry Articles Candidate Matrix */
              <div className="admin-candidates-section">
                <div className="admin-section-heading-row">
                  <div>
                    <h3 className="admin-sec-title">
                      Industry Tech Intelligence Candidates ({weekInfo.label})
                    </h3>
                    <p className="admin-sec-subtitle">
                      {industryCandidates.length > 0 
                        ? 'Select any candidate below to scrape the live article URL, harvest publisher metadata, and curate for staging.' 
                        : 'Click "Fetch 15 Industry News (N8N)" above to query your local Qwen discovery agent.'}
                    </p>
                  </div>
                  {industryCandidates.length > 0 && (
                    <span className="admin-source-badge">
                      {fromN8nIndustrySearch ? 'SOURCE: N8N LIVE AGENT' : 'SOURCE: DEMO PREVIEW'}
                    </span>
                  )}
                </div>

                {isLoadingIndustryCandidates && (
                  <div className="admin-loading-card glass-panel">
                    <Activity size={36} className="spin-icon neon-icon" />
                    <h4>Executing Qwen Industry News Discovery...</h4>
                    <p>Querying local N8N webhook (<code>{n8nConfig.industrySearchWebhookUrl || 'lycos-industry-search'}</code>) for 15 curated tech news candidates.</p>
                  </div>
                )}

                {isScrapingIndustry && (
                  <div className="admin-loading-card glass-panel">
                    <Activity size={36} className="spin-icon neon-icon" />
                    <h4>Scraping Target URL & Harvesting Deep Metadata via N8N...</h4>
                    <p>Contacting (<code>{n8nConfig.industryScrapeWebhookUrl || 'lycos-industry-scrape'}</code>) to parse publish date, attribution, and imagery options.</p>
                  </div>
                )}

                {industryCandidates.length === 0 && !isLoadingIndustryCandidates && !isScrapingIndustry && (
                  <div className="admin-empty-state glass-panel">
                    <Globe size={40} className="neon-icon" style={{ opacity: 0.7, marginBottom: '0.75rem' }} />
                    <h4>No Industry Candidates Loaded for {weekInfo.label} ({weekInfo.range})</h4>
                    <p style={{ maxWidth: '500px', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                      Click <strong>"FETCH 15 INDUSTRY NEWS (N8N)"</strong> above to trigger your local Qwen workflow. Candidates will populate once N8N completes execution.
                    </p>
                    <button 
                      className="admin-btn-ghost" 
                      onClick={handleLoadDemoIndustryCandidates}
                      title="Load demo industry news with accurate dates"
                    >
                      <Globe size={14} /> Or Load Demo Industry News ({weekInfo.label})
                    </button>
                  </div>
                )}

                {industryCandidates.length > 0 && !isLoadingIndustryCandidates && !isScrapingIndustry && (
                  <div className="admin-candidate-grid">
                    {industryCandidates.map((cand, idx) => (
                      <div key={cand.id} className="admin-candidate-card glass-panel">
                        <div className="admin-cand-header">
                          <span className="admin-cand-index">#{idx + 1}</span>
                          <span className="admin-cand-score">{cand.matchScore}% RELEVANCE</span>
                        </div>

                        <h4 className="admin-cand-title">{cand.title}</h4>
                        
                        <div className="admin-cand-meta">
                          <span>{cand.sourceName}</span>
                          <span>•</span>
                          <span>{cand.publishedDate}</span>
                        </div>

                        <p className="admin-cand-snippet">{cand.snippet}</p>

                        <div className="admin-cand-tags">
                          {cand.tags.slice(0, 3).map((t, tIdx) => (
                            <span key={tIdx} className="admin-cand-tag">#{t}</span>
                          ))}
                        </div>

                        <div className="admin-cand-actions">
                          <a 
                            href={cand.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="admin-cand-link"
                          >
                            <ExternalLink size={13} /> Original
                          </a>
                          <button 
                            className="cta-primary admin-synthesize-btn"
                            onClick={() => handleScrapeIndustryCandidate(cand)}
                          >
                            <Newspaper size={14} /> SCRAPE & CURATE
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* Tab 3: Published Articles & Insights Repository */}
        {activeTab === 'published' && (
          <div className="admin-published-section">
            <div className="admin-section-heading-row">
              <div>
                <h3 className="admin-sec-title">Website Articles & Insights Repository</h3>
                <p className="admin-sec-subtitle">
                  Articles and thought leadership pieces currently live and accessible on the public Lycos Core website.
                </p>
              </div>
            </div>

            {/* Quick Filter Bar */}
            <div className="admin-repo-filter-bar">
              <button 
                className={`admin-genre-pill ${repoFilter === 'all' ? 'active' : ''}`}
                onClick={() => setRepoFilter('all')}
              >
                All Publications ({publishedList.length})
              </button>
              <button 
                className={`admin-genre-pill ${repoFilter === 'owned_insight' ? 'active' : ''}`}
                onClick={() => setRepoFilter('owned_insight')}
                style={{ borderColor: repoFilter === 'owned_insight' ? 'var(--accent, #8CFF32)' : undefined }}
              >
                <Sparkles size={13} className="neon-icon" /> Owned Industry Insights ({ownedCount})
              </button>
              <button 
                className={`admin-genre-pill ${repoFilter === 'curated_news' ? 'active' : ''}`}
                onClick={() => setRepoFilter('curated_news')}
                style={{ borderColor: repoFilter === 'curated_news' ? '#00F0FF' : undefined }}
              >
                <Globe size={13} style={{ color: '#00F0FF' }} /> Curated Tech News ({curatedCount})
              </button>
            </div>

            {filteredPublishedList.length === 0 ? (
              <div className="admin-empty-state glass-panel">
                <FileText size={40} className="neon-icon" style={{ opacity: 0.7, marginBottom: '0.75rem' }} />
                <h4>No {repoFilter === 'owned_insight' ? 'Owned Insights' : repoFilter === 'curated_news' ? 'Curated News' : 'Articles'} Found</h4>
                <p style={{ maxWidth: '500px', color: '#94a3b8', fontSize: '0.85rem' }}>
                  Publish articles from the "Article AI rewrite" or "Industry Articles" tabs above to populate this repository.
                </p>
              </div>
            ) : (
              <div className="admin-published-grid">
                {filteredPublishedList.map(art => {
                  const isOwned = isOwnedInsight(art);
                  return (
                    <div key={art.id} className="admin-published-card glass-panel">
                      <div className="admin-pub-header">
                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                          <span className="admin-mock-pill">{art.category}</span>
                          <span className="admin-mock-importance">{art.importance} Priority</span>
                        </div>
                        {isOwned ? (
                          <div className="admin-pub-corner-badge admin-badge-owned" title="Owned Industry Insight (AI Rewritten & Synthesized)">
                            <Sparkles size={11} />
                            <span>OWNED INSIGHT</span>
                          </div>
                        ) : (
                          <div className="admin-pub-corner-badge admin-badge-curated" title="Curated Tech News (External Scraped Intelligence)">
                            <Globe size={11} />
                            <span>CURATED NEWS</span>
                          </div>
                        )}
                      </div>

                      <h4 className="admin-pub-title">{art.title}</h4>
                      <div className="admin-pub-meta">
                        <span>{isOwned ? 'Byline: Lycos Core Intelligence Desk' : `Source: ${art.sourceName}`}</span>
                        <span>•</span>
                        <span>{art.publishedDate}</span>
                      </div>

                      <p className="admin-pub-summary">{art.customSummary}</p>
                      
                      <div className="admin-pub-actions">
                        <a 
                          href={isOwned ? `#/insights` : `#/articles`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="admin-cand-link"
                          style={{ color: isOwned ? 'var(--accent, #8CFF32)' : '#00F0FF' }}
                        >
                          <ExternalLink size={14} /> View on {isOwned ? 'Insights' : 'Curated News'}
                        </a>
                        <button 
                          className="admin-delete-btn"
                          onClick={() => handleDeleteArticle(art.id)}
                          title="Remove Article"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* N8N & GitHub Integration Settings Modal */}
      {showSettingsModal && (
        <div className="admin-modal-overlay" onClick={() => setShowSettingsModal(false)}>
          <div className="admin-modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div className="admin-header-title-wrap">
                <Settings size={20} className="neon-icon" />
                <h3>N8N & GitHub Deployment Settings</h3>
              </div>
              <button className="admin-modal-close" onClick={() => setShowSettingsModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="admin-modal-form">
              <div className="admin-settings-section-title">
                <Key size={15} className="neon-icon" />
                <span>GitHub Actions Direct Deployment</span>
              </div>
              <p className="admin-settings-note">
                Add your GitHub Personal Access Token (with <code>actions:write</code> / <code>repo</code> scope) to enable 1-click Push to Staging & Push to Live directly without external agents.
              </p>

              <div className="admin-form-group">
                <label className="admin-form-label">GitHub Personal Access Token (PAT)</label>
                <input 
                  type="password" 
                  value={n8nConfig.githubToken || ''}
                  onChange={(e) => setN8nConfigState({ ...n8nConfig, githubToken: e.target.value })}
                  className="admin-input code-font"
                  placeholder="github_pat_... or ghp_..."
                />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-form-label">GitHub Owner</label>
                  <input 
                    type="text" 
                    value={n8nConfig.githubOwner || 'Lycoscore-ui'}
                    onChange={(e) => setN8nConfigState({ ...n8nConfig, githubOwner: e.target.value })}
                    className="admin-input code-font"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">GitHub Repository</label>
                  <input 
                    type="text" 
                    value={n8nConfig.githubRepo || 'Lycos-Core'}
                    onChange={(e) => setN8nConfigState({ ...n8nConfig, githubRepo: e.target.value })}
                    className="admin-input code-font"
                  />
                </div>
              </div>

              <div className="admin-settings-section-title" style={{ marginTop: '1.25rem' }}>
                <Radio size={15} className="neon-icon" />
                <span>Local N8N Automation Webhooks</span>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Article Search Webhook URL (15 Candidates)</label>
                <input 
                  type="text" 
                  value={n8nConfig.searchWebhookUrl}
                  onChange={(e) => setN8nConfigState({ ...n8nConfig, searchWebhookUrl: e.target.value })}
                  className="admin-input code-font"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Article Synthesis Webhook URL (Full Generation)</label>
                <input 
                  type="text" 
                  value={n8nConfig.generateWebhookUrl}
                  onChange={(e) => setN8nConfigState({ ...n8nConfig, generateWebhookUrl: e.target.value })}
                  className="admin-input code-font"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Industry Articles Search Webhook (lycos-industry-search)</label>
                <input 
                  type="text" 
                  value={n8nConfig.industrySearchWebhookUrl || ''}
                  onChange={(e) => setN8nConfigState({ ...n8nConfig, industrySearchWebhookUrl: e.target.value })}
                  className="admin-input code-font"
                  placeholder="http://localhost:5678/webhook/lycos-industry-search"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Industry Scrape & Metadata Webhook (lycos-industry-scrape)</label>
                <input 
                  type="text" 
                  value={n8nConfig.industryScrapeWebhookUrl || ''}
                  onChange={(e) => setN8nConfigState({ ...n8nConfig, industryScrapeWebhookUrl: e.target.value })}
                  className="admin-input code-font"
                  placeholder="http://localhost:5678/webhook/lycos-industry-scrape"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">LinkedIn Social Publish Webhook URL</label>
                <input 
                  type="text" 
                  value={n8nConfig.publishLinkedInWebhookUrl}
                  onChange={(e) => setN8nConfigState({ ...n8nConfig, publishLinkedInWebhookUrl: e.target.value })}
                  className="admin-input code-font"
                  required
                />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-form-label">N8N Staging Deploy Hook</label>
                  <input 
                    type="text" 
                    value={n8nConfig.deployStagingWebhookUrl}
                    onChange={(e) => setN8nConfigState({ ...n8nConfig, deployStagingWebhookUrl: e.target.value })}
                    className="admin-input code-font"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">N8N Live Deploy Hook</label>
                  <input 
                    type="text" 
                    value={n8nConfig.deployProductionWebhookUrl}
                    onChange={(e) => setN8nConfigState({ ...n8nConfig, deployProductionWebhookUrl: e.target.value })}
                    className="admin-input code-font"
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn-ghost" onClick={() => setShowSettingsModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="cta-primary">
                  SAVE ALL SETTINGS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}