import axios from '@/utils/axios';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>;
    setLoad: Dispatch<SetStateAction<boolean>>;
    orderId: string;
    setOrderId: Dispatch<SetStateAction<string>>;
    setCurrent: Dispatch<SetStateAction<string>>;
    current: string;
};

const Sure = ({ setOpen, setLoad, orderId, setOrderId, setCurrent, current }: Props) => {
    const handleClose = () => {
        setOrderId('');
        setCurrent('');
        setOpen(false);
    };
    const handleStatus = async () => {
        if (current === 'Received') {
            const { data } = await axios.patch(`/orders/received/${orderId}`);
            if (data.success) {
                toast.success('Received order success');
                setLoad((prev) => !prev);
                setCurrent('');
                setOrderId('');
                setOpen(false);
            } else {
                toast.error('Received order fail');
            }
        } else if (current === 'Return') {
            const { data } = await axios.patch(`/orders/return/${orderId}`);
            console.log(data);

            if (data.success) {
                toast.success('Return order success');
                setLoad((prev) => !prev);
                setCurrent('');
                setOrderId('');
                setOpen(false);
            } else {
                toast.error('Return order fail');
            }
        } else {
            const { data } = await axios.patch(`/orders/cancel/${orderId}`);
            console.log(data);

            if (data.success) {
                toast.success('Cancel order success');
                setLoad((prev) => !prev);
                setOpen(false);
            } else {
                toast.error('Cancel order fail');
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
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sure;
