'use client';
import Frontdesk_Nav from '../../components/frontdesk/nav';
import { useContext } from 'react';
import Frontdesk_Header from '@/components/frontdesk/header';
import ReservationTable from '@/components/frontdesk/reservation-table';
import FrontDeskContextProvide, { FrontDesk } from '@/context/front-desk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AllRoomTable from '@/components/frontdesk/allroom-table';
import Skeleton_header from '@/components/frontdesk/skeleton_header';
import Skeleton_table from '@/components/frontdesk/skeleton_table';

export default function Page() {
   const queryClient = new QueryClient();
   return (
      <QueryClientProvider client={queryClient}>
         <FrontDeskContextProvide>
            <Child />
         </FrontDeskContextProvide>
      </QueryClientProvider>
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
         <Frontdesk_Nav />

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
