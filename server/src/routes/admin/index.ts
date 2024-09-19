import Elysia from 'elysia';
import { employeeRoutes, resetPasswordRoutes } from './employee';
import { roomTypeRoutes } from './roomType';

export const adminRoutes = new Elysia({ prefix: '/admin' })
    .use(roomTypeRoutes)
    .use(employeeRoutes)
    .use(resetPasswordRoutes);
