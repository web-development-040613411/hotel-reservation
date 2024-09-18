import postgres from 'postgres';

export const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'allow',
  max: 10,
  idle_timeout: 5,
  connect_timeout: 5,
});
