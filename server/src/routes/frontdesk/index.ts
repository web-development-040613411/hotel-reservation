import Elysia from 'elysia';
import { checkInRoute } from './check-in';
import { checkOutRoute } from './check-out';
import { reservationRoute } from './reservation';

export const frontdeskRoute = new Elysia({ prefix: '/frontdesk' })
    .use(checkInRoute)
    .use(checkOutRoute)
    .use(reservationRoute);
