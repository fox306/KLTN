'use client';
import Revenue from '@/components/chart/Revenue';
import Top from '@/components/chart/Top';
import { getTopTotalProductSoldThisMonth } from '@/slices/revenueSlice';
import { top } from '@/types/type';
import { AppDispatch } from '@/utils/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/navigation';
import RevenueChartTime from '@/components/chart/RevenueChartTime';

const WareHouseStatis = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { top }: { top: top[] } = useSelector((state: any) => state.revenue);

    const [page, setPage] = useState<string>('Statistical');

    const router = useRouter();

    const handleChange = (event: SelectChangeEvent) => {
        setPage(event.target.value as string);
    };

    useEffect(() => {
        dispatch(getTopTotalProductSoldThisMonth());
    }, [dispatch]);

    useEffect(() => {
        if (page === 'Inventory') {
            router.push('/warehouse/inventory');
        }
        if (page === 'Management') {
            router.push('/warehouse/manage');
        }
    }, [page]);
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
                    <MenuItem value="Inventory">Inventory</MenuItem>
                </Select>
            </FormControl>
            <div>
                <Revenue path="Total Product Sold" />
            </div>
            <div>{top.length != 0 && <Top path="product" top={top} />}</div>
            <RevenueChartTime path="Total Product Sold" />
        </div>
    );
};

export default WareHouseStatis;
