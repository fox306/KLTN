import { Order, deleteOrder, pageOrder, updateOrder } from '@/types/type';
import axios from '@/utils/axios';

const ordersApi = {
    getAllOrder: (pageNumber: number) => {
        const url = `/orders?pageSize=4&pageNumber=${pageNumber}`;
        return axios.get(url);
    },
    getAllOrderByUserId: (userId: string) => {
        const url = '/orders/user';
        return axios.get(url, {
            params: {
                user: userId,
                pageSize: 10,
            },
        });
    },
    getAllOrderByOrderStatus: (item: pageOrder) => {
        const url = `/orders/find/by-status?pageSize=5&pageNumber=${item.pageNumber}&status=${item.status}`;
        return axios.get(url);
    },
    getOrderByOrderId: (order: string) => {
        const url = `/orders/by-id/${order}`;
        return axios.get(url);
    },
    createOrder: (item: Order) => {
        const url = '/orders';
        const data = {
            items: item.items,
            userID: item.user,
            deliveryAddress: item.deliveryAddress,
            paymentMethod: item.paymentMethod,
            total: item.total,
        };
        console.log(data);
        return axios.post(url, data);
    },
    updateOrderStatusByOrderId: (order: updateOrder) => {
        const url = '/orders';
        return axios.patch(url, order);
    },
    cancelOrderByOrderId: (order: string) => {
        const url = `/orders/cancel`;
        return axios.patch(url, order);
    },
    comfirmPaymentOrderByOrderId: (order: string) => {
        const url = `/orders/paid`;
        return axios.patch(url, order);
    },
    deleteAllOrderByUserId: (item: deleteOrder) => {
        const url = `/orders/user/${item.user}`;
        return axios.delete(url);
    },
    deleteAllOrderByOrderId: (order: string) => {
        const url = `/orders/${order}`;
        return axios.delete(url);
    },
};

export default ordersApi;
