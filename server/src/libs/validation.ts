import { z } from "zod";

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
