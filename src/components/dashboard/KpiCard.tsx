'use client';

import { KpiData } from '@/src/types/site.types';

export default function KpiCard({ data }: { data: KpiData }) {
  return (
    <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <span className="text-text-label-caps font-label-caps text-outline uppercase tracking-wider">
          {data.title}
        </span>
        <span className={`material-symbols-outlined ${data.statusColor}`}>
          {data.icon}
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`text-text-display font-label-mono ${data.statusColor}`}>
          {data.value}
        </span>
        <span className="text-text-body-md text-outline">{data.unit}</span>
      </div>
      <div className={`mt-2 flex items-center gap-1 ${data.statusColor}`}>
        <span className="material-symbols-outlined text-sm">{data.trendIcon}</span>
        <span className="text-text-label-mono font-label-mono text-xs">{data.trend}</span>
      </div>
    </div>
  );
}