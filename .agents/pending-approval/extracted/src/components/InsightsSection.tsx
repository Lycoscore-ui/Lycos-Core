/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Insight } from '../types/cms';
import { mockInsights } from '../data/mockCmsData';
import NewsletterCTA from './NewsletterCTA';
import { Search, Filter, BookOpen, Clock, ArrowRight, X, Sparkles, User } from 'lucide-react';

interface InsightsSectionProps {
  insightsList?: Insight[];
}

export default function InsightsSection({ insightsList = mockInsights }: InsightsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeInsight, setActiveInsight] = useState<Insight | null>(null);

  const categories = useMemo(() => {
    return ['All', 'AI Governance', 'Agentic Frameworks', 'Neural Architectures', 'Strategic Advisory'];
  }, []);

  const filteredInsights = useMemo(() => {
    return insightsList.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory && item.status === 'Published';
    });
  }, [insightsList, searchTerm, selectedCategory]);

  const featuredInsight = useMemo(() => {
    // Return first element in filtered or overall list that is published
    return filteredInsights[0] || null;
  }, [filteredInsights]);

  const secondaryInsights = useMemo(() => {
    return filteredInsights.slice(1);
  }, [filteredInsights]);

  return (
    <div id="insights-section" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Filters and Header Bar */}
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
            Lycos Intelligence
          </span>
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)', marginTop: '0.25rem', marginBottom: 0 }}>
            Owned <span style={{ color: 'var(--accent)' }}>Insights</span>
          </h2>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '280px' }}>
            <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }}>
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search research, tags..."
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

      {/* Category Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        marginBottom: '3rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        borderBottom: '1px solid var(--border-color)'
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: selectedCategory === cat ? 'var(--accent)' : 'var(--border-color)',
              backgroundColor: selectedCategory === cat ? 'rgba(163, 255, 51, 0.08)' : 'rgba(255, 255, 255, 0.01)',
              color: selectedCategory === cat ? 'var(--accent)' : 'var(--text-gray)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontWeight: selectedCategory === cat ? 600 : 400,
              transition: 'all 0.3s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredInsights.length === 0 ? (
        <div style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          background: 'var(--bg-secondary)',
          border: '1px dashed var(--border-color)',
          borderRadius: '12px'
        }}>
          <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', margin: 0 }}>No matching thought leadership insights found.</p>
        </div>
      ) : (
        /* Editorial Grid Layout */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {/* Main Featured Editorial Card */}
          {featuredInsight && (
            <div className="glass-panel" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              padding: '3rem',
              alignItems: 'center',
              border: '1px solid rgba(138, 75, 243, 0.15)',
              position: 'relative'
            }}>
              {/* Image banner */}
              <div style={{
                width: '100%',
                height: '340px',
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }}>
                <img
                  src={featuredInsight.featuredImage}
                  alt={featuredInsight.title}
                  referrerPolicy="no-referrer"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--accent)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '20px',
                  color: 'var(--accent)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  <Sparkles size={12} /> FEATURED INSIGHT
                </div>
              </div>

              {/* Text info */}
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem', color: 'var(--text-gray)', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{featuredInsight.category}</span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={12} /> {featuredInsight.readTime} min read</span>
                    <span>•</span>
                    <span>{featuredInsight.publishedDate}</span>
                  </div>

                  <h3 style={{
                    fontSize: '2rem',
                    lineHeight: '1.25',
                    marginBottom: '1.25rem',
                    color: 'white',
                    fontFamily: 'var(--font-title)'
                  }}>
                    {featuredInsight.title}
                  </h3>

                  <p style={{ color: 'var(--text-gray)', lineHeight: '1.6', fontSize: '0.98rem', marginBottom: '2rem' }}>
                    {featuredInsight.summary}
                  </p>
                </div>

                <div>
                  {/* Author block preview */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--border-color)',
                    marginBottom: '2rem'
                  }}>
                    <img
                      src={featuredInsight.author.avatar}
                      alt={featuredInsight.author.name}
                      referrerPolicy="no-referrer"
                      style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--accent)' }}
                    />
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'white', margin: 0 }}>{featuredInsight.author.name}</h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-gray)', margin: 0 }}>{featuredInsight.author.role}</p>
                    </div>
                  </div>

                  <button className="btn-solid" onClick={() => setActiveInsight(featuredInsight)}>
                    Read Full Blueprint <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Editorial Grid */}
          {secondaryInsights.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem'
            }}>
              {secondaryInsights.map((item) => (
                <div key={item.id} className="glass-panel" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '2.25rem',
                  height: '100%',
                  border: '1px solid rgba(255,255,255,0.03)'
                }}>
                  <div>
                    {/* Header meta */}
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.25rem', color: 'var(--text-gray)', fontSize: '0.78rem' }}>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{item.category}</span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={12} /> {item.readTime} min read</span>
                    </div>

                    <h4 style={{
                      fontSize: '1.35rem',
                      lineHeight: '1.3',
                      marginBottom: '1rem',
                      color: 'white',
                      fontFamily: 'var(--font-title)',
                    }}>
                      {item.title}
                    </h4>

                    <p style={{ color: 'var(--text-gray)', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '2rem' }}>
                      {item.summary}
                    </p>
                  </div>

                  <div>
                    {/* Author sub-block */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      paddingTop: '1.25rem',
                      borderTop: '1px solid var(--border-color)',
                      marginBottom: '1.5rem'
                    }}>
                      <img
                        src={item.author.avatar}
                        alt={item.author.name}
                        referrerPolicy="no-referrer"
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(163,255,51,0.5)' }}
                      />
                      <div>
                        <h5 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white', margin: 0 }}>{item.author.name}</h5>
                        <p style={{ fontSize: '0.72rem', color: 'var(--text-gray)', margin: 0 }}>{item.author.role}</p>
                      </div>
                    </div>

                    <button className="btn-link" onClick={() => setActiveInsight(item)} style={{ fontSize: '0.9rem' }}>
                      Access advisory <ArrowRight size={14} />
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

      {/* Deep-Read Article Modal Detail View */}
      {activeInsight && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(5, 13, 26, 0.92)',
          backdropFilter: 'blur(12px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          overflowY: 'auto',
          padding: '4rem 1.5rem'
        }}>
          <div className="glass-panel" style={{
            width: '100%',
            maxWidth: '850px',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid rgba(163, 255, 51, 0.15)',
            padding: '3.5rem',
            borderRadius: '16px',
            position: 'relative',
            height: 'fit-content'
          }}>
            {/* Close Button */}
            <button
              onClick={() => setActiveInsight(null)}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(163, 255, 51, 0.15)';
                e.currentTarget.style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              <X size={18} />
            </button>

            {/* Modal Header Meta */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--text-gray)', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{activeInsight.category}</span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {activeInsight.readTime} min read</span>
              <span>•</span>
              <span>Published: {activeInsight.publishedDate}</span>
            </div>

            <h1 style={{
              fontSize: '2.5rem',
              lineHeight: '1.2',
              color: 'white',
              fontFamily: 'var(--font-title)',
              marginBottom: '2rem'
            }}>
              {activeInsight.title}
            </h1>

            {/* Author Block Profile */}
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center',
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              marginBottom: '2.5rem'
            }}>
              <img
                src={activeInsight.author.avatar}
                alt={activeInsight.author.name}
                referrerPolicy="no-referrer"
                style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--accent)' }}
              />
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'white', margin: '0 0 0.25rem 0' }}>
                  {activeInsight.author.name}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent)', margin: '0 0 0.5rem 0', fontWeight: 500 }}>
                  {activeInsight.author.role}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', margin: 0, lineHeight: '1.4' }}>
                  {activeInsight.author.bio}
                </p>
              </div>
            </div>

            {/* Content rendering */}
            <div className="markdown-body" style={{
              color: 'var(--text-gray)',
              lineHeight: '1.75',
              fontSize: '1.05rem',
            }} dangerouslySetInnerHTML={{ __html: activeInsight.content }} />

            {/* Tags footer */}
            <div style={{
              marginTop: '3.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginRight: '0.5rem' }}>Core Vectors:</span>
              {activeInsight.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: '0.75rem',
                  color: 'white',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-color)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '4px'
                }}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* Bottom action to close */}
            <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-outline" onClick={() => setActiveInsight(null)}>
                Close Advisory
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
