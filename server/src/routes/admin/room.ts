import { sql } from "@/libs/db";
import { createRoomSchema } from "@/libs/validation";
import Elysia, { t } from "elysia";
import postgres from "postgres";

export const roomRoutes = new Elysia({ prefix: "/room" })
  .onError(({error}) => {
    if (error instanceof postgres.PostgresError && error.code == "23505") {
      if (error.constraint_name == "room_number_key") {
        return {
          status: "error",
          message: "This room number have already used.",
        };
      }
    }
  })
  .post(
    "/create",
    async ({ body }) => {
      const { number, type_id } = body;

      const validation = createRoomSchema.safeParse({
        number: number,
        type_id: type_id
      })

      if ( !validation.success ) {
        const error = validation.error.issues[0].message;
        return {
          status : "error",
          message : error
        }
      }

      await sql`INSERT INTO rooms(number, type_id) 
                VALUES (${number}, ${type_id})`;

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
  .get(
    "/",
    async ({set}) => {
      try {
        const res = await sql`SELECT room.number, room.current_status, room_type.name,  room_type.price
                      FROM rooms
                      INNER JOIN room_type
                      ON rooms.type_id = room_type.id;`;
        return {
          status: "success",
          data: res,
        };
      } catch (error) {
        set.status = 400;
        if (error instanceof postgres.PostgresError) {
          if (error.code == "22P02") {
            return {
              status: "error",
              message: "id is not uuid.",
            };
          }
        }
      }
    }
  )
  .get("/:id" , async ({ params,set }) => {
    const { id } = params;

    try {
      const res = await sql`SELECT rooms.number, rooms.current_status, room_type.name, room_type.price 
                            FROM rooms
                            INNER JOIN room_type
                            ON rooms.type_id = room_type.id
                            WHERE rooms.id = ${id}`
      return {
        status: "success",
        data: res,
      };
    } catch (error) {
      set.status = 400;
      if (error instanceof postgres.PostgresError) {
        if (error.code == "22P02") {
          return {
            status: "error",
            message: "id is not uuid.",
          };
        }
      }
    }
  }, {
    params : t.Object( {
      id : t.String()
      }
    )
  })
  .patch(
    "/update",
    async ({ body }) => {
      const { id, number, type_id, status } = body;

      if (status == "maintenance" || status == "off_market") {
        const roomIDs = await sql`
          SELECT * 
          FROM reservation
          WHERE id = ${id}
        `;

        return { roomIDs };
      }

      // try {
      //   await sql.begin(async (sql) => {});

      //   await sql`
      //   UPDATE rooms
      //   SET number = ${number},
      //   type_id = ${type_id},
      //   current_status = ${status}
      //   WHERE id = ${id}
      // `;
      // } catch (error) {
      //   if (error instanceof postgres.PostgresError) {
      //     if (error.code == "22P02") {
      //       return {
      //         status: "error",
      //         message: "type wrong.",
      //       };
      //     }

      //     if (
      //       error.code == "23505" &&
      //       error.constraint_name == "room_number_key"
      //     ) {
      //       return {
      //         status: "error",
      //         message: "This room number is already taken.",
      //       };
      //     }
      //   }

      //   console.log(error);

      //   return {
      //     status: "error",
      //     message: error,
      //   };
      // }

      // return {
      //   status: "success",
      //   message: "Update successfully.",
      // };
    },
    {
      body: t.Object({
        id: t.String(),
        number: t.Optional(t.String()),
        type_id: t.Optional(t.String()),
        status: t.Optional(t.String()),
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
