'use client';
import { useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { Product } from '@/types/type';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import TableProduct from '@/components/shared/TableProduct';
import TypeSure from '@/components/shared/TypeSure';
import axios from '@/utils/axios';

const nav = ['All', 'on sale', 'hidden', 'out of stock'];
const status = ['All', 'Active', 'Hidden', 'outOfStock'];

const theme = createTheme({
    palette: {
        primary: {
            main: '#40BFFF',
        },
    },
});

const PricePage = () => {
    const [value, setValue] = useState<string>('Change by percentage');
    const [active, setActive] = useState(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [action, setAction] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
    const [load, setLoad] = useState<boolean>(false);
    const [prodcutList, setProductList] = useState<Product[]>([]);
    const [checkedAll, setCheckedAll] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Product[]>([]);
    const [page, setPage] = useState<number>();

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
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

    useEffect(() => {
        validateSelectedAll();
    }, [selectedItem]);
    useEffect(() => {
        const fetchAll = async () => {
            const { data } = await axios.get(`/products?pageSize=5&pageNumber=${pageNumber}`);
            if (data.success) {
                setProductList(data.data);
                setPage(data.pages);
                setCheckedAll(false);
            }
        };
        const fetchStatus = async () => {
            const { data } = await axios.get(
                `/products/find/by-status?pageSize=5&pageNumber=${pageNumber}&status=${status[active]}`,
            );
            if (data.success) {
                setProductList(data.data);
                setPage(data.pages);
                setCheckedAll(false);
            }
        };
        if (nav[active] === 'All') {
            fetchAll();
        } else {
            fetchStatus();
        }
    }, [active, pageNumber]);

    return (
        <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px]">
                <FormControl className="w-[240px] h-[50px]">
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        label="Page"
                        onChange={handleChange}
                        variant="standard"
                        className="font-bold text-lg"
                    >
                        <MenuItem value="Change by percentage">Change by percentage</MenuItem>
                        <MenuItem value="Change to new price">Change to new price</MenuItem>
                    </Select>
                </FormControl>
                <div className="h-[50px] bg-white flex items-center">
                    <input type="text" placeholder="Enter value..." className="font-medium text-sm py-[5px] px-5" />
                    <span className="px-[10px] py-[5px] font-bold text-base border-l-[1px] border-l-blue">
                        {value === 'Change by percentage' ? '%' : '$'}
                    </span>
                </div>
                <button className="w-[150px] h-[50px] bg-blue bg-opacity-60 text-white font-bold text-xs rounded-[5px] hover:bg-opacity-100">
                    Apply Selected
                </button>
                <button className="w-[150px] h-[50px] bg-blue bg-opacity-60 text-white font-bold text-xs rounded-[5px] hover:bg-opacity-100">
                    Apply All
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
            <TableProduct
                products={prodcutList}
                setOpen={setOpen}
                setAction={setAction}
                setId={setId}
                handleSelectedItem={handleSelectedItem}
                handleSelectAll={handleSelectAll}
                checkedAll={checkedAll}
            />
            {page !== 0 && (
                <div className="flex justify-center shadow-product2 bg-white">
                    <ThemeProvider theme={theme}>
                        <Pagination
                            count={page}
                            shape="rounded"
                            onChange={(_, page: number) => handleChangePage(page)}
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
