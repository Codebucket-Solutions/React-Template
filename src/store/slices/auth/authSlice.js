import { createSlice } from '@reduxjs/toolkit';
import { loginWithCredentials } from './authThunk';

export const AUTH_STORAGE_KEY = 'react-template-auth-session';

export const loadAuthSession = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch {
    return null;
  }
};

const persistAuthSession = (session) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (!session) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
};

const initialState = {
  session: null,
  loginStatus: 'idle',
  loginError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthSession(state, action) {
      state.session = action.payload;
      state.loginStatus = 'succeeded';
      state.loginError = null;
      persistAuthSession(action.payload);
    },
    clearAuthSession(state) {
      state.session = null;
      state.loginStatus = 'idle';
      state.loginError = null;
      persistAuthSession(null);
    },
    clearAuthFeedback(state) {
      state.loginStatus = 'idle';
      state.loginError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithCredentials.pending, (state) => {
        state.loginStatus = 'pending';
        state.loginError = null;
      })
      .addCase(loginWithCredentials.fulfilled, (state, action) => {
        state.session = action.payload;
        state.loginStatus = 'succeeded';
        state.loginError = null;
        persistAuthSession(action.payload);
      })
      .addCase(loginWithCredentials.rejected, (state, action) => {
        state.loginStatus = 'failed';
        state.loginError = action.payload || action.error.message || 'Login failed.';
      });
  },
});

export const { clearAuthFeedback, clearAuthSession, setAuthSession } = authSlice.actions;

export default authSlice.reducer;
