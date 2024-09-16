import { sql } from "@/libs/db";
import Elysia from "elysia";

if (!sql) {
  console.error("Database not connected");
} else {
  console.log("Database connected");
}

export const adminRoutes = new Elysia({ prefix: "/admin" }).group(
  "/employee",
  (app) =>
    app
      .post("/", async ({ body }) => {})
      .get("/", async () => {
        const employees = await sql`SELECT * FROM employee`;
        return { employees };
      })
);

