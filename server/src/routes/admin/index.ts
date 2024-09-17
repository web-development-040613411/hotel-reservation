import Elysia from "elysia";
import { roomTypeRoutes } from "./roomType";

export const adminRoutes = new Elysia({ prefix: "/admin" }).use(roomTypeRoutes);
