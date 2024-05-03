'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import OtpInput from '../../shared/OtpInput';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { sendCode } from '@/slices/authSlice';
import axios from '@/utils/axios';
import { usePathname } from 'next/navigation';

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>;
    email: string;
    setOpen1: Dispatch<SetStateAction<boolean>>;
    code: string;
    setCode: Dispatch<SetStateAction<string>>;
    setRegis: Dispatch<SetStateAction<boolean>>;
    setOpen2: Dispatch<SetStateAction<boolean>>;
    change: boolean;
    setChange: Dispatch<SetStateAction<boolean>>;
    setUpdate: Dispatch<SetStateAction<boolean>>;
};

const Form2 = ({
    setOpen,
    email,
    setOpen1,
    code,
    setCode,
    setRegis,
    setOpen2,
    change,
    setChange,
    setUpdate,
}: Props) => {
    const [otp, setOtp] = useState<string>('');
    const [check, setCheck] = useState(false);
    const { codes } = useSelector((state: any) => state.auth);
    console.log(code);
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (otp: string) => {
        setCheck(false);
        setOtp(otp);
    };

    const handleCheckCode = () => {
        if (pathname === '/user') {
            if (change) {
                if (code.toString() === otp) {
                    setOpen1(false);
                    setChange(false);
                    setUpdate(true);
                } else {
                    setCheck(true);
                }
            } else {
                if (code.toString() === otp) {
                    setOpen1(false);
                    setOpen2(true);
                } else {
                    setCheck(true);
                }
            }
        } else {
            if (code.toString() === otp) {
                setRegis(true);
                setOpen1(false);
            } else {
                setCheck(true);
            }
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
        if (pathname === 'user') {
            setOpen1(false);
            setChange(false);
        } else {
            setOpen1(false);
        }
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
                        Complete
                    </button>
                </div>
                {pathname === '/user' ? (
                    ''
                ) : (
                    <span className="font-bold text-blue mt-[20px]" onClick={handleResend}>
                        After successful confirmation, please press the Sign Up button again to complete the
                        registration process.
                    </span>
                )}
            </div>
        </div>
    );
};

export default Form2;
