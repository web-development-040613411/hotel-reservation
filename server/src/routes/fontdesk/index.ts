import Elysia from 'elysia';
import { checkInRoute } from './checkIn';

export const fontdeskRoute = new Elysia({ prefix: '/fontdesk' }).use(
    checkInRoute
);
