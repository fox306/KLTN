'use client';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
    return (
        <div className="py-5 px-10">
            <div className="border-b-2 text-blue opacity-80 mt-20"></div>
            <div className="py-20 px-48 flex justify-between">
                <div>
                    <span className="font-bold text-2xl text-[#223263]">Founder contact information</span>
                    <div
                        className="flex items-center gap-5 mt-5 cursor-pointer"
                        onClick={() => window.open('https://www.facebook.com/000000000000000000dz/')}
                    >
                        <Image src="/facebook.png" alt="Facebook" width={40} height={40} />
                        <span className="text-2xl text-gray font-bold">Facebook</span>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-5">
                    <span className="font-bold text-2xl text-[#223263]">Payment</span>
                    <div>
                        <Image src="/paypal.png" alt="Paypal" width={180} height={60} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
