import { Category, updateCateImg, updateCate } from '@/types/type';
import axios from '@/utils/axios';

const categoryApi = {
    getAllCategory: () => {
        const url = '/categories?pageSize=20&pageNumber=1';
        return axios.get(url);
    },
    getCategoryById: (category: string) => {
        const url = `/categories/detail`;
        return axios.get(url, { params: { category } });
    },
    createCategory: (category: Category) => {
        const url = '/categories';
        const item = {}; //TODO add category
        return axios.post(url, category);
    },
    updateCateName: (item: updateCate) => {
        const url = '/categories';
        return axios.patch(url, item);
    },
    updateCateImg: (item: updateCateImg) => {
        const url = '/categories/updateImg';
        return axios.patch(url, item);
    },
    deleteCateById: (category: string) => {
        const url = `/categories/${category}`;
        return axios.delete(url);
    },
    deleteAllCate: () => {
        const url = '/categories';
        return axios.delete(url);
    },
};
export default categoryApi;
