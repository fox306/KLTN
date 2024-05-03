'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';

const theme = createTheme({
    palette: {
        primary: {
            main: '#40BFFF',
        },
    },
});

type Props = {
    setPageNum: Dispatch<SetStateAction<number>>;
    pages: number;
};

const Pagetination = ({ setPageNum, pages }: Props) => {
    const handleChangePage = (i: number) => {
        setPageNum(i);
    };
    return (
        <div className="flex justify-center shadow-product2 bg-white mt-5">
            <ThemeProvider theme={theme}>
                <Pagination
                    count={pages}
                    shape="rounded"
                    onChange={(_, page: number) => handleChangePage(page)}
                    color="primary"
                />
            </ThemeProvider>
        </div>
    );
};

export default Pagetination;
