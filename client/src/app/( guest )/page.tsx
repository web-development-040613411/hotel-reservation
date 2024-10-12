"use client";

import Image from "next/image"
import FormBooking from "./components/form-booking"
import Step2 from "./components/step-2";
import { ReservationContext, ReservationProvider} from "@/components/context/ReservationContext";
import { cn } from "@/lib/utils";
import {useState } from "react";

export default function Page() {
  const [state, setState] = useState(1);

  return (
    <>
      <ReservationProvider>
        <div id="page1" className={cn('w-100dvh h-100dvh hidden', state == 1 && "block")}>
          {/* <Image
            src="/room.jpg"
            width={500}
            height={500}
            alt="image"
            /> */}
          <div className="md:w-96 w-3/4
                          absolute 
                          top-1/2 -translate-y-1/2
                          left-1/2 -translate-x-1/2">
            <FormBooking setState={setState}/>
          </div>
        </div>

        <div id="page2" className={cn('w-100dvh h-100dvh hidden', state == 2 && "block")}>
          <Step2/>
        </div>
      </ReservationProvider>
    </>
  )
}