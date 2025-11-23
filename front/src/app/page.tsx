'use client';
// TODO: revisar paso de props necesarias y nombres

import type { ColumnDef } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import {
  EnrolledStudentDialog,
  EnrolledStudentsTableBody,
  EnrolledStudentsTableHeader,
  EnrolledStudentsTableSkeleton,
} from '@/components/enrolled-students/enrolled-students';
import { Table } from '@/components/ui/shadcn/table';
import { GRADE_OPTIONS } from '@/consts/enrollment';
import { useGetEnrollmentsQuery } from '@/queries/enrollment/use-get-enrollments-query';
import type { EnrolledStudentsTableRow } from '@/types/enrolled-students';

export default function Home() {
  const { getEnrollmentsQuery, safeData } = useGetEnrollmentsQuery();

  const gradeOptionsMap = GRADE_OPTIONS.reduce(
    (acc, option) => {
      acc[option.value] = option.label;
      return acc;
    },
    {} as Record<string, string>
  );

  const data: EnrolledStudentsTableRow[] = safeData.map((enrollment) => ({
    'Documento del estudiante':
      enrollment.personalStudentInfo.civilRegistrationNumber,
    Grado: gradeOptionsMap[enrollment.enrollment.entryGrade],
    id: enrollment.id,
    Nombre: enrollment.personalStudentInfo.fullName,
  }));

  const columns: ColumnDef<EnrolledStudentsTableRow>[] = [
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
    {
      cell: (rowData) => {
        const id = rowData.row.original.id;
        const enrollmentData = safeData.find(
          (enrollment) => enrollment.id === id
        );
        return <EnrolledStudentDialog enrollmentData={enrollmentData} />;
      },
      header: 'Acciones',
      id: 'actions',
    },
  ];

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  if (getEnrollmentsQuery.isLoading) {
    return (
      <EnrolledStudentsTableSkeleton
        columns={columns.map((column) => column.header as string)}
      />
    );
  }

  if (getEnrollmentsQuery.isError) {
    return (
      <div>
        Error cargando los datos, contacte al ingeniero para recibir asistencia.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Matriculas</h1>

      <div className="bg-stone-100 rounded-xl p-4">
        <Table>
          <EnrolledStudentsTableHeader table={table} />
          <EnrolledStudentsTableBody table={table} />
        </Table>
      </div>
    </div>
  );
}
