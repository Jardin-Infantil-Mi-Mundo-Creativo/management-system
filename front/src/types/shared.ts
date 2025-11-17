import type { EnrollmentFormSchema } from '@/types/enrollment';

type EnrollmentFormSchemaWithDocumentId = EnrollmentFormSchema & {
  id: string;
};

export type { EnrollmentFormSchemaWithDocumentId };
