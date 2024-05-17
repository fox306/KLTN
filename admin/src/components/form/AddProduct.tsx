'use client';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { CreateVariant } from '@/types/type';

type Props = {
    value: number;
    vars: CreateVariant[];
    setVars: Dispatch<SetStateAction<CreateVariant[]>>;
    setAddVariants: Dispatch<SetStateAction<{}[]>>;
};

const colors = [
    'Red',
    'Blue',
    'Gray',
    'Cyan',
    'Pink',
    'Green',
    'Black',
    'White',
    'Brown',
    'Purple',
    'Yellow',
    'Orange',
    'Silver',
];

const AddProduct = ({ value, vars, setVars, setAddVariants }: Props) => {
    const [image, setImage] = useState<File>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [sizes, setSizes] = useState<{}[][]>([]);

    const handleToggleInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files;
        if (file) {
            setVars((prevVariants) => {
                const updatedVariants = [...prevVariants];
                updatedVariants[value] = {
                    ...updatedVariants[value],
                    image: file[0],
                };
                return updatedVariants;
            });
        }
    };
    const handleAddSizes = () => {
        setSizes((prev) => {
            const updatedSizes = [...prev];
            updatedSizes[value] = [...(updatedSizes[value] || []), {}];
            return updatedSizes;
        });
        setVars((prevVars) => {
            const updatedVars = [...prevVars];
            if (!updatedVars[value].details) {
                updatedVars[value].details = [];
            }
            return updatedVars;
        });
    };
    const handleDeleteSize = (index: number) => {
        setSizes((prev) => {
            const updatedVariants = [...prev];
            updatedVariants.splice(index, 1);
            return updatedVariants;
        });
        setVars((prevVars) => {
            const updatedVars = [...prevVars];
            if (updatedVars[value] && updatedVars[value].details) {
                const details = [...updatedVars[value].details];
                details.splice(index, 1);
                updatedVars[value].details = details;
            }
            return updatedVars;
        });
    };
    const handleDeleteColor = () => {
        setAddVariants((prev) => {
            const updatedVariants = [...prev];
            updatedVariants.splice(value, 1);
            return updatedVariants;
        });
        setVars((prevVars) => {
            const updatedVariants = [...prevVars];
            updatedVariants.splice(value, 1);
            return updatedVariants;
        });
    };
    const handleDeleteImage = () => {
        setVars((prevVars) => {
            const updatedVariants = [...prevVars];
            updatedVariants[value] = {
                ...updatedVariants[value],
                image: null,
            };
            return updatedVariants;
        });
    };
    const handleVariantChange = (key: number, index: number, field: string, value: string) => {
        setVars((prevVars) => {
            const updatedVars = [...prevVars];
            if (updatedVars[key] && updatedVars[key].details) {
                const details = [...updatedVars[key].details];
                details[index] = {
                    ...details[index],
                    [field]: value,
                };
                updatedVars[key].details = details;
            }
            return updatedVars;
        });
    };
    // const handleChangeColor = () => {

    // }
    const handleColorChange = (index: number, field: string, value: string) => {
        setVars((prevVariants) => {
            const updatedVariants = [...prevVariants];
            updatedVariants[index] = {
                ...updatedVariants[index],
                [field]: value,
            };
            return updatedVariants;
        });
    };
    console.log(vars);

    return (
        <div className={`grid grid-cols-2 shadow-product3 bg-white px-10 py-5 ${value > 0 ? 'mt-[10px]' : ''}`}>
            <div className="flex flex-col items-center">
                <div>
                    <FormControl className="w-[320px]">
                        <InputLabel id="colorId">Color</InputLabel>
                        <Select
                            labelId="colorId"
                            id="color"
                            value={vars[value]?.color ?? ''}
                            label="Color"
                            onChange={(event) => handleColorChange(value, 'color', event.target.value)}
                            className="font-bold"
                        >
                            {colors &&
                                colors.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                    <button
                        className="w-[150px] h-[56px] bg-red bg-opacity-50 text-white rounded-[5px] ml-10 hover:bg-opacity-100"
                        onClick={handleDeleteColor}
                    >
                        Delete Color
                    </button>
                </div>
                <div className="mt-5">
                    <div className="flex gap-[10px]">
                        <div className="flex gap-5 w-[120px] h-[120px]">
                            {vars[value]?.image && (
                                <Image
                                    src={URL.createObjectURL(vars[value].image)}
                                    alt="Shoes"
                                    width={100}
                                    height={100}
                                    className="shadow-cate"
                                />
                            )}
                        </div>
                        {vars[value]?.image === null ? (
                            <div>
                                <div
                                    onClick={handleToggleInput}
                                    className="opacity-50 w-[100px] h-[100px] border-4 border-dashed flex flex-col items-center justify-center gap-10"
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
            </div>
            <div className="border-l-2 pl-20">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">List Size Of Color</span>
                    <button
                        className="w-[150px] h-[56px] rounded-[5px] bg-blue bg-opacity-50 text-white hover:bg-opacity-100"
                        onClick={handleAddSizes}
                    >
                        Add New Size
                    </button>
                </div>
                <div>
                    {sizes[value]?.map((item, index) => (
                        <div key={index} className="flex items-center gap-[25px] justify-center mt-[10px]">
                            <TextField
                                label="Size"
                                variant="outlined"
                                inputProps={{
                                    className: 'w-[200px]',
                                }}
                                onChange={(event) => handleVariantChange(value, index, 'size', event.target.value)}
                            />
                            <TextField
                                label="Quantity"
                                variant="outlined"
                                inputProps={{
                                    className: 'w-[200px]',
                                }}
                                onChange={(event) => handleVariantChange(value, index, 'quantity', event.target.value)}
                            />
                            <CloseOutlinedIcon
                                className="text-red hover:opacity-50 cursor-pointer"
                                fontSize="large"
                                onClick={() => handleDeleteSize(index)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
