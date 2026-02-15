import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { baseApi } from '../apiCall/rtkBaseApi/baseApi';

// Load auth state from localStorage
const loadAuthFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("vibeGuard-auth");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const preloadedState = {
  User: {
    auth: loadAuthFromLocalStorage(),
    isAuthLoading: false,
  },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware),

  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});
