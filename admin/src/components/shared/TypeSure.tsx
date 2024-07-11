import axios from '@/utils/axios';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>;
    setAction: Dispatch<SetStateAction<string>>;
    action: string;
    setId: Dispatch<SetStateAction<string>>;
    id: string;
    setLoad: Dispatch<SetStateAction<boolean>>;
};

const TypeSure = ({ setOpen, setAction, action, setId, id, setLoad }: Props) => {
    const handleCancel = () => {
        setOpen(false);
        setAction('');
        setId('');
    };
    console.log(id);
    const handleSubmit = async () => {
        if (action === 'Lock') {
            const { data } = await axios.patch(`/users/lock/${id}`);
            if (data.success) {
                toast.success('Lock User Success');
                setLoad((prev) => !prev);
                setOpen(false);
                setAction('');
                setId('');
            }
        } else if (action === 'UnLock') {
            const { data } = await axios.patch(`/users/unlock/${id}`);
            if (data.success) {
                toast.success('UnLock User Success');
                setLoad((prev) => !prev);
                setOpen(false);
                setAction('');
                setId('');
            }
        } else if (action === 'Hide') {
            const { data } = await axios.patch(`/products/hide/${id}`);
            console.log(id);
            if (data.success) {
                toast.success('Hidden Product Success');
                setLoad((prev) => !prev);
                setOpen(false);
                setAction('');
                setId('');
            }
        } else {
            const { data } = await axios.patch(`/products/unLockOrHide/${id}`);
            if (data.success) {
                toast.success('On Sale Product Success');
                setLoad((prev) => !prev);
                setOpen(false);
                setAction('');
                setId('');
            }
        }
    };

    return (
        <div className="modal">
            <div className="flex flex-col bg-white items-center p-10 rounded-md shadow-form gap-5">
                <span className="font-semibold text-xl">Are You Sure ?</span>
                <div className="flex gap-4">
                    <button
                        onClick={handleSubmit}
                        className="w-[100px] h-[50px] rounded-full bg-blue bg-opacity-60 text-white hover:bg-opacity-100"
                    >
                        Yes
                    </button>
                    <button
                        onClick={handleCancel}
                        className="w-[100px] h-[50px] rounded-full bg-red bg-opacity-60 text-white hover:bg-opacity-100"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TypeSure;
