import { sql } from '@/libs/db';
import Elysia from 'elysia';
import { reservationType } from '@/libs/type';

export const checkInRoute = new Elysia({ prefix: '/checkIn' }).patch(
    '/:id',
    async ({ params: { id }, set }) => {
        const queryReservation =
            await sql`SELECT * FROM reservation WHERE id=${id}`;

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
                message: 'Can not check in, reservation is preserved',
            };
        }

        const currentDate = new Date().toDateString();
        const checkInDate = new Date(thisReservation.check_in).toDateString();

        if (currentDate < checkInDate) {
            set.status = 400;
            return {
                status: 'error',
                message: 'Can not check in, reservation is not started yet',    
            };
        }

        const updateRoom = await sql`
            UPDATE rooms
            SET status='occupied'
            WHERE id=${thisReservation.room_id}
        `;

        return {
            status: 'success',
            message: 'Check in success',
        };
    }
);
