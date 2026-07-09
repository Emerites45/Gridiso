import { Incident, Site } from "@/src/types/site.types";

export const MOCK_SITES: Site[] = [
  { id: '1', name: 'Poste Ahala', city: 'Yaoundé', lat: 3.81, lng: 11.50, status: 'NOMINAL', load: 120, voltage: 225, temperature: 42, lastUpdate: new Date().toISOString() },
  { id: '2', name: 'Poste Bekoko', city: 'Douala', lat: 4.05, lng: 9.70, status: 'CRITICAL', load: 310, voltage: 88, temperature: 95, lastUpdate: new Date().toISOString() },
  { id: '3', name: 'Centrale Lagdo', city: 'Garoua', lat: 9.30, lng: 13.39, status: 'WARN', load: 72, voltage: 110, temperature: 55, lastUpdate: new Date().toISOString() },
  { id: '4', name: 'Poste Logbaba', city: 'Douala', lat: 4.04, lng: 9.76, status: 'NOMINAL', load: 150, voltage: 225, temperature: 38, lastUpdate: new Date().toISOString() },
];

export const MOCK_INCIDENTS: Incident[] = [
  { id: 'i1', siteId: '2', severity: 'high', message: 'Surcharge transformateur T1', timestamp: '12:44:02' },
  { id: 'i2', siteId: '3', severity: 'medium', message: 'Niveau d\'eau bas - Turbines', timestamp: '11:20:15' },
];