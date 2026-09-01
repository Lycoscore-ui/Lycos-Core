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
  Edit3, 
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
  Key
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
  const [activeTab, setActiveTab] = useState<'pipeline' | 'published' | 'settings'>('pipeline');
  
  // Week & Filter State
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  
  // Pipeline Data States
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(false);
  const [candidates, setCandidates] = useState<CandidateArticle[]>([]);
  const [fromN8nSearch, setFromN8nSearch] = useState(false);
  
  // Synthesis & Review State
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [activeDraft, setActiveDraft] = useState<GeneratedArticleDraft | null>(null);
  const [fromN8nSynthesis, setFromN8nSynthesis] = useState(false);

  // Deployment States
  const [isDeployingStaging, setIsDeployingStaging] = useState(false);
  const [isDeployingProd, setIsDeployingProd] = useState(false);
  const [lastActionsUrl, setLastActionsUrl] = useState<string | null>(null);
  
  // Action notifications
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [isDispatchingLinkedIn, setIsDispatchingLinkedIn] = useState(false);

  // Published articles
  const [publishedList, setPublishedList] = useState<CuratedArticle[]>([]);

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

  // 1. Fetch Weekly Candidates (Real N8N Execution with no premature mocking)
  const handleFetchCandidates = async () => {
    setIsLoadingCandidates(true);
    setActionSuccess(null);
    setActionError(null);
    setCandidates([]); // Clear previous candidates while N8N executes!
    setActiveDraft(null);

    const res = await fetchCandidatesFromN8n(weekInfo, selectedGenre, n8nConfig);
    setIsLoadingCandidates(false);

    if (res.fromN8n && res.candidates.length > 0) {
      setCandidates(res.candidates);
      setFromN8nSearch(true);
      setActionSuccess(`✓ Fetched ${res.candidates.length} articles live from N8N search pipeline for ${weekInfo.label} (${weekInfo.range})!`);
    } else {
      setCandidates([]);
      setFromN8nSearch(false);
      setActionError(res.error || 'N8N did not return any candidate articles. Check N8N workflow execution.');
    }
  };

  // Explicit Fallback Demo Generator (only when operator wants to test UI offline)
  const handleLoadDemoCandidates = () => {
    const demo = generateMockCandidates(weekInfo.label, selectedGenre, weekInfo.startDate);
    setCandidates(demo);
    setFromN8nSearch(false);
    setActionSuccess(`Loaded 15 demo candidate articles with accurate dates for ${weekInfo.label} (${weekInfo.range}).`);
  };

  // 2. Synthesize Candidate into Full Article
  const handleSynthesizeCandidate = async (candidate: CandidateArticle) => {
    setIsSynthesizing(true);
    setActionSuccess(null);
    setActionError(null);

    const res = await synthesizeArticleWithN8n(candidate, n8nConfig);
    setIsSynthesizing(false);

    if (res.fromN8n && res.draft) {
      setActiveDraft(res.draft);
      setFromN8nSynthesis(true);
      setActionSuccess(`✓ Draft synthesized live by N8N for "${candidate.title}"`);
    } else {
      setActionError(res.error || 'N8N synthesis failed. Please inspect your N8N workflow execution.');
    }
  };

  // 3. Publish Draft to Live Website
  const handleApproveAndPublish = () => {
    if (!activeDraft) return;

    publishArticleToSite(activeDraft);
    loadPublishedList();
    setActionSuccess(`Article "${activeDraft.title}" successfully published to the live website!`);
    
    // Switch to published tab or update draft status
    setActiveDraft(prev => prev ? { ...prev, status: 'published' } : null);
  };

  // 4. Dispatch LinkedIn Post via N8N
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
              className={`admin-tab-btn ${activeTab === 'pipeline' ? 'active' : ''}`}
              onClick={() => setActiveTab('pipeline')}
            >
              <Sparkles size={16} /> Article Pipeline (N8N)
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
        {activeTab === 'pipeline' && (
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
                      <Edit3 size={18} className="neon-icon" />
                      <h3>Synthesized Technical Advisory</h3>
                    </div>
                    <div className="admin-draft-meta-tags">
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
                      <label className="admin-form-label">Generated Featured Image URL</label>
                      <div className="admin-input-wrapper">
                        <input 
                          type="text" 
                          value={activeDraft.imageUrl}
                          onChange={(e) => setActiveDraft({ ...activeDraft, imageUrl: e.target.value })}
                          className="admin-input"
                        />
                        <ImageIcon size={16} className="admin-input-icon" />
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
                        <CheckCircle2 size={18} /> APPROVE & PUBLISH TO WEBSITE
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
                      {candidates.length > 0 ? `15 Curated Intelligence Candidates (${weekInfo.label})` : 'Weekly Candidate Discovery Matrix'}
                    </h3>
                    <p className="admin-sec-subtitle">
                      {candidates.length > 0 
                        ? 'Select any candidate below to trigger N8N automated article synthesis and draft creation.' 
                        : 'Click "Fetch 15 Candidates (N8N)" above to query your local N8N webhooks.'}
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

        {/* Tab 2: Published Articles Repository */}
        {activeTab === 'published' && (
          <div className="admin-published-section">
            <div className="admin-section-heading-row">
              <div>
                <h3 className="admin-sec-title">Live Website Articles Repository</h3>
                <p className="admin-sec-subtitle">
                  Articles currently active and accessible on the public Lycos Core website.
                </p>
              </div>
            </div>

            <div className="admin-published-grid">
              {publishedList.map(art => (
                <div key={art.id} className="admin-published-card glass-panel">
                  <div className="admin-pub-header">
                    <span className="admin-mock-pill">{art.category}</span>
                    <span className="admin-mock-importance">{art.importance} Priority</span>
                  </div>

                  <h4 className="admin-pub-title">{art.title}</h4>
                  <div className="admin-pub-meta">
                    <span>Source: {art.sourceName}</span>
                    <span>•</span>
                    <span>{art.publishedDate}</span>
                  </div>

                  <p className="admin-pub-summary">{art.customSummary}</p>
                  
                  <div className="admin-pub-actions">
                    <a 
                      href={`#/articles`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="admin-cand-link"
                    >
                      <ExternalLink size={14} /> View on Site
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
              ))}
            </div>
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