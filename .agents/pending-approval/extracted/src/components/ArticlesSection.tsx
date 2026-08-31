/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { CuratedArticle } from '../types/cms';
import { mockArticles } from '../data/mockCmsData';
import { Search, ExternalLink, Calendar, MessageSquareQuote, ShieldAlert, Newspaper, Tag, AlertTriangle } from 'lucide-react';

interface ArticlesSectionProps {
  articlesList?: CuratedArticle[];
}

export default function ArticlesSection({ articlesList = mockArticles }: ArticlesSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImportance, setSelectedImportance] = useState<string>('All');

  const filteredArticles = useMemo(() => {
    return articlesList.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.customSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.sourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesImportance = selectedImportance === 'All' || item.importance === selectedImportance;
      return matchesSearch && matchesImportance;
    });
  }, [articlesList, searchTerm, selectedImportance]);

  // Alert Badge styling resolver
  const getAlertStyle = (importance: string) => {
    switch (importance) {
      case 'Critical':
        return {
          bg: 'rgba(239, 68, 68, 0.15)',
          border: 'rgba(239, 68, 68, 0.3)',
          text: '#ef4444',
          glow: '0 0 10px rgba(239, 68, 68, 0.15)'
        };
      case 'High':
        return {
          bg: 'rgba(249, 115, 22, 0.15)',
          border: 'rgba(249, 115, 22, 0.3)',
          text: '#f97316',
          glow: '0 0 8px rgba(249, 115, 22, 0.1)'
        };
      case 'Medium':
        return {
          bg: 'rgba(163, 255, 51, 0.1)',
          border: 'rgba(163, 255, 51, 0.25)',
          text: 'var(--accent)',
          glow: 'none'
        };
      default:
        return {
          bg: 'rgba(255, 255, 255, 0.03)',
          border: 'var(--border-color)',
          text: 'var(--text-gray)',
          glow: 'none'
        };
    }
  };

  return (
    <div id="articles-section" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Header and Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '2rem',
        marginBottom: '2.5rem',
        flexWrap: 'wrap'
      }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
            Curated Intelligence
          </span>
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)', marginTop: '0.25rem', marginBottom: 0 }}>
            Market <span style={{ color: 'var(--accent)' }}>Advisories</span>
          </h2>
        </div>

        {/* Inputs */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Importance Filter */}
          <select
            value={selectedImportance}
            onChange={(e) => setSelectedImportance(e.target.value)}
            style={{
              padding: '0.6rem 1rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'white',
              borderRadius: '8px',
              fontSize: '0.88rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Risk Alerts</option>
            <option value="Critical">Critical Advisory</option>
            <option value="High">High Alert</option>
            <option value="Medium">Medium Alert</option>
            <option value="Low">Low Alert</option>
          </select>

          {/* Search bar */}
          <div style={{ position: 'relative', width: '250px' }}>
            <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }}>
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Filter headlines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 1rem 0.6rem 2.5rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'white',
                borderRadius: '8px',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <div style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          background: 'var(--bg-secondary)',
          border: '1px dashed var(--border-color)',
          borderRadius: '12px'
        }}>
          <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', margin: 0 }}>No curated advisories matched your filter criteria.</p>
        </div>
      ) : (
        /* Card stream */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {filteredArticles.map((item) => {
            const alertStyle = getAlertStyle(item.importance);
            return (
              <div
                key={item.id}
                className="glass-panel"
                style={{
                  padding: '2.5rem',
                  border: `1px solid ${alertStyle.border}`,
                  boxShadow: alertStyle.glow,
                  position: 'relative'
                }}
              >
                {/* Header indicators */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  {/* Left: Source and category */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      border: '1px solid var(--border-color)',
                      padding: '0.3rem 0.85rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}>
                      <Newspaper size={12} style={{ color: 'var(--accent)' }} /> {item.sourceName}
                    </span>
                    <span style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>•</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>
                      {item.category}
                    </span>
                    <span style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>•</span>
                    <span style={{ color: 'var(--text-gray)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={12} /> {item.publishedDate}
                    </span>
                  </div>

                  {/* Right: Importance badge */}
                  <span style={{
                    backgroundColor: alertStyle.bg,
                    border: `1px solid ${alertStyle.border}`,
                    color: alertStyle.text,
                    padding: '0.3rem 0.85rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}>
                    <AlertTriangle size={12} /> {item.importance} ALERT
                  </span>
                </div>

                {/* Article Headline */}
                <h3 style={{
                  fontSize: '1.7rem',
                  lineHeight: '1.3',
                  marginBottom: '1.25rem',
                  color: 'white',
                  fontFamily: 'var(--font-title)'
                }}>
                  {item.title}
                </h3>

                {/* Dense Layout Columns: Summary & Commentary */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1.1fr 0.9fr',
                  gap: '2.5rem',
                  alignItems: 'start',
                  marginTop: '1.5rem'
                }}>
                  {/* Left Column: Custom Summary */}
                  <div>
                    <h4 style={{
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      color: 'var(--text-gray)',
                      marginBottom: '0.75rem',
                      fontWeight: 600
                    }}>
                      Market Event Summary
                    </h4>
                    <p style={{
                      color: 'var(--text-gray)',
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                      margin: 0
                    }}>
                      {item.customSummary}
                    </p>

                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {item.tags.map(t => (
                        <span key={t} style={{
                          fontSize: '0.72rem',
                          color: 'var(--text-gray)',
                          backgroundColor: 'rgba(255,255,255,0.02)',
                          border: '1px solid var(--border-color)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px'
                        }}>
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Strategic Commentary Block */}
                  <div style={{
                    backgroundColor: 'rgba(138, 75, 243, 0.04)',
                    border: '1px solid rgba(138, 75, 243, 0.15)',
                    borderRadius: '12px',
                    padding: '1.5rem 1.75rem',
                    position: 'relative'
                  }}>
                    {/* Tiny watermark watermark style icon */}
                    <span style={{
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1.25rem',
                      color: 'rgba(138, 75, 243, 0.15)',
                      pointerEvents: 'none'
                    }}>
                      <MessageSquareQuote size={40} />
                    </span>

                    <h4 style={{
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.85rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      Lycos Strategic Advisory Commentary
                    </h4>

                    <div
                      style={{
                        color: 'var(--text-gray)',
                        fontSize: '0.9rem',
                        lineHeight: '1.5',
                      }}
                      dangerouslySetInnerHTML={{ __html: item.commentary }}
                    />

                    <div style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-gray)',
                      marginTop: '1.25rem',
                      borderTop: '1px solid rgba(138, 75, 243, 0.15)',
                      paddingTop: '0.75rem',
                      textAlign: 'right',
                      fontStyle: 'italic'
                    }}>
                      Reviewed by {item.curator}
                    </div>
                  </div>
                </div>

                {/* Footer anchor */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '2rem',
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '1.25rem'
                }}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-link"
                    style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    Read original curation source <ExternalLink size={14} />
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
