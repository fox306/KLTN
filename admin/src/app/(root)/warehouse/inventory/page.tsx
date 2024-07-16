'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
import axios from '@/utils/axios';
import { Inventory as I } from '@/types/type';
import Loading from '@/components/shared/Loading';

const theme = createTheme({
    palette: {
        primary: {
            main: '#40BFFF',
        },
    },
});

const Inventory = () => {
    const router = useRouter();
    const [page, setPage] = useState<string>('Inventory');
    const [type, setType] = useState<boolean>(false);
    const [inventories, setInventories] = useState<I[]>([]);
    const [loading, setLoading] = useState(true);

    const [pages, setPages] = useState(1);
    const [count, setCount] = useState(1);

    const handleChange = (event: SelectChangeEvent) => {
        setPage(event.target.value as string);
    };

    const handleChangePage = (i: number) => {
        setPages(i);
    };
    useEffect(() => {
        if (page === 'Management') {
            router.push('/warehouse/manage');
        }
        if (page === 'Statistical') {
            router.push('/warehouse');
        }
    }, [page]);
    useEffect(() => {
        const fetchNoSort = async () => {
            setLoading(true);
            const { data } = await axios.get(`/revenue/inventory?pageSize=6&pageNumber=${pages}`);
            if (data.success) {
                setInventories(data.data);
                setLoading(false);
                setCount(data.pages);
            }
        };
        const fetchSort = async () => {
            setLoading(true);
            const { data } = await axios.get(`/revenue/inventory?pageSize=6&pageNumber=${pages}&sort=LOWSTOCK`);
            if (data.success) {
                setInventories(data.data);
                setLoading(false);
                setCount(data.pages);
            }
        };
        if (!type) {
            fetchNoSort();
        } else {
            fetchSort();
        }
    }, [type, pages]);
    console.log(type);
    return (
        <div>
            <FormControl className="w-[150px]">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={page}
                    label="Page"
                    onChange={handleChange}
                    variant="standard"
                    className="font-bold text-lg"
                >
                    <MenuItem value="Statistical">Statistical</MenuItem>
                    <MenuItem value="Management">Management</MenuItem>
                    <MenuItem value="Inventory">Inventory</MenuItem>
                </Select>
            </FormControl>
            <div className="mt-5 mb-[10px] flex gap-5">
                <button
                    className={`w-[200px] h-[50px] ${type ? 'bg-blue text-white border border-black' : 'bg-white text-blue border border-blue'
                        } bg-opacity-60 hover:bg-opacity-100 rounded-[5px]`}
                    onClick={() => setType((prev) => !prev)}
                >
                    Inventory (Out Of Stock)
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
                                        Product Name
                                    </TableCell>
                                    <TableCell align="center" className="font-bold text-sm">
                                        Inventory
                                    </TableCell>
                                    <TableCell align="center" className="font-bold text-sm">
                                        Sold Month Ago
                                    </TableCell>
                                    {/* <TableCell align="center" className="font-bold text-sm">
                                        Action
                                    </TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {inventories &&
                                    inventories.map((item, index) => (
                                        <TableRow key={item.product}>
                                            <TableCell align="center" className="text-sm font-bold">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell align="center" className="text-sm">
                                                {item.name}
                                            </TableCell>
                                            <TableCell align="center" className="text-sm">
                                                {item.totalInventory}
                                            </TableCell>
                                            <TableCell align="center" className="text-sm">
                                                {item.sold}
                                            </TableCell>
                                            {/* <TableCell align="center" className="text-blue">
                                                <SearchOutlinedIcon />
                                            </TableCell> */}
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
        </div>
    );
};

export default Inventory;
