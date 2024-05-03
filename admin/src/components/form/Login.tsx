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

const Login = () => {
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
                <Button type="submit" className="w-full">
                    Sign In
                </Button>
            </form>
        </Form>
    );
};

export default Login;
