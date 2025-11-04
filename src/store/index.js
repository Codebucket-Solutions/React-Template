import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import { baseApi } from '../apiCall/rtkBaseApi/baseApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: true }).concat(baseApi.middleware),

  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});
