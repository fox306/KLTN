'use client';
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Supplier } from '@/types/type';
import axios from '@/utils/axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Loading from '../shared/Loading';

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>;
    setLoad: Dispatch<SetStateAction<boolean>>;
    supplier: Supplier;
    setSupplier: Dispatch<SetStateAction<Supplier>>;
    banks: { _id: string; bank_name: string }[];
};
const methods = ['TRANSFER', 'CASH'];

const UpdateSupplier = ({ setOpen, setLoad, supplier, setSupplier, banks }: Props) => {
    const [loading, setLoading] = useState(false);
    const handleChange = (field: string, value: string) => {
        setSupplier((prev) => ({ ...prev, [field]: value }));
    };
    const handleChangeBank = (field: string, value: string) => {
        setSupplier((prev) => ({
            ...prev,
            billing_infomation: {
                ...prev.billing_infomation,
                [field]: value,
            },
        }));
    };
    const handleSubmit = async () => {
        setLoading(true);
        const { data } = await axios.post('/good-receipts/suppliers', supplier);
        if (data.success) {
            setLoading(false);
            setOpen(false);
            setLoad(true);
            toast.success('Update Supplier success');
        } else {
            toast.error('Update Supplier fail');
        }
    };

    return (
        <div className="modal">
            <div className="flex flex-col p-10 bg-white">
                <div className="relative text-center mb-[34px]">
                    <span className="font-bold text-lg">CREATE NEW SUPPLIER</span>
                    <CloseOutlinedIcon
                        className="absolute right-0 top-[-24px] text-[40px] text-red opacity-50 hover:opacity-100 cursor-pointer"
                        onClick={() => setOpen(false)}
                    />
                </div>
                <div className="flex flex-col gap-[10px]">
                    <TextField
                        id="supplier_name"
                        label="Supplier Name"
                        variant="outlined"
                        onChange={(e) => handleChange('supplier_name', e.target.value)}
                        className="w-[600px] shadow-input"
                        value={supplier.supplier_name}
                    />
                    <TextField
                        id="contacter_name"
                        label="Contacter Name"
                        variant="outlined"
                        onChange={(e) => handleChange('contacter_name', e.target.value)}
                        className="w-[600px] shadow-input"
                        value={supplier.contacter_name}
                    />
                    <div className="flex gap-[10px]">
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            className="w-2/3 shadow-input"
                            onChange={(e) => handleChange('email', e.target.value)}
                            value={supplier.email}
                        />
                        <TextField
                            id="phone"
                            label="Phone"
                            variant="outlined"
                            type="tel"
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="w-1/3 shadow-input"
                            value={supplier.phone}
                        />
                    </div>
                    <TextField id="address" label="Address" variant="outlined" className="w-[600px] shadow-input" />
                    <div className="flex gap-[10px]">
                        <FormControl className="w-1/4 shadow-input">
                            <InputLabel id="billingMethod">Billing Method</InputLabel>
                            <Select
                                labelId="billingMethod"
                                id="method"
                                value={supplier.billing_infomation.method}
                                label="billingMethod"
                                onChange={(e) => handleChangeBank('method', e.target.value)}
                                className="font-bold"
                            >
                                {methods.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className="w-1/4 shadow-input">
                            <InputLabel id="bankName">Bank Name</InputLabel>
                            <Select
                                labelId="bankName"
                                id="bank"
                                value={supplier.billing_infomation.bank}
                                label="bankName"
                                onChange={(e) => handleChangeBank('bank', e.target.value)}
                                className="font-bold"
                            >
                                {banks.map((item) => (
                                    <MenuItem key={item._id} value={item.bank_name}>
                                        {item.bank_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            id="bank_account"
                            label="Bank Account"
                            variant="outlined"
                            type="tel"
                            onChange={(e) => handleChangeBank('bank_account', e.target.value)}
                            className="w-2/4 shadow-input"
                            value={supplier.billing_infomation.bank_account}
                        />
                    </div>
                </div>
                <div className="flex gap-5 mt-[10px]">
                    <button
                        className="w-1/2 h-10 font-medium text-base text-red bg-red bg-opacity-[15%] rounded-[5px] shadow-cancel hover:bg-opacity-100 hover:text-white"
                        onClick={() => setOpen(false)}
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="w-1/2 h-10 font-medium text-base text-blue bg-blue bg-opacity-[15%] rounded-[5px] shadow-create hover:bg-opacity-100 hover:text-white"
                    >
                        CREATE
                    </button>
                </div>
            </div>
            {loading && (
                <div className="modal">
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default UpdateSupplier;
