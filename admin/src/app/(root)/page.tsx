'use client';
import RevenueChartTime from '@/components/chart/RevenueChartTime';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Revenue from '@/components/chart/Revenue';
import RevenueChart from '@/components/chart/RevenueChart';

export default function Home() {
    const [page, setPage] = useState<string>('Revenue');
    const router = useRouter();

    const handleChange = (event: SelectChangeEvent) => {
        setPage(event.target.value as string);
        router.push(event.target.value as string);
    };

    return (
        <div className="flex flex-col gap-[10px]">
            <FormControl className="w-[150px] mb-[10px]">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={page}
                    label="Page"
                    onChange={handleChange}
                    variant="standard"
                    className="font-bold text-lg"
                >
                    <MenuItem value="/">Revenue</MenuItem>
                    <MenuItem value="/soldOfBrand">Sold Of Brand</MenuItem>
                    <MenuItem value="/soldOfCategory">Sold Of Category</MenuItem>
                </Select>
            </FormControl>
            <div>
                <Revenue path="Revenue" />
            </div>

            <div>
                <RevenueChart path="Revenue" />
            </div>
            <div>
                <RevenueChartTime path="Revenue" />
            </div>
        </div>
    );
}
