'use client';

import React from 'react';
import Link from 'next/link';

// Données fictives simulant tes stations électriques au Cameroun
const SITES_DATA = [
  { id: 'akwa-3', name: 'Akwa-III Station', zone: 'Douala Sector G, Zone 4', status: 'Operational', load: '84.2 kW' },
  { id: 'bonaberi-1', name: 'Bonaberi Multi-Grid', zone: 'Douala Sector B, Zone 2', status: 'Operational', load: '120.5 kW' },
  { id: 'bassa-2', name: 'Bassa Industrial Node', zone: 'Douala Sector C, Zone 1', status: 'Maintenance', load: '0.0 kW' },
];

export default function SitesPage() {
  return (
    <div className="p-container-padding space-y-gutter overflow-y-auto h-full custom-scrollbar">
      {/* En-tête de la page */}
      <div className="mb-stack-lg">
        <span className="text-label-caps font-label-caps text-on-surface-variant">SOCADEL INFRASTRUCTURE</span>
        <h1 className="text-display font-display text-on-surface mt-1">Electrical Assets</h1>
        <p className="text-on-surface-variant text-body-md">Sélectionnez une station pour voir sa télémétrie en temps réel (ESP32 Nodes).</p>
      </div>

      {/* Grille des cartes de sites */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
        {SITES_DATA.map((site) => (
          <div 
            key={site.id} 
            className="bg-surface-container-low rounded-xl p-container-padding border border-outline-variant hover:border-primary transition-all flex flex-col justify-between min-h-[180px]"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-headline-md font-headline-md text-on-surface">{site.name}</h3>
                <span className={`px-2 py-0.5 rounded text-[11px] font-label-mono ${
                  site.status === 'Operational' ? 'bg-secondary-container text-secondary' : 'bg-tertiary-container text-tertiary'
                }`}>
                  {site.status.toUpperCase()}
                </span>
              </div>
              <p className="text-on-surface-variant text-body-md flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                {site.zone}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-outline-variant flex justify-between items-center">
              <div>
                <p className="text-label-caps font-label-caps text-on-surface-variant text-[10px]">CURRENT LOAD</p>
                <p className="text-body-md font-bold text-white">{site.load}</p>
              </div>
              
              {/* LIEN DYNAMIQUE : C'est ici que la magie opère pour envoyer le siteId dans l'URL */}
              <Link 
                href={`/sites/${site.id}`}
                className="bg-primary text-on-primary px-4 py-2 rounded-lg text-label-caps font-label-caps hover:opacity-90 transition-all flex items-center gap-1 text-[11px]"
              >
                Inspecter
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}