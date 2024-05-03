'use client';
import { TextField } from '@mui/material';
import Image from 'next/image';
import React, { Dispatch, useEffect, useRef, useState } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { Category } from '@/types/type';
import axios from '@/utils/axios';
import { toast } from 'react-toastify';

type Props = {
    item: Category;
    setLoad: Dispatch<React.SetStateAction<boolean>>;
};

const EditCate = ({ item, setLoad }: Props) => {
    const [image, setImage] = useState<File[]>();
    const [name, setName] = useState<string>(item.name);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleToggleInput = () => {
        if (fileInputRef.current) {
            item.img = '';
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const arr = [];
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const url = URL.createObjectURL(file);
                const fileWithUrl = new File([file], url);
                arr.push(fileWithUrl);
            }
        }
        setImage(arr);
    };
    const handleSubmit = async () => {
        const formData = new FormData();

        image &&
            image.forEach((i) => {
                formData.append('images', i);
            });
        formData.append('category', item._id);
        formData.append('name', name);
        console.log(formData.get('category'));
        const { data } = await axios.put('/categories', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (data.success) {
            toast.success('Edit Category Success');
            setLoad(true);
        }
    };
    useEffect(() => {
        setName(item.name);
    }, [item]);
    return (
        <div className="flex flex-col w-[400px] gap-5">
            <span className="ml-5 mb-5 font-bold text-lg">Edit Category Details</span>
            <TextField
                id="category"
                label="Name Of Category"
                variant="outlined"
                inputProps={{
                    className: 'text-lg',
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <div className="h-[170px] shadow-cate2 relative border flex justify-center">
                <div className="font-bold text-sm absolute top-[-15px] left-[10px] p-1 bg-white">Image of Category</div>
                <div className="py-5 px-[70px] flex gap-[10px]">
                    <div className="flex gap-5 w-[120px] h-[120px]">
                        {item.img !== '' ? (
                            <Image src={item.img} alt="Shoes" width={120} height={120} className="shadow-cate" />
                        ) : (
                            image &&
                            image.map((item, i) => (
                                <Image
                                    key={i}
                                    src={item.name}
                                    alt="Shoes"
                                    width={120}
                                    height={120}
                                    className="shadow-cate"
                                />
                            ))
                        )}
                    </div>
                    {image === undefined || image.length < 1 ? (
                        <div>
                            <div
                                onClick={handleToggleInput}
                                className="opacity-50 w-[120px] h-[120px] border-4 border-dashed flex flex-col items-center justify-center gap-10"
                            >
                                <AddPhotoAlternateOutlinedIcon />
                                <span>Edit Image</span>
                            </div>
                            <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} />
                        </div>
                    ) : (
                        <div>
                            <div className="opacity-50 w-[120px] h-[120px] border-4 border-dashed flex flex-col items-center justify-center gap-10">
                                <AddPhotoAlternateOutlinedIcon />
                                <span>FULL</span>
                            </div>
                            <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} />
                        </div>
                    )}
                </div>
            </div>
            <div className="text-right">
                <button
                    className="w-[140px] h-10 bg-blue bg-opacity-60 font-medium text-sm text-white hover:bg-opacity-100"
                    onClick={handleSubmit}
                >
                    Edit
                </button>
            </div>
        </div>
    );
};

export default EditCate;
