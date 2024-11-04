'use client';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostPoneMutation = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: async ({
         id,
         newCheckIn,
         newCheckOut,
      }: {
         id: string;
         newCheckIn: string;
         newCheckOut: string;
      }) => {
         const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/frontdesk/postpone/`,

            {
               body: JSON.stringify({
                  reservationID: id,
                  newCheckIn: newCheckIn,
                  newCheckOut: newCheckOut,
               }),
               method: 'PATCH',
               headers: {
                  'Content-Type': 'application/json',
               },
            }
         );
         const data = await res.json();
         if (!res.ok) {
            throw new Error(data.message || 'Failed to check-in');
         }
         return data;
      },
      onSuccess: (data) => {
         queryClient.invalidateQueries({
            queryKey: ['rooms'],
         });
         queryClient.invalidateQueries({
            queryKey: ['reservations'],
         });
         queryClient.invalidateQueries({
            queryKey: ['roomTypes'],
         });

         toast.success(data.message);
      },
      onError: (error: any) => {
         toast.error(error.message);
      },
   });
};
