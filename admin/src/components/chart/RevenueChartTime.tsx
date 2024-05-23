'use client';
import React, { useEffect, useRef, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { day, detailMonth } from '@/types/type';
import { useSelector } from 'react-redux';
import {
    getDetailRevenueOfMonth,
    getDetailTotalNewUserOfMonth,
    getDetailTotalOrderOfMonth,
    getDetailTotalProductSoldOfMonth,
} from '@/slices/revenueSlice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

type Props = {
    path: string;
};

const RevenueChartTime = ({ path }: Props) => {
    const [chart, setChart] = useState<string>('Bar Chart');
    const date = new Date();
    const monthx = date.getMonth() + 1;
    const [month, setMonth] = useState<number>(monthx);
    const [currentMonth, setCurrentMonth] = useState<string>(months[monthx - 1]);
    const [year, setYear] = useState<number>(parseInt('2024', 10));
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 23 }, (_, index) => currentYear - index);
    // const [width, setWidth] = useState<number>();

    const handleChangeChart = (event: SelectChangeEvent) => {
        setChart(event.target.value as string);
    };
    const handleChangeYear = (event: SelectChangeEvent) => {
        const selectedYear = parseInt(event.target.value, 10);
        setYear(selectedYear);
    };
    const handleChangeMonth = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value;
        const selectedIndex = months.findIndex((item) => item === selectedValue);
        setMonth(selectedIndex + 1);
        setCurrentMonth(event.target.value as string);
    };

    const dispath = useDispatch<AppDispatch>();
    const { detailMonth }: { detailMonth: detailMonth } = useSelector((state: any) => state.revenue);

    const divRef = useRef<HTMLDivElement>(null);
    console.log(divRef);
    useEffect(() => {
        const item: day = {
            month: month,
            year: year,
        };
        console.log(item);
        if (path === 'Revenue') {
            dispath(getDetailRevenueOfMonth(item));
        } else if (path === 'New Users') {
            dispath(getDetailTotalNewUserOfMonth(item));
        } else if (path === 'Total Orders') {
            dispath(getDetailTotalOrderOfMonth(item));
        } else {
            dispath(getDetailTotalProductSoldOfMonth(item));
        }
    }, [dispath, month, year]);
    const width = divRef.current?.offsetWidth;
    console.log(width);

    return (
        <div ref={divRef}>
            <div className="flex justify-between items-center">
                <span className="font-bold ml-10">{path}</span>
                <div>
                    <Select
                        className="font-medium text-sm text-black"
                        id="chart"
                        variant="standard"
                        value={chart}
                        onChange={handleChangeChart}
                    >
                        <MenuItem value="Bar Chart">Bar Chart</MenuItem>
                        <MenuItem value="Area Chart">Area Chart</MenuItem>
                    </Select>
                </div>
                <div className="mr-[30px] flex gap-4">
                    <div>
                        <Select
                            className="font-medium text-sm text-black"
                            variant="standard"
                            id="year"
                            value={year.toString()}
                            onChange={handleChangeYear}
                        >
                            {years.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className="mr-[40px]">
                        <Select
                            className="font-medium text-sm text-black"
                            variant="standard"
                            id="month"
                            value={currentMonth}
                            onChange={handleChangeMonth}
                        >
                            {months.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>
            <div className="w-full">
                {chart === 'Bar Chart' ? (
                    <BarChart
                        width={width}
                        height={200}
                        data={detailMonth}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={20}
                        className="w-full"
                    >
                        <XAxis dataKey="date" scale="point" padding={{ left: 10, right: 10 }} />
                        <YAxis />
                        <Tooltip />

                        <Bar dataKey="total" fill="#8884d8" background={{ fill: '#eee' }} />
                    </BarChart>
                ) : (
                    <AreaChart
                        width={width}
                        height={200}
                        data={detailMonth}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                        className="w-full"
                    >
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                )}
            </div>
        </div>
    );
};

export default RevenueChartTime;
