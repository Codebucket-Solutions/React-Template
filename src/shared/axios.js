import axiosAPI from 'axios';
import { recordRuntimeEvent } from './observability/runtimeSignals';

const axios = axiosAPI.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10_000,
});

axios.interceptors.request.use((request) => {
  request.metadata = {
    startedAt: Date.now(),
  };

  recordRuntimeEvent('api.axios_request', {
    method: request.method?.toUpperCase() || 'GET',
    url: request.url,
  });

  return request;
});

axios.interceptors.response.use(
  (response) => {
    recordRuntimeEvent('api.axios_response', {
      method: response.config.method?.toUpperCase() || 'GET',
      url: response.config.url,
      status: response.status,
      durationMs: Date.now() - (response.config.metadata?.startedAt || Date.now()),
    });

    return response;
  },
  (error) => {
    recordRuntimeEvent('api.axios_error', {
      method: error.config?.method?.toUpperCase() || 'GET',
      url: error.config?.url,
      status: error.response?.status || 'network_error',
      durationMs: Date.now() - (error.config?.metadata?.startedAt || Date.now()),
    });

    return Promise.reject(error);
  },
);

export { axios };
