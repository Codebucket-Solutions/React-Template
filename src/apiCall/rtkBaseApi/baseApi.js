import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH_STORAGE_KEY } from '../../store/slices/auth/authSlice';
import { recordRuntimeEvent } from '../../shared/observability/runtimeSignals';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token =
      getState().auth?.session?.token ||
      JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || 'null')?.token ||
      localStorage.getItem('kc_token');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const request =
      typeof args === 'string'
        ? {
            url: args,
            method: 'GET',
          }
        : args;

    const startedAt = Date.now();
    const result = await rawBaseQuery(args, api, extraOptions);

    recordRuntimeEvent('api.rtk_query', {
      url: request.url,
      method: request.method || 'GET',
      durationMs: Date.now() - startedAt,
      status: result.error ? 'error' : 'success',
    });

    return result;
  },
  tagTypes: ['todos'],
  endpoints: () => ({}),
});
