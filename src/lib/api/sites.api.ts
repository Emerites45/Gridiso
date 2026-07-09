import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MOCK_SITES, MOCK_INCIDENTS } from './mockData';
import { Site, Incident } from '@/src/types/site.types';


export const sitesApi = createApi({
  reducerPath: 'sitesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), // Sera remplacé par votre URL NestJS
  endpoints: (builder) => ({
    getSites: builder.query<Site[], void>({
      // Simulation d'appel API avec les mocks
      queryFn: () => ({ data: MOCK_SITES }),
    }),
    getIncidents: builder.query<Incident[], void>({
      queryFn: () => ({ data: MOCK_INCIDENTS }),
    }),
  }),
});

export const { useGetSitesQuery, useGetIncidentsQuery } = sitesApi;