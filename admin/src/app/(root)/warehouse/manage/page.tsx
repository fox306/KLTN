'use client';
import TableProduct from '@/components/shared/TableProduct';
import { Product } from '@/types/type';
import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/navigation';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TypeSure from '@/components/shared/TypeSure';
import axios from '@/utils/axios';
import Loading from '@/components/shared/Loading';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const nav = ['All', 'on sale', 'hidden'];
const status = ['All', 'Active', 'Hide'];
const theme = createTheme({
    palette: {
        primary: {
            main: '#40BFFF',
        },
    },
});

const WareHouseManage = () => {
    const [active, setActive] = useState(0);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const [page, setPage] = useState<string>('Management');

    //search
    const [text, setText] = useState<string>('');

    //Action Product
    const [action, setAction] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
    const [load, setLoad] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const handleChange = (event: SelectChangeEvent) => {
        setPage(event.target.value as string);
    };

    const handleChangePage = (i: number) => {
        setPageNumber(i);
    };

    //Checked
    const [prodcutList, setProductList] = useState<Product[]>([]);
    const [checkedAll, setCheckedAll] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Product[]>([]);
    const [pages, setPages] = useState<number>(1);

    const handleFilterData = (data: Product[]) => {
        const fillerData = data.filter((item) => {
            return item.selected;
        });
        setSelectedItem(fillerData);
    };
    const handleSelectedItem = (data: Product) => {
        const selected = prodcutList.map((item) => {
            if (item._id === data._id) {
                return {
                    ...data,
                    selected: !data.selected,
                };
            } else return data;
        });
        setProductList(selected);
        handleFilterData(selected);
    };
    const handleSelectAll = () => {
        const filterPrice = prodcutList.map((item) => {
            if (checkedAll) {
                return {
                    ...item,
                    selected: false,
                };
            } else {
                return {
                    ...item,
                    selected: true,
                };
            }
        });
        setProductList(filterPrice);
        handleFilterData(filterPrice);
    };
    const validateSelectedAll = () => {
        const validate = prodcutList.every((item) => item.selected === true);
        setCheckedAll(validate);
    };

    useEffect(() => {
        validateSelectedAll();
    }, [selectedItem]);

    useEffect(() => {
        if (!text) {
            const fetchAll = async () => {
                setLoading(true);
                const { data } = await axios.get(`/products/action/by-admin?pageSize=5&pageNumber=${pageNumber}`);
                if (data.success) {
                    setProductList(data.data);
                    setPages(data.pages);
                    setLoading(false);
                    setCheckedAll(false);
                }
            };
            const fetchStatus = async () => {
                setLoading(true);
                const { data } = await axios.get(
                    `/products/find/by-status?pageSize=5&pageNumber=${pageNumber}&status=${status[active]}`,
                );
                if (data.success) {
                    setProductList(data.data);
                    setPages(data.pages);
                    setLoading(false);
                    setCheckedAll(false);
                }
            };
            if (nav[active] === 'All') {
                fetchAll();
            } else {
                fetchStatus();
            }
        } else {
            return;
        }
    }, [active, pageNumber, load]);
    useEffect(() => {
        if (page === 'Inventory') {
            router.push('/warehouse/inventory');
        }
        if (page === 'Statistical') {
            router.push('/warehouse');
        }
    }, [page]);
    useEffect(() => {
        const fetchSearch = async () => {
            setLoading(true);
            const { data } = await axios.get(
                `/products/admin/find/by-keyword?keyword=${text}&pageNumber=${pageNumber}&pageSize=5`,
            );
            if (data.success) {
                setProductList(data.data);
                setPages(data.pages);
                setLoading(false);
                setCheckedAll(false);
            }
        };
        if (text) {
            fetchSearch();
        }
    }, [text, pageNumber]);

    return (
        <div className="flex flex-col gap-[10px]">
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
            <div className="flex justify-between shadow-order w-full">
                {nav.map((item, i) => (
                    <div
                        key={i}
                        className={`w-[300px] h-[50px] flex items-center justify-center uppercase font-bold cursor-pointer hover:text-blue ${
                            active === i ? 'border-b-4 border-blue text-blue' : ''
                        }`}
                        onClick={() => {
                            setActive(i);
                            setText('');
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>
            <div className="flex gap-5">
                <div className="flex-1 h-[50px] flex px-[15px] items-center bg-white shadow-product2">
                    <input
                        type="text"
                        className="flex-1 font-bold text-sm outline-none"
                        placeholder="Search Something..."
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                            // setLoading(true);
                            setActive(3);
                        }}
                    />
                    <SearchOutlinedIcon className="text-2xl ml-[15px] text-blue hover:opacity-60 cursor-pointer" />
                </div>
                <button
                    className="w-[200px] h-[50px] bg-blue bg-opacity-60 px-4 text-sm font-medium text-white rounded-lg hover:bg-opacity-100"
                    onClick={() => router.push('/warehouse/addnew')}
                >
                    Add Product
                </button>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <TableProduct
                    products={prodcutList}
                    setOpen={setOpen}
                    setAction={setAction}
                    setId={setId}
                    handleSelectedItem={handleSelectedItem}
                    handleSelectAll={handleSelectAll}
                    checkedAll={checkedAll}
                />
            )}
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
            {open && (
                <TypeSure
                    setOpen={setOpen}
                    setAction={setAction}
                    action={action}
                    id={id}
                    setId={setId}
                    setLoad={setLoad}
                />
            )}
        </div>
    );
};

export default WareHouseManage;
