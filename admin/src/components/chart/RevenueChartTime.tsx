'use client';
import React, { useEffect, useRef, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { brandYear, Category, cateYear, day, detailMonth, detailMonthCB, eachBrand, eachCate } from '@/types/type';
import { useSelector } from 'react-redux';
import {
    detailBrand,
    detailCate,
    getDetailRevenueOfMonth,
    getDetailTotalNewUserOfMonth,
    getDetailTotalOrderOfMonth,
    getDetailTotalProductSoldOfMonth,
    getEachBrand,
    getEachCate,
} from '@/slices/revenueSlice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { usePathname } from 'next/navigation';
import CustomBarChart from '../shared/CustomBarChart';
import CustomAreaChart from '../shared/CustomAreaChart';
import axios from '@/utils/axios';

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
const brands = ['Nike', 'Vans', 'Puma', 'Adidas', 'Converse', 'Balenciaga'];

type Props = {
    path: string;
};

const RevenueChartTime = ({ path }: Props) => {
    const [chart, setChart] = useState<string>('Bar Chart');
    const [brand, setBrand] = useState<string>('Nike');
    const [category, setCategory] = useState<Category[]>([]);
    const [cate, setCate] = useState<string>('');
    const date = new Date();
    const monthx = date.getMonth() + 1;
    const [month, setMonth] = useState<number>(monthx);
    const [currentMonth, setCurrentMonth] = useState<string>(months[monthx - 1]);
    const [year, setYear] = useState<number>(parseInt('2024', 10));
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 23 }, (_, index) => currentYear - index);
    // const [width, setWidth] = useState<number>();
    const [data, setData] = useState<any>();
    const handleChangeChart = (event: SelectChangeEvent) => {
        setChart(event.target.value as string);
    };
    const handleChangeBrand = (event: SelectChangeEvent) => {
        setBrand(event.target.value as string);
    };
    const handleChangeCate = (event: SelectChangeEvent) => {
        setCate(event.target.value as string);
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
    const {
        detailMonth,
        eachBrand,
        eachCate,
        detailMonthCB,
    }: { detailMonth: detailMonth; eachBrand: eachBrand; eachCate: eachCate; detailMonthCB: detailMonthCB } =
        useSelector((state: any) => state.revenue);

    const divRef = useRef<HTMLDivElement>(null);
    console.log(divRef);
    useEffect(() => {
        const item1: day = {
            month: month,
            year: year,
        };
        const item2: brandYear = {
            brand: brand,
            year: year,
        };
        const item3: cateYear = {
            category: cate,
            year: year,
        };
        console.log(item3);
        if (path === 'Brand & No Month' || path === 'Brand') {
            dispath(getEachBrand(item1));
            dispath(detailBrand(item2));
        } else if (path === 'Cate & No Month' || path === 'Cate') {
            dispath(getEachCate(item1));
            if (cate !== '') {
                console.log(item3);
                dispath(detailCate(item3));
            }
        } else if (path === 'New Users') {
            dispath(getDetailTotalNewUserOfMonth(item1));
        } else if (path === 'Total Orders') {
            dispath(getDetailTotalOrderOfMonth(item1));
        } else {
            dispath(getDetailTotalProductSoldOfMonth(item1));
        }
    }, [dispath, month, year, cate]);
    const width = divRef.current?.offsetWidth;
    console.log(data);
    useEffect(() => {
        if (path === 'Brand & No Month' || path === 'Cate & No Month') {
            setData(detailMonthCB);
        } else if (path === 'Cate') {
            setData(eachCate);
        } else if (path === 'Brand') {
            setData(eachBrand);
        } else {
            setData(detailMonth);
        }
    }, [detailMonth, eachBrand, eachCate, detailMonthCB]);
    console.log(detailMonthCB);
    useEffect(() => {
        const fetchCate = async () => {
            const { data } = await axios.get('/categories');
            if (data.success) {
                setCategory(data.data);
                setCate(data.data[0].name);
            }
        };
        fetchCate();
    }, []);

    return (
        <div ref={divRef} className="shadow-revenue bg-white">
            <div className="flex justify-between items-center mb-[60px]">
                <span className="font-bold ml-10">
                    {((path === 'Brand & No Month' || path === 'Brand') && 'Number Of Brand Sold') ||
                        ((path === 'Cate & No Month' || path === 'Cate') && 'Number Of Category Sold') ||
                        path}
                </span>

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
                    {path === 'Brand & No Month' && (
                        <Select
                            className="font-medium text-sm text-black ml-[48px]"
                            id="chart"
                            variant="standard"
                            value={brand}
                            onChange={handleChangeBrand}
                        >
                            {brands.map((item) => (
                                <MenuItem value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                    )}
                    {path === 'Cate & No Month' && (
                        <Select
                            className="font-medium text-sm text-black ml-[48px]"
                            id="chart"
                            variant="standard"
                            value={cate}
                            onChange={handleChangeCate}
                        >
                            {category.map((item) => (
                                <MenuItem value={item.name}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    )}
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
                    {path !== 'Brand & No Month' && path !== 'Cate & No Month' && (
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
                    )}
                </div>
            </div>
            <div className={`w-full ${path === 'Brand' ? 'px-[150px]' : ''}`}>
                {chart === 'Bar Chart'
                    ? ((path === 'Brand & No Month' || path === 'Cate & No Month') && (
                          <CustomBarChart width={width} data={data} dataX="month" dataY="total" />
                      )) ||
                      (path === 'Cate' && <CustomBarChart width={width} data={data} dataX="category" dataY="sold" />) ||
                      (path === 'Brand' && <CustomBarChart width={width} data={data} dataX="brand" dataY="sold" />) || (
                          <CustomBarChart width={width} data={data} dataX="date" dataY="total" />
                      )
                    : ((path === 'Brand & No Month' || path === 'Cate & No Month') && (
                          <CustomAreaChart width={width} data={data} dataX="month" dataY="total" />
                      )) ||
                      (path === 'Cate' && (
                          <CustomAreaChart width={width} data={data} dataX="category" dataY="sold" />
                      )) ||
                      (path === 'Brand' && (
                          <CustomAreaChart width={width} data={data} dataX="brand" dataY="sold" />
                      )) || <CustomAreaChart width={width} data={data} dataX="date" dataY="total" />}
            </div>
        </div>
    );
};

export default RevenueChartTime;

// tách component xong thêm type vào là oce
// chưa tìm dc cách lấy id
