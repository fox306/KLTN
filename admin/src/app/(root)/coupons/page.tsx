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
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCoupon from '@/components/form/AddCoupon';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import SureForCoupon from '@/components/shared/SureForCoupon';
import Image from 'next/image';
import Loading from '@/components/shared/Loading';

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
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);
    const [id, setId] = useState<string>('');
    const [action, setAction] = useState<string>('');
    const [open1, setOpen1] = useState(false);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');

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
        const selectedItem = coupons.map((data) => {
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
        const filterCoupon = coupons.map((data) => {
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
        setCoupons(filterCoupon);
        handleFilterData(filterCoupon);
    };
    const validateSelectedAll = () => {
        const data = coupons?.every((item) => item.selected === true);
        setCheckedAll(data);
    };
    const handleUnLock = (id: string) => {
        setOpen1(true);
        setAction('UnLock');
        setId(id);
    };
    const handleLock = (id: string) => {
        setOpen1(true);
        setAction('Lock');
        setId(id);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(`/coupons?pageSize=${5}&pageNumber=${pageNumber}`);
            if (data.success) {
                setCheckedAll(false);
                setCoupons(data.data);
                setPages(data.pages);
                setLoading(false);
            }
        };
        if (!text) {
            fetchData();
        } else {
            return;
        }
    }, [text, load, pageNumber]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(
                `/coupons/find/by-keyword?pageSize=5&pageNumber=${pageNumber}&keyword=${text}`,
            );
            if (data.success) {
                setCheckedAll(false);
                setCoupons(data.data);
                setPages(data.pages);
                setLoading(false);
            }
        };
        if (text) {
            fetchData();
        }
    }, [text, load, pageNumber]);

    useEffect(() => {
        validateSelectedAll();
    }, [selected]);
    return (
        <div>
            <div className="mt-5 mb-[10px] flex gap-5">
                <div className="flex-1 h-[50px] flex px-[15px] items-center bg-white shadow-product2">
                    <input
                        type="text"
                        className="flex-1 font-bold text-sm outline-none"
                        placeholder="Search Something..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <SearchOutlinedIcon className="text-2xl ml-[15px] text-blue hover:opacity-60 cursor-pointer" />
                </div>
                <button
                    onClick={() => setOpen(true)}
                    className="w-[150px] h-[50px] bg-blue bg-opacity-60 text-white font-bold text-xs rounded-[5px] hover:bg-opacity-100 mb-[10px]"
                >
                    Add new
                </button>
            </div>
            {coupons && coupons.length === 0 ? (
                <div className="flex justify-center items-center">
                    <Image src="/noData.jpg" alt="No Data" width={300} height={300} className="rounded-[5px]" />
                </div>
            ) : (
                <div>
                    {loading ? (
                        <Loading />
                    ) : (
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
                                        <TableCell align="center">Time Remaining (day)</TableCell>
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
                                                <TableCell
                                                    align="center"
                                                    className={`${
                                                        item.status !== 'Active' ? 'text-red' : 'text-green'
                                                    }`}
                                                >
                                                    {item.status !== 'Active' ? (
                                                        <LockRoundedIcon
                                                            onClick={() => handleUnLock(item._id)}
                                                            className="cursor-pointer hover:text-green"
                                                        />
                                                    ) : (
                                                        <LockOpenRoundedIcon
                                                            onClick={() => handleLock(item._id)}
                                                            className="cursor-pointer hover:text-red"
                                                        />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </div>
            )}
            {pages !== 0 && (
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
            {open && <AddCoupon setLoad={setLoad} setOpen={setOpen} />}
            {open1 && (
                <SureForCoupon
                    action={action}
                    id={id}
                    setAction={setAction}
                    setId={setId}
                    setLoad={setLoad}
                    setOpen1={setOpen1}
                />
            )}
        </div>
    );
};

export default CouponsPage;
