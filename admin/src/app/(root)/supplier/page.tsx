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
import UpdateSupplier from '@/components/form/UpdateSupplier';
import Loading from '@/components/shared/Loading';

const theme = createTheme({
    palette: {
        primary: {
            main: '#40BFFF',
        },
    },
});

const SupplierPage = () => {
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [load, setLoad] = useState(false);
    const [pages, setPages] = useState(1);
    const [count, setCount] = useState(1);
    const [banks, setBanks] = useState<
        {
            _id: string;
            bank_name: string;
        }[]
    >([{ _id: '', bank_name: '' }]);

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [supplier, setSupplier] = useState<Supplier>({
        address: '',
        billing_infomation: {
            bank: '',
            bank_account: '',
            method: '',
        },
        contacter_name: '',
        email: '',
        phone: '',
        supplier_name: '',
    });

    const [loading, setLoading] = useState(true);
    const handleChangePage = (i: number) => {
        setPages(i);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(`/good-receipts/suppliers?pageSize=6&pageNumber=${pages}`);
            if (data.success) {
                setSuppliers(data.data);
                setCount(data.pages);
                setLoading(false);
            }
        };
        const fetchBanks = async () => {
            const { data } = await axios.get('/utils/banks');
            setBanks(data.result);
        };
        fetchBanks();
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
                {loading ? (
                    <Loading />
                ) : (
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
                                {suppliers &&
                                    suppliers.map((item, i) => (
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
                                            <TableCell align="center">
                                                <SearchOutlinedIcon
                                                    onClick={() => {
                                                        {
                                                            setSupplier(item);
                                                            setOpen1(true);
                                                        }
                                                    }}
                                                    className="text-blue cursor-pointer hover:opacity-50"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>
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
            {open && <CreateNewSupplier setLoad={setLoad} setOpen={setOpen} banks={banks} />}
            {open1 && (
                <UpdateSupplier
                    setLoad={setLoad}
                    setOpen={setOpen1}
                    supplier={supplier as Supplier}
                    setSupplier={setSupplier}
                    banks={banks}
                />
            )}
        </div>
    );
};

export default SupplierPage;
