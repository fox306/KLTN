'use client';
import UserNav from '@/components/shared/UserNav';
import { Coupon, User } from '@/types/type';
import axios from '@/utils/axios';
import React, { useEffect, useState } from 'react';

const DiscountPage = () => {
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

    const [coupon, setCoupon] = useState<Coupon[]>();
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/coupons/${id}`);
            if (data.success) {
                setCoupon(data.data);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="flex justify-center px-20 mt-10 gap-5">
            <UserNav />
            <div className="flex flex-col w-[1100px]">
                <div className="grid grid-cols-2 gap-4">
                    {coupon &&
                        coupon.map((item) => (
                            <div className="border h-[116px] p-4 flex flex-col justify-center items-center">
                                <div className="flex items-center justify-between font-bold text-lg w-full">
                                    <span>Code: {item.code} </span>
                                    <span>Name: {item.name} </span>
                                </div>
                                <span className="font-semibold">Minimum Orders: {item.minAmount}</span>

                                <span>Effective from: {item.startDate}</span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default DiscountPage;
