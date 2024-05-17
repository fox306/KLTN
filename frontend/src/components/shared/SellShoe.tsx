'use client';
import { useDispatch, useSelector } from 'react-redux';
import SingleSellShoe from '../cards/SingleSellShoe';
import { useEffect, useState } from 'react';
import { AppDispatch } from '@/utils/store';
import { getAllProduct, getProductHotDeal } from '@/slices/productSlice';
import { Product } from '@/types/type';

const SellShoe = () => {
    const { products, productHots } = useSelector((state: any) => state.products);
    const dispatch = useDispatch<AppDispatch>();
    const [active, setActive] = useState(false);
    const [isNext, setIsNext] = useState<boolean>(false);
    const [isBack, setIsBack] = useState<boolean>(false);
    const [back, setBack] = useState<number>(0);
    const [next, setNext] = useState<number>(4);

    useEffect(() => {
        const fetchData = async () => {
            if (!active) {
                await dispatch(getProductHotDeal()).unwrap();
                if (productHots.length > 4) {
                    setIsNext(true);
                } else {
                    setIsNext(false);
                }
            } else {
                await dispatch(getAllProduct()).unwrap();
                if (products.length > 4) {
                    setIsNext(true);
                } else {
                    setIsNext(false);
                }
            }
        };

        fetchData();
    }, [active, dispatch, setIsNext, productHots.length, products.length]);
    console.log(products);
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
                <SingleSellShoe
                    products={products}
                    productHots={productHots}
                    active={active}
                    isNext={isNext}
                    setIsNext={setIsNext}
                    isBack={isBack}
                    setIsBack={setIsBack}
                    next={next}
                    setNext={setNext}
                    back={back}
                    setBack={setBack}
                />
            </div>
        </div>
    );
};

export default SellShoe;
