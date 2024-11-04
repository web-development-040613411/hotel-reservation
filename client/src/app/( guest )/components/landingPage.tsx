import GuestNav from '@/components/guest/Nav';
import React from 'react';
import Image from 'next/image';
import landingpic from '@/assets/landingpic.jpg';
import Step1 from './step-1-select-date';
import { RoomTypeCarousel } from './roomtype-carousel';
import GuestFooter from '@/components/guest/footer';
import { useQueryClient } from '@tanstack/react-query';
import { UseAllRoomTypes } from '@/hooks/guest/room-types';

function LandingPage() {
   const { data, isLoading, isError } = UseAllRoomTypes();
   const scrollToSection = (id: any) => {
      const element = document.getElementById(id);
      if (element) {
         element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
   };
   return (
      <main>
         {' '}
         <header>
            <GuestNav scrollIntoView={scrollToSection} />
         </header>
         <section>
            <div className="w-full relative h-72">
               <Image
                  src={landingpic}
                  layout="fill"
                  className="object-cover fade-transparent"
                  alt={`Picture of Landing Page`}
               />
            </div>
            <div
               className="md:w-96 w-3/4
                relative 
                top-1/2 -translate-y-1/2
                left-1/2 -translate-x-1/2"
               id="reservation"
            >
               <Step1 />
            </div>
            <article className="w-full" id="about">
               <h1 className="text-3xl text-center font-bold">
                  Welcome To Mof Hotel
               </h1>
               <p
                  className="indent-8
                    text-lg
                    font-light
                    m-4
               "
               >
                  {' '}
                  is where comfort meets true relaxation! Inspired by the
                  friendship of Mok, Ohm, and Fiw, Mof Hotel blends warmth and
                  modern convenience, creating a space that feels like home.
                  Located in the heart of the city, enjoy stylish rooms,
                  delectable dining, and dedicated service from our friendly
                  team. Become part of the Mof Hotel family and make
                  unforgettable memories with us.
               </p>
            </article>
         </section>
         <section id="roomtype">
            <h1 className="text-3xl mb-3 text-center font-bold">
               {'Our Rooms'}
            </h1>
            <div className=" flex w-full justify-center pr-10 pl-10 items-center">
               {' '}
               <RoomTypeCarousel allroomtypes={data} />
            </div>

            <div className="flex my-3 justify-center w-full">
               <button
                  onClick={() => scrollToSection('reservation')}
                  className="w-9/12 bg-blue-500 text-white p-2 rounded-lg mx-4"
               >
                  Book Now!
               </button>
            </div>
         </section>
         <footer>
            {' '}
            <GuestFooter />
         </footer>
      </main>
   );
}

export default LandingPage;
