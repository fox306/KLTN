'use client';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { Cart, ItemCart, RemoveItemCart, RVariant, User, Variant, variantColor } from '@/types/type';
import { AppDispatch } from '@/utils/store';
import { getCartByUserId, removeItemFromCartByUserId } from '@/slices/cartSlice';
import { toast } from 'react-toastify';
import { getProductById } from '@/slices/productSlice';
import { useRouter } from 'next/navigation';
import { Preview } from '@mui/icons-material';
import axios from '@/utils/axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 132,
        },
    },
};

type QuantityMap = {
    [product: string]: number;
};

type PriceMap = {
    [product: string]: number;
};

const colors: { [key: string]: string } = {
    Red: 'bg-[#FC3E39]',
    Blue: 'bg-[#0000FF]',
    Gray: 'bg-[#808080]',
    Cyan: 'bg-[#00FFFF]',
    Pink: 'bg-[#FFC0CB]',
    Green: 'bg-[#00FF00]',
    Black: 'bg-[#171717]',
    White: 'bg-[#FFFFFF]',
    Brown: 'bg-[#A52A2A]',
    Purple: 'bg-[#800080]',
    Yellow: 'bg-[#FFFF00]',
    Orange: 'bg-[#FFA500]',
    Silver: 'bg-[#C0C0C0]',
};

type Props = {
    cartItem: Cart;
    checkedItems: { [key: string]: boolean };
    setCheckedItems: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    checkedAll: boolean;
    setCheckedAll: React.Dispatch<React.SetStateAction<boolean>>;
    quantityCart: { [product: string]: number };
    setQuantityCart: React.Dispatch<React.SetStateAction<{ [product: string]: number }>>;
    price: { [product: string]: number };
    setPrice: React.Dispatch<React.SetStateAction<{ [product: string]: number }>>;
    setQty: React.Dispatch<React.SetStateAction<number>>;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    setProductId: React.Dispatch<React.SetStateAction<string>>;
    items: RVariant;
    setItems: React.Dispatch<React.SetStateAction<RVariant>>;
    setManageQuantity: React.Dispatch<React.SetStateAction<number>>;
};
const CartShoe = ({
    cartItem,
    checkedItems,
    setCheckedItems,
    checkedAll,
    setCheckedAll,
    quantityCart,
    setQuantityCart,
    price,
    setPrice,
    setQty,
    setTotal,
    setActive,
    setProductId,
    items,
    setItems,
    setManageQuantity,
}: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { variants } = useSelector((state: any) => state.products) as {
        variants: Variant[];
    };
    const { quantity }: { quantity: number } = useSelector((state: any) => state.variants);

    const router = useRouter();

    const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    let user: User | null = null;
    if (userString !== null) {
        try {
            user = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    const id = user?._id as string;
    const handleDelete = async (product: string) => {
        {
            const storedItems = localStorage.getItem('itemOrders');
            let storedItemsArray: ItemCart[] = [];

            if (storedItems) {
                storedItemsArray = JSON.parse(storedItems);
            }

            try {
                const item: RemoveItemCart = {
                    user: id,
                    product: product,
                };
                console.log(item);
                const { data } = await axios.delete(`/carts/removeFromCart?user=${item.user}&product=${item.product}`);
                storedItemsArray = storedItemsArray.filter((item) => item.product !== product);
                localStorage.setItem('itemOrders', JSON.stringify(storedItemsArray));
                if (data.success === 200) {
                    dispatch(getCartByUserId(item.user));
                    toast.success('Success');
                } else {
                    toast.error('Error');
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleChecked = (product: string) => {
        setCheckedItems((prevState) => {
            const newState = {
                ...prevState,
                [product]: !prevState[product],
            };

            if (newState[product]) {
                const storedItems = localStorage.getItem('itemOrders');
                let storedItemsArray: ItemCart[] = [];

                if (storedItems) {
                    storedItemsArray = JSON.parse(storedItems);
                }

                const selectedItem = cartItem.items.find((item) => item.product === product);

                if (selectedItem) {
                    storedItemsArray = storedItemsArray.filter((item) => item.product !== product);
                    storedItemsArray.push(selectedItem);
                    localStorage.setItem('itemOrders', JSON.stringify(storedItemsArray));
                }
            } else {
                const storedItems = localStorage.getItem('itemOrders');
                let storedItemsArray: ItemCart[] = [];

                if (storedItems) {
                    storedItemsArray = JSON.parse(storedItems);
                    storedItemsArray = storedItemsArray.filter((item) => item.product !== product);
                    localStorage.setItem('itemOrders', JSON.stringify(storedItemsArray));
                }
            }

            const updatedQuantity: QuantityMap = {};
            const updatedPrice: PriceMap = {};

            for (const [key, value] of Object.entries(newState)) {
                if (value) {
                    updatedQuantity[key] = cartItem.items.find((item) => item.product === key)?.quantity!;
                    updatedPrice[key] = cartItem.items.find((item) => item.product === key)?.price!;
                }
            }

            setQuantityCart(updatedQuantity);
            setPrice(updatedPrice);
            return newState;
        });
    };

    React.useEffect(() => {
        let allChecked = false;
        if (Object.keys(checkedItems).length !== 0) {
            allChecked = Object.values(checkedItems).every((value) => value === true);
        }
        console.log('checkedItems in effect: ', checkedItems);

        setCheckedAll(allChecked);
    }, [checkedItems]);

    React.useEffect(() => {
        const totalQuantity = Object.values(quantityCart).reduce((acc, curr) => acc + curr, 0) as number;

        const totalPrice = Object.entries(price).reduce((acc, [product, productPrice]) => {
            const productQuantity = quantityCart[product] || 0;
            return acc + productPrice * productQuantity;
        }, 0) as number;
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
        setTotal(totalPrice);
        setQty(totalQuantity);
    }, [quantity, price]);

    // console.log(totalQuantity);
    // console.log(totalPrice);

    const handleChange = async (p: string, c: string, s: string, q: number) => {
        setProductId(p);
        setManageQuantity(q);
        const { data } = await axios.get(`/variants/find/by-info?product=${p}&size=${s}&color=${c}`);
        if (data.success) {
            console.log(data.data.quantity);
            setItems({ ...items, size: s, color: c, quantity: data.data.quantity });
            if (data.data.quantity) {
                console.log(data.data.quantity);
                console.log(items.quantity);
                setActive(true);
            }
        }
    };
    return (
        <TableContainer component={Paper} className="shadow-xl h-max">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="text-base">Product</TableCell>
                        <TableCell align="center" className="text-base">
                            Color
                        </TableCell>
                        <TableCell align="center" className="text-base">
                            Size
                        </TableCell>
                        <TableCell align="center" className="text-base">
                            QTY
                        </TableCell>
                        <TableCell align="center" className="text-base">
                            UNIT PRICE
                        </TableCell>
                        <TableCell align="center" className="text-base">
                            TOTAL
                        </TableCell>
                        <TableCell align="center" className="text-base"></TableCell>
                        <TableCell align="center" className="text-base"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartItem.items &&
                        cartItem.items.map((item) => (
                            <TableRow key={item.product} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row" className="flex items-center gap-[10px]">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 cursor-pointer"
                                        checked={checkedAll ? checkedAll : checkedItems[item.product]}
                                        onChange={() => handleChecked(item.product)}
                                    />
                                    <Image
                                        src={item.image}
                                        alt=" Ảnh"
                                        width={120}
                                        height={120}
                                        className="bg-bg_sell rounded-lg cursor-pointer"
                                        onClick={() => router.push(`/shoes/${item.product}`)}
                                    />
                                    {item.name}
                                </TableCell>
                                <TableCell align="center">
                                    {/* <Select
                                    className="ml-[10px] h-9"
                                    value={row.color}
                                    // onChange={handleChange}
                                    MenuProps={MenuProps}
                                >
                                    {sorts.map((sort: string) => (
                                        <MenuItem key={sort} value={sort}>
                                            {sort}
                                        </MenuItem>
                                    ))}
                                </Select> */}
                                    <div className="flex justify-center items-center">
                                        <div className="bg-gray rounded-full p-[1px]">
                                            <div className={`w-6 h-6 rounded-full ${colors[item.color]} `}></div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center">{item.size}</TableCell>
                                <TableCell align="center">{item.quantity}</TableCell>
                                <TableCell align="center">${item.price}</TableCell>
                                <TableCell align="center">${item.quantity * item.price}</TableCell>
                                <TableCell
                                    align="center"
                                    onClick={() => handleChange(item.product, item.color, item.size, item.quantity)}
                                    className="cursor-pointer hover:text-blue"
                                >
                                    Change
                                </TableCell>
                                <TableCell
                                    align="center"
                                    className="text-orange text-2xl cursor-pointer"
                                    onClick={() => handleDelete(item.product)}
                                >
                                    X
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default CartShoe;
