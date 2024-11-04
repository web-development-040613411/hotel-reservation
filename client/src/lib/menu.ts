import { DoorOpen, LayoutDashboard, User } from "lucide-react";

export const adminMenu = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Room",
    href: "/admin/room",
    icon: DoorOpen,
  },
  {
    label: "Employee",
    href: "/admin/employee",
    icon: User,
  },
];
