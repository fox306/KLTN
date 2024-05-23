'use client';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FemaleRoundedIcon from '@mui/icons-material/FemaleRounded';
import MaleRoundedIcon from '@mui/icons-material/MaleRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { getAllUser } from '@/slices/userSlice';
import { useSelector } from 'react-redux';
import { User } from '@/types/type';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/navigation';
import TypeSure from '@/components/shared/TypeSure';

const UserManage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users }: { users: User[] } = useSelector((state: any) => state.users);
    const [page, setPage] = useState<string>('Management');

    const router = useRouter();

    const handleChange = (event: SelectChangeEvent) => {
        setPage(event.target.value as string);
        router.push('/users');
    };

    //Lock and Delete
    const [open, setOpen] = useState<boolean>(false);
    const [action, setAction] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [load, setLoad] = useState<boolean>(false);

    const handleLock = (id: string) => {
        setOpen(true);
        setAction('Lock');
        setId(id);
    };

    const handleUnLock = (id: string) => {
        setOpen(true);
        setAction('UnLock');
        setId(id);
    };
    const handleDelete = (id: string) => {
        setOpen(true);
        setAction('Delete');
        setId(id);
    };

    //Check
    const [checkedAll, setCheckedAll] = useState(false);

    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

    const handleCheckedAll = async () => {
        setCheckedAll((prev) => !prev);

        if (!checkedAll) {
            const updatedCheckedItems: { [key: string]: boolean } = {};
            for (const item of users) {
                updatedCheckedItems[item._id] = true;
            }
            localStorage.setItem('tickUser', JSON.stringify(users));
            setCheckedItems(updatedCheckedItems);
        } else {
            const updatedCheckedItems: { [key: string]: boolean } = {};
            for (const item of users) {
                updatedCheckedItems[item._id] = false;
            }
            localStorage.setItem('tickUser', '');
            setCheckedItems(updatedCheckedItems);
        }
    };

    const handleChecked = (userId: string) => {
        setCheckedItems((prevState) => {
            const newState = {
                ...prevState,
                [userId]: !prevState[userId],
            };

            if (newState[userId]) {
                const storedItems = localStorage.getItem('tickUser');
                let storedItemsArray: User[] = [];

                if (storedItems) {
                    storedItemsArray = JSON.parse(storedItems);
                }

                const selectedItem = users.find((item) => item._id === userId);

                if (selectedItem) {
                    storedItemsArray = storedItemsArray.filter((item) => item._id !== userId);
                    storedItemsArray.push(selectedItem);
                    localStorage.setItem('tickUser', JSON.stringify(storedItemsArray));
                }
            } else {
                const storedItems = localStorage.getItem('tickUser');
                let storedItemsArray: User[] = [];

                if (storedItems) {
                    storedItemsArray = JSON.parse(storedItems);
                    storedItemsArray = storedItemsArray.filter((item) => item._id !== userId);
                    localStorage.setItem('tickUser', JSON.stringify(storedItemsArray));
                }
            }
            return newState;
        });
    };

    useEffect(() => {
        let allChecked = false;
        if (Object.keys(checkedItems).length !== 0) {
            allChecked = Object.values(checkedItems).every((value) => value === true);
        }
        setCheckedAll(allChecked);
    }, [checkedItems]);

    useEffect(() => {
        const initialCheckedItems = (users ?? []).reduce((acc, item) => {
            acc[item._id] = false;
            return acc;
        }, {} as { [key: string]: boolean });
        setCheckedItems(initialCheckedItems);
    }, [users]);

    useEffect(() => {
        dispatch(getAllUser());
        localStorage.setItem('tickUser', '');
    }, [dispatch, load]);
    console.log(users);
    return (
        <div className="flex flex-col gap-[10px]">
            <FormControl className="w-[150px]">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={page}
                    label="Page"
                    onChange={handleChange}
                    variant="standard"
                    className="font-bold text-lg"
                >
                    <MenuItem value="Statistical">Statistical</MenuItem>
                    <MenuItem value="Management">Management</MenuItem>
                </Select>
            </FormControl>
            <div className="flex gap-5 items-center ml-[15px]">
                <input
                    type="checkbox"
                    checked={checkedAll}
                    onChange={handleCheckedAll}
                    className="w-[26px] h-[26px] border-[#D9D9D9] cursor-pointer"
                />
                <button className="h-[40px] w-[100px] font-medium text-sm bg-blue bg-opacity-60 text-white rounded-lg">
                    Select All
                </button>
                <button className="h-[40px] w-[110px] font-medium text-sm bg-blue bg-opacity-60 text-white  rounded-lg">
                    Delete All
                </button>
                <button className="h-[40px] w-[150px] font-medium text-sm bg-blue bg-opacity-60 text-white  rounded-lg">
                    Delete Selected
                </button>
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead className="mb-[10px]">
                            <TableRow>
                                <TableCell align="left">
                                    <input
                                        type="checkbox"
                                        className="w-[26px] h-[26px] cursor-pointer"
                                        checked={checkedAll}
                                        onChange={handleCheckedAll}
                                    />
                                </TableCell>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">Full Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Gender</TableCell>
                                <TableCell align="center">Spent</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell align="left">
                                        <input
                                            type="checkbox"
                                            className="w-[26px] h-[26px] cursor-pointer"
                                            checked={checkedAll ? checkedAll : checkedItems[item._id]}
                                            onChange={() => handleChecked(item._id)}
                                        />
                                    </TableCell>
                                    <TableCell align="center">{i + 1}</TableCell>
                                    <TableCell align="center">{item.fullName}</TableCell>
                                    <TableCell align="center">{item.email}</TableCell>
                                    <TableCell
                                        className={`${item.gender === 'Male' ? 'text-blue' : 'text-pink'}`}
                                        align="center"
                                    >
                                        {item.gender === 'Male' ? <MaleRoundedIcon /> : <FemaleRoundedIcon />}
                                    </TableCell>
                                    <TableCell align="center">${item.spent}</TableCell>
                                    <TableCell align="center">{item.role}</TableCell>
                                    <TableCell
                                        align="center"
                                        className={`${item.status !== 'Available' ? 'text-red' : 'text-green'}`}
                                    >
                                        {item.status !== 'Available' ? (
                                            <LockRoundedIcon
                                                onClick={() => handleUnLock(item._id)}
                                                className="cursor-pointer hover:text-green"
                                            />
                                        ) : (
                                            <LockOpenRoundedIcon
                                                onClick={() => handleLock(item._id)}
                                                className="cursor-pointer hover:text-red"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <CloseRoundedIcon
                                            onClick={() => handleDelete(item._id)}
                                            className="text-red cursor-pointer hover:opacity-60"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {open && (
                <TypeSure
                    setOpen={setOpen}
                    setAction={setAction}
                    action={action}
                    setId={setId}
                    id={id}
                    setLoad={setLoad}
                />
            )}
        </div>
    );
};

export default UserManage;
