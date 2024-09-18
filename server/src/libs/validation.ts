import { z } from "zod";

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

export const createRoomSchema = z.object({
  number : z.string().length(3, { message : "Room number must have 3 digits."}),
  type_id : z.string().uuid({message : "type_id should be UUID"})
})

export type AddRoomTypeValues = z.infer<typeof addRoomTypeSchema>;
