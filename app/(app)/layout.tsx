'use client';

import React, { useState } from 'react';
import Sidebar from '@/src/components/layout/Sidebar';
import Topbar from '@/src/components/layout/Topbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="bg-[#0b1326] text-[#dae2fd] font-sans h-screen w-full flex overflow-hidden selection:bg-[#4d8eff] selection:text-[#00285d]">
      
      {/* 1. La Sidebar contrôle sa propre largeur selon l'état */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* 2. Le bloc principal s'ajuste automatiquement grâce à flex-1 */}
      <main className="flex-1 flex flex-col h-screen relative overflow-hidden">
        
        {/* On passe l'état à la Topbar pour afficher le bouton "Menu" si la sidebar est fermée */}
        <Topbar isSidebarOpen={isSidebarOpen} onOpenSidebar={() => setIsSidebarOpen(true)} />
        
        {/* Le contenu des pages (dashboard, sites) reçoit l'espace restant net */}
        {children} 
      </main>
    </div>
  );
}