'use client';
import Frontdesk_Nav from '../../components/frontdesk/nav';
import { useContext } from 'react';
import Frontdesk_Header from '@/components/frontdesk/header';
import ReservationTable from '@/components/frontdesk/reservation-table';
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
      roomsLoading,
      roomsError,
      roomsTypeLoading,
      roomsTypeError,
      reservationLoading,
      reservationError,
   }: {
      roomsLoading: boolean;
      roomsError: any;
      roomsTypeLoading: boolean;
      roomsTypeError: any;
      reservationLoading: boolean;
      reservationError: any;
   } = useContext(FrontDesk);

   if (reservationError || roomsError || roomsTypeError) {
      return (
         <div>
            <p className="text-2xl font-bold text-red-600">
               Error something went wrong
            </p>
         </div>
      );
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
            {reservationLoading || roomsLoading || roomsTypeLoading ? (
               <Skeleton className="mt-3 h-screen w-full rounded-xl" />
            ) : (
               <ReservationTable />
            )}
         </main>
      </div>
   );
}
