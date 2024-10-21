import { sql } from '@/libs/db';
import { PaymentSchema } from '@/libs/validation';
import Elysia from 'elysia';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const stripeRoutes = new Elysia({ prefix: '/stripe' }).post(
    '/checkout',
    async ({ body, set }) => {
        const validation = PaymentSchema.safeParse(body);
        if (!validation.success) {
            set.status = 400;
            return {
                status: 'error',
                message: validation.error.message,
            };
        }
        const { roomTypeId, personalInformation, totalPrice, reservationId } =
            validation.data;

        const [roomType] = await sql`
      SELECT
        room_types.name
      FROM
        room_types
      WHERE
        room_types.id = ${roomTypeId};
    `;

        const {
            firstName,
            lastName,
            address,
            phoneNumber,
            email,
            subDistrict,
            district,
            province,
            postcode,
            specialRequest,
        } = personalInformation;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'promptpay'],
            line_items: [
                {
                    price_data: {
                        currency: 'thb',
                        unit_amount: totalPrice * 100,
                        product_data: {
                            name: roomType.name,
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        });

        const [customerID] = await sql`
      INSERT INTO customer_details (first_name, last_name, address, phone_number, email, sub_district, district, province, postcode, special_request)
      VALUES (${firstName}, ${lastName}, ${address}, ${phoneNumber}, ${email}, ${subDistrict}, ${district}, ${province}, ${postcode}, ${specialRequest || null})
      RETURNING id;
    `;

        await sql`
      UPDATE reservations
      SET 
      customer_id = ${customerID.id},
      stripe_session_id = ${session.id}
      WHERE id = ${reservationId};
    `;

        return {
            status: 'success',
            data: {
                session_id: session.id,
            },
        };
    }
);
