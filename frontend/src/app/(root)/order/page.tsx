'use client';
import Coupons from '@/components/cards/Coupons';
import AddAddress from '@/components/form/AddAddress';
import ListAddress from '@/components/form/ListAddress';
import Border from '@/components/shared/Border';
import { getAllAddressByUserId } from '@/slices/addressSlice';
import { getCartByUserId } from '@/slices/cartSlice';
import { createOrder } from '@/slices/orderSlice';
import type { Address, Cart, Coupon, ItemCart, Order, User, checkoutOrder } from '@/types/type';
import axios from '@/utils/axios';
import { AppDispatch } from '@/utils/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const unProps = {
    update: false,
    setUpdate: () => {},
    addressDetail: {
        _id: '',
        user: '',
        receiver: '',
        phone: '',
        province: '',
        districts: '',
        wards: '',
        specific: '',
        default: false,
    },
    addressId: '',
};

const Order = () => {
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
    const dispatch = useDispatch<AppDispatch>();
    const { address }: { address: Address[] } = useSelector((state: any) => state.address);
    const { cartItem }: { cartItem: Cart } = useSelector((state: any) => state.carts);
    const [datas, setDatas] = useState<Address>();
    const router = useRouter();

    const itemOrders = typeof window !== 'undefined' ? localStorage.getItem('itemOrders') : null;
    const items: ItemCart[] = itemOrders ? JSON.parse(itemOrders) : [];
    const total = typeof window !== 'undefined' ? localStorage.getItem('totalPrice') : null;
    const totalPrice: number = total ? parseFloat(total) : 0;
    const [load, setLoad] = useState<boolean>(false);
    const [change, setChange] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);
    const [listCoupons, setListCoupons] = useState<Coupon[]>();
    const [discount, setDiscount] = useState<Coupon>();
    let totalPay = totalPrice;

    const [pay, setPay] = useState<string>('');
    useEffect(() => {
        dispatch(getCartByUserId(id));
        dispatch(getAllAddressByUserId(id));
    }, [id, load]);

    useEffect(() => {
        if (address.length !== 0) {
            const fetchData = async () => {
                const { data } = await axios.get(`/deliveryAddress/user/${id}/default`);
                if (data.success) {
                    setDatas(data.data);
                }
            };
            fetchData();
        }
    }, [address.length]);

    useEffect(() => {
        const fetchCoupon = async () => {
            const { data } = await axios.get(`/coupons/find/by-user?user=${id}`);
            if (data.success) {
                setListCoupons(data.data);
            }
        };
        fetchCoupon();
    }, []);

    useEffect(() => {
        if (discount) {
            if (discount.type === 'percent') {
                const money = totalPrice * discount.value;
                totalPay = totalPrice - money;
            } else {
                totalPay = totalPrice - discount.value;
            }
        }
    }, [discount]);

    const idAddress = datas?._id as string;

    const handleOrder = async () => {
        if (!pay) {
            toast.error('Please choose method payment');
            return;
        }
        if (idAddress === '') {
            toast.error('Please create address for order');
            return;
        }

        if (pay === 'VNPAY') {
            const item: checkoutOrder = {
                items: items,
                userID: id,
                deliveryAddress: idAddress,
                paymentMethod: pay,
                total: totalPay,
            };
            console.log(item);

            await dispatch(createOrder(item));
            localStorage.removeItem('itemOrders');
            localStorage.removeItem('totalPrice');
            const { data } = await axios.post('/orders/create_payment_url', {
                amount: totalPrice,
                bankCode: 'VNBANK',
            });
            window.open(data.vnpUrl);
            window.close();
        } else {
            const item: checkoutOrder = {
                items: items,
                userID: id,
                deliveryAddress: idAddress,
                paymentMethod: 'COD',
                total: totalPay,
            };
            dispatch(createOrder(item));
            localStorage.removeItem('itemOrders');
            localStorage.removeItem('totalPrice');
            router.push('/user/orders');
        }
    };

    const handleCancel = () => {
        router.push('/cart');
    };

    return (
        <div className="flex flex-col items-center mt-[26px] px-[100px] gap-[10px]">
            <span className="font-bold text-3xl text-blue">Order Comfirmation</span>
            <div className="w-full mt-10 p-5 shadow-xl rounded-lg">
                <div className="flex justify-between">
                    <span className="font-bold text-lg">Delivery Details</span>
                    {address.length === 0 ? (
                        <button
                            className="w-[120px] h-10 bg-blue bg-opacity-50 font-bold text-sm text-white hover:bg-opacity-100"
                            onClick={() => setOpen(true)}
                        >
                            Add New
                        </button>
                    ) : (
                        <button
                            className="w-[120px] h-10 bg-blue bg-opacity-50 font-bold text-sm text-white hover:bg-opacity-100"
                            onClick={() => setChange(true)}
                        >
                            Change
                        </button>
                    )}
                </div>
                <div className="px-5 flex flex-col gap-[15px]">
                    <div className="flex gap-[320px]">
                        <div className="flex gap-8">
                            <span className="font-semibold">Receiver:</span>
                            <span>{datas?.receiver}</span>
                        </div>
                        <div className="flex gap-8">
                            <span className="font-semibold">Phone:</span>
                            <span>{datas?.phone}</span>
                        </div>
                    </div>
                    <div className="flex gap-[75px]">
                        <div className="flex gap-8">
                            <span className="font-semibold">Province/City::</span>
                            <span>{datas?.province}</span>
                        </div>
                        <div className="flex gap-8">
                            <span className="font-semibold">District:</span>
                            <span>{datas?.districts}</span>
                        </div>
                        <div className="flex gap-8">
                            <span className="font-semibold">Wards:</span>
                            <span>{datas?.wards}</span>
                        </div>
                    </div>
                    <div className="flex gap-8">
                        <span className="font-semibold">Specific Address:</span>
                        <span>{datas?.specific}</span>
                    </div>
                </div>
            </div>
            <div className="w-full p-5 shadow-xl rounded-lg">
                <span className="font-bold mb-[15px] block">Detail</span>
                <Border />
                <div>
                    {items &&
                        items.map((item) => (
                            <div key={item.product} className="flex items-center gap-5 my-[10px]">
                                <Image
                                    src={item.image}
                                    alt="Ảnh"
                                    width={100}
                                    height={100}
                                    className="bg-deal rounded-lg"
                                />
                                <div className="flex flex-col gap-[14px] w-full">
                                    <span className="mb-1 font-medium text-lg">{item.name}</span>
                                    <div className="flex items-center gap-[100px]">
                                        <span className="text-sm opacity-70"> Color: {item.color}</span>
                                        <span className="text-sm opacity-70">Size: 42</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm opacity-70"> Quantity: {item.quantity}</span>

                                        <span className="text-blue font-bold">${item.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <Border />
                <div className="flex items-center justify-end mt-5 gap-5 font-bold">
                    <span>Total Price:</span>
                    <span className="text-lg text-blue">${totalPay}</span>
                </div>
            </div>
            <div className="w-full p-5 shadow-xl rounded-lg flex gap-[50px] items-center font-bold">
                <span className="text-lg">Payment Method</span>
                <button
                    onClick={() => setPay('VNPAY')}
                    className={`w-[200px] h-10 text-white text-sm bg-blue ${
                        pay === 'VNPAY' ? 'opacity-100' : 'opacity-50'
                    }  hover:opacity-100`}
                >
                    VNPAY
                </button>
                <button
                    onClick={() => setPay('COD')}
                    className={`w-[200px] h-10 text-white text-sm bg-blue ${
                        pay === 'COD' ? 'opacity-100' : 'opacity-50'
                    } hover:opacity-100`}
                >
                    COD
                </button>
                <div className="flex-grow"></div>
                <button
                    onClick={() => setActive(true)}
                    className="w-[200px] h-10 text-white text-sm bg-blue opacity-50 hover:opacity-100"
                >
                    Discount
                </button>
                <span>Discount: </span>
                <span className="opacity-50">Shipping fee: Free</span>
            </div>
            <div className="flex items-center justify-end w-full font-bold gap-5 text-white">
                <button className="w-[270px] h-[60px] bg-[#FF4747] opacity-60 hover:opacity-100" onClick={handleCancel}>
                    Cancel
                </button>
                <button className="w-[270px] h-[60px] bg-blue opacity-70 hover:opacity-100" onClick={handleOrder}>
                    Confirm
                </button>
            </div>
            {change && <ListAddress setLoad={setLoad} address={address} setChange={setChange} />}
            {open && <AddAddress setLoad={setLoad} setOpen={setOpen} {...unProps} />}
            {active && (
                <Coupons setActive={setActive} listCoupons={listCoupons as Coupon[]} setDiscount={setDiscount} />
            )}
        </div>
    );
};

export default Order;
