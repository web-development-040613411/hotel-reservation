"use client";

import { ReservationProvider } from "@/context/ReservationContext";

import Step1 from "./components/step-1-select-date";
import Step2 from "./components/step-2-select-room";
import Step3 from "./components/step-3-input-customer-detail";
import Step4 from "./components/step-4-confimation";
import { ReservationContext } from "@/context/ReservationContext";
import { useContext, useEffect } from "react";
import ConclusionBar from "./components/conclusion-bar";

export default function Page() {
  return (
    <>
      <ReservationProvider>
        <Child />
      </ReservationProvider>
    </>
  );
}

function Child() {
  const { information, state, setState } = useContext(ReservationContext);

  const removePreserveReservation = async () => {
    const formData = new FormData();
    formData.append("reservation_id", information.reservationId);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/guest/rooms/preserve`,
      {
        method: "DELETE",
        body: formData,
      }
    );
    return response;
  };

  // 5 minutes
  const timer = 5 * 60 * 1000;

  var userTimeout = setTimeout(() => {
    setState(1);
    if (information.reservationId) {
      removePreserveReservation();
    }
  }, timer);

  const resetTimer = () => {
    clearTimeout(userTimeout);

    userTimeout = setTimeout(() => {
      setState(1);
      if (information.reservationId) {
        removePreserveReservation();
      }
    }, timer);
  };

  const events = ["mousemove", "keydown"];

  events.forEach((event) => {
    window.addEventListener(event, () => {
      resetTimer();
    });
  });

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [state]);

  return (
    <>
      <div className="w-dvh h-dvh">
        {/* <Image
            src="/room.jpg"
            width={500}
            height={500}
            alt="image"
            /> */}

        {state == 1 && (
          <div id="page1">
            <div
              className="md:w-96 w-3/4
                            absolute 
                            top-1/2 -translate-y-1/2
                            left-1/2 -translate-x-1/2"
            >
              <Step1 />
            </div>
          </div>
        )}

        {state == 2 && (
          <div id="page2">
            <Step2 />
          </div>
        )}

        {state == 3 && (
          <div id="page3" className="w-full mx-auto max-w-fit p-4">
            <Step3 />
          </div>
        )}

        {state == 4 && (
          <div id="page4" className="w-full mx-auto max-w-fit p-4">
            <Step4 />
          </div>
        )}
        
        {
          state == 3 || state == 4 ? <ConclusionBar /> : ""
        }
      </div>
    </>
  );
}
