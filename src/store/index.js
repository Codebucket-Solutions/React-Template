import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { baseApi } from '../apiCall/rtkBaseApi/baseApi';

// Load auth state from localStorage
const loadAuthFromLocalStorage = () => {
  try {
    const admin = localStorage.getItem("admin-login");
    const influencer = localStorage.getItem("influencer-login");
    if (admin) return JSON.parse(admin);
    if (influencer) return JSON.parse(influencer);
    return null;
  } catch {
    return null;
  }
};

const preloadedState = {
  User: {
    auth: loadAuthFromLocalStorage(),
  },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware),

  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});
