'use client';
import CartShoe from '@/components/cards/CartShoe';
import ChangeVariant from '@/components/form/ChangeVariant';
import Border from '@/components/shared/Border';
import { getCartByUserId } from '@/slices/cartSlice';
import type { Cart, ItemCart, RVariant, User, variantColor } from '@/types/type';
import axios from '@/utils/axios';
import useAxiosPrivate from '@/utils/intercepter';
import { AppDispatch } from '@/utils/store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Cart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [cartItem, setCartItem] = useState<Cart>();
    const [price, setPrice] = useState({});
    const [qty, setQty] = useState<number>(0);
    const [quantityCart, setQuantityCart] = useState({});
    const [total, setTotal] = useState<number>(0);
    const [checkedAll, setCheckedAll] = useState(false);
    const [active, setActive] = useState<boolean>(false);
    const [productId, setProductId] = useState<string>('');
    const [items, setItems] = useState<RVariant>({
        color: '',
        hex: '',
        image: '',
        quantity: 0,
        size: '',
    });
    const [manageQuantity, setManageQuantity] = useState(1);
    const axiosPrivate = useAxiosPrivate();

    const [load, setLoad] = useState<boolean>(false);

    const [checkedItems, setCheckedItems] = React.useState<{ [key: string]: boolean }>({});
    const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

    let user: User | null = null;
    if (userString !== null) {
        try {
            user = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    const length = cartItem?.items && cartItem.items.length;
    const id = user?._id as string;

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            if (token) {
                const { data } = await axiosPrivate.get(`/carts/user/${id}`);
                if (data.success) {
                    setCartItem(data.data);
                    localStorage.setItem('itemOrders', '');
                    localStorage.setItem('totalPrice', '');
                }
            }
        };
        fetchData();
    }, [length, load]);

    const handleCheckout = () => {
        if (qty !== 0) {
            router.push('/order');
        } else {
            toast.error('Please choose shoes to checkout');
        }
    };

    const handleCheckedAll = async () => {
        setCheckedAll((prev) => !prev);

        if (!checkedAll) {
            setTotal(cartItem?.total as number);
            setQty(cartItem?.items.reduce((acc, cur) => acc + cur.quantity, 0) as number);
            const updatedCheckedItems: { [key: string]: boolean } = {};
            for (const item of cartItem?.items as ItemCart[]) {
                updatedCheckedItems[item.product] = true;
            }
            localStorage.setItem('itemOrders', JSON.stringify(cartItem?.items));
            localStorage.setItem('totalPrice', JSON.stringify(cartItem?.total));
            setCheckedItems(updatedCheckedItems);
        } else {
            setTotal(0);
            setQty(0);
            const updatedCheckedItems: { [key: string]: boolean } = {};
            for (const item of cartItem?.items as ItemCart[]) {
                updatedCheckedItems[item.product] = false;
            }
            localStorage.setItem('itemOrders', '');
            localStorage.setItem('totalPrice', '');
            setCheckedItems(updatedCheckedItems);
        }
    };

    useEffect(() => {
        const initialCheckedItems = ((cartItem?.items as ItemCart[]) ?? []).reduce((acc, item) => {
            acc[item.product] = false;
            return acc;
        }, {} as { [key: string]: boolean });
        setCheckedItems(initialCheckedItems);
    }, [cartItem?.items]);

    return (
        <div className="flex flex-col items-center px-10 mt-6">
            <span className="font-bold text-3xl text-blue">Cart</span>
            <div className="w-full flex gap-5 text-cart">
                <input
                    type="checkbox"
                    checked={checkedAll}
                    onChange={handleCheckedAll}
                    className={`${checkedAll === true ? 'checked:accent-blue cursor-pointer' : 'cursor-pointer'}`}
                />
            </div>

            <div className="flex gap-5 w-full">
                <CartShoe
                    cartItem={cartItem as Cart}
                    checkedItems={checkedItems}
                    setCheckedItems={setCheckedItems}
                    checkedAll={checkedAll}
                    setCheckedAll={setCheckedAll}
                    quantityCart={quantityCart}
                    setQuantityCart={setQuantityCart}
                    price={price}
                    setPrice={setPrice}
                    setQty={setQty}
                    setTotal={setTotal}
                    setActive={setActive}
                    setProductId={setProductId}
                    items={items}
                    setItems={setItems}
                    setManageQuantity={setManageQuantity}
                    setLoad={setLoad}
                />

                <div className="p-5 w-[310px] shadow-xl rounded-lg h-max">
                    <div className="flex justify-between font-medium text-sm mb-[25px]">
                        <div className="flex flex-col gap-5">
                            <span>Subtotal</span>
                            <span>Subquantity</span>
                            <span>Shipping fee</span>
                        </div>
                        <div className="flex flex-col items-end gap-5">
                            <span>${total}</span>
                            <span>{qty}</span>
                            <span>free</span>
                        </div>
                    </div>
                    <Border />
                    <div className="text-base font-semibold flex justify-between my-5">
                        <span>Total</span>
                        <span>${total}</span>
                    </div>
                    <button
                        className="bg-bluev4 w-full h-[60px] rounded-lg font-bold text-white hover:bg-blue"
                        onClick={handleCheckout}
                    >
                        Check out
                    </button>
                </div>
            </div>
            {active && (
                <ChangeVariant
                    productId={productId}
                    setActive={setActive}
                    items={items}
                    setItems={setItems}
                    setManageQuantity={setManageQuantity}
                    manageQuantity={manageQuantity}
                    setLoad={setLoad}
                />
            )}
        </div>
    );
};

export default Cart;
