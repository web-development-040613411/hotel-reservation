import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";

type RoomType = {
  type: {
    id: string;
    type_name: string;
    detail: string;
    price: number;
    picture_path: StaticImageData;
    person: number;
  }  

  clickHandler: ( typeId : any ) => void;
}

export default function RoomCard( { type, clickHandler } : RoomType ) {

  return (
    <Card key={type.id} className="shadow-md mb-3 rounded-3xl h-fit overflow-hidden text-sm">
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 content-between">
                    <div className="relative bg-black">
                      <Image
                        src={type.picture_path}
                        layout="fill"
                        className="object-cover rounded-l-xl"
                        alt={`Picture of ${type.type_name}`}
                      />
                    </div>

                    <div className="m-2 
                                   flex flex-col
                                   justify-between gap-4">
                      <h1 className="text-center font-black">
                        {type.type_name}
                      </h1>

                      <p className="text-start indent-8">
                        {type.detail}
                      </p>

                      <div className="">
                        <p className="text-start font-bold">
                          <span>cost / night:</span>
                          <br />
                          <span className="text-primary">
                            &nbsp;{type.price} bath
                          </span>
                        </p>

                        <p className="text-start font-bold">
                          <span>total:</span>

                          <span className="text-primary">
                            &nbsp;{type.price * 3} bath
                          </span>
                        </p>

                        <p className="text-start font-bold">
                          <span>person:</span>

                          <span className="text-primary">
                            &nbsp;{type.person}
                          </span>
                        </p>
                      </div>

                      <Button
                          className=" bg-primary w-full rounded-lg  hover:bg-gray-800 active:bg-gray-800
                                        p-4 hover:bg-primary-hover 
                                        font-bold text-white"
                          onClick={() => clickHandler(type)}
                        >
                          Selected
                        </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
  )
}