'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import KpiCard from '@/src/components/dashboard/KpiCard';
import IncidentFeed from '@/src/components/dashboard/IncidentFeed';
import { KpiData, Site, Incident } from '@/src/types/site.types';

const SitesMap = dynamic(() => import('@/src/components/map/SitesMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-surface-container-low animate-pulse rounded-xl flex items-center justify-center text-outline">
      Loading Map Engine...
    </div>
  )
});

// Mock complet basé sur les 4 colonnes de la maquette HTML
const MOCK_KPIS: KpiData[] = [
  { title: 'Active Load', value: '428.5', unit: 'MW', icon: 'bolt', trend: '-2.4%', trendIcon: 'trending_down', statusColor: 'text-primary' },
  { title: 'Grid Efficiency', value: '98.2', unit: '%', icon: 'auto_graph', trend: 'OPTIMAL', trendIcon: 'check_circle', statusColor: 'text-secondary' },
  { title: 'Incident Level', value: '03', unit: 'ACT', icon: 'warning', trend: 'P2 CRITICAL', trendIcon: 'priority_high', statusColor: 'text-error' },
  { title: 'Storage Reserve', value: '84.0', unit: 'GWh', icon: 'battery_charging_full', trend: '+15% CHG', trendIcon: 'expand_less', statusColor: 'text-primary-container' },
];

const MOCK_SITES: Site[] = [
  { id: '1', name: 'Yaoundé Central', lat: 3.848, lng: 11.5021, status: 'NOMINAL', activeLoad: 120.5 },
  { id: '2', name: 'Douala Port', lat: 4.0511, lng: 9.7679, status: 'CRITICAL', activeLoad: 210.0 },
];

const MOCK_INCIDENTS: Incident[] = [
  { id: 'i1', title: 'Voltage Drop', siteName: 'Douala Port', time: '12:44:02', description: 'Secondary transformer coil failure detected. Load diverted to backup circuit BRAVO-2.', severity: 'CRITICAL' },
  { id: 'i2', title: 'Sync Complete', siteName: 'Yaoundé Central', time: '12:38:15', description: 'Phase synchronization completed for Solar Array cluster 4-D. Injecting 12MW to local grid.', severity: 'INFO' },
  { id: 'i3', title: 'Maintenance', siteName: 'Garoua Station', time: '12:15:00', description: 'Scheduled sensor calibration ongoing. Data fidelity currently reduced to 85%.', severity: 'WARN' },
];

export default function DashboardPage() {
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  return (
    // h-screen et overflow-hidden globaux pour empêcher tout défilement de la page entière
    <div className="flex-1 flex h-screen overflow-hidden bg-background">
      
      {/* Conteneur de gauche : KPIs + Zone Carte (min-h-0 est CRUCIAL ici) */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        
        {/* Grille des KPIs */}
        <div className="p-container-padding grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter shrink-0 z-10">
          {MOCK_KPIS.map((kpi, idx) => (
            <KpiCard key={idx} data={kpi} />
          ))}
        </div>

        {/* Section parent de la carte (h-0 et flex-1 la forcent à occuper l'espace restant exact) */}
        <div className="flex-1 h-0 mx-container-padding mb-container-padding relative rounded-xl overflow-hidden border border-outline-variant/20 bg-surface-container-lowest">
          
          {/* Wrapper Leaflet absolu pour épouser à 100% les dimensions du parent sans le pousser */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <SitesMap sites={MOCK_SITES} onSiteSelect={(site) => setSelectedSite(site)} />
          </div>
          
          {/* Overlay dégradé */}
          <div className="absolute inset-0 map-gradient-overlay pointer-events-none z-[400]" />

          {/* Popup Overlay */}
          {selectedSite && (
            <div className="absolute top-6 left-6 bg-surface-container-high/90 backdrop-blur border border-outline-variant p-4 rounded-lg shadow-2xl z-[500] min-w-[240px]">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-white text-text-body-lg">{selectedSite.name}</h3>
                <button onClick={() => setSelectedSite(null)} className="text-outline hover:text-white text-sm">✕</button>
              </div>
              <div className="space-y-1 font-label-mono text-xs">
                <p className="text-on-surface-variant">
                  Statut : <span className={selectedSite.status === 'CRITICAL' ? 'text-error' : 'text-secondary'}>{selectedSite.status}</span>
                </p>
                <p className="text-on-surface-variant">Charge : <span className="text-primary">{selectedSite.activeLoad} MW</span></p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Conteneur de droite : Flux d'incidents */}
      <IncidentFeed incidents={MOCK_INCIDENTS} />

    </div>
  );
}