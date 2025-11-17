'use client';

import { useGetEnrollmentsQuery } from '@/queries/enrollment/use-get-enrollments-query';
import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { GRADE_OPTIONS } from '@/consts/enrollment';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/shadcn/dialog';
import { Button } from '@/components/ui/shadcn/button';
import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';

interface EnrollmentRow {
  'Documento del estudiante': string;
  Grado: string;
  id: string;
  Nombre: string;
}

const EnrollmentDetail = ({
  enrollmentData,
}: {
  enrollmentData?: EnrollmentFormSchemaWithDocumentId;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Ver</Button>
      </DialogTrigger>
      <DialogContent className="h-4/5 sm:max-w-3xl overflow-scroll">
        <DialogHeader>
          <DialogTitle>Información de matricula</DialogTitle>
        </DialogHeader>
        <p>{JSON.stringify(enrollmentData, null, 2)}</p>
      </DialogContent>
    </Dialog>
  );
};

export default function Home() {
  const getEnrollmentsQuery = useGetEnrollmentsQuery();

  const gradeOptionsMap = useMemo(
    () =>
      GRADE_OPTIONS.reduce(
        (acc, option) => {
          acc[option.value] = option.label;
          return acc;
        },
        {} as Record<string, string>
      ),
    []
  );

  const data: EnrollmentRow[] = useMemo(
    () =>
      getEnrollmentsQuery.data
        ? getEnrollmentsQuery.data.map((enrollment) => ({
            'Documento del estudiante':
              enrollment.personalStudentInfo.civilRegistrationNumber,
            Grado: gradeOptionsMap[enrollment.enrollment.entryGrade],
            id: enrollment.id,
            Nombre: enrollment.personalStudentInfo.fullName,
          }))
        : [],
    [getEnrollmentsQuery.data, gradeOptionsMap]
  );

  const columnsWithAction: ColumnDef<EnrollmentRow>[] = useMemo(() => {
    const baseColumns: ColumnDef<EnrollmentRow>[] = [
      {
        accessorKey: 'Documento del estudiante',
        header: 'Documento del estudiante',
      },
      {
        accessorKey: 'Nombre',
        header: 'Nombre',
      },
      {
        accessorKey: 'Grado',
        header: 'Grado',
      },
    ];

    return [
      ...baseColumns,
      {
        cell: (rowData) => {
          const id = rowData.row.original.id;
          const enrollmentData = getEnrollmentsQuery.data?.find(
            (enrollment) => enrollment.id === id
          );
          return <EnrollmentDetail enrollmentData={enrollmentData} />;
        },
        header: 'Acciones',
        id: 'actions',
      },
    ];
  }, [getEnrollmentsQuery.data]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns: columnsWithAction,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  if (getEnrollmentsQuery.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-stone-100 rounded-2xl p-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
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
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
