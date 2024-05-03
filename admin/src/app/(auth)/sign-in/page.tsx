'use client';

import Login from '@/components/form/Login';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
    return (
        <div className="flex h-screen">
            <div className="w-1/2 flex flex-col items-center justify-center">
                <span className="font-semibold text-5xl mb-4">Welome Back!</span>
                <Login />
            </div>
            <div className="w-1/2 relative">
                <Image src="/pic-auth.png" alt="" fill className="p-4" />
            </div>
        </div>
    );
};

export default LoginPage;
