import { Elysia } from "elysia";
import { adminRoutes } from "./routes/adminRoutes";
import cors from "@elysiajs/cors";

const app = new Elysia().use(adminRoutes).use(cors()).listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
