'use client';

import FavoriteIcon from '@/components/shared/FavoriteIcon';
import Loading from '@/components/shared/Loading';
import NoData from '@/components/shared/NoData';
import Pagetination from '@/components/shared/Pagetination';
import UserNav from '@/components/shared/UserNav';
import { Product, User } from '@/types/type';
import axios from '@/utils/axios';
import { formatCurrency } from '@/utils/convertMoney';
import useAxiosPrivate from '@/utils/intercepter';
import { Rating } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEvent, useEffect, useState } from 'react';

const page = () => {
    const router = useRouter();
    const axiosPrivate = useAxiosPrivate();
    const [products, setProducts] = useState<Product[]>([]);
    const [load, setLoad] = useState(true);
    const [count, setCount] = useState(0);
    const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const userString = localStorage.getItem('user');
            if (userString !== null) {
                const user: User = JSON.parse(userString);
                setLoad(true);
                const { data } = await axiosPrivate.get(
                    `/products/find/by-favorites?pageSize=6&pageNumber=${pageNum}&user=${user._id}`,
                );
                if (data.success) {
                    setProducts(data.data);
                    setCount(data.pages);
                    setLoad(false);
                }
            }
        };
        fetchData();
    }, []);
    const favorite = async (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, id: string, i: boolean) => {
        e.stopPropagation();
        const token = localStorage.getItem('token');

        const updatedProducts = products.map((product) =>
            product._id === id ? { ...product, isFavorite: !product.isFavorite } : product,
        );
        setProducts(updatedProducts);
        console.log('Change', products);
        if (i) {
            await axiosPrivate.delete(`/favorites/un-favorite/${id}`);
            return;
        }
        const userString = localStorage.getItem('user');
        if (userString !== null) {
            const user: User = JSON.parse(userString);
            const item = {
                user: user._id,
                product: id,
            };
            await axiosPrivate.post('/favorites', item);
        }
    };
    const handleDetail = (id: string) => {
        router.push(`/shoes/${id}`);
    };
    return (
        <div className="flex justify-center px-20 mt-10 gap-5">
            <UserNav />
            <div className="flex flex-col w-[1100px]">
                {load ? (
                    <Loading />
                ) : products.length === 0 ? (
                    <NoData />
                ) : (
                    <div className={`${products && products.length === 0 ? '' : 'grid grid-cols-3 gap-[20px]'}`}>
                        {products.map((product: Product, index: number) => (
                            <div
                                key={product._id}
                                className="flex flex-col gap-2 cursor-pointer"
                                onClick={() => handleDetail(product._id)}
                            >
                                <div className="border-2 border-gray2 rounded-md p-1">
                                    {/* Single Product */}
                                    <div className="bg-bg_sell relative overflow-hidden hover:scale-110">
                                        <Image
                                            src={product.image}
                                            alt="Nike"
                                            width={300}
                                            height={236}
                                            className="rounded-md w-full h-[236px]"
                                        />
                                        {product.isStock === false && (
                                            <div className="absolute w-[292px] h-[236px] rounded-md bg-deal bg-opacity-75 top-0 text-xl flex items-center justify-center">
                                                Out Of Stock
                                            </div>
                                        )}
                                    </div>
                                    <div className="px-5 py-1 flex flex-col items-center gap-2">
                                        <div className="flex items-center justify-between mt-3 mb-3 w-full">
                                            <span className="text-gray text-base font-bold">{product.brand}</span>
                                            <div onClick={(e) => favorite(e, product._id, product.isFavorite)}>
                                                <FavoriteIcon isFavorite={product.isFavorite} />
                                            </div>
                                        </div>
                                        <h1 className="font-bold text-base text-center truncate w-full">
                                            {product.name}
                                        </h1>
                                        <Rating name="read-only" value={product.rating} readOnly />
                                        <span className="font-bak text-money ">{formatCurrency(product.price)}</span>
                                        <div className="w-full flex items-center justify-between text-gray font-bold">
                                            <span>Sold</span>
                                            <span>{product.sold}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {!load && <Pagetination pageNum={pageNum} setPageNum={setPageNum} pages={count} />}
            </div>
        </div>
    );
};

export default page;
