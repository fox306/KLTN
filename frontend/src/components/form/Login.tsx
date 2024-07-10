'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginValidation } from '@/lib/validation/user';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { signIn } from '@/slices/authSlice';
import { AppDispatch } from '@/utils/store';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Email from './Email';
import Form1 from './forgot/Form1';
import Form2 from './forgot/Form2';
import Form3 from './forgot/Form3';

const Login = () => {
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState<string>('');

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const form = useForm<z.infer<typeof LoginValidation>>({
        mode: 'onBlur',
        resolver: zodResolver(LoginValidation),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof LoginValidation>) => {
        try {
            const user = {
                email: values.email,
                password: values.password,
            };
            const res = await dispatch(signIn(user));
            console.log(res);
            if ((res.payload as { status: number }).status === 201) {
                toast.success('Login Success');
                router.push('/');
            } else {
                toast.error('Wrong infomation');
            }
        } catch (error: any) {
            // toast.error(error);
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8 w-[380px]">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Email"
                                    {...field}
                                    className=" focus:border-black border-input  focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 "
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    {...field}
                                    className=" border-input focus:border-black focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <span
                    className="font-semibold text-right cursor-pointer hover:opacity-80"
                    onClick={() => setOpen(true)}
                >
                    Forgotten password?
                </span>
                <Button type="submit" className="w-full">
                    Sign In
                </Button>
            </form>
            {open && <Email setEmail={setEmail} setOpen={setOpen} setOpen1={setOpen1} />}
            {open1 && <Form1 email={email} setOpen1={setOpen1} setOpen2={setOpen2} setCode={setCode} />}
            {open2 && <Form2 code={code} email={email} setCode={setCode} setOpen2={setOpen2} setOpen3={setOpen3} />}
            {open3 && <Form3 setOpen3={setOpen3} email={email} />}
        </Form>
    );
};

export default Login;
