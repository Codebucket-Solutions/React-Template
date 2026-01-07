import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '../apiCall/rtkBaseApi/baseApi';
import statusReducer from './slices/notifications/notificationSlice';
import userReducer from '../pages/userlist/userSlice';
import authReducer from '../pages/auth/authSlice';
export const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    Loader: statusReducer,
    User: userReducer,
    Auth: authReducer,
});
