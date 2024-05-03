'use client';
import { Brand } from '@/types/type';
import React, { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';

type Props = {
    hotdeals: Brand[];
    brand: string;
    setBrand: Dispatch<SetStateAction<string>>;
};

const HotDeals = ({ hotdeals, brand, setBrand }: Props) => {
    return (
        <div className="bg-deal p-5 rounded-lg">
            <span className="font-bold text-base">Hot Deals</span>
            <div>
                {hotdeals &&
                    hotdeals.map((b) => (
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

export default HotDeals;
