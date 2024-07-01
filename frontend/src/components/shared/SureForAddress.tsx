import axios from '@/utils/axios';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
type Props = {
    id: string;
    setId: Dispatch<SetStateAction<string>>;
    setOpen1: Dispatch<SetStateAction<boolean>>;
    setLoad: Dispatch<SetStateAction<boolean>>;
};
const SureForAddress = ({ id, setId, setLoad, setOpen1 }: Props) => {
    const handleSure = async () => {
        const { data } = await axios.delete(`/deliveryAddress/${id}`);
        if (data.success) {
            toast.success('Delete address success');
            setLoad((prev) => !prev);
            setOpen1(false);
        } else {
            toast.error('Delete address fail');
        }
    };
    const handleClose = () => {
        setOpen1(false);
        setId('');
    };
    return (
        <div className="modal">
            <div className="flex flex-col bg-white items-center p-10 rounded-md shadow-form gap-5">
                <span className="font-semibold text-xl">Are You Sure ?</span>
                <div className="flex gap-2">
                    <button
                        className="w-[100px] h-[50px] rounded-full bg-blue bg-opacity-60 text-white hover:bg-opacity-100"
                        onClick={handleSure}
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

export default SureForAddress;
