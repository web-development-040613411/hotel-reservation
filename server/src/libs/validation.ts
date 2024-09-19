import { date, z } from "zod";

export const addRoomTypeSchema = z.object({
  name: z.string({ message: "Name is require" }).min(1, "Name is required"),
  detail: z
    .string({ message: "Detail is require" })
    .min(1, "Detail is required"),
  capacity: z.coerce
    .number({ message: "Capacity is required" })
    .min(1, "Capacity is required"),
  price: z.coerce
    .number({ message: "Price is required" })
    .min(1, "Price is required"),
  image: z.instanceof(File).optional(),
});

export type AddRoomTypeValues = z.infer<typeof addRoomTypeSchema>;

export const addEmployeeSchema = z.object({
  username: z.string({ message: "username is require" }).min(1, "Name is required"),
  first_name: z.string({ message: "firstname is require" }).min(1, "firstname is required"),
  last_name: z.string({ message: "lastname is require" }).min(1, "lastname is required"),
  date_of_birth: z.string({ message: "date of birth is require" }).min(1, "date of birth is required"),
  password: z.string({ message: "password is require" }).min(6, "Password is required"),
  confirm_password: z.string({ message: "confirm password is require" }).min(6, "Password is required"),
  role: z.string({ message: "role is require" }),
  image: z.instanceof(File)
});

export type AddEmployeeValues = z.infer<typeof addEmployeeSchema>;

export const updateEmployeeSchema = z.object({
  username: z.string({ message: "username is require" }).min(1, "Name is required"),
  first_name: z.string({ message: "firstname is require" }).min(1, "firstname is required"),
  last_name: z.string({ message: "lastname is require" }).min(1, "lastname is required"),
  date_of_birth: z.string({ message: "date of birth is require" }).min(1, "date of birth is required"),
  role: z.string({ message: "role is require" }),
  image: z.instanceof(File).optional()
});

export type UpdateEmployeeValues = z.infer<typeof updateEmployeeSchema>;

export const ResetPasswordSchema = z.object({
  password: z.string({ message: "password is require" }).min(6, "Password is required"),
  confirm_password: z.string({ message: "confirm password is require" }).min(6, "Password is required"),
});

export type ResetPasswordValues = z.infer<typeof ResetPasswordSchema>;
