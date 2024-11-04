import Link from "next/link";
import { Suspense } from "react";
import RoomTable from "./RoomTable";
import { RoomTopSection, RoomTypeTopSection } from "./TopSection";
import { cn } from "@/lib/utils";
import RoomTypeTable from "./RoomTypeTable";

export default async function RoomPage({
  searchParams,
}: {
  searchParams?: { q?: string; status?: string; tab?: string };
}) {
  const q = searchParams?.q || "";
  const status = searchParams?.status || "";
  const tab = searchParams?.tab === "room-type" ? "room-type" : "room";

  return (
    <>
      <div className="w-full flex text-center font-bold text-lg bg">
        <Link
          href={`/admin/room?tab=room`}
          className={cn("grow border-b-2 pb-2", {
            "text-primary border-primary": tab === "room",
          })}
        >
          Room
        </Link>
        <Link
          href={`/admin/room?tab=room-type`}
          className={cn("grow border-b-2 pb-2", {
            "text-primary border-primary": tab === "room-type",
          })}
        >
          Room type
        </Link>
      </div>
      <div className="bg-background w-full h-full rounded-md shadow-md border mt-8">
        <div className="p-8">
          {tab === "room-type" ? (
            <>
              <RoomTypeTopSection />
              <div className="my-6">
                <Suspense fallback={<>Loading...</>}>
                  <RoomTypeTable query={q} />
                </Suspense>
              </div>
            </>
          ) : (
            <>
              <RoomTopSection />
              <div className="my-6">
                <Suspense fallback={<>Loading...</>}>
                  <RoomTable status={status} query={q} />
                </Suspense>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}