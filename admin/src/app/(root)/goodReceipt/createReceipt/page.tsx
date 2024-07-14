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
import { CreateVariants, Supplier, User } from '@/types/type';
import axios from '@/utils/axios';
import { toast } from 'react-toastify';
import Loading from '@/components/shared/Loading';

const CreateGoodReceipt = () => {
    const router = useRouter();
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [confirmers, setConfirmers] = useState<User[]>([]);
    const [confirmer, setConfirmer] = useState<string>('');
    const [supplier, setSupplier] = useState<string>('');
    const [open, setOpen] = useState(false);
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    console.log(dateString);
    const [another, setAnother] = useState<{
        confirmation_date: string;
        total: number;
    }>({ confirmation_date: dateString, total: 0 });

    const [vars, setVars] = useState<CreateVariants[]>([
        {
            color: '',
            receipt_variant: [
                {
                    quantity: 0,
                    size: '',
                },
            ],
            name_product: '',
            total_price: 0,
            total_quantity: 0,
            unit_price: 0,
        },
    ]);

    const handleChangeConfirmer = (event: SelectChangeEvent) => {
        setConfirmer(event.target.value as string);
    };
    const handleChangeSupplier = (event: SelectChangeEvent) => {
        setSupplier(event.target.value as string);
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnother((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };
    const addVariant = () => {
        setVars([
            ...vars,
            {
                color: '',
                receipt_variant: [
                    {
                        quantity: 0,
                        size: '',
                    },
                ],
                name_product: '',
                total_price: 0,
                total_quantity: 0,
                unit_price: 0,
            },
        ]);
    };

    const handleSubmit = async () => {
        const item = {
            supplier: supplier,
            confirmer: confirmer,
            confirmation_date: another.confirmation_date,
            total: another.total,
            details: vars,
        };
        setOpen(true);
        const { data } = await axios.post('/good-receipts/receipts', item);
        if (data.success) {
            setOpen(false);
            toast.success('Create Receipts Success');
            router.push('/goodReceipt');
        } else {
            toast.error('Fail To Create');
        }
    };

    useEffect(() => {
        const fetchSuppliers = async () => {
            const { data } = await axios.get(`/good-receipts/suppliers?pageSize=6&pageNumber=1`);
            if (data.success) {
                setSuppliers(data.data);
            }
        };
        const fetchComfirmer = async () => {
            const { data } = await axios.get(`/users/find/role-admin`);
            if (data.success) {
                setConfirmers(data.data);
            }
        };
        fetchSuppliers();
        fetchComfirmer();
    }, []);
    return (
        <div className="flex flex-col gap-[10px]">
            <div className="font-bold">
                <div className="flex items-center cursor-pointer" onClick={() => router.push('/goodReceipt')}>
                    <ChevronLeftRoundedIcon />
                    <span>Back</span>
                </div>
                <span className="block mt-2 text-center text-lg">Create New Good Receipt</span>
            </div>

            <div className="px-10 py-5 bg-white shadow-product flex flex-col gap-5">
                <span className="ml-5 font-bold text-lg">Infomation of Receipt</span>
                <FormControl className="">
                    <InputLabel id="supplierId">Supplier</InputLabel>
                    <Select
                        labelId="supplierId"
                        id="supplier"
                        value={supplier}
                        label="Supplier"
                        onChange={handleChangeSupplier}
                        className="font-bold"
                    >
                        {suppliers &&
                            suppliers.map((item) => (
                                <MenuItem key={item._id} value={item._id}>
                                    {item.supplier_name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <FormControl className="">
                    <InputLabel id="confirmerId">Confirmer</InputLabel>
                    <Select
                        labelId="confirmerId"
                        id="confirmer"
                        value={confirmer}
                        label="Confirmer"
                        onChange={handleChangeConfirmer}
                        className="font-bold"
                    >
                        {confirmers.map((item) => (
                            <MenuItem key={item._id} value={item._id}>
                                {item.fullName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className="flex gap-[60px] items-center">
                    <TextField
                        id="confirmation_date"
                        label="Confirmation Date"
                        variant="outlined"
                        className="w-1/2"
                        type="date"
                        value={dateString}
                        onChange={handleChange}
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
                        onChange={handleChange}
                    />
                </div>
                <TextField id="notes" label="Notes" variant="outlined" multiline rows={5} onChange={handleChange} />
            </div>
            <div className="px-10 flex items-center justify-between">
                <span className="font-bold text-lg">Variants Of Product</span>
                <button
                    className="w-[150px] h-10 text-sm font-medium bg-blue bg-opacity-60 text-white rounded-[10px] hover:bg-opacity-100"
                    onClick={addVariant}
                >
                    Add New Variant
                </button>
            </div>
            <div className="flex flex-col gap-5">
                {vars.map((variant, index) => (
                    <AddProducts key={index} value={index} vars={variant} setVars={setVars} />
                ))}
            </div>
            <div className="flex gap-[26px] justify-end">
                <button
                    className="w-[200px] h-[50px] rounded-[5px] bg-red bg-opacity-50 text-white font-bold text-sm hover:bg-opacity-100"
                    onClick={() => router.push('/goodReceipt')}
                >
                    CANCEL
                </button>
                <button
                    className="w-[200px] h-[50px] rounded-[5px] bg-blue bg-opacity-50 text-white font-bold text-sm hover:bg-opacity-100"
                    onClick={handleSubmit}
                >
                    CREATE RECEIPT
                </button>
            </div>
            {open && (
                <div className="modal">
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default CreateGoodReceipt;
