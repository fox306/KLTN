'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterValidation } from '@/lib/validation/user';
import { useForm } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
import axios from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { sendCode, signUp } from '@/slices/authSlice';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import Form1 from './email/Form1';
import Form2 from './email/Form2';
import * as React from 'react';

type data = {
    data: {
        success: boolean;
        message: string;
    };
};

const unProp = {
    setOpen2: () => {},
    setLoad: () => {},
    setChange: () => {},
    change: false,
    setUpdate: () => {},
};

const Register = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const form = useForm<z.infer<typeof RegisterValidation>>({
        mode: 'onBlur',
        resolver: zodResolver(RegisterValidation),
        defaultValues: {
            email: '',
            fullName: '',
            password: '',
            rePassword: '',
            gender: undefined,
            birthDay: '',
        },
    });
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [regis, setRegis] = useState(false);
    const [code, setCode] = useState<string>('');
    const [email, setEmail] = useState('');

    const onSubmit = async (values: z.infer<typeof RegisterValidation>) => {};

    const handleOpen = async () => {
        const values = form.getValues();
        if (
            !values.email ||
            !values.fullName ||
            !values.password ||
            !values.rePassword ||
            !values.gender ||
            !values.birthDay
        ) {
            return;
        }
        const { data } = await axios.post('/auths/sendOTP', {
            email: values.email,
        });
        if (data.success) {
            setEmail(values.email);
            setCode(data.data);
            setOpen(true);
        }
    };

    useEffect(() => {
        const submitForm = async () => {
            try {
                if (!regis) return;
                const { rePassword, ...items } = form.getValues();
                console.log(items);
                const res = await dispatch(signUp(items));

                if ((res.payload as { status: number }).status === 201) {
                    toast.success('Register Success');
                    router.push('/sign-in');
                } else {
                    toast.error((res.payload as { response: any }).response.data.message);
                }
            } catch (error: any) {
                toast.error(error);
            }
        };

        submitForm();
    }, [regis]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[380px]">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            {/* <FormLabel>Email</FormLabel> */}
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Email"
                                    {...field}
                                    className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-input focus:border-black"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            {/* <FormLabel>Fullname</FormLabel> */}
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Full name"
                                    {...field}
                                    className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-input focus:border-black"
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
                            {/* <FormLabel>Password</FormLabel> */}
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    {...field}
                                    className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-input focus:border-black"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rePassword"
                    render={({ field }) => (
                        <FormItem>
                            {/* <FormLabel>Re-Password</FormLabel> */}
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Re-Password"
                                    {...field}
                                    className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-input focus:border-black"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-around">
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center gap-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value === 'Male'}
                                            onCheckedChange={() => field.onChange('Male')}
                                        />
                                    </FormControl>
                                    <FormLabel>Male</FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center gap-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value === 'Female'}
                                            onCheckedChange={() => field.onChange('Female')}
                                        />
                                    </FormControl>
                                    <FormLabel>Female</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="birthDay"
                    render={({ field }) => (
                        <FormItem>
                            {/* <FormLabel>Birthday</FormLabel> */}
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Birthday"
                                    {...field}
                                    className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-input focus:border-black"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" onClick={handleOpen}>
                    Sign Up
                </Button>
            </form>
            {!regis && open && <Form1 setOpen={setOpen} email={email} setOpen1={setOpen1} {...unProp} />}
            {open1 && (
                <Form2
                    setOpen={setOpen}
                    setOpen1={setOpen1}
                    email={email}
                    code={code}
                    setCode={setCode}
                    setRegis={setRegis}
                    {...unProp}
                />
            )}
        </Form>
    );
};

export default Register;
