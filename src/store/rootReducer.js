import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import { baseApi } from '../apiCall/rtkBaseApi/baseApi';
import statusReducer from './notifications/notificationSlice';
export const rootReducer = combineReducers({
    counter: counterReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    Loader: statusReducer,
    // Auth: authReducer,
});
