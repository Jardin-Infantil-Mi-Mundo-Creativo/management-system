import type { z } from 'zod';

import type { enrolledStudentDialogContentInfoSchema } from '@/schemas/enrolled-students';

interface EnrolledStudentsTableRow {
  'Documento del estudiante': string;
  Grado: string;
  id: string;
  Nombre: string;
}

type EnrolledStudentDialogContentInfoSchema = z.infer<
  typeof enrolledStudentDialogContentInfoSchema
>;

export type {
  EnrolledStudentDialogContentInfoSchema,
  EnrolledStudentsTableRow,
};
