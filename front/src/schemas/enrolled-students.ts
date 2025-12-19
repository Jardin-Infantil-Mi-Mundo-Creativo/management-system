import { z } from 'zod';

import { enrollmentFilesSchema } from '@/schemas/shared';

const EnrolledStudentDialogContentInfoSchema = z.object({
  ...enrollmentFilesSchema.shape,
  documentsFile: z.any().refine((files) => files?.length > 0, {
    message: 'El documento de identidad es requerido',
  }),
  studentPhoto: z.any().refine((files) => files?.length > 0, {
    message: 'La foto del estudiante es requerida',
  }),
});

type EnrolledStudentDialogContentInfoSchemaType = z.infer<
  typeof EnrolledStudentDialogContentInfoSchema
>;

export { EnrolledStudentDialogContentInfoSchema };
export type { EnrolledStudentDialogContentInfoSchemaType };
