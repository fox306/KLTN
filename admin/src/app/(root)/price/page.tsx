'use client';
import { useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { Category, Product } from '@/types/type';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import TableProduct from '@/components/shared/TableProduct';
import TypeSure from '@/components/shared/TypeSure';
import axios from '@/utils/axios';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Loading from '@/components/shared/Loading';

const nav = ['All', 'on sale', 'hidden'];
const status = ['All', 'Active', 'Hide'];
const brands = ['Nike', 'Vans', 'Puma', 'Adidas', 'Converse', 'Balenciaga'];

const theme = createTheme({
    palette: {
        primary: {
            main: '#40BFFF',
        },
    },
});

const PricePage = () => {
    const [active, setActive] = useState(0);

    const [value, setValue] = useState<string>('New');
    const [type, setType] = useState<string>('ALL');
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [action, setAction] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [price, setPrice] = useState('');
    const [option, setOption] = useState('INCREASE');

    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<string>('');
    const [brand, setBrand] = useState<string>('Nike');
    const [prodcutList, setProductList] = useState<Product[]>([]);
    const [checkedAll, setCheckedAll] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Product[]>([]);
    const [page, setPage] = useState<number>();

    const [open, setOpen] = useState<boolean>(false);
    const [load, setLoad] = useState<boolean>(false);
    const [load1, setLoad1] = useState<boolean>(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [loading, setLoading] = useState(true);

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    };

    const handleChangeType = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };
    const handleChangeBrand = (event: SelectChangeEvent) => {
        setBrand(event.target.value as string);
    };
    const handleChangeCate = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    const handleChangeOption = (event: SelectChangeEvent) => {
        setOption(event.target.value as string);
    };
    const handleChangePage = (i: number) => {
        setPageNumber(i);
    };

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

    const changeAll = async () => {
        let item = {};
        if (value === 'New') {
            item = {
                type: 'NEWVALUE',
                value: parseInt(price),
                part: type,
            };
        } else {
            item = {
                type: 'UPADOWN',
                option: option,
                value: parseInt(price),
                part: type,
            };
        }
        const { data } = await axios.put('/products/management/price', item);
        if (data.success) {
            {
                toast.success('Update Price Success');
                setLoad1((prev) => !prev);
            }
        } else {
            toast.error('Update Price Fail');
            setLoad1((prev) => !prev);
        }
    };
    const changeSelected = async () => {
        let item = {};
        const listId = selectedItem.map((item) => item._id);
        if (value === 'New') {
            item = {
                selected: listId,
                type: 'NEWVALUE',
                value: parseInt(price),
                part: type,
            };
        } else {
            item = {
                selected: listId,
                type: 'UPADOWN',
                option: option,
                value: parseInt(price),
                part: type,
            };
        }
        const { data } = await axios.put('/products/management/price', item);
        if (data.success) {
            {
                toast.success('Update Price Success');
                setLoad1((prev) => !prev);
            }
        } else {
            toast.error('Update Price Fail');
            setLoad1((prev) => !prev);
        }
    };
    const changeCate = async () => {
        let item = {};
        if (value === 'New') {
            item = {
                category: category,
                type: 'NEWVALUE',
                value: parseInt(price),
                part: type,
            };
        } else {
            item = {
                category: category,
                type: 'UPADOWN',
                option: option,
                value: parseInt(price),
                part: type,
            };
        }
        const { data } = await axios.put('/products/management/price', item);
        if (data.success) {
            {
                toast.success('Update Price Success');
                setLoad1((prev) => !prev);
            }
        } else {
            toast.error('Update Price Fail');
            setLoad1((prev) => !prev);
        }
    };
    const changeBrand = async () => {
        let item = {};
        if (value === 'New') {
            item = {
                brand: brand,
                type: 'NEWVALUE',
                value: parseInt(price),
                part: type,
            };
        } else {
            item = {
                brand: brand,
                type: 'UPADOWN',
                option: option,
                value: parseInt(price),
                part: type,
            };
        }
        const { data } = await axios.put('/products/management/price', item);
        if (data.success) {
            toast.success('Update Price Success');
            setLoad1((prev) => !prev);
        } else {
            toast.error('Update Price Fail');
            setLoad1((prev) => !prev);
        }
    };

    const handleSubmit = () => {
        if (type === 'ALL') {
            changeAll();
        } else if (type === 'SELECTED') {
            changeSelected();
        } else if (type === 'CATEGORY') {
            changeCate();
        } else {
            changeBrand();
        }
    };

    useEffect(() => {
        validateSelectedAll();
    }, [selectedItem]);
    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            const { data } = await axios.get(`/products?pageSize=5&pageNumber=${pageNumber}`);
            if (data.success) {
                setProductList(data.data);
                setPage(data.pages);
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
                setPage(data.pages);
                setLoading(false);

                setCheckedAll(false);
            }
        };
        if (nav[active] === 'All') {
            fetchAll();
        } else {
            fetchStatus();
        }
    }, [active, pageNumber, load, load1]);
    useEffect(() => {
        const fetchCate = async () => {
            const { data } = await axios.get('/categories');
            if (data.success) {
                setCategories(data.data);
                setCategory(data.data[0]._id);
            }
        };
        fetchCate();
    }, [load, load1]);
    useEffect(() => {
        if (value === 'New') setOpen1(false);
        else setOpen1(true);
    }, [value]);
    useEffect(() => {
        if (type === 'CATEGORY' || type === 'BRAND') setOpen2(true);
        else setOpen2(false);
    }, [type]);

    return (
        <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px]">
                <FormControl className="w-[240px] h-[50px] bg-white flex items-center justify-center shadow-product2">
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        label="Page"
                        onChange={handleChange}
                        variant="outlined"
                        className="font-bold text-lg"
                        sx={{
                            boxShadow: 'none',
                            '.MuiOutlinedInput-notchedOutline': { border: 0 },
                            '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                border: 0,
                            },
                            '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: 0,
                            },
                        }}
                    >
                        <MenuItem value="New">Change to new value</MenuItem>
                        <MenuItem value="Change">Change price</MenuItem>
                    </Select>
                </FormControl>
                {open1 && (
                    <FormControl className="w-[150px] h-[50px] bg-white flex items-center justify-center shadow-product2">
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={option}
                            label="Page"
                            onChange={handleChangeOption}
                            variant="outlined"
                            className="font-bold text-lg"
                            sx={{
                                boxShadow: 'none',
                                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                                '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                    border: 0,
                                },
                                '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    border: 0,
                                },
                            }}
                        >
                            <MenuItem value="INCREASE">Increase</MenuItem>
                            <MenuItem value="DECREASE">Decrease</MenuItem>
                        </Select>
                    </FormControl>
                )}
                <div className="h-[50px] bg-white flex items-center shadow-product2">
                    <input
                        type="number"
                        placeholder="Enter value..."
                        className="font-medium text-sm py-[5px] px-5 outline-none"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <span className="px-[10px] py-[5px] font-bold text-base border-l-[1px] border-l-blue">$</span>
                </div>
                <FormControl className="w-[240px] h-[50px] bg-white flex items-center justify-center shadow-product2">
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Page"
                        onChange={handleChangeType}
                        variant="outlined"
                        className="font-bold text-lg"
                        sx={{
                            boxShadow: 'none',
                            '.MuiOutlinedInput-notchedOutline': { border: 0 },
                            '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                border: 0,
                            },
                            '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: 0,
                            },
                        }}
                    >
                        <MenuItem value="ALL">CHANGE ALL</MenuItem>
                        <MenuItem value="SELECTED">CHANGE SELECTED</MenuItem>
                        <MenuItem value="CATEGORY">CHANGE BY CATEGORY</MenuItem>
                        <MenuItem value="BRAND">CHANGE BY BRAND</MenuItem>
                    </Select>
                </FormControl>
                {(open2 && type === 'CATEGORY' && (
                    <FormControl className="w-[240px] h-[50px] bg-white flex items-center justify-center shadow-product2">
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Page"
                            onChange={handleChangeCate}
                            variant="outlined"
                            className="font-bold text-lg"
                            sx={{
                                boxShadow: 'none',
                                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                                '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                    border: 0,
                                },
                                '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    border: 0,
                                },
                            }}
                        >
                            {categories.map((item) => (
                                <MenuItem key={item._id} value={item._id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )) ||
                    (type === 'BRAND' && (
                        <FormControl className="w-[240px] h-[50px] bg-white flex items-center justify-center shadow-product2">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={brand}
                                label="Page"
                                onChange={handleChangeBrand}
                                variant="outlined"
                                className="font-bold text-lg"
                                sx={{
                                    boxShadow: 'none',
                                    '.MuiOutlinedInput-notchedOutline': { border: 0 },
                                    '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        border: 0,
                                    },
                                    '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        border: 0,
                                    },
                                }}
                            >
                                {brands.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ))}
                <button
                    className="w-[150px] h-[50px] bg-blue bg-opacity-60 text-white font-bold text-xs rounded-[5px] hover:bg-opacity-100"
                    onClick={handleSubmit}
                >
                    Apply
                </button>
            </div>
            <div className="flex justify-between shadow-order w-full">
                {nav.map((item, i) => (
                    <div
                        key={i}
                        className={`w-[300px] h-[50px] flex items-center justify-center uppercase font-bold cursor-pointer hover:text-blue ${
                            active === i ? 'border-b-4 border-blue text-blue' : ''
                        }`}
                        onClick={() => setActive(i)}
                    >
                        {item}
                    </div>
                ))}
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
                            count={page}
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

export default PricePage;
