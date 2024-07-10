'use client';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ForgotValidation } from '@/lib/validation/user';
import { Button } from '../ui/button';
import axios from '@/utils/axios';
import Form1 from './forgot/Form1';

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>;
    setOpen1: Dispatch<SetStateAction<boolean>>;
    setEmail: Dispatch<SetStateAction<string>>;
};

const Email = ({ setOpen, setOpen1, setEmail }: Props) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof ForgotValidation>>({
        mode: 'onBlur',
        resolver: zodResolver(ForgotValidation),
        defaultValues: {
            email: '',
        },
    });
    const onSubmit = async (values: z.infer<typeof ForgotValidation>) => {
        try {
            const { data } = await axios.get(`/users/find/by-email?email=${values.email}`);
            if (data.success) {
                setEmail(values.email);
                setOpen1(true);
                setOpen(false);
                toast.success('Send code success');
            } else {
                toast.error('User not exist');
            }
        } catch (error: any) {
            toast.error('User not exist');
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div className="modal">
            <div className="p-10 flex flex-col items-center rounded-md shadow-lg bg-white">
                <span className="font-bold text-xl">Forgot Password</span>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[380px]">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
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
                        <div className="flex gap-2">
                            <Button type="submit" className="w-full">
                                Get Code
                            </Button>
                            <Button type="button" className="w-full" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Email;
