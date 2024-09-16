import { date, z } from "zod";

export const addRoomTypeSchema = z.object({
  name: z.string({ message: "name is require" }).min(1, "Name is required"),
  detail: z
    .string({ message: "detail is require" })
    .min(1, "Detail is required"),
  capacity: z
    .string({ message: "capacity is require" })
    .min(1, "Capacity is required")
    .transform((data) => parseFloat(data)),
  price: z
    .string({ message: "price is require" })
    .min(1, "Price is required")
    .transform((data) => parseFloat(data)),
  image: z.instanceof(File),
});

export type AddRoomTypeValues = z.infer<typeof addRoomTypeSchema>;

export const employeeSchema = z.object({
  user_name: z.string({ message: "username is require" }).min(1, "Name is required"),
  firstname: z.string({ message: "firstname is require" }).min(1, "firstname is required"),
  lastname: z.string({ message: "lastname is require" }).min(1, "lastname is required"),
  date_of_birth: z.string({ message: "date of birth is require" }).min(1, "date of birth is required"),
  password: z.string({ message: "password is require" }).min(6, "Password is required"),
  role: z.string({ message: "role is require" })
});

export type EmployeeValues = z.infer<typeof employeeSchema>;

//dateformat : YYYY-MM-DD
