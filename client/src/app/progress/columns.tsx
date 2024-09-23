"use client";

import { ColumnDef } from "@tanstack/react-table";

export type reservationList = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  name: string;
  number: string;
  price: number;
  check_in: string;
  check_out: string;
  transaction_status: string;
};

export type customerDetails = {
  first_name: string;
  last_name: string;
  address: string;
  sub_district: string;
  district: string;
  province: string;
  postal_code: string;
  email: string;
  phone_number: string;
};

export type income = {
  sum: number;
  month: number;
  year: number;
};

export const columnIncome: ColumnDef<income>[] = [
  {
    accessorKey: "sum",
    header: "Sum(price)",
  },
  {
    accessorKey: "month",
    header: "Month",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
];

export const columnCustomerDetails: ColumnDef<customerDetails>[] = [
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "sub_district",
    header: "Sub District",
  },
  {
    accessorKey: "district",
    header: "District",
  },
  {
    accessorKey: "province",
    header: "Province",
  },
  {
    accessorKey: "postal_code",
    header: "Postal Code",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
];

export const columnReservations: ColumnDef<reservationList>[] = [
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Room Type",
  },
  {
    accessorKey: "number",
    header: "Room Number",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "check_in",
    header: "Check In",
  },
  {
    accessorKey: "check_out",
    header: "Check Out",
  },
  {
    accessorKey: "transaction_status",
    header: "Transaction Status",
  },
];
