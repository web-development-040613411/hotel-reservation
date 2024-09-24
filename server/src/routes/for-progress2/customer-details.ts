import { sql } from '@/libs/db';
import Elysia from 'elysia';

export const customerDetailsRoute = new Elysia({
    prefix: '/customer-detalis',
}).get('/', async ({ set }) => {
    const customerDetails = await sql`SELECT
	customer_details.first_name, 
	customer_details.last_name, 
	customer_details.address, 
	sub_districts.name_en AS sub_district, 
	districts.name_en AS district, 
	provinces.name_en AS province, 
  districts.postal_code AS postal_code, 
	customer_details.email, 
	customer_details.phone_number
FROM
	customer_details
	INNER JOIN
	districts
	ON 
		customer_details.district_id = districts."id"
	INNER JOIN
	provinces
	ON 
		districts.province_code = provinces.code AND
		districts.province_code = provinces.code AND
		customer_details.province_id = provinces."id"
	INNER JOIN
	sub_districts
	ON 
		districts.code = sub_districts.district_code AND
		customer_details.sub_district_id = sub_districts."id"`;

    if (customerDetails.length === 0) {
        set.status = 404;
        return {
            status: 'error',
            message: 'Customers not found',
        };
    }

    return {
        status: 'success',
        data: customerDetails,
    };
});
