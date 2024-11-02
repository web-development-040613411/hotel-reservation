import React, { useContext } from 'react';
import {
   TableSticky,
   TableHeader,
   TableRow,
   TableHead,
   TableBody,
   TableCell,
} from '@/components/ui/table';
import Reservation_detail_modal from './reservation-detail-modal';
import { FrontDesk } from '@/context/front-desk';

import { allRooms, Reservation, Room } from '@/lib/frontdesk/type';

export default function ReservationTable() {
   const {
      roomsDataFilter,
      roomType,
      selectedYear,
      selectedMonth,
      daysArray,
      reservationDataFetch,
      searchCustomer,
      stateShowAll,
   }: {
      roomsDataFilter: allRooms;

      roomType: string;
      selectedYear: string;
      selectedMonth: number;
      daysArray: string[];
      searchCustomer: string;
      stateShowAll: boolean;
      reservationDataFetch: Reservation[];
   } = useContext(FrontDesk);

   if (!roomsDataFilter) return null;

   const roomsData = Object.fromEntries(
      Object.entries(roomsDataFilter as allRooms)?.filter(([key]) => {
         if (roomType === 'all') return true;
         return key === roomType;
      })
   );

   const checkAvailableRooms = (
      day: number,
      roomType: string,
      searchCustomer: string
   ) => {
      if (searchCustomer != '' && stateShowAll) return '-';
      const thisColDate = new Date(
         `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(
            day
         ).padStart(2, '0')}`
      );
      const ThisTypeReservation = reservationDataFetch?.filter(
         (reservation: any) =>
            reservation.types_name === roomType &&
            new Date(reservation.check_in) <= thisColDate &&
            new Date(reservation.check_out) >= thisColDate
      );

      const ThisTypeRoom = roomsData[roomType].filter(
         (room: Room) =>
            room.current_status === 'vacant' ||
            room.current_status === 'occupied' ||
            room.current_status === 'departing'
      );
      const availableRooms = ThisTypeRoom.length - ThisTypeReservation?.length;
      return availableRooms;
   };

   return (
      <TableSticky className="table-fixed mt-3 w-full relative">
         <TableHeader className="sticky top-0 bg-white border">
            <TableRow className="border">
               <TableHead className="w-28 text-center border-b text-white bg-blue-600">
                  <b>Rooms Types</b>
               </TableHead>

               {daysArray.map((date: any, index: any) => (
                  <TableHead
                     key={`date-${index}`}
                     className="text-center border text-black w-10"
                  >
                     <b>{date}</b>
                     <br />{' '}
                     {index + 1 < 10 ? (
                        <>{'0' + (index + 1)}</>
                     ) : (
                        <> {index + 1}</>
                     )}
                  </TableHead>
               ))}
            </TableRow>
         </TableHeader>
         <TableBody>
            {Object.entries(roomsData as allRooms)?.map(
               ([roomTypes, rooms]: [string, Room[]], index) => {
                  return (
                     <React.Fragment key={`roomTypes-${index}`}>
                        <TableRow key={`room-type-row-${roomTypes}`}>
                           <TableCell className="w-28 text-center border text-black font-bold">
                              {roomTypes}
                           </TableCell>

                           {Array.from({ length: daysArray.length }).map(
                              (_, i) => (
                                 <TableCell
                                    key={`room-type-${roomTypes}-${i}`}
                                    className="text-center border"
                                 >
                                    {checkAvailableRooms(
                                       i + 1,
                                       roomTypes,
                                       searchCustomer
                                    ) === 0 ? (
                                       <p
                                          className="bg-gray-600
                                        text-white py-1 rounded-md text-center"
                                       >
                                          {checkAvailableRooms(
                                             i + 1,
                                             roomTypes,
                                             searchCustomer
                                          )}
                                       </p>
                                    ) : (
                                       <p className="bg-green-600 text-white py-1 rounded-md text-center">
                                          {checkAvailableRooms(
                                             i + 1,
                                             roomTypes,
                                             searchCustomer
                                          )}
                                       </p>
                                    )}
                                 </TableCell>
                              )
                           )}
                        </TableRow>
                        {rooms.map((room: Room) => {
                           const thisRoomReservations =
                              reservationDataFetch?.filter(
                                 (reservation: any) =>
                                    reservation.room_id === room.id
                              );

                           return (
                              <TableRow key={`room-row-${room.id}`}>
                                 <TableCell
                                    key={`room-cell-${room.id}`}
                                    className="w-28 text-start border text-black"
                                 >
                                    {room.current_status === 'vacant' ? (
                                       <div className="flex items-center">
                                          <p className="p-2 bg-green-500 mr-2 rounded-md"></p>
                                          <span>{' ' + room.number}</span>
                                       </div>
                                    ) : room.current_status === 'occupied' ? (
                                       <div className="flex items-center">
                                          <p className="p-2 bg-amber-500 mr-2 rounded-md"></p>
                                          <span>{' ' + room.number}</span>
                                       </div>
                                    ) : room.current_status === 'departing' ? (
                                       <div className="flex items-center">
                                          <p className="p-2 bg-sky-500 mr-2 rounded-md"></p>
                                          <span>{' ' + room.number}</span>
                                       </div>
                                    ) : (
                                       <div className="flex items-center">
                                          <p className="p-2 bg-gray-500 mr-2 rounded-md"></p>
                                          <span>{' ' + room.number}</span>
                                       </div>
                                    )}
                                 </TableCell>
                                 {(() => {
                                    const cells = [];
                                    for (let i = 0; i < daysArray.length; i++) {
                                       const thisColDays = i + 1;
                                       const thisColDate = new Date(
                                          `${selectedYear}-${String(
                                             selectedMonth
                                          ).padStart(2, '0')}-${String(
                                             thisColDays
                                          ).padStart(2, '0')}`
                                       );

                                       const thisReservation =
                                          thisRoomReservations?.find(
                                             (reservation: any) =>
                                                new Date(
                                                   reservation.check_in
                                                ) <= thisColDate &&
                                                new Date(
                                                   reservation.check_out
                                                ) >= thisColDate
                                          );

                                       if (thisReservation) {
                                          let endSpan = 1;
                                          const checkOutDate = new Date(
                                             thisReservation.check_out
                                          );

                                          if (checkOutDate >= thisColDate) {
                                             const timeDiff =
                                                checkOutDate.getTime() -
                                                thisColDate.getTime();
                                             const dayDiff = Math.ceil(
                                                timeDiff / (1000 * 3600 * 24)
                                             );
                                             endSpan = Math.min(
                                                dayDiff + 1,
                                                daysArray.length - i
                                             );
                                          }

                                          cells.push(
                                             <TableCell
                                                key={`reservation-cell-${thisReservation.reservations_id}-${i}`}
                                                className="border p-0"
                                                colSpan={endSpan}
                                             >
                                                <Reservation_detail_modal
                                                   thisReservation={
                                                      thisReservation
                                                   }
                                                />
                                             </TableCell>
                                          );

                                          i = i + endSpan - 1;
                                       } else {
                                          cells.push(
                                             <TableCell
                                                key={`empty-cell-${room.id}-${i}`}
                                                className="w-40 text-start border "
                                             ></TableCell>
                                          );
                                       }
                                    }
                                    return cells;
                                 })()}
                              </TableRow>
                           );
                        })}
                     </React.Fragment>
                  );
               }
            )}
         </TableBody>
      </TableSticky>
   );
}
