'use client';
import React from 'react';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooterStart,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '../ui/dialog';

import { Button } from '../ui/button';
import { Reservation } from '@/lib/frontdesk/type';
import { DialogClose } from '@radix-ui/react-dialog';

interface PostponeModalProps {
   thisReservation: Reservation;
}

export function PostponeModal({ thisReservation }: PostponeModalProps) {
   const postpone = (id: string) => {
      console.log('Postpone reservation with id: ', id);
   };
   return (
      <Dialog>
         <DialogTrigger>
            {' '}
            <Button
               variant="default"
               className="bg-yellow-600 text-white hover:bg-yellow-700 font-bold w-28 flex items-center justify-center"
               onClick={() => postpone(thisReservation.reservations_id)}
            >
               Post-pone
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Postpone Reservation</DialogTitle>
               <DialogDescription>
                  Postpone the reservation of {thisReservation.first_name}{' '}
                  {thisReservation.last_name}.
               </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col">
               <label htmlFor="check-in" className="text-sm">
                  Check-in
               </label>
               <input
                  type="date"
                  id="check-in"
                  name="check-in"
                  className="border border-gray-400 rounded-lg p-2"
                  value={
                     new Date(thisReservation.check_in)
                        .toISOString()
                        .split('T')[0]
                  }
                  disabled
               />
               <label htmlFor="check-out" className="text-sm mt-2">
                  Check-out
               </label>
               <input
                  type="date"
                  id="check-out"
                  name="check-out"
                  className="border border-gray-400 rounded-lg p-2"
               />
            </div>
            <DialogFooterStart>
               <Button
                  variant="default"
                  className="bg-green-600 text-white hover:bg-green-700 font-bold w-28 flex items-center justify-center"
               >
                  Post-pone
               </Button>
               <DialogClose asChild>
                  <Button
                     variant="default"
                     className="bg-gray-600 text-white hover:bg-gray-700 font-bold w-28 flex items-center justify-center"
                  >
                     Cancel
                  </Button>
               </DialogClose>
            </DialogFooterStart>
         </DialogContent>
      </Dialog>
   );
}
