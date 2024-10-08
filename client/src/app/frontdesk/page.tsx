'use client';
import Frontdesk_Nav from '../../components/frontdesk/nav';
import { useState, Fragment, useEffect } from 'react';

import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';

import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import Frontdesk_Header from '@/components/frontdesk/header';

const thisYear = new Date().getFullYear();
const thisMonthNumber = new Date().getMonth() + 1;
const startYear = 2023;
const endYear = thisYear + 22;
const YearPerPage = 8;
const arrayYear = Array.from(
   { length: endYear - startYear + 1 },
   (_, i) => startYear + i
);
const arrayMoth = [
   'January',
   'February',
   'March',
   'April',
   'May',
   'June',
   'July',
   'August',
   'September',
   'October',
   'November',
   'December',
];

type Reservation = {
   reservations_id: string;
   customer_id: string;
   first_name: string;
   last_name: string;
   address: string;
   email: string;
   phone_number: string;
   sub_district: string | null; // Nullable fields can be represented as union types
   district: string | null;
   province: string | null;
   postcode: string | null;
   room_number: string;
   price: number;
   room_id: string;
   check_in: Date; // ISO date string, consider using Date type if you parse it
   check_out: Date; // ISO date string, consider using Date type if you parse it
   display_color: string;
   transaction_status: 'complete' | 'pending' | 'canceled'; // Specify allowed statuses if known
   createAt: string; // ISO date string, consider using Date type if you parse it
   current_status: 'vacant' | 'occupied'; // Specify allowed statuses if known
   types_name: string;
   capacity: number;
   detail: string;
   picture_path: string;
   price_per_night: number;
}[];

export default function Page() {
   const [selectedYear, setSelectedYear] = useState(thisYear.toString());
   const [selectedMonth, setSelectedMonth] = useState(thisMonthNumber);
   const [startYearIndex, setStartYearIndex] = useState(0);
   const [selectedDate, setSelectedDate] = useState(
      new Date(`${selectedYear}-${selectedMonth}-01`)
   );
   const [numberOfDays, setNumberOfDays] = useState(
      new Date(
         selectedDate.getFullYear(),
         selectedDate.getMonth() + 1,
         0
      ).getDate()
   );
   const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

   const [daysArray, setDayArray] = useState(
      Array.from({ length: numberOfDays }, (_, i) => {
         const date = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            i + 1
         );
         return dayNames[date.getDay()];
      })
   );

   const [roomsData, setRoomData] = useState({});
   const FetchRooms = async () => {
      const res = await fetch(`http://localhost:3001/frontdesk/all-room`);
      if (!res.ok) {
         throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setRoomData(data.data);
   };

   const [reservationData, setReservationData] = useState<Reservation>();
   const FetchReservationData = async () => {
      const res = await fetch(
         `http://localhost:3001/frontdesk/reservations?year=2024&month=10`
      );
      if (!res.ok) {
         throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setReservationData(data.data);
   };

   useEffect(() => {
      const date = new Date(`${selectedYear}-${selectedMonth}-01`);
      setSelectedDate(date);

      const daysInMonth = new Date(
         date.getFullYear(),
         date.getMonth() + 1,
         0
      ).getDate();
      setNumberOfDays(daysInMonth);

      const days = Array.from({ length: daysInMonth }, (_, i) => {
         const currentDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            i + 1
         );
         return dayNames[currentDate.getDay()];
      });
      setDayArray(days);
      FetchRooms();
      FetchReservationData();
   }, [selectedYear, selectedMonth]);

   const changeSelectedYear = (value: any) => {
      if (value === 'prev' || value === 'next') return;
      setSelectedYear(value);
   };

   const changeSelectedMonth = (value: any) => {
      if (value === 'prev') {
         if (selectedMonth === 1) {
            if (parseInt(selectedYear) === startYear) return;
            setSelectedYear((parseInt(selectedYear) - 1).toString());
            setSelectedMonth(12);
         } else {
            setSelectedMonth(selectedMonth - 1);
         }
      } else if (value === 'next') {
         if (selectedMonth === 12) {
            if (parseInt(selectedYear) === thisYear + 22) return;
            setSelectedYear((parseInt(selectedYear) + 1).toString());
            setSelectedMonth(1);
         } else {
            setSelectedMonth(selectedMonth + 1);
         }
      } else {
         setSelectedMonth(parseInt(value));
      }
   };

   const prevYearSet = () => {
      if (startYearIndex > 0) {
         setStartYearIndex(startYearIndex - YearPerPage);
      }
   };

   const nextYearSet = () => {
      if (startYearIndex + YearPerPage < arrayYear.length) {
         setStartYearIndex(startYearIndex + YearPerPage);
      }
   };

   if (!reservationData) {
      return;
   }

   return (
      <div>
         <Frontdesk_Nav />

         <main className="p-3">
            <Frontdesk_Header
               arrayMoth={arrayMoth}
               YearPerPage={YearPerPage}
               arrayYear={arrayYear}
               changeSelectedMonth={changeSelectedMonth}
               changeSelectedYear={changeSelectedYear}
               nextYearSet={nextYearSet}
               prevYearSet={prevYearSet}
               selectedMonth={selectedMonth}
               selectedYear={selectedYear}
               startYearIndex={startYearIndex}
            />
            {/* {reservationData.map((e) => (
               <div>
                  {e.room_number +
                     ' ' +
                     new Date(e.check_in).toDateString() +
                     ' ' +
                     e.first_name}
               </div>
            ))} */}

            <Table className="table-fixed mt-3 w-full">
               <TableHeader className="border-2 ">
                  <TableRow>
                     <TableHead className="w-28 text-center border-2 text-black bg-blue-50">
                        <b>Rooms Types</b>
                     </TableHead>

                     {daysArray.map((date, index) => (
                        <TableHead
                           key={index}
                           className="text-center border-2 text-black w-10"
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
                  {Object.entries(roomsData).map(
                     ([roomTypes, rooms]: [string, any], index) => (
                        <>
                           <TableRow key={index}>
                              <TableCell
                                 key={index}
                                 className="w-28 text-center border-2 text-black font-bold"
                              >
                                 {roomTypes}
                              </TableCell>

                              {Array.from({
                                 length: daysArray.length,
                              }).map((_, i) => (
                                 <TableCell
                                    key={i}
                                    className="text-center border-2 text-black"
                                 >
                                    <p className="bg-blue-700 text-white py-2 rounded-md">
                                       {0}
                                    </p>
                                 </TableCell>
                              ))}
                           </TableRow>

                           {rooms.map((room: any, index: any) => {
                              const thisRoomReservations =
                                 reservationData.filter(
                                    (reservation) =>
                                       reservation.room_id === room.id
                                 );
                              let foundReservation = 0;

                              return (
                                 <TableRow key={index}>
                                    <TableCell
                                       key={index}
                                       className="w-28 text-start border-2 text-black"
                                    >
                                       <div className="flex items-center">
                                          <p className="p-2 bg-green-800 mr-2 rounded-md"></p>
                                          <span>{' ' + room.number}</span>
                                       </div>
                                    </TableCell>

                                    {(() => {
                                       const cells = [];
                                       for (
                                          let i = 0;
                                          i < daysArray.length;
                                          i++
                                       ) {
                                          const thisColDays = i + 1;
                                          const thisColDate = new Date(
                                             `${selectedYear}-${String(
                                                selectedMonth
                                             ).padStart(2, '0')}-${String(
                                                thisColDays
                                             ).padStart(2, '0')}`
                                          );

                                          const thisReservation =
                                             thisRoomReservations.find(
                                                (reservation) =>
                                                   new Date(
                                                      reservation.check_in
                                                   ).toDateString() ===
                                                   thisColDate.toDateString()
                                             );

                                          if (thisReservation) {
                                             console.log(
                                                thisReservation.room_number
                                             );

                                             // คำนวณ endSpan เพื่อหาว่าจองกี่วัน
                                             let endSpan = 1;
                                             const checkInDate = new Date(
                                                thisReservation.check_in
                                             );
                                             const checkOutDate = new Date(
                                                thisReservation.check_out
                                             );

                                             if (checkOutDate >= thisColDate) {
                                                // คำนวณจำนวนวันที่ครอบคลุม
                                                const timeDiff =
                                                   checkOutDate.getTime() -
                                                   thisColDate.getTime();
                                                const dayDiff = Math.ceil(
                                                   timeDiff / (1000 * 3600 * 24)
                                                ); // แปลงเป็นวัน
                                                endSpan = Math.min(
                                                   dayDiff,
                                                   daysArray.length - i
                                                ); // ตรวจสอบไม่ให้เกินจำนวนวันทั้งหมดในเดือน
                                             }

                                             // ข้ามวันตาม endSpan ที่คำนวณได้
                                             i = i + endSpan - 1;

                                             cells.push(
                                                // <Dialog>
                                                //    <DialogTrigger className="w-full">
                                                //       <TableCell
                                                //          className={`w-40 text-start border-2 rounded-md bg-green-500`}
                                                //          key={i}
                                                //          colSpan={endSpan}
                                                //       >
                                                //          {
                                                //             thisReservation.first_name
                                                //          }
                                                //       </TableCell>
                                                //    </DialogTrigger>
                                                //    <DialogContent>
                                                //       <DialogHeader>
                                                //          <DialogTitle>
                                                //             Are you absolutely
                                                //             sure?
                                                //          </DialogTitle>
                                                //          <DialogDescription>
                                                //             This action cannot
                                                //             be undone. This will
                                                //             permanently delete
                                                //             your account and
                                                //             remove your data
                                                //             from our servers.
                                                //          </DialogDescription>
                                                //       </DialogHeader>
                                                //    </DialogContent>
                                                // </Dialog>

                                                <TableCell
                                                   className={`w-40 text-start border-2 rounded-md bg-green-500`}
                                                   key={i}
                                                   colSpan={endSpan}
                                                >
                                                   {thisReservation.first_name}
                                                </TableCell>
                                             );
                                          } else {
                                             cells.push(
                                                <TableCell
                                                   className="w-40 text-start border-2 "
                                                   key={i}
                                                >
                                                   {' '}
                                                </TableCell>
                                             );
                                          }
                                       }
                                       return cells;
                                    })()}
                                 </TableRow>
                              );
                           })}
                        </>
                     )
                  )}
               </TableBody>
            </Table>
         </main>
      </div>
   );
}
