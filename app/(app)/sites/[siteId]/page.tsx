/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ siteId: string }>;
}

export default function SiteDetailPage({ params }: PageProps) {
  // 1. Déballer proprement la Promise des paramètres avec React.use()
  const unwrappedParams = React.use(params);
  const siteId = unwrappedParams.siteId;

  // 2. Simulation des variations de tensions temps réel de l'ESP32
  const [voltage, setVoltage] = useState(228.4);
  const [frequency, setFrequency] = useState(50.02);

  useEffect(() => {
    const interval = setInterval(() => {
      setVoltage((prev) => prev + (Math.random() - 0.5) * 0.2);
      setFrequency((prev) => prev + (Math.random() - 0.5) * 0.02);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Transformation propre de l'ID pour l'affichage (ex: akwa-3 -> AKWA-3)
  const displayId = siteId ? siteId.toUpperCase() : 'STATION';

  return (
    <div className="p-container-padding space-y-gutter overflow-y-auto h-full custom-scrollbar">
      
      {/* Page Header avec bouton de retour */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg gap-gutter">
        <div>
          <Link href="/sites" className="flex items-center gap-1 text-primary text-label-caps font-label-caps mb-2 hover:underline">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Retour aux assets
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-label-caps font-label-caps text-on-surface-variant">SOCADEL INFRASTRUCTURE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          </div>
          <h1 className="text-display font-display text-on-surface">{displayId} Detail</h1>
          <p className="text-on-surface-variant mt-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            Douala Area Node (ID Système: {siteId})
          </p>
        </div>
        
        <div className="flex items-center gap-stack-md">
          <button className="bg-surface-container-high text-on-surface px-gutter py-2 rounded-lg text-body-md font-medium hover:bg-surface-variant transition-colors flex items-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">file_download</span>
            Rapport Journalier
          </button>
          <button className="bg-primary text-on-primary px-gutter py-2 rounded-lg text-body-md font-medium hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 duration-100 cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">bolt</span>
            Contrôles Breaker
          </button>
        </div>
      </div>

      {/* Grid du Dashboard principal */}
      <div className="grid grid-cols-12 gap-gutter">
        
        {/* Section Gauges et Télémétrie */}
        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter">
          
          {/* Tension */}
          <div className="bg-surface-container-low p-container-padding rounded-xl flex flex-col items-center justify-between min-h-[220px]">
            <p className="text-label-caps font-label-caps self-start mb-4">SYSTEM VOLTAGE</p>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full gauge-ring" viewBox="0 0 100 100">
                <circle className="text-outline-variant" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeWidth="2"></circle>
                <circle className="text-primary" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeDasharray="283" strokeDashoffset="65" strokeLinecap="round" strokeWidth="2.5"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-headline-lg font-headline-lg">{voltage.toFixed(1)}</span>
                <span className="text-label-caps font-label-caps text-on-surface-variant">VOLTS</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-secondary mt-4">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span className="text-label-mono font-label-mono">+0.2%</span>
            </div>
          </div>

          {/* Fréquence */}
          <div className="bg-surface-container-low p-container-padding rounded-xl flex flex-col items-center justify-between min-h-[220px]">
            <p className="text-label-caps font-label-caps self-start mb-4">GRID FREQUENCY</p>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full gauge-ring" viewBox="0 0 100 100">
                <circle className="text-outline-variant" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeWidth="2"></circle>
                <circle className="text-secondary-fixed-dim" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeDasharray="283" strokeDashoffset="15" strokeLinecap="round" strokeWidth="2.5"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-headline-lg font-headline-lg">{frequency.toFixed(2)}</span>
                <span className="text-label-caps font-label-caps text-on-surface-variant">HZ</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-secondary mt-4">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span className="text-label-mono font-label-mono">STABLE</span>
            </div>
          </div>

          {/* Facteur de Puissance */}
          <div className="bg-surface-container-low p-container-padding rounded-xl flex flex-col items-center justify-between min-h-[220px]">
            <p className="text-label-caps font-label-caps self-start mb-4">POWER FACTOR</p>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full gauge-ring" viewBox="0 0 100 100">
                <circle className="text-outline-variant" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeWidth="2"></circle>
                <circle className="text-tertiary" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeDasharray="283" strokeDashoffset="25" strokeLinecap="round" strokeWidth="2.5"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-headline-lg font-headline-lg">0.96</span>
                <span className="text-label-caps font-label-caps text-on-surface-variant">COS φ</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-tertiary mt-4">
              <span className="material-symbols-outlined text-[16px]">warning</span>
              <span className="text-label-mono font-label-mono">LOW LAG</span>
            </div>
          </div>

          {/* THD */}
          <div className="bg-surface-container-low p-container-padding rounded-xl flex flex-col items-center justify-between min-h-[220px]">
            <p className="text-label-caps font-label-caps self-start mb-4">TOTAL HARMONIC DIST.</p>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full gauge-ring" viewBox="0 0 100 100">
                <circle className="text-outline-variant" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeWidth="2"></circle>
                <circle className="text-primary-container" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeDasharray="283" strokeDashoffset="240" strokeLinecap="round" strokeWidth="2.5"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-headline-lg font-headline-lg">3.2</span>
                <span className="text-label-caps font-label-caps text-on-surface-variant">%</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-secondary mt-4">
              <span className="material-symbols-outlined text-[16px]">info</span>
              <span className="text-label-mono font-label-mono">NOMINAL</span>
            </div>
          </div>

          {/* Statut du Node Métier */}
          <div className="col-span-1 md:col-span-4 bg-surface-container rounded-xl p-container-padding border border-outline-variant overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-headline-md font-headline-md text-on-surface">ESP32 Telemetry Node</h3>
                <p className="text-body-md text-on-surface-variant">Statut matériel de l&apos;unité distante</p>
              </div>
              <div className="px-3 py-1 bg-secondary-container bg-opacity-20 text-secondary border border-secondary border-opacity-30 rounded-full text-label-mono font-label-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                ONLINE
              </div>
            </div>
            <div className="grid grid-cols-3 gap-stack-lg">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center mb-2 text-primary">
                  <span className="material-symbols-outlined">wifi</span>
                </div>
                <p className="text-label-caps font-label-caps text-on-surface-variant">-64 dBm</p>
                <p className="text-body-sm font-medium">Rssi</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center mb-2 text-secondary-fixed-dim">
                  <span className="material-symbols-outlined">thermometer</span>
                </div>
                <p className="text-label-caps font-label-caps text-on-surface-variant">MCU Temp</p>
                <p className="text-body-sm font-medium">42°C</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center mb-2 text-tertiary">
                  <span className="material-symbols-outlined">memory</span>
                </div>
                <p className="text-label-caps font-label-caps text-on-surface-variant">Memory</p>
                <p className="text-body-sm font-medium">158KB Free</p>
              </div>
            </div>
          </div>

          {/* Courbe de charge simplifiée */}
          <div className="col-span-1 md:col-span-4 bg-surface-container-low rounded-xl p-container-padding border border-outline-variant">
            <p className="text-label-caps font-label-caps mb-4">HISTORIQUE DE CHARGE (Profil 24h)</p>
            <div className="h-40 w-full flex items-end gap-1.5 pt-4">
              {[40, 55, 70, 65, 80, 95, 85, 60, 45, 30, 50, 55].map((height, idx) => (
                <div 
                  key={idx} 
                  style={{ height: `${height}%` }}
                  className="w-full rounded-t-sm bg-surface-container-highest hover:bg-primary transition-colors"
                ></div>
              ))}
            </div>
          </div>

        </div>

        {/* Colonne latérale historique */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container rounded-xl border border-outline-variant p-container-padding flex flex-col justify-between">
          <div>
            <h3 className="text-headline-md font-headline-md mb-4">Fil d&apos;incidents locaux</h3>
            <div className="space-y-4 border-l border-outline-variant pl-4 ml-2">
              <div>
                <p className="text-body-md font-bold text-on-surface">Micro-coupure détectée</p>
                <p className="text-label-mono font-label-mono text-on-surface-variant text-[12px]">Rétablissement automatique en 450ms</p>
              </div>
              <div>
                <p className="text-body-md font-bold text-on-surface">Redémarrage à chaud</p>
                <p className="text-label-mono font-label-mono text-on-surface-variant text-[12px]">Node ESP32 synchronisé</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 py-2 text-label-caps font-label-caps text-on-surface-variant border border-dashed border-outline-variant rounded-lg">
            ARCHIVES LOGS COMPLETES
          </button>
        </div>

      </div>
    </div>
  );
}