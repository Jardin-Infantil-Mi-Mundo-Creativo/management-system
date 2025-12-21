import type { Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

import { TableHead, TableHeader, TableRow } from '@/components/ui/shadcn/table';
import type { EnrolledStudentsTableRow } from '@/types/enrolled-students';

interface EnrolledStudentsTableHeaderProps {
  table: Table<EnrolledStudentsTableRow>;
}

function EnrolledStudentsTableHeader({
  table,
}: EnrolledStudentsTableHeaderProps) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead
                key={header.id}
                style={{ width: `${header.getSize()}px` }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}

export { EnrolledStudentsTableHeader };
