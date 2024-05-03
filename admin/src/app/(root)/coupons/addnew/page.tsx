'use client';
import { ChangeEvent, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { CreateCoupon } from '@/types/type';
import axios from '@/utils/axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const AddNewCouponPage = () => {
    const router = useRouter();

    const [value, setValue] = useState<string>('percent');
    const [coupon, setCoupon] = useState<CreateCoupon>({
        code: '',
        name: '',
        value: 0,
        maxDiscount: 0,
        minAmount: 0,
        validityDuration: 0,
    });

    const handleChangeType = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    };
    const parseValue = (value: string) => {
        return parseFloat(value);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const unParsedValue = id === 'code' || id === 'name' ? value : parseValue(value);
        setCoupon((prev) => ({
            ...prev,
            [id]: unParsedValue,
        }));
    };
    const handleSubmit = async () => {
        const item = { ...coupon, type: value };
        const { data } = await axios.post('/coupons', item);
        if (data.success) {
            toast.success('Create Coupon success');
            setCoupon({ code: '', maxDiscount: 0, minAmount: 0, name: '', validityDuration: 0, value: 0 });
            router.push('/coupons');
        }
    };

    return (
        <div>
            <div className="bg-white rounded-[10px] py-[10px] px-5 shadow-product2">
                <div className="flex gap-[10px] justify-center items-center">
                    <div className="flex flex-col">
                        <span className="w-[240px] h-[50px] flex items-center">Code</span>
                        <span className="w-[240px] h-[50px] flex items-center">Name</span>
                        <span className="w-[240px] h-[50px] flex items-center">Value</span>
                        <span className="w-[240px] h-[50px] flex items-center">Type</span>
                        <span className="w-[240px] h-[50px] flex items-center">Min Order</span>
                        <span className="w-[240px] h-[50px] flex items-center">Max Discount</span>
                        <span className="w-[240px] h-[50px] flex items-center">Valuable Time</span>
                    </div>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            placeholder="Code..."
                            id="code"
                            onChange={(e) => handleChange(e)}
                            className="w-[240px] h-[50px] outline-none border-b-[1px] border-blue"
                        />
                        <input
                            type="text"
                            placeholder="Name..."
                            id="name"
                            onChange={(e) => handleChange(e)}
                            className="w-[240px] h-[50px] outline-none border-b-[1px] border-blue"
                        />
                        <input
                            type="text"
                            placeholder="Value..."
                            id="value"
                            onChange={(e) => handleChange(e)}
                            className="w-[240px] h-[50px] outline-none border-b-[1px] border-blue"
                        />
                        <FormControl className="w-[240px] h-[50px]">
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
                        <input
                            type="text"
                            placeholder="Min Order..."
                            id="minAmount"
                            onChange={(e) => handleChange(e)}
                            className="w-[240px] h-[50px] outline-none border-b-[1px] border-blue"
                        />
                        <input
                            type="text"
                            placeholder="Max Discount..."
                            id="maxDiscount"
                            onChange={(e) => handleChange(e)}
                            className="w-[240px] h-[50px] outline-none border-b-[1px] border-blue"
                        />
                        <input
                            type="text"
                            placeholder="Valuable Time..."
                            id="validityDuration"
                            onChange={(e) => handleChange(e)}
                            className="w-[240px] h-[50px] outline-none border-b-[1px] border-blue"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-[150px] h-[50px] bg-blue bg-opacity-60 text-white font-bold text-xs rounded-[5px] hover:bg-opacity-100 ml-5"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewCouponPage;
