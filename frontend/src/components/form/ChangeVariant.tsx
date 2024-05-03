'use client';

import { getProductById } from '@/slices/productSlice';
import { getColorOfSize } from '@/slices/variantSlice';
import { RVariant, User, Variant, getQtyOfSizeColor } from '@/types/type';
import axios from '@/utils/axios';
import { AppDispatch } from '@/utils/store';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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
    productId: string;
    setActive: Dispatch<SetStateAction<boolean>>;
    setLoad: Dispatch<SetStateAction<boolean>>;
    items: RVariant;
    setItems: Dispatch<SetStateAction<RVariant>>;
    setManageQuantity: Dispatch<SetStateAction<number>>;
    manageQuantity: number;
};

const ChangeVariant = ({
    productId,
    setActive,
    setLoad,
    items,
    manageQuantity,
    setItems,
    setManageQuantity,
}: Props) => {
    const { variants }: { variants: Variant } = useSelector((state: any) => state.products);
    const { quantity }: { quantity: number } = useSelector((state: any) => state.variants);
    const { loading } = useSelector((state: any) => state.variants);
    const dispatch = useDispatch<AppDispatch>();
    console.log(loading);

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
    const [flag, setFlag] = useState<boolean>(false);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [dispatchCount, setDispatchCount] = useState(0);

    const handleInsc = () => {
        if (!items.color || !items.size) {
            toast.error('Choose Color And Size');
        } else {
            if (manageQuantity === items.quantity) return;
            setManageQuantity((prev) => prev + 1);
        }
    };
    const handleDesc = () => {
        if (!items.color || !items.size) toast.error('Choose Color And Size');
        else {
            if (manageQuantity === 1) return;
            setManageQuantity((prev) => prev - 1);
        }
    };

    const handleSetSize = (newSize: string) => {
        setItems({ size: newSize, color: '', quantity: 0, hex: '', image: '' });
    };
    const handleSetColor = (newColor: string, hex: string) => {
        setItems({ ...items, color: newColor, hex: hex });
        setFlag((prev) => !prev);
        console.log('Hi');
    };

    const handleChange = async () => {
        const { data } = await axios.patch('/carts/updateVariant', {
            user: id,
            product: productId,
            color: items.color,
            size: items.size,
            quantity: manageQuantity,
        });
        if (data.success) {
            toast.success('Update variant success');
            setActive(false);
            setLoad((prev) => !prev);
        } else {
            toast.error('Update variant fail');
        }
    };

    useEffect(() => {
        let isMounted = true;
        if (!isFirstRender) {
            const item: getQtyOfSizeColor = {
                id: productId,
                color: items.color,
                size: items.size,
            };

            dispatch(getColorOfSize(item))
                .then(() => {
                    if (isMounted) {
                        setDispatchCount((prevCount) => prevCount + 1);
                    }
                })
                .catch((error) => {
                    // Xử lý lỗi nếu có
                });
        } else {
            setIsFirstRender(false);
        }
    }, [flag]);
    useEffect(() => {
        dispatch(getProductById(productId));
    }, []);
    useEffect(() => {
        if (dispatchCount > 0) {
            setItems({ ...items, quantity: quantity });
        }
    }, [dispatchCount]);

    return (
        <div className="modal">
            <div className="flex flex-col bg-white modal-container ">
                <div className="flex flex-col items-center ">
                    <div className="flex items-center mt-[25px] mb-5 w-full">
                        <span className="font-medium flex-1">Size:</span>
                        <div className="font-bold text-white flex gap-1">
                            {variants &&
                                variants.listSize &&
                                variants.listSize.map((item, i: number) => (
                                    <div
                                        key={i}
                                        className={`text-sm w-9 h-7 cursor-pointer ${
                                            item === items.size ? 'bg-blue' : 'bg-[#8d9096] '
                                        } rounded-md flex items-center justify-center font-bold`}
                                        onClick={() => handleSetSize(item)}
                                    >
                                        {item}
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="flex items-center mt-[25px] mb-5 w-full">
                        <span className="font-medium flex-1">Color:</span>
                        <div className="font-bold text-white flex gap-2">
                            {variants &&
                                variants.listColor &&
                                variants.listColor.map((item, i) => (
                                    <div
                                        key={i}
                                        onClick={() => handleSetColor(item.color, item.hex)}
                                        className={`w-5 h-5 relative rounded-full cursor-pointer ${colors[item.color]}`}
                                    >
                                        <div
                                            className={`absolute inset-[-4px] p-3 rounded-full border-2 ${
                                                item.color === items.color ? 'border-blue' : ''
                                            }`}
                                        ></div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="font-medium mb-[25px] flex w-full ">
                        <span className="flex-1">Availability:</span>
                        <span>{items.quantity === 0 ? '' : items.quantity}</span>
                    </div>

                    <div className="flex h-[50px] text-xl font-bold">
                        <span
                            className="w-11 flex items-center justify-center bg-[#F6F7F8] rounded-tl-md rounded-bl-md text-blue cursor-pointer"
                            onClick={handleDesc}
                        >
                            -
                        </span>
                        <span className="w-[62px] flex items-center justify-center bg-[#FAFBFB] rounded-md ">
                            {manageQuantity}
                        </span>
                        <span
                            className="w-11 flex items-center justify-center bg-[#F6F7F8] rounded-tr-md rounded-br-md text-blue cursor-pointer"
                            onClick={handleInsc}
                        >
                            +
                        </span>
                    </div>
                </div>
                <button
                    className="w-[200px] h-10 rounded-full bg-blue text-white font-bold hover:bg-opacity-60 mt-5"
                    onClick={handleChange}
                >
                    Comfirm
                </button>
                <button
                    className="w-[200px] h-10 rounded-full bg-red text-white font-bold hover:bg-opacity-60 mt-5"
                    onClick={() => {
                        setActive(false);
                        setIsFirstRender(true);
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ChangeVariant;
