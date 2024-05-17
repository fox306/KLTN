'use client';
import Image from 'next/image';
import React from 'react';
import { adminNav } from '../../constants/index';
import { usePathname, useRouter } from 'next/navigation';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import axios from '@/utils/axios';
import { User } from '@/types/type';
import { toast } from 'react-toastify';

const AdminNav = () => {
    const router = useRouter();
    const path = usePathname();
    const userString = typeof window !== 'undefined' ? localStorage.getItem('admin') : null;
    let user: User | null = null;
    if (!userString) {
        router.push('/sign-in');
    } else {
        user = JSON.parse(userString) as User;
    }

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        const { data } = await axios.post(
            '/auths/logout',
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        if (data.success) {
            localStorage.clear();
            router.push('/sign-in');
        } else {
            toast.error('Logout fail');
        }
    };

    return (
        <div className="flex flex-col items-center justify-between shadow-nav w-[260px] h-screen">
            <div className="p-5">
                <div className="flex items-center gap-[10px] mb-5">
                    <div className="w-[60px] h-[60px] rounded-full relative">
                        <Image src={user?.avatar ?? ''} alt="AVT" fill />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-[14px]">{user?.fullName}</span>
                        <span className="text-[12px]">Admin</span>
                    </div>
                </div>
                <div className="mt-[10px] flex flex-col gap-5">
                    {adminNav.map((item) => {
                        const isActive =
                            path === item.route ||
                            (path.startsWith(item.route) && path.startsWith(`${item.route}/manage`)) ||
                            (path.startsWith(item.route) && path.startsWith(`${item.route}/addnew`));
                        return (
                            <div
                                key={item.label}
                                onClick={() => router.push(item.route)}
                                className={`font-semibold w-[200px] h-10 pl-[18px] py-[10px] text-sm flex items-center gap-[12px] text-black rounded-xl cursor-pointer  ${
                                    isActive ? 'bg-blue text-white hover:bg-opacity-60' : 'hover:text-blue'
                                }`}
                            >
                                <item.icon />
                                <span>{item.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div
                className="font-bold flex items-center gap-[14px] px-[60px] mb-[30px] cursor-pointer hover:opacity-60"
                onClick={handleLogout}
            >
                <LogoutRoundedIcon />
                <span>Logout</span>
            </div>
        </div>
    );
};

export default AdminNav;
