"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useContext } from "react";
import logo from '@/assets/logo.png';
import { ReservationContext } from "@/components/context/ReservationContext";
import RoomCard from "./room-card";

//mockup data
const room_type = [
  {
    id: "1",
    type_name: "Queen Room",
    detail:
      "Room with two queen beds, table with chairs, microwave, and a miniature refrigerator.",
    capacity: 2,
    price: 230.5,
    picture_path: logo,
    person : 2
  },
  {
    id: "2",
    type_name: "King Room",
    detail:
      "Room with one king bed, table with chairs, microwave, and a miniature refrigerator.",
    capacity: 4,
    price: 250.5,
    picture_path: logo,
    person : 3
  },
  {
    id: "3",
    type_name: "Suite Room",
    detail:
      "Room with one king bed, sofa bed, table with chairs, microwave, and a miniature refrigerator.",
    capacity: 1,

    price: 300.5,
    picture_path: logo,
    person : 4
  },
];

type Props = {
  setState: ( state : number ) => void;
}

export default function Step2( prop : Props ) {
  // const [room_type_data, set_room_type_data] = useState(room_type);
  // const [selected_room, set_selected_room] = useState(" ");
  // const [number_reservation_date, set_number_reservation_date] = useState(3);

  const { addInformation } = useContext(ReservationContext);
  
  const clickHandler = ( type : any ) => {
    addInformation(type);
    prop.setState(3);
  }

  return (
    <div className="flex justify-center mt-5 mb-5">
      <Card className="w-11/12 shadow-md border-primary shadow-primary m-0 p-0">
        <CardHeader className="p-4">
          <CardDescription className="text-lg">Step 2</CardDescription>
          <CardTitle className="text-primary text-3xl font-black">
            Choose Room Type
          </CardTitle>
        </CardHeader>

        <CardContent className="flex justify-center m-0 pb-1">
          <div className="">
            {room_type.map((type) => (
              <RoomCard key={type.id} type={type} clickHandler={clickHandler}/>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
