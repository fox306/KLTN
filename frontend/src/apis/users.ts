import { User, updateEmail, updatePassword, upAvatar, upUser } from '@/types/type';
import axios from '../utils/axios';

const usersApi = {
    getUser: (user: string) => {
        const url = `/users/${user}`;
        return axios.get(url);
    },
    updateUser: (user: upUser) => {
        const url = '/users';
        return axios.patch(url, user);
    },
    uploadAvatar: (item: upAvatar) => {
        const url = '/users/upload-avatar';
        return axios.patch(url, item);
    },
    updateUserPasswordByUserId: (item: updatePassword) => {
        const url = '/users/update-password';
        return axios.patch(url, item);
    },
    updateUserEmailByUserId: (email: updateEmail) => {
        const url = '/users/update-email';
        return axios.patch(url, email);
    },
};

export default usersApi;
