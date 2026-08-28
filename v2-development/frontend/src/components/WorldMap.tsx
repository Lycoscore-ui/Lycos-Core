import React, { useEffect, useState } from 'react';

interface City {
  name: string;
  x: number; // percentage left
  y: number; // percentage top
}

const CITIES: City[] = [
  { name: 'Amsterdam', x: 48.51, y: 42.87 },
  { name: 'Windhoek', x: 50.80, y: 80.20 },
  { name: 'Johannesburg', x: 54.26, y: 82.28 },
  { name: 'Cape Town', x: 52.18, y: 85.74 },
  { name: 'Auckland', x: 97.13, y: 88.59 }
];

export const WorldMap: React.FC = () => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/world.svg')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch world map SVG');
        }
        return res.text();
      })
      .then((text) => {
        // Strip any xml declaration or doctype if present
        const cleanSvg = text.replace(/<\?xml[^>]*\?>/gi, '').replace(/<!DOCTYPE[^>]*>/gi, '');
        setSvgContent(cleanSvg);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="world-map-root">
      <div className="world-map-viewport">
        {loading ? (
          <div className="world-map-viewport-inner">Loading map data...</div>
        ) : (
          <div className="world-map-container-wrapper">
            {/* Inline SVG Map */}
            <div 
              className="world-map-svg-container" 
              dangerouslySetInnerHTML={{ __html: svgContent }} 
            />
            
            {/* Glowing Pulsating City Markers */}
            {CITIES.map((city) => {
              const markerStyle = {
                left: `${city.x}%`,
                top: `${city.y}%`
              };
              return (
                <div
                  key={city.name}
                  className="city-marker-container"
                  style={markerStyle}
                >
                  <div className="city-marker-pulse" />
                  <div className="city-marker-dot" />
                  <div className="city-marker-tooltip">{city.name}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorldMap;
