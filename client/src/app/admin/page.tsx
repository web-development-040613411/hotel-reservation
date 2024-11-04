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
