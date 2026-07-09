export interface Site {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'NOMINAL' | 'WARN' | 'CRITICAL';
  activeLoad: number;
}

export interface KpiData {
  title: string;
  value: string;
  unit: string;
  icon: string;
  trend: string;
  trendIcon: string;
  statusColor: string;
}

export interface Incident {
  id: string;
  siteName: string;
  time: string;
  title: string;
  description: string;
  severity: 'CRITICAL' | 'WARN' | 'INFO' | 'LOG';
}
