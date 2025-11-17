import type { z } from 'zod';
import type { enrollmentFormSchema } from '@/schemas/enrollment';

type EnrollmentFormSchema = z.infer<typeof enrollmentFormSchema>;

export type { EnrollmentFormSchema };
