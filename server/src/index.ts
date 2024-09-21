import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { adminRoutes } from "./routes/admin";
import { fileRoute } from "./routes/fileRoute";
import { swagger } from "@elysiajs/swagger";
import postgres from "postgres";

export const app = new Elysia()
  .use(swagger())
  .onError(({ set, error, code }) => {
    if (error instanceof postgres.PostgresError && error.code == "23505") {
      if (error.constraint_name == "room_number_key") {
        set.status = 400;
        return {
          status: "error",
          message: "This room number have already used.",
        };
      }
    }


    if(code === "NOT_FOUND") {
      return new Response("Not Found :(");
    }
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
