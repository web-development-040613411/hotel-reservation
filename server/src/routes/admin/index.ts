import Elysia from "elysia";
import { roomTypeRoutes } from "./roomType";
import { roomRoutes } from "./room";

export const adminRoutes = new Elysia({ prefix: "/admin" })
  .use(roomTypeRoutes)
  .use(roomRoutes);
