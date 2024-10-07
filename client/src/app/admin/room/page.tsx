import { headers } from "next/headers";
import RoomTable from "./RoomTable";

async function getRoom() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/rooms`, {
    headers: headers(),
  });

  return res.json();
}

export default async function RoomPage() {
  const result = await getRoom();

  return (
    <>
    <div className="bg-background w-full h-full rounded-md shadow-md border">
      <div className="p-8">
        <RoomTable room={result.data}/>
      </div>
    </div>
    </>
  );
}
