import { sql } from '@/libs/db';
import Elysia, { t } from 'elysia';
import { reservationType } from '@/libs/type';

export const reservationRoute = new Elysia({ prefix: '/reservations' })
    .get('/', async ({ set }) => {
        const reservations = await sql`SELECT
  reservations.id AS reservations_id,
  customer_id,
  customer_details.first_name,
  customer_details.last_name,
  customer_details.address,
  customer_details.email,
  customer_details.phone_number,
  customer_details.sub_district,
  customer_details.district,
  customer_details.province,
  customer_details.postcode,
  rooms."number" AS room_number,
  reservations.price,
  reservations.room_id,
  check_in,
  check_out,
  display_color,
  transaction_status,
  "createAt",
  current_status,
  room_types."name" AS types_name,
  room_types.capacity,
  room_types.detail,
  room_types.picture_path,
  room_types.price AS price_per_night 
FROM
  rooms
  LEFT JOIN reservations ON rooms."id" = reservations.room_id
  INNER JOIN room_types ON rooms.type_id = room_types."id"
  LEFT JOIN customer_details ON reservations.customer_id = customer_details.ID   
  ORDER BY rooms."number" ASC
                    
                    `;

        return {
            status: 'success',
            data: reservations,
        };
    })
    .get('/search', async ({ query, set }) => {
        query: t.Object({
            fullname: t.String(),
        });

        if (!query.fullname) {
            return {
                status: 'error',
                message: 'Please provide a fullname to search',
            };
        }

        const reservations = await sql`
                SELECT
                reservations.*, 
                sub_districts.name_en AS sub_district, 
                provinces.name_en AS province, 
                districts.name_en AS district, 
                districts.postal_code AS postal_code, 
                rooms."number", 
                rooms.type_id, 
                rooms.current_status, 
                room_types."name", 
                room_types.detail, 
                room_types.capacity, 
                room_types.price AS room_type_price, 
                room_types.picture_path, 
                customer_details.first_name, 
                customer_details.last_name, 
                customer_details.address, 
                customer_details.phone_number, 
                customer_details.email
            FROM
                reservations
                INNER JOIN
                customer_details
                ON 
                    reservations.customer_id = customer_details."id"
                INNER JOIN
                sub_districts
                ON 
                    customer_details.sub_district_id = sub_districts."id"
                INNER JOIN
                provinces
                ON 
                    customer_details.province_id = provinces."id"
                INNER JOIN
                districts
                ON 
                    sub_districts.district_code = districts.code AND
                    customer_details.district_id = districts."id" AND
                    provinces.code = districts.province_code
                INNER JOIN
                rooms
                ON 
                    reservations.room_id = rooms."id"
                INNER JOIN
                room_types
                ON 
                    rooms.type_id = room_types."id"
            WHERE
                LOWER(customer_details.first_name) LIKE ${
                    '%' + query.fullname.toLowerCase() + '%'
                } OR
                LOWER(customer_details.last_name) LIKE  ${
                    '%' + query.fullname.toLowerCase() + '%'
                } `;

        if (reservations.length === 0) {
            return {
                status: 'error',
                message: 'No reservation found',
                data: [],
            };
        }

        return {
            status: 'success',
            data: reservations,
        };
    });
