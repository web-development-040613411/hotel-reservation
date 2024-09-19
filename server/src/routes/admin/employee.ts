import { sql } from '@/libs/db';
import { uploadFile } from '@/libs/uploadFile';
import {
    addEmployeeSchema,
    ResetPasswordSchema,
    updateEmployeeSchema,
} from '@/libs/validation';
import Elysia from 'elysia';
import { unlink } from 'node:fs/promises';
import { join } from 'path';

export const employeeRoutes = new Elysia({ prefix: '/employees' })
    .get('/', async ({ set }) => {
        try {
            const employees = await sql`SELECT * FROM employee`;
            return {
                status: 'success',
                data: employees,
            };
        } catch (error) {
            set.status = 500;
            return {
                status: 'error',
                message: 'Internal server error, please try again later',
            };
        }
    })
    .get('/:id', async ({ params: { id }, set }) => {
        const employee = await sql`SELECT * FROM employee WHERE id=${id}`;
        if (employee.length === 0) {
            set.status = 404;
            return {
                status: 'error',
                message: 'Employee not found',
            };
        }
        return {
            status: 'success',
            data: employee[0],
        };
    })
    .post('/', async ({ body, set }) => {
        const validateData = addEmployeeSchema.safeParse(body);
        if (!validateData.success) {
            set.status = 400;
            return {
                status: 'error',
                message: validateData.error.errors[0].message,
            };
        }
        const {
            username,
            first_name,
            last_name,
            date_of_birth,
            password,
            confirm_password,
            role,
            image,
        } = validateData.data;

        const IsEmployeeExist =
            await sql`SELECT * FROM employee WHERE username=${username}`;
        if (IsEmployeeExist.length > 0) {
            set.status = 400;
            return {
                status: 'error',
                message: 'Employee already exists',
            };
        }
        if (!image) {
            set.status = 400;
            return {
                status: 'error',
                message: 'Image is required',
            };
        }
        if (password !== confirm_password) {
            set.status = 400;
            return {
                status: 'error',
                message: 'Password and confirm password does not match',
            };
        }
        const Hash_password = await Bun.password.hash(password, {
            algorithm: 'bcrypt',
            cost: 10,
        });

        const url = await uploadFile(image);
        if (!url) {
            set.status = 500;
            return {
                status: 'error',
                message: 'Internal server error, please try again later',
            };
        }

        const query_roles = await sql`SELECT enum_range(NULL::role);`;
        const all_roles = Object.values(query_roles[0].enum_range);
        if (!all_roles.includes(role)) {
            set.status = 400;
            return {
                status: 'error',
                message: 'Role does not exist',
            };
        }

        const employee =
            await sql`INSERT INTO employee (username, first_name, last_name, date_of_birth, password, role , profile_picture) VALUES (${username}, ${first_name}, ${last_name}, ${date_of_birth}, ${Hash_password}, ${role} , ${url})`;
        return {
            status: 'success',
            message: 'Employee added successfully',
        };
    })

    .put('/:id', async ({ params: { id }, body, set }) => {
        const validateData = updateEmployeeSchema.safeParse(body);
        if (!validateData.success) {
            set.status = 400;
            return {
                status: 'error',
                message: validateData.error.errors[0].message,
            };
        }
        const { username, first_name, last_name, date_of_birth, role, image } =
            validateData.data;

        const [existsingEmployee] =
            await sql`SELECT * FROM employee WHERE id=${id}`;
        if (!existsingEmployee) {
            set.status = 404;
            return {
                status: 'error',
                message: 'Employee not found',
            };
        }

        let url;
        if (image) {
            const path = join(
                '.',
                process.env.UPLOAD_FOLDER!,
                existsingEmployee.profile_picture.split('/').pop()
            );
            await unlink(path);

            url = await uploadFile(image);
            if (!url) {
                set.status = 500;
                return {
                    status: 'error',
                    message: 'Internal server error, please try again later',
                };
            }
        } else {
            url = existsingEmployee.profile_picture;
        }
        if (!url) {
            set.status = 500;
            return {
                status: 'error',
                message: 'Internal server error, please try again later',
            };
        }

        const query_roles = await sql`SELECT enum_range(NULL::role);`;
        const all_roles = Object.values(query_roles[0].enum_range);
        if (!all_roles.includes(role)) {
            set.status = 400;
            return {
                status: 'error',
                message: 'Role does not exist',
            };
        }

        const employee =
            await sql`UPDATE employee SET username=${username}, first_name=${first_name}, last_name=${last_name}, date_of_birth=${date_of_birth}, role=${role} , profile_picture=${url} WHERE id=${id}`;
        return {
            status: 'success',
            message: 'Employee updated successfully',
        };
    })

    .delete('/:id', async ({ params: { id }, set }) => {
        const [employee] = await sql`SELECT * FROM employee WHERE id=${id}`;
        if (!employee) {
            set.status = 404;
            return {
                status: 'error',
                message: 'Employee not found',
            };
        }
        const path = join(
            '.',
            process.env.UPLOAD_FOLDER!,
            employee.profile_picture.split('/').pop()
        );

        await sql`DELETE FROM employee WHERE id=${id}`;
        await unlink(path);
        set.status = 200;
        return {
            status: 'success',
            message: 'Employee deleted successfully',
        };
    });

export const resetPasswordRoutes = new Elysia({
    prefix: '/resetEmployeePassword',
}).put('/:id', async ({ params: { id }, body, set }) => {
    const validateData = ResetPasswordSchema.safeParse(body);
    if (!validateData.success) {
        set.status = 400;
        return {
            status: 'error',
            message: validateData.error.errors[0].message,
        };
    }
    const { password, confirm_password } = validateData.data;

    const employee = await sql`SELECT * FROM employee WHERE id=${id}`;
    if (employee.length === 0) {
        set.status = 404;
        return {
            status: 'error',
            message: 'Employee not found',
        };
    }
    if (password !== confirm_password) {
        set.status = 400;
        return {
            status: 'error',
            message: 'Password and confirm password does not match',
        };
    }
    const Hash_password = await Bun.password.hash(password, {
        algorithm: 'bcrypt',
        cost: 10,
    });
    await sql`UPDATE employee SET password=${Hash_password} WHERE id=${id}`;
    return {
        status: 'success',
        message: 'Password updated successfully',
    };
});
