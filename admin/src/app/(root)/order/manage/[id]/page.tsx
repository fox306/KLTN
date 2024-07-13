'use client';
import Loading from '@/components/shared/Loading';
import Sure from '@/components/shared/Sure';
import { getOrderByOrderId } from '@/slices/orderSlice';
import { Order } from '@/types/type';
import axios from '@/utils/axios';
import { AppDispatch } from '@/utils/store';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const OrderDetail = () => {
    const { id }: { id: string } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, order }: { loading: boolean; order: Order } = useSelector((state: any) => state.orders);
    const [isDispatched, setIsDispatched] = useState(false);
    const [load, setLoad] = useState(false);
    const [open, setOpen] = useState<boolean>(false);
    const [current, setCurrent] = useState<string>('');
    const [orderId, setOrderId] = useState<string>('');
    const router = useRouter();

    const handleComfirm = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: string) => {
        e.stopPropagation();
        setOrderId(id);
        setOpen(true);
        setCurrent('Accepted');
    };
    const handleDelivery = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: string) => {
        e.stopPropagation();
        setOrderId(id);
        setOpen(true);
        setCurrent('Delivering');
    };
    const handleCancel = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: string) => {
        e.stopPropagation();
        setOrderId(id);
        setOpen(true);
        setCurrent('Cancel');
    };
    const handleSuccess = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: string) => {
        e.stopPropagation();
        setOrderId(id);
        setOpen(true);
        setCurrent('Successful');
    };
    const handleReturn = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: string) => {
        e.stopPropagation();
        setOrderId(id);
        setOpen(true);
        setCurrent('Return');
    };
    useEffect(() => {
        dispatch(getOrderByOrderId(id))
            .then(() => {
                setIsDispatched(true);
            })
            .catch((error) => {
                console.error('Error fetching order:', error);
            });
    }, [load]);

    if (!isDispatched || loading) {
        return <Loading />;
    }
    return (
        <div>
            {!loading && (
                <div>
                    <div className="w-full font-bold">
                        <div className="cursor-pointer" onClick={() => router.push('/order/manage')}>
                            Back
                        </div>
                        <div className="text-center text-lg">Order Details</div>
                    </div>
                    {order && (
                        <div>
                            <div className="my-[10px] shadow-revenue bg-white py-5 px-10 flex gap-10">
                                <div className="flex flex-col gap-[14px] font-semibold">
                                    <span>Order ID:</span>
                                    <span>Buyer:</span>
                                    <span>Payment Method:</span>
                                </div>

                                <div className="flex flex-col gap-[14px]">
                                    <span>{order._id}</span>
                                    <span>{order.user}</span>
                                    <span>{order.paymentMethod}</span>
                                </div>
                                <div className="flex-grow"></div>
                                <div className="flex flex-col gap-[14px] font-semibold">
                                    <span>Paid:</span>
                                    <span>Delivered:</span>
                                    <span>Status:</span>
                                </div>
                                <div className="flex flex-col gap-[14px]">
                                    <span>{order.isPaid ? 'SUCCESS' : 'NOT YET'}</span>
                                    <span>{order.isDelivered ? 'SUCCESS' : 'NOT YET'}</span>
                                    <span>{order.status}</span>
                                </div>
                            </div>

                            <div className="w-full p-5 shadow-revenue bg-white mb-[10px]">
                                <div className="flex justify-between">
                                    <span className="font-bold text-lg">Delivery Details</span>
                                </div>
                                <div className="px-5 flex flex-col gap-[15px] mt-5">
                                    <div className="flex gap-[350px]">
                                        <div className="flex gap-8">
                                            <span className="font-semibold">Receiver:</span>
                                            <span>{order.deliveryAddress.receiver}</span>
                                        </div>
                                        <div className="flex gap-8">
                                            <span className="font-semibold">Phone:</span>
                                            <span>{order.deliveryAddress.phone}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-[100px]">
                                        <div className="flex gap-8">
                                            <span className="font-semibold">Province/City::</span>
                                            <span>{order.deliveryAddress.province}</span>
                                        </div>
                                        <div className="flex gap-8">
                                            <span className="font-semibold">District:</span>
                                            <span>{order.deliveryAddress.districts}</span>
                                        </div>
                                        <div className="flex gap-8">
                                            <span className="font-semibold">Wards:</span>
                                            <span>{order.deliveryAddress.wards}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-8">
                                        <span className="font-semibold">Specific Address:</span>
                                        <span>{order.deliveryAddress.specific}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-[15px] pt-[10px] pb-[10px] shadow-revenue bg-white">
                                <span className="font-bold">Detail</span>
                                {/* <Border /> */}
                                <div>
                                    <div>
                                        {order.items.map((item) => (
                                            <div className="flex items-center gap-5 my-[10px]">
                                                <Image
                                                    src={item.image}
                                                    alt="Ảnh"
                                                    width={100}
                                                    height={100}
                                                    className="rounded-lg bg-deal"
                                                />
                                                <div className="w-full font-medium text-lg">
                                                    <div className="flex justify-between">
                                                        <span>{item.name}</span>
                                                    </div>
                                                    <div className="flex gap-[100px] mt-[18px] mb-[14px] text-sm opacity-70">
                                                        <span>Color: {item.color}</span>
                                                        <span>Size: {item.size}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-sm opacity-70">
                                                            Quantity: {item.quantity}
                                                        </span>
                                                        <span className="font-bold text-blue">${item.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    {order.discountAmount > 0 && (
                                        <div className="flex items-center font-bold gap-2">
                                            <span>Discount Amount:</span>
                                            <span className="text-lg text-blue">${order.discountAmount}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center font-bold gap-2">
                                        <span>Total Price:</span>
                                        <span className="text-lg text-blue">${order.total}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {order.status === 'Cancel' ? (
                        ''
                    ) : (
                        <div className="mt-[10px] flex justify-between">
                            {order.status === 'Confirming' ? (
                                <button
                                    className="w-[200px] h-[50px] bg-blue bg-opacity-60 text-white font-bold text-sm"
                                    onClick={(e) => handleComfirm(e, order._id)}
                                >
                                    CONFIRM
                                </button>
                            ) : (
                                ''
                            )}
                            {order.status === 'Accepted' ? (
                                <button
                                    className="w-[200px] h-[50px] bg-blue bg-opacity-60 text-white font-bold text-sm"
                                    onClick={(e) => handleDelivery(e, order._id)}
                                >
                                    DELIVERY
                                </button>
                            ) : (
                                ''
                            )}
                            {order.status === 'Confirming' ? (
                                <button
                                    className="w-[200px] h-[50px] bg-red bg-opacity-60 text-white font-bold text-sm"
                                    onClick={(e) => handleCancel(e, order._id)}
                                >
                                    CANCEL
                                </button>
                            ) : (
                                ''
                            )}
                            {order.status === 'Delivering' ? (
                                <button
                                    className="w-[200px] h-[50px] bg-blue bg-opacity-60 text-white font-bold text-sm"
                                    onClick={(e) => handleSuccess(e, order._id)}
                                >
                                    SUCCESS
                                </button>
                            ) : (
                                ''
                            )}
                            {order.status === 'Return' ? (
                                <button
                                    className="w-[120px] h-10 bg-blue bg-opacity-50 text-white rounded-md font-bold text-sm hover:bg-opacity-100"
                                    onClick={(e) => handleReturn(e, order._id)}
                                >
                                    Return
                                </button>
                            ) : (
                                ''
                            )}
                            <button
                                className="w-[200px] h-[50px] bg-blue bg-opacity-60 text-white font-bold text-sm"
                                onClick={() => {
                                    router.push('/order/manage');
                                }}
                            >
                                BACK
                            </button>
                        </div>
                    )}
                </div>
            )}
            {open && (
                <Sure
                    setOpen={setOpen}
                    setLoad={setLoad}
                    orderId={orderId}
                    setOrderId={setOrderId}
                    setCurrent={setCurrent}
                    current={current}
                />
            )}
        </div>
    );
};

export default OrderDetail;
