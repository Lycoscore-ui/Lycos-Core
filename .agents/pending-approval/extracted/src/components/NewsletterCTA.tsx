/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, CheckCircle, ShieldAlert } from 'lucide-react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API request to backend/CMS
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1500);
  };

  return (
    <div id="newsletter-cta" className="glass-panel" style={{
      border: '1px solid rgba(163, 255, 51, 0.15)',
      boxShadow: '0 8px 32px 0 rgba(163, 255, 51, 0.03)',
      overflow: 'hidden',
      position: 'relative',
      padding: '3rem 2.5rem',
      marginTop: '4rem',
    }}>
      {/* Decorative accent glow */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        right: '-150px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(163, 255, 51, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '3rem',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <div>
          <span style={{
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: 'var(--accent)',
            fontWeight: 700,
            display: 'block',
            marginBottom: '0.75rem',
          }}>
            Strategic Intelligence Dispatch
          </span>
          <h3 style={{
            fontSize: '1.8rem',
            marginBottom: '1rem',
            color: 'white',
            fontFamily: 'var(--font-title)',
          }}>
            Subscribe to our original research and advisories
          </h3>
          <p style={{
            color: 'var(--text-gray)',
            lineHeight: '1.6',
            fontSize: '0.95rem',
            margin: 0,
          }}>
            Get deep-dive operational blueprints, regulatory risk audits, and AI architecture analysis delivered directly to your inbox bi-weekly. Zero fluff, pure engineering and strategy.
          </p>
        </div>

        <div>
          {subscribed ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              color: 'var(--accent)',
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: 'rgba(163, 255, 51, 0.05)',
              border: '1px dashed var(--accent)',
              borderRadius: '8px',
            }}>
              <CheckCircle size={36} />
              <div>
                <h4 style={{ color: 'white', fontSize: '1.1rem', margin: '0 0 0.25rem 0' }}>Subscription Activated</h4>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.8rem', margin: 0 }}>You have been added to the elite intelligence feed.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-gray)',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem 0.85rem 3rem',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    color: 'white',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>

              <button
                type="submit"
                className="btn-solid"
                disabled={loading}
                style={{
                  justifyContent: 'center',
                  width: '100%',
                  padding: '0.85rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? 'Securing Connection...' : 'Request Dispatch Access'}
              </button>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                color: 'var(--text-gray)',
                marginTop: '0.25rem',
              }}>
                <ShieldAlert size={12} style={{ color: 'var(--accent)' }} /> 
                Your corporate email is protected by strict encryption protocols.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
