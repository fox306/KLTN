import { useEffect } from 'react';
import refreshTokenFunc from './refreshToken';
import axiosPrivate from './axiosPrivate';

const useAxiosPrivate = () => {
    const token = localStorage.getItem('token');

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            async (config) => {
                const newToken = await refreshTokenFunc(token as string);
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${newToken}`;
                }
                // config.headers['Authorization'] = `Bearer ${newToken}`;
                return config;
            },
            (error) => Promise.reject(error),
        );

        // const responseIntercept = testAxios.interceptors.response.use(
        //     (response) => response,
        //     async (error) => {
        //         const prevRequest = error?.config;
        //         console.log("ta đây");
        //         if (
        //             (error?.response?.status === 403 ||
        //                 error?.response?.status === 410 ||
        //                 error?.response?.status === 401 ||
        //                 error?.response?.status === 498) &&
        //             !prevRequest?.sent
        //         ) {
        //             prevRequest.sent = true;
        //             const newToken = await refreshTokenFunc(token, dispatch);
        //             prevRequest.headers['Authorization'] = `Bearer ${newToken}`;
        //             return testAxios(prevRequest);
        //         }
        //         return Promise.reject(error);
        //     },
        // );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            // testAxios.interceptors.response.eject(responseIntercept);
        };
    }, [token]);

    return axiosPrivate;
};

export default useAxiosPrivate;
