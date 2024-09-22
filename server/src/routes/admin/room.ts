import { sql } from "@/libs/db";
import { createAndUpdateRoomSchema } from "@/libs/validation";
import Elysia, { t } from "elysia";
import postgres from "postgres";
import { z } from "zod";

export const roomRoutes = new Elysia({ prefix: "/rooms" })
  .post(
    "/",
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

      const [res] = await sql`INSERT INTO rooms(number, type_id) 
                            VALUES (${number}, ${type_id})
                            RETURNING rooms.id`;

      set.status = 201;

      return {
        status: "success",
        message: "You have already a created new room.",
        room_id: res.id,
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
        await sql`SELECT rooms.number, rooms.current_status, room_type.name,  room_type.price
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

      const res = await sql`SELECT rooms.number, rooms.current_status, room_type.name, room_type.price 
                          FROM rooms
                          INNER JOIN room_type
                          ON rooms.type_id = room_type.id
                          WHERE rooms.id = ${id}`;

      if ( res.length === 0 ) {
        set.status = 404;
        return {
          status: "error",
          message: "Room not found.",
        };
      }

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
    "/:id",
    async ({ params, set, body }) => {
      const { number, type_id } = body;
      const { id } = params;

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

      const [res] = await sql`SELECT * FROM rooms WHERE id=${id}`;

      if (res === undefined) {
        set.status = 404;
        return {
          status: "error",
          message: "Room not found.",
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
        number: t.String(),
        type_id: t.String(),
      }), 
    params : t.Object({
      id : t.String()
    }),
    }
  )
  .delete("/:id", async ({ set, params }) => {
    const { id } = params;

    const validation = z.string().uuid().safeParse(id); 

    if ( !validation.success ) { 
      set.status = 400;
      return {
        status: "error",
        message: "id is not uuid.",
      };
    }

    const reservation = await sql`SELECT * FROM reservations 
                                  WHERE room_id=${id}
                                  AND check_out > NOW()`;

    if (reservation.length !== 0) {
      set.status = 400;
      return {
        status: "error",
        message: "There are some guests who use this room.",
      };
    }

    const [res] = await sql`SELECT * FROM rooms WHERE id=${id}`;

    if (res === undefined) {
      set.status = 404;
      return {
        status: "error",
        message: "Room not found.",
      };
    }

    await sql`DELETE FROM rooms
              WHERE id=${id}`;

    return {
      status: "success",
      message: "Your room have been removed.",
    };
  })
  .patch('/status', async ({ set, body }) => {  


  });
