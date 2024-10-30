"use client";

import { ReservationContext } from "@/components/context/ReservationContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useContext } from "react";

export default function Page() {
  const { information } = useContext(ReservationContext);

  return (
    <>
      <div
        className="flex flex-col
                      h-dvh
                      items-center justify-center
                      gap-8"
      >
        <svg
          width="285"
          height="214"
          viewBox="0 0 285 214"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.274 95.9339L0.75 120.382L94.6385 213.981L284.25 24.9547L259.726 0.506348L94.6385 165.084L25.274 95.9339Z"
            fill="#29AD32"
          />
        </svg>

        <div className="text-center">
          <h1 className="text-xl font-bold">You are all set.</h1>
          <p>The reservation has send to your email,</p>
          <p>please check your email for more details.</p>
        </div>
      </div>

      <Link href="/">
        <Button
          className=" bg-primary w-11/12 rounded-lg  hover:bg-gray-800 active:bg-gray-800
                      hover:bg-primary
                      my-4
                      font-bold text-white
                      absolute bottom-20 left-1/2 -translate-x-1/2"
          type="button"
        >
          Continue
        </Button>
      </Link>
    </>
  );
}
