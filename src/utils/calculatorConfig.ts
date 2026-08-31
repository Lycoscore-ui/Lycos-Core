export interface ConfigParameter {
  Parameter_Key: string;
  Label: string;
  Default_Value: number | string;
  Unit: string;
  Data_Type: 'Integer' | 'Float' | 'String';
  Description: string;
}

export const LIVE_SHEET_URLS = {
  Vector: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSTL8L4aRz-HMprZX7qyzcZyuZZzfUUKlzyNl3vvtFeIQCwVX5-Yj5IUOev0Udb1LbwRQ4KSnonizxv/pub?output=csv',
  Vanguard: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQf3bXOHEbaVYkX7SxO9L9kNbNVXnx1jP_CQHgxZfm0QDtOVhLE3G7ThcJfd7srjSwrMJ0jubeXZLMs/pub?output=csv',
  Synapse: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRwjq9LXnAHxZdJ6rZpqiGm57Tk7tGf76vEayfmVzWBqSLzknyW6gIYiS4OZYot7z7CCjrAG2MOv6EX/pub?output=csv',
  Aegis: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTH9q9hnK7LcJt7bHohjJk5UhQHtfpMVnkgdNZrz4aQjfFTks1DGyBo1JQktUBvvGDd2OL8y2csRiot/pub?output=csv',
  Sentinel: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRhMAtev7cGakweCR2bYKeDW3BJE-k0H4r_tYO-bK25Vl4bHL2PlAH6CrlDL-h8atdeIbUczjxMYAK7/pub?output=csv'
};

export function parseCsvConfig(csvText: string): Record<string, ConfigParameter> {
  const lines = csvText.trim().split('\n');
  const result: Record<string, ConfigParameter> = {};

  if (lines.length <= 1) return result;

  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Parse CSV line handling potential quotes
    const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(p => p.replace(/^"|"$/g, '').trim());
    if (parts.length < 3) continue;

    const [key, label, rawVal, unit, dataType, description] = parts;
    let numVal: number | string = rawVal;
    if (dataType === 'Integer') {
      numVal = parseInt(rawVal, 10);
      if (isNaN(numVal as number)) numVal = rawVal;
    } else if (dataType === 'Float') {
      numVal = parseFloat(rawVal);
      if (isNaN(numVal as number)) numVal = rawVal;
    }

    result[key] = {
      Parameter_Key: key,
      Label: label || key,
      Default_Value: numVal,
      Unit: unit || '',
      Data_Type: (dataType as any) || 'String',
      Description: description || ''
    };
  }

  return result;
}

export async function fetchCalculatorConfig(calculatorName: keyof typeof LIVE_SHEET_URLS): Promise<Record<string, ConfigParameter> | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500);

  try {
    const response = await fetch(LIVE_SHEET_URLS[calculatorName], { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const csvText = await response.text();
    return parseCsvConfig(csvText);
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn(`[CalculatorConfig] Failed to fetch live Google Sheet config for ${calculatorName}:`, err);
    return null;
  }
}
