import { sql } from "@/libs/db";
import Elysia from "elysia";

export const adminRoutes = new Elysia({ prefix: "/admin" }).group(
  "/room-type",
  (app) =>
    app.get("/", async () => {
      const [...rooms] = await sql`SELECT * FROM room;`;

      return rooms;
    })
);
