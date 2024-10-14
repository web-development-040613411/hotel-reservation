import { Suspense } from "react";
import RoomTable from "./RoomTable";
import FilteringSection from "./FilteringSection";

export default async function RoomPage({
  searchParams,
}: {
  searchParams?: { q?: string; status?: string };
}) {
  const q = searchParams?.q || "";
  const status = searchParams?.status || "";

  return (
    <>
      <div className="bg-background w-full h-full rounded-md shadow-md border">
        <div className="p-8">
          <FilteringSection />
          <div className="my-6">
            <Suspense fallback={<>Loading...</>}>
              <RoomTable status={status} query={q} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
