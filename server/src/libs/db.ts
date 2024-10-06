import postgres from 'postgres';

export const sql = postgres(process.env.DATABASE_URL!, {
    idle_timeout: 30,
    max_lifetime: 30 * 60,
});
