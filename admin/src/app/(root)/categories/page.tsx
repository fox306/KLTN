'use client';
import CategoriesList from '@/components/cards/CategoriesList';
import React, { MouseEvent, useEffect, useState } from 'react';
import EditCate from '@/components/form/EditCate';
import AddNewCate from '@/components/form/AddNewCate';
import { Category } from '@/types/type';
import axios from '@/utils/axios';

const Categories = () => {
    const [load, setLoad] = useState(false);
    const [item, setItem] = useState<Category>({
        _id: '',
        name: '',
        img: '',
    });
    const [selected, setSelected] = useState<Category[]>([]);
    const [cateList, setCateList] = useState<Category[]>([]);
    const [checkedAll, setCheckedAll] = useState<boolean>(false);

    const handleFilterData = (data: Category[]) => {
        const filterData = data.filter((item) => {
            return item.selected;
        });
        setSelected(filterData);
    };
    const handleSelectedItem = (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>, item: Category) => {
        e.stopPropagation();
        const selectedItem = cateList.map((data) => {
            if (item._id === data._id) {
                return {
                    ...data,
                    selected: !data.selected,
                };
            } else return data;
        });
        setCateList(selectedItem);
        handleFilterData(selectedItem);
    };

    const handleSelectedAll = () => {
        const filterCart = cateList?.map((data) => {
            if (checkedAll) {
                return {
                    ...data,
                    selected: false,
                };
            } else {
                return {
                    ...data,
                    selected: true,
                };
            }
        });
        // setCateList(filterCart);
        handleFilterData(filterCart);
    };
    const validateSelectedAll = () => {
        const data = cateList?.every((item) => item.selected === true);
        setCheckedAll(data);
    };

    useEffect(() => {
        validateSelectedAll();
    }, [selected]);
    console.log(selected);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/categories');
            if (data.success) {
                setCateList(data.data);
            }
        };
        fetchData();
    }, [load]);
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
                <CategoriesList categories={cateList} setItem={setItem} handleSelectedItem={handleSelectedItem} />
            </div>
            <div className="h-[400px] shadow-product bg-white py-5 px-[100px] flex gap-[110px]">
                <EditCate item={item} setLoad={setLoad} />
                <AddNewCate setLoad={setLoad} />
            </div>
        </div>
    );
};

export default Categories;
