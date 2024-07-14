'use client';
import { ItemCart, User } from '@/types/type';
import useAxiosPrivate from '@/utils/intercepter';
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }: any) => {
    const [cartItems, setCartItems] = useState<ItemCart[]>([]);
    const [flag, setFlag] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    let user: User | null = null;
    if (userString !== null) {
        try {
            user = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    const id = user?._id as string;

    const addToCart = (item: any) => {
        const isItemInCart = cartItems.find((cartItem: ItemCart) => cartItem.product === item.product);
        if (isItemInCart) {
            return;
        }
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
    };

    const removeFromCart = (product: string) => {
        const isItemInCart = cartItems.find((cartItem: ItemCart) => cartItem.product === product);

        setCartItems(cartItems.filter((cartItem: ItemCart) => cartItem.product !== product));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const { data } = await axiosPrivate.get(`/carts/user/${id}`);
                setCartItems(data.data.items);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
