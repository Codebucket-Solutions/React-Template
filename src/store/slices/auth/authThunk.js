import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiFunction } from '../../../apiCall/function';
import { LOGIN } from '../../../apiCall/urls/auth';
import { demoAuthUsers } from '../../../shared/mockData/demoData';
import { recordRuntimeEvent } from '../../../shared/observability/runtimeSignals';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const shouldUseMockAuth = () =>
  import.meta.env.VITE_ENABLE_MOCK_AUTH !== 'false' || !import.meta.env.VITE_API_BASE_URL;

const normalizeSession = (payload, credentials, mode) => {
  const userRecord = payload?.user || payload?.profile || payload?.account || payload;
  const email = userRecord?.email || payload?.email || credentials.email;
  const name = userRecord?.name || userRecord?.fullName || payload?.name || email.split('@')[0];

  return {
    id: String(userRecord?.id || userRecord?.userId || email),
    name,
    email,
    role: userRecord?.role || payload?.role || 'Member',
    workspace: userRecord?.workspace || payload?.workspace || 'General',
    token:
      payload?.token || payload?.accessToken || payload?.jwt || userRecord?.token || null,
    mode,
    authenticatedAt: new Date().toISOString(),
  };
};

const findMockUser = (credentials) => {
  const email = credentials.email.trim().toLowerCase();

  return demoAuthUsers.find(
    (user) => user.email.toLowerCase() === email && user.password === credentials.password,
  );
};

export const loginWithCredentials = createAsyncThunk(
  'auth/loginWithCredentials',
  async (credentials, { rejectWithValue }) => {
    const authMode = shouldUseMockAuth() ? 'mock' : 'live';
    const email = credentials.email.trim().toLowerCase();

    recordRuntimeEvent('auth.login_attempt', {
      email,
      mode: authMode,
    });

    if (authMode === 'mock') {
      await sleep(220);

      const demoUser = findMockUser(credentials);
      if (!demoUser) {
        recordRuntimeEvent('auth.login_failure', {
          email,
          mode: authMode,
        });

        return rejectWithValue('Use one of the demo accounts or configure a live auth endpoint.');
      }

      const session = normalizeSession(
        {
          ...demoUser,
          token: `mock-token-${demoUser.id}`,
        },
        credentials,
        authMode,
      );

      recordRuntimeEvent('auth.login_success', {
        email: session.email,
        mode: authMode,
      });

      return session;
    }

    const response = await apiFunction(LOGIN, 'POST', credentials, false);

    if (!response.status) {
      recordRuntimeEvent('auth.login_failure', {
        email,
        mode: authMode,
        reason: response.message,
      });

      return rejectWithValue(response.message || 'Login failed.');
    }

    const session = normalizeSession(response.data, credentials, authMode);

    recordRuntimeEvent('auth.login_success', {
      email: session.email,
      mode: authMode,
      hasToken: Boolean(session.token),
    });

    return session;
  },
);
