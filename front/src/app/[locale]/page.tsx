'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

import { EnrolledStudentDeleteDialog } from '@/components/enrolled-students/enrolled-student-delete-dialog';
import {
  EnrolledStudentDialog,
  EnrolledStudentsTableBody,
  EnrolledStudentsTableHeader,
  EnrolledStudentsTableSkeleton,
} from '@/components/enrolled-students/enrolled-students';
import { Table } from '@/components/ui/shadcn/table';
import { useEnrollmentOptions } from '@/consts/enrollment';
import { useGetEnrollmentsQuery } from '@/queries/enrollment/use-get-enrollments-query';
import type { EnrolledStudentsTableRow } from '@/types/enrolled-students';
import type { AdditionalBackendFields } from '@/types/shared';

export default function Home() {
  const { getEnrollmentsQuery, safeData } = useGetEnrollmentsQuery();

  const { GRADE_OPTIONS } = useEnrollmentOptions();
  const gradeOptionsMap = GRADE_OPTIONS.reduce(
    (acc, option) => {
      acc[option.value] = option.label;
      return acc;
    },
    {} as Record<string, string>
  );

  const filterAndFormatEnrollmentData = useCallback(
    (
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
    },
    [gradeOptionsMap, safeData]
  );

  const completedEnrollmentsData = useMemo(
    () => filterAndFormatEnrollmentData('completed'),
    [filterAndFormatEnrollmentData]
  );
  const draftEnrollmentsData = useMemo(
    () => filterAndFormatEnrollmentData('draft'),
    [filterAndFormatEnrollmentData]
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
          return (
            <div className="flex gap-4">
              <EnrolledStudentDialog enrollmentData={enrollmentData} />
              <EnrolledStudentDeleteDialog
                enrollmentId={enrollmentData?.id ?? ''}
                studentName={enrollmentData?.personalStudentInfo.fullName ?? ''}
              />
            </div>
          );
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
    getRowId: (row) => row.id,
  });

  const draftEnrollmentsTable = useReactTable({
    columns,
    data: draftEnrollmentsData,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
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
