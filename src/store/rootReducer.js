import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '../apiCall/rtkBaseApi/baseApi';
import statusReducer from './slices/notifications/notificationSlice';
import authReducer from './slices/auth/authSlice';

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  ui: statusReducer,
});
