import axios from '@/utils/axios';

const variantApi = {
    getDetaillByProduct: (product: string) => {
        const url = '/variants/product/detail';
        return axios.get(url, {
            params: {
                product: product,
            },
        });
    },
};

export default variantApi;
