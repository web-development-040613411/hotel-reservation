import Elysia from 'elysia';
import { checkInRoute } from './check-in';
import { checkOutRoute } from './check-out';

export const frontdeskRoute = new Elysia({ prefix: '/frontdesk' })
    .use(checkInRoute)
    .use(checkOutRoute);
