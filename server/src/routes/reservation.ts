import { sql } from "@/libs/db";
import Elysia from "elysia";


export const reservationRoute = new Elysia({ prefix: "/reservation" })
  .get('/', async ({ set }) => {
    const response = await sql`SELECT * FROM reservation`;

    return {
      status : "success",
      data : response
    }
  })