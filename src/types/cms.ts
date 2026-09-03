/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface Insight {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // HTML-like string or richText
  author: Author;
  category: 'AI Governance' | 'Agentic Frameworks' | 'Neural Architectures' | 'Strategic Advisory';
  readTime: number; // in minutes
  publishedDate: string;
  featuredImage: string;
  status: 'Draft' | 'Published';
  tags: string[];
}

export interface CuratedArticle {
  id: string;
  title: string;
  url: string;
  sourceName: string;
  publishedDate: string;
  category: 'AI Policy' | 'Tech Trends' | 'Research Breakthroughs' | 'Core Infrastructure' | 'AI Governance' | 'Agentic Frameworks' | 'Neural Architectures' | 'Strategic Advisory' | string;
  customSummary: string;
  commentary: string; // Our team's custom strategic insight
  curator: string;
  importance: 'Low' | 'Medium' | 'High' | 'Critical';
  tags: string[];
  imageUrl?: string;
  photographer?: string;
  contentType?: 'owned_insight' | 'curated_news'; // Owned Industry Insights vs Curated Tech News
  content?: string; // Full markdown / HTML body for Owned Industry Insights
}

export interface CaseStudyMetric {
  value: string; // e.g. "92%", "R3.2M", "10x"
  label: string; // e.g. "Resolution rate", "Annual savings"
  isHighlight?: boolean;
}

export interface CaseStudy {
  id: string;
  clientName: string;
  title: string;
  slug: string;
  industry: string;
  metrics: CaseStudyMetric[];
  problem: string;
  solution: string;
  results: string;
  techStack: string[];
  projectDuration: string;
  featured: boolean;
  heroImage: string;
}
