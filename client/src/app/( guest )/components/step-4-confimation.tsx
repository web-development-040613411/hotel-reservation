'use client';

import { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReservationContext } from "@/components/context/ReservationContext";
import { formInputs } from "@/app/( guest )/customer-information-model";
import RoomCard from "./room-card";

type Props = {
  setState: (state: number) => void;
};

export default function Step4({ setState }: Props) {
  const { addInformation, information } = useContext(ReservationContext);
  const type = {
    id : information.id,
    type_name : information.type_name,
    detail : information.detail,
    price : information.price,
    picture_path : information.picture_path,
    person : information.person
  }

  console.log( information );

  const onSubmitHandler = (e : any) => {
    e.preventDefault();

    const personalInformation = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      address: e.target[2].value,
      district: e.target[3].value,
      subDistrict: e.target[4].value,
      phoneNumber: e.target[5].value,
      email: e.target[6].value,
      specialRequests: e.target[7].value,
    };

    addInformation(personalInformation);

  }

  const clickHandler = () => {
    setState(2);
  }

  return (
    <>
      <div className="fixed bottom-0 bg-white
                      w-full h-28 border-t-2 border-gray-400 flex items-center p-4 justify-around">
        <div className="w-1/2">
          <p className="font-bold">King Size:
            <span className="text-2xl font-black text-primary"> 5 nights</span>
          </p>
          <p className="font-bold">Total:
            <span className="text-2xl font-black text-primary"> 500 Bath</span>
          </p>
        </div>
        
        <Button
              className=" bg-primary rounded-lg  hover:bg-gray-800 active:bg-gray-800
                          py-6 hover:bg-primary-hover 
                          font-bold text-white"
              type="submit"
            >
              Change room type
        </Button>
      </div>

      <div className="flex justify-center mt-5 mb-5">
        <Card className="w-11/12 shadow-md border-primary shadow-primary m-0 p-8">
          <CardHeader className="p-0">
            <CardDescription className="text-lg">Step 4</CardDescription>
            <CardTitle className="text-primary text-3xl font-black">
              Review
            </CardTitle>
          </CardHeader>

          <form action="" className="my-4 flex flex-col gap-4"
                onSubmit={(e) => onSubmitHandler(e)}>
            {formInputs.map((input, index) => (
              <div
                key={index}
                className="grid w-full max-w-sm items-center gap-1.5"
              >
                <Label htmlFor={input.id}>
                  {input.label} <span className="text-red-500"> *</span>
                </Label>
                <Input
                  type={input.type}
                  id={input.id}
                  placeholder=""
                  name={input.name}
                  className="my-2"
                  required={input.required}
                  value={information[input.key]}
                />
              </div>
            ))}

            <div>
              <Label htmlFor="email">Special Requests</Label>
              <Textarea placeholder="Type your message here." className="my-2" 
                        value={information.specialRequests}/>
            </div>

            <Button
              className=" bg-primary w-full rounded-lg  hover:bg-gray-800 active:bg-gray-800
                                  p-4 hover:bg-primary-hover 
                                  font-bold text-white"
              type="submit"
            >
              Confirm Edit
            </Button>
          </form>
        </Card>
      </div>

      <RoomCard type={type} clickHandler={clickHandler}></RoomCard>

      <div className="h-28">
      
      </div>
    </>
  );
}