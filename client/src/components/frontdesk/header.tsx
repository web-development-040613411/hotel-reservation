import { Button } from '@/components/ui/button';
import { Bold, ChevronDown, Italic, LogOut, Search } from 'lucide-react';
import { useState, Fragment, useEffect } from 'react';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuRadioGroup,
   DropdownMenuRadioItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { Input } from '@/components/ui/input';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface Frontdesk_HeaderProps {
    arrayMoth: string[];               // คาดว่าจะเป็นอาร์เรย์ของเดือน
    selectedYear: string;              // ปีที่ถูกเลือก
    changeSelectedYear: (year: string) => void; // ฟังก์ชันที่ใช้เปลี่ยนปี
    prevYearSet: () => void;           // ฟังก์ชันสำหรับปีถัดไป
    arrayYear: number[];               // อาร์เรย์ของปี
    startYearIndex: number;            // ดัชนีเริ่มต้นของปี
    YearPerPage: number;               // จำนวนปีที่แสดงต่อหน้า
    nextYearSet: () => void;           // ฟังก์ชันสำหรับปีถัดไป
    selectedMonth: number;             // เดือนที่ถูกเลือก
    changeSelectedMonth: (month: string) => void; // ฟังก์ชันที่ใช้เปลี่ยนเดือน
  }
  
  export default function Frontdesk_Header({
    arrayMoth,
    selectedYear,
    changeSelectedYear,
    prevYearSet,
    arrayYear,
    startYearIndex,
    YearPerPage,
    nextYearSet,
    selectedMonth,
    changeSelectedMonth,
  }: Frontdesk_HeaderProps) {
   return (
      <div>
         <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">Front Desk</p>

            <Button className="font-bold bg-blue-600 hover:bg-blue-500">
               Add Booking
            </Button>
         </div>

         <ToggleGroup
            variant="outline"
            type="single"
            className="p-0 m-0 gap-0 mt-3 bg-blue-50 rounded-tl-xl rounded-tr-xl"
            value={selectedYear || ''}
            onValueChange={(value) => changeSelectedYear(value)}
         >
            <ToggleGroupItem
               value="prev"
               className="font-bold rounded-none rounded-tl-xl"
               variant="outline"
               onClick={prevYearSet}
            >
               {'<'}
            </ToggleGroupItem>
            {arrayYear
               .slice(startYearIndex, startYearIndex + YearPerPage)
               .map((year: any) => (
                  <ToggleGroupItem
                     key={year}
                     value={year.toString()}
                     className="font-bold rounded-none flex-1 data-[state=on]:bg-blue-400 data-[state=on]:text-white "
                     variant="outline"
                  >
                     {year}
                  </ToggleGroupItem>
               ))}
            <ToggleGroupItem
               value="next"
               className="font-bold rounded-none rounded-tr-lg"
               variant="outline"
               onClick={nextYearSet}
            >
               {'>'}
            </ToggleGroupItem>
         </ToggleGroup>

         <ToggleGroup
            variant="outline"
            type="single"
            className="p-0 m-0 gap-0 bg-blue-50 rounded-bl-xl rounded-br-lg"
            value={selectedMonth.toString()}
            onValueChange={(value) => changeSelectedMonth(value)}
         >
            <ToggleGroupItem
               value="prev"
               className="font-bold rounded-none rounded-bl-lg"
               variant="outline"
            >
               {'<'}
            </ToggleGroupItem>
            {arrayMoth.map((month, index) => (
               <ToggleGroupItem
                  key={month}
                  value={(index + 1).toString()}
                  className="font-bold flex-1 rounded-none  data-[state=on]:bg-blue-400 data-[state=on]:text-white "
                  variant="outline"
               >
                  {month}
               </ToggleGroupItem>
            ))}
            <ToggleGroupItem
               value="next"
               className="font-bold rounded-none rounded-br-lg"
               variant="outline"
            >
               {'>'}
            </ToggleGroupItem>
         </ToggleGroup>

         {/* Year tabs */}

         <div className="flex justify-between items-center mt-3">
            {/* Left side */}
            <div className="relative flex items-center">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
               <Input
                  type="text"
                  placeholder="Search for customer"
                  className="pl-10 " // Add additional styling as needed
                  value=""
               />
            </div>

            {/* Right side */}
            <div className="relative flex items-center">
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="outline">
                        Roomtypes <ChevronDown />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                     <DropdownMenuLabel>Roomtypes</DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <DropdownMenuRadioGroup
                     // value={position}
                     // onValueChange={setPosition}
                     >
                        <DropdownMenuRadioItem value="top">
                           All
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="top">
                           Top
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="bottom">
                           Bottom
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="right">
                           Right
                        </DropdownMenuRadioItem>
                     </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>
      </div>
   );
}
