import { sql } from '@/libs/db';
import Elysia, { t } from 'elysia';
import { reservationType } from '@/libs/type';
import { PostponeShcema } from '@/libs/validation';
import { getDiffDate } from '@/libs/get-diff-date';

export const postPoneRoute = new Elysia({ prefix: '/postpone' }).get(
    '/',
    async ({ query }) => {
        const validation = PostponeShcema.safeParse(query);
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

        const check_in = new Date(newCheckIn).toISOString().split('T')[0];
        const check_out = new Date(newCheckOut).toISOString().split('T')[0];
        const thisRoomReservations = await sql`
            SELECT reservations.id , reservations.room_id , reservations.check_in , reservations.check_out , room_types.id AS roomtype_id , reservations.transaction_status FROM reservations INNER JOIN rooms ON reservations.room_id = rooms."id" 
            INNER JOIN room_types ON rooms.type_id = room_types."id" WHERE room_id = ${thisReservation[0].room_id} AND reservations.check_in <= ${check_out} AND reservations.check_out >= ${check_in} 
            AND reservations.transaction_status = 'complete' ORDER BY reservations.check_in ASC;
        `;
        let canMoveCount = 0;
        if (thisRoomReservations.length === 0) {
            console.log('can postpone');
        } else {
            for (let i = 0; i < thisRoomReservations.length; i++) {
                const diffDate = getDiffDate(
                    new Date(thisRoomReservations[i].check_in),
                    new Date(thisRoomReservations[i].check_out)
                );
                const [res] = await sql`
                            SELECT
                            room_types."name",
                            ${diffDate} * room_types.price AS total_price,
                            price,
                            room_types.detail,
                            room_types.id AS type_id,
                            room_types.picture_path
                          FROM
                            rooms
                            LEFT JOIN room_types ON rooms.type_id = room_types."id"
                          WHERE
                            (
                            SELECT
                              reservations."id"
                            FROM
                              reservations
                            WHERE
                              reservations.room_id = rooms."id"
                              AND (
                                ( ( ( ${check_out} ) > reservations.check_in ) AND ( ( ${check_in} ) < reservations.check_out ) )
                                OR ( ( ( ${check_in} ) < reservations.check_out ) AND ( ( ${check_out} ) > reservations.check_in ) )
                                OR ( ( ( ${check_in} ) > reservations.check_in ) AND ( ( ${check_out} ) < reservations.check_out ) )
                                OR ( ( ( ${check_out} ) > reservations.check_out ) AND ( ( ${check_in} ) < reservations.check_in ) )
                              )
                              LIMIT 1
                            ) IS NULL
                            AND rooms.type_id = ${thisRoomReservations[i].roomtype_id}
                          ORDER BY
                            rooms."number" ASC
                            LIMIT 1;
        `;
                if (res) {
                    canMoveCount++;
                }
            }
        }

        return {
            status: 200,
            data: [thisReservation, canMoveCount],
        };
    }
);
