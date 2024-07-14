'use client';
import CategoriesList from '@/components/cards/CategoriesList';
import React, { MouseEvent, useEffect, useState } from 'react';
import EditCate from '@/components/form/EditCate';
import AddNewCate from '@/components/form/AddNewCate';
import { Category } from '@/types/type';
import axios from '@/utils/axios';
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
import Image from 'next/image';
import AddCate from '@/components/form/AddCate';
import UpdateCate from '@/components/form/UpdateCate';
import Loading from '@/components/shared/Loading';

const theme = createTheme({
    palette: {
        primary: {
            main: '#40BFFF',
        },
    },
});

const Categories = () => {
    // const [load, setLoad] = useState(false);
    // const [item, setItem] = useState<Category>({
    //     _id: '',
    //     name: '',
    //     img: '',
    // });
    // const [selected, setSelected] = useState<Category[]>([]);
    // const [cateList, setCateList] = useState<Category[]>([]);
    // const [checkedAll, setCheckedAll] = useState<boolean>(false);

    // const handleFilterData = (data: Category[]) => {
    //     const filterData = data.filter((item) => {
    //         return item.selected;
    //     });
    //     setSelected(filterData);
    // };
    // const handleSelectedItem = (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>, item: Category) => {
    //     e.stopPropagation();
    //     const selectedItem = cateList.map((data) => {
    //         if (item._id === data._id) {
    //             return {
    //                 ...data,
    //                 selected: !data.selected,
    //             };
    //         } else return data;
    //     });
    //     setCateList(selectedItem);
    //     handleFilterData(selectedItem);
    // };

    // const handleSelectedAll = () => {
    //     const filterCart = cateList?.map((data) => {
    //         if (checkedAll) {
    //             return {
    //                 ...data,
    //                 selected: false,
    //             };
    //         } else {
    //             return {
    //                 ...data,
    //                 selected: true,
    //             };
    //         }
    //     });
    //     // setCateList(filterCart);
    //     handleFilterData(filterCart);
    // };
    // const validateSelectedAll = () => {
    //     const data = cateList?.every((item) => item.selected === true);
    //     setCheckedAll(data);
    // };

    // useEffect(() => {
    //     validateSelectedAll();
    // }, [selected]);
    // console.log(selected);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const { data } = await axios.get('/categories');
    //         if (data.success) {
    //             setCateList(data.data);
    //         }
    //     };
    //     fetchData();
    // }, [load]);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [load, setLoad] = useState(false);
    const [pages, setPages] = useState(1);
    const [count, setCount] = useState(1);
    const [categories, setCategories] = useState<Category[]>([]);
    const [cate, setCate] = useState<Category>({
        _id: '',
        img: '',
        name: '',
        selected: false,
    });
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);

    const handleChangePage = (i: number) => {
        setPages(i);
    };

    const updateCate = (item: Category) => {
        setCate(item);
        setOpen1(true);
    };

    useEffect(() => {
        const fetchCate = async () => {
            setLoading(true);
            const { data } = await axios.get(`/categories?pageSize=5&pageNumber=${pages}`);
            if (data.success) {
                setCategories(data.data);
                setCount(data.pages);
                setLoading(false);
            }
        };
        if (!text) {
            fetchCate();
        } else {
            return;
        }
    }, [load, pages, text]);
    useEffect(() => {
        const fetchSearch = async () => {
            setLoading(true);
            const { data } = await axios.get(
                `/categories/find/by-keyword?keyword=${text}&pageSize=5&pageNumber=${pages}`,
            );
            if (data.success) {
                setCategories(data.data);
                setCount(data.pages);
                setLoading(false);
            }
        };
        if (text) {
            fetchSearch();
        }
    }, [text, load, pages]);
    console.log(categories);

    return (
        <div className="flex flex-col gap-[14px]">
            {/* <div className="flex gap-5">
                <button className="h-10 w-[100px] text-white text-sm text-medium bg-blue bg-opacity-60 rounded-lg">
                    Select All
                </button>
                <button className="h-10 w-[110px] text-white text-sm text-medium bg-blue bg-opacity-60 rounded-lg">
                    Delete All
                </button>
                <button className="h-10 w-[140px] text-white text-sm text-medium bg-blue bg-opacity-60 rounded-lg">
                    Delete Select
                </button>
            </div>
            <div>
                <CategoriesList categories={cateList} setItem={setItem} handleSelectedItem={handleSelectedItem} />
            </div>
            <div className="h-[400px] shadow-product bg-white py-5 px-[100px] flex gap-[110px]">
                <EditCate item={item} setLoad={setLoad} />
                <AddNewCate setLoad={setLoad} />
            </div> */}
            <div className="font-bold text-center text-lg">
                <span>MANAGEMENT CATEGORIES</span>
            </div>
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
                        className="w-[200px] h-[50px] bg-blue bg-opacity-60 hover:bg-opacity-100 rounded-[5px] text-white"
                        onClick={() => setOpen(true)}
                    >
                        Create New Category
                    </button>
                </div>
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
                                        Category Image
                                    </TableCell>
                                    <TableCell align="center" className="font-bold text-sm">
                                        Category Name
                                    </TableCell>
                                    <TableCell align="center" className="font-bold text-sm">
                                        Total Product
                                    </TableCell>
                                    <TableCell align="center" className="font-bold text-sm">
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categories.map((item, i) => (
                                    <TableRow>
                                        <TableCell align="center" className="text-sm font-bold">
                                            {i + 1}
                                        </TableCell>
                                        <TableCell align="center" className="flex justify-center">
                                            <div className="shadow-cate w-[200px] h-[60px] flex justify-center">
                                                <Image src={item.img} alt="Anh" width={60} height={60} />
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" className="text-sm">
                                            {item.name}
                                        </TableCell>
                                        <TableCell align="center" className="text-sm">
                                            1
                                        </TableCell>
                                        <TableCell align="center">
                                            <SearchOutlinedIcon
                                                className="text-blue cursor-pointer hover:opacity-50"
                                                onClick={() => updateCate(item)}
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
            {open && <AddCate setOpen={setOpen} setLoad={setLoad} />}
            {open1 && <UpdateCate item={cate} setOpen={setOpen1} setLoad={setLoad} />}
        </div>
    );
};

export default Categories;
