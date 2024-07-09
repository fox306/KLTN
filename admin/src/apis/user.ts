import { findUser } from '@/types/type';
import axios from '@/utils/axios';

const userApi = {
    getAllUser: (pageNumber: number) => {
        const url = `/users?pageSize=10&pageNumber=${pageNumber}`;
        return axios.get(url);
    },
    lockUser: (user: string) => {
        const url = `/users/lock/${user}`;
        return axios.patch(url);
    },
    unlockUser: (user: string) => {
        const url = `/users/unlock/${user}`;
        return axios.patch(url);
    },
    getAllUserByStatus: (status: string) => {
        const url = `/users?status=${status}`;
        return axios.get(url);
    },
    findUserByKeyword: (item: findUser) => {
        const url = '/users/search/keyword';
        return axios.get(url, {
            params: { keyword: item.keyword, pageSize: item.pageSize, pageNumber: item.pageNumber },
        });
    },
};

export default userApi;
