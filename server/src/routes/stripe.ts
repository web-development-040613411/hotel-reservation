import { sql } from "@/libs/db";
import { PaymentSchema } from "@/libs/validation";
import Elysia from "elysia";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const stripeRoutes = new Elysia({prefix : '/stripe'})
  .post('/checkout', async ({body}) => {
    const validation = PaymentSchema.safeParse(body);
    if (!validation.success) {
      return {
        status: 'error',
        message: validation.error.message
      }
    }
    const {room_type_id , customer_detail, price, reservation_id } = validation.data;

    const [roomType] = await sql`
      SELECT
        room_types.name
      FROM
        room_types
      WHERE
        room_types.id = ${room_type_id};
    `

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "promptpay"],
      line_items: 
      [{
        price_data: {
          currency: 'thb',
          unit_amount: price * 100,
          product_data: {
            name: roomType.name
          },
        },
        quantity: 1
      }],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    const [customerID] = await sql`
      INSERT INTO customer_details (first_name, last_name, address, phone_number, email, sub_district, district, province, postcode, special_request)
      VALUES (${customer_detail.first_name}, ${customer_detail.last_name}, ${customer_detail.address}, ${customer_detail.phone_number}, ${customer_detail.email}, ${customer_detail.sub_district}, ${customer_detail.district}, ${customer_detail.province}, ${customer_detail.postcode}, ${customer_detail.special_request || null})
      RETURNING id;
    `;

    await sql`
      UPDATE reservations
      SET 
      customer_id = ${customerID.id},
      stripe_session_id = ${session.id}
      WHERE id = ${reservation_id};
    `

    console.log( session );

    return {
      status : 'success',
      data: {
        session_id: session.id
      }
    }

  })