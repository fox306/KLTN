'use client';
import { Rating } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import BorderBlack from '@/components/shared/Border';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoeInfo from '@/components/cards/ShoeInfo';
import Reviews from '@/components/cards/Reviews';
import SingleSellShoe from '@/components/cards/SingleSellShoe';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { useParams } from 'next/navigation';
import { getProductById, getProductHotDeal } from '@/slices/productSlice';
import {
    Comment,
    ItemCart,
    ItemCartFake,
    Product,
    RVariant,
    User,
    Variant,
    VariantBySize,
    detailVariant,
    getQtyOfSizeColor,
} from '@/types/type';
import { getColorOfSize } from '@/slices/variantSlice';
import { toast } from 'react-toastify';
import { addItemToCartByUserId } from '@/slices/cartSlice';
import { useRouter } from 'next/navigation';
import axios from '@/utils/axios';

const unProp = {
    productHots: [],
    active: false,
};

const colors: { [key: string]: string } = {
    Red: 'bg-[#FC3E39]',
    Blue: 'bg-[#0000FF]',
    Gray: 'bg-[#808080]',
    Cyan: 'bg-[#00FFFF]',
    Pink: 'bg-[#FFC0CB]',
    Green: 'bg-[#00FF00]',
    Black: 'bg-[#171717]',
    White: 'bg-[#FFFFFF]',
    Brown: 'bg-[#A52A2A]',
    Purple: 'bg-[#800080]',
    Yellow: 'bg-[#FFFF00]',
    Orange: 'bg-[#FFA500]',
    Silver: 'bg-[#C0C0C0]',
};

const ShoesSinglePage = () => {
    const {
        products,
        productHots,
        productDetail,
        variants,
        randomItem,
    }: {
        products: Product[];
        productHots: Product[];
        productDetail: Product;
        variants: Variant;
        randomItem: RVariant;
    } = useSelector((state: any) => state.products);
    const { variantBySize }: { variantBySize: VariantBySize[] } = useSelector((state: any) => state.variants);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

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
    const { id } = useParams() as { id: string };
    const [number, setNumber] = useState<number>(0);
    const [items, setItems] = useState<RVariant>({
        color: '',
        hex: '',
        image: '',
        quantity: 0,
        size: '',
    });
    const [manageQuantity, setManageQuantity] = useState(1);

    const [isNext, setIsNext] = useState<boolean>(false);
    const [isBack, setIsBack] = useState<boolean>(false);
    const [back, setBack] = useState<number>(0);
    const [next, setNext] = useState<number>(4);
    const [active, setActive] = useState<boolean>(false);
    const [comments, setComments] = useState<Comment[]>();

    const [isFirstRender, setIsFirstRender] = useState(true);
    const [flag, setFlag] = useState(false);
    const [flag1, setFlag1] = useState(false);

    const [load, setLoad] = useState(false);

    const handleImage = (i: number) => {
        setNumber(i);
    };

    const handleInsc = () => {
        if (!items.color || !items.size) {
            toast.error('Choose Color And Size');
        } else {
            if (manageQuantity === items.quantity) return;
            setManageQuantity((prev) => prev + 1);
        }
    };
    const handleDesc = () => {
        if (!items.color || !items.size) toast.error('Choose Color And Size');
        else {
            if (manageQuantity === 1) return;
            setManageQuantity((prev) => prev - 1);
        }
    };

    const handleSetSize = (newSize: string) => {
        setItems({ size: newSize, color: '', quantity: 0, hex: '', image: '' });
        setFlag((prev) => !prev);
    };
    const handleSetColor = (newColor: string, hex: string) => {
        setItems({ ...items, color: newColor, hex: hex });
        setFlag1((prev) => !prev);
        setIsFirstRender(false);
    };

    const handleAddToCart = async () => {
        if (!user) {
            toast.error('Please login before add to cart', {
                onClose: () => {
                    setTimeout(() => {
                        router.push('/sign-in');
                    }, 3000);
                },
            });
            return;
        }

        if (!items.color || !items.size) {
            toast.error('Choose Color And Size');
            return;
        }
        if (items.quantity === 0) {
            toast.error('Out of stock');
            return;
        }

        const item: ItemCartFake = {
            user: user._id,
            product: id,
            image: productDetail.image,
            name: productDetail.name,
            color: items.color,
            size: items.size,
            quantity: manageQuantity,
        };

        const res = await dispatch(addItemToCartByUserId(item));
        console.log(res);
        if ((res.payload as { status: number }).status === 201) {
            toast.success('Add item to cart success');
        }
    };

    const [count, setCount] = useState(0);
    useEffect(() => {
        let mount = true;
        dispatch(getProductHotDeal()).unwrap();
        dispatch(getProductById(id)).then(() => {
            if (mount) {
                setCount((prev) => prev + 1);
            }
            if (variants.listColor) {
                const index = variants.listColor.findIndex((item) => item.image === randomItem.image);
                setNumber(index);
            }
        });
        const fetchData = async () => {
            const { data } = await axios.get(`/comments/find/by-product?pageSize=5&product=${id}`);
            if (data.success) {
                setComments(data.data);
            }
        };
        fetchData();
        return () => {
            mount = false;
        };
    }, [load]);
    useEffect(() => {
        setItems(randomItem);
        setFlag((prev) => !prev);
    }, [count]);

    useEffect(() => {
        const item: getQtyOfSizeColor = {
            id: id,
            size: items.size,
        };
        if (item.size) {
            dispatch(getColorOfSize(item));
        }
    }, [flag]);
    useEffect(() => {
        if (!isFirstRender) {
            const fetchData = async () => {
                const { data } = await axios.get(
                    `/variants/find/by-info?product=${id}&size=${items.size}&color=${items.color}`,
                );
                if (data.success) {
                    setItems({ ...items, quantity: data.data.quantity });
                }
            };
            fetchData();
        } else setIsFirstRender(true);
    }, [flag1]);
    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-between  gap-[100px] mt-[52px] mb-[116px] w-[1020px]">
                <div className="w-[420px]">
                    <div className="relative bg-bg_sell rounded-lg border-gray border-2 overflow-hidden">
                        <Image
                            src={variants.listColor && variants.listColor[number].image}
                            alt="giày"
                            width={420}
                            height={328}
                            className="h-[328px] w-[420px] rounded-lg"
                        />
                        {productDetail.isStock === false && (
                            <div className="absolute w-[420px] h-[328px] rounded-lg bg-deal bg-opacity-75 top-0 text-xl flex items-center justify-center">
                                Out Of Stock
                            </div>
                        )}
                    </div>
                    <div className="flex gap-5 mt-5">
                        {variants.listColor &&
                            variants.listColor.map((item, i) => (
                                <div
                                    key={i}
                                    className="w-[90px] h-[90px] relative bg-bg_sell rounded-lg border-gray border-4 overflow-hidden"
                                >
                                    <Image
                                        src={item.image}
                                        alt="giày"
                                        fill
                                        onClick={() => handleImage(i)}
                                        className="cursor-pointer"
                                    />
                                </div>
                            ))}
                    </div>
                </div>
                <div>
                    <h1 className="text-base font-bold">{productDetail.name}</h1>
                    <div className="flex items-center gap-10 mt-[23px] mb-[25px]">
                        <Rating value={4} readOnly emptyIcon={<StarIcon className="text-star" />} />

                        <span className="text-rv">0 review</span>
                    </div>
                    <BorderBlack />
                    <span className="text-base text-money font-bak mt-[25px] mb-[25px] block">
                        ${productDetail.price}
                    </span>
                    <span className="font-medium mb-[25px] block">free shipping</span>
                    <BorderBlack />
                    <div className="flex items-center mt-[25px] mb-5">
                        <span className="font-medium flex-1">Size:</span>
                        <div className="font-bold text-white flex gap-1">
                            {variants &&
                                variants.listSize &&
                                variants.listSize.map((item, i: number) => (
                                    <div
                                        key={i}
                                        className={`text-sm w-9 h-7 cursor-pointer ${
                                            item === items.size ? 'bg-blue' : 'bg-[#8d9096] '
                                        } rounded-md flex items-center justify-center font-bold`}
                                        onClick={() => handleSetSize(item)}
                                    >
                                        {item}
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="flex items-center mt-[25px] mb-5">
                        <span className="font-medium flex-1">Color:</span>
                        <div className="font-bold text-white flex gap-2">
                            {variantBySize &&
                                variantBySize.map((item, i) => (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            handleSetColor(item.color, item.hex);
                                            handleImage(i);
                                        }}
                                        className={`w-5 h-5 relative rounded-full cursor-pointer ${colors[item.color]}`}
                                    >
                                        <div
                                            className={`absolute inset-[-4px] p-3 rounded-full border-2 ${
                                                item.color === items.color ? 'border-blue' : ''
                                            }`}
                                        ></div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="font-medium mb-[25px] flex ">
                        <span className="flex-1">Availability:</span>
                        <span>{items.quantity}</span>
                    </div>
                    <BorderBlack />
                    <div className="flex justify-between gap-[120px] mt-5">
                        <div className="flex h-[50px] text-xl font-bold">
                            <span
                                className="w-11 flex items-center justify-center bg-[#F6F7F8] rounded-tl-md rounded-bl-md text-blue cursor-pointer hover:bg-blue hover:text-white"
                                onClick={handleDesc}
                            >
                                -
                            </span>
                            <span className="w-[62px] flex items-center justify-center bg-[#FAFBFB] ">
                                {manageQuantity}
                            </span>
                            <span
                                className="w-11 flex items-center justify-center bg-[#F6F7F8] rounded-tr-md rounded-br-md text-blue cursor-pointer hover:bg-blue hover:text-white"
                                onClick={handleInsc}
                            >
                                +
                            </span>
                        </div>
                        <div className="flex gap-5 ">
                            <div
                                onClick={handleAddToCart}
                                className="w-40 h-[50px] flex items-center justify-center gap-4 bg-buy text-blue rounded-md cursor-pointer hover:bg-blue hover:text-white"
                            >
                                <ShoppingCartOutlinedIcon />
                                <span className="font-bold">Add To Cart</span>
                            </div>
                            <div className="w-[50px] h-[50px] bg-buy flex items-center justify-center rounded-md cursor-pointer">
                                <FavoriteBorderOutlinedIcon className="text-blue" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-5 pt-[25px] pb-5 bg-bg_sell rounded-lg w-[1020px]">
                <div className="text-base font-medium flex mb-[25px]">
                    <span
                        className={`w-[180px] flex items-center justify-center cursor-pointer ${
                            active === false ? 'border-b-2 text-blue border-blue hover:opacity-50' : 'hover:text-blue'
                        }`}
                        onClick={() => setActive(false)}
                    >
                        Shoe Information
                    </span>
                    <div
                        className={`w-[160px] flex items-center justify-center gap-3 cursor-pointer ${
                            active === true ? 'border-b-2 text-blue border-blue hover:opacity-50' : 'hover:text-blue'
                        }`}
                        onClick={() => setActive(true)}
                    >
                        <span>Review</span>
                        <span className="text-rv">{comments?.length}</span>
                    </div>
                </div>
                {/* view about shoes info and review*/}
                {active === false ? (
                    <ShoeInfo detail={productDetail.desc} />
                ) : (
                    <Reviews comments={comments as Comment[]} />
                )}
            </div>
            <div className="mt-24 flex flex-col items-center">
                <span className="font-bold text-base text-blue">Hot Shoes</span>
                <div className="mt-5 w-full">
                    {/* Vỉew hot shoes (component singlesellshoe) */}
                    <SingleSellShoe
                        products={productHots}
                        isNext={isNext}
                        setIsNext={setIsNext}
                        isBack={isBack}
                        setIsBack={setIsBack}
                        next={next}
                        setNext={setNext}
                        back={back}
                        setBack={setBack}
                        {...unProp}
                        setLoad={setLoad}
                    />
                </div>
            </div>
        </div>
    );
};

export default ShoesSinglePage;
