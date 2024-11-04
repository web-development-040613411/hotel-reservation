import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function EmployeeTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-3/6">Information</TableHead>
          <TableHead className="w-1/6">Job</TableHead>
          <TableHead className="w-2/6">Contact</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  )
}
