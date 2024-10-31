/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RoomType } from "@/lib/type";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import DeleteRoomTypeModal from "./DeleteRoomTypeModal";

interface RoomTypeTableClientProps {
  roomTypes: RoomType[];
}

export default function RoomTypeTableClient({
  roomTypes,
}: RoomTypeTableClientProps) {
  const table = useReactTable({
    data: roomTypes,
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
        enableHiding: false,
      },
      {
        header: "Room Type",
        accessorKey: "name",
        cell: ({ row }) => {
          const name = row.original.name;
          const picture = row.original.picture_path;
          return (
            <div className="flex items-center gap-2">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${picture}`}
                alt={`${name}`}
                width={0}
                height={0}
                sizes="100vw"
                className="w-48 aspect-video"
                priority
              />
              <span className="break-all">{name}</span>
            </div>
          );
        }
      },
      {
        header: "Detail",
        accessorKey: "detail",
        cell: ({ row }) => {
          const detail = row.original.detail;

          return <span className="break-all">{detail}</span>;
        }
      },
      {
        header: "Price",
        accessorKey: "price",
        cell: ({ row }) => {
          const price = row.original.price;

          return <span>${price} / night</span>;
        },
      },
      {
        header: "Capacity",
        accessorKey: "capacity",
      },
      {
        id: "action",
        enableHiding: false,
        cell: ({ row }) => {
          const roomTypeId = row.original.id;
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
                <DeleteRoomTypeModal roomTypeId={roomTypeId} />
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
