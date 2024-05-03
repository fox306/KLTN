'use client';
import CategoriesList from '@/components/cards/CategoriesList';
import { TextField } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import EditCate from '@/components/form/EditCate';
import AddNewCate from '@/components/form/AddNewCate';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { getAllCategory } from '@/slices/categorySlice';
import { Category } from '@/types/type';

const Categories = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories }: { categories: Category[] } = useSelector((state: any) => state.categories);
    const [load, setLoad] = useState(false);
    const [item, setItem] = useState<Category>({
        _id: '',
        name: '',
        img: '',
    });

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch, load]);
    return (
        <div className="flex flex-col gap-[14px]">
            <div className="flex gap-5">
                <button className="h-10 w-[100px] text-white text-sm text-medium bg-blue bg-opacity-60 rounded-lg">
                    Select All
                </button>
                <button className="h-10 w-[110px] text-white text-sm text-medium bg-blue bg-opacity-60 rounded-lg">
                    Delete All
                </button>
                <button className="h-10 w-[140px] text-white text-sm text-medium bg-blue bg-opacity-60 rounded-lg">
                    Delete Select
                </button>
            </div>
            <div>
                <CategoriesList categories={categories} setItem={setItem} />
            </div>
            <div className="h-[400px] shadow-product bg-white py-5 px-[100px] flex gap-[110px]">
                <EditCate item={item} setLoad={setLoad} />
                <AddNewCate setLoad={setLoad} />
            </div>
        </div>
    );
};

export default Categories;
