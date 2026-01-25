import type { z } from 'zod';

import type { useEnrollmentFormSchema } from '@/schemas/enrollment';

type EnrollmentFormSchema = z.infer<ReturnType<typeof useEnrollmentFormSchema>>;

export type { EnrollmentFormSchema };
