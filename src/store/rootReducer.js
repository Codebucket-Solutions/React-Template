import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '../apiCall/rtkBaseApi/baseApi';
import statusReducer from './slices/notifications/notificationSlice';
import authReducer from './slices/auth/authSlice';
import casesReducer from './slices/cases/casesSlice';
import analyticsReducer from './slices/analytics/analyticsSlice';

export const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    Loader: statusReducer,
    User: authReducer,
    Cases: casesReducer,
    Analytics: analyticsReducer,
});
