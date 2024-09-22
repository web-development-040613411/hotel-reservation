import { sql } from "@/libs/db";
import Elysia, { t } from "elysia";
import { NewCustomerSchema } from "@/libs/validation";

export const customerRoutes = new Elysia({ prefix: "/customers" })
  .post('/', async ({ body, set }) => {
    const validation = NewCustomerSchema.safeParse(body);

    if (!validation.success) {
      set.status = 400;

      return {
        status : 400,
        message : validation.error.errors[0].message
      }
    }

    const { first_name, last_name, address, sub_district_id, district_id, province_id, postal_code, phone_number, email } = body;
    
    await sql`INSERT INTO customers_detail(first_name, last_name, address, sub_district_id, district_id, province_id, postal_code, phone_number, email )
              VALUES (${first_name}, ${last_name}, ${address}, ${sub_district_id}, ${district_id}, ${province_id}, ${postal_code}, ${phone_number}, ${email})`;
    return {
      status : "success",
      message : "customer added successfully."
    }

  }, {
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
    })
  });