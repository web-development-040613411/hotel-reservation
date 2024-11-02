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
    check_in: z.coerce.date(),
    check_out: z.coerce.date(),
    type_id: z.string({ message: 'type_id is required' }).uuid(),
});

export const ChangeRoomSchema = z.object({
    check_in: z.coerce.date(),
    check_out: z.coerce.date(),
    type_id: z.string({ message: 'type_id is required' }).uuid(),
    total_price: z.coerce.number({ message: 'Price is required' }).min(1, 'Price is required'),
    reservation_id: z.string({ message: 'Reservation ID is required' }).uuid(),
});

export const PaymentSchema = z.object({
    personalInformation: z.object({
        firstName: z
            .string({ message: 'Name is required' })
            .min(1, 'Name is required'),
        lastName: z
            .string({ message: 'Name is required' })
            .min(1, 'Name is required'),
        address: z
            .string({ message: 'Address is required' })
            .min(1, 'Address is required'),
        phoneNumber: z
            .string({ message: 'Phone number is required' })
            .min(1, 'Phone number is required'),
        email: z
            .string({ message: 'Email is required' })
            .email({ message: 'Email is required' })
            .min(1, 'Email is required'),
        subDistrict: z
            .string({ message: 'Sub district is required' })
            .min(1, 'Sub district is required'),
        district: z
            .string({ message: 'District is required' })
            .min(1, 'District is required'),
        province: z
            .string({ message: 'Province is required' })
            .min(1, 'Province is required'),
        postcode: z
            .string({ message: 'Postal code is required' })
            .length(5, 'Postal code is required'),
        specialRequest: z
            .string({ message: 'Special request is required' })
            .optional(),
    }),
    totalPrice: z
        .number({ message: 'Price is required' })
        .min(1, 'Price is required'),
    reservationId: z.string({ message: 'Reservation ID is required' }).uuid(),
    roomTypeId: z.string({ message: 'Type ID is required' }).uuid(),
});
