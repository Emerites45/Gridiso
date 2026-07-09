import { configureStore } from '@reduxjs/toolkit';
import { sitesApi } from './api/sites.api';

export const store = configureStore({
  reducer: {
    [sitesApi.reducerPath]: sitesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sitesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;