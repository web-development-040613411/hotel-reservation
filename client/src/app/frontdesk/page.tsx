'use client';
import { Button } from '@/components/ui/button';
import Frontdesk_Nav from './frontdesk-nav';
import { Bold, ChevronDown, Italic, LogOut, Search } from 'lucide-react';
import { useState , Fragment } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import { Badge } from "@/components/ui/badge"

  
const thisYear = new Date().getFullYear();
const thisMonthNumber = new Date().getMonth() + 1;
// Constants for year range display
const START_YEAR = 2023;
const END_YEAR = thisYear + 22;
const YEARS_PER_PAGE = 8;

// Array of all the years
const arrayYear = Array.from(
    { length: END_YEAR - START_YEAR + 1 },
    (_, i) => START_YEAR + i
);

// Month array
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

    const reservations = {
        "Single Rooms": {
            "001": { name: "23", startDate: "2024-10-01", endDate: "2024-10-01" },
            "002": { name: "Joy Borma", startDate: "2024-10-04", endDate: "2024-10-07" },
            "003": { name: "12", startDate: "2024-10-02", endDate: "2024-10-02" },
        },
        "Twin Double Rooms": {
            "101": { name: "Warner", startDate: "2024-10-03", endDate: "2024-10-05" },
            "102": { name: "David Smith", startDate: "2024-10-04", endDate: "2024-10-06" },
        },
        "Family Rooms": {
            "201": { name: "Rohit", startDate: "2024-10-09", endDate: "2024-10-13" },
            "202": { name: "Messi", startDate: "2024-10-11", endDate: "2024-10-15" },
        },
    };
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dates = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"];

    const changeSelectedYear = (value: any) => {
        if (value === 'prev' || value === 'next') return;
        setSelectedYear(value);
    };

    const changeSelectedMonth = (value: any) => {
        if (value === 'prev') {
            if (selectedMonth === 1) {
                setSelectedMonth(12);
            } else {
                setSelectedMonth(selectedMonth - 1);
            }
        } else if (value === 'next') {
            if (selectedMonth === 12) {
                setSelectedMonth(1);
            } else {
                setSelectedMonth(selectedMonth + 1);
            }
        } else {
            setSelectedMonth(parseInt(value));
        }
    };

    // Function to go to the previous set of years
    const prevYearSet = () => {
        if (startYearIndex > 0) {
            setStartYearIndex(startYearIndex - YEARS_PER_PAGE);
        }
    };

    // Function to go to the next set of years
    const nextYearSet = () => {
        if (startYearIndex + YEARS_PER_PAGE < arrayYear.length) {
            setStartYearIndex(startYearIndex + YEARS_PER_PAGE);
        }
    };

    return (
        <div>
            <Frontdesk_Nav />
            <main className="p-3">
                <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold">Front Desk</p>

                    <Button className="font-bold">Add Booking</Button>
                </div>

                <ToggleGroup
                    variant="outline"
                    type="single"
                    className="p-0 m-0 gap-0 mt-3"
                    value={selectedYear}
                    onValueChange={(value) => changeSelectedYear(value)}
                >
                    <ToggleGroupItem
                        value="prev"
                        className="font-bold rounded-none"
                        variant="outline"
                        onClick={prevYearSet}
                    >
                        {'<'}
                    </ToggleGroupItem>
                    {arrayYear
                        .slice(startYearIndex, startYearIndex + YEARS_PER_PAGE)
                        .map((year) => (
                            <ToggleGroupItem
                                key={year}
                                value={year.toString()}
                                className="font-bold rounded-none flex-1 data-[state=on]:bg-black data-[state=on]:text-white "
                                variant="outline"
                            >
                                {year}
                            </ToggleGroupItem>
                        ))}
                    <ToggleGroupItem
                        value="next"
                        className="font-bold rounded-none"
                        variant="outline"
                        onClick={nextYearSet}
                    >
                        {'>'}
                    </ToggleGroupItem>
                </ToggleGroup>

                <ToggleGroup
                    variant="outline"
                    type="single"
                    className="p-0 m-0 gap-0"
                    value={selectedMonth.toString()}
                    onValueChange={(value) => changeSelectedMonth(value)}
                >
                    <ToggleGroupItem
                        value="prev"
                        className="font-bold rounded-none"
                        variant="outline"
                    >
                        {'<'}
                    </ToggleGroupItem>
                    {arrayMoth.map((month, index) => (
                        <ToggleGroupItem
                            key={month}
                            value={(index + 1).toString()}
                            className="font-bold flex-1 rounded-none  data-[state=on]:bg-black data-[state=on]:text-white "
                            variant="outline"
                        >
                            {month}
                        </ToggleGroupItem>
                    ))}
                    <ToggleGroupItem
                        value="next"
                        className="font-bold rounded-none"
                        variant="outline"
                    >
                        {'>'}
                    </ToggleGroupItem>
                </ToggleGroup>

                {/* Year tabs */}

                {/* Month tabs */}

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
                                    <DropdownMenuLabel>
                                        Roomtypes
                                    </DropdownMenuLabel>
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
                <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Rooms</TableHead>
                        {dates.map((date, index) => (
                            <TableHead key={index} className="text-center">
                                {days[index]} {date}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.entries(reservations).map(([roomType, rooms]) => (
                        <Fragment key={roomType}>
                            <TableRow>
                                <TableCell colSpan={dates.length + 1}>
                                    <Badge>{roomType}</Badge>
                                </TableCell>
                            </TableRow>
                            {Object.entries(rooms).map(([roomNumber, reservation]) => (
                                <TableRow key={roomNumber}>
                                    <TableCell>{roomNumber}</TableCell>
                                    {dates.map((date) => (
                                        <TableCell key={date} className="text-center">
                                            {reservation.startDate === `${selectedYear}-${selectedMonth}-${date}`
                                                ? reservation.name
                                                : ''}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </Fragment>
                    ))}
                </TableBody>
            </Table>
        </div>

            </main>
        </div>
    );
}
