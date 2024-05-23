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

const nav = ['All', 'on sale', 'hidden', 'out of stock'];
const status = ['All', 'Available', 'Hidden', 'outOfStock'];

const buttons = ['Select All', 'Hide All', 'Hide Selected', 'On Sale All', 'On Sale Selected'];

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

    //Action Product
    const [action, setAction] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
    const [load, setLoad] = useState<boolean>(false);

    const router = useRouter();

    const handleChange = (event: SelectChangeEvent) => {
        setPage(event.target.value as string);
        router.push('/warehouse');
    };
    const handleChangePage = (i: number) => {
        setPageNumber(i);
    };

    //Checked
    const [prodcutList, setProductList] = useState<Product[]>([]);
    const [checkedAll, setCheckedAll] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Product[]>([]);
    const [pages, setPages] = useState<number>();

    const handleButtonClick = (button: string) => {
        switch (button) {
            case 'Select All':
                handleSelectAll();
                break;
            case 'Hide All':
                // handleHideAll();
                break;
            case 'Hide Selected':
                handleHideSelected();
                break;
            case 'On Sale All':
                handleOnSaleAll();
                break;
            case 'On Sale Selected':
                handleOnSaleSelected();
                break;
            default:
                break;
        }
    };

    const handleHideSelected = () => {
        console.log('Hide Selected button clicked');
    };

    const handleOnSaleAll = () => {
        console.log('On Sale All button clicked');
    };

    const handleOnSaleSelected = () => {
        console.log('On Sale Selected button clicked');
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
    }, [active, pageNumber, load]);

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
                </Select>
            </FormControl>
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
            <div className="flex justify-between">
                <div className="ml-[15px] flex items-center gap-5">
                    <input
                        type="checkbox"
                        className="w-[26px] h-[26px] cursor-pointer"
                        checked={checkedAll}
                        onChange={handleSelectAll}
                    />
                    {buttons.map((item) => (
                        <button
                            key={item}
                            className="bg-blue bg-opacity-60 h-10 px-4 text-sm font-medium text-white rounded-lg hover:bg-opacity-100"
                            onClick={() => handleButtonClick(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
                <button
                    className="bg-blue bg-opacity-60 h-10 px-4 text-sm font-medium text-white rounded-lg hover:bg-opacity-100"
                    onClick={() => router.push('/warehouse/addnew')}
                >
                    Add Product
                </button>
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
            {pages !== 0 && (
                <div className="flex justify-center shadow-product2 bg-white">
                    <ThemeProvider theme={theme}>
                        <Pagination
                            count={pages}
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

export default WareHouseManage;
