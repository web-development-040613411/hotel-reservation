import { sql } from '@/libs/db';
import Elysia from 'elysia';
import { reservationType } from '@/libs/type';

export const checkOutRoute = new Elysia({ prefix: '/check-out' }).patch(
    '/:id',
    async ({ params: { id }, set }) => {
        const queryReservation =
            await sql`SELECT * FROM reservations WHERE id=${id}`;

        if (queryReservation.count === 0) {
            set.status = 404;
            return {
                status: 'error',
                message: 'Reservation not found',
            };
        }
        const thisReservation = queryReservation[0] as reservationType;

        if (thisReservation.transaction_status == 'preserve') {
            set.status = 400;
            return {
                status: 'error',
                message: 'Can not check out, reservation is preserved',
            };
        }

        const currentDate = new Date().toDateString();
        const checkOutDate = new Date(thisReservation.check_out).toDateString();

        if (currentDate > checkOutDate) {
            set.status = 400;
            return {
                status: 'error',
                message: 'Can not check out, reservation is already finished',
            };
        }

        const updateRoom = await sql`
            UPDATE rooms
            SET current_status ='vacant'
            WHERE id=${thisReservation.room_id}
        `;

        const updateReservation = await sql`
            UPDATE reservations
            SET check_out = ${currentDate}
            WHERE id=${thisReservation.id};`;

        return {
            status: 'success',
            message: 'Check out success',
        };
    }
);
