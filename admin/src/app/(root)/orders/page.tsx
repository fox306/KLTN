'use client';
import Revenue from '@/components/chart/Revenue';
import RevenueChart from '@/components/chart/RevenueChart';
import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/navigation';
import RevenueChartTime from '@/components/chart/RevenueChartTime';

const OrderStatis = () => {
    const [page, setPage] = useState<string>('Statistical');

    const router = useRouter();

    const handleChange = (event: SelectChangeEvent) => {
        setPage(event.target.value as string);
        router.push('/order/manage');
    };
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
            <div>
                <Revenue path="Total Orders" />
            </div>
            <div>
                <RevenueChart path="Total Orders" />
            </div>
            <div>
                <RevenueChartTime path="Total Orders" />
            </div>
        </div>
    );
};

export default OrderStatis;
