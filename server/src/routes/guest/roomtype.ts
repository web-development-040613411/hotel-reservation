import { sql } from '@/libs/db';

import Elysia, { t } from 'elysia';

export const roomTypeRoutes = new Elysia({ prefix: '/rooms' }).get(
    '/room-types',
    async ({ set }) => {
        const roomTypes = await sql`SELECT * FROM room_types`;

        return {
            status: 'success',
            data: roomTypes,
        };
    }
);
