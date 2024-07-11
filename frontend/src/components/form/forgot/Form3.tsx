import * as z from 'zod';

import React, { Dispatch, SetStateAction } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { ForgotPass } from '@/lib/validation/user';
import { Button } from '@/components/ui/button';
import axios from '@/utils/axios';
import { toast } from 'react-toastify';

type Props = {
    setOpen3: Dispatch<SetStateAction<boolean>>;
    email: string;
};

const Form3 = ({ setOpen3, email }: Props) => {
    const form = useForm<z.infer<typeof ForgotPass>>({
        mode: 'onBlur',
        resolver: zodResolver(ForgotPass),
        defaultValues: {
            password: '',
            rePassword: '',
        },
    });
    const handleCancel = () => {
        setOpen3(false);
    };
    const onSubmit = async (values: z.infer<typeof ForgotPass>) => {
        try {
            const value = {
                password: values.password,
                repassword: values.rePassword,
            };
            const { data } = await axios.patch(`/users/forgot-password`, {
                email: email,
                newPassword: value.password,
            });
            if (data.success) {
                toast.success('Recovery Success');
                setOpen3(false);
            }
        } catch (error: any) {
            toast.error('Recovery Fail');
            setOpen3(false);
        }
    };
    return (
        <div className="modal">
            <div className="p-10 flex flex-col items-center rounded-md shadow-lg bg-white">
                <span className="font-bold text-xl">Get New Password</span>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[380px]">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="New-Password"
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
                        <div className="flex gap-2">
                            <Button type="button" className="w-full" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button type="submit" className="w-full">
                                Recovery Password
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Form3;
