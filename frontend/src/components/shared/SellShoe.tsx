'use client';
import { useDispatch, useSelector } from 'react-redux';
import SingleSellShoe from '../cards/SingleSellShoe';
import { useEffect, useState } from 'react';
import { AppDispatch } from '@/utils/store';
import { getAllProduct, getProductHotDeal } from '@/slices/productSlice';
import { Product } from '@/types/type';
import { CircularProgress } from '@mui/material';
import axios from '@/utils/axios';

const SellShoe = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [active, setActive] = useState(false);
    const [isNext, setIsNext] = useState<boolean>(false);
    const [isBack, setIsBack] = useState<boolean>(false);
    const [back, setBack] = useState<number>(0);
    const [next, setNext] = useState<number>(4);
    const [loading, setLoading] = useState(false);
    const [listProduct, setListProduct] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (active) {
                setLoading(true);
                const { data } = await axios.get('/products?pageSize=10&pageNumber=1');
                if (data.success) {
                    setListProduct(data.data);
                    setLoading(false);
                }
                if (listProduct.length > 4) {
                    setIsNext(true);
                    setBack(0);
                    setNext(4);
                } else {
                    setIsNext(false);
                    setBack(0);
                    setNext(4);
                }
            } else {
                setLoading(true);
                const { data } = await axios.get('/revenue/products/hot');
                if (data.success) {
                    setListProduct(data.data);
                    setLoading(false);
                }
                if (listProduct.length > 4) {
                    setIsNext(true);
                    setBack(0);
                    setNext(4);
                } else {
                    setIsNext(false);
                    setBack(0);
                    setNext(4);
                }
            }
        };

        fetchData();
    }, [active]);
    console.log(listProduct);
    return (
        <div className="py-5 px-10">
            <div className="flex justify-center mb-5 font-bold text-base gap-5 text-center">
                <span
                    className={` w-40 h-10 ${
                        !active ? 'border-b-2 text-blue' : 'text-gray hover:text-blue'
                    }  cursor-pointer`}
                    onClick={() => setActive(false)}
                >
                    Selling
                </span>
                <span
                    className={` w-40 h-10 ${
                        active ? 'border-b-2 text-blue' : 'text-gray hover:text-blue'
                    } cursor-pointer`}
                    onClick={() => setActive(true)}
                >
                    Newest
                </span>
            </div>
            <div>
                {loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <CircularProgress color="secondary" size={60} />
                    </div>
                ) : (
                    <SingleSellShoe
                        products={listProduct}
                        active={active}
                        isNext={isNext}
                        setIsNext={setIsNext}
                        isBack={isBack}
                        setIsBack={setIsBack}
                        next={next}
                        setNext={setNext}
                        back={back}
                        setBack={setBack}
                        setListProduct={setListProduct}
                    />
                )}
            </div>
        </div>
    );
};

export default SellShoe;
