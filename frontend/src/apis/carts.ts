import { Cart, ItemCart, ItemCartFake, RemoveItemCart, itemCartRandomVari } from '@/types/type';
import axios from '../utils/axios';

const cartsApi = {
    getCartByUserId: (userId: string) => {
        const url = `/carts/user/${userId}`;
        return axios.get(url);
    },
    createCart: (user: string) => {
        const url = '/carts';
        return axios.post(url, user);
    },
    addItemToCartByUserId: (item: ItemCartFake) => {
        const url = `/carts/addToCart`;
        const cart = {
            user: item.user,
            product: item.product,
            image: item.image,
            name: item.name,
            color: item.color,
            size: item.size,
            quantity: item.quantity,
        };
        return axios.post(url, cart);
    },
    removeItemFromCartByUserId: (item: RemoveItemCart) => {
        const url = `/carts/removeFromCart?user=${item.user}&product=${item.product}`;
        return axios.delete(url);
    },
    addItemToCartRandomVariant: (item: itemCartRandomVari) => {
        const url = '/carts/addToCart/withoutVariant';
        return axios.post(url, item);
    },
};

export default cartsApi;
