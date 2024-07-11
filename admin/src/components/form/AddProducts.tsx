'use client';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { CreateVariants } from '@/types/type';

type Props = {
    value: number;
    vars: CreateVariants;
    setVars: Dispatch<SetStateAction<CreateVariants[]>>;
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

const AddProducts = ({ value, vars, setVars }: Props) => {
    const handleAddSizes = () => {
        setVars((prevVars) =>
            prevVars.map((variant, i) =>
                i === value
                    ? {
                          ...variant,
                          receipt_variant: [
                              ...variant.receipt_variant,
                              {
                                  quantity: 0,
                                  size: '',
                              },
                          ],
                      }
                    : variant,
            ),
        );
    };
    const handleDeleteSize = (index: number) => {
        console.log(index);
        console.log(value);
        setVars((prevVars) =>
            prevVars.map((variant, i) =>
                i === value
                    ? {
                          ...variant,
                          receipt_variant: variant.receipt_variant.filter((_, j) => j !== index),
                      }
                    : variant,
            ),
        );
    };
    const handleDelete = () => {
        setVars((prevVars) => {
            const updatedVariants = [...prevVars];
            updatedVariants.splice(value, 1);
            return updatedVariants;
        });
    };
    const handleVariantChange = (key: number, index: number, field: string, value: string) => {
        setVars((prevVars) => {
            const updatedVars = [...prevVars];
            if (updatedVars[key] && updatedVars[key].receipt_variant) {
                const receipt_variant = [...updatedVars[key].receipt_variant];
                receipt_variant[index] = {
                    ...receipt_variant[index],
                    [field]: value,
                };
                updatedVars[key].receipt_variant = receipt_variant;
            }
            return updatedVars;
        });
    };
    // const handleChangeColor = () => {

    // }
    const handleChange = (index: number, field: string, value: string) => {
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
            <div className="flex flex-col pr-[30px] gap-[10px]">
                <TextField
                    id="name_product"
                    label="Name of Product"
                    variant="outlined"
                    inputProps={{
                        className: 'text-center',
                    }}
                    value={vars.name_product}
                    onChange={(event) => handleChange(value, 'name_product', event.target.value)}
                />
                <div className="flex justify-between gap-5">
                    <FormControl className="w-1/2">
                        <InputLabel id="colorId">Color</InputLabel>
                        <Select
                            labelId="colorId"
                            id="color"
                            value={vars?.color ?? ''}
                            label="Color"
                            onChange={(event) => handleChange(value, 'color', event.target.value)}
                            inputProps={{
                                className: 'text-center',
                            }}
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
                    <TextField
                        id="total_quantity"
                        label="Total Quantity"
                        variant="outlined"
                        className="w-1/2"
                        type="number"
                        inputProps={{
                            className: 'text-center',
                        }}
                        value={vars.total_quantity}
                        onChange={(event) => handleChange(value, 'total_quantity', event.target.value)}
                    />
                </div>
                <div className="flex gap-5">
                    <TextField
                        id="unit_price"
                        label="Unit Price"
                        variant="outlined"
                        className="w-1/2"
                        type="number"
                        inputProps={{
                            className: 'text-center',
                        }}
                        value={vars.unit_price}
                        onChange={(event) => handleChange(value, 'unit_price', event.target.value)}
                    />
                    <TextField
                        id="total_price"
                        label="Total Price"
                        variant="outlined"
                        className="w-1/2"
                        type="number"
                        inputProps={{
                            className: 'text-center',
                        }}
                        value={vars.total_price}
                        onChange={(event) => handleChange(value, 'total_price', event.target.value)}
                    />
                </div>
            </div>
            <div className="border-l-2 pl-20">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">List Size Of Color</span>
                    <div className="flex gap-5">
                        <button
                            className="w-[150px] h-10 rounded-[5px] bg-red bg-opacity-50 text-white hover:bg-opacity-100"
                            onClick={handleDelete}
                        >
                            Delete Detail
                        </button>
                        <button
                            className="w-[150px] h-10 rounded-[5px] bg-blue bg-opacity-50 text-white hover:bg-opacity-100"
                            onClick={handleAddSizes}
                        >
                            Add New Size
                        </button>
                    </div>
                </div>
                <div>
                    {vars.receipt_variant?.map((item, index) => (
                        <div key={index} className="flex items-center gap-[25px] justify-center mt-[10px]">
                            <TextField
                                label="Size"
                                variant="outlined"
                                inputProps={{
                                    className: 'w-[200px]',
                                }}
                                value={item.size}
                                onChange={(event) => handleVariantChange(value, index, 'size', event.target.value)}
                            />
                            <TextField
                                label="Quantity"
                                variant="outlined"
                                inputProps={{
                                    className: 'w-[200px]',
                                }}
                                type="number"
                                value={item.quantity}
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

export default AddProducts;
