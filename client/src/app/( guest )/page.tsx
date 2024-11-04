'use client';

import { ReservationProvider } from '@/context/ReservationContext';

import Step2 from './components/step-2-select-room';
import Step3 from './components/step-3-input-customer-detail';
import Step4 from './components/step-4-confimation';
import { ReservationContext } from '@/context/ReservationContext';
import { useContext, useEffect } from 'react';
import ConclusionBar from './components/conclusion-bar';
import { removeReserveRecord } from '@/lib/delete-reserve';
import GuestNav from '@/components/guest/Nav';
import Image from 'next/image';
import landingpic from '@/assets/landingpic.jpg';
import './landing.css';
import LandingPage from './components/landingPage';

export default function Page() {
   return (
      <>
         <ReservationProvider>
            <Child />
         </ReservationProvider>
      </>
   );
}

function Child() {
   const { information, state, setState } = useContext(ReservationContext);
   const { reservationId } = information;

   // 5 minutes
   const timer = 5 * 60 * 1000;

   var userTimeout = setTimeout(() => {
      setState(1);
      if (reservationId) {
         removeReserveRecord(reservationId);
      }

      if (state != 1) {
         alert('You have been inactive for 5 minutes. Please start over.');
      }
   }, timer);

   const resetTimer = () => {
      clearTimeout(userTimeout);

      userTimeout = setTimeout(() => {
         setState(1);
         if (reservationId) {
            removeReserveRecord(reservationId);
         }

         if (state != 1) {
            alert('You have been inactive for 5 minutes. Please start over.');
         }
      }, timer);
   };

   const events = ['mousemove', 'keydown'];

   events.forEach((event) => {
      window.addEventListener(event, () => {
         resetTimer();
      });
   });

   useEffect(() => {
      document.documentElement.scrollTop = 0;
   }, [state]);

   return (
      <>
         {/* <Image
            src="/room.jpg"
            width={500}
            height={500}
            alt="image"
            /> */}

         {state == 1 && (
            <div id="page1">
               <LandingPage />
            </div>
         )}

         {state == 2 && (
            <div id="page2">
               <Step2 />
            </div>
         )}

         {state == 3 && (
            <div id="page3" className="w-full mx-auto max-w-fit p-4">
               <Step3 />
            </div>
         )}

         {state == 4 && (
            <div id="page4" className="w-full mx-auto max-w-fit p-4">
               <Step4 />
            </div>
         )}

         {state == 3 || state == 4 ? <ConclusionBar /> : ''}
      </>
   );
}
