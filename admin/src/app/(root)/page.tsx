'use client';
import RevenueChartTime from '@/components/chart/RevenueChartTime';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [page, setPage] = useState<string>('Sold Of Brand');
    const router = useRouter();

    const handleChange = (event: SelectChangeEvent) => {
        setPage(event.target.value as string);
        router.push('/soldOfCategory');
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
                    <MenuItem value="Sold Of Brand">Sold Of Brand</MenuItem>
                    <MenuItem value="Sold Of Category">Sold Of Category</MenuItem>
                </Select>
            </FormControl>
            <div>
                <RevenueChartTime path="Brand" />
            </div>
            <div>
                <RevenueChartTime path="Brand & No Month" />
            </div>
        </div>
    );
}
