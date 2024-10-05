"use client";

import { adminMenu } from "@/lib/menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebarMenu() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6 mt-20">
      {adminMenu.map((menu, idx) => (
        <Link
          className={cn(
            "text-foreground text-lg font-semibold flex items-center gap-2 hover:text-primary transition-colors", {
              "text-primary": pathname.split("/")[2] === menu.href.split("/")[2],
            }
          )}
          href={menu.href}
          key={idx}
        >
          <menu.icon /> {menu.label}
        </Link>
      ))}
    </div>
  );
}
