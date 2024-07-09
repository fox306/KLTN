'use client';

import UserNav from '@/components/shared/UserNav';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import Image from 'next/image';
import React, { ChangeEvent, use, useEffect, useRef, useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ChangeName from '@/components/form/ChangeName';
import Form1 from '@/components/form/email/Form1';
import Form2 from '@/components/form/email/Form2';
import Form3 from '@/components/form/email/Form3';
import { User } from '@/types/type';
import axios from '@/utils/axios';
import { toast } from 'react-toastify';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { getUser, updateUser } from '@/slices/userSlice';
import { DateValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers';
import Border from '@/components/shared/Border';

const unProp = {
    setRegis: () => {},
};

const Profile = () => {
    const [load, setLoad] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [code, setCode] = useState<string>('');
    const [change, setChange] = useState(false);
    const [update, setUpdate] = useState(false);
    const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const dispatch = useDispatch<AppDispatch>();
    const { loading, user }: { user: User; loading: boolean } = useSelector((state: any) => state.users);

    let userlocal: User | null = null;

    if (userString !== null) {
        try {
            userlocal = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    const id = userlocal?._id as string;
    const [email, setEmail] = useState<string>('');
    const [image, setImage] = useState<File>();
    const [imageUrl, setImageUrl] = useState<File>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleToggleInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files;
        if (file) {
            setImage(file[0]);
            setImageUrl(file[0]);
        }
    };
    const [selectedGender, setSelectedGender] = useState(user?.gender);
    const [selectedDate, setSelectedDate] = useState<Dayjs>();
    const [items, setItems] = useState<{
        fullName: string;
        phone: string;
    }>({
        fullName: '',
        phone: '',
    });

    const handleUpload = async () => {
        const formData = new FormData();
        image && formData.append('file', image);
        formData.append('user', id);

        const { data } = await axios.patch('/users/upload-avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(data);
        if (data.success) {
            toast.success('Update avatar Success');
            setLoad((prev) => !prev);
        } else {
            toast.error('Update avatar fail');
        }
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setItems((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };
    const handleDateChange = (value: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>) => {
        setSelectedDate(value || undefined);
    };
    const handleSumbit = async () => {
        const item = {
            user: id,
            fullName: items.fullName,
            phone: items.phone,
            gender: selectedGender,
            birthDay: selectedDate?.format('YYYY-MM-DD') ?? '',
        };
        // const { data } = await axios.put('/users', item);
        const res = await dispatch(updateUser(item));
        if ((res.payload as { status: number }).status === 200) {
            toast.success('Update profile success');
            setLoad((prev) => !prev);
        } else {
            toast.error('Update profile fail');
        }
    };
    const handleChangeEmail = async () => {
        const { data } = await axios.post('/auths/sendOTP', {
            email: email,
        });
        if (data.success) {
            setCode(data.code);
            setOpen(true);
        }
    };
    useEffect(() => {
        dispatch(getUser(id));
    }, [dispatch, load]);
    useEffect(() => {
        if (change) {
            const postCode = async () => {
                const { data } = await axios.post('/auth/sendCode', {
                    email: email,
                });
                if (data.success) {
                    setCode(data.code);
                }
            };
            postCode();
        }
    }, [change]);

    useEffect(() => {
        if (update) {
            const updateEmail = async () => {
                const { data } = await axios.patch('/users/email', {
                    user: id,
                    newEmail: email,
                });

                if (data.success) {
                    toast.success('Update email success');
                    setLoad((prev) => !prev);
                } else {
                    toast.error('Update email fail');
                }
            };
            updateEmail();
        }
    }, [update]);

    useEffect(() => {
        setEmail(user.email);
        setItems({
            fullName: user.fullName,
            phone: user.phone,
        });
        setSelectedGender(user.gender);
        if (user.avatar) {
            const file = new File([], user.avatar);
            setImage(file);
        } else {
            setImage(undefined);
        }
        if (user.birthDay) {
            const birthDay = dayjs(user.birthDay, 'YYYY-MM-DD');
            setSelectedDate(birthDay);
        } else {
            setSelectedDate(undefined);
        }
    }, [loading, dispatch, user]);
    return (
        <div>
            {!loading ? (
                <div className="flex justify-center px-20 mt-10 gap-5">
                    <UserNav />
                    <div className="shadow-lg py-[40px] pl-[90px] pr-[120px] flex rounded-lg items-center w-[1100px]">
                        <div className="flex flex-col items-center gap-5 mr-[100px]">
                            <div className="w-[140px] h-[140px] relative">
                                {imageUrl !== undefined ? (
                                    <Image
                                        src={URL.createObjectURL(imageUrl)}
                                        alt="Avt"
                                        fill
                                        className="rounded-full"
                                    />
                                ) : (
                                    <Image src={image?.name ?? ''} alt="Avt" fill className="rounded-full" />
                                )}
                            </div>
                            <div
                                className="w-40 h-10 rounded-lg bg-blue bg-opacity-20 text-blue flex items-center justify-center gap-2 cursor-pointer hover:bg-opacity-100 hover:text-white"
                                onClick={handleToggleInput}
                            >
                                <InsertPhotoOutlinedIcon />
                                <span className="font-medium text-sm">Upload Avatar</span>
                            </div>
                            <div
                                className="w-40 h-10 rounded-lg bg-blue bg-opacity-20 text-blue flex items-center justify-center gap-2 cursor-pointer hover:bg-opacity-100 hover:text-white"
                                onClick={handleUpload}
                            >
                                <CloudUploadOutlinedIcon />
                                <span className="font-medium text-sm">Save Avatar</span>
                            </div>
                            <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} multiple />
                        </div>
                        <div className="h-full w-[1px] border border-blue">{/* <Border /> */}</div>
                        <div className="w-full flex flex-col gap-[50px] ml-[100px] font-medium ">
                            <div className="flex items-center gap-[50px]">
                                <span className="block w-[110px]">Full name</span>

                                <TextField
                                    className="w-full"
                                    id="fullName"
                                    variant="standard"
                                    onChange={handleChange}
                                    defaultValue={items.fullName}
                                    inputProps={{
                                        className: 'font-semibold',
                                    }}
                                />
                            </div>
                            <div className="flex items-center gap-[50px]">
                                <span className="block w-[82px]">Email</span>
                                <span className="font-semibold">{user?.email}</span>
                                <div className="flex-grow"></div>
                                <EditOutlinedIcon className="cursor-pointer" onClick={handleChangeEmail} />
                            </div>
                            <div className="flex items-center gap-[50px]">
                                <span className="block w-[110px]">Phone</span>
                                <TextField
                                    className="w-full"
                                    id="phone"
                                    variant="standard"
                                    onChange={handleChange}
                                    defaultValue={items.phone}
                                    inputProps={{
                                        className: 'font-semibold',
                                    }}
                                />
                            </div>
                            <div className="flex items-center gap-[50px]">
                                <span className="block w-[80px]">Gender</span>
                                <div className="flex gap-[58px]">
                                    <div className="flex items-center gap-[6px]">
                                        <input
                                            type="radio"
                                            name="gender"
                                            id="Male"
                                            value="Male"
                                            onChange={(e) => setSelectedGender(e.target.value)}
                                            checked={selectedGender === 'Male'}
                                            className="checked:bg-blue"
                                        />
                                        <label htmlFor="male">Male</label>
                                    </div>
                                    <div className="flex items-center gap-[6px]">
                                        <input
                                            type="radio"
                                            name="gender"
                                            id="Female"
                                            value="Female"
                                            onChange={(e) => setSelectedGender(e.target.value)}
                                            checked={selectedGender === 'Female'}
                                            className="checked:bg-blue checked:text-blue"
                                        />
                                        <label htmlFor="female">Female</label>
                                    </div>
                                    <div className="flex items-center gap-[6px]">
                                        <input
                                            type="radio"
                                            name="gender"
                                            id="Other"
                                            value="Other"
                                            onChange={(e) => setSelectedGender(e.target.value)}
                                            checked={selectedGender === 'Other'}
                                            className="checked:bg-blue"
                                        />
                                        <label htmlFor="female">Other</label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-[50px]">
                                <span className="block w-[82px]">BirthDay</span>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        defaultValue={dayjs(userlocal?.birthDay, 'YYYY-MM-DD')}
                                        onChange={handleDateChange}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className="flex justify-center">
                                <div
                                    className="w-[200px] h-11 bg-blue bg-opacity-20 text-blue rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-opacity-100 hover:text-white"
                                    onClick={handleSumbit}
                                >
                                    <CloudUploadOutlinedIcon />
                                    <span>Save</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <ChangeName /> */}
                    {open && (
                        <Form1
                            setOpen={setOpen}
                            email={email}
                            setOpen1={setOpen1}
                            setLoad={setLoad}
                            setChange={setChange}
                        />
                    )}
                    {open1 && (
                        <Form2
                            code={code}
                            email={email}
                            setCode={setCode}
                            setOpen={setOpen}
                            setOpen1={setOpen1}
                            setOpen2={setOpen2}
                            change={change}
                            setChange={setChange}
                            setUpdate={setUpdate}
                            {...unProp}
                        />
                    )}
                    {open2 && <Form3 setEmail={setEmail} setOpen={setOpen} setOpen2={setOpen2} setChange={setChange} />}
                </div>
            ) : (
                <span>Wating</span>
            )}
        </div>
    );
};

export default Profile;
