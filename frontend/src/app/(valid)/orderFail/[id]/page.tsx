'use client';
import React from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useParams, useRouter } from 'next/navigation';

const OrderFail = () => {
    const router = useRouter();
    const { id } = useParams();

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <CancelOutlinedIcon className="text-[160px] text-red" />
            <span className="font-bold text-red text-4xl mt-[10px]">Payment Error!</span>
            <span className="text-lg font-semibold mt-10">You have failed to pay for order "{id}".</span>
            <div className="flex gap-[10px] mt-5">
                <button
                    className="w-[200px] h-[60px] bg-blue text-main bg-opacity-60 hover:bg-opacity-100 rounded-[5px] text-white font-medium text-lg"
                    onClick={() => router.push('/')}
                >
                    Home
                </button>
                <button
                    className="w-[200px] h-[60px] bg-blue text-main bg-opacity-60 hover:bg-opacity-100 rounded-[5px] text-white font-medium text-lg "
                    onClick={() => router.push('/user/orders')}
                >
                    Order Details
                </button>
            </div>
        </div>
    );
};

export default OrderFail;
