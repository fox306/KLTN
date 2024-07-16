import axios from '@/utils/axios';
import useAxiosPrivate from '@/utils/intercepter';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    id: string;
};

const SureReceipt = ({ setOpen, setLoading, id }: Props) => {
    const axiosPrivate = useAxiosPrivate();

    const handleConfirm = async () => {
        setLoading(true);
        const { data } = await axiosPrivate.patch(`/good-receipts/receipts/${id}`);
        if (data.success) {
            setOpen(false);
            toast.success('Comfirm Success');
            setLoading(false);
        }
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="modal">
            <div className="flex flex-col bg-white items-center p-10 rounded-md shadow-form gap-5">
                <span className="font-semibold text-xl">Are You Sure ?</span>
                <div className="flex gap-4">
                    <button
                        className="w-[100px] h-[50px] rounded-full bg-blue bg-opacity-60 text-white hover:bg-opacity-100"
                        onClick={handleConfirm}
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

export default SureReceipt;
