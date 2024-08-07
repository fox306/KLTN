import { Category } from '@/types/type';
import axios from '../utils/axios';

const categoriesApi = {
    getAllCategory: () => {
        const url = '/categories?pageSize=20&pageNumber=1';
        return axios.get(url);
    },
    getCategoryById: (category: string) => {
        const url = `/categories/${category}`;
        return axios.get(url);
    },
};

export default categoriesApi;
