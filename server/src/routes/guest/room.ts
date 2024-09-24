import { sql } from '@/libs/db';
import Elysia, { t } from 'elysia';

export const roomRoutes = new Elysia({ prefix: '/rooms' }).get(
    '/vacant-rooms',
    async ({ query }) => {
        const roomTypes = await sql`SELECT id FROM rooms_type`;
        const uniqueRooms = [];

        const { check_in, check_out } = query;
        const diffDate =
            new Date(check_out).getDate() - new Date(check_in).getDate();

        for (const roomType of roomTypes) {
            const res = await sql`
                      SELECT
                        rooms."id" AS room_id,
                        rooms."number",
                        rooms_type."name",
                        ${diffDate} * rooms_type.price AS price,
                        rooms_type.detail,
                        rooms_type.picture_path
                      FROM
                        rooms
                        LEFT JOIN rooms_type ON rooms.type_id = rooms_type."id" 
                      WHERE
                        (
                        SELECT
                          reservations."id" 
                        FROM
                          reservations
                          INNER JOIN ( SELECT rooms.NUMBER, rooms.ID FROM rooms ) room_id_num ON room_id_num.ID = reservations.room_id 
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
                        AND rooms.type_id = ${roomType.id}
                      ORDER BY
                        rooms."number" ASC
                        LIMIT 1;
                          `;
            uniqueRooms.push(...res);
        }

        return {
            status: 'success',
            data: uniqueRooms,
        };
    },
    {
        query: t.Object({
            check_in: t.Date(),
            check_out: t.Date(),
        }),
    }
);
