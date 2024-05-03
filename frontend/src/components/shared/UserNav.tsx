'use client';
import React, { useEffect } from 'react';
import { userNav } from '@/constants';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { User } from '@/types/type';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { getUser } from '@/slices/userSlice';

const UserNav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>;

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

    return (
        <div className="py-5 px-[16px] bg-deal drop-shadow-lg w-max h-max rounded-md">
            <div className="flex items-center gap-[10px] mb-5">
                <Image src={user?.avatar ?? ''} alt="AVT" width={60} height={60} className="rounded-full" />
                <span className="font-bold text-[14px] text-sm">{user?.fullName}</span>
            </div>
            {userNav.map((item) => (
                <div
                    key={item.label}
                    className={`mt-5 flex items-center gap-5 font-semibold cursor-pointer hover:text-blue ${
                        pathname === item.route ? 'text-blue' : ''
                    } `}
                    onClick={() => router.push(item.route)}
                >
                    <item.icon />
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export default UserNav;
