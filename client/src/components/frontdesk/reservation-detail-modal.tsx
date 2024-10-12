import React from 'react';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogFooterStart,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getDarkenColorClass, getLightenColorClass } from '@/lib/random-color';
import { Reservation } from '@/components/frontdesk/reservation-table';
interface Reservation_detail_modalProps {
   thisReservation: Reservation;
}

export default function Reservation_detail_modal({
   thisReservation,
}: Reservation_detail_modalProps) {
   return (
      <Dialog>
         <DialogTrigger asChild>
            <div
               style={{
                  backgroundColor: getLightenColorClass(
                     thisReservation.display_color
                  ),
                  color: getDarkenColorClass(thisReservation.display_color),
                  padding: '0.5rem',
                  borderRadius: '10px',
                  borderLeft: `5px solid ${getDarkenColorClass(
                     thisReservation.display_color
                  )}`,
                  cursor: 'pointer',
                  opacity: 1,
                  transition: 'opacity 0.1s ease-in-out',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
               }}
               onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.8';
               }}
               onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
               }}
            >
               {thisReservation.first_name + ' ' + thisReservation.last_name}
            </div>
         </DialogTrigger>
         <DialogContent className="max-w-lg p-4">
            <DialogHeader>
               <DialogTitle>Reservation Details</DialogTitle>
               <DialogDescription>
                  Information about the reservation of{' '}
                  {thisReservation.first_name} {thisReservation.last_name}.
               </DialogDescription>
            </DialogHeader>

            <div className="mt-0">
               <p>
                  <strong>Name : </strong> {thisReservation.first_name}{' '}
                  {thisReservation.last_name}
               </p>
               <p>
                  <strong>Tel : </strong>
                  {thisReservation.phone_number}
               </p>
               <p>
                  <strong>Email : </strong>
                  {thisReservation.email}
               </p>
               <p>
                  <strong>Address : </strong>
                  {thisReservation.address}
               </p>
               <p>
                  <strong>Room Number :</strong> {thisReservation.room_number}
               </p>
               <p>
                  <strong>Room Type: </strong> {thisReservation.types_name}
               </p>
               <p>
                  <strong>Capacity :</strong> {thisReservation.capacity}
               </p>
               <p>
                  <strong>Check-in :</strong>{' '}
                  {new Date(thisReservation.check_in).toLocaleDateString()}
               </p>
               <p>
                  <strong>Check-out :</strong>{' '}
                  {new Date(thisReservation.check_out).toLocaleDateString()}
               </p>
               <p>
                  <strong>Special Request :</strong>{' '}
                  {thisReservation?.special_request?.length > 0
                     ? thisReservation.special_request
                     : '-'}
               </p>
            </div>

            <DialogFooterStart className="flex justify-start mt-4">
               <Button
                  variant="default"
                  className="
                bg-green-500 text-white hover:bg-green-600
            "
               >
                  Check-in
               </Button>
               <Button
                  variant="default"
                  className="bg-red-500 text-white hover:bg-red-600"
               >
                  Check-out
               </Button>
               <Button
                  variant="default"
                  className="bg-yellow-500 text-white hover:bg-yellow-600"
               >
                  Postpone
               </Button>
            </DialogFooterStart>
         </DialogContent>
      </Dialog>
   );
}
