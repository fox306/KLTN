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
import axios from '@/utils/axios';
import { Supplier } from '@/types/type';

const theme = createTheme({
    palette: {
        primary: {
            main: '#40BFFF',
        },
    },
});

const SupplierPage = () => {
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);
    const [pages, setPages] = useState(1);
    const [count, setCount] = useState(1);

    const [supliers, setSupliers] = useState<Supplier[]>([]);
    const handleChangePage = (i: number) => {
        setPages(i);
    };

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/good-receipts/suppliers?pageSize=6&pageNumber=${pages}`);
            if (data.success) {
                setSupliers(data.data);
                setCount(data.pages);
            }
        };
        fetchData();
    }, [load, pages]);
    return (
        <div>
            <div className="text-center">
                <span className="font-bold text-lg">MANAGEMENT SUPPLIER</span>
            </div>
            <div className="mt-5 mb-[10px] flex gap-5">
                <div className="flex-1 h-[50px] flex px-[15px] items-center bg-white shadow-product2">
                    <input
                        type="text"
                        className="flex-1 font-bold text-sm outline-none"
                        placeholder="Search Something..."
                    />
                    <SearchOutlinedIcon className="text-2xl ml-[15px] text-blue hover:opacity-60 cursor-pointer" />
                </div>
                <button
                    className="w-[200px] h-[50px] bg-blue bg-opacity-60 hover:bg-opacity-100 rounded-[5px] text-white"
                    onClick={() => setOpen(true)}
                >
                    Create New Supplier
                </button>
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead className="mb-[10px]">
                            <TableRow>
                                <TableCell align="center" className="font-bold text-sm">
                                    STT
                                </TableCell>
                                <TableCell align="center" className="font-bold text-sm">
                                    Supplier Name
                                </TableCell>
                                <TableCell align="center" className="font-bold text-sm">
                                    Contacter Name
                                </TableCell>
                                <TableCell align="center" className="font-bold text-sm">
                                    Email
                                </TableCell>
                                <TableCell align="center" className="font-bold text-sm">
                                    Phone
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
                            {supliers &&
                                supliers.map((item, i) => (
                                    <TableRow>
                                        <TableCell align="center" className="text-sm font-bold">
                                            {i + 1}
                                        </TableCell>
                                        <TableCell align="center" className="text-sm">
                                            {item.supplier_name}
                                        </TableCell>
                                        <TableCell align="center" className="text-sm">
                                            {item.contacter_name}
                                        </TableCell>
                                        <TableCell align="center" className="text-sm">
                                            {item.email}
                                        </TableCell>
                                        <TableCell align="center" className="text-sm">
                                            {item.phone}
                                        </TableCell>
                                        <TableCell align="center" className="text-sm">
                                            {item.total_receipt}
                                        </TableCell>
                                        <TableCell align="center" className="text-blue">
                                            <SearchOutlinedIcon />
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
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
            {open && <CreateNewSupplier setLoad={setLoad} setOpen={setOpen} />}
        </div>
    );
};

export default SupplierPage;
