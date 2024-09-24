import Elysia from 'elysia';
import { reservationListRoute } from '../for-progress2/reservation-list';
import { customerDetailsRoute } from './customer-details';
import { incomeRoute } from './income';
export const progress2Route = new Elysia({ prefix: '/progress2' })
    .use(reservationListRoute)
    .use(customerDetailsRoute)
    .use(incomeRoute);
