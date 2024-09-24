import { sql } from '@/libs/db';
import Elysia from 'elysia';

export const reservationListRoute = new Elysia({ prefix: '/reservation-list' }).get(
    '/',
    async ({ set }) => {
        const queryReservationList = await sql`SELECT
	*
FROM
	reservations
	INNER JOIN
	customer_details
	ON 
		reservations.customer_id = customer_details."id"
	INNER JOIN
	rooms
	ON 
		reservations.room_id = rooms."id"
	INNER JOIN
	room_types
	ON 
		rooms.type_id = room_types."id"`;

        if (queryReservationList.length === 0) {
            set.status = 404;
            return {
                status: 'error',
                message: 'No reservation list found',
            };
        }

        return {
            status: 'success',
            data:  queryReservationList ,
        };
    }
);
