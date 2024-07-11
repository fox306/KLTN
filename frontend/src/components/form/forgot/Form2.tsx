'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import OtpInput from '../../shared/OtpInput';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { sendCode } from '@/slices/authSlice';
import axios from '@/utils/axios';
import { usePathname } from 'next/navigation';

type Props = {
    email: string;
    setOpen2: Dispatch<SetStateAction<boolean>>;
    code: string;
    setCode: Dispatch<SetStateAction<string>>;
    setOpen3: Dispatch<SetStateAction<boolean>>;
};

const Form2 = ({ email, setOpen2, code, setCode, setOpen3 }: Props) => {
    const [otp, setOtp] = useState<string>('');
    const [check, setCheck] = useState(false);
    console.log(code);

    const handleChange = (otp: string) => {
        setCheck(false);
        setOtp(otp);
    };

    const handleCheckCode = () => {
        if (code.toString() === otp) {
            setOpen2(false);
            setOpen3(true);
        } else {
            setCheck(true);
        }
    };

    const handleResend = async () => {
        const { data } = await axios.post('/auths/sendOTP', {
            email: email,
        });
        if (data.success) {
            setCode(data.code);
        }
    };
    const handleCancel = () => {
        setOpen2(false);
    };

    return (
        <div className="modal">
            <div className="p-10 flex flex-col bg-white items-center rounded-md shadow-lg">
                <span className="font-bold text-xl mb-[20px]">Get Confirmation Code</span>

                <OtpInput value={otp} valueLength={6} onChange={handleChange} />
                {check && (
                    <span className="font-medium text-red block mt-7 mb-10">Confirmation code is incorrect!!!</span>
                )}
                <span className="block mt-[50px] mb-1 font-medium">You can resend the code after 60s!!! </span>
                <span className="font-bold text-blue" onClick={handleResend}>
                    Resend code
                </span>
                <div className="mt-5 flex gap-5 font-medium text-xl">
                    <button
                        onClick={handleCancel}
                        className="w-[160px] h-[60px] rounded-full bg-red bg-opacity-20 text-red"
                    >
                        Cancel
                    </button>
                    <button
                        className="w-[160px] h-[60px] rounded-full bg-blue bg-opacity-20 text-blue"
                        onClick={handleCheckCode}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Form2;
