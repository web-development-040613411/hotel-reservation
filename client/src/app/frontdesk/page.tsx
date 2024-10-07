'use client';
import { Button } from '@/components/ui/button';
import Frontdesk_Nav from './frontdesk-nav';
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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

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
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';

const thisYear = new Date().getFullYear();
const thisMonthNumber = new Date().getMonth() + 1;
// Constants for year range display
const startYear = 2023;
const endYear = thisYear + 22;
const YearPerPage = 8;

// Array of all the years
const arrayYear = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
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
    }, [selectedYear, selectedMonth]);
    console.log(selectedDate);

    const data = {
        Standard: [
            {
                reservations_id: '3b362732-46ea-4bf0-8c24-52ce2d54033d',
                customer_id: 'b7935c09-9519-47bd-8a0c-38d9fc03d0c3',
                first_name: 'Mok',
                last_name: 'Maard',
                address: '24/1294',
                email: 'mokmaard@gmail.com',
                phone_number: '0863102395',
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '102',
                price: 1245,
                room_id: '152d23f3-cd23-43ea-a995-61a649a1d83f',
                check_in: '2024-09-01T00:00:00.000Z',
                check_out: '2024-09-24T00:00:00.000Z',
                display_color: 'yellow',
                transaction_status: 'paid',
                createAt: '2024-09-03T00:00:00.000Z',
                current_status: 'vacant',
                types_name: 'Standard',
                capacity: 2,
                detail: 'Standard room',
                picture_path: 'standard.jpg',
                price_per_night: 100,
            },
            {
                reservations_id: 'ab1a645d-8019-4b72-ac04-8a8860dd202b',
                customer_id: null,
                first_name: null,
                last_name: null,
                address: null,
                email: null,
                phone_number: null,
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '103',
                price: 600,
                room_id: '2f1a9a38-f851-4f87-abba-d473737c5475',
                check_in: '2024-09-01T00:00:00.000Z',
                check_out: '2024-09-07T00:00:00.000Z',
                display_color: null,
                transaction_status: 'preserve',
                createAt: '2024-09-24T00:00:00.000Z',
                current_status: 'vacant',
                types_name: 'Standard',
                capacity: 2,
                detail: 'Standard room',
                picture_path: 'standard.jpg',
                price_per_night: 100,
            },
            {
                reservations_id: 'd223decb-945c-47b5-818f-ab6578d81b5f',
                customer_id: null,
                first_name: null,
                last_name: null,
                address: null,
                email: null,
                phone_number: null,
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '104',
                price: 600,
                room_id: '6644c615-faf6-4406-9d76-847b0be80a5c',
                check_in: '2024-09-01T00:00:00.000Z',
                check_out: '2024-09-07T00:00:00.000Z',
                display_color: '9399df',
                transaction_status: 'preserve',
                createAt: '2024-09-24T00:00:00.000Z',
                current_status: 'vacant',
                types_name: 'Standard',
                capacity: 2,
                detail: 'Standard room',
                picture_path: 'standard.jpg',
                price_per_night: 100,
            },
            {
                reservations_id: null,
                customer_id: null,
                first_name: null,
                last_name: null,
                address: null,
                email: null,
                phone_number: null,
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '105',
                price: null,
                room_id: null,
                check_in: null,
                check_out: null,
                display_color: null,
                transaction_status: null,
                createAt: null,
                current_status: 'occupied',
                types_name: 'Standard',
                capacity: 2,
                detail: 'Standard room',
                picture_path: 'standard.jpg',
                price_per_night: 100,
            },
        ],
        'Queen Room': [
            {
                reservations_id: 'ff2e7123-8f11-432e-88f1-3605233be0c2',
                customer_id: '4f967762-9f13-413f-9b8e-6b7b01d93345',
                first_name: 'Woraviboon',
                last_name: 'Mungmee',
                address: '1/8',
                email: 'ohmmy@gmail.com',
                phone_number: '0842355892',
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '107',
                price: 980,
                room_id: 'a81e096c-2782-4979-a603-bef991677cf4',
                check_in: '2024-09-13T00:00:00.000Z',
                check_out: '2024-09-29T00:00:00.000Z',
                display_color: 'delight',
                transaction_status: 'preserve',
                createAt: '2024-08-06T00:00:00.000Z',
                current_status: 'vacant',
                types_name: 'Queen Room',
                capacity: 2,
                detail: 'A comfortable room with a queen-sized bed, offering great value for solo travelers or couples.',
                picture_path: '/images/rooms/queen_room.jpg',
                price_per_night: 150,
            },
            {
                reservations_id: null,
                customer_id: null,
                first_name: null,
                last_name: null,
                address: null,
                email: null,
                phone_number: null,
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '301',
                price: null,
                room_id: null,
                check_in: null,
                check_out: null,
                display_color: null,
                transaction_status: null,
                createAt: null,
                current_status: 'vacant',
                types_name: 'Queen Room',
                capacity: 2,
                detail: 'A comfortable room with a queen-sized bed, offering great value for solo travelers or couples.',
                picture_path: '/images/rooms/queen_room.jpg',
                price_per_night: 150,
            },
            {
                reservations_id: null,
                customer_id: null,
                first_name: null,
                last_name: null,
                address: null,
                email: null,
                phone_number: null,
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '302',
                price: null,
                room_id: null,
                check_in: null,
                check_out: null,
                display_color: null,
                transaction_status: null,
                createAt: null,
                current_status: 'vacant',
                types_name: 'Queen Room',
                capacity: 2,
                detail: 'A comfortable room with a queen-sized bed, offering great value for solo travelers or couples.',
                picture_path: '/images/rooms/queen_room.jpg',
                price_per_night: 150,
            },
            {
                reservations_id: null,
                customer_id: null,
                first_name: null,
                last_name: null,
                address: null,
                email: null,
                phone_number: null,
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '303',
                price: null,
                room_id: null,
                check_in: null,
                check_out: null,
                display_color: null,
                transaction_status: null,
                createAt: null,
                current_status: 'vacant',
                types_name: 'Queen Room',
                capacity: 2,
                detail: 'A comfortable room with a queen-sized bed, offering great value for solo travelers or couples.',
                picture_path: '/images/rooms/queen_room.jpg',
                price_per_night: 150,
            },
            {
                reservations_id: null,
                customer_id: null,
                first_name: null,
                last_name: null,
                address: null,
                email: null,
                phone_number: null,
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '304',
                price: null,
                room_id: null,
                check_in: null,
                check_out: null,
                display_color: null,
                transaction_status: null,
                createAt: null,
                current_status: 'vacant',
                types_name: 'Queen Room',
                capacity: 2,
                detail: 'A comfortable room with a queen-sized bed, offering great value for solo travelers or couples.',
                picture_path: '/images/rooms/queen_room.jpg',
                price_per_night: 150,
            },
        ],
        Suite: [
            {
                reservations_id: 'cef88382-ed1e-41ee-bbf2-bd303a7715d5',
                customer_id: '4f967762-9f13-413f-9b8e-6b7b01d93345',
                first_name: 'Woraviboon',
                last_name: 'Mungmee',
                address: '1/8',
                email: 'ohmmy@gmail.com',
                phone_number: '0842355892',
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '110',
                price: 3000,
                room_id: 'e2985a72-6b3a-4534-b1aa-3d934cb5eab7',
                check_in: '2024-09-25T00:00:00.000Z',
                check_out: '2024-09-29T00:00:00.000Z',
                display_color: 'green',
                transaction_status: 'paid',
                createAt: '2024-10-02T00:00:00.000Z',
                current_status: 'vacant',
                types_name: 'Suite',
                capacity: 4,
                detail: 'A luxurious suite with separate living and sleeping areas, ideal for those seeking comfort and elegance.',
                picture_path: '/images/rooms/suite.jpg',
                price_per_night: 350,
            },
            {
                reservations_id: '7b8ab886-2fc4-42b8-874a-be2fc666782a',
                customer_id: '644c5174-4f1b-4fe1-ad1e-f9a1ad9884a8',
                first_name: 'Jhon',
                last_name: 'Doe',
                address: '2/2',
                email: 'Jhon@email.com',
                phone_number: '0123456789',
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '401',
                price: 400,
                room_id: 'dde39cde-9c39-4641-83b1-24a68b64f03c',
                check_in: '2024-09-13T00:00:00.000Z',
                check_out: '2024-09-27T00:00:00.000Z',
                display_color: 'sss',
                transaction_status: 'paid',
                createAt: '2024-09-24T00:00:00.000Z',
                current_status: 'vacant',
                types_name: 'Suite',
                capacity: 4,
                detail: 'A luxurious suite with separate living and sleeping areas, ideal for those seeking comfort and elegance.',
                picture_path: '/images/rooms/suite.jpg',
                price_per_night: 350,
            },
            {
                reservations_id: null,
                customer_id: null,
                first_name: null,
                last_name: null,
                address: null,
                email: null,
                phone_number: null,
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '402',
                price: null,
                room_id: null,
                check_in: null,
                check_out: null,
                display_color: null,
                transaction_status: null,
                createAt: null,
                current_status: 'vacant',
                types_name: 'Suite',
                capacity: 4,
                detail: 'A luxurious suite with separate living and sleeping areas, ideal for those seeking comfort and elegance.',
                picture_path: '/images/rooms/suite.jpg',
                price_per_night: 350,
            },
            {
                reservations_id: null,
                customer_id: null,
                first_name: null,
                last_name: null,
                address: null,
                email: null,
                phone_number: null,
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '403',
                price: null,
                room_id: null,
                check_in: null,
                check_out: null,
                display_color: null,
                transaction_status: null,
                createAt: null,
                current_status: 'vacant',
                types_name: 'Suite',
                capacity: 4,
                detail: 'A luxurious suite with separate living and sleeping areas, ideal for those seeking comfort and elegance.',
                picture_path: '/images/rooms/suite.jpg',
                price_per_night: 350,
            },
            {
                reservations_id: null,
                customer_id: null,
                first_name: null,
                last_name: null,
                address: null,
                email: null,
                phone_number: null,
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '404',
                price: null,
                room_id: null,
                check_in: null,
                check_out: null,
                display_color: null,
                transaction_status: null,
                createAt: null,
                current_status: 'vacant',
                types_name: 'Suite',
                capacity: 4,
                detail: 'A luxurious suite with separate living and sleeping areas, ideal for those seeking comfort and elegance.',
                picture_path: '/images/rooms/suite.jpg',
                price_per_night: 350,
            },
        ],
        'King Room': [
            {
                reservations_id: 'f2920b59-cfd6-49a5-bc8b-d7d2a2d6c20f',
                customer_id: '4f967762-9f13-413f-9b8e-6b7b01d93345',
                first_name: 'Woraviboon',
                last_name: 'Mungmee',
                address: '1/8',
                email: 'ohmmy@gmail.com',
                phone_number: '0842355892',
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '199',
                price: 900,
                room_id: '5f25d81c-480b-436b-a857-6694742e68dd',
                check_in: '2024-09-18T00:00:00.000Z',
                check_out: '2024-09-20T00:00:00.000Z',
                display_color: 'green',
                transaction_status: 'paid',
                createAt: '2024-08-03T00:00:00.000Z',
                current_status: 'vacant',
                types_name: 'King Room',
                capacity: 2,
                detail: 'A spacious room with a king-sized bed, perfect for couples or business travelers.',
                picture_path: '/images/rooms/king_room.jpg',
                price_per_night: 200,
            },
            {
                reservations_id: null,
                customer_id: null,
                first_name: null,
                last_name: null,
                address: null,
                email: null,
                phone_number: null,
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '201',
                price: null,
                room_id: null,
                check_in: null,
                check_out: null,
                display_color: null,
                transaction_status: null,
                createAt: null,
                current_status: 'vacant',
                types_name: 'King Room',
                capacity: 2,
                detail: 'A spacious room with a king-sized bed, perfect for couples or business travelers.',
                picture_path: '/images/rooms/king_room.jpg',
                price_per_night: 200,
            },
            {
                reservations_id: '328f065d-44b7-410c-ae5c-83d0a6a0d33a',
                customer_id: '05fa2894-5c6f-488f-8c9d-f1bd50770c4e',
                first_name: 'Mok',
                last_name: 'Maard',
                address: '24/1294',
                email: 'mokmaard@gmail.com',
                phone_number: '0863102395',
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '202',
                price: 1234,
                room_id: '51168247-10e8-4a85-bb03-267941f5348e',
                check_in: '2024-09-20T00:00:00.000Z',
                check_out: '2024-09-22T00:00:00.000Z',
                display_color: 'Arkansas Razorbacks',
                transaction_status: 'paid',
                createAt: '2024-09-02T00:00:00.000Z',
                current_status: 'vacant',
                types_name: 'King Room',
                capacity: 2,
                detail: 'A spacious room with a king-sized bed, perfect for couples or business travelers.',
                picture_path: '/images/rooms/king_room.jpg',
                price_per_night: 200,
            },
            {
                reservations_id: '5274c6d8-5485-4fa5-9bd3-82a5f96f851a',
                customer_id: '4f967762-9f13-413f-9b8e-6b7b01d93345',
                first_name: 'Woraviboon',
                last_name: 'Mungmee',
                address: '1/8',
                email: 'ohmmy@gmail.com',
                phone_number: '0842355892',
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '202',
                price: 789,
                room_id: '51168247-10e8-4a85-bb03-267941f5348e',
                check_in: '2024-09-13T00:00:00.000Z',
                check_out: '2024-09-24T00:00:00.000Z',
                display_color: 'sand',
                transaction_status: 'paid',
                createAt: '2024-08-01T00:00:00.000Z',
                current_status: 'vacant',
                types_name: 'King Room',
                capacity: 2,
                detail: 'A spacious room with a king-sized bed, perfect for couples or business travelers.',
                picture_path: '/images/rooms/king_room.jpg',
                price_per_night: 200,
            },
            {
                reservations_id: '47534778-22f8-43f6-b91f-aee86d8787f3',
                customer_id: '644c5174-4f1b-4fe1-ad1e-f9a1ad9884a8',
                first_name: 'Jhon',
                last_name: 'Doe',
                address: '2/2',
                email: 'Jhon@email.com',
                phone_number: '0123456789',
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '203',
                price: 2341,
                room_id: '70c3fc71-2312-46b2-adc6-9122af58136c',
                check_in: '2024-09-29T00:00:00.000Z',
                check_out: '2024-10-03T00:00:00.000Z',
                display_color: 'orange',
                transaction_status: 'paid',
                createAt: '2024-10-10T00:00:00.000Z',
                current_status: 'vacant',
                types_name: 'King Room',
                capacity: 2,
                detail: 'A spacious room with a king-sized bed, perfect for couples or business travelers.',
                picture_path: '/images/rooms/king_room.jpg',
                price_per_night: 200,
            },
            {
                reservations_id: null,
                customer_id: null,
                first_name: null,
                last_name: null,
                address: null,
                email: null,
                phone_number: null,
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '204',
                price: null,
                room_id: null,
                check_in: null,
                check_out: null,
                display_color: null,
                transaction_status: null,
                createAt: null,
                current_status: 'vacant',
                types_name: 'King Room',
                capacity: 2,
                detail: 'A spacious room with a king-sized bed, perfect for couples or business travelers.',
                picture_path: '/images/rooms/king_room.jpg',
                price_per_night: 200,
            },
            {
                reservations_id: 'e7bd8a77-9745-4efe-90a2-9aa2e651615e',
                customer_id: '05fa2894-5c6f-488f-8c9d-f1bd50770c4e',
                first_name: 'Mok',
                last_name: 'Maard',
                address: '24/1294',
                email: 'mokmaard@gmail.com',
                phone_number: '0863102395',
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '465',
                price: 124.5,
                room_id: '0b494479-d63e-47bc-adae-62438b44f02f',
                check_in: '2024-09-01T00:00:00.000Z',
                check_out: '2024-09-07T00:00:00.000Z',
                display_color: 'green',
                transaction_status: 'paid',
                createAt: '2024-09-23T00:00:00.000Z',
                current_status: 'vacant',
                types_name: 'King Room',
                capacity: 2,
                detail: 'A spacious room with a king-sized bed, perfect for couples or business travelers.',
                picture_path: '/images/rooms/king_room.jpg',
                price_per_night: 200,
            },
            {
                reservations_id: 'f9ca7a2e-0ad2-4a5d-a998-08c901d35c5b',
                customer_id: 'a4e29dbc-05f2-4b00-9d7b-62bc9b3a04d0',
                first_name: 'Mok',
                last_name: 'Maard',
                address: '24/1294',
                email: 'mokmaard@gmail.com',
                phone_number: '0863102395',
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '465',
                price: 1240,
                room_id: '0b494479-d63e-47bc-adae-62438b44f02f',
                check_in: '2024-10-10T00:00:00.000Z',
                check_out: '2024-10-18T00:00:00.000Z',
                display_color: 'blue',
                transaction_status: 'paid',
                createAt: '2024-10-16T00:00:00.000Z',
                current_status: 'vacant',
                types_name: 'King Room',
                capacity: 2,
                detail: 'A spacious room with a king-sized bed, perfect for couples or business travelers.',
                picture_path: '/images/rooms/king_room.jpg',
                price_per_night: 200,
            },
            {
                reservations_id: 'dca01337-011d-441b-864a-703eb80d149e',
                customer_id: 'b7935c09-9519-47bd-8a0c-38d9fc03d0c3',
                first_name: 'Mok',
                last_name: 'Maard',
                address: '24/1294',
                email: 'mokmaard@gmail.com',
                phone_number: '0863102395',
                sub_district: null,
                district: null,
                province: null,
                postcode: null,
                room_number: '465',
                price: 2000,
                room_id: '0b494479-d63e-47bc-adae-62438b44f02f',
                check_in: '2024-09-21T00:00:00.000Z',
                check_out: '2024-09-27T00:00:00.000Z',
                display_color: 'red',
                transaction_status: 'paid',
                createAt: '2024-09-21T00:00:00.000Z',
                current_status: 'vacant',
                types_name: 'King Room',
                capacity: 2,
                detail: 'A spacious room with a king-sized bed, perfect for couples or business travelers.',
                picture_path: '/images/rooms/king_room.jpg',
                price_per_night: 200,
            },
        ],
    };

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

    // Function to go to the previous set of years
    const prevYearSet = () => {
        if (startYearIndex > 0) {
            setStartYearIndex(startYearIndex - YearPerPage);
        }
    };

    // Function to go to the next set of years
    const nextYearSet = () => {
        if (startYearIndex + YearPerPage < arrayYear.length) {
            setStartYearIndex(startYearIndex + YearPerPage);
        }
    };

    return (
        <div>
            <Frontdesk_Nav />
            <main className="p-3">
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
                    value={selectedYear}
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
                        .map((year) => (
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

                {/* <div className="grid grid-cols-33 gap-0 mt-3">
                    <div className="col-auto text-center border-2 text-black w-10">
                        Rooms
                    </div>
                    {daysArray.map((date, index) => (
                        <div
                            key={index}
                            className="col-auto text-center border-2 text-black w-10"
                        >
                            <b>{date}</b>
                            <br /> {index + 1}
                        </div>
                    ))}
                  <div className="...">01</div>
                    <div className="...">02</div>
                    <div className="...">03</div>
                    <div className="col-span-2 ...">04</div>
                    <div className="...">05</div>
                    <div className="...">06</div>
                    <div className="col-span-2 ...">07</div> 
                </div> */}

                <Table className="table-fixed mt-3 w-full">
                    <TableHeader className="border-2 ">
                        <TableRow>
                            <TableHead className="w-28 text-center border-2 text-black">
                                <b>Rooms</b>
                            </TableHead>
                            {daysArray.map((date, index) => (
                                <TableHead
                                    key={index}
                                    className="text-center border-2 text-black w-10"
                                >
                                    <b>{date}</b>
                                    <br /> {index + 1}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.entries(data).map(
                            ([typesName, reservations]) => (
                                <>
                                    <TableRow>
                                        <TableCell className="w-28 text-center border-2 text-black">
                                            {typesName}
                                        </TableCell>
                                    </TableRow>

                                    {reservations.map((reservation) => (
                                        <TableRow key={reservation.room_id}>
                                            <TableCell className="w-28 text-center border-2 text-black">
                                                {reservation.room_number}
                                            </TableCell>
                                            {Array.from({ length: 31 }).map(
                                                (_, i) => (
                                                    <TableCell
                                                        key={i}
                                                        className="w-28 text-center border-2 text-black"
                                                    >
                                                        
                                                        cols {i + 1}
                                                    </TableCell>
                                                )
                                            )}
                                        </TableRow>
                                    ))}
                                </>
                            )
                        )}
                    </TableBody>
                </Table>
            </main>
        </div>
    );
}
