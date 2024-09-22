import { sql } from '@/libs/db';
import Elysia, { t } from 'elysia';
import { NewCustomerSchema } from '@/libs/validation';

export const customerRoutes = new Elysia({ prefix: '/customers' })
    .post(
        '/',
        async ({ body, set }) => {
            const validation = NewCustomerSchema.safeParse(body);

            if (!validation.success) {
                set.status = 400;

                return {
                    status: 400,
                    message: validation.error.errors[0].message,
                };
            }

            const {
                first_name,
                last_name,
                address,
                sub_district_id,
                district_id,
                province_id,
                postal_code,
                phone_number,
                email,
            } = body;

            await sql`INSERT INTO customers_detail(first_name, last_name, address, sub_district_id, district_id, province_id, postal_code, phone_number, email )
              VALUES (${first_name}, ${last_name}, ${address}, ${sub_district_id}, ${district_id}, ${province_id}, ${postal_code}, ${phone_number}, ${email})`;
            return {
                status: 'success',
                message: 'customer added successfully.',
            };
        },
        {
            body: t.Object({
                first_name: t.String(),
                last_name: t.String(),
                address: t.String(),
                sub_district_id: t.String(),
                district_id: t.String(),
                province_id: t.String(),
                postal_code: t.String(),
                phone_number: t.String(),
                email: t.String(),
            }),
        }
    )
    .get('/', async ({ set }) => {
        const customers = await sql`SELECT
                                	FIRST_NAME,
                                	LAST_NAME,
                                	ADDRESS,
                                	PROVINCE,
                                	DISTRICT,
                                	SUB_DISTRICT,
                                	POSTAL_CODE,
                                	PHONE_NUMBER,
                                	EMAIL
                                FROM
                                	CUSTOMERS_DETAIL
                                	INNER JOIN (
                                		SELECT
                                			PROVINCES.ID,
                                			PROVINCES.NAME_EN AS PROVINCE
                                		FROM
                                			PROVINCES
                                	) PROVINCES ON CUSTOMERS_DETAIL.PROVINCE_ID = PROVINCES.ID
                                	INNER JOIN (
                                		SELECT
                                			ID,
                                			NAME_EN AS DISTRICT
                                		FROM
                                			DISTRICTS
                                	) DISTRICTS ON CUSTOMERS_DETAIL.DISTRICT_ID = DISTRICTS.ID
                                	INNER JOIN (
                                		SELECT
                                			ID,
                                			NAME_EN AS SUB_DISTRICT
                                		FROM
                                			SUB_DISTRICTS
                                	) SUB_DISTRICTS ON CUSTOMERS_DETAIL.SUB_DISTRICT_ID = SUB_DISTRICTS.ID;`;
        return {
            status: 'success',
            data: customers,
        };
    });
