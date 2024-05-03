import { TextField } from '@mui/material';
import Image from 'next/image';
import { Dispatch, useRef, useState } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import axios from '@/utils/axios';
import { toast } from 'react-toastify';

type Props = {
    setLoad: Dispatch<React.SetStateAction<boolean>>;
};

const AddNewCate = ({ setLoad }: Props) => {
    const [image, setImage] = useState<File>();
    const [name, setName] = useState<string>('');

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

    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append('name', name);
        image && formData.append('image', image);

        const { data } = await axios.post('/categories', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (data.success) {
            setLoad(true);
            setName('');
            toast.success('Create Category Success');
            setImage(undefined);
        }
    };

    return (
        <div className="flex flex-col w-[400px] gap-5">
            <span className="ml-5 mb-5 font-bold text-lg">Add New Category</span>
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
                        {image && (
                            <Image
                                src={URL.createObjectURL(image)}
                                alt="Shoes"
                                width={120}
                                height={120}
                                className="shadow-cate"
                            />
                        )}
                    </div>
                    {image === undefined ? (
                        <div>
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
                    Create
                </button>
            </div>
        </div>
    );
};

export default AddNewCate;
