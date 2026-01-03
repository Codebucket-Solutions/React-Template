import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import { baseApi } from '../apiCall/rtkBaseApi/baseApi';
import statusReducer from './slices/notifications/notificationSlice';
import userReducer from '../pages/userlist/userSlice';
export const rootReducer = combineReducers({
    counter: counterReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    Loader: statusReducer,
    User : userReducer,
    // Auth: authReducer,
});
