'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
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

    const [pages, setPages] = useState(1);
    const [count, setCount] = useState(1);

    const handleChange = (event: SelectChangeEvent) => {
        setPage(event.target.value as string);
        if (page === 'Management') {
            router.push('/warehouse/manage');
        } else if (page === 'Statistical') {
            router.push('/warehouse');
        }
    };

    const handleChangePage = (i: number) => {
        setPages(i);
    };

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
                    <MenuItem value="Management">Inventory</MenuItem>
                </Select>
            </FormControl>
            <div>
                <div className="flex-1 h-[50px] flex px-[15px] items-center bg-white shadow-product2">
                    <input
                        type="text"
                        className="flex-1 font-bold text-sm outline-none"
                        placeholder="Search Something..."
                    />
                    <SearchOutlinedIcon className="text-2xl ml-[15px] text-blue hover:opacity-60 cursor-pointer" />
                </div>
                <FormControl className="w-[200px]">
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={page}
                        label="Page"
                        onChange={handleChange}
                        variant="outlined"
                        className="font-medium"
                    >
                        <MenuItem value="Statistical">Inventory (Out Of Stock)</MenuItem>
                        <MenuItem value="Management">Management</MenuItem>
                        <MenuItem value="Management">Inventory</MenuItem>
                    </Select>
                </FormControl>
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
                                    Product Name
                                </TableCell>
                                <TableCell align="center" className="font-bold text-sm">
                                    Inventory
                                </TableCell>
                                <TableCell align="center" className="font-bold text-sm">
                                    Sold Month Ago
                                </TableCell>
                                <TableCell align="center" className="font-bold text-sm">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" className="text-sm font-bold">
                                    1
                                </TableCell>
                                <TableCell align="center" className="text-sm">
                                    Nike Air Max 1
                                </TableCell>
                                <TableCell align="center" className="text-sm">
                                    14
                                </TableCell>
                                <TableCell align="center" className="text-sm">
                                    1
                                </TableCell>
                                <TableCell align="center" className="text-blue">
                                    <SearchOutlinedIcon />
                                </TableCell>
                            </TableRow>
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
        </div>
    );
};

export default Inventory;
