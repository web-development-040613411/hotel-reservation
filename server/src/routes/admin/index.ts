import Elysia from 'elysia';
import { roomTypeRoutes } from './roomType';
import { employeeRoutes , resetPasswordRoutes } from './employee';
import { roomRoutes } from "./room";

export const adminRoutes = new Elysia({ prefix: '/admin' })
    .use(roomTypeRoutes)
    .use(employeeRoutes)
    .use(resetPasswordRoutes)
    .use(roomRoutes);
