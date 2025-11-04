import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
console.log(import.meta.env.VITE_API_BASE_URL)
export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token =
                getState().auth?.token ||
                JSON.parse(localStorage.getItem("yourapp-login-data"))?.token  //replace localstorage keyname with your app name
                || localStorage.getItem("kc_token") // include if you are using keycloak
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['todos'], // include tags of apis whose data need to be refetched on mutation
    endpoints: () => ({}),
});