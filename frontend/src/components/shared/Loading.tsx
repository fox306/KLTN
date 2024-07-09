import { CircularProgress } from '@mui/material';
import React from 'react';

const Loading = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <CircularProgress color="secondary" size={60} />
        </div>
    );
};

export default Loading;
