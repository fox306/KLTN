import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Image from 'next/image';
import axios from '@/utils/axios';
import { toast } from 'react-toastify';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Loading from '../shared/Loading';
import useAxiosPrivate from '@/utils/intercepter';

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>;
    setLoad: Dispatch<SetStateAction<boolean>>;
};
const AddCate = ({ setOpen, setLoad }: Props) => {
    const axiosPrivate = useAxiosPrivate();

    const [image, setImage] = useState<File>();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleToggleInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files;
        if (file) {
            setImage(file[0]);
        }
    };
    const handleDelImg = () => {
        setImage(undefined);
    };
    const handleSubmit = async () => {
        const form = new FormData();
        image && form.append('file', image);
        form.append('name', name);
        setLoading(true);
        const { data } = await axiosPrivate.post('/categories', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (data.success) {
            setLoading(false);
            setOpen(false);
            setLoad(true);
            toast.success('Create Category Success');
        }
    };
    return (
        <div className="modal">
            <div className="relative bg-white px-[60px] py-10 flex flex-col items-center gap-5 rounded-[10px]">
                <div>
                    <span className="font-bold text-lg">CREATE NEW CATEGORY</span>
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
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="relative w-full border shadow-input rounded-[5px] px-[100px] pt-[30px] pb-5 flex justify-center">
                    <span className="absolute font-medium top-[-12px] left-[22px] text-black opacity-60">
                        Image Of Category
                    </span>
                    <div className="flex gap-5">
                        <div className="relative">
                            {image && (
                                <Image
                                    src={URL.createObjectURL(image)}
                                    alt="Shoes"
                                    width={120}
                                    height={120}
                                    className="shadow-cate w-[120px] h-[120px]"
                                />
                            )}
                            {image && (
                                <CancelOutlinedIcon
                                    className="absolute top-[-12px] right-[-10px] text-blue hover:opacity-50 cursor-pointer"
                                    onClick={handleDelImg}
                                />
                            )}
                        </div>
                        {image === undefined ? (
                            <div className=" cursor-pointer">
                                <div
                                    onClick={handleToggleInput}
                                    className="opacity-50 w-[120px] h-[120px] border-4 border-dashed flex flex-col items-center justify-center gap-10"
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
                        SAVE
                    </button>
                </div>
            </div>
            {loading && (
                <div className="modal">
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default AddCate;
