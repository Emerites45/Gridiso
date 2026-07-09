/* eslint-disable @next/next/no-img-element */
'use client';

interface TopbarProps {
  isSidebarOpen: boolean;
  onOpenSidebar: () => void;
}

export default function Topbar({ isSidebarOpen, onOpenSidebar }: TopbarProps) {
  return (
    <header className="flex justify-between items-center w-full px-container-padding h-16 border-b border-outline-variant bg-surface shrink-0 z-40">
      <div className="flex items-center gap-stack-md">
        
        {/* Bouton Menu Hamburger - Apparaît de manière fluide uniquement si la sidebar est fermée */}
        {!isSidebarOpen && (
          <button 
            onClick={onOpenSidebar}
            className="p-2 mr-1 hover:bg-surface-container-high rounded-lg text-primary flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        )}

        <span className="text-xl font-bold text-primary">Operational Stage</span>
        <div className="h-4 w-[1px] bg-outline-variant mx-2"></div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          <span className="text-[13px] font-mono text-secondary tracking-wide uppercase">SYSTEMS NOMINAL</span>
        </div>
      </div>
      
      <div className="flex items-center gap-gutter">
        <div className="relative group">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg group-focus-within:text-primary">
            search
          </span>
          <input 
            type="text" 
            placeholder="Search grid assets..." 
            className="bg-surface-container border border-outline-variant rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 transition-all text-on-surface"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined">settings</span>
          </button>
          
          <div className="w-8 h-8 rounded-full overflow-hidden ml-2 border border-outline-variant bg-surface-variant">
            <img 
              className="w-full h-full object-cover" 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=SOCADEL" 
              alt="Operator Profile" 
            />
          </div>
        </div>
      </div>
    </header>
  );
}