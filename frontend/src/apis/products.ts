import { Product, findProduct, productByCate } from '@/types/type';
import axios from '../utils/axios';

const productsApi = {
    getAllProduct: () => {
        const url = '/products?pageSize=6&pageNumber=1';
        return axios.get(url);
    },
    getProductById: (product: string) => {
        const url = `/products/${product}`;
        return axios.get(url);
    },
    getAllProductByCateId: (category: productByCate) => {
        let url = `/products/find/by-category?category=${category.category}&pageSize=6&pageNumber=${category.pageNumber}`;
        if (category.color) {
            url += `&color=${category.color}`;
        }
        if (category.brand) {
            url += `&brand=${category.brand}`;
        }
        if (category.sort) {
            url += `&sort=${category.sort}`;
        }
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
        let url = `/products/find/by-keyword?keyword=${item.keyword}&pageSize=6&pageNumber=1`;

        if (item.color) {
            url += `&color=${item.color}`;
        }
        if (item.brand) {
            url += `&brand=${item.brand}`;
        }
        if (item.sort) {
            url += `&sort=${item.sort}`;
        }

        return axios.get(url);
    },

    getProductHotDeal: () => {
        const url = '/revenue/products/hot';
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
        const url = `/products/find/by-favorites?pageSize=6&pageNumber=1&user=${user}`;
        return axios.get(url);
    },
};

export default productsApi;
