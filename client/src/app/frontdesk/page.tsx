'use client';
import Frontdesk_Nav from '../../components/frontdesk/nav';
import { useContext } from 'react';
import Frontdesk_Header from '@/components/frontdesk/header';
import ReservationTable from '@/components/frontdesk/reservation-table';
import {
   UseAllRoom,
   UseAllType,
   UseReservation,
} from '@/hooks/frontdesk/use-reservation';
import FrontDeskContextProvide, { FrontDesk } from '@/context/front-desk';
import { Skeleton } from '@/components/ui/skeleton';

export default function Page() {
   return (
      <FrontDeskContextProvide>
         <Child />
      </FrontDeskContextProvide>
   );
}

function Child() {
   const {
      setRoomsDataFetch,
      setRoomsTypeDataFetch,
      selectedYear,
      selectedMonth,
      setReservationDataFetch,
      searchCustomer,
   }: {
      setRoomsDataFetch: any;
      setRoomsTypeDataFetch: any;
      selectedYear: string;
      selectedMonth: string;
      setReservationDataFetch: any;
      searchCustomer: string;
   } = useContext(FrontDesk);

   const {
      data: roomsData,
      isLoading: roomsLoading,
      isError: roomsError,
   } = UseAllRoom();

   const {
      data: roomsTypeData,
      isLoading: roomsTypeLoading,
      isError: roomsTypeError,
   } = UseAllType();

   const {
      data: reservationData,
      isLoading: reservationLoading,
      isError: reservationError,
   } = UseReservation(selectedYear, selectedMonth, searchCustomer);

   if (reservationError || roomsError || roomsTypeError) {
      return (
         <div>
            <p className="text-2xl font-bold text-red-600">
               Error something went wrong
            </p>
         </div>
      );
   }
   if (roomsData) {
      setRoomsDataFetch(roomsData);
   }
   if (roomsTypeData) {
      setRoomsTypeDataFetch(roomsTypeData);
   }
   if (reservationData) {
      setReservationDataFetch(reservationData);
   }

   return (
      <div>
         <Frontdesk_Nav />

         <main className="p-3">
            {roomsLoading || roomsTypeLoading ? (
               <Skeleton className="mt-3 h-screen w-full rounded-xl" />
            ) : (
               <Frontdesk_Header />
            )}
            {reservationLoading ? (
               <Skeleton className="mt-3 h-screen w-full rounded-xl" />
            ) : (
               <ReservationTable />
            )}
         </main>
      </div>
   );
}
