import type { EnrollmentFormSchema } from '@/types/enrollment';

export interface AdditionalBackendFields {
  id: string;
  state: 'draft' | 'completed';
}

type EnrollmentFormSchemaWithDocumentId = EnrollmentFormSchema &
  AdditionalBackendFields;

export type { EnrollmentFormSchemaWithDocumentId };
