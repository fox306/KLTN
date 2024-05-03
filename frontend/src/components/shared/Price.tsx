'use client';

import React, { Dispatch, SetStateAction } from 'react';
import Slider from '@mui/material/Slider';

type Props = {
    minPrice: number;
    setMinPrice: Dispatch<SetStateAction<number>>;
    maxPrice: number;
    setMaxPrice: Dispatch<SetStateAction<number>>;
};

const Price = ({ minPrice, setMinPrice, maxPrice, setMaxPrice }: Props) => {
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setMinPrice(newValue[0]);
            setMaxPrice(newValue[1]);
        }
    };

    const valuetext = (value: number) => `${value}`;
    return (
        <div className="p-5 bg-deal rounded-lg">
            <span className="font-bold text-base">Prices</span>
            <div className="mt-5 mb-[10px] flex items-center justify-between ">
                <span>Ranger: </span>
                <span>
                    ${minPrice} - ${maxPrice}
                </span>
            </div>
            <Slider
                value={[minPrice, maxPrice]}
                onChange={handleChange}
                getAriaLabel={() => 'Temperature range'}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                min={0}
                max={2000}
            />
        </div>
    );
};

export default Price;
