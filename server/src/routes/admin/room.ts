import { sql } from "@/libs/db";
import { createAndUpdateRoomSchema } from "@/libs/validation";
import Elysia, { t } from "elysia";
import postgres from "postgres";
import { z } from "zod";

export const roomRoutes = new Elysia({ prefix: "/rooms" })
  .onError(({ set, error }) => {
    set.status = 409;

    if (error instanceof postgres.PostgresError && error.code == "23505") {
      if (error.constraint_name == "room_number_key") {
        return {
          status: "error",
          message: "This room number have already used.",
        };
      }
    }

    console.log(error);
  })
  .post(
    "/create",
    async ({ set, body }) => {
      const { number, type_id } = body;

      const validation = createAndUpdateRoomSchema.safeParse({
        number: number,
        type_id: type_id,
      });

      if (!validation.success) {
        set.status = 400;
        const error = validation.error.issues[0].message;
        return {
          status: "error",
          message: error,
        };
      }

      await sql`INSERT INTO rooms(number, type_id) 
                VALUES (${number}, ${type_id})`;

      set.status = 201;

      return {
        status: "success",
        message: "You have already a created new room.",
      };
    },
    {
      body: t.Object({
        number: t.String(),
        type_id: t.String(),
      }),
    }
  )
  .get("/", async () => {
      const res =
        await sql`SELECT room.number, room.current_status, room_type.name,  room_type.price
                              FROM rooms
                              INNER JOIN room_type
                              ON rooms.type_id = room_type.id;`;
      return {
        status: "success",
        data: res,
      };
  })
  .get(
    "/:id",
    async ({ params, set }) => {
      const { id } = params;

      const validation = z.string().uuid().safeParse(id);

      if ( !validation.success ) {
        set.status = 400;
        return {
          status: "error",
          message: "id is not uuid.",
        };
      }

      const res =
        await sql`SELECT rooms.number, rooms.current_status, room_type.name, room_type.price 
                          FROM rooms
                          INNER JOIN room_type
                          ON rooms.type_id = room_type.id
                          WHERE rooms.id = ${id}`;
      return {
        status: "success",
        data: res,
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .put(
    "/update",
    async ({ set, body }) => {
      const { id, number, type_id } = body;

      const validation = createAndUpdateRoomSchema.safeParse({
        number: number,
        type_id: type_id,
      });

      if (!validation.success) {
        set.status = 400;
        const error = validation.error.issues[0].message;
        return {
          status: "error",
          message: error,
        };
      }

      await sql`
        UPDATE rooms
        SET number=${number}, type_id=${type_id} 
        WHERE id=${id}
      `;

      return {
        status: "success",
        message: "Update successfully.",
      };
    },
    {
      body: t.Object({
        id: t.String(),
        number: t.String(),
        type_id: t.String(),
      }),
    }
  )
  .delete("/delete/:id", async ({ params }) => {
    const { id } = params;
    try {
      await sql`DELETE FROM rooms
                WHERE id=${id}`;
    } catch (error) {
      if (error instanceof postgres.PostgresError) {
        if (error.code == "22P02") {
          return {
            status: "error",
            message: "id is not uuid.",
          };
        }
      }
    }

    return {
      status: "success",
      message: "Your room have been removed.",
    };
  });
