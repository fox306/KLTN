'use client';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import axios from '@/utils/axios';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Category, CreateVariant, Product, Variant } from '@/types/type';
import { getAllCategory } from '@/slices/categorySlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { toast } from 'react-toastify';
import { getProductById } from '@/slices/productSlice';
import AddProduct from '@/components/form/AddProduct';

const brands = ['Adidas', 'Nike', 'Vans', 'Balenciaga', 'Converse', 'Puma'];

const AddNewProduct = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [addVariants, setAddVariants] = useState<{}[]>([]);
    const [vars, setVars] = useState<CreateVariant[]>([
        {
            color: '',
            details: [
                {
                    quantity: 0,
                    size: '',
                },
            ],
            image: null,
        },
    ]);
    const { categories }: { categories: Category[] } = useSelector((state: any) => state.categories);

    const [brand, setBrand] = useState<string>('Adidas');
    const [category, setCategory] = useState<string>('');
    const [product, setProduct] = useState<{
        name: string;
        price: string;
        desc: string;
    }>({
        name: '',
        price: '',
        desc: '',
    });
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleToggleInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const arr = [];
        if (files) {
            for (let i = 0; i < files.length; i++) {
                arr.push(files[i]);
            }
        }
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProduct((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };
    const addVariant = () => {
        setVars([
            ...vars,
            {
                color: '',
                details: [
                    {
                        quantity: 0,
                        size: '',
                    },
                ],
                image: null,
            },
        ]);
    };

    const handleSubmit = async () => {
        const item = {
            name: product.name,
            desc: product.desc,
            category: category,
            brand: brand,
            price: parseInt(product.price),
        };
        const { data } = await axios.post('/products', item);
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // },
        if (data.success) {
            let i = 0;
            const product = data.data;
            while (i < vars.length) {
                const form = new FormData();
                form.append('product', product);
                form.append('image', vars[i].image ?? '');
                form.append('color', vars[i].color);
                form.append('details', JSON.stringify(vars[i].details));
                const { data } = await axios.post('/variants', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (data.success) {
                    i++;
                }
                if (i === vars.length) {
                    toast.success('Create Product success', {
                        onClose: () => {
                            setTimeout(() => {
                                router.push('/warehouse/manage');
                            }, 3000);
                        },
                    });
                    break;
                }
            }
        }
    };
    const handleDeleteImg = (i: number) => {
        // if (image) {
        //     const newImage = [...image];
        //     newImage.splice(i, 1);
        //     setImage(newImage);
        // }
    };

    const handleChangeCate = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };
    const handleChangeBrand = (event: SelectChangeEvent) => {
        setBrand(event.target.value as string);
    };

    const dispatchGetAllCategory = useCallback(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    const setInitialCategory = useCallback(() => {
        if (categories && categories.length > 0) {
            setCategory(categories[0]._id);
        }
    }, [categories]);

    useEffect(() => {
        dispatchGetAllCategory();
    }, []);

    useEffect(() => {
        setInitialCategory();
    }, [categories]);

    console.log(vars);

    return (
        <div className="flex flex-col gap-[10px]">
            <div className="font-bold">
                <div className="flex items-center cursor-pointer" onClick={() => router.push('/warehouse/manage')}>
                    <ChevronLeftRoundedIcon />
                    <span>Back</span>
                </div>
                <span className="block mt-2 text-center text-lg">Add New Product</span>
            </div>

            <div className="px-10 py-5 bg-white shadow-product flex flex-col gap-5">
                <span className="ml-5 font-bold text-lg">Product Details</span>
                <TextField id="name" label="Name Of Product" variant="outlined" onChange={handleChange} />
                <div className="flex justify-between items-center">
                    <FormControl className="w-[320px]">
                        <InputLabel id="categoryId">Category</InputLabel>
                        <Select
                            labelId="categoryId"
                            id="category"
                            value={category}
                            label="Category"
                            onChange={handleChangeCate}
                            className="font-bold"
                        >
                            {categories &&
                                categories.map((item) => (
                                    <MenuItem key={item._id} value={item._id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                    <FormControl className="w-[320px]">
                        <InputLabel id="brandName">Brand</InputLabel>
                        <Select
                            labelId="brandName"
                            id="brand"
                            value={brand}
                            label="Brand"
                            onChange={handleChangeBrand}
                            className="font-bold"
                        >
                            {brands.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        id="price"
                        label="Price"
                        variant="outlined"
                        className="w-[320px]"
                        type="tel"
                        inputProps={{
                            className: 'text-orange font-bak',
                        }}
                        onChange={handleChange}
                    />
                </div>
                <TextField
                    id="desc"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={10}
                    onChange={handleChange}
                />
            </div>
            <div className="px-10 flex items-center justify-between">
                <span className="font-bold text-lg">Variants Of Product</span>
                <button
                    className="w-[150px] h-10 text-sm font-medium bg-blue bg-opacity-60 text-white rounded-[10px] hover:bg-opacity-100"
                    onClick={addVariant}
                >
                    Add New Variant
                </button>
            </div>
            <div className="flex flex-col gap-5">
                {vars.map((variant, index) => (
                    <AddProduct
                        key={index}
                        value={index}
                        vars={variant}
                        setVars={setVars}
                        setAddVariants={setAddVariants}
                    />
                ))}
            </div>
            <div className="flex gap-[26px] justify-end">
                <button className="w-[200px] h-[50px] bg-red opacity-50 text-white font-bold text-sm">CANCEL</button>
                <button
                    className="w-[200px] h-[50px] bg-blue opacity-50 text-white font-bold text-sm"
                    onClick={handleSubmit}
                >
                    SAVE & ON SALE
                </button>
                <button className="w-[200px] h-[50px] bg-blue opacity-50 text-white font-bold text-sm">
                    SAVE & HIDDEN
                </button>
            </div>
        </div>
    );
};

export default AddNewProduct;
