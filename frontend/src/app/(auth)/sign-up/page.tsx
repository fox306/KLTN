'use client';
import Register from '@/components/form/Register';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
    const router = useRouter();
    return (
        <div className="flex h-screen">
            <div className="w-1/2 flex flex-col items-center justify-center">
                <span className="font-semibold text-5xl mb-4">Sign Up!</span>
                <Register />
                <div className="flex gap-1 mt-4">
                    <span>Do you already have an account?</span>
                    <span
                        className="font-semibold cursor-pointer hover:opacity-80"
                        onClick={() => router.push('/sign-in')}
                    >
                        Sign in Now!
                    </span>
                </div>
            </div>
            <div className="w-1/2 relative">
                <Image src="/pic-auth.png" alt="" fill className="p-4" />
            </div>
        </div>
    );
};

export default RegisterPage;
