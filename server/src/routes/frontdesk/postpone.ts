import { sql } from '@/libs/db';
import Elysia, { t } from 'elysia';
import { reservationType } from '@/libs/type';
import { PostponeShcema } from '@/libs/validation';
import { getDiffDate } from '@/libs/get-diff-date';
import getVacantRoom from '@/libs/get-vacant-room';

export const postPoneRoute = new Elysia({ prefix: '/postpone' }).put(
    '/',
    async ({ body }) => {
        const validation = PostponeShcema.safeParse(body);
        if (!validation.success) {
            return {
                status: 400,
                body: {
                    message: validation.error.message,
                },
            };
        }
        const { reservationID, newCheckIn, newCheckOut } = validation.data;

        const thisReservation = (await sql`
            SELECT * FROM reservations WHERE id = ${reservationID}
        `) as reservationType[];

        const lasCheckOut = new Date(newCheckIn).toISOString().split('T')[0];
        const newCheckOutT = new Date(newCheckOut).toISOString().split('T')[0];
        const thisRoomReservations = await sql`
            SELECT reservations.id , reservations.room_id , reservations.check_in , reservations.check_out , room_types.id AS roomtype_id , reservations.transaction_status FROM reservations INNER JOIN rooms ON reservations.room_id = rooms."id" 
            INNER JOIN room_types ON rooms.type_id = room_types."id" WHERE room_id = ${thisReservation[0].room_id} AND reservations.check_in < ${newCheckOutT} AND reservations.check_out > ${lasCheckOut} 
            AND reservations.transaction_status = 'complete' ORDER BY reservations.check_in ASC;
        `;

        if (thisRoomReservations.length === 0) {
            //can postpone go to stripe
            //
            //
        } else {
            try {
                await sql.begin(async (sql) => {
                    for (let i = 0; i < thisRoomReservations.length; i++) {
                        const res = await getVacantRoom({
                            type_id: thisRoomReservations[i].roomtype_id,
                            check_in: thisRoomReservations[i].check_in,
                            check_out: thisRoomReservations[i].check_out,
                        });
                        const vacantRoomID = res?.room_id;
                        // console.log(vacantRoomID);
                        await sql`
                        UPDATE reservations
                        SET room_id = ${vacantRoomID}
                        WHERE id = ${thisRoomReservations[i].id}
                        RETURNING *
                    `;
                    }
                });
            } catch (error) {
                return {
                    status: 400,
                    body: {
                        message: 'Failed to postpone reservation room is full',
                    },
                };
            }

            //can postpone go to stripe
            //
            //
        }

        return {
            status: 200,
            message: 'can postpone',
        };
    }
);
