'use client';
import { Rating } from '@mui/material';
import Image from 'next/image';
import React, { Dispatch, MouseEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { Product, User } from '@/types/type';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { toast } from 'react-toastify';
import axios from '@/utils/axios';
import FavoriteIcon from '../shared/FavoriteIcon';

type Props = {
    products: Product[];
    productHots: Product[];
    active: boolean;
    isNext: boolean;
    setIsNext: Dispatch<SetStateAction<boolean>>;
    isBack: boolean;
    setIsBack: Dispatch<SetStateAction<boolean>>;
    next: number;
    setNext: Dispatch<SetStateAction<number>>;
    back: number;
    setBack: Dispatch<SetStateAction<number>>;
    setListProduct: Dispatch<SetStateAction<Product[]>>;
};

const SingleSellShoe = ({
    products,
    productHots,
    active,
    isNext,
    setIsNext,
    isBack,
    setIsBack,
    next,
    setNext,
    back,
    setBack,
    setListProduct,
}: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    const handleNext = () => {
        if (active) {
            if (products.length === next) {
                setIsNext(false);
            } else {
                setNext((prev) => prev + 1);
                setBack((prev) => prev + 1);
                setIsBack(true);
            }
        } else {
            if (productHots.length === next) {
                setIsNext(false);
            } else {
                setNext((prev) => prev + 1);
                setBack((prev) => prev + 1);
                setIsBack(true);
            }
        }
    };

    const handleBack = () => {
        if (active) {
            if (back === 0) {
                setIsBack(false);
                setIsNext(true);
            } else {
                setIsBack(true);
                setBack((prev) => prev - 1);
                setNext((prev) => prev - 1);
            }
        } else {
            if (back === 0) {
                setIsBack(false);
                setIsNext(true);
            } else {
                setIsBack(true);
                setBack((prev) => prev - 1);
                setNext((prev) => prev - 1);
            }
        }
    };
    const favorite = async (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, id: string, i: boolean) => {
        e.stopPropagation();
        const updatedProducts = products.map((product) =>
            product._id === id ? { ...product, isFavorite: !product.isFavorite } : product,
        );
        setListProduct(updatedProducts);
        if (i) {
            await axios.delete(`/favorites/un-favorite/${id}`);
            return;
        }
        const userString = localStorage.getItem('user');
        if (userString !== null) {
            const user: User = JSON.parse(userString);
            const item = {
                user: user._id,
                product: id,
            };
            const { data } = await axios.post('/favorites', item);
            if (data.success) {
                i = true;
            }
        } else {
            toast.error('You must login before favorite ');
            router.push('/sign-in');
            return;
        }
    };
    const handleDetail = (id: string) => {
        router.push(`/shoes/${id}`);
    };
    if (pathname === '/') {
        return (
            <div className="flex justify-center gap-[10px] items-center">
                <ArrowBackIosRoundedIcon
                    className={`text-3xl ${back === 0 ? ' text-gray' : 'cursor-pointer'}`}
                    onClick={isBack ? handleBack : undefined}
                />
                <div className="flex gap-2">
                    {active
                        ? products &&
                          products.slice(back, next).map((product: Product, index: number) => (
                              <div
                                  key={product._id}
                                  className="cursor-pointer"
                                  onClick={() => handleDetail(product._id)}
                              >
                                  <div className="border-2 border-gray2 w-[304px] rounded-md p-1">
                                      {/* Single Product */}
                                      <div className="bg-bg_sell relative overflow-hidden hover:scale-110">
                                          <Image
                                              src={product.image}
                                              alt="Nike"
                                              width={292}
                                              height={236}
                                              className="rounded-md w-[292px] h-[236px] "
                                          />
                                          {product.isStock === false && (
                                              <div className="absolute w-[292px] h-[236px] rounded-md bg-deal bg-opacity-75 top-0 text-xl flex items-center justify-center">
                                                  Out Of Stock
                                              </div>
                                          )}
                                      </div>
                                      <div className="px-5 py-1 flex flex-col items-center gap-2">
                                          <div className="flex items-center justify-between mt-3 mb-3 w-full">
                                              <span className="text-gray text-lg font-bold">{product.brand}</span>
                                              <div onClick={(e) => favorite(e, product._id, product.isFavorite)}>
                                                  <FavoriteIcon isFavorite={product.isFavorite} />
                                              </div>
                                          </div>

                                          <p className="font-bold text-lg text-center truncate w-full">
                                              {product.name}
                                          </p>

                                          <Rating name="read-only" value={product.rating} readOnly />
                                          <span className="font-bak text-money">${product.price}</span>
                                          <div className="w-full flex items-center justify-between text-gray font-bold">
                                              <span>Sold</span>
                                              <span>{product.sold}</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          ))
                        : productHots &&
                          productHots.slice(back, next).map((product: Product, index: number) => (
                              <div
                                  key={product._id}
                                  className="flex gap-2 cursor-pointer"
                                  onClick={() => handleDetail(product._id)}
                              >
                                  <div className="border-2 border-gray2 w-[304px] rounded-md p-1">
                                      {/* Single Product */}
                                      <div className="bg-bg_sell relative overflow-hidden hover:scale-110">
                                          <Image
                                              src={product.image}
                                              alt="Nike"
                                              width={292}
                                              height={236}
                                              className="rounded-md w-[292px] h-[236px] "
                                          />
                                          {product.isStock === false && (
                                              <div className="absolute w-[292px] h-[236px] rounded-md bg-deal bg-opacity-75 top-0 text-xl flex items-center justify-center">
                                                  Out Of Stock
                                              </div>
                                          )}
                                      </div>
                                      <div className="px-5 py-1 flex flex-col items-center gap-2">
                                          <div className="flex items-center justify-between mt-3 mb-3 w-full">
                                              <span className="text-gray text-lg font-bold">{product.brand}</span>
                                              <div onClick={(e) => favorite(e, product._id, product.isFavorite)}>
                                                  <FavoriteIcon isFavorite={product.isFavorite} />
                                              </div>
                                          </div>
                                          <h1 className="font-bold text-[16px] text-center truncate w-full">
                                              {product.name}
                                          </h1>
                                          <Rating name="read-only" value={product.rating} readOnly />
                                          <span className="font-bold text-[16px] text-money">${product.price}</span>
                                          <div className="w-full flex text-[14px] items-center justify-between text-gray font-bold">
                                              <span>Sold</span>
                                              <span>{product.sold}</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          ))}
                </div>
                {active ? (
                    <ArrowForwardIosRoundedIcon
                        className={`text-3xl ${next < products.length ? 'cursor-pointer' : 'text-gray'}`}
                        onClick={isNext ? handleNext : undefined}
                    />
                ) : (
                    <ArrowForwardIosRoundedIcon
                        className={`text-3xl ${next < productHots.length ? 'cursor-pointer' : 'text-gray'}`}
                        onClick={isNext ? handleNext : undefined}
                    />
                )}
            </div>
        );
    }
    if (pathname.startsWith('/shoes')) {
        return (
            <div className="flex items-center gap-[10px]">
                <ArrowBackIosRoundedIcon
                    className={`text-3xl ${back === 0 ? ' text-gray' : 'cursor-pointer'}`}
                    onClick={isBack ? handleBack : undefined}
                />
                {products.slice(back, next).map((product: Product, index: number) => (
                    <div
                        key={product._id}
                        className="flex gap-2 cursor-pointer"
                        onClick={() => handleDetail(product._id)}
                    >
                        <div className="border-2 border-gray2 rounded-md p-1 w-[304px]">
                            {/* Single Product */}
                            <div className="bg-bg_sell relative overflow-hidden hover:scale-110">
                                <Image
                                    src={product.image}
                                    alt="Nike"
                                    width={292}
                                    height={236}
                                    className="w-[292px] h-[236px] rounded-md"
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
                                <h1 className="font-bold text-base text-center truncate w-full">{product.name}</h1>
                                <Rating name="read-only" value={product.rating} readOnly />
                                <span className="font-bak text-money">${product.price}</span>
                                <div className="w-full flex items-center justify-between text-gray font-bold">
                                    <span>Sold</span>
                                    <span>{product.sold}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <ArrowForwardIosRoundedIcon
                    className={`text-3xl ${next === products.length ? 'text-gray' : 'cursor-pointer'}`}
                    onClick={isNext ? handleNext : undefined}
                />
            </div>
        );
    }
    if (pathname.startsWith('/search')) {
        return (
            <div className={`${products && products.length === 0 ? '' : 'grid grid-cols-3 gap-[20px]'}`}>
                {products.map((product: Product, index: number) => (
                    <div
                        key={product._id}
                        className="flex gap-2 cursor-pointer"
                        onClick={() => handleDetail(product._id)}
                    >
                        <div className="border-2 border-gray2 rounded-md p-1 w-[304px]">
                            {/* Single Product */}
                            <div className="bg-bg_sell relative overflow-hidden hover:scale-110">
                                <Image
                                    src={product.image}
                                    alt="Nike"
                                    width={292}
                                    height={236}
                                    className="rounded-md w-[292px] h-[236px]"
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
                                <h1 className="font-bold text-base text-center truncate w-full">{product.name}</h1>
                                <Rating name="read-only" value={product.rating} readOnly />
                                <span className="font-bak text-money ">${product.price}</span>
                                <div className="w-full flex items-center justify-between text-gray font-bold">
                                    <span>Sold</span>
                                    <span>{product.sold}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
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
                            <h1 className="font-bold text-base text-center truncate w-full">{product.name}</h1>
                            <Rating name="read-only" value={product.rating} readOnly />
                            <span className="font-bak text-money ">${product.price}</span>
                            <div className="w-full flex items-center justify-between text-gray font-bold">
                                <span>Sold</span>
                                <span>{product.sold}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SingleSellShoe;
