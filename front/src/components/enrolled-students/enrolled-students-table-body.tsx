'use client';

import { flexRender, type Table } from '@tanstack/react-table';

import { TableBody, TableCell, TableRow } from '@/components/ui/shadcn/table';
import type { EnrolledStudentsTableRow } from '@/types/enrolled-students';

interface EnrolledStudentsTableBodyProps {
  data: EnrolledStudentsTableRow[];
  table: Table<EnrolledStudentsTableRow>;
}

function EnrolledStudentsTableBody({
  data,
  table,
}: EnrolledStudentsTableBodyProps) {
  const rows = table.getRowModel().rows;

  return (
    <TableBody>
      {data.length && rows.length ? (
        rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                style={{ width: `${cell.column.getSize()}px` }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={4} className="h-24 text-center">
            En este momento no hay datos registrados de este tipo
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export { EnrolledStudentsTableBody };
