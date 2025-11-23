'use client';

import { flexRender, type Table } from '@tanstack/react-table';

import { TableBody, TableCell, TableRow } from '@/components/ui/shadcn/table';
import type { EnrolledStudentsTableRow } from '@/types/enrolled-students';

interface EnrolledStudentsTableBodyProps {
  table: Table<EnrolledStudentsTableRow>;
}

function EnrolledStudentsTableBody({ table }: EnrolledStudentsTableBodyProps) {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={4} className="h-24 text-center">
            En este momento no hay estudiantes matriculados
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export { EnrolledStudentsTableBody };
