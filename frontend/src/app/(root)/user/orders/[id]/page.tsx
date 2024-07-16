'use client';
import UserNav from '@/components/shared/UserNav';
import React, { MouseEvent, useEffect, useState } from 'react';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import Image from 'next/image';
import Border from '@/components/shared/Border';
import axios from '@/utils/axios';
import { useParams } from 'next/navigation';
import { ItemCart, Order, User } from '@/types/type';
import { formatCurrency } from '@/utils/convertMoney';
import Review from '@/components/form/Review';

const DetailOrder = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState<Order>();
    const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

    let user: User | null = null;
    if (userString !== null) {
        try {
            user = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    const userId = user?._id as string;
    const [active, setActive] = useState<boolean>(false);
    const [item, setItem] = useState<ItemCart>();

    const handlePay = async () => {
        const { data } = await axios.get(`/orders/create/payment-url?orderId=${id}&total=${detail?.total}`);
        if (data.success) {
            window.open(data.data);
        }
    };

    const handleReview = (e: MouseEvent<HTMLSpanElement>, product: ItemCart) => {
        e.stopPropagation();

        setActive(true);
        setItem(product);
    };

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/orders/by-id/${id}`);
            setDetail(data.data);
        };
        fetchData();
    }, []);
    console.log(detail);
    return (
        <div className="flex justify-center px-20 mt-10 gap-5">
            <UserNav />
            <div className="w-[1100px]">
                <span className="w-full block text-center font-bold text-lg">Order Details</span>
                <div className="my-[10px] shadow-2xl rounded-lg py-5 px-10 flex gap-10">
                    <div className="flex flex-col gap-[14px] font-semibold">
                        <span>Order ID:</span>
                        <span>Buyer:</span>
                        <span>Payment Method:</span>
                    </div>
                    <div className="flex flex-col gap-[14px]">
                        <span>{detail?.orderId}</span>
                        <span>{detail?.deliveryAddress.receiver}</span>
                        <span>{detail?.paymentMethod}</span>
                    </div>
                    <div className="flex-grow"></div>
                    <div className="flex flex-col gap-[14px] font-semibold">
                        <span>Paid:</span>
                        <span>Delivered:</span>
                        <span>Status:</span>
                    </div>
                    <div className="flex flex-col gap-[14px]">
                        <span>{detail?.isPaid ? 'Yes' : 'NOT YET'}</span>
                        <span>{detail?.isDelivered ? 'Success' : 'NOT YET'}</span>
                        <span>{detail?.status}</span>
                    </div>
                </div>
                <div className="w-full p-5 shadow-2xl rounded-lg mb-[10px]">
                    <div className="flex justify-between">
                        <span className="font-bold text-base">Delivery Details</span>
                    </div>
                    <div className="px-5 flex flex-col gap-[15px] mt-5">
                        <div className="flex gap-[350px]">
                            <div className="flex gap-8">
                                <span className="font-semibold">Receiver:</span>
                                <span>{detail?.deliveryAddress.receiver}</span>
                            </div>
                            <div className="flex gap-8">
                                <span className="font-semibold">Phone:</span>
                                <span>{detail?.deliveryAddress.phone}</span>
                            </div>
                        </div>
                        <div className="flex gap-[100px]">
                            <div className="flex gap-8">
                                <span className="font-semibold">Province/City::</span>
                                <span>{detail?.deliveryAddress.province}</span>
                            </div>
                            <div className="flex gap-8">
                                <span className="font-semibold">District:</span>
                                <span>{detail?.deliveryAddress.districts}</span>
                            </div>
                            <div className="flex gap-8">
                                <span className="font-semibold">Wards:</span>
                                <span>{detail?.deliveryAddress.wards}</span>
                            </div>
                        </div>
                        <div className="flex gap-8">
                            <span className="font-semibold">Specific Address:</span>
                            <span>{detail?.deliveryAddress.specific}</span>
                        </div>
                    </div>
                </div>
                <div className="px-[15px] pt-[10px] pb-[10px] shadow-2xl rounded-lg">
                    <span className="font-bold">Detail</span>
                    <Border />
                    <div>
                        {detail?.items.map((item) => (
                            <div>
                                <div className="flex items-center gap-5 my-[10px]">
                                    <Image
                                        src={item.image}
                                        alt="Ảnh"
                                        width={100}
                                        height={100}
                                        className="rounded-lg bg-deal"
                                    />
                                    <div className="w-full font-medium text-base">
                                        <div className="flex justify-between">
                                            <span>{item.name}</span>
                                            {detail.status === 'Successful' && (
                                                <span
                                                    className="text-blue text-[14px] opacity-60 hover:opacity-100"
                                                    onClick={(e) => handleReview(e, item)}
                                                >
                                                    Submit a review
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex gap-[100px] mt-[18px] mb-[14px] text-sm opacity-70">
                                            <span>Color: {item.color}</span>
                                            <span>Size: {item.size}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm opacity-70">Quantity: {item.quantity}</span>
                                            <span className="font-bold text-blue">{formatCurrency(item.price)}</span>
                                        </div>
                                    </div>
                                </div>
                                <Border />
                            </div>
                        ))}
                    </div>
                    <div
                        className={`flex ${
                            (detail?.discountAmount as number) > 0 ? 'justify-between ' : 'justify-end'
                        } gap-3`}
                    >
                        {(detail?.discountAmount as number) > 0 && (
                            <div className="flex items-center font-bold gap-2">
                                <span>Discount Amount:</span>
                                <span className="text-lg text-blue">
                                    {formatCurrency(detail?.discountAmount as number)}
                                </span>
                            </div>
                        )}
                        <div className="flex items-center font-bold gap-2">
                            <span>Total Price:</span>
                            <span className="text-lg text-blue">{formatCurrency(detail?.total as number)}</span>
                        </div>
                    </div>
                </div>
                {detail?.isPaid === false &&
                    detail.paymentMethod === 'VNPAY' &&
                    (detail?.status === 'Confirming' || detail?.status === 'Accepted') && (
                        <div className="text-right">
                            <button
                                className="w-[100px] h-[50px] rounded-[15px] bg-blue bg-opacity-60 text-white hover:bg-opacity-100 mt-[10px]"
                                onClick={handlePay}
                            >
                                Payment
                            </button>
                        </div>
                    )}
            </div>
            {active && <Review item={item as ItemCart} setActive={setActive} id={userId} />}
        </div>
    );
};

export default DetailOrder;
