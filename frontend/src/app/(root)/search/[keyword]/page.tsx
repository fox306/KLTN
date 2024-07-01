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
import {
    findProductByKeyword,
    getAllProductByCateId,
    getProductHotDeal,
    getQtyHotDealOfBrand,
    getQtyOfBrand,
} from '@/slices/productSlice';
import { getAllCategory } from '@/slices/categorySlice';
import { Category, Product, findProduct, productByCate } from '@/types/type';
import { useParams, usePathname } from 'next/navigation';
import { CircularProgress } from '@mui/material';

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
    const {
        products,
        brands,
        pages,
        loading,
    }: { products: Product[]; brands: Brand[]; pages: number; loading: boolean } = useSelector(
        (state: any) => state.products,
    );

    const dispatch = useDispatch<AppDispatch>();
    const [active, setActive] = useState(false);
    const [sort, setSort] = useState<string>('');
    const [view, setView] = useState<string>('');
    const [listProduct, setListProduct] = useState<Product[]>([]);
    const [color, setColor] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [pageNum, setPageNum] = useState<number>(1);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000);
    const pathname = usePathname();

    const { keyword }: { keyword: string } = useParams();

    useEffect(() => {
        const fetchData = () => {
            const item: findProduct = {
                keyword: keyword,
                brand: brand,
                color: color,
                sort: view,
                pageNumber: pageNum,
            };

            console.log('product of cate: ', item);
            dispatch(findProductByKeyword(item)).unwrap();
        };
        fetchData();
    }, [keyword, pageNum, view, brand, color]);

    useEffect(() => {
        if (sort === '') {
            setListProduct(products);
        } else if (sort === 'Low to High') {
            const filtered = products.filter((product) => product.price >= minPrice && product.price <= maxPrice);
            const sorted = filtered.sort((a, b) => a.price - b.price);
            setListProduct(sorted);
        } else {
            const filtered = products.filter((product) => product.price >= minPrice && product.price <= maxPrice);
            const sorted = filtered.sort((a, b) => b.price - a.price);
            setListProduct(sorted);
        }
    }, [products, sort]);

    useEffect(() => {
        const filtered = products.filter((product) => product.price >= minPrice && product.price <= maxPrice);
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
        <div className="flex px-[100px] gap-10 mt-5">
            <div className="flex flex-col gap-5 w-[260px]">
                <Price minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
                <Color color={color} setColor={setColor} />
                <Brand brands={brands} brand={brand} setBrand={setBrand} />
            </div>
            <div className="w-[1010px]">
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
                    setBrand={setBrand}
                    setColor={setColor}
                />
                {loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <CircularProgress color="secondary" size={60} />
                    </div>
                ) : active ? (
                    <ShoesWithTag listProduct={products.length !== 0 ? listProduct : products} />
                ) : (
                    <SingleSellShoe products={products.length !== 0 ? listProduct : products} {...unProp} />
                )}
                {products.length !== 0 ? <Pagetination setPageNum={setPageNum} pages={pages} /> : ''}
            </div>
        </div>
    );
};

export default ManShoes;
