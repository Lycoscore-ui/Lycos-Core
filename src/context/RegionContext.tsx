import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CountryInfo {
  name: string;
  code: string;
  currency: string;
  symbol: string;
  locale: string;
}

export interface ContinentInfo {
  name: string;
  countries: CountryInfo[];
}

export const CONTINENTS_DATA: ContinentInfo[] = [
  {
    name: 'North America',
    countries: [
      { name: 'United States', code: 'US', currency: 'USD', symbol: '$', locale: 'en-US' },
      { name: 'Canada', code: 'CA', currency: 'CAD', symbol: 'CA$', locale: 'en-CA' },
      { name: 'Mexico', code: 'MX', currency: 'MXN', symbol: 'Mex$', locale: 'es-MX' },
    ],
  },
  {
    name: 'Europe',
    countries: [
      { name: 'United Kingdom', code: 'GB', currency: 'GBP', symbol: '£', locale: 'en-GB' },
      { name: 'Germany', code: 'DE', currency: 'EUR', symbol: '€', locale: 'de-DE' },
      { name: 'France', code: 'FR', currency: 'EUR', symbol: '€', locale: 'fr-FR' },
      { name: 'Netherlands', code: 'NL', currency: 'EUR', symbol: '€', locale: 'nl-NL' },
      { name: 'Switzerland', code: 'CH', currency: 'CHF', symbol: 'CHF', locale: 'de-CH' },
      { name: 'Ireland', code: 'IE', currency: 'EUR', symbol: '€', locale: 'en-IE' },
      { name: 'Sweden', code: 'SE', currency: 'SEK', symbol: 'kr', locale: 'sv-SE' },
    ],
  },
  {
    name: 'Africa',
    countries: [
      { name: 'South Africa', code: 'ZA', currency: 'ZAR', symbol: 'R', locale: 'en-ZA' },
      { name: 'Namibia', code: 'NA', currency: 'NAD', symbol: 'N$', locale: 'en-NA' },
      { name: 'Nigeria', code: 'NG', currency: 'NGN', symbol: '₦', locale: 'en-NG' },
      { name: 'Kenya', code: 'KE', currency: 'KES', symbol: 'KSh', locale: 'en-KE' },
    ],
  },
  {
    name: 'Asia-Pacific and Oceania',
    countries: [
      { name: 'Australia', code: 'AU', currency: 'AUD', symbol: 'A$', locale: 'en-AU' },
      { name: 'New Zealand', code: 'NZ', currency: 'NZD', symbol: 'NZ$', locale: 'en-NZ' },
      { name: 'Singapore', code: 'SG', currency: 'SGD', symbol: 'S$', locale: 'en-SG' },
      { name: 'Japan', code: 'JP', currency: 'JPY', symbol: '¥', locale: 'ja-JP' },
      { name: 'United Arab Emirates', code: 'AE', currency: 'AED', symbol: 'AED', locale: 'ar-AE' },
      { name: 'India', code: 'IN', currency: 'INR', symbol: '₹', locale: 'en-IN' },
    ],
  },
  {
    name: 'South America',
    countries: [
      { name: 'Brazil', code: 'BR', currency: 'BRL', symbol: 'R$', locale: 'pt-BR' },
      { name: 'Argentina', code: 'AR', currency: 'ARS', symbol: '$', locale: 'es-AR' },
    ],
  },
];

const FALLBACK_RATES: Record<string, number> = {
  USD: 1.0,
  CAD: 1.36,
  MXN: 18.2,
  GBP: 0.79,
  EUR: 0.92,
  CHF: 0.90,
  SEK: 10.45,
  ZAR: 18.25,
  NAD: 18.25,
  NGN: 1540.0,
  KES: 129.5,
  AUD: 1.53,
  NZD: 1.65,
  SGD: 1.35,
  JPY: 154.5,
  AED: 3.67,
  INR: 83.5,
  BRL: 5.45,
  ARS: 950.0,
};

const STORAGE_KEY = 'lycos_region_attestation';
const RATES_STORAGE_KEY = 'lycos_daily_fx_rates';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

interface RegionContextType {
  continent: string;
  country: CountryInfo;
  fxRates: Record<string, number>;
  isAttestationOpen: boolean;
  setRegion: (continentName: string, countryName: string) => void;
  confirmAttestation: (continentName: string, countryName: string) => void;
  openAttestation: () => void;
  formatCurrency: (amountInUSD: number) => string;
  convertFromUSD: (amountInUSD: number) => number;
}

const defaultCountry = CONTINENTS_DATA[0].countries[0];

const RegionContext = createContext<RegionContextType>({
  continent: 'North America',
  country: defaultCountry,
  fxRates: FALLBACK_RATES,
  isAttestationOpen: false,
  setRegion: () => {},
  confirmAttestation: () => {},
  openAttestation: () => {},
  formatCurrency: (val: number) => `$${Math.round(val).toLocaleString()}`,
  convertFromUSD: (val: number) => val,
});

export const RegionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [continent, setContinentState] = useState<string>('North America');
  const [country, setCountryState] = useState<CountryInfo>(defaultCountry);
  const [fxRates, setFxRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [isAttestationOpen, setIsAttestationOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchDailyRates = async () => {
      try {
        const cachedRates = localStorage.getItem(RATES_STORAGE_KEY);
        if (cachedRates) {
          const parsed = JSON.parse(cachedRates);
          if (parsed.timestamp && Date.now() - parsed.timestamp < ONE_DAY_MS && parsed.rates) {
            setFxRates(parsed.rates);
            return;
          }
        }

        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        if (res.ok) {
          const data = await res.json();
          if (data && data.rates) {
            const merged = { ...FALLBACK_RATES, ...data.rates };
            setFxRates(merged);
            localStorage.setItem(
              RATES_STORAGE_KEY,
              JSON.stringify({ timestamp: Date.now(), rates: merged })
            );
          }
        }
      } catch (err) {
        console.warn('Using fallback exchange rates:', err);
      }
    };

    fetchDailyRates();
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const isValid = parsed.timestamp && Date.now() - parsed.timestamp < THIRTY_DAYS_MS;
        if (isValid && parsed.continent && parsed.countryName) {
          const matchedContinent = CONTINENTS_DATA.find((c) => c.name === parsed.continent);
          const matchedCountry = matchedContinent?.countries.find((cnt) => cnt.name === parsed.countryName);
          if (matchedContinent && matchedCountry) {
            setContinentState(matchedContinent.name);
            setCountryState(matchedCountry);
            setIsAttestationOpen(false);
            return;
          }
        }
      }
    } catch (e) {
      console.warn('Error reading attestation storage:', e);
    }
    setIsAttestationOpen(true);
  }, []);

  const setRegion = (continentName: string, countryName: string) => {
    const matchedContinent = CONTINENTS_DATA.find((c) => c.name === continentName);
    const matchedCountry = matchedContinent?.countries.find((cnt) => cnt.name === countryName);
    if (matchedContinent && matchedCountry) {
      setContinentState(matchedContinent.name);
      setCountryState(matchedCountry);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          continent: matchedContinent.name,
          countryName: matchedCountry.name,
          timestamp: Date.now(),
        })
      );
    }
  };

  const confirmAttestation = (continentName: string, countryName: string) => {
    setRegion(continentName, countryName);
    setIsAttestationOpen(false);
  };

  const openAttestation = () => {
    setIsAttestationOpen(true);
  };

  const convertFromUSD = (amountInUSD: number): number => {
    const rate = fxRates[country.currency] || FALLBACK_RATES[country.currency] || 1.0;
    return amountInUSD * rate;
  };

  const formatCurrency = (amountInUSD: number): string => {
    const converted = convertFromUSD(amountInUSD);
    try {
      return new Intl.NumberFormat(country.locale, {
        style: 'currency',
        currency: country.currency,
        maximumFractionDigits: 0,
      }).format(converted);
    } catch {
      return `${country.symbol}${Math.round(converted).toLocaleString()}`;
    }
  };

  return (
    <RegionContext.Provider
      value={{
        continent,
        country,
        fxRates,
        isAttestationOpen,
        setRegion,
        confirmAttestation,
        openAttestation,
        formatCurrency,
        convertFromUSD,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => useContext(RegionContext);
