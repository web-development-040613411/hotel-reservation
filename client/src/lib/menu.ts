import { LayoutDashboard, User, DoorOpen, Users } from "lucide-react";

export const adminMenu = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Guest",
    href: "/admin/guest",
    icon: Users,
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
