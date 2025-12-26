import { z } from 'zod';

const enrolledStudentDialogContentInfoSchema = z.object({
  documentsFile: z.custom<File | null>(
    (val) => val !== undefined && val !== null,
    'El documento de adjuntos es requerido'
  ),
  studentPhoto: z.custom<File | null>(
    (val) => val !== undefined && val !== null,
    'La foto del estudiante es requerida'
  ),
});

export { enrolledStudentDialogContentInfoSchema };
