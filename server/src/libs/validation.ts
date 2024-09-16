import { z } from "zod";

export const addRoomTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  detail: z.string().min(1, "Detail is required"),
  capacity: z.string().min(1, "Capacity is required").refine((data) => parseFloat(data)),
  price: z.string().min(1, "Price is required").refine((data) => parseFloat(data)),
  image: z.instanceof(File)
})

export type AddRoomTypeValues = z.infer<typeof addRoomTypeSchema>;