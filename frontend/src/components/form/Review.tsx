'use client';

import { ItemCart } from '@/types/type';
import axios from '@/utils/axios';
import { Rating } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
    item: ItemCart;
    setActive: Dispatch<SetStateAction<boolean>>;
    id: string;
};

const Review = ({ item, setActive, id }: Props) => {
    const [text, setText] = useState<string>('');
    const [value, setValue] = useState<number | null>(0);
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('commentator', id);
        formData.append('product', item.product);
        formData.append('rating', value?.toString() || '');
        formData.append('content', text);
        const { data } = await axios.post('/comments', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (data.success) {
            toast.success('Review Product Success');
            setActive(false);
            setText('');
        } else {
            toast.error('Product has reviewed');
            setActive(false);
            setText('');
        }
    };
    return (
        <div className="modal">
            <div className="flex flex-col bg-white items-center py-10 px-[60px] rounded-md shadow-form gap-5">
                <span className="font-semibold text-xl">Review about {item?.name}</span>
                <div className="w-full ">
                    <textarea
                        onChange={(e) => setText(e.target.value)}
                        className="w-full p-2 text-base border border-blue"
                    ></textarea>
                </div>
                <Rating
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
                <button
                    className="w-[190px] h-[60px] rounded-full bg-blue bg-opacity-20 hover:bg-opacity-100 hover:text-white text-blue"
                    onClick={handleSubmit}
                >
                    Submit Review
                </button>
            </div>
        </div>
    );
};

export default Review;
