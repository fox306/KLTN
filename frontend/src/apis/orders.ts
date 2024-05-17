import { Order, checkoutOrder, orderStatus, updateOrder } from '@/types/type';
import axios from '../utils/axios';

const ordersApi = {
    getAllOrderByUserId: (userId: string) => {
        const url = `/orders/find/by-user?pageSize=4&pageNumber=1&user=${userId}`;
        return axios.get(url);
    },
    getAllOrderByUserAndStatus: (item: orderStatus) => {
        const url = `/orders/find/by-user-status?pageSize=4&pageNumber=1&user=${item.user}&status=${item.status}`;
        return axios.get(url);
    },
    getOrderByOrderId: (order: string) => {
        const url = `/orders/${order}`;
        return axios.get(url);
    },
    createOrder: (item: checkoutOrder) => {
        const url = '/orders';
        const data = {
            user: item.userID,
            deliveryAddress: item.deliveryAddress,
            items: item.items,
            total: item.total,
            paymentMethod: item.paymentMethod,
        };
        console.log(data);
        return axios.post(url, data);
    },
    cancelOrderByOrderId: (order: string) => {
        const url = `/orders/cancel/${order}`;
        return axios.patch(url);
    },
    returnOrder: (order: string) => {
        const url = `/orders/return/${order}`;
        return axios.patch(url);
    },
    receivedOrder: (order: string) => {
        const url = `/orders/received/${order}`;
        return axios.patch(url);
    },
};

export default ordersApi;
