import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    paramsSerializer: params => queryString.stringify(params)
})

axiosClient.interceptors.request.use(async (config) => {
    return config;
})

axiosClient.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    throw  error;
})

export default axiosClient;
