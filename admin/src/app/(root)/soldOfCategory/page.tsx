'use client';
import RevenueChartTime from '@/components/chart/RevenueChartTime';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const soldOfCategory = () => {
    const [page, setPage] = useState<string>('Sold Of Category');
    const router = useRouter();

    const handleChange = (event: SelectChangeEvent) => {
        setPage(event.target.value as string);
    };
    useEffect(() => {
        if (page === 'Revenue') {
            router.push('/');
        }
        if (page === 'Sold Of Brand') {
            router.push('/soldOfBrand');
        }
    }, [page]);

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
                    <MenuItem value="Revenue">Revenue</MenuItem>
                    <MenuItem value="Sold Of Brand">Sold Of Brand</MenuItem>
                    <MenuItem value="Sold Of Category">Sold Of Category</MenuItem>
                </Select>
            </FormControl>
            <div>
                <RevenueChartTime path="Cate" />
            </div>
            <div>
                <RevenueChartTime path="Cate & No Month" />
            </div>
        </div>
    );
};

export default soldOfCategory;
