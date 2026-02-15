import axiosAPI from 'axios';

const axios = axiosAPI.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

// Attach auth token to every request
axios.interceptors.request.use((request) => {
    try {
        const authData = localStorage.getItem("vibeGuard-auth");
        if (authData) {
            const { token } = JSON.parse(authData);
            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
            }
        }
    } catch {
        // ignore parse errors
    }
    return request;
});

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        // Auto-logout on 401
        if (error.response?.status === 401) {
            localStorage.removeItem("vibeGuard-auth");
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export { axios };