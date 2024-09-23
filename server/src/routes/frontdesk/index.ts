import Elysia from 'elysia';
import { checkInRoute } from './check-in';
import { checkOutRoute } from './check-out';
import { reservationListRoute } from '../for-progress2/reservation-list';

export const frontdeskRoute = new Elysia({ prefix: '/frontdesk' })
    .use(checkInRoute)
    .use(checkOutRoute)
    .use(reservationListRoute);
