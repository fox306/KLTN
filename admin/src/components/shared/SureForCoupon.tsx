import axios from '@/utils/axios';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

type Props = {
    setOpen1: Dispatch<SetStateAction<boolean>>;
    setLoad: Dispatch<SetStateAction<boolean>>;
    id: string;
    setId: Dispatch<SetStateAction<string>>;
    action: string;
    setAction: Dispatch<SetStateAction<string>>;
};

const SureForCoupon = ({ setOpen1, setLoad, id, setId, action, setAction }: Props) => {
    const handleClose = () => {
        setId('');
        setAction('');
        setOpen1(false);
    };
    const handleStatus = async () => {
        if (action === 'Lock') {
            const { data } = await axios.patch(`/coupons/lock/${id}`);
            if (data.success) {
                toast.success('Lock Coupon Success');
                setLoad((prev) => !prev);
                setAction('');
                setId('');
                setOpen1(false);
            } else {
                toast.error('Lock Coupon Fail');
            }
        } else {
            const { data } = await axios.patch(`/coupons/unLock/${id}`);
            console.log(data);

            if (data.success) {
                toast.success('Unlock Coupon Success');
                setLoad((prev) => !prev);
                setAction('');
                setId('');
                setOpen1(false);
            } else {
                toast.error('Unlock Coupon Fail');
            }
        }
    };
    return (
        <div className="modal">
            <div className="flex flex-col bg-white items-center p-10 rounded-md shadow-form gap-5">
                <span className="font-semibold text-xl">Are You Sure ?</span>
                <div className="flex gap-2">
                    <button
                        className="w-[100px] h-[50px] rounded-full bg-blue bg-opacity-60 text-white hover:bg-opacity-100"
                        onClick={handleStatus}
                    >
                        Yes
                    </button>
                    <button
                        className="w-[100px] h-[50px] rounded-full bg-red bg-opacity-60 text-white hover:bg-opacity-100"
                        onClick={handleClose}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SureForCoupon;
