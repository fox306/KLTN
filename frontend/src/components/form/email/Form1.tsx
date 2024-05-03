'use client';
import { sendCode } from '@/slices/authSlice';
import { usePathname } from 'next/navigation';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>;
    email: string;
    setOpen1: Dispatch<SetStateAction<boolean>>;
    setLoad: Dispatch<SetStateAction<boolean>>;
    setChange: Dispatch<SetStateAction<boolean>>;
};

const Form1 = ({ setOpen, email, setOpen1, setLoad, setChange }: Props) => {
    const pathname = usePathname();
    const handleNext = () => {
        setOpen1(true);
        setOpen(false);
    };
    const handleBack = () => {
        if (pathname === '/user') {
            setOpen(false);
            setLoad((prev) => !prev);
            setChange(false);
        } else {
            setOpen(false);
        }
    };
    return (
        <div className="modal">
            <div className=" flex flex-col bg-white items-center p-10 rounded-md shadow-form gap-5">
                <span className="font-bold text-xl">
                    {pathname === 'user' ? 'Update' : 'Register'} Email - Notification
                </span>
                <p className="text-center font-semibold mt-5">
                    To ensure the confidentiality and security of information, we have sent a 6-digit confirmation code
                    to the email "{email}".
                </p>
                <p className="text-center font-semibold">
                    Please check your email "{email}" to continue the process of changing your email.
                </p>
                <div className="flex gap-5 font-medium text-xl">
                    <button
                        className="w-[190px] h-[60px] rounded-full bg-red bg-opacity-20 text-red"
                        onClick={handleBack}
                    >
                        Cancel
                    </button>
                    <button
                        className="w-[190px] h-[60px] rounded-full  bg-blue bg-opacity-20 text-blue"
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Form1;
