import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Image from 'next/image';
import axios from '@/utils/axios';
import { toast } from 'react-toastify';
import { Category } from '@/types/type';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

type Props = {
    item: Category;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setLoad: Dispatch<SetStateAction<boolean>>;
};

const UpdateCate = ({ item, setOpen, setLoad }: Props) => {
    const [image, setImage] = useState<File[]>();
    const [name, setName] = useState<string>('');

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
            setOpen(false);
            setLoad(true);

            toast.success('Edit Category Success');
        }
    };
    const handleDelImg = () => {
        setImage(undefined);
    };
    useEffect(() => {
        setName(item.name);
    }, [item]);
    console.log(image);
    return (
        <div className="modal">
            <div className="relative bg-white px-[60px] py-10 flex flex-col items-center gap-5 rounded-[10px]">
                <div>
                    <span className="font-bold text-lg">UPDATE CATEGORY</span>
                </div>
                <CloseOutlinedIcon
                    className="absolute right-0 top-0 text-[40px] text-red opacity-50 hover:opacity-100 cursor-pointer"
                    onClick={() => setOpen(false)}
                />
                <div className="relative w-full h-[60px] border shadow-input rounded-[5px] px-5 pt-[18px] pb-[12px] mt-[18px]">
                    <span className="absolute font-medium top-[-12px] text-black opacity-60">Category Name</span>
                    <input
                        type="text"
                        className="w-full outline-none font-medium"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="relative w-full border shadow-input rounded-[5px] px-[100px] pt-[30px] pb-5 flex justify-center">
                    <span className="absolute font-medium top-[-12px] left-[22px] text-black opacity-60">
                        Image Of Category
                    </span>
                    <div className="flex gap-5">
                        <div className="relative">
                            {item.img !== '' ? (
                                <Image
                                    src={item.img}
                                    alt="Shoes"
                                    width={120}
                                    height={120}
                                    className="shadow-cate w-[120px] h-[120px]"
                                />
                            ) : (
                                image &&
                                image.map((item, i) => (
                                    <Image
                                        key={i}
                                        src={item ? item.name : './noData'}
                                        alt="Shoes"
                                        width={120}
                                        height={120}
                                        className="shadow-cate w-[120px] h-[120px] "
                                    />
                                ))
                            )}
                            {image && (
                                <CancelOutlinedIcon
                                    className="absolute top-[-12px] right-[-10px] text-blue hover:opacity-50 cursor-pointer"
                                    onClick={handleDelImg}
                                />
                            )}
                        </div>
                        {image === undefined || image.length < 1 ? (
                            <div className=" cursor-pointer">
                                <div
                                    onClick={handleToggleInput}
                                    className="opacity-50 w-[120px] h-[120px] border-4 border-dashed flex flex-col items-center justify-center gap-10 cursor-pointer"
                                >
                                    <AddPhotoAlternateOutlinedIcon />
                                    <span>Add Image</span>
                                </div>
                                <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} />
                            </div>
                        ) : (
                            <div className="cursor-pointer">
                                <div className="opacity-50 w-[120px] h-[120px] border-4 border-dashed flex flex-col items-center justify-center gap-10">
                                    <AddPhotoAlternateOutlinedIcon />
                                    <span>FULL</span>
                                </div>
                                <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex gap-20">
                    <button
                        className="w-[150px] h-10 rounded-[5px] text-base font-medium text-red bg-red bg-opacity-[15%] hover:bg-opacity-100 hover:text-white"
                        onClick={() => setOpen(false)}
                    >
                        CANCEL
                    </button>
                    <button
                        className="w-[150px] h-10 rounded-[5px] text-base font-medium text-blue bg-blue bg-opacity-[15%] hover:bg-opacity-100 hover:text-white"
                        onClick={handleSubmit}
                    >
                        UPDATE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateCate;
