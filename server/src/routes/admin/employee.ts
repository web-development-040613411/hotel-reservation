import { sql } from '@/libs/db';
import Elysia from 'elysia';
import {
    addEmployeeSchema,
    ResetPasswordSchema,
    updateEmployeeSchema,
} from '@/libs/validation';
import { join } from 'path';
import { unlink } from 'node:fs/promises';
import { ZodError } from 'zod';
import { uploadFile } from '@/libs/uploadFile';

export const employeeRoutes = new Elysia({ prefix: '/employee' })
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
    .get('/id/:id', async ({ params: { id }, set }) => {
        try {
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
        } catch (error) {
            set.status = 500;
            return {
                status: 'error',
                message: 'Internal server error, please try again later',
            };
        }
    })
    .post('/', async ({ body, set }) => {
        try {
            const data = addEmployeeSchema.parse(body);
            const {
                user_name,
                firstname,
                lastname,
                date_of_birth,
                password,
                confirm_password,
                role,
                image,
            } = data;
            const IsEmployeeExist =
                await sql`SELECT * FROM employee WHERE user_name=${user_name}`;
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

            const Query_roles = await sql`SELECT enum_range(NULL::role);`;
            const all_roles = Object.values(Query_roles[0].enum_range);
            if (!all_roles.includes(role)) {
                set.status = 400;
                return {
                    status: 'error',
                    message: 'Role does not exist',
                };
            }

            const employee =
                await sql`INSERT INTO employee (user_name, firstname, lastname, date_of_birth, password, role , profile_picture) VALUES (${user_name}, ${firstname}, ${lastname}, ${date_of_birth}, ${Hash_password}, ${role} , ${url})`;
            return {
                status: 'success',
                message: 'Employee added successfully',
            };
        } catch (error) {
            if (error instanceof ZodError) {
                set.status = 400;
                return {
                    status: 'error',
                    message: error.errors[0].message,
                };
            }

            set.status = 500;
            return {
                status: 'error',
                message: 'Internal server error, please try again later',
            };
        }
    })

    .put('/id/:id', async ({ params: { id }, body, set }) => {
        try {
            const data = updateEmployeeSchema.parse(body);

            const {
                user_name,
                firstname,
                lastname,
                date_of_birth,
                role,
                image,
            } = data;

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
                        message:
                            'Internal server error, please try again later',
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

            const Query_roles = await sql`SELECT enum_range(NULL::role);`;
            const all_roles = Object.values(Query_roles[0].enum_range);
            if (!all_roles.includes(role)) {
                set.status = 400;
                return {
                    status: 'error',
                    message: 'Role does not exist',
                };
            }

            const employee =
                await sql`UPDATE employee SET user_name=${user_name}, firstname=${firstname}, lastname=${lastname}, date_of_birth=${date_of_birth}, role=${role} , profile_picture=${url} WHERE id=${id}`;
            return {
                status: 'success',
                message: 'Employee updated successfully',
            };
        } catch (error) {
            if (error instanceof ZodError) {
                set.status = 400;
                return {
                    status: 'error',
                    message: error.errors[0].message,
                };
            }

            set.status = 500;
            return {
                status: 'error',
                message: 'Internal server error, please try again later',
            };
        }
    })

    .delete('/id/:id', async ({ params: { id }, set }) => {
        try {
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
        } catch (error) {
            console.log(error);
            set.status = 500;
            return {
                status: 'error',
                message: 'Internal server error, please try again later',
            };
        }
    });

export const resetPasswordRoutes = new Elysia({ prefix: '/employee/resetPassword' }).put(
    '/id/:id',
    async ({ params: { id }, body, set }) => {
      
        try {
            const employee = await sql`SELECT * FROM employee WHERE id=${id}`;
            if (employee.length === 0) {
                set.status = 404;
                return {
                    status: 'error',
                    message: 'Employee not found',
                };
            }
            const data = ResetPasswordSchema.parse(body);
            const { password, confirm_password } = data;
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
        } catch (error) {
            set.status = 500;
            return {
                status: 'error',
                message: 'Internal server error, please try again later',
            };
        }
    }
);
