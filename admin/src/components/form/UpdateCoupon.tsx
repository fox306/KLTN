'use client';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import { CreateCoupon } from '@/types/type';
import axios from '@/utils/axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import useAxiosPrivate from '@/utils/intercepter';
type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>;
    setLoad: Dispatch<SetStateAction<boolean>>;
    id: string;
};

const UpdateCoupon = ({ setLoad, setOpen, id }: Props) => {
    const router = useRouter();
    const axiosPrivate = useAxiosPrivate();

    const [coupon, setCoupon] = useState<CreateCoupon>({
        code: '',
        name: '',
        value: 0,
        maxDiscount: 0,
        minAmount: 0,
        validityDuration: 0,
    });

    const [value, setValue] = useState<string>('percent');

    const handleChangeType = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    };
    const parseValue = (value: string) => {
        return parseFloat(value);
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const unParsedValue = id === 'code' || id === 'name' ? value : parseValue(value);
        setCoupon((prev) => ({
            ...prev,
            [id]: unParsedValue,
        }));
    };
    const handleSubmit = async () => {
        const item = { ...coupon, type: value };
        const { data } = await axiosPrivate.post('/coupons', item);
        if (data.success) {
            toast.success('Update Coupon success');
            setLoad((prev) => !prev);
            setOpen(false);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axiosPrivate.get(`/coupons/${id}`);
            if (data.success) {
                setCoupon(data.data);
                setValue(data.data.type);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="modal">
            <div className="flex flex-col p-10 bg-white">
                <div className="relative text-center mb-[34px]">
                    <span className="font-bold text-lg">UPDATE COUPON</span>
                    <CloseOutlinedIcon
                        className="absolute right-0 top-[-24px] text-[40px] text-red opacity-50 hover:opacity-100 cursor-pointer"
                        onClick={() => setOpen(false)}
                    />
                </div>
                <div className="flex flex-col gap-[10px]">
                    <TextField
                        id="code"
                        label="Code"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                        value={coupon.code}
                        className="w-[600px] shadow-input"
                    />
                    <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                        value={coupon.name}
                        className="w-[600px] shadow-input"
                    />
                    <div className="flex gap-2 items-center">
                        <TextField
                            id="value"
                            label="Value"
                            variant="outlined"
                            value={coupon.value}
                            onChange={(e) => handleChange(e)}
                            className="w-1/2 shadow-input"
                        />
                        <FormControl className="w-1/2 h-[50px]">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={value}
                                label="Page"
                                onChange={handleChangeType}
                                variant="standard"
                                className="font-bold text-lg h-[50px]"
                            >
                                <MenuItem value="percent">Percent</MenuItem>
                                <MenuItem value="price">Price</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <TextField
                        id="minAmount"
                        label="Min Order"
                        variant="outlined"
                        value={coupon.minAmount}
                        onChange={(e) => handleChange(e)}
                        className="w-[600px] shadow-input"
                    />
                    <TextField
                        id="maxDiscount"
                        label="Max Discount"
                        variant="outlined"
                        value={coupon.maxDiscount}
                        onChange={(e) => handleChange(e)}
                        className="w-[600px] shadow-input"
                    />
                    <TextField
                        id="validityDuration"
                        label="Valuable Time"
                        variant="outlined"
                        value={coupon.validityDuration}
                        onChange={(e) => handleChange(e)}
                        className="w-[600px] shadow-input"
                    />
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
        </div>
    );
};

export default UpdateCoupon;
