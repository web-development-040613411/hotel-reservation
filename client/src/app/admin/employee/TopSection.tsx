"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import CreateAccountModal from "./CreateAccountModal";

export default function TopSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-between">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Search employee"
        />
        <Button type="submit">Search</Button>
      </form>
      <div>
        <CreateAccountModal />
      </div>
    </div>
  );
}
