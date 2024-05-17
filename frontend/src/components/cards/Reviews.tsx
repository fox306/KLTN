'use client';
import { Rating } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Text from './Text';
import { Comment } from '@/types/type';

type Props = {
    comments: Comment[];
};

const Reviews = ({ comments }: Props) => {
    const [value, setValue] = useState<number | null | undefined>(0);
    return (
        <>
            {comments &&
                comments.map((item) => (
                    <div className="flex items-center h-[140px] bg-[#E6F1FB] p-5 gap-5 rounded-lg">
                        <div className="flex items-center gap-5 border-r-2 border-blue pr-5">
                            <div className="w-20 h-20 relative rounded-full">
                                <Image src={item.commentator.avatar} alt="Ảnh" fill />
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="font-bold">{item.commentator.fullName}</span>
                                <Rating name="simple-controlled" value={item.rating} readOnly />
                            </div>
                            <div className="self-start">
                                <FavoriteBorderOutlinedIcon className="text-blue" />
                                <span>{item.like}</span>
                            </div>
                        </div>
                        <div>
                            <Text />
                        </div>
                    </div>
                ))}
        </>
    );
};

export default Reviews;
