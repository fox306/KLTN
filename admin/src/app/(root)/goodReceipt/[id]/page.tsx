'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddProducts from '@/components/form/AddProducts';
import { CreateVariants, FullDetailReceipt, Supplier, User } from '@/types/type';
import axios from '@/utils/axios';
import { toast } from 'react-toastify';

const detailReceipt = () => {
    const router = useRouter();
    const [detail, setDetail] = useState<FullDetailReceipt>();
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    console.log(dateString);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/good-receipts/suppliers?pageSize=6&pageNumber=1`);
            if (data.success) {
                setDetail(data.data);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="flex flex-col gap-[10px]">
            <div className="font-bold">
                <div className="flex items-center cursor-pointer" onClick={() => router.push('/goodReceipt')}>
                    <ChevronLeftRoundedIcon />
                    <span>Back</span>
                </div>
                <span className="block mt-2 text-center text-lg">Detail Receipt</span>
            </div>

            <div className="px-10 py-5 bg-white shadow-product flex flex-col gap-5">
                <span className="ml-5 font-bold text-lg">Infomation of Receipt</span>
                <TextField
                    id="supplier"
                    label="Supplier"
                    variant="outlined"
                    className="w-1/2"
                    type="date"
                    value={detail?.supplier}
                />
                <TextField
                    id="confirmer"
                    label="Confirmer"
                    variant="outlined"
                    className="w-1/2"
                    type="date"
                    value={detail?.confirmer}
                />
                <div className="flex gap-[60px] items-center">
                    <TextField
                        id="confirmation_date"
                        label="Confirmation Date"
                        variant="outlined"
                        className="w-1/2"
                        type="date"
                        value={detail?.confirmation_date}
                    />
                    <TextField
                        id="total"
                        label="Total Receipt"
                        variant="outlined"
                        className="w-1/2"
                        type="tel"
                        inputProps={{
                            className: 'text-orange font-bak',
                        }}
                        value={detail?.total_receipt}
                    />
                </div>
                <TextField id="notes" label="Notes" variant="outlined" multiline rows={5} />
            </div>
            <div className="px-10 flex items-center justify-between">
                <span className="font-bold text-lg">Variants Of Product</span>
            </div>
            <div className="flex flex-col gap-5">
                {detail?.details.map((item, i) => (
                    <div className={`grid grid-cols-2 shadow-product3 bg-white px-10 py-5 ${i > 0 ? 'mt-[10px]' : ''}`}>
                        <div className="flex flex-col pr-[30px] gap-[10px]">
                            <TextField
                                id="name_product"
                                label="Name of Product"
                                variant="outlined"
                                inputProps={{
                                    className: 'text-center',
                                }}
                                value={item.name_product}
                            />
                            <div className="flex gap-5">
                                <TextField
                                    id="color"
                                    label="Color"
                                    variant="outlined"
                                    inputProps={{
                                        className: 'text-center font-bold',
                                    }}
                                    value={item.color}
                                />
                                <TextField
                                    id="total_quantity"
                                    label="Total Quantity"
                                    variant="outlined"
                                    className="w-1/2"
                                    type="tel"
                                    inputProps={{
                                        className: 'text-center',
                                    }}
                                    value={item.total_quantity}
                                />
                            </div>
                            <div className="flex gap-5">
                                <TextField
                                    id="unit_price"
                                    label="Unit Price"
                                    variant="outlined"
                                    className="w-1/2"
                                    type="tel"
                                    inputProps={{
                                        className: 'text-center',
                                    }}
                                    value={item.unit_price}
                                />
                                <TextField
                                    id="total_price"
                                    label="Total Price"
                                    variant="outlined"
                                    className="w-1/2"
                                    type="tel"
                                    inputProps={{
                                        className: 'text-center',
                                    }}
                                    value={item.total_price}
                                />
                            </div>
                        </div>
                        <div className="border-l-2 pl-20">
                            <span className="font-bold text-lg">List Size Of Color</span>
                        </div>
                        <div>
                            {item.receipt_variant.map((item, index) => (
                                <div key={index} className="flex items-center gap-[25px] justify-center mt-[10px]">
                                    <TextField
                                        label="Size"
                                        variant="outlined"
                                        inputProps={{
                                            className: 'w-[200px]',
                                        }}
                                        value={item.size}
                                    />
                                    <TextField
                                        label="Quantity"
                                        variant="outlined"
                                        inputProps={{
                                            className: 'w-[200px]',
                                        }}
                                        value={item.quantity}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default detailReceipt;
