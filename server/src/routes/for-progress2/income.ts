import { sql } from '@/libs/db';
import Elysia from 'elysia';

export const incomeRoute = new Elysia({ prefix: '/income' }).get(
    '/',
    async ({ set }) => {
        const incomeList = await sql`SELECT SUM(reservations.price), EXTRACT(MONTH FROM reservations."createAt") "month" , EXTRACT(YEAR FROM reservations."createAt") "year"
FROM reservations GROUP BY "month" , "year" ORDER BY "year" , "month"`;

        if (incomeList.length === 0) {
            set.status = 404;
            return {
                status: 'error',
                message: 'incomeList not found',
            };
        }

        return {
            status: 'success',
            data:  incomeList ,
        };
    }
);
