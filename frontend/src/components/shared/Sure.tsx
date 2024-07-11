import axios from '@/utils/axios';
import useAxiosPrivate from '@/utils/intercepter';
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
    const axiosPrivate = useAxiosPrivate();
    const handleClose = () => {
        setOrderId('');
        setCurrent('');
        setOpen(false);
    };
    const handleStatus = async () => {
        const token = localStorage.getItem('token');
        if (current === 'Received') {
            const { data } = await axiosPrivate.patch(
                `/orders/received/${orderId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
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
            const { data } = await axiosPrivate.patch(
                `/orders/return/${orderId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
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
            const { data } = await axiosPrivate.patch(
                `/orders/cancel/${orderId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
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
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sure;
