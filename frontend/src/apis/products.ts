import { Product, findProduct, productByCate } from '@/types/type';
import axios from '../utils/axios';

const productsApi = {
    getAllProduct: () => {
        const url = '/products?pageSize=5&pageNumber=1';
        return axios.get(url);
    },
    getProductById: (product: string) => {
        const url = `/products/${product}`;
        return axios.get(url);
    },
    getAllProductByCateId: (category: productByCate) => {
        const url = `/products/find/by-category?category=${category.category}&pageSize=5`;
        return axios.get(url);
        // , {
        //     params: {
        //         category: category.category,
        //         sort: category.sort,
        //         brand: category.brand,
        //         color: category.color,
        //         pageSize: 6,
        //         pageNumber: category.pageNumber,
        //     },
        // }
    },
    findProductByKeyword: (item: findProduct) => {
        const url = `/products/find/by-keyword?keyword=${item.keyword}&pageSize=5&pageNumber=1`;

        return axios.get(url);
    },

    getProductHotDeal: () => {
        const url = '/products?pageSize=5&pageNumber=1';
        return axios.get(url);
    },
    getQtyOfBrand: () => {
        const url = '/products/brand/quantity';
        return axios.get(url);
    },
    getQtyHotDealOfBrand: () => {
        const url = 'products/brand/hotDeal';
        return axios.get(url);
    },
    getAllProductBy: (category: productByCate) => {
        const url = '/products/category';
        return axios.get(url, {
            params: { category: category.category, pageSize: 6, pageNumber: category.pageNumber },
        });
    },
    getFavoriteUser: (user: string) => {
        const url = `/products/find/by-favorites?pageSize=5&pageNumber=1&user=${user}`;
        return axios.get(url);
    },
};

export default productsApi;
