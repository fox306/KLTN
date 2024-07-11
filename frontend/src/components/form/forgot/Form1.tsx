'use client';
import axios from '@/utils/axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
    setOpen1: Dispatch<SetStateAction<boolean>>;
    email: string;
    setOpen2: Dispatch<SetStateAction<boolean>>;
    setCode: Dispatch<SetStateAction<string>>;
};

const Form1 = ({ setOpen1, email, setOpen2, setCode }: Props) => {
    const handleNext = () => {
        setOpen2(true);
        setOpen1(false);
    };
    const handleBack = () => {
        setOpen1(false);
    };
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.post('/auths/sendOTP', {
                email: email,
            });
            if (data.success) {
                setCode(data.data);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="modal">
            <div className=" flex flex-col bg-white items-center p-10 rounded-md shadow-form gap-5">
                <span className="font-bold text-xl">Forgotpass - Notification</span>
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
