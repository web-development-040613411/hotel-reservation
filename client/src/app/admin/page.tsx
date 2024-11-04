import { getCurrentUser } from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import DashboardContent from "./DashboardContent";
import DashboardSkeleton from "./DashboardSkeleton";

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
