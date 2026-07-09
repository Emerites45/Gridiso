'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Liste de configuration des onglets pour éviter la duplication de code
  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: 'dashboard', fill: true },
    { href: '/sites', label: 'Assets', icon: 'factory' },
   /* { href: '#', label: 'Load Analysis', icon: 'query_stats' },
    { href: '/alerts', label: 'Alerts', icon: 'warning' },*/
    { href: '/reports', label: 'Reports', icon: 'description' }, // Ajout de l'onglet Reports
  ];

  return (
    <aside 
      className={`
        h-full flex flex-col border-r border-outline-variant bg-surface-container-low 
        transition-all duration-300 ease-in-out overflow-hidden shrink-0 z-[9999]
        ${isOpen ? 'w-[240px] p-gutter opacity-100' : 'w-0 p-0 opacity-0 border-r-0'}
      `}
    >
      {/* En-tête avec bouton de fermeture (Collapse) */}
      <div className="mb-stack-lg px-unit flex justify-between items-center whitespace-nowrap min-w-[208px]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">GridOS</h1>
          <p className="text-[11px] font-bold tracking-widest text-outline uppercase mt-1">SOCADEL Dashboard</p>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-surface-container rounded text-outline hover:text-white transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">menu_open</span>
        </button>
      </div>

      {/* Navigation principale */}
      <nav className="flex-1 space-y-1 min-w-[208px]">
        {navItems.map((item) => {
          // Vérification si l'élément commence par le href actuel pour gérer les sous-routes (ex: /sites/123)
          const isActive = item.href !== '#' && (pathname === item.href || pathname.startsWith(`${item.href}/`));

          return (
            <Link 
              key={item.label}
              href={item.href} 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all border-l-2 ${
                isActive 
                  ? 'text-primary bg-surface-container-high font-bold border-primary' 
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container border-transparent'
              }`}
            >
              <span 
                className="material-symbols-outlined" 
                style={item.fill || isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className="text-[11px] font-bold tracking-wider uppercase">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Pied de la Sidebar */}
      <div className="mt-auto pt-gutter border-t border-outline-variant space-y-1 min-w-[208px] whitespace-nowrap">
        <div className="flex items-center gap-3 px-4 py-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined text-sm">settings_input_component</span>
          </div>
          <div>
            <p className="text-sm font-bold leading-none text-white">Central Grid</p>
            <p className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-1">Operational</p>
          </div>
        </div>
        <Link className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all border-l-2 border-transparent" href="#">
          <span className="material-symbols-outlined">help</span>
          <span className="text-[11px] font-bold tracking-wider uppercase">Support</span>
        </Link>
      </div>
    </aside>
  );
}