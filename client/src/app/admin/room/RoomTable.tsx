"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Room } from "@/lib/type";
import { cn } from "@/lib/utils";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface RoomTableProps {
  room: Room[];
}

const roomStatus = [
  "vacant",
  "occupied",
  "maintenance",
  "off_market",
  "departing",
];

export default function RoomTable({ room }: RoomTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data: room,
    columns: [
      {
        id: "select",
        header: ({ table }) => (
          <div className="flex justify-center">
            <Checkbox
              checked={
                table.getIsAllRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
      },
      {
        header: "Room Number",
        accessorKey: "number",
        cell: ({ row }) => {
          const picture = row.original.picture_path;
          const roomNumber = row.original.number;

          return (
            <div className="flex items-center gap-2">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/file/${picture}`}
                alt={roomNumber}
                width={0}
                height={0}
                sizes="100vw"
                className="w-32"
              />
              <span>{roomNumber}</span>
            </div>
          );
        },
      },
      {
        header: "Room Type",
        accessorKey: "name",
      },
      {
        header: "Price",
        accessorKey: "price",
        cell: ({ row }) => {
          const price = row.original.price;

          return <span>price: ${price} / night</span>;
        },
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "current_status",
        cell: ({ row }) => {
          const status = row.original.current_status;

          return (
            <span
              className={cn("px-2 py-1 rounded-full text-xs", {
                "bg-green-400 text-green-800": status === "vacant",
                "bg-red-400 text-red-800": status === "occupied",
                "bg-blue-400 text-blue-800": status === "maintenance",
                "bg-slate-400 text-slate-800": status === "off_market",
                "bg-yellow-400 text-yellow-800": status === "departing",
              })}
            >
              {status}
            </span>
          );
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
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <div className="flex justify-between">
        <div>
          <Input placeholder="room number" />
        </div>
        <div className="flex gap-2">
          <Button>Add Room</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Filter status <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {roomStatus.map((status, idx) => (
                <DropdownMenuCheckboxItem
                  key={idx}
                  checked={
                    table.getColumn("status")?.getFilterValue() === status
                  }
                  onCheckedChange={() =>
                    table.getColumn("status")?.setFilterValue(status)
                  }
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table className="my-6">
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
              data-state={row.getIsSelected() && "seleced"}
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
