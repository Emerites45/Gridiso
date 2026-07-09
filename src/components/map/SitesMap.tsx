'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Site } from '@/src/types/site.types';

interface SitesMapProps {
  sites: Site[];
  onSiteSelect: (site: Site) => void;
}

// Composant interne pour forcer Leaflet à recalculer sa géométrie et confiner les contrôles
function ResizeMap() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

// Générateur d'icônes Leaflet externalisé du composant pour de meilleures performances
const getCustomIcon = (status: Site['status']) => {
  const color = status === 'CRITICAL' ? '#ffb4ab' : status === 'WARN' ? '#f9ce48' : '#4ae176';
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid #0b1326; box-shadow: 0 0 10px ${color};"></div>`,
    className: '',
    iconSize: [14, 14],
    iconAnchor: [7, 7] // Centre l'icône précisément sur les coordonnées géographiques
  });
};

export default function SitesMap({ sites, onSiteSelect }: SitesMapProps) {
  const CAMEROON_CENTER: [number, number] = [4.7, 12.3547];

  return (
    // Les classes h-full w-full permettent maintenant de s'aligner sur le wrapper absolu parent
    <div className="h-full w-full bg-surface-container-lowest">
      <MapContainer 
        center={CAMEROON_CENTER} 
        zoom={6} 
        className="h-full w-full z-0" // Empêche Leaflet de passer devant les overlays React
        style={{ background: '#060e20' }}
        zoomControl={true}
      >
        {/* Force le recalcule dimensionnel et recalibre la zone de zoom */}
        <ResizeMap />
        
        <TileLayer 
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" 
          attribution='&copy; CARTO'
        />
        
        {sites.map((site) => (
          <Marker 
            key={site.id} 
            position={[site.lat, site.lng]} 
            icon={getCustomIcon(site.status)}
            eventHandlers={{ 
              click: () => onSiteSelect(site) 
            }}
          >
            {/* Le Popup natif reste accessible si besoin, sinon l'overlay réactif de la page prend le relais */}
            <Popup>
              <div className="text-slate-900 font-sans text-xs">
                <strong className="text-sm block mb-1">{site.name}</strong>
                <span className="block">Status: {site.status}</span>
                <span className="block">Load: {site.activeLoad} MW</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}