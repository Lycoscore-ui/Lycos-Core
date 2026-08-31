import React from 'react';

interface NavigationHUDProps {
  currentSection: number;
  totalSections?: number;
  onSectionClick: (index: number) => void;
}

const SECTION_LABELS = [
  'SYSTEM INITIATION',
  'CORE PROTOCOLS',
  'MISSION DOSSIER',
  'YIELD METRICS',
  'GLOBAL ENGAGEMENT'
];

export const NavigationHUD: React.FC<NavigationHUDProps> = ({
  currentSection,
  totalSections = 5,
  onSectionClick,
}) => {
  return (
    <div className="nav-hud-container">
      <div className="nav-hud-track">
        {/* Status Indicator */}
        <div className="nav-hud-status">
          <span className="nav-hud-dot" />
          <span className="nav-hud-label">
            0{currentSection + 1} / 0{totalSections} // {SECTION_LABELS[currentSection] || 'SYSTEM RUN'}
          </span>
        </div>

        {/* Section Pills */}
        <div className="nav-hud-pills">
          {Array.from({ length: totalSections }).map((_, idx) => {
            const isActive = idx === currentSection;
            return (
              <button
                key={idx}
                className={`nav-hud-pill ${isActive ? 'active' : ''}`}
                onClick={() => onSectionClick(idx)}
                title={`Jump to Section 0${idx + 1}: ${SECTION_LABELS[idx]}`}
              >
                <span className="nav-hud-pill-inner" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavigationHUD;
