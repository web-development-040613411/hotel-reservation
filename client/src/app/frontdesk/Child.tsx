"use client";

import AllRoomTable from '@/components/frontdesk/allroom-table';
import Frontdesk_Header from '@/components/frontdesk/header';
import ReservationTable from '@/components/frontdesk/reservation-table';
import Skeleton_header from '@/components/frontdesk/skeleton_header';
import Skeleton_table from '@/components/frontdesk/skeleton_table';
import { FrontDesk } from '@/context/front-desk';
import { useContext } from 'react';

export default function Child() {
   const {
      roomsLoading,
      roomsError,
      roomsTypeLoading,
      roomsTypeError,
      reservationLoading,
      reservationError,
   }: {
      roomsLoading: boolean;
      roomsError: boolean;
      roomsTypeLoading: boolean;
      roomsTypeError: boolean;
      reservationLoading: boolean;
      reservationError: boolean;
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
         <main className="p-3 ">
            {roomsLoading || roomsTypeLoading ? (
               <Skeleton_header />
            ) : (
               <Frontdesk_Header />
            )}
            {reservationLoading || roomsLoading || roomsTypeLoading ? (
               <Skeleton_table />
            ) : (
               <div className="relative w-full ">
                  <AllRoomTable />
                  <ReservationTable />
               </div>
            )}
         </main>
      </div>
   );
}
