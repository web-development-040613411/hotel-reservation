'use client';
import Frontdesk_Nav from '../../components/frontdesk/nav';
import { useState, useEffect } from 'react';

import Frontdesk_Header from '@/components/frontdesk/header';
import { Reservation } from '@/components/frontdesk/reservation-table';
import ReservationTable from '@/components/frontdesk/reservation-table';

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
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_BACKEND_URL}/frontdesk/all-room`
      );

      if (!res.ok) {
         throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setRoomData(data.data);
   };

   const [reservationData, setReservationData] = useState<Reservation[]>();
   const FetchReservationData = async () => {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_BACKEND_URL}/frontdesk/reservations?year=${selectedYear}&month=${selectedMonth}`
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
            <ReservationTable
               reservationData={reservationData}
               daysArray={daysArray}
               roomsData={roomsData}
               selectedMonth={selectedMonth}
               selectedYear={selectedYear}
            />
         </main>
      </div>
   );
}
