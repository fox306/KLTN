import React, { Dispatch, SetStateAction } from 'react';
import TextField from '@mui/material/TextField';

type Props = {
    setEmail: Dispatch<SetStateAction<string>>;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setOpen2: Dispatch<SetStateAction<boolean>>;
    setChange: Dispatch<SetStateAction<boolean>>;
};

const Form3 = ({ setEmail, setOpen, setOpen2, setChange }: Props) => {
    const handleNext = () => {
        setOpen(true);
        setOpen2(false);
        setChange(true);
    };
    return (
        <div className="modal">
            <div className="p-10 flex flex-col items-center rounded-md shadow-lg bg-white">
                <span className="font-bold text-xl">Get New Email</span>
                <TextField
                    label="New Email"
                    fullWidth
                    variant="outlined"
                    className="mt-[33px] mb-[21px]"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="mt-5 flex gap-5 font-medium text-xl">
                    <button
                        className="w-[160px] h-[60px] rounded-full bg-red bg-opacity-20 text-red"
                        onClick={() => setOpen2(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="w-[160px] h-[60px] rounded-full bg-blue bg-opacity-20 text-blue"
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Form3;
