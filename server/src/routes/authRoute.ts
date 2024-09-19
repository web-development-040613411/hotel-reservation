import { sql } from '@/libs/db';
import { lucia } from '@/libs/lucia';
import { loginSchema } from '@/libs/validation';
import Elysia from 'elysia';

export const authRoutes = new Elysia({ prefix: '/auth' }).post(
    '/login',
    async ({ set, cookie, body }) => {
        const validate = loginSchema.safeParse(body);

        if (!validate.success) {
            set.status = 400;
            return {
                status: 'error',
                message: validate.error.errors[0].message,
            };
        }

        const { username, password } = validate.data;

        const [user] =
            await sql`SELECT * FROM employee WHERE LOWER(username)=LOWER(${username})`;

        if (!user) {
            set.status = 400;
            return {
                status: 'error',
                message: 'Invalid username or password',
            };
        }

        const validPassword = await Bun.password.verify(
            user.password,
            password,
            'bcrypt'
        );

        if (!validPassword) {
            set.status = 400;
            return {
                status: 'error',
                message: 'Invalid username or password',
            };
        }

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        cookie[sessionCookie.name].set({
            value: sessionCookie.value,
            ...sessionCookie.attributes,
        });

        return {
            status: 'success',
            message: 'Login successful',
        };
    }
);