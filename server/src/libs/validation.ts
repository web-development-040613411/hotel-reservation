import { z } from 'zod';

export const addRoomTypeSchema = z.object({
    name: z.string({ message: 'Name is required' }).min(1, 'Name is required'),
    detail: z
        .string({ message: 'Detail is require' })
        .min(1, 'Detail is required'),
    capacity: z.coerce
        .number({ message: 'Capacity is required' })
        .min(1, 'Capacity is required'),
    price: z.coerce
        .number({ message: 'Price is required' })
        .min(1, 'Price is required'),
    image: z.instanceof(File).optional(),
});

export const createAndUpdateRoomSchema = z.object({
    number: z
        .string()
        .length(3, { message: 'Room number must have 3 digits.' }),
    type_id: z.string().uuid({ message: 'type_id should be UUID' }),
});

export type AddRoomTypeValues = z.infer<typeof addRoomTypeSchema>;

export const addEmployeeSchema = z
    .object({
        username: z
            .string({ message: 'username is required' })
            .min(1, 'Name is required'),
        first_name: z
            .string({ message: 'firstname is required' })
            .min(1, 'firstname is required'),
        last_name: z
            .string({ message: 'lastname is required' })
            .min(1, 'lastname is required'),
        date_of_birth: z
            .string({ message: 'date of birth is required' })
            .min(1, 'date of birth is required'),
        password: z
            .string({ message: 'password is required' })
            .min(6, 'Password is required'),
        confirm_password: z
            .string({ message: 'confirm password is required' })
            .min(6, 'Password is required'),
        role: z.string({ message: 'role is required' }),
        image: z.instanceof(File, { message: 'Image is required' }),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Password and confirm password doesn't match",
    });

export type AddEmployeeValues = z.infer<typeof addEmployeeSchema>;

export const updateEmployeeSchema = z.object({
    username: z
        .string({ message: 'username is required' })
        .min(1, 'Name is required'),
    first_name: z
        .string({ message: 'firstname is required' })
        .min(1, 'firstname is required'),
    last_name: z
        .string({ message: 'lastname is required' })
        .min(1, 'lastname is required'),
    date_of_birth: z
        .string({ message: 'date of birth is required' })
        .min(1, 'date of birth is required'),
    role: z.string({ message: 'role is required' }),
    image: z.instanceof(File).optional(),
});

export type UpdateEmployeeValues = z.infer<typeof updateEmployeeSchema>;

export const ResetPasswordSchema = z.object({
    password: z
        .string({ message: 'password is required' })
        .min(6, 'Password is required'),
    confirm_password: z
        .string({ message: 'confirm password is required' })
        .min(6, 'Password is required'),
});

export type ResetPasswordValues = z.infer<typeof ResetPasswordSchema>;

export const loginSchema = z.object({
    username: z
        .string({ message: 'Username is required' })
        .min(1, 'Username is required'),
    password: z
        .string({ message: 'Password is required' })
        .min(1, 'Password is required'),
});

export const GetVacantRoomsSchema = z.object({
    check_in: z.string({ message: 'Check in date is required' }).date(),
    check_out: z.string({ message: 'Check out date is required' }).date(),
    room_id: z.string({ message: 'id is required' }).uuid(),
    type_id: z.string({ message: 'type_id is required' }).uuid()
});
