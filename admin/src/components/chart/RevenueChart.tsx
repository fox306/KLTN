'use client';
import { getDetailRevenueThisWeek, getDetailTotalOrderThisWeek } from '@/slices/revenueSlice';
import { detailTotal } from '@/types/type';
import { AppDispatch } from '@/utils/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';

type Props = {
    path: string;
};

const RevenueChart = ({ path }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { detailWeek }: { detailWeek: detailTotal } = useSelector((state: any) => state.revenue);

    useEffect(() => {
        if (path == 'Revenue') {
            dispatch(getDetailRevenueThisWeek());
        } else {
            dispatch(getDetailTotalOrderThisWeek());
        }
    }, [dispatch]);

    console.log(detailWeek);

    return (
        <div className="flex justify-between">
            <div className="px-10 py-5 shadow-revenue bg-white w-[600px]">
                <div className="flex justify-between items-center mb-[50px]">
                    <span className="font-bold">Revenue - Bar Chart</span>
                    <span className="font-medium text-sm opacity-60">This week</span>
                </div>
                <div className="">
                    <BarChart
                        width={500}
                        height={200}
                        data={detailWeek}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={20}
                    >
                        <XAxis dataKey="day" scale="point" padding={{ left: 10, right: 10 }} />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="total" fill="#8884d8" background={{ fill: '#eee' }} />
                    </BarChart>
                </div>
            </div>
            <div className="px-10 py-5 shadow-revenue bg-white w-[600px]">
                <div className="flex justify-between items-center mb-[50px]">
                    <span className="font-bold">Revenue - Area Chart</span>
                    <span className="font-medium text-sm opacity-60">This week</span>
                </div>
                <div className="">
                    <AreaChart
                        width={500}
                        height={200}
                        data={detailWeek}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </div>
            </div>
        </div>
    );
};

export default RevenueChart;
