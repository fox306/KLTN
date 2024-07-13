'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { AppDispatch } from '@/utils/store';
import { getCartByUserId } from '@/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Cart, User } from '@/types/type';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from '@/utils/axios';
import { findProductByKeyword } from '@/slices/productSlice';
import axiosPrivate from '@/utils/axiosPrivate';

const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { cartItem }: { cartItem: Cart } = useSelector((state: any) => state.carts);
    const dispatch = useDispatch<AppDispatch>();
    const [keyword, setKeyword] = useState<string>('');

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    let user: User | null = null;
    if (userString !== null) {
        try {
            user = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    const id = user?._id as string;

    const handleClick = (event: MouseEvent<any>) => {
        if (!userString) {
            toast.error('Please login before see profile', {
                onClose: () => {
                    setTimeout(() => {
                        router.push('/sign-in');
                    }, 3000);
                },
            });
            return;
        } else {
            setAnchorEl(event.currentTarget);
        }
    };
    const handelCart = () => {
        if (!userString) {
            toast.error('Please login before see cart', {
                onClose: () => {
                    setTimeout(() => {
                        router.push('/sign-in');
                    }, 3000);
                },
            });
            return;
        } else {
            router.push('/cart');
        }
    };
    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        const { data } = await axiosPrivate.post('/auths/logout');
        if (data.success) {
            localStorage.clear();
            router.push('/sign-in');
        } else {
            toast.error('Logout fail');
        }
    };
    const handleSubmit = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            router.push(`/search/${keyword}`);
        }
    };
    const handleMove = () => {
        setAnchorEl(null);
        router.push('/user');
    };
    useEffect(() => {
        dispatch(getCartByUserId(id));
    }, [dispatch]);
    return (
        <div className={`${pathname === '/' ? 'bg-bg' : 'bg-white'} flex flex-col items-center`}>
            <div className=" flex items-center justify-between px-20 pt-[10px] pb-[10px] w-full">
                <div className="flex items-center gap-5">
                    <div
                        className={`text-4xl flex items-center gap-1 cursor-pointer ${
                            pathname === '/' ? 'text-orange' : 'text-blue'
                        }`}
                        onClick={() => router.push('/')}
                    >
                        <span className="font-birsmark scale-x-[-1]">P</span>
                        <span className="font-fb">&</span>
                        <span className="font-birsmark">P</span>
                    </div>
                    <div>
                        <div
                            onKeyUp={(e) => handleSubmit(e)}
                            className={`${pathname === '/' ? 'text-white' : 'text-black'} relative mx-auto w-max`}
                        >
                            <input
                                type="search"
                                className={`peer relative z-10 h-10 w-10 cursor-pointer rounded-full focus:border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text ${
                                    pathname === '/' ? 'focus:border-orange' : 'focus:border-blue'
                                } focus:pl-16 focus:pr-4`}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent px-3.5 ${
                                    pathname === '/'
                                        ? 'stroke-orange peer-focus:border-orange peer-focus:stroke-orange'
                                        : 'stroke-blue peer-focus:border-blue peer-focus:stroke-blue'
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    {/* TODO NEXT TIME */}
                    {/* <div className="relative cursor-pointer">
                        <FavoriteBorderOutlinedIcon
                            className={`w-7 h-7 ${
                                pathname === '/' ? 'text-orange hover:text-blue' : 'text-blue hover:text-orange'
                            }`}
                        />
                        {userString !== null && (
                            <div
                                className={`absolute top-[-8px] right-[-6px] border rounded-full w-4 h-4 border-white ${
                                    pathname === '/' ? 'bg-orange' : 'bg-blue '
                                }`}
                            >
                                <span className="text-white text-xs ml-[0.2rem] absolute">2</span>
                            </div>
                        )}
                    </div> */}
                    <div className="relative cursor-pointer" onClick={handelCart}>
                        <ShoppingCartOutlinedIcon
                            className={`w-6 h-6 ${
                                pathname === '/' ? 'text-orange hover:text-blue' : 'text-blue hover:text-orange'
                            }`}
                        />

                        <div
                            className={`absolute top-[-8px] right-[-6px] border rounded-full w-4 h-4 border-white flex items-center justify-center ${
                                pathname === '/' ? 'bg-orange' : 'bg-blue'
                            }`}
                        >
                            <span className="text-white text-xs">{cartItem.items && cartItem.items.length}</span>
                        </div>
                    </div>

                    <PersonOutlineOutlinedIcon
                        className={`w-7 h-7 ${
                            pathname === '/' ? 'text-orange hover:text-blue' : 'text-blue hover:text-orange'
                        } cursor-pointer`}
                        fontSize="large"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleMove}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
            <div
                className={`border-b w-[calc(100vw-128px)] ${
                    pathname === '/' ? 'border-orange' : 'border-blue'
                } opacity-40 mb-5`}
            ></div>
        </div>
    );
};

export default Header;
