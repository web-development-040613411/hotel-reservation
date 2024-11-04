import { sql } from '@/libs/db';
import Elysia, { t } from 'elysia';

type uniqueRoom = {
    type: string;
    room: number;
};

export const reservationRoute = new Elysia({ prefix: '/reservations' }).get(
    '/',
    async () => {
        const response = await sql`SELECT * FROM reservation`;

        return {
            status: 'success',
            data: response,
        };
    }
);
