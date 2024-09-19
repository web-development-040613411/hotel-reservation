import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { adminRoutes } from "./routes/admin";
import { fileRoute } from "./routes/fileRoute";
import { swagger } from "@elysiajs/swagger";

export const app = new Elysia()
  .use(swagger())
  .use(adminRoutes)
  .use(fileRoute)
  .use(cors())
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
