"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

//mockup data
const room_type = [
  {
    id: "1",
    type_name: "Queen Room",
    detail:
      "Room with two queen beds, table with chairs, microwave, and a miniature refrigerator.",
    capacity: 2,
    price: 230.5,
    picture_path: "queen.jpg",
  },
  {
    id: "2",
    type_name: "King Room",
    detail:
      "Room with one king bed, table with chairs, microwave, and a miniature refrigerator.",
    capacity: 4,
    price: 250.5,
    picture_path: "king.jpg",
  },
  {
    id: "3",
    type_name: "Suite Room",
    detail:
      "Room with one king bed, sofa bed, table with chairs, microwave, and a miniature refrigerator.",
    capacity: 1,

    price: 300.5,
    picture_path: "suite.jpg",
  },
];

export default function Home() {
  const [room_type_data, set_room_type_data] = useState(room_type);
  const [selected_room, set_selected_room] = useState(" ");
  const [number_reservation_date, set_number_reservation_date] = useState(3);

  const select_room = (type_id: string, type_name: string) => () => {
    if (type_id != undefined && type_name != undefined) {
      set_selected_room(type_name);
      localStorage.setItem("room_type", type_id);
      localStorage.setItem("room_type_name", type_name);
    }
  };

  return (
    <div className="flex justify-center mt-5 mb-5">
      <Card className="w-11/12 shadow-md border-primary shadow-primary m-0 p-0">
        <CardHeader className="p-3">
          <CardDescription>Step 2</CardDescription>
          <CardTitle className="text-primary">
            <b>Room and Rates</b>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex justify-center m-0 px-3 pb-1">
          <div className="flex flex-col w-full">
            {room_type_data.map((type) => (
              <Card key={type.id} className="shadow-md mb-3 rounded-xl">
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 content-between">
                    <div className="relative h-56">
                      <Image
                        src={`/${type.picture_path}`}
                        layout="fill"
                        className="object-cover rounded-l-xl"
                        alt={`Picture of ${type.type_name}`}
                      />
                    </div>
                    <div className="m-2 flex flex-col justify-between">
                      <div>
                        <p className="text-center font-bold">
                          <b>{type.type_name}</b>
                        </p>
                        <p className="text-start indent-8 text-xs">
                          {type.detail}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-start">
                          <b>Nights : {type.price} $</b>
                        </p>
                        <p className="text-sm text-start mb-1">
                          <b>
                            Total : {type.price * number_reservation_date} $
                          </b>
                        </p>
                        {selected_room == type.type_name ? (
                          <Button
                            className=" bg-gray-800 w-full rounded-full hover:bg-gray-800 active:bg-gray-800"
                            onClick={select_room(type.id, type.type_name)}
                          >
                            <b>Selected</b>
                          </Button>
                        ) : (
                          <Button
                            className="w-full rounded-full hover:bg-gray-800 active:bg-gray-800"
                            onClick={select_room(type.id, type.type_name)}
                          >
                            <b>Book Now</b>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
