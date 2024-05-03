import * as z from 'zod';

const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const isValidDate = (day: number, month: number, year: number): boolean => {
    if (month < 1 || month > 12) {
        return false; // Tháng không hợp lệ
    }

    const maxDays = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return day >= 1 && day <= maxDays[month - 1];
};

export const LoginValidation = z.object({
    email: z.string().nonempty('Field required').email({ message: 'Not email...' }),
    password: z.string().nonempty('Field required').min(6),
});

export const RegisterValidation = z
    .object({
        email: z.string().nonempty('Field required').email({ message: 'Not email...' }),
        fullName: z
            .string()
            .nonempty('Field required')
            .min(3, { message: 'Please fill full name' })
            .refine((value) => !/\d/.test(value), {
                message: 'Full name must not contain numbers',
            }),
        password: z.string().nonempty('Field required').min(6, 'Password must be more than 6'),
        rePassword: z.string().nonempty('Field required'),

        gender: z
            .string()
            .nonempty('Field required')
            .refine((value) => value === 'Male' || value === 'Female', {
                message: 'Gender must be "male" or "female"',
            }),
        birthDay: z
            .string()
            .nonempty('Field required')
            .refine(
                (value) => {
                    // if (!dateRegex.test(value)) {
                    //     return false; // Chuỗi không khớp với định dạng dd/mm/yyyy
                    // }

                    const [day, month, year] = value.split('/').map(Number);
                    return isValidDate(day, month, year);
                },
                {
                    message: 'Invalid birthday format. Format should be dd/mm/yyyy',
                },
            ),
    })
    .refine((data) => data.password === data.rePassword, {
        message: "Password doesn't match",
        path: ['rePassword'],
    });
