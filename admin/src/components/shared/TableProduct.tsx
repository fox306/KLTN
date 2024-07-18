import React, { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Image from 'next/image';
import { Product } from '@/types/type';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/utils/convertMoney';

function createData(
    img: string,
    name: string,
    category: string,
    brand: string,
    price: number,
    sold: number,
    status: boolean,
) {
    return { img, name, category, brand, price, sold, status };
}
type Props = {
    products: Product[];
    setOpen: Dispatch<SetStateAction<boolean>>;
    setAction: Dispatch<SetStateAction<string>>;
    setId: Dispatch<SetStateAction<string>>;
    handleSelectedItem: (data: Product) => void;
    handleSelectAll: () => void;
    checkedAll: boolean;
};
const TableProduct = ({
    products,
    setOpen,
    setAction,
    setId,
    handleSelectedItem,
    handleSelectAll,
    checkedAll,
}: Props) => {
    const router = useRouter();

    const handleUpdate = (id: string) => {
        router.push(`/warehouse/${id}`);
    };

    const handleOnSale = (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>, id: string) => {
        e.stopPropagation();
        setOpen(true);
        setAction('On Sale');
        setId(id);
    };
    const handleHidden = (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>, id: string) => {
        e.stopPropagation();
        setOpen(true);
        setAction('Hide');
        setId(id);
    };

    //Checked

    return (
        <div>
            {products.length === 0 ? (
                <div className="flex justify-center items-center">
                    <Image src="/noData.jpg" alt="No Data" width={300} height={300} className="rounded-[5px]" />
                </div>
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead className="mb-[10px]">
                            <TableRow>
                                <TableCell align="left"></TableCell>
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="center">Name of Product</TableCell>
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Brand</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Sold</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products &&
                                products.map((product, i) => (
                                    <TableRow
                                        key={i}
                                        onClick={() => {
                                            handleUpdate(product._id);
                                        }}
                                        className="cursor-pointer hover:opacity-60"
                                    >
                                        <TableCell align="left">
                                            <input
                                                type="checkbox"
                                                className="w-[26px] h-[26px]"
                                                checked={product.selected || false}
                                                onChange={(e) => {
                                                    e.stopPropagation();
                                                    handleSelectedItem(product);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center" className="flex justify-center">
                                            <Image
                                                src={product.image}
                                                alt="Anh"
                                                width={100}
                                                height={100}
                                                className="bg-product rounded-md"
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center" className="w-[360px]">
                                            <span className="truncate block ">{product.name}</span>
                                        </TableCell>
                                        <TableCell align="center">{product.category.name}</TableCell>
                                        <TableCell align="center">{product.brand}</TableCell>
                                        <TableCell align="center" className="text-orange">
                                            {formatCurrency(product.price)}
                                        </TableCell>
                                        <TableCell align="center">{product.sold}</TableCell>
                                        <TableCell
                                            align="center"
                                            className={`${product.status !== 'Active' ? 'text-red' : 'text-green'}`}
                                        >
                                            {product.status !== 'Active' ? 'Hidden' : 'On Sale'}
                                        </TableCell>
                                        <TableCell align="center">
                                            <div className="flex flex-col items-center gap-[10px]">
                                                {product.status !== 'Active' ? (
                                                    <VisibilityOffOutlinedIcon
                                                        onClick={(e) => handleOnSale(e, product._id)}
                                                        className="text-blue cursor-pointer"
                                                    />
                                                ) : (
                                                    <RemoveRedEyeOutlinedIcon
                                                        onClick={(e) => handleHidden(e, product._id)}
                                                        className="text-red cursor-pointer"
                                                    />
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default TableProduct;
