'use client';
import Brand from '@/components/shared/Brand';
import HotDeals from '@/components/shared/HotDeals';
import Price from '@/components/shared/Price';
import Color from '@/components/shared/Color';
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Sort from '@/components/shared/Sort';
import ShoesWithTag from '@/components/cards/ShoesWithTag';
import Pagetination from '@/components/shared/Pagetination';
import SingleSellShoe from '@/components/cards/SingleSellShoe';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { getAllProductByCateId, getProductHotDeal, getQtyHotDealOfBrand, getQtyOfBrand } from '@/slices/productSlice';
import { getAllCategory } from '@/slices/categorySlice';
import { Category, Product, productByCate } from '@/types/type';
import { usePathname } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import axios from '@/utils/axios';
import NoData from '@/components/shared/NoData';

const unProp = {
    productHots: [],
    active: false,
    isBack: false,
    isNext: false,
    next: 0,
    back: 0,
    setBack: () => {},
    setNext: () => {},
    setIsBack: () => {},
    setIsNext: () => {},
};

const ManShoes = () => {
    const { categories }: { categories: Category[] } = useSelector((state: any) => state.categories);
    const { brands }: { brands: Brand[] } = useSelector((state: any) => state.products);

    const dispatch = useDispatch<AppDispatch>();
    const [active, setActive] = useState(false);
    const [sort, setSort] = useState<string>('');
    const [view, setView] = useState<string>('NEW');
    const [listProduct, setListProduct] = useState<Product[]>([]);
    const [fakeListProduct, setFakeListProduct] = useState<Product[]>([]);
    const [color, setColor] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [pageNum, setPageNum] = useState<number>(1);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000);
    const pathname = usePathname();
    const [load, setLoad] = useState(true);
    const [count, setCount] = useState(0);

    const found = useMemo(
        () =>
            categories.find(
                (category) => category.name.toLowerCase().replace(/\s/g, '') === String(pathname.split('/')[1]),
            ),
        [categories, pathname],
    );

    const idCate = found?._id as string;

    useEffect(() => {
        const fetchData = async () => {
            const item: productByCate = {
                category: idCate,
                brand: brand,
                color: color,
                sort: view,
                pageNumber: pageNum,
            };

            console.log('product of cate: ', item);
            // await dispatch(getAllProductByCateId(item)).unwrap();
            let url = `/products/find/by-category?category=${item.category}&pageSize=6&pageNumber=${item.pageNumber}`;
            if (item.color) {
                url += `&color=${item.color}`;
            }
            if (item.brand) {
                url += `&brand=${item.brand}`;
            }
            if (item.sort) {
                url += `&sort=${item.sort}`;
            }
            setLoad(true);
            const { data } = await axios.get(url);
            if (data.success) {
                setListProduct(data.data);
                setFakeListProduct(data.data);
                setCount(data.pages);
                setLoad(false);
            }
        };
        if (idCate) {
            fetchData();
        }
    }, [idCate, pageNum, view, brand, color]);
    useEffect(() => {
        if (sort === 'Low to High') {
            const filtered = listProduct.filter((product) => product.price >= minPrice && product.price <= maxPrice);
            const sorted = filtered.sort((a, b) => a.price - b.price);

            setListProduct(sorted);
        } else {
            const filtered = listProduct.filter((product) => product.price >= minPrice && product.price <= maxPrice);
            const sorted = filtered.sort((a, b) => b.price - a.price);
            setListProduct(sorted);
        }
    }, [sort]);
    useEffect(() => {
        const filtered = fakeListProduct.filter((product) => product.price >= minPrice && product.price <= maxPrice);
        setListProduct(filtered);
    }, [minPrice, maxPrice]);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getQtyOfBrand());
            await dispatch(getQtyHotDealOfBrand());
        };
        fetchData();
    }, [dispatch]);

    return (
        <div className="flex justify-center px-[100px] gap-10 mt-5">
            <div className="flex flex-col gap-5 w-[260px]">
                <Price minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
                <Color color={color} setColor={setColor} />
                <Brand brands={brands} brand={brand} setBrand={setBrand} />
            </div>
            <div className="w-[1010px] flex flex-col">
                <div className="w-full h-[280px] relative ">
                    <Image src="/layout.png" alt="Ảnh" fill />
                </div>
                <Sort
                    setActive={setActive}
                    active={active}
                    sort={sort}
                    setSort={setSort}
                    view={view}
                    setView={setView}
                />
                {load ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <CircularProgress color="secondary" size={60} />
                    </div>
                ) : load === false && listProduct.length === 0 ? (
                    <NoData />
                ) : active ? (
                    <ShoesWithTag listProduct={listProduct} setListProduct={setListProduct} />
                ) : (
                    <SingleSellShoe products={listProduct} setListProduct={setListProduct} {...unProp} />
                )}
                <div className="flex-grow"></div>
                {listProduct.length !== 0 ? (
                    <Pagetination pageNum={pageNum} setPageNum={setPageNum} pages={count} />
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default ManShoes;
