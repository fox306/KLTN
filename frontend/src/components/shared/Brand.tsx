'use client';
import type { Brand } from '@/types/type';
import React, { Dispatch, SetStateAction } from 'react';

type Props = {
    brands: Brand[];
    brand: string;
    setBrand: Dispatch<SetStateAction<string>>;
};

const Brand = ({ brands, brand, setBrand }: Props) => {
    return (
        <div className="bg-deal p-5 rounded-lg">
            <span className="font-bold text-base">Brands</span>
            <div>
                {brands &&
                    brands.map((b) => (
                        <div
                            key={b.brand}
                            className={`flex justify-between mt-5 ${
                                b.brand === brand ? 'text-blue' : ''
                            } cursor-pointer`}
                            onClick={() => setBrand(() => b.brand)}
                        >
                            <span>{b.brand}</span>
                            <span>{b.quantity}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Brand;
