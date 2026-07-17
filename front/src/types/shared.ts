import type { EnrollmentCreatePayload } from '@/types/enrollment';

export interface AdditionalBackendFields {
  id: string;
  state: 'draft' | 'completed' | 'retired';
}

type EnrollmentFormSchemaWithDocumentId = EnrollmentCreatePayload &
  AdditionalBackendFields;

export type { EnrollmentFormSchemaWithDocumentId };
