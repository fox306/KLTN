'use client';
import Image from 'next/image';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import TextField from '@mui/material/TextField';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import axios from '@/utils/axios';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Category, CreateVariant, Product, UpdateVariant } from '@/types/type';
import { getAllCategory } from '@/slices/categorySlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { toast } from 'react-toastify';
import { getProductById } from '@/slices/productSlice';
import { getDetailByProduct } from '@/slices/variantSlice';
import SureForImg from '@/components/shared/SureForImg';
import UpdateProdcut from '@/components/form/UpdateProduct';
const brands = ['Adidas', 'Nike', 'Vans', 'Balenciaga', 'Converse', 'Puma'];
const prefixCloudinary = "http://res.cloudinary.com/dtfei3453/image/upload";

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
    const { productDetail, variants }: { productDetail: Product; variants: UpdateVariant[] } = useSelector(
        (state: any) => state.products,
    );
    const [brand, setBrand] = useState<string>('Adidas');
    const [category, setCategory] = useState<string>('');
    const { id }: { id: string } = useParams();
    const [product, setProduct] = useState<{
        name: string;
        price: string;
        desc: string;
    }>({
        name: '',
        price: '',
        desc: '',
    });
    const [mount, setMount] = useState(false);
    const [load, setLoad] = useState(false);
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProduct((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };
    const addVariant = () => {
        setAddVariants((prevVariants) => [...prevVariants, {}]);
    };

    const [variant, setVariant] = useState<string>('');

    const handleChangeCate = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };
    const handleChangeBrand = (event: SelectChangeEvent) => {
        setBrand(event.target.value as string);
    };

    const dispatchGetAllCategory = useCallback(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    const handleSubmit = async () => {
        const item = {
            product: id,
            name: product.name,
            desc: product.desc,
            category: category,
            brand: brand,
            price: parseInt(product.price),
        };
        console.log(item);
        // let data
        const { data } = await axios.put('/products', item);
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // },
        if (data.success) {
            let i = 0;
            while (i < vars.length) {
                const form = new FormData();
                form.append('product', id);
                console.log("vars[i].image: ", vars[i].image);

                if (!vars[i].image?.name.startsWith(prefixCloudinary)) form.append('image', vars[i].image ?? '');
                // form.append('image', vars[i].image ?? '');
                form.append('color', vars[i].color);
                form.append('details', JSON.stringify(vars[i].details));
                const { data } = await axios.put('/variants', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (data.success) {
                    i++;
                }
                if (i === vars.length) {
                    toast.success('Update Product success');
                    setLoad((prev) => !prev);
                    setMount(false);
                    break;
                }
            }
        }
    };

    // toast.success('Update Product success');
    // setLoad((prev) => !prev);
    // setMount(false);
    useEffect(() => {
        dispatchGetAllCategory();
        dispatch(getProductById(id)).then(() => {
            setMount(true);
        });
    }, [id, load]);

    useEffect(() => {
        if (mount) {
            setProduct({
                name: productDetail.name,
                price: productDetail.price.toString(),
                desc: productDetail.desc,
            });
            setBrand(productDetail.brand);
            setCategory(productDetail.category._id);

            const newVars = variants.map((item, index) => {
                const img = new File([item.image], item.image);
                return {
                    color: item.color,
                    image: img,
                    details: item.details,
                };
            });
            setVars(newVars);
            setAddVariants(Array.from({ length: newVars.length }, () => ({})));
        }
    }, [mount]);
    console.log(vars);
    return (
        <div className="flex flex-col gap-[10px]">
            <div className="font-bold">
                <div
                    className="flex items-center cursor-pointer hover:opacity-60"
                    onClick={() => router.push('/warehouse/manage')}
                >
                    <ChevronLeftRoundedIcon />
                    <span>Back</span>
                </div>
                <span className="block mt-2 text-center text-lg">Update Product</span>
            </div>

            <div className="px-10 py-5 bg-white shadow-product flex flex-col gap-5">
                <span className="ml-5 font-bold text-lg">Product Details</span>
                <TextField
                    id="name"
                    label="Name Of Product"
                    variant="outlined"
                    value={product.name}
                    onChange={handleChange}
                />
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
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>
                <TextField
                    id="desc"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={10}
                    value={product.desc}
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
                {addVariants.map((variant, index) => (
                    <UpdateProdcut
                        key={index}
                        value={index}
                        setAddVariants={setAddVariants}
                        setVars={setVars}
                        vars={vars}
                    />
                ))}
            </div>
            <div className="flex gap-[26px] justify-end">
                <button
                    className="w-[200px] h-[50px] bg-red opacity-50 text-white font-bold text-sm hover:opacity-100"
                    onClick={() => router.push('/warehouse/manage')}
                >
                    CANCEL
                </button>
                <button
                    className="w-[200px] h-[50px] bg-blue opacity-50 text-white font-bold text-sm hover:opacity-100"
                    onClick={handleSubmit}
                >
                    Update Info Product
                </button>
            </div>
        </div>
    );
};

export default AddNewProduct;
