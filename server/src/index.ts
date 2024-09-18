import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { adminRoutes } from "./routes/admin";
import { fileRoute } from "./routes/fileRoute";

const app = new Elysia()
  .onError(({ error }) => {
    console.error(error);
    return {
      status: "error",
      message: "Internal server error, please try again later",
    };
  })
  .use(adminRoutes)
  .use(fileRoute)
  .use(cors())
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
