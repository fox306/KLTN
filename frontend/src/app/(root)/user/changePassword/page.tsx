'use client';
import UserNav from '@/components/shared/UserNav';
import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { User } from '@/types/type';
import axios from '@/utils/axios';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

type Pass = {
    oldPass: string;
    newPass: string;
    rePass: string;
};

const ChangePassword = () => {
    const dispatch = useDispatch<AppDispatch>;

    const [passwords, setPasswords] = useState<Pass>({
        oldPass: '',
        newPass: '',
        rePass: ' ',
    });
    const [show, setShow] = useState<{ [key: string]: boolean }>({
        oldPass: false,
        newPass: false,
        rePass: false,
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswords((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

    let user: User | null = null;

    if (userString !== null) {
        try {
            user = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    const id = user?._id as string;

    const handleCheck = () => {
        if (passwords.newPass !== passwords.rePass) {
            toast.error('Dont Match');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        try {
            const item = {
                user: id,
                oldPass: passwords.oldPass,
                newPass: passwords.newPass,
            };
            const isValid = handleCheck();

            if (!isValid) {
                return;
            }

            const { data } = await axios.patch('/users/update-password', item);
            console.log(data);
            if (data.success) {
                toast.success('Update Password Success');
            }
            // console.log(res);
        } catch (error) {
            toast.error('Wrong Old Password');
        }
    };
    const handleShow = (id: string) => {
        setShow((prevShow) => ({
            ...prevShow,
            [id]: !prevShow[id],
        }));
    };
    return (
        <div className="flex justify-center px-20 mt-10 gap-5">
            <UserNav />

            <div className="flex flex-col items-center w-[1100px] shadow-lg rounded-lg gap-[10px] py-10">
                <span className="font-bold text-base">Change Password</span>
                <span className="font-medium">Your password must be at least 6 characters!!!</span>
                <div className="relative">
                    <TextField
                        label="Current Password"
                        variant="outlined"
                        id="oldPass"
                        type={show['oldPass'] ? 'text' : 'password'}
                        className="mt-[30px] mb-[15px] w-[500px]  "
                        onChange={handleChange}
                    />
                    {show['oldPass'] ? (
                        <RemoveRedEyeRoundedIcon
                            className="absolute top-[45px] right-[15px] cursor-pointer hover:text-blue"
                            onClick={() => handleShow('oldPass')}
                        />
                    ) : (
                        <VisibilityOffRoundedIcon
                            className="absolute top-[45px] right-[15px] cursor-pointer hover:text-blue"
                            onClick={() => handleShow('oldPass')}
                        />
                    )}
                </div>
                <div className="relative">
                    <TextField
                        label="New Password"
                        variant="outlined"
                        id="newPass"
                        type={show['newPass'] ? 'text' : 'password'}
                        className="mb-[13px] w-[500px] "
                        onChange={handleChange}
                    />

                    {show['newPass'] ? (
                        <RemoveRedEyeRoundedIcon
                            className="absolute top-[15px] right-[15px] cursor-pointer hover:text-blue"
                            onClick={() => handleShow('newPass')}
                        />
                    ) : (
                        <VisibilityOffRoundedIcon
                            className="absolute top-[15px] right-[15px] cursor-pointer hover:text-blue"
                            onClick={() => handleShow('newPass')}
                        />
                    )}
                </div>
                <div className="relative">
                    <TextField
                        label="Re-type New Password"
                        variant="outlined"
                        id="rePass"
                        type={show['rePass'] ? 'text' : 'password'}
                        className="mb-[12px] w-[500px] "
                        onChange={handleChange}
                    />
                    {show['rePass'] ? (
                        <RemoveRedEyeRoundedIcon
                            className="absolute top-[15px] right-[15px] cursor-pointer hover:text-blue"
                            onClick={() => handleShow('rePass')}
                        />
                    ) : (
                        <VisibilityOffRoundedIcon
                            className="absolute top-[15px] right-[15px] cursor-pointer hover:text-blue"
                            onClick={() => handleShow('rePass')}
                        />
                    )}
                </div>

                <div
                    className="w-[500px] h-11 bg-blue bg-opacity-20 text-blue rounded-full flex items-center justify-center gap-2 font-medium text-xl hover:bg-opacity-100 hover:text-white cursor-pointer"
                    onClick={handleSubmit}
                >
                    <CloudUploadOutlinedIcon />
                    <span>Save</span>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
