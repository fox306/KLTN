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
        if (current === 'Accepted') {
            const { data } = await axios.patch('/orders', {
                order: orderId,
                status: current,
            });
            if (data.success) {
                toast.success('Comfirm Success');
                setLoad((prev) => !prev);
                setCurrent('');
                setOrderId('');
                setOpen(false);
            }
        } else if (current === 'Delivering') {
            const { data } = await axios.patch('/orders', {
                order: orderId,
                status: current,
            });
            if (data.success) {
                toast.success('Delivery Success');
                setLoad((prev) => !prev);
                setCurrent('');
                setOrderId('');
                setOpen(false);
            }
        } else if (current === 'Cancel') {
            const { data } = await axios.patch('/orders', {
                order: orderId,
                status: current,
            });
            if (data.success) {
                toast.success('Cancel Success');
                setLoad((prev) => !prev);
                setCurrent('');
                setOrderId('');
                setOpen(false);
            }
        } else {
            const { data } = await axios.patch('/orders', {
                order: orderId,
                status: current,
            });
            if (data.success) {
                toast.success('Success');
                setLoad((prev) => !prev);
                setCurrent('');
                setOrderId('');
                setOpen(false);
            }
        }
    };
    return (
        <div className="modal">
            <div className="flex flex-col bg-white items-center p-10 rounded-md shadow-form gap-5">
                <span className="font-semibold text-xl">Are You Sure ?</span>
                <div className="flex gap-4">
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
