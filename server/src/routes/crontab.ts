import { Elysia } from 'elysia';
import { cron } from '@elysiajs/cron';
import { sql } from '@/libs/db';

export const crontab = new Elysia()
    .use(
        cron({
            name: 'heartbeat',
            pattern: '0 */10 * * * *',
            async run() {
      
              await sql`DELETE FROM reservations
                        WHERE CAST(now() AS time) - CAST("createTime" AS time) > INTERVAL '5 minutes'
                        AND transaction_status = 'preserve'`;

            },
        })
    );
