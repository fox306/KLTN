import { SignIn } from '@/types/type';
import axios from '@/utils/axios';

const authApi = {
    signIn: (user: SignIn) => {
        const url = '/auths/login';
        return axios.post(url, user);
    },
    refreshToken: () => {
        const url = '/auths/refresh-token';
        return axios.put(url);
    },
    logout: (token: string) => {
        const url = `/auths/logout`;
        return axios.post(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};
export default authApi;
