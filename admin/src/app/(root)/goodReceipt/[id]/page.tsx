'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useParams, useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddProducts from '@/components/form/AddProducts';
import { CreateVariants, FullDetailReceipt, Supplier, User } from '@/types/type';
import axios from '@/utils/axios';
import { toast } from 'react-toastify';
import Loading from '@/components/shared/Loading';

const detailReceipt = () => {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState<FullDetailReceipt>({
        confirmation_date: '',
        confirmer: '',
        receiptId: '',
        supplier: '',
        total_receipt: 0,
        status: '',
        update_date: '',
        updater: '',
        details: [
            {
                _id: '',
                color: '',
                receipt_variant: [
                    {
                        _id: '',
                        quantity: 0,
                        size: '',
                    },
                ],
                name_product: '',
                total_price: 0,
                total_quantity: 0,
                unit_price: 0,
                receipt: '',
            },
        ],
    });
    const convertDate = (date: string) => {
        const [day, month, year] = date.split('/');

        return `${year}-${month?.padStart(2, '0')}-${day?.padStart(2, '0')}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(`/good-receipts/receipts/${id}`);
            if (data.success) {
                setDetail(data.data);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    console.log(detail);
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
                    className="w-full"
                    value={detail?.supplier}
                    aria-readonly
                />
                <div className={`${detail?.status === 'UPDATED' ? 'flex gap-[60px]' : ''}`}>
                    <TextField
                        id="confirmer"
                        label="Confirmer"
                        variant="outlined"
                        className={`${detail?.status === 'UPDATED' ? 'w-1/2' : 'w-full'}`}
                        value={detail?.confirmer}
                        aria-readonly
                    />
                    {detail?.status === 'UPDATED' && (
                        <TextField
                            id="updater"
                            label="Updater"
                            variant="outlined"
                            className="w-1/2"
                            value={detail?.updater}
                            aria-readonly
                        />
                    )}
                </div>

                <div className="flex gap-[60px] items-center">
                    <TextField
                        id="confirmation_date"
                        label="Confirmation Date"
                        variant="outlined"
                        className={`${detail?.status === 'UPDATED' ? 'w-1/3' : 'w-1/2'}`}
                        type="date"
                        value={convertDate(detail?.confirmation_date)}
                        aria-readonly
                    />
                    {detail?.status === 'UPDATED' && (
                        <TextField
                            id="update_date"
                            label="Update Date"
                            variant="outlined"
                            className="w-1/3"
                            type="date"
                            value={convertDate(detail?.update_date)}
                            aria-readonly
                        />
                    )}
                    <TextField
                        id="total"
                        label="Total Receipt"
                        variant="outlined"
                        className={`${detail?.status === 'UPDATED' ? 'w-1/3' : 'w-1/2'}`}
                        type="tel"
                        inputProps={{
                            className: 'text-orange font-bak',
                        }}
                        value={detail?.total_receipt}
                        aria-readonly
                    />
                </div>
                <TextField id="notes" label="Notes" variant="outlined" multiline rows={5} aria-readonly />
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
                                aria-readonly
                            />
                            <div className="flex justify-center gap-5">
                                <TextField
                                    id="color"
                                    label="Color"
                                    variant="outlined"
                                    inputProps={{
                                        className: 'text-center font-bold',
                                    }}
                                    value={item.color}
                                    aria-readonly
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
                                    aria-readonly
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
                                    aria-readonly
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
                                    aria-readonly
                                />
                            </div>
                        </div>
                        <div className="border-l-2 pl-20">
                            <span className="font-bold text-lg">List Size Of Color</span>

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
                                            aria-readonly
                                        />
                                        <TextField
                                            label="Quantity"
                                            variant="outlined"
                                            inputProps={{
                                                className: 'w-[200px]',
                                            }}
                                            value={item.quantity}
                                            aria-readonly
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {loading && <Loading />}
        </div>
    );
};

export default detailReceipt;
