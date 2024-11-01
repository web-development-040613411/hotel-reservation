export const employeeRole = [
  "administrator",
  "frontdesk",
  "house_keeping_manager",
  "house_keeping"
] as const;

export type EmployeeRole = typeof employeeRole[number];

export type Employee = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number: string;
  role: EmployeeRole;
  profile_picture: string | null;
}