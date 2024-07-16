'use client';

import { ItemCart } from '@/types/type';
import axios from '@/utils/axios';
import useAxiosPrivate from '@/utils/intercepter';
import { Rating } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
    item: ItemCart;
    setActive: Dispatch<SetStateAction<boolean>>;
    id: string;
};

const Review = ({ item, setActive, id }: Props) => {
    const axiosPrivate = useAxiosPrivate();
    const [text, setText] = useState<string>('');
    const [value, setValue] = useState<number | null>(0);
    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        try {
            const formData = new FormData();
            formData.append('commentator', id);
            formData.append('product', item.product);
            formData.append('rating', value?.toString() || '');
            formData.append('content', text);
            const { data } = await axiosPrivate.post('/comments', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (data.success) {
                toast.success('Review Product Success');
                setActive(false);
                setText('');
            }
        } catch (error) {
            toast.error('Product has reviewed');
            setActive(false);
            setText('');
        }
    };
    return (
        <div className="modal">
            <div className="flex flex-col bg-white items-center py-5 px-[40px] rounded-md shadow-form gap-5">
                <div className="flex items-center gap-[3px]">
                    <span className="text-lg text-black opacity-60">Create Review:</span>
                    <span className="font-semibold text-lg">{item?.name}</span>
                </div>
                <div className="flex items-center w-full ml-[30px] gap-[50px]">
                    <span className="text-black opacity-60 text-base">Rating:</span>
                    <Rating
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        className="text-3xl"
                    />
                </div>
                <div className="w-[840px] h-[140px] px-10 py-5 border border-black border-opacity-20 relative rounded-[5px] shadow-comment">
                    <span className="absolute left-[6px] top-[-16px] px-2 py-1 bg-white text-base text-black text-opacity-60 ">
                        Comment
                    </span>
                    <textarea
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-full outline-none"
                    ></textarea>
                </div>
                <div className="flex item-center gap-5">
                    <button
                        className="w-[160px] h-10 rounded-[50px] bg-red text-red bg-opacity-20 hover:bg-opacity-100 hover:text-white"
                        onClick={() => {
                            setActive(false);
                            setText('');
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="w-[160px] h-10 rounded-[50px] bg-blue bg-opacity-20 hover:bg-opacity-100 hover:text-white text-blue"
                        onClick={handleSubmit}
                    >
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Review;
