import { Suspense } from "react";
import EmployeeTable from "./EmployeeTable";
import TopSection from "./TopSection";

export default function EmployeePage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const q = searchParams?.q || "";

  return (
    <div className="bg-background w-full h-full rounded-md shadow-md border p-8">
      <TopSection />
      <div className="my-8">
        <Suspense>
          <EmployeeTable query={q} />
        </Suspense>
      </div>
    </div>
  );
}
