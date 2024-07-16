import { CartContext } from '@/contexts/cart';
import { addItemToCartByUserId } from '@/slices/cartSlice';
import { getColorOfSize } from '@/slices/variantSlice';
import {
    ItemCart,
    ItemCartFake,
    Product,
    RVariant,
    User,
    Variant,
    VariantBySize,
    getQtyOfSizeColor,
} from '@/types/type';
import axios from '@/utils/axios';
import { formatCurrency } from '@/utils/convertMoney';
import useAxiosPrivate from '@/utils/intercepter';
import { AppDispatch } from '@/utils/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

type Props = {
    id: string;
    items: RVariant;
    setItems: Dispatch<SetStateAction<RVariant>>;
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

const HomeShoeCard = ({ id, setItems, items }: Props) => {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [flag, setFlag] = useState(false);
    const [flag1, setFlag1] = useState(false);
    const cartContext = useContext(CartContext) || { addToCart: (item: ItemCartFake) => {} };

    if (!cartContext) {
        console.error('CartContext is null');
        return;
    }
    const { addToCart } = cartContext;

    const { productDetail, variants } = useSelector((state: any) => state.products) as {
        productDetail: Product;
        variants: Variant;
    };
    const { variantBySize } = useSelector((state: any) => state.variants) as {
        variantBySize: VariantBySize[];
    };
    const axiosPrivate = useAxiosPrivate();
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

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    // const [quantity, setQuantity] = useState<number>(1);

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
            image: items.image,
            name: productDetail.name,
            color: items.color,
            size: items.size,
            quantity: 1,
        };
        const { data } = await axiosPrivate.post('/carts/addToCart', item);
        if (data.success) {
            addToCart(item);

            toast.success('Add item to cart success');
        }
    };

    useEffect(() => {
        const item: getQtyOfSizeColor = {
            id: id,
            size: items.size,
        };
        console.log(item);
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
    // console.log(variants.listColor);
    return (
        <div className="flex items-center pt-[60px] px-[212px] gap-14">
            <div className="w-5/12 flex flex-col">
                <h1 className="font-black text-base text-blue mb-2 uppercase">{productDetail.name}</h1>
                <p className="text-bg text-[14px] text-justify">{productDetail.desc}</p>

                <div className="flex items-center mt-8 mb-5">
                    <span className="text-white-60 font-bold w-[60px]">Size:</span>
                    <div className="text-size flex gap-1">
                        {variants &&
                            variants.listSize &&
                            variants.listSize.map((item, i: number) => (
                                <div
                                    key={i}
                                    className={`w-8 h-7 cursor-pointer ${
                                        item === items.size ? 'bg-blue' : 'bg-[#8d9096] '
                                    } rounded-md flex items-center justify-center font-bold`}
                                    onClick={() => handleSetSize(item)}
                                >
                                    {item}
                                </div>
                            ))}
                    </div>
                </div>
                {items.size && (
                    <div className="flex items-center ">
                        <span className="text-white-60 font-bold w-[60px]">Color:</span>
                        <div className="flex gap-2">
                            {variantBySize &&
                                variantBySize.map((item, i) => (
                                    <div
                                        key={i}
                                        onClick={() => handleSetColor(item.color, item.hex)}
                                        className={`w-5 h-5 relative rounded-full cursor-pointer ${colors[item.color]}`}
                                    >
                                        <div
                                            className={`absolute inset-[-4px] p-3 rounded-full border-2 ${
                                                item.color === 'White' ? 'border' : ''
                                            } ${item.color === items.color ? 'border-blue' : ''} `}
                                        ></div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
                <span className="font-bak text-orange text-base mt-5 mb-2">{formatCurrency(productDetail.price)}</span>
                <button
                    onClick={handleAddToCart}
                    className="w-60 h-[50px] border-2 border-orange rounded-md text-base font-bold text-orange cursor-pointer hover:opacity-60"
                >
                    Buy Now
                </button>
            </div>
            <div className="w-7/12 flex items-center justify-center gap-10 ">
                <div className="w-[380px] h-[380px] relative border-2 border-gray2 rounded-full">
                    <Image
                        src={productDetail.images && productDetail.images[0]}
                        alt="Nike"
                        fill
                        className="rotate-[-16deg] rounded-full"
                    />
                </div>
                <div className="relative w-10 h-52 flex flex-col">
                    {Array.from({ length: Math.max(productDetail.rating as number, 5) }).map((_, index) => (
                        <Image
                            key={index}
                            src="/rating.png"
                            alt="Rating"
                            width={32}
                            height={32}
                            className={`absolute ${index === 0 && 'top-0 left-[-2px]'} ${
                                index === 1 && 'top-[40px] left-[18px]'
                            } ${index === 2 && 'top-[90px] left-[22px]'} ${
                                index === 3 && 'bottom-[40px] left-[18px]'
                            } ${index === 4 && 'bottom-0 left-[-2px]'}`}
                        />
                    ))}
                    {Array.from({ length: Math.max(5 - (productDetail.rating as number), 0) }).map((_, index) => (
                        <Image
                            key={index + Math.min(productDetail.rating as number, 5)}
                            src="/noRating.png"
                            alt="No Rating"
                            width={32}
                            height={32}
                            className={`absolute ${index === 0 && 'bottom-0 left-[-2px]'} ${
                                index === 1 && 'bottom-[40px] left-[18px]'
                            } ${index === 2 && 'top-[90px] left-[22px]'} ${index === 3 && 'top-[40px] left-[18px]'} ${
                                index === 4 && 'top-0 left-[-2px]'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeShoeCard;
