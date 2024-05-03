'use client';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Coupon } from '@/types/type';
import axios from '@/utils/axios';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

const theme = createTheme({
    palette: {
        primary: {
            main: '#40BFFF',
        },
    },
});

const CouponsPage = () => {
    const router = useRouter();

    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pages, setPages] = useState(0);
    const [checkedAll, setCheckedAll] = useState<boolean>(false);
    const [selected, setSelected] = useState<Coupon[]>([]);

    const handleChangePage = (i: number) => {
        setPageNumber(i);
    };

    const handleFilterData = (data: Coupon[]) => {
        const filterData = data.filter((item) => {
            return item.selected;
        });
        setSelected(filterData);
    };
    const handleSelectedItem = (item: Coupon) => {
        const selectedItem = coupons?.map((data) => {
            if (item._id === data._id) {
                return {
                    ...data,
                    selected: !data.selected,
                };
            } else return data;
        });
        setCoupons(selectedItem);
        handleFilterData(selectedItem);
    };

    const handleSelectedAll = () => {
        const filterCart = coupons?.map((data) => {
            if (checkedAll) {
                return {
                    ...data,
                    selected: false,
                };
            } else {
                return {
                    ...data,
                    selected: true,
                };
            }
        });
        setCoupons(filterCart);
        handleFilterData(filterCart);
    };
    const validateSelectedAll = () => {
        const data = coupons?.every((item) => item.selected === true);
        setCheckedAll(data);
    };

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/coupons?pageSize=${5}&pageNumber=${pageNumber}`);
            if (data.success) {
                setCheckedAll(false);
                setCoupons(data.data);
                setPages(data.pages);
            }
        };
        fetchData();
    }, [pageNumber]);

    useEffect(() => {
        validateSelectedAll();
    }, [selected]);
    return (
        <div>
            <div>
                <button
                    onClick={() => router.push('/coupons/addnew')}
                    className="w-[150px] h-[50px] bg-blue bg-opacity-60 text-white font-bold text-xs rounded-[5px] hover:bg-opacity-100 mb-[10px]"
                >
                    Add new
                </button>
            </div>
            {coupons && coupons.length === 0 ? (
                <div className="font-semibold text-2xl">No Coupons</div>
            ) : (
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead className="mb-[10px]">
                                <TableRow>
                                    <TableCell align="left">
                                        <input
                                            type="checkbox"
                                            className="w-[26px] h-[26px]"
                                            checked={checkedAll}
                                            onChange={handleSelectedAll}
                                        />
                                    </TableCell>
                                    <TableCell align="center">Code</TableCell>
                                    <TableCell align="center">Name of Coupon</TableCell>
                                    <TableCell align="center">Value</TableCell>
                                    <TableCell align="center">Time Remaining</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {coupons &&
                                    coupons.map((item, i) => (
                                        <TableRow>
                                            <TableCell align="left">
                                                <input
                                                    type="checkbox"
                                                    className="w-[26px] h-[26px]"
                                                    checked={item.selected}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSelectedItem(item);
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">{item.code}</TableCell>
                                            <TableCell align="center">{item.name}</TableCell>
                                            <TableCell align="center">
                                                {item.value} {item.type === 'percent' ? '%' : '$'}
                                            </TableCell>
                                            <TableCell align="center">{item.validityDuration}</TableCell>
                                            <TableCell align="center">{item.status}</TableCell>
                                            <TableCell align="center">{item.status}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
            {pages !== 0 && (
                <div className="flex justify-center shadow-product2 bg-white">
                    <ThemeProvider theme={theme}>
                        <Pagination
                            count={pages}
                            shape="rounded"
                            onChange={(_, page: number) => handleChangePage(page)}
                            color="primary"
                        />
                    </ThemeProvider>
                </div>
            )}
        </div>
    );
};

export default CouponsPage;
