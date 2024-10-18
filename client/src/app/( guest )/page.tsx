"use client";

import Image from "next/image"
import Step1 from "./components/step-1-selcect-date"
import Step2 from "./components/step-2-select-room";
import Step3 from "./components/step-3-input-customer-detail";
import Step4 from "./components/step-4-confimation";
import { ReservationProvider} from "@/components/context/ReservationContext";
import { cn } from "@/lib/utils";
import {useState } from "react";

export default function Page() {
  const [state, setState] = useState(4);

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
            <Step1 setState={setState}/>
          </div>
        </div>

        <div id="page2" className={cn('w-100dvh h-100dvh hidden', state == 2 && "block")}>
          <Step2 setState={setState}/>
        </div>

        <div id="page3" className={cn('w-100dvh h-100dvh hidden', state == 3 && "block")}>
          <Step3 setState={ setState }/>
        </div>

        <div id="page4" className={cn('w-100dvh h-100dvh hidden', state == 4 && "block")}>
          <Step4 setState={ setState }/>
        </div>
      </ReservationProvider>
    </>
  )
}