import axios from '@/utils/axios';

const addressApi = {
    deleteAllAddress: () => {
        const url = '/address';
        return axios.delete(url);
    },
};

export default addressApi;
