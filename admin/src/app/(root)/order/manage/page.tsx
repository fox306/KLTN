'use client';
import { getAllOrderByOrderStatus, getAllOrderByUserId, getAllOrders } from '@/slices/orderSlice';
import { Order } from '@/types/type';
import { AppDispatch } from '@/utils/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Sure from '@/components/shared/Sure';
import Loading from '@/components/shared/Loading';
import axios from '@/utils/axios';

const statuses = [
    'All',
    'Confirming',
    'Accepted',
    'Delivering',
    'Successful',
    'Cancel',
    'Return',
    'ReturnSuccessfully',
    'DeliveredSuccessfully',
];
const buttons = [
    'Select All',
    'Confirm All',
    'Confirm Selected',
    'Delivery All',
    'Delivery Selected',
    'Cancel All',
    'Cancel Selected',
];

const theme = createTheme({
    palette: {
        primary: {
            main: '#40BFFF',
        },
    },
});

const OrderManage = () => {
    const [status, setStatus] = useState('All');
    const dispatch = useDispatch<AppDispatch>();
    const [orders, setOrders] = useState<Order[]>([]);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);

    const [load, setLoad] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [open, setOpen] = useState<boolean>(false);
    const [current, setCurrent] = useState<string>('');
    const [orderId, setOrderId] = useState<string>('');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState<string>('Management');

    const router = useRouter();

    const handleChange = (event: SelectChangeEvent) => {
        setPage(event.target.value as string);
        router.push('/order');
    };

    const handleChangePage = (i: number) => {
        setPageNumber(i);
    };

    const handleStatus = (item: string) => {
        setStatus(item);
        setPageNumber(1);
    };

    const handleComfirm = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: string) => {
        e.stopPropagation();
        setOrderId(id);
        setOpen(true);
        setCurrent('Accepted');
    };
    const handleDelivery = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: string) => {
        e.stopPropagation();
        setOrderId(id);
        setOpen(true);
        setCurrent('Delivering');
    };
    const handleCancel = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: string) => {
        e.stopPropagation();
        setOrderId(id);
        setOpen(true);
        setCurrent('Cancel');
    };
    const handleSuccess = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: string) => {
        e.stopPropagation();
        setOrderId(id);
        setOpen(true);
        setCurrent('Successful');
    };
    const handleReturn = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: string) => {
        e.stopPropagation();
        setOrderId(id);
        setOpen(true);
        setCurrent('Return');
    };

    //Check
    const [checkedAll, setCheckedAll] = useState(false);

    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

    const handleCheckedAll = async () => {
        setCheckedAll((prev) => !prev);

        if (!checkedAll) {
            const updatedCheckedItems: { [key: string]: boolean } = {};
            for (const item of orders) {
                updatedCheckedItems[item._id] = true;
            }
            localStorage.setItem('tickOrder', JSON.stringify(orders));
            setCheckedItems(updatedCheckedItems);
        } else {
            const updatedCheckedItems: { [key: string]: boolean } = {};
            for (const item of orders) {
                updatedCheckedItems[item._id] = false;
            }
            localStorage.setItem('tickOrder', '');
            setCheckedItems(updatedCheckedItems);
        }
    };

    const handleChecked = (orderId: string) => {
        setCheckedItems((prevState) => {
            const newState = {
                ...prevState,
                [orderId]: !prevState[orderId],
            };

            if (newState[orderId]) {
                const storedItems = localStorage.getItem('tickOrder');
                let storedItemsArray: Order[] = [];

                if (storedItems) {
                    storedItemsArray = JSON.parse(storedItems);
                }

                const selectedItem = orders.find((item) => item._id === orderId);

                if (selectedItem) {
                    storedItemsArray = storedItemsArray.filter((item) => item._id !== orderId);
                    storedItemsArray.push(selectedItem);
                    localStorage.setItem('tickOrder', JSON.stringify(storedItemsArray));
                }
            } else {
                const storedItems = localStorage.getItem('tickOrder');
                let storedItemsArray: Order[] = [];

                if (storedItems) {
                    storedItemsArray = JSON.parse(storedItems);
                    storedItemsArray = storedItemsArray.filter((item) => item._id !== orderId);
                    localStorage.setItem('tickOrder', JSON.stringify(storedItemsArray));
                }
            }
            return newState;
        });
    };
    const handleButtonClick = (button: string) => {
        switch (button) {
            case 'Select All':
                handleSelectAll();
                break;
            case 'Hide All':
                // handleHideAll();
                break;
            case 'Hide Selected':
                // handleHideSelected();
                break;
            case 'On Sale All':
                // handleOnSaleAll();
                break;
            case 'On Sale Selected':
                // handleOnSaleSelected();
                break;
            default:
                break;
        }
    };

    const handleSelectAll = () => {
        setCheckedAll(true);
        const updatedCheckedItems: { [key: string]: boolean } = {};
        for (const item of orders) {
            updatedCheckedItems[item._id] = true;
        }
        localStorage.setItem('tickProduct', JSON.stringify(orders));
        setCheckedItems(updatedCheckedItems);
    };

    useEffect(() => {
        let allChecked = false;
        if (Object.keys(checkedItems).length !== 0) {
            allChecked = Object.values(checkedItems).every((value) => value === true);
        }
        setCheckedAll(allChecked);
    }, [checkedItems]);

    useEffect(() => {
        const initialCheckedItems = (orders ?? []).reduce((acc, item) => {
            acc[item._id] = false;
            return acc;
        }, {} as { [key: string]: boolean });
        setCheckedItems(initialCheckedItems);
    }, [orders]);

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            const { data } = await axios.get(`/orders?pageSize=4&pageNumber=${pageNumber}`);
            if (data.success) {
                setOrders(data.data);
                setTotal(data.total);
                setCount(data.pages);
                setLoading(false);
            }
        };
        const fetchStatus = async () => {
            setLoading(true);

            const { data } = await axios.get(
                `/orders/find/by-status?pageSize=4&pageNumber=${pageNumber}&status=${status}`,
            );
            if (data.success) {
                setOrders(data.data);
                setTotal(data.total);
                setCount(data.pages);
                setLoading(false);
            }
        };
        if (status === 'All') {
            fetchAll();
        } else {
            fetchStatus();
        }
    }, [status, load, pageNumber]);

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

            <div className="grid grid-flow-col overflow-x-scroll gap-[18px] shadow-lg scrollbar-hidden mb-5 bg-white">
                {statuses &&
                    statuses.map((item, i) => {
                        const isActive = status === item;

                        return (
                            <span
                                className={`${
                                    item === 'DeliveredSuccessfully' || item === 'ReturnSuccessfully'
                                        ? 'w-[230px]'
                                        : 'w-[140px]'
                                } text-base h-max block pt-[10px] pb-[12px] font-semibold text-center uppercase hover:text-blue cursor-pointer ${
                                    isActive && 'text-blue border-b-2 border-b-blue'
                                }`}
                                onClick={() => handleStatus(item)}
                                key={i}
                            >
                                {item} {isActive && `(${total})`}
                            </span>
                        );
                    })}
            </div>
            {/* <div className="ml-[15px] flex items-center gap-5">
                <input type="checkbox" checked={checkedAll} onChange={handleCheckedAll} className="w-[26px] h-[26px]" />
                {buttons.map((item) => (
                    <button
                        key={item}
                        className="bg-blue bg-opacity-60 h-10 px-4 text-sm font-medium text-white rounded-lg hover:bg-opacity-100"
                        onClick={() => handleButtonClick(item)}
                    >
                        {item}
                    </button>
                ))}
            </div> */}
            <div className="flex flex-col gap-5">
                {loading ? (
                    <Loading />
                ) : orders.length === 0 ? (
                    <div className="flex justify-center items-center">
                        <Image src="/noData.jpg" alt="No Data" width={300} height={300} className="rounded-[5px]" />
                    </div>
                ) : (
                    orders &&
                    orders.map((order) => (
                        <div
                            key={order._id}
                            className="px-[15px] pt-[15px] pb-[10px] shadow-order bg-white cursor-pointer hover:border-2 hover:border-blue"
                            onClick={() => router.push(`/order/manage/${order.orderId}`)}
                        >
                            <div className="flex justify-between mb-[15px] font-bold">
                                <div className="flex items-center gap-[14px]">
                                    <input
                                        type="checkbox"
                                        checked={checkedAll ? checkedAll : checkedItems[order._id]}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            handleChecked(order._id);
                                        }}
                                        className="w-[26px] h-[26px]"
                                    />
                                    <h1>ID: {order.orderId}</h1>
                                </div>
                                <span>Buyer: {order.user}</span>
                                <h1 className="uppercase">{order.status}</h1>
                            </div>
                            {/* <Border /> */}
                            <div>
                                <div>
                                    {order.items.map((item) => (
                                        <div key={item.image} className="flex items-center gap-5 my-[10px]">
                                            <Image
                                                src={item.image}
                                                alt="Ảnh"
                                                width={100}
                                                height={100}
                                                className="rounded-lg bg-deal"
                                            />

                                            <div className="w-full font-medium text-lg">
                                                <div className="flex justify-between">
                                                    <span>{item.name}</span>
                                                </div>
                                                <div className="flex gap-[100px] mt-[18px] mb-[14px] text-sm opacity-70">
                                                    <span>Color: {item.color}</span>
                                                    <span>Size: {item.size}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm opacity-70">
                                                        Quantity: {item.quantity}
                                                    </span>
                                                    <span className="font-bold text-blue">${item.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* <Border /> */}
                                </div>
                            </div>
                            <div className="flex gap-5 mt-[10px] items-center">
                                {order.status === 'Confirming' ? (
                                    <button
                                        className="w-[120px] h-10 bg-blue bg-opacity-50 text-white rounded-md font-bold text-sm hover:bg-opacity-100"
                                        onClick={(e) => handleComfirm(e, order._id)}
                                    >
                                        CONFIRM
                                    </button>
                                ) : (
                                    ''
                                )}
                                {order.status === 'Accepted' ? (
                                    <button
                                        className="w-[120px] h-10 bg-blue bg-opacity-50 text-white rounded-md font-bold text-sm hover:bg-opacity-100"
                                        onClick={(e) => handleDelivery(e, order._id)}
                                    >
                                        DELIVERY
                                    </button>
                                ) : (
                                    ''
                                )}
                                {order.status === 'Confirming' ? (
                                    <button
                                        className="w-[120px] h-10 bg-blue bg-opacity-50 text-white rounded-md font-bold text-sm hover:bg-opacity-100"
                                        onClick={(e) => handleCancel(e, order._id)}
                                    >
                                        CANCEL
                                    </button>
                                ) : (
                                    ''
                                )}
                                {order.status === 'Delivering' ? (
                                    <button
                                        className="w-[120px] h-10 bg-blue bg-opacity-50 text-white rounded-md font-bold text-sm hover:bg-opacity-100"
                                        onClick={(e) => handleSuccess(e, order._id)}
                                    >
                                        SUCCESS
                                    </button>
                                ) : (
                                    ''
                                )}
                                {order.status === 'Return' ? (
                                    <button
                                        className="w-[120px] h-10 bg-blue bg-opacity-50 text-white rounded-md font-bold text-sm hover:bg-opacity-100"
                                        onClick={(e) => handleReturn(e, order._id)}
                                    >
                                        Return
                                    </button>
                                ) : (
                                    ''
                                )}
                                <div className="flex-grow"></div>
                                {order.discountAmount > 0 && (
                                    <div className="flex items-center font-bold gap-2">
                                        <span>Discount Amount:</span>
                                        <span className="text-lg text-blue">${order.discountAmount}</span>
                                    </div>
                                )}
                                <div className="flex items-center font-bold gap-2">
                                    <span>Total Price:</span>
                                    <span className="text-lg text-blue">${order.total}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {!loading && (
                <div className="flex justify-center shadow-product2 bg-white">
                    <ThemeProvider theme={theme}>
                        <Pagination
                            count={count}
                            shape="rounded"
                            onChange={(_, page: number) => handleChangePage(page)}
                            page={pageNumber}
                            color="primary"
                        />
                    </ThemeProvider>
                </div>
            )}
            {open && (
                <Sure
                    setOpen={setOpen}
                    setLoad={setLoad}
                    orderId={orderId}
                    setOrderId={setOrderId}
                    setCurrent={setCurrent}
                    current={current}
                />
            )}
        </div>
    );
};

export default OrderManage;
