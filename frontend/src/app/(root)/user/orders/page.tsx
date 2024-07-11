'use client';
import Review from '@/components/form/Review';
import Border from '@/components/shared/Border';
import Loading from '@/components/shared/Loading';
import NoData from '@/components/shared/NoData';
import Pagetination from '@/components/shared/Pagetination';
import Sure from '@/components/shared/Sure';
import UserNav from '@/components/shared/UserNav';
import {
    cancelOrderByOrderId,
    getAllOrderByUserAndStatus,
    getAllOrderByUserId,
    receivedOrder,
} from '@/slices/orderSlice';
import { ItemCart, Order, User, orderStatus } from '@/types/type';
import axios from '@/utils/axios';
import useAxiosPrivate from '@/utils/intercepter';
import { AppDispatch } from '@/utils/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const statuses = [
    'All',
    'Confirming',
    'Accepted',
    'Delivering',
    'Successful',
    'Cancel',
    'Return',
    'DeliveredSuccessfully',
    'ReturnSuccessfully',
];

const Orders = () => {
    const [status, setStatus] = useState('All');
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
    const axiosPrivate = useAxiosPrivate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [total, setTotal] = useState(0);
    const [load, setLoad] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [current, setCurrent] = useState<string>('');
    const [orderId, setOrderId] = useState<string>('');
    const [active, setActive] = useState<boolean>(false);
    const [item, setItem] = useState<ItemCart>();
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [pageNum, setPageNum] = useState(1);
    const router = useRouter();
    console.log(pageNum);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchAll = async () => {
            setLoading(true);
            const { data } = await axiosPrivate.get(`/orders/find/by-user?pageSize=4&pageNumber=${pageNum}&user=${id}`);
            if (data.success) {
                setOrders(data.data);
                setTotal(data.total);
                setCount(data.pages);
                setLoading(false);
            }
        };
        const fetchStatus = async () => {
            setLoading(true);

            const { data } = await axiosPrivate.get(
                `/orders/find/by-user-status?pageSize=4&pageNumber=${pageNum}&user=${id}&status=${status}`,
            );
            if (data.success) {
                setOrders(data.data);
                setTotal(data.total);
                setCount(data.pages);
                setLoading(false);
            }
        };
        if (status === 'All') fetchAll();
        else fetchStatus();
    }, [status, load, pageNum]);

    const handleReceived = async (e: MouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation();

        setOrderId(id);
        setOpen(true);
        setCurrent('Received');
    };
    const handleReturn = async (e: MouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation();

        setOrderId(id);
        setOpen(true);
        setCurrent('Return');
    };
    const handleCancel = async (e: MouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation();

        setOrderId(id);
        setOpen(true);
        setCurrent('Cancel');
    };
    const handleReview = (e: MouseEvent<HTMLSpanElement>, product: ItemCart) => {
        e.stopPropagation();

        setActive(true);
        setItem(product);
    };
    return (
        <div className="flex justify-center px-20 mt-10 gap-5">
            <UserNav />

            <div className="w-[1100px] flex flex-col">
                <div className="grid grid-flow-col overflow-x-scroll gap-[18px] shadow-lg scrollbar-hidden mb-5">
                    {statuses &&
                        statuses.map((item, i) => {
                            const isActive = status === item;

                            return (
                                <span
                                    className={`${
                                        item === 'DeliveredSuccessfully' || item === 'ReturnSuccessfully'
                                            ? 'w-[230px]'
                                            : 'w-[140px]'
                                    } text-base h-max block pt-[10px] pb-[12px] font-semibold text-center uppercase hover:text-blue cursor-pointer ${
                                        isActive && 'text-blue border-b-2 border-b-blue'
                                    }`}
                                    onClick={() => {
                                        setStatus(item);
                                        setPageNum(1);
                                    }}
                                    key={i}
                                >
                                    {item} {isActive && `(${total})`}
                                </span>
                            );
                        })}
                </div>
                <div className="flex flex-col gap-5">
                    {loading ? (
                        <Loading />
                    ) : orders.length === 0 ? (
                        <NoData />
                    ) : (
                        orders.map((order) => (
                            <div
                                key={order._id}
                                className="px-[15px] pt-[15px] pb-[10px] shadow-lg cursor-pointer hover:border-2 hover:border-blue"
                                onClick={() => router.push(`orders/${order.orderId}`)}
                            >
                                <div className="flex justify-between mb-[8px]">
                                    <h1 className="ml-[12px] font-bold text-[14px]">ID: {order.orderId}</h1>
                                    <h1 className="mr-[12px] font-bold text-[14px] uppercase">{order.status}</h1>
                                </div>
                                <Border />
                                <div>
                                    {order.items.map((product) => (
                                        <div key={product.product}>
                                            <div className="flex items-center gap-5 my-[10px]">
                                                <Image
                                                    src={product.image}
                                                    alt="Ảnh"
                                                    width={100}
                                                    height={100}
                                                    className="rounded-lg bg-deal"
                                                />

                                                <div className="w-full font-medium text-lg">
                                                    <div className="flex justify-between">
                                                        <span>{product.name}</span>
                                                        {order.status === 'Successful' && (
                                                            <span
                                                                className="text-blue text-[14px] opacity-60 hover:opacity-100"
                                                                onClick={(e) => handleReview(e, product)}
                                                            >
                                                                Submit a review
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-[100px] mt-[18px] mb-[14px] text-sm opacity-70">
                                                        <span>Color: {product.color}</span>
                                                        <span>Size: {product.size}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-sm opacity-70">
                                                            Quantity: {product.quantity}
                                                        </span>
                                                        <span className="font-bold text-blue">${product.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Border />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-5 mt-[10px] items-center">
                                    {order.status === 'Cancel' ? (
                                        ''
                                    ) : (
                                        <div className="flex gap-5">
                                            {(order.status === 'DeliveredSuccessfully' ||
                                                order.status === 'Delivering') && (
                                                <button
                                                    className="w-[120px] h-10 bg-blue bg-opacity-50 text-white rounded-md font-bold text-sm hover:bg-opacity-100 hover:text-white"
                                                    onClick={(e) => handleReceived(e, order._id)}
                                                >
                                                    RECEIVED
                                                </button>
                                            )}
                                            {order.status === 'Successful' && (
                                                <button
                                                    className="w-[120px] h-10 bg-blue bg-opacity-50 text-white rounded-md font-bold text-sm hover:bg-opacity-100 hover:text-white"
                                                    onClick={(e) => handleReturn(e, order._id)}
                                                >
                                                    RETURN
                                                </button>
                                            )}
                                            {order.status === 'Confirming' && (
                                                <button
                                                    className="w-[120px] h-10 bg-blue bg-opacity-50 text-white rounded-md font-bold text-sm hover:bg-opacity-100 hover:text-white"
                                                    onClick={(e) => handleCancel(e, order._id)}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    )}
                                    <div className="flex-grow"></div>
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
                        ))
                    )}
                </div>
                {!loading && <Pagetination pageNum={pageNum} setPageNum={setPageNum} pages={count} />}
            </div>
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
            {active && <Review item={item as ItemCart} setActive={setActive} id={id} />}
        </div>
    );
};

export default Orders;
