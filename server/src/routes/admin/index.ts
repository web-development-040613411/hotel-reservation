import Elysia from "elysia";
import { roomTypeRoutes } from "./roomType";
import { employeeRoutes } from "./employee";

export const adminRoutes = new Elysia({ prefix: "/admin" })
  .use(roomTypeRoutes)
  .use(employeeRoutes);
