import { adminRoutes } from '@/routes/admin';
import cors from '@elysiajs/cors';
import { Elysia } from 'elysia';
import { fileRoute } from './routes/fileRoute';
import { authRoutes } from './routes/authRoute';

const app = new Elysia()
    .onError(({ error, code }) => {
        if (code === 'NOT_FOUND') {
            return new Response('Not Found :(');
        }
        console.error(error);
        return {
            status: 'error',
            message: 'Internal server error, please try again later',
        };
    })
    .use(authRoutes)
    .use(adminRoutes)
    .use(fileRoute)
    .use(cors())
    .listen(3001);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
