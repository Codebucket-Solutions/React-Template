import axiosAPI from 'axios';

const axios = axiosAPI.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

axios.interceptors.request.use(request => {
    return request
})

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});


export { axios };