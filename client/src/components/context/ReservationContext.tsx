'use client';

import { createContext, useState } from "react";
import { DateRange } from "react-day-picker";

type ReservationContextType = {
  information: any;
  addInformation: ( data : any ) => void;
}

export const ReservationContext = createContext<ReservationContextType>( {
  information: {},
  addInformation: () => {},
} );

export const ReservationProvider = ({ children } : {
  children: any
} ) => {
  const [ information, setInformation ] = useState( {} );

  const addInformation = ( data : any )  => {
    setInformation( ( prev ) => {
      return {
        ...prev,
        ...data
      }
    } );
  }

  return (
    <ReservationContext.Provider value={{information, addInformation }}>
      {children}
    </ReservationContext.Provider>
  )
};