import React from 'react';
import { CONTINENTS_DATA, useRegion } from '../context/RegionContext';
import { Globe } from 'lucide-react';

interface RegionSelectorProps {
  variant?: 'footer' | 'contact';
}

export const RegionSelector: React.FC<RegionSelectorProps> = ({ variant = 'footer' }) => {
  const { continent, country, setRegion } = useRegion();

  const currentContinentObj = CONTINENTS_DATA.find((c) => c.name === continent) || CONTINENTS_DATA[0];
  const countriesInContinent = currentContinentObj.countries;

  const handleContinentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCont = e.target.value;
    const newContObj = CONTINENTS_DATA.find((c) => c.name === newCont);
    if (newContObj && newContObj.countries.length > 0) {
      setRegion(newCont, newContObj.countries[0].name);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(continent, e.target.value);
  };

  return (
    <div className={`region-selector-container ${variant === 'contact' ? 'region-selector-contact' : 'region-selector-footer'}`}>
      <div className="region-selector-header">
        <Globe size={15} className="neon-icon" />
        <span className="region-selector-title">Region and Currency:</span>
      </div>
      <div className="region-selector-controls">
        <select
          value={continent}
          onChange={handleContinentChange}
          className="region-selector-select"
          title="Select Continent"
        >
          {CONTINENTS_DATA.map((c) => (
            <option key={c.name} value={c.name} className="attestation-option">
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={country.name}
          onChange={handleCountryChange}
          className="region-selector-select"
          title="Select Country"
        >
          {countriesInContinent.map((cnt) => (
            <option key={cnt.name} value={cnt.name} className="attestation-option">
              {cnt.name} ({cnt.currency} - {cnt.symbol})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RegionSelector;
