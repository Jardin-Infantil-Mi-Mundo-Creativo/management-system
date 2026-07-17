import type { z } from 'zod';

import type { useEnrollmentFormSchema } from '@/schemas/enrollment';

type ParentInformation = {
  address: string;
  ageYears: number;
  birthDate: string;
  cellPhoneNumber: string;
  educationLevel: string;
  email: string;
  fullName: string;
  identificationNumber: string;
  neighborhood: string;
  occupation: string;
  stratum: string;
  telephoneNumber: string;
};

type ParentInformationDraft = Partial<ParentInformation>;

type EnrollmentFormValues = z.input<ReturnType<typeof useEnrollmentFormSchema>>;
// Kept as the form-facing alias while callers migrate to the clearer name.
type EnrollmentFormSchema = EnrollmentFormValues;
type EnrollmentCreatePayload = Omit<
  EnrollmentFormValues,
  'father' | 'mother' | 'omitFather' | 'omitMother'
> & {
  father: ParentInformation | null;
  mother: ParentInformation | null;
};

export type {
  EnrollmentCreatePayload,
  EnrollmentFormSchema,
  EnrollmentFormValues,
  ParentInformation,
  ParentInformationDraft,
};
