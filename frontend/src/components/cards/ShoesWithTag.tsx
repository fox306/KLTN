'use client';
import { Rating } from '@mui/material';
import Image from 'next/image';
import React, { Dispatch, MouseEvent, SetStateAction, useContext } from 'react';
import Border from '../shared/Border';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Product, User, itemCartRandomVari } from '@/types/type';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { addItemToCartRandomVariant } from '@/slices/cartSlice';
import FavoriteIcon from '../shared/FavoriteIcon';
import axios from '@/utils/axios';
import useAxiosPrivate from '@/utils/intercepter';
import { CartContext } from '@/contexts/cart';
type Props = {
    listProduct: Product[];
    setListProduct: Dispatch<SetStateAction<Product[]>>;
};
const ShoesWithTag = ({ listProduct, setListProduct }: Props) => {
    const { addToCart } = useContext(CartContext) || { addToCart: (item: itemCartRandomVari) => {} };

    const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const axiosPrivate = useAxiosPrivate();

    let user: User | null = null;

    if (userString !== null) {
        try {
            user = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    const idUser = user?._id as string;

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const handleDetail = (id: string) => {
        router.push(`/shoes/${id}`);
    };

    const handleAddtoCart = async (
        e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
        { product, user }: itemCartRandomVari,
    ) => {
        e.stopPropagation();
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
        const token = localStorage.getItem('token');
        const { data } = await axiosPrivate.post('/carts/addToCart/withoutVariant', cart);
        if (data.success) {
            addToCart(cart);
            toast.success('Add to cart success');
        }
        // if((res.payload as { status: number }).status === 201){
        //     toast.success((res.payload as { status: string }).data.message)
        // }
    };
    const favorite = async (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, id: string, i: boolean) => {
        e.stopPropagation();
        const updatedProducts = listProduct.map((product) =>
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
    return (
        <div>
            {listProduct.map((product) => (
                <div
                    key={product._id}
                    className="flex flex-col gap-5 mb-5 cursor-pointer"
                    onClick={() => handleDetail(product._id)}
                >
                    <div className="flex gap-5">
                        <div className="bg-deal flex items-center justify-center relative overflow-hidden">
                            <Image
                                src={product.image}
                                alt="Giày"
                                width={300}
                                height={280}
                                className="rounded-xl w-[300px] h-[280px] "
                            />
                            {product.isStock === false && (
                                <div className="absolute w-[300px] h-[280px] rounded-xl bg-deal bg-opacity-75 top-0 text-xl flex items-center justify-center">
                                    Out Of Stock
                                </div>
                            )}
                        </div>
                        <div className="w-[700px] flex flex-col">
                            <span className="text-base font-bold truncate w-full block ">{product.name}</span>
                            <div className="flex gap-10 items-center mt-[15px] mb-[27px] flex-grow">
                                <Rating name="read-only" value={4} readOnly />
                                <span className="text-rv font-medium">{product.review} reviews</span>
                                <div className="flex-grow" />
                                <div
                                    className="w-10 h-10 rounded-lg text-center text-3xl bg-bluev2"
                                    onClick={(e) => favorite(e, product._id, product.isFavorite)}
                                >
                                    <FavoriteIcon isFavorite={product.isFavorite} />
                                </div>
                            </div>
                            <Border />
                            <span className="text-base text-money font-bak my-[15px] block">{product.price}₫</span>
                            <p className="text-justify mb-[11px] truncate w-full">{product.desc}</p>
                            <Border />
                            <div className="flex mt-[10px]">
                                <div className="flex-grow"></div>
                                {product.isStock === true ? (
                                    <div
                                        className="w-40 h-[40px] flex items-center justify-center gap-4 bg-buy text-blue rounded-md cursor-pointer hover:bg-blue hover:text-white"
                                        onClick={(e) =>
                                            handleAddtoCart(e, {
                                                product: product._id,
                                                user: user?._id as string,
                                            })
                                        }
                                    >
                                        <ShoppingCartOutlinedIcon />
                                        <span className="font-bold">Add To Cart</span>
                                    </div>
                                ) : (
                                    <div className="w-40 h-[40px] flex items-center justify-center gap-4 bg-buy text-blue rounded-md cursor-pointer">
                                        <ShoppingCartOutlinedIcon />
                                        <span className="font-bold">Add To Cart</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <Border />
                </div>
            ))}
        </div>
    );
};

export default ShoesWithTag;
