import type {
  EnrollmentCreatePayload,
  EnrollmentFormValues,
  ParentInformation,
} from '@/types/enrollment';

function normalizeEnrollmentPayload(
  values: EnrollmentFormValues
): EnrollmentCreatePayload {
  const { father, mother, omitFather, omitMother, ...payload } = values;

  return {
    ...payload,
    father: omitFather || !father ? null : (father as ParentInformation),
    mother: omitMother || !mother ? null : (mother as ParentInformation),
  };
}

export { normalizeEnrollmentPayload };
