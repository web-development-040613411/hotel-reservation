import Elysia from 'elysia';
import { roomRoutes } from './room';

export const guestRoutes = new Elysia({ prefix: '/guest' }).use(roomRoutes);
