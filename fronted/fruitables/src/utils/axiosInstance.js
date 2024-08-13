import axios from "axios";
import Cookies from 'js-cookie';
import { authURL } from "./baseURL";


const axiosInstance = axios.create({
    baseURL: authURL,
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;