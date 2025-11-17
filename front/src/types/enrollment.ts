import { z } from 'zod';
import { enrollmentFormSchema } from '@/schemas/enrollment';

type EnrollmentFormSchema = z.infer<typeof enrollmentFormSchema>;

export type { EnrollmentFormSchema };