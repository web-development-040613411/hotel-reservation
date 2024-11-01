"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
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
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import DeleteRoomModal from "./DeleteRoomModal";
import EditRoomModal from "./EditRoomModal";

interface RoomTableProps {
  rooms: Room[];
}

export default function RoomTableClient({ rooms }: RoomTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: rooms,
    columns: [
      // {
      //   id: "select",
      //   header: ({ table }) => (
      //     <div className="flex justify-center">
      //       <Checkbox
      //         checked={
      //           table.getIsAllRowsSelected() ||
      //           (table.getIsSomePageRowsSelected() && "indeterminate")
      //         }
      //         onCheckedChange={(value) =>
      //           table.toggleAllPageRowsSelected(!!value)
      //         }
      //         aria-label="Select all"
      //       />
      //     </div>
      //   ),
      //   cell: ({ row }) => (
      //     <div className="flex justify-center">
      //       <Checkbox
      //         checked={row.getIsSelected()}
      //         onCheckedChange={(value) => row.toggleSelected(!!value)}
      //         aria-label="Select row"
      //       />
      //     </div>
      //   ),
      //   enableHiding: false,
      // },
      {
        header: "Room Number",
        accessorKey: "number",
        cell: ({ row }) => {
          const picture = row.original.picture_path;
          const roomNumber = row.original.number;

          return (
            <div className="flex items-center gap-2">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${picture}`}
                alt={`room-number-${roomNumber}`}
                width={0}
                height={0}
                sizes="100vw"
                className="w-32 aspect-video"
                priority
              />
              <span>{roomNumber}</span>
            </div>
          );
        },
      },
      {
        header: "Room Type",
        accessorKey: "room_type",
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
        cell: ({ row }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <EditRoomModal roomId={row.original.id}  roomNumber={row.original.number} roomTypeName={row.original.room_type} />
                <DeleteRoomModal roomId={row.original.id} />
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
      <p>Entires {table.getRowModel().rows.length} rooms</p>
    </>
  );
}
