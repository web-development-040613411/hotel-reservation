"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Employee } from "@/lib/type";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

interface EmployeeTableClientProps {
  employees: Employee[];
}

export default function EmployeeTableClient({
  employees,
}: EmployeeTableClientProps) {
  const table = useReactTable({
    data: employees,
    columns: [
      {
        header: "Information",
        cell: ({ row }) => {
          const employee = row.original;
          const dateOfBirth = new Date(employee.date_of_birth);

          return (
            <div className="flex gap-2">
              <Image
                src={employee.profile_picture ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${employee.profile_picture}` : "/default-profile.png"}
                width={0}
                height={0}
                sizes="100vw"
                alt={employee.username}
                className="size-28 aspect-square"
              />
              <div className="space-y-2">
                <p><span className="font-semibold">Name: </span> {employee.first_name} {employee.last_name}</p>
                <p><span className="font-semibold">Username: </span> {employee.username}</p>
                <p><span className="font-semibold">Born: </span> {dateOfBirth.toDateString()}</p>
              </div>
            </div>
          );
        },
      },
      {
        header: "Job",
        cell: ({ row }) => {
          const employee = row.original;
          return <div className="capitalize">{employee.role.replaceAll("_", " ")}</div>;
        },
      },
      {
        header: "Contact",
        cell: ({ row }) => {
          const employee = row.original;
          return <div></div>;
        },
      },
      {
        id: "action",
        enableHiding: false,
        cell: () => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
