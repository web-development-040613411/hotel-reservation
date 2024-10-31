"use client";

import { createContext, useState } from "react";

type ReservationContextType = {
  information: any;
  addInformation: (data: any) => void;
  state: number;
  setState: (state: number) => void;
};

export const ReservationContext = createContext<ReservationContextType>({
  information: {},
  addInformation: () => {},
  state: 1,
  setState: () => {},
});

export const ReservationProvider = ({ children }: { children: any }) => {
  const [information, setInformation] = useState({
    dateRange: {
      from: "Thu Oct 31 2024 18:42:01 GMT+0700 (Indochina Time)",
      to: "Sun Nov 03 2024 00:00:00 GMT+0700 (Indochina Time)",
    },
    stayNight: 2,
  });
  const [state, setState] = useState(2);

  const addInformation = (data: any) => {
    setInformation((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  };

  return (
    <ReservationContext.Provider
      value={{ information, addInformation, state, setState }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
