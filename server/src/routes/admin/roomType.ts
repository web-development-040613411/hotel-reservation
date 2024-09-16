import { sql } from "@/libs/db";
import { uploadFile } from "@/libs/uploadFile";
import { addRoomTypeSchema } from "@/libs/validation";
import Elysia from "elysia";
import { ZodError } from "zod";

export const roomTypeRoutes = new Elysia({ prefix: "/room-type" }).post(
  "/",
  async ({ body, set }) => {
    try {
      const data = addRoomTypeSchema.parse(body);
      const { name, detail, capacity, price, image } = data;

      const [roomType] = await sql`SELECT * FROM room_type WHERE name=${name}`;

      if (roomType) {
        set.status = 400;
        return {
          status: "error",
          message: "Room type already exists",
        };
      }

      const url = await uploadFile(image);

      if (!url) {
        set.status = 500;
        return {
          status: "error",
          message: "Internal server error, please try again later",
        };
      }

      await sql`
          INSERT INTO room_type (name, detail, capacity, price, picture_path)
          VALUES (${name}, ${detail}, ${capacity}, ${price}, ${url})
        `;

      return {
        status: "success",
        message: "Room type added successfully",
      };
    } catch (error) {
      if (error instanceof ZodError) {
        set.status = 400;
        return {
          status: "error",
          message: error.errors[0].message,
        };
      }

      set.status = 500;
      return {
        status: "error",
        message: "Internal server error, please try again later",
      };
    }
  }
);
