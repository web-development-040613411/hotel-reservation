import { BedSingle, Coins, NotepadText, UserRound } from "lucide-react";

export default function AdminPage() {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="w-full grid grid-cols-3 gap-10">
          <div className="flex items-center bg-background p-8 border shadow gap-4">
            <div className="bg-primary text-primary-foreground p-2 rounded-md">
              <NotepadText size={32} />
            </div>
            <div>
              <p className="font-bold text-xl">200</p>
              <p>total booking</p>
            </div>
          </div>
          <div className="flex items-center bg-background p-8 border shadow gap-4">
            <div className="bg-primary text-primary-foreground p-2 rounded-md">
              <Coins size={32} />
            </div>
            <div>
              <p className="font-bold text-xl">17k B</p>
              <p>total revenue</p>
            </div>
          </div>
          <div className="flex items-center bg-background p-8 border shadow gap-4">
            <div className="bg-primary text-primary-foreground p-2 rounded-md">
              <UserRound size={32} />
            </div>
            <div>
              <p className="font-bold text-xl">449</p>
              <p>total guest</p>
            </div>
          </div>
        </div>
        <div className="w-full bg-background p-4 border shadow space-y-4">
          <h2 className="text-2xl font-bold">Reservation Stats</h2>
          <div>Graph</div>
        </div>
        <div className="w-full bg-background p-4 border shadow space-y-4">
          <h2 className="text-2xl font-bold">Today</h2>
          <div className="grid grid-cols-3 gap-10">
            <div className="flex items-center bg-background p-8 border shadow gap-4">
              <div className="bg-primary text-primary-foreground p-2 rounded-md">
                <BedSingle size={32} />
              </div>
              <div>
                <p className="font-bold text-xl">120</p>
                <p>available room</p>
              </div>
            </div>
            <div className="flex items-center bg-background p-8 border shadow gap-4">
              <div className="bg-primary text-primary-foreground p-2 rounded-md">
                <BedSingle size={32} />
              </div>
              <div>
                <p className="font-bold text-xl">75</p>
                <p>sold out room</p>
              </div>
            </div>
            <div className="flex items-center bg-background p-8 border shadow gap-4">
              <div className="bg-primary text-primary-foreground p-2 rounded-md">
                <BedSingle size={32} />
              </div>
              <div>
                <p className="font-bold text-xl">5</p>
                <p>off market</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
