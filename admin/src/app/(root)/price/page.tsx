'use client';
import { useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { Product } from '@/types/type';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getAllProduct, getAllProductByStatus } from '@/slices/productSlice';
import Pagination from '@mui/material/Pagination';
import TableProduct from '@/components/shared/TableProduct';
import TypeSure from '@/components/shared/TypeSure';

const nav = ['All', 'on sale', 'hidden', 'out of stock'];
const status = ['All', 'Available', 'Hidden', 'outOfStock'];

const theme = createTheme({
    palette: {
        primary: {
            main: '#40BFFF',
        },
    },
});

const PricePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, pages }: { products: Product[]; pages: number } = useSelector((state: any) => state.products);

    const [value, setValue] = useState<string>('Change by percentage');
    const [active, setActive] = useState(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [action, setAction] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
    const [load, setLoad] = useState<boolean>(false);

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    };

    const handleChangePage = (i: number) => {
        setPageNumber(i);
    };

    const [checkedAll, setCheckedAll] = useState(false);

    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
    useEffect(() => {
        const item = {
            status: status[active],
            pageNumber: pageNumber,
        };
        if (nav[active] === 'All') {
            dispatch(getAllProduct(pageNumber));
        } else {
            dispatch(getAllProductByStatus(item));
        }
        localStorage.setItem('tickProduct', '');
    }, [dispatch, active, pageNumber]);
    console.log(products);
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
                products={products}
                setOpen={setOpen}
                setAction={setAction}
                setId={setId}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                checkedAll={checkedAll}
                setCheckedAll={setCheckedAll}
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

export default PricePage;
