'use client';
import {
    getRevenueThisMonth,
    getRevenueThisWeek,
    getRevenueToday,
    getToTalUser,
    getToTalUserThisMonth,
    getTotalOrderThisMonth,
    getTotalOrderThisWeek,
    getTotalOrderToday,
    getTotalProductSoldThisMonth,
    getTotalProductSoldThisWeek,
    getTotalProductSoldToday,
    getTotalUserThisWeek,
} from '@/slices/revenueSlice';
import { total } from '@/types/type';
import { AppDispatch } from '@/utils/store';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
    path: string;
};

const Revenue = ({ path }: Props) => {
    const dispath = useDispatch<AppDispatch>();
    const { today, thisWeek, thisMonth }: { today: total; thisWeek: total; thisMonth: total } = useSelector(
        (state: any) => state.revenue,
    );
    useEffect(() => {
        if (path == 'Revenue') {
            dispath(getRevenueToday());
            dispath(getRevenueThisWeek());
            dispath(getRevenueThisMonth());
        } else if (path == 'New Users') {
            dispath(getToTalUser());
            dispath(getTotalUserThisWeek());
            dispath(getToTalUserThisMonth());
        } else if (path === 'Total Orders') {
            dispath(getTotalOrderToday());
            dispath(getTotalOrderThisWeek());
            dispath(getTotalOrderThisMonth());
        } else {
            dispath(getTotalProductSoldToday());
            dispath(getTotalProductSoldThisWeek());
            dispath(getTotalProductSoldThisMonth());
        }
    }, [dispath]);
    return (
        <div className="flex justify-between ">
            <div className="p-5 w-[400px] flex flex-col items-center shadow-revenue bg-white ">
                <div className="flex items-center justify-between w-full">
                    <span className="font-bold">{path}</span>
                    <span className="font-medium text-sm opacity-60">Today</span>
                </div>
                <div className="flex gap-[50px] mt-5">
                    <Image
                        src={`${today.percent >= 0 ? '/increase.png' : '/decrease.png'}`}
                        alt="increase"
                        width={54}
                        height={54}
                        className={`border-4 ${today.percent >= 0 ? 'border-[#00BE98]' : 'border-red'}`}
                    />
                    <div className="flex flex-col gap-[6px] items-center">
                        <span className={`text-3xl ${today.percent >= 0 ? 'text-[#00BE98]' : 'text-red'} font-bak`}>
                            {today.total}
                            {path === 'Revenue' ? '₫' : ''}
                        </span>
                        <div className="text-sm flex items-center gap-1">
                            <span>{today.percent >= 0 ? 'Increase' : 'Decrease'}</span>
                            <span className={`font-bold ${today.percent >= 0 ? 'text-[#00BE98]' : 'text-red'}`}>
                                {today.percent >= 0 ? '+' : ''}
                                {today.percent}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-5 w-[400px] flex flex-col items-center shadow-revenue bg-white">
                <div className="flex items-center justify-between w-full">
                    <span className="font-bold">{path}</span>
                    <span className="font-medium text-sm opacity-60">This Week</span>
                </div>
                <div className="flex gap-[50px] mt-5">
                    <Image
                        src={`${thisWeek.percent >= 0 ? '/increase.png' : '/decrease.png'}`}
                        alt="increase"
                        width={54}
                        height={54}
                        className={`border-4 ${thisWeek.percent >= 0 ? 'border-[#00BE98]' : 'border-red'}`}
                    />
                    <div className="flex flex-col gap-[6px] items-center">
                        <span className={`text-3xl ${thisWeek.percent >= 0 ? 'text-[#00BE98]' : 'text-red'} font-bak`}>
                            {thisWeek.total} {path === 'Revenue' ? '₫' : ''}
                        </span>
                        <div className="text-sm flex items-center gap-1">
                            <span>{thisWeek.percent >= 0 ? 'Increase' : 'Decrease'}</span>
                            <span className={`font-bold ${thisWeek.percent >= 0 ? 'text-[#00BE98]' : 'text-red'}`}>
                                {thisWeek.percent >= 0 ? '+' : ''}
                                {thisWeek.percent}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-5 w-[400px] flex flex-col items-center shadow-revenue bg-white">
                <div className="flex items-center justify-between w-full">
                    <span className="font-bold">{path}</span>
                    <span className="font-medium text-sm opacity-60">This Month</span>
                </div>
                <div className="flex gap-[50px] mt-5">
                    <Image
                        src={`${thisMonth.percent >= 0 ? '/increase.png' : '/decrease.png'}`}
                        alt="increase"
                        width={54}
                        height={54}
                        className={`border-4 ${thisMonth.percent >= 0 ? 'border-[#00BE98]' : 'border-red'}`}
                    />
                    <div className="flex flex-col gap-[6px] items-center">
                        <span className={`text-3xl ${thisMonth.percent >= 0 ? 'text-[#00BE98]' : 'text-red'} font-bak`}>
                            {thisMonth.total}
                            {path === 'Revenue' ? '₫' : ''}
                        </span>
                        <div className="text-sm flex items-center gap-1">
                            <span>{thisMonth.percent >= 0 ? 'Increase' : 'Decrease'}</span>
                            <span className={`font-bold ${thisMonth.percent >= 0 ? 'text-[#00BE98]' : 'text-red'}`}>
                                {thisMonth.percent >= 0 ? '+' : ''}
                                {thisMonth.percent}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Revenue;
