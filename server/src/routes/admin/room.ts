import { sql } from "@/libs/db";
import Elysia, { t } from "elysia";
import postgres from "postgres";

export const roomRoutes = new Elysia({ prefix: "/room" })
  .post(
    "/create",
    async ({ body }) => {
      const { number, type_id } = body;

      try {
        await sql`      INSERT INTO room(number, type_id) 
                        VALUES (${number}, ${type_id})`;
      } catch (error) {
        if (error instanceof postgres.PostgresError && error.code == "23505") {
          if (error.constraint_name == "room_number_key") {
            return {
              status: "error",
              message: "This room number is already used.",
            };
          }
        }
      }

      return {
        status: "success",
        message: "You have already created new room.",
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
    const res = await sql`SELECT * FROM room;`;
    return {
      status: "success",
      data: { res },
    };
  })
  .put("/update", async () => {
    return {
      status: "success",
      message: "",
    };
  })
  .delete("/delete", async () => {});
