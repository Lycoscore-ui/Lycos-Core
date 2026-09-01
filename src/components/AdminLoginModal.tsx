import React, { useState, useEffect } from 'react';
import { Lock, Shield, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';
import { hasMasterPasswordSet, setMasterPassword, verifyAdminPassword, saveAdminSession } from '../services/adminStorage';

interface AdminLoginModalProps {
  onLoginSuccess: () => void;
}

export default function AdminLoginModal({ onLoginSuccess }: AdminLoginModalProps) {
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [username, setUsername] = useState('Lycoscoreadmin');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setIsFirstTime(!hasMasterPasswordSet());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (username.trim() !== 'Lycoscoreadmin') {
      setError('Invalid operator handle. Use authorized handle: Lycoscoreadmin');
      return;
    }

    if (isFirstTime) {
      if (password.length < 6) {
        setError('Master password must be at least 6 characters in length.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Master passwords do not match. Please verify.');
        return;
      }

      setMasterPassword(password);
      saveAdminSession();
      setSuccessMsg('Master credentials registered successfully! Initializing workspace...');
      setTimeout(() => {
        onLoginSuccess();
      }, 900);
    } else {
      if (verifyAdminPassword(password)) {
        saveAdminSession();
        setSuccessMsg('Authentication confirmed. Accessing administrative matrix...');
        setTimeout(() => {
          onLoginSuccess();
        }, 600);
      } else {
        setError('Access denied. Invalid master authorization key.');
      }
    }
  };

  return (
    <div className="admin-login-overlay">
      <div className="admin-login-card glass-panel">
        <div className="admin-login-header">
          <div className="admin-badge-icon">
            <Shield size={28} className="neon-icon" />
          </div>
          <div>
            <span className="admin-login-eyebrow">// APEX SECURE GATEWAY</span>
            <h2 className="admin-login-title">Lycos Core Operator Portal</h2>
            <p className="admin-login-subtitle">
              {isFirstTime 
                ? 'First-Time Setup: Configure master authorization credentials for Lycoscoreadmin.'
                : 'Enter your master authorization credentials to access the editorial & N8N workspace.'}
            </p>
          </div>
        </div>

        {error && (
          <div className="admin-alert admin-alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="admin-alert admin-alert-success">
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="admin-form-group">
            <label className="admin-form-label">Operator Handle</label>
            <div className="admin-input-wrapper">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="admin-input"
                placeholder="Lycoscoreadmin"
                readOnly
              />
              <span className="admin-input-badge">L-9 LEVEL</span>
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">
              {isFirstTime ? 'Set Master Password' : 'Master Password'}
            </label>
            <div className="admin-input-wrapper">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                placeholder={isFirstTime ? 'Choose master authorization password' : 'Enter master password'}
                autoFocus
                required
              />
              <KeyRound size={16} className="admin-input-icon" />
            </div>
          </div>

          {isFirstTime && (
            <div className="admin-form-group">
              <label className="admin-form-label">Confirm Master Password</label>
              <div className="admin-input-wrapper">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="admin-input"
                  placeholder="Re-enter to confirm master password"
                  required
                />
                <Lock size={16} className="admin-input-icon" />
              </div>
            </div>
          )}

          <button type="submit" className="cta-primary admin-submit-btn">
            {isFirstTime ? 'INITIALIZE MASTER CREDENTIALS' : 'AUTHENTICATE & ENTER PORTAL'}
          </button>
        </form>

        <div className="admin-login-footer">
          <span className="admin-dot-active" /> Zero-Trust Internal Security // Node: admin.lycoscore.com
        </div>
      </div>
    </div>
  );
}