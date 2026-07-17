import { describe, expect, it } from 'vitest';

import { PARENT_INFORMATION_DEFAULTS } from '@/consts/enrollment';
import { useEnrollmentFormSchema } from '@/schemas/enrollment';
import { renderHook, TestProviders } from '@/test/render';
import type {
  EnrollmentFormValues,
  ParentInformation,
} from '@/types/enrollment';
import { normalizeEnrollmentPayload } from '@/utils/enrollment/normalize-enrollment-payload';
import { validateParentOmission } from '@/utils/enrollment/validate-parent-omission';

const completeParent: ParentInformation = {
  ...PARENT_INFORMATION_DEFAULTS,
  address: 'Calle 1',
  ageYears: 40,
  birthDate: '01/01/1986',
  cellPhoneNumber: '3001234567',
  educationLevel: 'technical',
  email: 'parent@example.com',
  fullName: 'Ana Pérez',
  identificationNumber: '123456789',
  neighborhood: 'Centro',
  occupation: 'Docente',
  stratum: '3',
  telephoneNumber: '',
};

function getSchema() {
  return renderHook(() => useEnrollmentFormSchema(), {
    wrapper: TestProviders,
  }).result.current;
}

describe('enrollment parent validation and payload', () => {
  it('keeps an unchecked parent required and skips field errors for an omitted parent', () => {
    const schema = getSchema();
    const result = schema.safeParse({
      father: PARENT_INFORMATION_DEFAULTS,
      mother: completeParent,
      omitFather: false,
      omitMother: true,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((issue) => issue.path[0] === 'father')
      ).toBe(true);
      expect(
        result.error.issues.some((issue) => issue.path[0] === 'mother')
      ).toBe(false);
    }
  });

  it('accepts either omitted parent, rejects both omissions, and normalizes UI flags away', () => {
    const schema = getSchema();
    const bothOmitted = schema.safeParse({
      father: PARENT_INFORMATION_DEFAULTS,
      mother: PARENT_INFORMATION_DEFAULTS,
      omitFather: true,
      omitMother: true,
    });
    const onlyMother: Partial<EnrollmentFormValues> = {
      father: PARENT_INFORMATION_DEFAULTS,
      mother: completeParent,
      omitFather: true,
      omitMother: false,
    };
    const onlyFather: Partial<EnrollmentFormValues> = {
      father: completeParent,
      mother: PARENT_INFORMATION_DEFAULTS,
      omitFather: false,
      omitMother: true,
    };

    expect(validateParentOmission(true, true)).toBe(
      'Registre la información de al menos uno de los padres'
    );
    expect(validateParentOmission(false, true)).toBeUndefined();
    expect(bothOmitted.success).toBe(false);
    if (!bothOmitted.success) {
      expect(
        bothOmitted.error.issues.some(
          (issue) =>
            issue.message ===
            'Registre la información de al menos uno de los padres'
        )
      ).toBe(true);
      expect(
        bothOmitted.error.issues.some(
          (issue) => issue.path[0] === 'mother' || issue.path[0] === 'father'
        )
      ).toBe(false);
    }
    expect(normalizeEnrollmentPayload(onlyMother as EnrollmentFormValues)).toMatchObject({
      father: null,
      mother: completeParent,
    });
    expect(normalizeEnrollmentPayload(onlyFather as EnrollmentFormValues)).toMatchObject({
      father: completeParent,
      mother: null,
    });
    expect(
      normalizeEnrollmentPayload(onlyMother as EnrollmentFormValues)
    ).not.toHaveProperty(
      'omitFather'
    );
    expect(
      normalizeEnrollmentPayload(onlyMother as EnrollmentFormValues)
    ).not.toHaveProperty(
      'omitMother'
    );
  });
});
