"use client";

import { useContext, useState } from "react";
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
import { loadStripe } from '@stripe/stripe-js';
import ConclusionBar from "./conclusion-bar";
import PersonalInformationForm from "./personal-information-form";
import StepHeader from "./header";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function Step4() {
  const { addInformation, information, state, setState } = useContext(ReservationContext);
  const [isChange, setIsChange] = useState(false);
  const title = "Review";
  const step = 4;

  const { roomType, personalInformation, reservationId } = information;
  const { type_id : roomTypeId } = roomType;

  const onSubmitHandler = (e: any) => {
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
  };

  const  checkOut = async () => {
    const stripe = await stripePromise;
    const totalPrice = roomType.total_price;
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stripe/checkout`, {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        roomTypeId,
        totalPrice,
        personalInformation,
        reservationId,
      })
    });

    const data = await response.json();
    const sessionId = data.data.session_id;

    stripe!.redirectToCheckout({ sessionId });
  }

  const clickHandler = () => {
    setState(2);
  };

  return (
    <>
      <ConclusionBar/>

      <div className="flex justify-center my-4">
        <Card className="w-11/12 shadow-md border-primary shadow-primary m-0 p-8">
          <StepHeader title={title} step={step}/>

          <PersonalInformationForm/>
        </Card>
      </div>

      <div className="p-8">
        <RoomCard type={roomType} clickHandler={clickHandler} state={state} />
        <Button
          className=" bg-primary w-full rounded-lg  hover:bg-gray-800 active:bg-gray-800
                                    hover:bg-primary
                                    my-4
                                    font-bold text-white"
          type="button"
          onClick={() => checkOut() }
        >
          Make Payment
        </Button>
      </div>

      <div className="h-28"></div>
    </>
  );
}
