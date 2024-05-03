'use client';
import { User } from '@/types/type';
import Image from 'next/image';
import React from 'react';

const Header = () => {
    const userString = typeof window !== 'undefined' ? localStorage.getItem('admin') : null;

    let user: User | null = null;
    if (userString) {
        try {
            user = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    console.log(user);
    return (
        <div className="flex w-[calc(100vw - 260px)] px-5 py-2 items-center justify-between shadow-header ml-[2px] bg-white">
            <div className="text-3xl flex items-center gap-1">
                <span className="font-birsmark scale-x-[-1]">P</span>
                <span className="font-fb">&</span>
                <span className="font-birsmark">P</span>
            </div>
            <div className="flex items-center gap-[10px]">
                <span className="font-bold">{user?.fullName}</span>
                {/* <div className="w-10 h-10 rounded-full relative"> */}
                <Image src={user?.avatar ?? ''} alt="avt" width={40} height={40} className="w-10 h-10 rounded-full" />
                {/* </div> */}
            </div>
        </div>
    );
};

export default Header;
