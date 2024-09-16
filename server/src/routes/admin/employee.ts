import { sql } from "@/libs/db";
import Elysia from "elysia";
import { employeeSchema } from "@/libs/validation";
import { set, ZodError } from "zod";

export const employeeRoutes = new Elysia({ prefix: "/employee" })
  .post("/", async ({ body, set }) => {
    try {
      const data = employeeSchema.parse(body);
      const { user_name, firstname, lastname, date_of_birth, password, role } =
        data;
      const employee =
        await sql`INSERT INTO employee (user_name, firstname, lastname, date_of_birth, password, role) VALUES (${user_name}, ${firstname}, ${lastname}, ${date_of_birth}, ${password}, ${role})`;
      return { status: "success", message: "Employee added successfully" };
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        set.status = 400;
        return {
          status: "error",
          message: error.errors[0].message,
        };
      }

      set.status = 500;
      return {
        status: "error",
        message: "Internal server error, please try again later",
      };
    }
  })
  .get("/", async () => {
    const employees = await sql`SELECT * FROM employee`;
    return {
      status: "success",
      employees: employees,
    };
  })
  .get("/id/:id", async ({ params: { id } }) => {
    const employee = await sql`SELECT * FROM employee WHERE id=${id}`;
    return { employee: employee[0] };
  })
  .delete("/id/:id", async ({ params: { id }, set }) => {
    await sql`DELETE FROM employee WHERE id=${id}`;
    return { status: "success", message: "Employee deleted successfully" };
  });
