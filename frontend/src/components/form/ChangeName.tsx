import React from 'react';
import TextField from '@mui/material/TextField';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const ChangeName = () => {
    return (
        <div>
            <div className="flex flex-col py-10 px-[60px] rounded-md shadow-lg ">
                <div className="flex justify-between mb-[34px] font-bold text-xl">
                    <span>Update full name</span>
                    <ClearOutlinedIcon className="text-red opacity-70" />
                </div>

                <TextField label="New Full Name" variant="outlined" className="mb-[25px]" />

                <TextField label="Current Password" variant="outlined" type="password" className="mb-5" />

                <div className=" flex gap-5 font-medium text-xl">
                    <button className="w-[190px] h-[60px] rounded-full bg-red bg-opacity-20 text-red">Canncel</button>
                    <button className="w-[190px] h-[60px] rounded-full bg-blue bg-opacity-20 text-blue flex items-center gap-2 justify-center">
                        <CloudUploadOutlinedIcon />
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangeName;
