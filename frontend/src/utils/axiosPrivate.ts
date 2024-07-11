import axios from 'axios';

export const axiosPrivate = axios.create({
    baseURL: 'http://localhost:8800/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default axiosPrivate;
