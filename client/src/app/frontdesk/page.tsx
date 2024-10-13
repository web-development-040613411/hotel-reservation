'use client';
import Frontdesk_Nav from '../../components/frontdesk/nav';
import { useState, useEffect } from 'react';

import Frontdesk_Header from '@/components/frontdesk/header';
import { Reservation } from '@/components/frontdesk/reservation-table';
import ReservationTable from '@/components/frontdesk/reservation-table';
import {
   thisYear,
   thisMonthNumber,
   arrayMoth,
   arrayYear,
   YearPerPage,
   startYear,
} from '@/lib/frontdesk/all-date-function';
import { toast } from 'sonner';

export default function Page() {
   const [roomType, setRoomType] = useState('all');
   const [roomTypeArray, setRoomTypeArray] = useState<string[]>([]);
   const [StateShowAll, setStateShowAll] = useState(false);
   const [searchCustomer, setSearchCustomer] = useState('');
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
   const [roomDataFilter, setRoomDataFilter] = useState({});
   const [roomDataNormal, setRoomDataNormal] = useState({});
   const [roomsData, setRoomData] = useState({});
   const FetchRooms = async () => {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_BACKEND_URL}/frontdesk/all-room`
      );

      if (!res.ok) {
         throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setRoomData(data.data);
      setRoomDataFilter(data.data);
      setRoomDataNormal(data.data);
      setRoomTypeArray(Object.keys(data.data));
   };

   const [reservationData, setReservationData] = useState<Reservation[]>();
   const FetchReservationData = async () => {
      if (searchCustomer === '') {
         setStateShowAll(false);
         const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/frontdesk/reservations?year=${selectedYear}&month=${selectedMonth}`
         );
         if (!res.ok) {
            throw new Error('Network response was not ok');
         }
         const data = await res.json();
         setReservationData(data.data);
      } else {
         setStateShowAll(true);
         const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/frontdesk/reservations?year=${selectedYear}&month=${selectedMonth}&fullname=${searchCustomer}`
         );
         if (!res.ok) {
            throw new Error('Network response was not ok');
         }
         const data = await res.json();
         setReservationData(data.data);
      }
   };

   const Check_in = async (id: string) => {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_BACKEND_URL}/frontdesk/check-in/${id}`,
         {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
         }
      );
      const data = await res.json();

      if (!res.ok) {
         toast.error(data.message);
         return;
      }

      toast.success(data.message);
      FetchReservationData();
   };

   const Check_out = async (id: string) => {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_BACKEND_URL}/frontdesk/check-out/${id}`,
         {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
         }
      );
      const data = await res.json();

      if (!res.ok) {
         toast.error(data.message);
         return;
      }

      toast.success(data.message);
      FetchReservationData();
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

   useEffect(() => {
      if (searchCustomer !== '') {
         const roomTypeFilter = Object.entries(roomDataFilter).map(
            ([key, value]: [any, any]) => {
               if (
                  reservationData?.some(
                     (reservation) => reservation.types_name === key
                  )
               ) {
                  return {
                     [key]: value.filter((room: any) => {
                        return reservationData?.some(
                           (reservation) => reservation.room_id === room.id
                        );
                     }),
                  };
               }
            }
         );

         const filteredRoom = roomTypeFilter.reduce(
            (acc, cur) => ({ ...acc, ...cur }),
            {}
         );

         if (filteredRoom) {
            setRoomData(filteredRoom);
         }
      } else {
         setRoomData(roomDataNormal);
      }
   }, [reservationData]);

   useEffect(() => {
      if (roomType === 'all') {
         setRoomData(roomDataNormal);
      } else {
         const filteredRoom = Object.entries(roomDataNormal).filter(
            ([key]) => key === roomType
         );
         setRoomData(Object.fromEntries(filteredRoom));
      }
   }, [roomType]);

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

   if (!reservationData || !roomsData) {
      return <div>Loading...</div>;
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
               searchCustomer={searchCustomer}
               setSeachCustomer={setSearchCustomer}
               FetchReservationData={FetchReservationData}
               stateShowAll={StateShowAll}
               roomType={roomType}
               setRoomType={setRoomType}
               roomTypeArray={roomTypeArray}
            />
            <ReservationTable
               reservationData={reservationData}
               daysArray={daysArray}
               roomsData={roomsData}
               selectedMonth={selectedMonth}
               selectedYear={selectedYear}
               check_in={Check_in}
               check_out={Check_out}
            />
         </main>
      </div>
   );
}
