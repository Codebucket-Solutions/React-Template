import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { baseApi } from '../apiCall/rtkBaseApi/baseApi';
import { loadAuthSession } from './slices/auth/authSlice';

const preloadedState = {
  auth: {
    session: loadAuthSession(),
    loginStatus: 'idle',
    loginError: null,
  },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware),
  devTools: import.meta.env.VITE_NODE_ENV !== 'production',
});
