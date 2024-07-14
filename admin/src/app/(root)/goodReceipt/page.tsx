'use client';
import React, { useEffect, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateNewSupplier from '@/components/form/CreateNewSupplier';
import { useRouter } from 'next/navigation';
import { Receipt } from '@/types/type';
import axios from '@/utils/axios';
import Image from 'next/image';
import Loading from '@/components/shared/Loading';

const theme = createTheme({
    palette: {
        primary: {
            main: '#40BFFF',
        },
    },
});

const GoodReceiptPage = () => {
    const router = useRouter();

    const [pages, setPages] = useState(1);
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');

    const [receipts, setReceipts] = useState<Receipt[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(`/good-receipts/receipts?pagesize=6&pageNumber=${pages}`);
            if (data.success) {
                setReceipts(data.data);
                setCount(data.pages);
                setLoading(false);
            }
        };
        fetchData();
    }, [pages]);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(
                `/good-receipts/receipts/find/by-keyword?pagesize=6&pageNumber=${pages}&keyword=${text}`,
            );
            if (data.success) {
                setReceipts(data.data);
                setCount(data.pages);
                setLoading(false);
            }
        };
        if (text) {
            fetchData();
        }
    }, [text, pages]);
    const handleChangePage = (i: number) => {
        setPages(i);
    };
    return (
        <div>
            <div className="text-center">
                <span className="font-bold text-lg">MANAGEMENT GOOD RECEIPTS</span>
            </div>
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
                    className="w-[200px] h-[50px] bg-blue bg-opacity-60 hover:bg-opacity-100 rounded-[5px] text-white"
                    onClick={() => router.push('/goodReceipt/createReceipt')}
                >
                    Create New Receipt
                </button>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead className="mb-[10px]">
                                <TableRow>
                                    <TableCell align="center" className="font-bold text-sm">
                                        STT
                                    </TableCell>
                                    <TableCell align="center" className="font-bold text-sm">
                                        Receipt Id
                                    </TableCell>
                                    <TableCell align="center" className="font-bold text-sm">
                                        Supplier Name
                                    </TableCell>
                                    <TableCell align="center" className="font-bold text-sm">
                                        Confimer
                                    </TableCell>
                                    <TableCell align="center" className="font-bold text-sm">
                                        Confirmation Date
                                    </TableCell>
                                    <TableCell align="center" className="font-bold text-sm">
                                        Total Receipt
                                    </TableCell>
                                    <TableCell align="center" className="font-bold text-sm">
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {receipts &&
                                    receipts.map((item, i) => (
                                        <TableRow>
                                            <TableCell align="center" className="text-sm font-bold">
                                                {i + 1}
                                            </TableCell>
                                            <TableCell align="center" className="text-sm">
                                                {item.receiptId}
                                            </TableCell>
                                            <TableCell align="center" className="text-sm">
                                                {item.supplier}
                                            </TableCell>
                                            <TableCell align="center" className="text-sm">
                                                {item.confirmer}
                                            </TableCell>
                                            <TableCell align="center" className="text-sm">
                                                {item.confirmation_date}
                                            </TableCell>
                                            <TableCell align="center" className="text-sm font-bak text-orange">
                                                ${item.total_receipt}
                                            </TableCell>
                                            <TableCell align="center">
                                                <SearchOutlinedIcon
                                                    className="text-blue cursor-pointer hover:opacity-50"
                                                    onClick={() => router.push(`/goodReceipt/${item.receiptId}`)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
            {!loading && (
                <div className="flex justify-center shadow-product2 bg-white mt-[10px]">
                    <ThemeProvider theme={theme}>
                        <Pagination
                            count={count}
                            shape="rounded"
                            onChange={(_, page: number) => handleChangePage(page)}
                            page={pages}
                            color="primary"
                        />
                    </ThemeProvider>
                </div>
            )}
        </div>
    );
};

export default GoodReceiptPage;
