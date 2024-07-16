'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { top } from '@/types/type';

type Props = {
    path: string;
    top: top[];
};
const Top = ({ path, top }: Props) => {
    console.log('HII', top);
    return (
        <div className="w-full shadow-revenue bg-white py-20 pt-10 pb-[35px] flex gap-20 justify-center">
            <div className="flex flex-col items-center">
                <span className="font-bold text-xl">
                    {path === 'user' ? 'TOP 3 USERS OF THE MONTH' : 'TOP 3 BEST SELLING PRODUCTS'}
                </span>
                <div className="flex gap-10">
                    <div className="mt-[90px] flex flex-col items-center gap-[10px]">
                        <Image
                            src={top && top[1].image ? top[1].image : '/user.png'}
                            alt="avt"
                            width={100}
                            height={100}
                            className="w-[100px] h-[100px] rounded-full"
                        />
                        <Image src="/top2.png" alt="top2" width={24} height={40} />
                    </div>
                    <div className="mt-[40px] flex flex-col items-center gap-[10px]">
                        <Image
                            src={top && top[0].image ? top[0].image : '/user.png'}
                            alt="avt"
                            width={100}
                            height={100}
                            className="w-[100px] h-[100px] rounded-full"
                        />
                        <Image src="/top1.png" alt="top2" width={40} height={40} />
                    </div>
                    <div className="mt-[120px] flex flex-col items-center gap-[10px]">
                        <Image
                            src={top && top[2].image ? top[2].image : '/user.png'}
                            alt="avt"
                            width={100}
                            height={100}
                            className="w-[100px] h-[100px] rounded-full"
                        />
                        <Image src="/top3.png" alt="top2" width={32} height={40} />
                    </div>
                </div>
            </div>
            <div></div>
            <div>
                <div className="flex flex-col items-center">
                    <span className="font-bold text-xl">
                        {path === 'user' ? 'TOP 5 USERS OF THE MONTH' : 'TOP 5 BEST SELLING PRODUCTS'}
                    </span>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Top</TableCell>
                                    <TableCell align="center">
                                        {path === 'user' ? 'Fullname' : 'Name Of Product'}
                                    </TableCell>
                                    <TableCell align="center">{path === 'user' ? 'Spent' : 'Sold'}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {top &&
                                    top.map((item, i) => (
                                        <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell align="center" component="th" scope="row">
                                                {i + 1}
                                            </TableCell>
                                            <TableCell align="center">
                                                {item.name === '' ? 'Not Found' : item.name}
                                            </TableCell>
                                            <TableCell align="center">
                                                {path === 'user'
                                                    ? item.spent === 0
                                                        ? 'Not Found'
                                                        : item.spent + '₫'
                                                    : item.sold === 0
                                                    ? 'Not Found'
                                                    : '' + item.sold}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
};

export default Top;
