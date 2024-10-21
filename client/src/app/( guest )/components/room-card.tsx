import { RoomType } from "@/components/interface/RoomType";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  type: RoomType;
  clickHandler: (type: RoomType) => void;
  state?: number;
};

export default function RoomCard({ type, clickHandler, state }: Props) {
  return (
    <Card className="shadow-md mb-3 rounded-3xl h-fit overflow-hidden text-sm">
      <CardContent className="p-0">
        <div className="grid grid-cols-2 content-between">
          <div className="relative bg-black">
            {/* <Image
                        src={type.picture_path ? type.picture_path : ""}
                        layout="fill"
                        className="object-cover rounded-l-xl"
                        alt={`Picture of ${type.type_name}`}
                      /> */}
          </div>

          <div
            className="m-2 
                                   flex flex-col
                                   justify-between gap-4"
          >
            <h1 className="text-center font-black">{type.name}</h1>

            <p className="text-start indent-8">{type.detail}</p>

            <div className="">
              <p className="text-start font-bold">
                <span>cost / night:</span>
                <br />
                <span className="text-primary">&nbsp;{type.price} bath</span>
              </p>

              <p className="text-start font-bold">
                <span>total:</span>

                <span className="text-primary">
                  &nbsp;{type.total_price} bath
                </span>
              </p>
            </div>

            {state != 4 && (
              <Button
                className=" bg-primary w-full rounded-lg  hover:bg-gray-800 active:bg-gray-800
                                        p-4 hover:bg-primary-hover 
                                        font-bold text-white"
                onClick={() => clickHandler(type)}
              >
                Selected
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
