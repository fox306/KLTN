'use client';
import UserNav from '@/components/shared/UserNav';
import { Coupon, User } from '@/types/type';
import axios from '@/utils/axios';
import useAxiosPrivate from '@/utils/intercepter';
import { CircularProgress } from '@mui/material';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NoData from '@/components/shared/NoData';
import { formatCurrency } from '@/utils/convertMoney';
import Loading from '@/components/shared/Loading';

const statuses = ['ALL', 'VALID', 'EXPIRED'];

const theme = createTheme({
    palette: {
        primary: {
            main: '#40BFFF',
        },
    },
});

const DiscountPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const [status, setStatus] = useState('ALL');
    const [loading, setLoading] = useState(true);
    const [coupon, setCoupon] = useState<Coupon[]>();
    const [pageNumber, setPageNumber] = useState(1);
    const [pages, setPages] = useState(1);
    const handleChangePage = (i: number) => {
        setPageNumber(i);
    };

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

    useEffect(() => {
        setLoading(true);
        const fetchAll = async () => {
            const { data } = await axiosPrivate.get(`/coupons/find/by-user?pageSize=5&pageNumber=1&user=${id}`);
            if (data.success) {
                setCoupon(data.data);
                setPages(data.pages);
                setLoading(false);
            }
        };
        const fetchStatus = async () => {
            const { data } = await axiosPrivate.get(
                `/coupons/find/by-user/by-status?user=${id}&pageSize=5&pageNumber=1&status=${status}`,
            );
            if (data.success) {
                setCoupon(data.data);
                setPages(data.pages);
                setLoading(false);
            }
        };
        if (status === 'ALL') {
            fetchAll();
        } else {
            fetchStatus();
        }
    }, [status]);
    return (
        <div className="flex justify-center px-20 mt-10 gap-5">
            <UserNav />
            <div className="flex flex-col items-center">
                <div className="flex gap-[18px] shadow-lg w-full mb-5">
                    {statuses &&
                        statuses.map((item, i) => {
                            const isActive = status === item;
                            return (
                                <span
                                    className={`w-1/3 text-base h-max block pt-[10px] pb-[12px] font-semibold text-center uppercase hover:text-blue cursor-pointer ${
                                        isActive && 'text-blue border-b-2 border-b-blue'
                                    }`}
                                    onClick={() => setStatus(item)}
                                    key={i}
                                >
                                    {item}
                                </span>
                            );
                        })}
                </div>

                <div className="flex flex-col w-[1100px] mb-[10px]">
                    {loading ? (
                        <Loading />
                    ) : coupon && coupon.length === 0 ? (
                        <NoData />
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {coupon &&
                                coupon.map((item) => (
                                    <div
                                        key={item._id}
                                        className="border h-[116px] p-4 flex flex-col justify-center items-center"
                                    >
                                        <div className="flex items-center justify-between font-bold text-lg w-full">
                                            <span>Code: {item.code} </span>
                                            <span>Name: {item.name} </span>
                                        </div>
                                        <span className="font-semibold">
                                            Minimum Orders: {formatCurrency(item.minAmount)}
                                        </span>
                                        <span className="font-semibold">
                                            Maximum Discount: {formatCurrency(item.maxDiscount)}
                                        </span>

                                        <span>Effective from: {format(new Date(item.startDate), 'dd-MM-yyyy')}</span>
                                        <span>Expried Day: {format(new Date(item.endDate), 'dd-MM-yyyy')}</span>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
                {!loading && (
                    <div className="flex justify-center shadow-product2 bg-white">
                        <ThemeProvider theme={theme}>
                            <Pagination
                                count={pages}
                                shape="rounded"
                                onChange={(_, page: number) => handleChangePage(page)}
                                page={pageNumber}
                                color="primary"
                            />
                        </ThemeProvider>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiscountPage;
