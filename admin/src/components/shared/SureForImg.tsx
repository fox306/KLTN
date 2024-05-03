'use client';
import axios from '@/utils/axios';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>;
    setIndex: Dispatch<SetStateAction<number>>;
    index: number;
    setImgName: Dispatch<SetStateAction<string>>;
    imgName: string;
    image: File[] | undefined;
    setImage: Dispatch<SetStateAction<File[] | undefined>>;
    id: string;
    upImage: File[] | undefined;
    setUpImage: Dispatch<SetStateAction<File[] | undefined>>;
    action: string;
    setAction: Dispatch<SetStateAction<string>>;
    variant: string;
    setVariant: Dispatch<SetStateAction<string>>;
    setVars: Dispatch<
        SetStateAction<
            {
                variant: string;
                color: string;
                size: string;
                quantity: string;
            }[]
        >
    >;
    setAddVariants: Dispatch<SetStateAction<{}[]>>;
};

const SureForImg = ({
    setOpen,
    setIndex,
    index,
    setImgName,
    imgName,
    image,
    setImage,
    id,
    upImage,
    setUpImage,
    action,
    setAction,
    variant,
    setVariant,
    setVars,
    setAddVariants,
}: Props) => {
    const handleSubmit = async () => {
        if (action === 'Image') {
            if (image) {
                const newImage = [...image];
                if (imgName.includes('blob')) {
                    const newUpImage = upImage?.filter((item) => item.name !== imgName);
                    newImage.splice(index, 1);
                    setImage(newImage);
                    if (newUpImage === undefined) {
                        setUpImage([]);
                    } else {
                        setUpImage(newUpImage);
                    }
                    setOpen(false);
                    toast.success('Delete Image Success');
                } else {
                    const { data } = await axios.delete('/products/image', {
                        params: {
                            product: id,
                            image: imgName,
                        },
                    });
                    if (data.success) {
                        newImage.splice(index, 1);
                        setImage(newImage);
                        setOpen(false);
                        toast.success('Delete Image Success');
                    }
                }
            }
        } else {
            const { data } = await axios.delete('/variants', {
                params: { variant: variant },
            });
            if (data.success) {
                setVars((prevVariants) => {
                    const updatedVariants = [...prevVariants];
                    updatedVariants.splice(index, 1);
                    return updatedVariants;
                });
                setAddVariants((prevVariants) => {
                    const updatedVariants = [...prevVariants];
                    updatedVariants.splice(index, 1);
                    return updatedVariants;
                });
                setIndex(0);
                setOpen(false);
                setVariant('');
                toast.success('Delete Variant Success');
            }
        }
    };
    const handleCancel = () => {
        if (action === 'Image') {
            setIndex(0);
            setImgName('');
            setOpen(false);
        } else {
            setIndex(0);
            setOpen(false);
            setVariant('');
        }
    };
    return (
        <div className="modal">
            <div className="flex flex-col bg-white items-center p-10 rounded-md shadow-form gap-5">
                <span className="font-semibold text-xl">Are You Sure To Delete This {action}</span>
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

export default SureForImg;
