"use client";

import React, { useState } from "react";

// Données types pour l'affichage des performances par départ
const INITIAL_ROWS = [
  { id: "FD-204-NORD", district: "District A", saidi: 84.2, saifi: 0.65, caidi: 129.5, status: "OPTIMAL", statusColor: "bg-secondary/10 text-secondary" },
  { id: "FD-412-METRO", district: "Centre Urbain", saidi: 212.5, saifi: 1.42, caidi: 149.6, status: "ALERTE", statusColor: "bg-error-container/20 text-error" },
  { id: "FD-009-RURAL", district: "Bassin Est", saidi: 45.8, saifi: 0.22, caidi: 208.1, status: "OPTIMAL", statusColor: "bg-secondary/10 text-secondary" },
  { id: "FD-711-COTE", district: "Jetée Sud", saidi: 132.1, saifi: 0.98, caidi: 134.8, status: "STABLE", statusColor: "bg-primary-container/20 text-primary" },
  { id: "FD-104-INDUS", district: "Zone Ouest", saidi: 89.4, saifi: 0.71, caidi: 125.9, status: "OPTIMAL", statusColor: "bg-secondary/10 text-secondary" },
];

export default function ReportsPage() {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  return (
    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-surface text-on-surface">
      
      {/* Barre de Filtres Techniques & Actions d'Export */}
      <section className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          {["PÉRIODE: 2024-T3", "RÉGION: DISTRICT NORD", "SOURCE DE DONNÉES: SCADA-LIVE"].map((filter, idx) => (
            <div 
              key={idx} 
              className="flex items-center bg-surface-container px-3 py-2 rounded gap-2 border border-outline-variant/30 text-[11px] font-bold tracking-wider text-on-surface-variant cursor-pointer hover:bg-surface-container-high transition-colors"
            >
              <span>{filter}</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant text-[11px] font-bold tracking-wider text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-all duration-200">
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            EXPORTER EN PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant text-[11px] font-bold tracking-wider text-on-surface-variant hover:bg-surface-container-high hover:text-secondary transition-all duration-200">
            <span className="material-symbols-outlined text-[18px]">csv</span>
            TÉLÉCHARGER CSV
          </button>
        </div>
      </section>

      {/* Synthèse des Indicateurs Clés (KPIs Métriques) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
        <div className="md:col-span-3 bg-surface-container-low border border-outline-variant/20 p-6 rounded-lg relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary transition-all group-hover:w-2"></div>
          <p className="text-[11px] font-bold tracking-wider text-on-surface-variant mb-1">SAIDI GLOBAL</p>
          <h2 className="text-4xl font-semibold text-primary">112.4</h2>
          <p className="text-xs text-secondary-fixed-dim mt-2 flex items-center gap-1 font-mono">
            <span className="material-symbols-outlined text-[14px]">trending_down</span> -4.2% PAR RAPPORT AU T2
          </p>
        </div>

        <div className="md:col-span-3 bg-surface-container-low border border-outline-variant/20 p-6 rounded-lg relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-secondary transition-all group-hover:w-2"></div>
          <p className="text-[11px] font-bold tracking-wider text-on-surface-variant mb-1">SAIFI GLOBAL</p>
          <h2 className="text-4xl font-semibold text-secondary">0.92</h2>
          <p className="text-xs text-secondary-fixed-dim mt-2 flex items-center gap-1 font-mono">
            <span className="material-symbols-outlined text-[14px]">check_circle</span> CONFORME À L&apos;OBJECTIF
          </p>
        </div>

        <div className="md:col-span-6 bg-surface-container-low border border-outline-variant/20 p-6 rounded-lg relative">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold tracking-wider text-on-surface-variant mb-1">TENDANCE DE FIABILITÉ</p>
              <h3 className="text-lg font-medium text-on-surface">Optimisation de la Conformité</h3>
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-on-surface-variant">CAIDI (MIN)</span>
              <span className="text-base text-primary font-bold">122.1</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-on-surface-variant">ASAI (%)</span>
              <span className="text-base text-secondary font-bold">99.98</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau des Journaux de Performance Électrique */}
      <section className="bg-surface-container-low rounded-lg border border-outline-variant/30 overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center">
          <h3 className="text-[11px] font-bold tracking-widest text-on-surface">JOURNAUX DE PERFORMANCE PAR DÉPART</h3>
          <span className="font-mono text-xs text-on-surface-variant">128 ENREGISTREMENTS TOTAL</span>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container text-[11px] font-bold tracking-wider text-on-surface-variant border-b border-outline-variant/50">
                <th className="px-8 py-4">ID DU DÉPART</th>
                <th className="px-8 py-4">DISTRICT</th>
                <th className="px-8 py-4 text-primary">SAIDI (M)</th>
                <th className="px-8 py-4 text-secondary">SAIFI (I)</th>
                <th className="px-8 py-4">CAIDI</th>
                <th className="px-8 py-4">STATUT</th>
                <th className="px-8 py-4 text-right">ANALYSE</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {INITIAL_ROWS.map((row) => (
                <tr 
                  key={row.id} 
                  onClick={() => setSelectedRow(row.id)}
                  className={`hover:bg-surface-container-high transition-colors cursor-pointer border-b border-outline-variant/10 ${
                    selectedRow === row.id ? "bg-surface-container-highest" : ""
                  }`}
                >
                  <td className="px-8 py-6 font-mono text-on-surface">{row.id}</td>
                  <td className="px-8 py-6 text-on-surface-variant">{row.district}</td>
                  <td className="px-8 py-6 text-primary font-bold">{row.saidi}</td>
                  <td className="px-8 py-6 text-secondary font-bold">{row.saifi}</td>
                  <td className="px-8 py-6 text-on-surface">{row.caidi}</td>
                  <td className="px-8 py-6">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-tight ${row.statusColor}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">analytics</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination du Tableau */}
        <div className="px-8 py-4 border-t border-outline-variant/30 flex justify-between items-center bg-surface-container/30">
          <span className="font-mono text-[11px] text-on-surface-variant">AFFICHAGE 1-5 SUR 128 ENTRÉES</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary-container font-bold text-[11px]">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container transition-colors text-on-surface-variant text-[11px]">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container transition-colors text-on-surface-variant text-[11px]">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Métadonnées Réglementaires en bas de page */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="p-6 rounded-lg border border-outline-variant/20 bg-surface-container-lowest">
          <h4 className="text-[11px] font-bold tracking-wider text-on-surface mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px]">info</span>
            NOTE RÉGLEMENTAIRE
          </h4>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Les valeurs affichées sont conformes à la norme IEEE 1366. Les exclusions liées aux Journées d&apos;Événements Majeurs (MED) ont été appliquées aux indicateurs globaux primaires.
          </p>
        </div>
        
        <div className="p-6 rounded-lg border border-outline-variant/20 bg-surface-container-lowest">
          <h4 className="text-[11px] font-bold tracking-wider text-on-surface mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">history</span>
            DERNIÈRE SOUMISSION
          </h4>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-on-surface">Revue Annuelle de Performance 2023</p>
              <p className="font-mono text-[11px] text-on-surface-variant uppercase mt-1">Statut: Accepté par la Commission</p>
            </div>
            <button className="text-primary text-[11px] font-bold tracking-wider border border-primary/30 px-3 py-1 hover:bg-primary/10 transition-colors">
              VOIR RÉCÉPISSÉ
            </button>
          </div>
        </div>
      </div>

      {/* Action flottante (FAB) - Nouveau Rapport */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-100 z-50">
        <span className="material-symbols-outlined text-[28px] [font-variation-settings:'FILL'_1]">add</span>
      </button>
    </div>
  );
}