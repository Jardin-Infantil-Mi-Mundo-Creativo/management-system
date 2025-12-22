'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

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
import type { AdditionalBackendFields } from '@/types/shared';

export default function Home() {
  const { getEnrollmentsQuery, safeData } = useGetEnrollmentsQuery();

  const gradeOptionsMap = GRADE_OPTIONS.reduce(
    (acc, option) => {
      acc[option.value] = option.label;
      return acc;
    },
    {} as Record<string, string>
  );

  const filterAndFormatEnrollmentData = (
    enrollmentsType: AdditionalBackendFields['state']
  ): EnrolledStudentsTableRow[] => {
    return safeData
      .filter((enrollment) => enrollment.state === enrollmentsType)
      .map((enrollment) => ({
        'Documento del estudiante':
          enrollment.personalStudentInfo.civilRegistrationNumber,
        Grado: gradeOptionsMap[enrollment.enrollment.entryGrade],
        id: enrollment.id,
        Nombre: enrollment.personalStudentInfo.fullName,
      }));
  };

  const completedEnrollmentsData = useMemo(
    () => filterAndFormatEnrollmentData('completed'),
    [safeData]
  );
  const draftEnrollmentsData = useMemo(
    () => filterAndFormatEnrollmentData('draft'),
    [safeData]
  );

  const columns: ColumnDef<EnrolledStudentsTableRow>[] = useMemo(
    () => [
      {
        accessorKey: 'Documento del estudiante',
        header: 'Documento del estudiante',
        size: 200,
      },
      {
        accessorKey: 'Nombre',
        header: 'Nombre',
        size: 250,
      },
      {
        accessorKey: 'Grado',
        header: 'Grado',
        size: 150,
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
        size: 120,
      },
    ],
    [safeData]
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const completedEnrollmentsTable = useReactTable({
    columns,
    data: completedEnrollmentsData,
    getCoreRowModel: getCoreRowModel(),
  });

  const draftEnrollmentsTable = useReactTable({
    columns,
    data: draftEnrollmentsData,
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

      <div
        data-testid="draft-enrollments-table"
        className="gap-2 flex flex-col"
      >
        <h2 className="text-xl font-bold">Formularios sin completar</h2>

        <div className="bg-stone-100 rounded-xl p-4">
          <Table>
            <EnrolledStudentsTableHeader table={draftEnrollmentsTable} />
            <EnrolledStudentsTableBody table={draftEnrollmentsTable} />
          </Table>
        </div>
      </div>

      <div
        data-testid="completed-enrollments-table"
        className="gap-2 flex flex-col"
      >
        <h2 className="text-xl font-bold">Estudiantes matriculados</h2>

        <div className="bg-stone-100 rounded-xl p-4">
          <Table>
            <EnrolledStudentsTableHeader table={completedEnrollmentsTable} />
            <EnrolledStudentsTableBody table={completedEnrollmentsTable} />
          </Table>
        </div>
      </div>
    </div>
  );
}
