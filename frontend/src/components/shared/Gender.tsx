'use client';
import type { Brand } from '@/types/type';
import React, { Dispatch, SetStateAction, useState } from 'react';

type Props = {
    gender: string;
    setGender: Dispatch<SetStateAction<string>>;
};

const genders = ['MALE', 'FEMALE', 'UNISEX'];

const Gender = ({ gender, setGender }: Props) => {
    const handleClick = (g: string) => {
        if (g === gender) {
            setGender('');
        } else {
            setGender(g);
        }
    };

    return (
        <div className="bg-deal p-5 rounded-lg">
            <span className="font-bold text-base">Brands</span>
            <div>
                {genders.map((g) => (
                    <div
                        key={g}
                        className={`flex justify-between mt-5 ${
                            g === gender ? 'text-blue' : ''
                        } capitalize cursor-pointer`}
                        onClick={() => handleClick(g)}
                    >
                        <span>{g}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gender;
