import { sql } from '@/libs/db';
import { createAndUpdateRoomSchema } from '@/libs/validation';
import Elysia from 'elysia';

export const roomRoutes = new Elysia({ prefix: '/rooms' })
    .post('/', async ({ set, body }) => {
        const validation = createAndUpdateRoomSchema.safeParse(body);

        if (!validation.success) {
            set.status = 400;
            const error = validation.error.issues[0].message;
            return {
                status: 'error',
                message: error,
            };
        }

        const { number, type_id } = validation.data;

        const [res] = await sql`INSERT INTO rooms(number, type_id) 
                            VALUES (${number}, ${type_id})
                            RETURNING rooms.id`;

        set.status = 201;

        return {
            status: 'success',
            message: 'You have already a created new room.',
            room_id: res.id,
        };
    })
    .get('/', async () => {
        const res =
            await sql`SELECT rooms.number, rooms.current_status, room_types.name,  room_types.price
                              FROM rooms
                              INNER JOIN room_types
                              ON rooms.type_id = room_types.id;`;
        return {
            status: 'success',
            data: res,
        };
    })
    .get('/:id', async ({ params, set }) => {
        const { id } = params;

        const [res] =
            await sql`SELECT rooms.number, rooms.current_status, room_types.name, room_types.price 
                          FROM rooms
                          INNER JOIN room_types
                          ON rooms.type_id = room_types.id
                          WHERE rooms.id = ${id}`;

        if (!res) {
            set.status = 404;
            return {
                status: 'error',
                message: 'Room not found.',
            };
        }

        return {
            status: 'success',
            data: res,
        };
    })
    .put('/:id', async ({ params, set, body }) => {
        const { id } = params;

        const validation = createAndUpdateRoomSchema.safeParse(body);

        if (!validation.success) {
            set.status = 400;
            const error = validation.error.issues[0].message;
            return {
                status: 'error',
                message: error,
            };
        }

        const { number, type_id } = validation.data;

        const [res] = await sql`SELECT * FROM rooms WHERE id=${id}`;

        if (!res) {
            set.status = 404;
            return {
                status: 'error',
                message: 'Room not found.',
            };
        }

        await sql`
        UPDATE rooms
        SET number=${number}, type_id=${type_id} 
        WHERE id=${id}
      `;

        return {
            status: 'success',
            message: 'Update successfully.',
        };
    })
    .delete('/:id', async ({ set, params }) => {
        const { id } = params;

        const reservation = await sql`SELECT * FROM reservations 
                                  WHERE room_id=${id}
                                  AND check_out > NOW()`;

        if (reservation.length !== 0) {
            set.status = 400;
            return {
                status: 'error',
                message: 'There are some guests who use this room.',
            };
        }

        const [res] = await sql`SELECT * FROM rooms WHERE id=${id}`;

        if (!res) {
            set.status = 404;
            return {
                status: 'error',
                message: 'Room not found.',
            };
        }

        await sql`DELETE FROM rooms
              WHERE id=${id}`;

        return {
            status: 'success',
            message: 'Your room have been removed.',
        };
    })
    .patch('/status', async ({ set, body }) => {});
