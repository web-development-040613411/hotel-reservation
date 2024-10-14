"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import AddRoomModal from "./AddRoomModal";

const roomStatus = [
  "vacant",
  "occupied",
  "maintenance",
  "off market",
  "departing",
];

export default function FilteringSection() {
  const [query, setQuery] = useState<string>("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleFilterStatus = (status: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("status", status);

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-between">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          onChange={(e) => setQuery(e.target.value)}
          placeholder="room number"
        />
        <Button type="submit">Search</Button>
      </form>
      <div className="flex gap-2">
        <AddRoomModal />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Filter status <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {roomStatus.map((status, idx) => (
              <DropdownMenuCheckboxItem
                onClick={() => handleFilterStatus(status)}
                key={idx}
                checked={searchParams.has("status") && searchParams.get("status") === status}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
