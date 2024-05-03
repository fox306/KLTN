'use client';
import { Category } from '@/types/type';
import Image from 'next/image';
import React, { Dispatch } from 'react';

type Props = {
    categories: Category[];
    setItem: Dispatch<React.SetStateAction<Category>>;
};
const CategoriesList = ({ categories, setItem }: Props) => {
    const handleSet = (item: Category) => {
        setItem({
            _id: item._id,
            name: item.name,
            img: item.img,
        });
    };
    return (
        <div className="overflow-x-scroll w-[80vw]">
            <div className="flex gap-5">
                {categories &&
                    categories.map((item) => (
                        <div
                            key={item._id}
                            className="flex gap-[10px] p-[10px] shadow-revenue min-w-[280px] bg-white cursor-pointer hover:border-2 hover:border-blue"
                            onClick={() => handleSet(item)}
                        >
                            <Image
                                src={item.img}
                                alt="Cate"
                                width={100}
                                height={100}
                                className="w-[100px] h-[100px] shadow-cate"
                            />
                            <div className="flex flex-col w-[150px] items-center">
                                <div className="text-right w-full">
                                    <input type="checkbox" className="w-5 h-5" />
                                </div>
                                <span className="font-bold">{item.name}</span>
                                <div className="flex justify-between mt-[30px] font-medium text-sm w-full">
                                    <span>Total:</span>
                                    <span>23</span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CategoriesList;
