import { getQtyOfSizeColor } from '@/types/type';
import axios from '../utils/axios';

const variantsApi = {
    getColorOfSize: (item: getQtyOfSizeColor) => {
        const url = `/variants/find/by-info?product=${item.id}&size=${item.size}&color=${item.color}`;
        return axios.get(url);
    },
};

export default variantsApi;
