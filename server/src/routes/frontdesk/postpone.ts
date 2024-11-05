import { sql } from '@/libs/db';
import Elysia, { t } from 'elysia';
import { PostponeShcema } from '@/libs/validation';
import getVacantRoom from '@/libs/get-vacant-room';
import { getRandomColorToDB } from '@/libs/random-color';

export const postPoneRoute = new Elysia({ prefix: '/postpone' }).put(
    '/',
    async ({ body, set }) => {
        const validation = PostponeShcema.safeParse(body);
        if (!validation.success) {
            return {
                status: 400,
                body: {
                    message: validation.error.message,
                },
            };
        }
        const { reservationID, currentCheckout, newCheckOut } = validation.data;

        console.log(reservationID, currentCheckout, newCheckOut);

        const [postponeReservation] = await sql`
            SELECT
	            reservations.room_id,
	            room_types.price,
                reservations.customer_id
            FROM
                reservations
                INNER JOIN rooms ON reservations.room_id = rooms."id"
                INNER JOIN room_types ON rooms.type_id = room_types."id" 
            WHERE
                reservations."id" = ${reservationID}
        `;

        const {
            room_id,
            price: pricePerNight,
            customer_id: customerId,
        } = postponeReservation;

        const conflictReservations = await sql`
            SELECT 
                reservations.id, 
                reservations.room_id, 
                reservations.check_in, 
                reservations.check_out, 
                room_types.id AS roomtype_id, 
                reservations.transaction_status 
            FROM reservations 
            INNER JOIN rooms 
                ON reservations.room_id = rooms."id" 
            INNER JOIN room_types
                ON rooms.type_id = room_types."id" 
            WHERE 
                room_id = ${room_id} AND reservations.check_in < ${newCheckOut} 
                AND reservations.check_in >= ${currentCheckout} 
            ORDER BY reservations.check_in ASC;
        `;

        try {
            const preserveReservation = await sql.begin(async (sql) => {
                if (conflictReservations.length != 0) {
                    for (let i = 0; i < conflictReservations.length; i++) {
                        const {
                            roomtype_id: type_id,
                            check_in,
                            check_out,
                            id,
                        } = conflictReservations[i];

                        const res = await getVacantRoom({
                            type_id,
                            check_in,
                            check_out,
                        });
                        const vacantRoomID = res?.room_id;

                        await sql`
                        UPDATE reservations
                        SET room_id = ${vacantRoomID}
                        WHERE id = ${id}
                        RETURNING *
                        `;
                    }
                }

                const randomColor = getRandomColorToDB();

                const [preserveReservation] = await sql`
                    INSERT INTO reservations (room_id, check_in, check_out, price, display_color, customer_id)
                    VALUES (${room_id}, ${currentCheckout}, ${newCheckOut}, ${pricePerNight}, ${randomColor}, ${customerId})
                    RETURNING id;`;

                return preserveReservation;
            });

            return {
                status: 200,
                message: 'can postpone',
                reservationId: preserveReservation.id,
            };
        } catch (error) {
            set.status = 400;
            return {
                status: 400,
                body: {
                    message: 'Failed to postpone reservation room is full',
                },
            };
        }
    }
);
