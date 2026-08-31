import React, { useState, useEffect } from 'react';
import { CONTINENTS_DATA, useRegion } from '../context/RegionContext';
import { Globe, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AttestationModal: React.FC = () => {
  const { isAttestationOpen, continent, country, confirmAttestation } = useRegion();

  const [selectedContinent, setSelectedContinent] = useState<string>(continent || 'North America');
  const [selectedCountry, setSelectedCountry] = useState<string>(country?.name || 'United States');

  useEffect(() => {
    if (continent) setSelectedContinent(continent);
    if (country?.name) setSelectedCountry(country.name);
  }, [continent, country]);

  if (!isAttestationOpen) return null;

  const currentContinentObj = CONTINENTS_DATA.find((c) => c.name === selectedContinent) || CONTINENTS_DATA[0];
  const countriesInContinent = currentContinentObj.countries;

  const handleContinentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCont = e.target.value;
    setSelectedContinent(newCont);
    const newContObj = CONTINENTS_DATA.find((c) => c.name === newCont);
    if (newContObj && newContObj.countries.length > 0) {
      setSelectedCountry(newContObj.countries[0].name);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confirmAttestation(selectedContinent, selectedCountry);
  };

  const activeCountryObj = countriesInContinent.find((c) => c.name === selectedCountry) || countriesInContinent[0];

  return (
    <div className="attestation-modal-backdrop">
      <div className="baseline-card attestation-modal-card">
        <div className="attestation-header">
          <div className="eyebrow-tagline-green">// REGIONAL ATTESTATION</div>
          <h2 className="attestation-title">
            Operational Jurisdiction<span className="brand-dot">.</span>
          </h2>
          <p className="attestation-desc">
            Select your territory to calibrate telemetry, regulatory frameworks, and monetary denomination across all simulators.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="attestation-form">
          <div className="attestation-fields-grid">
            <div className="attestation-field-group">
              <label className="attestation-label">Continent</label>
              <div className="attestation-select-wrap">
                <select
                  value={selectedContinent}
                  onChange={handleContinentChange}
                  className="attestation-select"
                >
                  {CONTINENTS_DATA.map((c) => (
                    <option key={c.name} value={c.name} className="attestation-option">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="attestation-field-group">
              <label className="attestation-label">Country and Currency</label>
              <div className="attestation-select-wrap">
                <select
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="attestation-select"
                >
                  {countriesInContinent.map((cnt) => (
                    <option key={cnt.name} value={cnt.name} className="attestation-option">
                      {cnt.name} ({cnt.currency} - {cnt.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="attestation-currency-badge-row">
            <div className="attestation-currency-badge">
              <Globe size={16} className="neon-icon" />
              <span>Currency System: <strong>{activeCountryObj.currency} ({activeCountryObj.symbol})</strong></span>
            </div>
            <div className="attestation-currency-badge">
              <ShieldCheck size={16} className="neon-icon" />
              <span>Daily Rate Telemetry Active</span>
            </div>
          </div>

          <div className="attestation-disclaimer-box">
            <div className="attestation-disclaimer-header">
              <CheckCircle2 size={14} className="neon-icon" />
              <span>Illustrative Model Disclaimer</span>
            </div>
            <p className="attestation-disclaimer-text">
              The financial figures, metrics, and ROI projections displayed on this platform are provided strictly for illustrative and modeling purposes only.
            </p>
          </div>

          <button type="submit" className="cta-primary attestation-submit-btn">
            CONFIRM AND ENTER SYSTEM
          </button>
        </form>
      </div>
    </div>
  );
};

export default AttestationModal;
