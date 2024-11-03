import { sql } from "@/libs/db";
import { middleware } from "@/middleware";
import Elysia from "elysia";

export const dashboardRoutes = new Elysia({ prefix: "/dashboard" })
  .use(middleware)
  .get("/", async ({ user }) => {
    const [totalBooking] = await sql`SELECT COUNT(*) FROM reservations`;
    const [totalRevenue] = await sql`SELECT SUM(price) FROM reservations`;
    const [totalGuest] = await sql`SELECT COUNT(customer_id) FROM reservations`;
    const [availableRoom] = await sql`SELECT COUNT(*) FROM rooms WHERE current_status = 'vacant'`;
    const [soldOutRoom] = await sql`SELECT COUNT(*) FROM rooms WHERE current_status = 'occupied'`;
    const [offMarketRoom] = await sql`SELECT COUNT(*) FROM rooms WHERE current_status = 'off_market'`;

    return {
      status: "success",
      data: {
        totalBooking: totalBooking.count,
        totalRevenue: totalRevenue.sum,
        totalGuest: totalGuest.count,
        availableRoom: availableRoom.count,
        soldOutRoom: soldOutRoom.count,
        offMarketRoom: offMarketRoom.count,
      },
    };
  })