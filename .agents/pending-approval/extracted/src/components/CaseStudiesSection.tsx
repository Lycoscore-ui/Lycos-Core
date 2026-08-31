/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CaseStudy } from '../types/cms';
import { mockCaseStudies } from '../data/mockCmsData';
import { Briefcase, ArrowRight, CheckCircle, Database, LayoutGrid, Clock, ChevronRight, Activity, Cpu } from 'lucide-react';

interface CaseStudiesSectionProps {
  caseStudiesList?: CaseStudy[];
}

export default function CaseStudiesSection({ caseStudiesList = mockCaseStudies }: CaseStudiesSectionProps) {
  const [activeId, setActiveId] = useState<string>(caseStudiesList[0]?.id || '');

  const activeCase = caseStudiesList.find(c => c.id === activeId) || caseStudiesList[0];

  return (
    <div id="case-studies-section" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Section Header */}
      <div style={{ marginBottom: '3rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
          Implementations & Deployments
        </span>
        <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)', marginTop: '0.25rem', marginBottom: 0 }}>
          Case <span style={{ color: 'var(--accent)' }}>Studies</span>
        </h2>
      </div>

      {caseStudiesList.length === 0 ? (
        <div style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          background: 'var(--bg-secondary)',
          border: '1px dashed var(--border-color)',
          borderRadius: '12px'
        }}>
          <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', margin: 0 }}>No case studies available.</p>
        </div>
      ) : (
        /* Bento Grid Explorer */
        <div style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          
          {/* Left Selection Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'var(--text-gray)',
              fontWeight: 600,
              paddingLeft: '0.5rem'
            }}>
              Select Case Study
            </span>

            {caseStudiesList.map((cs) => {
              const isActive = cs.id === activeId;
              const primaryMetric = cs.metrics.find(m => m.isHighlight) || cs.metrics[0];

              return (
                <button
                  key={cs.id}
                  onClick={() => setActiveId(cs.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    padding: '1.25rem',
                    backgroundColor: isActive ? 'rgba(163, 255, 51, 0.05)' : 'var(--bg-secondary)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--accent)' : 'var(--border-color)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    width: '100%',
                    boxShadow: isActive ? '0 0 15px rgba(163, 255, 51, 0.05)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{cs.industry}</span>
                    <ChevronRight size={14} style={{ color: isActive ? 'var(--accent)' : 'var(--text-gray)' }} />
                  </div>

                  <h4 style={{
                    fontSize: '0.98rem',
                    color: isActive ? 'white' : 'var(--text-gray)',
                    lineHeight: '1.3',
                    marginBottom: '0.75rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-title)'
                  }}>
                    {cs.clientName}
                  </h4>

                  {/* Tiny metric teaser */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '0.35rem',
                    backgroundColor: isActive ? 'rgba(163, 255, 51, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid',
                    borderColor: isActive ? 'rgba(163, 255, 51, 0.15)' : 'var(--border-color)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    width: '100%'
                  }}>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent)' }}>{primaryMetric.value}</span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-gray)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{primaryMetric.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Explorer View - Detailed Case Study Workspace */}
          {activeCase && (
            <div className="glass-panel" style={{
              padding: '3rem',
              border: '1px solid rgba(138, 75, 243, 0.15)',
              boxShadow: '0 8px 32px 0 rgba(138, 75, 243, 0.02)'
            }}>
              
              {/* Workspace Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '2rem',
                marginBottom: '2.5rem',
                flexWrap: 'wrap',
                gap: '1.5rem'
              }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{
                      backgroundColor: 'rgba(138, 75, 243, 0.1)',
                      color: 'var(--text-secondary)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      border: '1px solid rgba(138, 75, 243, 0.2)'
                    }}>
                      {activeCase.industry}
                    </span>
                    <span style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>•</span>
                    <span style={{ color: 'var(--text-gray)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} /> {activeCase.projectDuration}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '1.8rem',
                    color: 'white',
                    fontFamily: 'var(--font-title)',
                    lineHeight: '1.25',
                    marginBottom: '0.5rem'
                  }}>
                    {activeCase.title}
                  </h3>
                  <p style={{ color: 'var(--text-gray)', fontSize: '1rem', margin: 0 }}>
                    Client Partner: <strong style={{ color: 'white' }}>{activeCase.clientName}</strong>
                  </p>
                </div>
              </div>

              {/* Structured Metric Framework Board */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h4 style={{
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  color: 'var(--text-gray)',
                  marginBottom: '1rem',
                  fontWeight: 600
                }}>
                  Impact Metrics & Performance Yield
                </h4>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${activeCase.metrics.length}, 1fr)`,
                  gap: '1.25rem'
                }}>
                  {activeCase.metrics.map((m, idx) => (
                    <div key={idx} style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.01)',
                      border: '1px solid var(--border-color)',
                      padding: '1.25rem 1.5rem',
                      borderRadius: '8px',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1.25rem',
                        color: 'rgba(163, 255, 51, 0.15)'
                      }}>
                        {idx === 0 && <Activity size={20} />}
                        {idx !== 0 && <Cpu size={20} />}
                      </div>

                      <div style={{
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: m.isHighlight ? 'var(--accent)' : 'white',
                        fontFamily: 'var(--font-title)'
                      }}>
                        {m.value}
                      </div>

                      <div style={{
                        fontSize: '0.78rem',
                        color: 'var(--text-gray)',
                        marginTop: '0.25rem',
                        lineHeight: '1.3'
                      }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Content split: Problem-Solution-Results layout vs Tech Stack Sidebar */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 280px',
                gap: '3rem',
                alignItems: 'start'
              }}>
                
                {/* Problem, Solution, Results block layout */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  
                  {/* Problem Block */}
                  <div style={{
                    borderLeft: '2px solid var(--text-gray)',
                    paddingLeft: '1.5rem'
                  }}>
                    <h4 style={{
                      fontSize: '0.9rem',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      color: 'var(--text-gray)',
                      marginBottom: '0.75rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: 'var(--text-gray)', borderRadius: '50%' }} />
                      Operational Problem
                    </h4>
                    <p style={{
                      color: 'var(--text-gray)',
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                      margin: 0
                    }}>
                      {activeCase.problem}
                    </p>
                  </div>

                  {/* Solution Block */}
                  <div style={{
                    borderLeft: '2px solid var(--accent)',
                    paddingLeft: '1.5rem'
                  }}>
                    <h4 style={{
                      fontSize: '0.9rem',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      color: 'var(--accent)',
                      marginBottom: '0.75rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: 'var(--accent)', borderRadius: '50%' }} />
                      Strategic Solution
                    </h4>
                    <div style={{
                      color: 'var(--text-gray)',
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                    }} dangerouslySetInnerHTML={{ __html: activeCase.solution }} />
                  </div>

                  {/* Results Block */}
                  <div style={{
                    borderLeft: '2px solid var(--text-secondary)',
                    paddingLeft: '1.5rem'
                  }}>
                    <h4 style={{
                      fontSize: '0.9rem',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.75rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: 'var(--text-secondary)', borderRadius: '50%' }} />
                      Quantitative Results
                    </h4>
                    <div style={{
                      color: 'var(--text-gray)',
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                    }} dangerouslySetInnerHTML={{ __html: activeCase.results }} />
                  </div>

                </div>

                {/* Tech Stack Sidebar */}
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.01)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.5rem'
                }}>
                  <h4 style={{
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: 'white',
                    marginBottom: '1.25rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: '0.75rem'
                  }}>
                    <Database size={16} style={{ color: 'var(--accent)' }} /> Technology Stack
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {activeCase.techStack.map((tech) => (
                      <div
                        key={tech}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid var(--border-color)',
                          padding: '0.6rem 0.85rem',
                          borderRadius: '6px',
                          fontSize: '0.82rem',
                          color: 'white',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <span style={{ width: '4px', height: '4px', backgroundColor: 'var(--accent)', borderRadius: '50%' }} />
                        {tech}
                      </div>
                    ))}
                  </div>

                  <div style={{
                    fontSize: '0.72rem',
                    color: 'var(--text-gray)',
                    marginTop: '1.5rem',
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '0.75rem',
                    lineHeight: '1.4'
                  }}>
                    This technical implementation stack is locked in our server-side secure deployment environment.
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
