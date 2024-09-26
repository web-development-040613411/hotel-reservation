import { sql } from "@/libs/db";
import { NewCustomerSchema } from "@/libs/validation";
import Elysia from "elysia";

export const customerRoutes = new Elysia({ prefix: "/customers" })
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
      } = validation.data;

      await sql`INSERT INTO customer_details(first_name, last_name, address, sub_district_id, district_id, province_id, postal_code, phone_number, email )
        VALUES (${first_name}, ${last_name}, ${address}, ${sub_district_id}, ${district_id}, ${province_id}, ${postal_code}, ${phone_number}, ${email})`;
      return {
          status: 'success',
          message: 'customer added successfully.',
      };
  }
)