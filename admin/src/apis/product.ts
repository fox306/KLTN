import { Product, ProductByStatus, findProduct } from '@/types/type';
import axios from '@/utils/axios';

const productApi = {
    getAllProduct: (pageNumber: number) => {
        const url = '/products';
        return axios.get(url, {
            params: {
                pageNumber: pageNumber,
                pageSize: 5,
            },
        });
    },
    getAllProductByStatus: (item: ProductByStatus) => {
        const url = '/products/status';
        return axios.get(url, {
            params: {
                status: item.status,
                pageNumber: item.pageNumber,
                pageSize: 5,
            },
        });
    },
    getProductById: (product: string) => {
        const url = '/products/detail';
        return axios.get(url, { params: { product: product } });
    },
    getAllProductByCateId: (category: string) => {
        const url = '/products/category';
        return axios.get(url, { params: { category: category } });
    },
    createProduct: (product: Product) => {
        const url = `/products`;
        const item = {
            name: product.name,
            desc: product.desc,
            images: product.images,
            brand: product.brand,
            price: product.price,
            rating: product.rating,
            category: product.category,
            variants: product.variant,
        };
        return axios.post(url, item);
    },
    updateProductByProductId: (product: string) => {
        const url = `/products/update/${product}`;
        return axios.patch(url);
        // TODO admin
    },
    updateStatusProductByProductId: () => {
        const url = `/products/update/status`;
        return axios.patch(url);
        // TODO admin
    },
    deleteProductByProductId: (prodcut: string) => {
        const url = `/products/${prodcut}`;
        return axios.delete(url);
    },
    deleteAllProduct: () => {
        const url = '/products';
        return axios.delete(url);
    },
    findProductByKeyword: (item: findProduct) => {
        const url = '/products/search/keyword';
        const items = {
            keywword: item.keyword,
            sort: item.sort,
            pageSize: item.pageSize,
            pageNumber: item.pageNumber,
        };
        return axios.get(url, { data: { items } });
    },
};
export default productApi;
