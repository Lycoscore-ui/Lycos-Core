/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AdminUser {
  username: string;
  isLoggedIn: boolean;
  lastLogin: string;
}

export interface CandidateArticle {
  id: string;
  title: string;
  sourceName: string;
  url: string;
  publishedDate: string;
  snippet: string;
  category: 'AI Policy' | 'Tech Trends' | 'Research Breakthroughs' | 'Core Infrastructure' | 'Agentic Systems';
  matchScore: number; // e.g. 98%
  tags: string[];
}

export interface UnsplashImageOption {
  id: string;
  url: string; // High-resolution regular size URL
  thumb: string; // Thumbnail URL for grid selection
  alt: string;
  photographer: string;
  photographerUrl?: string;
  downloadLocation?: string;
}

export interface GeneratedArticleDraft {
  id: string;
  candidateId?: string;
  title: string;
  sourceName: string;
  sourceUrl: string;
  publishedDate: string;
  category: 'AI Policy' | 'Tech Trends' | 'Research Breakthroughs' | 'Core Infrastructure' | 'Agentic Systems' | 'AI Governance' | 'Agentic Frameworks' | 'Neural Architectures' | 'Strategic Advisory' | string;
  importance: 'Low' | 'Medium' | 'High' | 'Critical';
  tags: string[];
  customSummary: string;
  commentary: string;
  content: string; // Full body
  imageUrl: string;
  imagePrompt?: string;
  imageSearchQuery?: string;
  imageOptions?: UnsplashImageOption[];
  selectedImageOptionId?: string;
  curator: string;
  contentType?: 'owned_insight' | 'curated_news';
  linkedInPost: {
    headline: string;
    body: string;
    hashtags: string[];
    status: 'draft' | 'dispatched' | 'failed';
  };
  status: 'draft' | 'approved' | 'published';
}

export interface N8nWebhookConfig {
  searchWebhookUrl: string;
  generateWebhookUrl: string;
  industrySearchWebhookUrl: string;
  industryScrapeWebhookUrl: string;
  publishLinkedInWebhookUrl: string;
  deployStagingWebhookUrl: string;
  deployProductionWebhookUrl: string;
  apiKey?: string;
  githubOwner?: string;
  githubRepo?: string;
  githubToken?: string;
}

export interface DeploymentResult {
  success: boolean;
  target: 'staging' | 'production';
  message: string;
  actionsUrl?: string;
}