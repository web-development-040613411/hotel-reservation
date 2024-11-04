import React from 'react';
import { Skeleton } from '../ui/skeleton';

function Skeleton_header() {
   return (
      <div>
         <div className="flex justify-between">
            <Skeleton className="mt h-9 w-1/6 rounded-xl" />
            <Skeleton className="mt h-9 w-1/6 rounded-xl" />
         </div>
         <div className="flex justify-center mt-2">
            <Skeleton className="mt h-9 w-full rounded-xl" />
         </div>
         <div className="flex justify-center mt-2">
            <Skeleton className="mt h-9 w-full rounded-xl" />
         </div>
         <div className="flex justify-between mt-2">
            <Skeleton className="mt h-9 w-1/6 rounded-xl" />
            <Skeleton className="mt h-9 w-1/6 rounded-xl" />
         </div>
      </div>
   );
}

export default Skeleton_header;
