'use client';
import React, { Dispatch, SetStateAction } from 'react';

const colors: { [key: string]: string } = {
    Red: 'bg-[#FC3E39]',
    Blue: 'bg-[#0000FF]',
    Gray: 'bg-[#808080]',
    Cyan: 'bg-[#00FFFF]',
    Pink: 'bg-[#FFC0CB]',
    Green: 'bg-[#00FF00]',
    Black: 'bg-[#171717]',
    White: 'bg-[#FFFFFF]',
    Brown: 'bg-[#A52A2A]',
    Purple: 'bg-[#800080]',
    Yellow: 'bg-[#FFFF00]',
    Orange: 'bg-[#FFA500]',
    Silver: 'bg-[#C0C0C0]',
};
type Props = {
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
};
const Color = ({ color, setColor }: Props) => {
    console.log(color);
    return (
        <div className="p-5 bg-deal rounded-lg">
            <span className="font-bold text-base">Color</span>
            <div className="grid grid-cols-6 gap-5 mt-5">
                {Object.keys(colors).map((c, index) => (
                    <div
                        key={index}
                        onClick={() => setColor(c)}
                        className={`w-5 h-5 relative rounded-full cursor-pointer ${colors[c]}`}
                    >
                        <div
                            className={`absolute inset-[-4px] p-3 rounded-full border-2 ${
                                c === color ? 'border-blue' : ''
                            }`}
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Color;
