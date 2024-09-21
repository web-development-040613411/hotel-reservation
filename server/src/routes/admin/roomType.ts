import Elysia from "elysia";
import { sql } from "@/libs/db";
import { unlink } from "node:fs/promises";
import { uploadFile } from "@/libs/uploadFile";
import { addRoomTypeSchema } from "@/libs/validation";
import { join } from "path";

export const roomTypeRoutes = new Elysia({ prefix: "/room-type" })
  .get("/", async () => {
    const roomTypes = await sql`SELECT * FROM room_type`;
    return {
      status: "success",
      data: roomTypes,
    };
  })
  .post("/", async ({ body, set }) => {
    const validateData = addRoomTypeSchema.safeParse(body);

    if (!validateData.success) {
      set.status = 400;
      return {
        status: "error",
        message: validateData.error.errors[0].message,
      };
    }

    const { name, detail, capacity, price, image } = validateData.data;

    const [roomType] = await sql`SELECT * FROM room_type WHERE name=${name}`;

    if (roomType) {
      set.status = 400;
      return {
        status: "error",
        message: "Room type already exists",
      };
    }

    if (!image) {
      set.status = 400;
      return {
        status: "error",
        message: "Image is required",
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
  })
  .put("/:id", async ({ params, body, set }) => {
    const { id } = params;

    const [roomType] = await sql`SELECT * FROM room_type WHERE id=${id}`;

    if (!roomType) {
      set.status = 404;
      return {
        status: "error",
        message: "Room type not found",
      };
    }

    const validateData = addRoomTypeSchema.safeParse(body);

    if (!validateData.success) {
      return {
        status: "error",
        message: validateData.error.errors[0].message,
      };
    }

    const { name, detail, capacity, price, image } = validateData.data;

    const [existingRoomType] =
      await sql`SELECT * FROM room_type WHERE name=${name} AND id!=${roomType.id}`;

    if (existingRoomType) {
      set.status = 400;
      return {
        status: "error",
        message: "Room type already exists",
      };
    }

    let url;

    if (image) {
      url = await uploadFile(image);

      if (!url) {
        set.status = 500;
        return {
          status: "error",
          message: "Internal server error, please try again later",
        };
      }
    } else {
      url = roomType.picture_path;
    }

    if (!url) {
      set.status = 500;
      return {
        status: "error",
        message: "Internal server error, please try again later",
      };
    }

    await sql`
        UPDATE room_type
        SET name=${name}, detail=${detail}, capacity=${capacity}, price=${price}, picture_path=${url}
        WHERE id=${roomType.id}
      `;

    return {
      status: "success",
      message: "Room type updated successfully",
    };
  })
  .delete("/:id", async ({ params, set }) => {
    const { id } = params;

    const [roomType] = await sql`SELECT * FROM room_type WHERE id=${id}`;

    if (!roomType) {
      set.status = 404;
      return {
        status: "error",
        message: "Room type not found",
      };
    }
    const path = join(
      ".",
      process.env.UPLOAD_FOLDER!,
      roomType.picture_path.split("/").pop()
    );

    await sql`DELETE FROM room_type WHERE id=${roomType.id}`;

    await unlink(path);

    return {
      status: "success",
      message: "Room type deleted successfully",
    };
  });
