'use client';
import { getAllCategory, getCategoryById } from '@/slices/categorySlice';
import { Category } from '@/types/type';
import { AppDispatch } from '@/utils/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const { categories }: { categories: Category[] } = useSelector((state: any) => state.categories);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    const pathname = usePathname();
    if (pathname.startsWith('/user')) {
        return;
    }
    return (
        <div>
            {pathname === '/cart' || pathname.startsWith('/user') ? (
                ''
            ) : (
                <div className="flex justify-center text-bg bg-white text-base font-bold">
                    <Link
                        href="/"
                        className={`w-[120px] h-10 text-center ${
                            pathname === '/' ? 'text-blue border-blue border-b-2' : 'hover:text-blue'
                        }`}
                    >
                        <span>Home</span>
                    </Link>
                    {categories &&
                        categories.map((category) => (
                            <Link
                                key={category._id}
                                href={`/${category.name.toLowerCase().replace(/\s/g, '')}`}
                                className={`w-[120px] h-10 text-center ${
                                    pathname === `/${category.name.toLowerCase().replace(/\s/g, '')}`
                                        ? 'text-blue border-blue border-b-2'
                                        : 'hover:text-blue'
                                }  `}
                            >
                                <span>{category.name}</span>
                            </Link>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Navbar;
