'use client';
import React, { useEffect, useState } from 'react';
import HomeShoeCard from '../cards/HomeShoeCard';
import Image from 'next/image';
import { Rating } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { ItemCart, Product, RVariant, User, itemCartRandomVari } from '@/types/type';
import { AppDispatch } from '@/utils/store';
import { getProductById } from '@/slices/productSlice';
import { addItemToCartByUserId, addItemToCartRandomVariant } from '@/slices/cartSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const HomeShoe = () => {
    const { productHots, productDetail }: { productHots: Product[]; productDetail: Product } = useSelector(
        (state: any) => state.products,
    );
    const dispatch = useDispatch<AppDispatch>();
    const [id, setId] = useState<string>('');
    const [count, setCount] = useState(0);
    const router = useRouter();
    const [isNext, setIsNext] = useState<boolean>(false);
    const [isBack, setIsBack] = useState<boolean>(false);
    const [back, setBack] = useState<number>(0);
    const [next, setNext] = useState<number>(4);

    const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

    let user: User | null = null;

    if (userString !== null) {
        try {
            user = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    const idUser = user?._id as string;
    const [items, setItems] = useState<RVariant>({
        color: '',
        hex: '',
        image: '',
        quantity: 0,
        size: '',
    });
    useEffect(() => {
        if (productHots.length > 0) {
            setId(productHots[0]._id);
        }
    }, [productHots]);
    useEffect(() => {
        dispatch(getProductById(id));
        setItems({ color: '', hex: '', image: '', quantity: 0, size: '' });
    }, [id, productHots]);
    useEffect(() => {
        if (productHots.length > 4) {
            setIsNext(true);
        } else {
            setIsNext(false);
        }
    }, [productHots.length, setIsNext]);

    const handleAddtoCart = async ({ product, user }: itemCartRandomVari) => {
        if (!user) {
            toast.error('Please login before add to cart', {
                onClose: () => {
                    router.push('/sign-in');
                },
            });
            return;
        }
        const cart = {
            user,
            product,
        };

        await dispatch(addItemToCartRandomVariant(cart));
        toast.success('Add to cart success');
        // if((res.payload as { status: number }).status === 201){
        //     toast.success((res.payload as { status: string }).data.message)
        // }
    };
    const handleNext = () => {
        if (productHots.length === next) {
            setIsNext(false);
        } else {
            setNext((prev) => prev + 1);
            setBack((prev) => prev + 1);
            setIsBack(true);
        }
    };

    const handleBack = () => {
        if (back === 0) {
            setIsBack(false);
            setIsNext(true);
        } else {
            setIsBack(true);
            setBack((prev) => prev - 1);
            setNext((prev) => prev - 1);
        }
    };
    return (
        <div className="bg-bg">
            <HomeShoeCard id={id} setItems={setItems} items={items} />

            <div className="flex items-center justify-between py-10 px-14 gap-16">
                <div
                    onClick={isBack ? handleBack : undefined}
                    className={`${back === 0 ? 'opacity-70' : 'cursor-pointer'}`}
                >
                    <Image src="/left.png" alt="Arrow" width={25} height={41} />
                </div>
                <div className="flex gap-20">
                    {productHots &&
                        productHots.slice(back, next).map((productHot) => (
                            <div
                                key={productHot._id}
                                onClick={() => setId(productHot._id)}
                                className="flex items-center rounded-xl h-40 cursor-pointer"
                            >
                                <div className="w-[100px] bg-pink h-full flex items-center relative rounded-tl-lg rounded-bl-lg">
                                    <Image
                                        src={productHot.image}
                                        alt="Nike"
                                        height={120}
                                        width={120}
                                        className="w-[120px] h-[120px] absolute left-[-42px] rotate-[-16deg] rounded-xl"
                                    />
                                </div>
                                <div className="x-4 p-4 pb-2 bg-white rounded-tr-lg rounded-br-lg h-40 w-[200px]">
                                    <h1 className="text-[14px] font-bold mb-[10px] truncate w-full">
                                        {productHot.name}
                                    </h1>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <Rating size="small" name="read-only" value={productHot.rating} readOnly />
                                            <span className="text-money font-bak">$ {productHot.price}</span>
                                        </div>
                                        <FavoriteBorderOutlinedIcon className="w-5 h-5 text-orange" />
                                    </div>
                                    <button
                                        className="mt-3 px-2 py-2 border-2 border-orange text-[12px] font-bold text-orange rounded-lg w-full hover:opacity-60"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddtoCart({
                                                product: productHot._id,
                                                user: user?._id as string,
                                            });
                                        }}
                                    >
                                        ADD TO CART!
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
                <div
                    onClick={isNext ? handleNext : undefined}
                    className={`${next === productHots.length ? 'opacity-70' : 'cursor-pointer'}`}
                >
                    <Image src="/right.png" alt="Arrow" width={25} height={41} />
                </div>
            </div>
        </div>
    );
};

export default HomeShoe;
