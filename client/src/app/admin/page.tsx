import { BedSingle, Coins, NotepadText, UserRound } from "lucide-react";
import { headers } from "next/headers";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import RevenueChart from "./RevenueChart";
import { Suspense } from "react";
import DashboardContent from "./DashboardContent";
import DashboardSkeleton from "./DashboardSkeleton";

interface DashboardData {
  totalBooking: number;
  totalRevenue: number;
  totalGuest: number;
  availableRoom: number;
  soldOutRoom: number;
  offMarketRoom: number;
  revenuePerMonth: {month: string, sum: number }[]
}

async function getDashboardData(): Promise<
  | { status: "error"; message: string }
  | {
      status: "success";
      data: DashboardData;
    }
> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard`,
    {
      headers: headers(),
      cache: "no-store"
    }
  );

  const data = await res.json();

  return data;
}

export default async function AdminPage() {
  const { user } = await getCurrentUser();
  
  if(!user) {
    redirect("/");
  }
  
  return (
    <>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </>
  );
}
