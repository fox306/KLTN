import { getQtyOfSizeColor } from '@/types/type';
import axios from '../utils/axios';

const variantsApi = {
    getColorOfSize: (item: getQtyOfSizeColor) => {
        const url = `/variants/find/by-size?product=${item.id}&size=${item.size}`;
        return axios.get(url);
    },
};

export default variantsApi;
