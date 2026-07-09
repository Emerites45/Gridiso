'use client';

import { Incident } from '@/src/types/site.types';

export default function IncidentFeed({ incidents }: { incidents: Incident[] }) {
  const getSeverityStyles = (severity: Incident['severity']) => {
    switch (severity) {
      case 'CRITICAL': return { border: 'border-error', text: 'text-error' };
      case 'WARN': return { border: 'border-tertiary-container', text: 'text-tertiary-container' };
      case 'INFO': return { border: 'border-secondary', text: 'text-secondary' };
      default: return { border: 'border-outline', text: 'text-outline' };
    }
  };

  const newCriticalsCount = incidents.filter(i => i.severity === 'CRITICAL').length;

  return (
    <div className="w-[380px] h-full border-l border-outline-variant flex flex-col bg-surface-container-lowest shrink-0 overflow-hidden">
      {/* Onglets supérieurs de la section latérale */}
      <div className="flex border-b border-outline-variant shrink-0">
        <button className="flex-1 py-4 text-text-label-caps font-label-caps uppercase font-bold text-primary border-b-2 border-primary bg-surface-container-low">
          Incidents
        </button>
        <button className="flex-1 py-4 text-text-label-caps font-label-caps uppercase font-bold text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors">
          Diagnostics
        </button>
      </div>

      {/* Liste déroulante des activités */}
      <div className="flex-1 overflow-y-auto p-gutter space-y-4 custom-scrollbar">
        <div className="flex justify-between items-center mb-2 px-unit">
          <h3 className="text-text-label-caps font-label-caps text-outline font-bold uppercase tracking-wider">
            LIVE ACTIVITY FEED
          </h3>
          {newCriticalsCount > 0 && (
            <span className="text-[10px] font-label-mono bg-error-container text-on-error-container px-2 py-0.5 rounded">
              {newCriticalsCount} NEW
            </span>
          )}
        </div>

        {incidents.map((incident) => {
          const styles = getSeverityStyles(incident.severity);
          return (
            <div 
              key={incident.id} 
              className={`bg-surface p-4 rounded border-l-4 ${styles.border} hover:bg-surface-container-high transition-colors group cursor-pointer`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`${styles.text} font-bold text-xs uppercase tracking-wider`}>
                  {incident.title}
                </span>
                <span className="text-text-label-mono font-label-mono text-[10px] text-outline">
                  {incident.time}
                </span>
              </div>
              <p className="text-text-body-md font-medium text-on-surface mb-1">
                {incident.siteName}
              </p>
              <p className="text-xs text-on-surface-variant line-clamp-2">
                {incident.description}
              </p>
              {incident.severity === 'CRITICAL' && (
                <div className="mt-3 flex items-center justify-end">
                  <button className="text-xs font-bold text-primary hover:underline">
                    VIEW DETAIL
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Section basse : diagnostics matériels intégrés de la maquette */}
      <div className="p-gutter border-t border-outline-variant bg-surface-container-low shrink-0">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-text-label-caps font-label-caps text-outline uppercase">CPU Load</span>
            <span className="text-text-label-mono font-label-mono text-secondary">24%</span>
          </div>
          <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="w-[24%] h-full bg-secondary"></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-text-label-caps font-label-caps text-outline uppercase">Bandwidth</span>
            <span className="text-text-label-mono font-label-mono text-primary">1.2 GB/s</span>
          </div>
          <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="w-[62%] h-full bg-primary"></div>
          </div>
        </div>
      </div>
    </div>
  );
}