import Elysia from "elysia";

export const adminRoutes = new Elysia({ prefix: "/admin" }).group("/room-type", (app) => 
  app.post("/", async ({ body }) => {
    
  })
)