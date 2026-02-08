import { useTranslations } from 'next-intl';
import type {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';

import { ControlledCheckbox } from '@/components/enrollment/controlled-checkbox';
import { ControlledDropdown } from '@/components/enrollment/controlled-dropdown';
import { EnrollmentFormSectionHeader } from '@/components/enrollment/enrollment';
import { useEnrollmentOptions } from '@/consts/enrollment';
import type { EnrollmentFormSchema } from '@/types/enrollment';

interface EnrollmentFormSectionFamilyRelationshipProps {
  control: Control<EnrollmentFormSchema>;
  familyRelationshipErrors?: Merge<
    FieldError,
    FieldErrorsImpl<EnrollmentFormSchema['familyRelationship']>
  >;
}

function EnrollmentFormSectionFamilyRelationship({
  control,
  familyRelationshipErrors,
}: EnrollmentFormSectionFamilyRelationshipProps) {
  const { PARENTS_RELATIONSHIP_OPTIONS } = useEnrollmentOptions();

  const t = useTranslations('enrollment.familyRelationship');

  const livesWithOptions = [
    {
      inputId: 'livesWithMother',
      labelText: t('mother'),
    },
    {
      inputId: 'livesWithFather',
      labelText: t('father'),
    },
    {
      inputId: 'livesWithSiblings',
      labelText: t('siblings'),
    },
    {
      inputId: 'livesWithGrandparents',
      labelText: t('grandParents'),
    },
    {
      inputId: 'livesWithUncles',
      labelText: t('uncles'),
    },
    {
      inputId: 'livesWithStepfather',
      labelText: t('stepFather'),
    },
    {
      inputId: 'livesWithStepmother',
      labelText: t('stepMother'),
    },
  ] as const;

  return (
    <>
      <EnrollmentFormSectionHeader>{t('heading')}</EnrollmentFormSectionHeader>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div>{t('livesWith')}:</div>

          {livesWithOptions.map(({ inputId, labelText }) => (
            <ControlledCheckbox
              key={inputId}
              control={control}
              inputId={`familyRelationship.${inputId}`}
              labelText={labelText}
            />
          ))}
        </div>

        {familyRelationshipErrors?.livesWithMother && (
          <span
            className="text-sm text-red-600 -mt-2"
            data-testid="form-error-message"
          >
            {familyRelationshipErrors?.livesWithMother?.message}
          </span>
        )}

        <div className="flex items-center gap-4 flex-wrap">
          <ControlledDropdown
            control={control}
            inputId="familyRelationship.parentsRelationship"
            labelText={t('parentsRelationship')}
            errorMessage={
              familyRelationshipErrors?.parentsRelationship?.message
            }
            variant="multiple"
            options={PARENTS_RELATIONSHIP_OPTIONS}
          />
        </div>
      </div>
    </>
  );
}

export { EnrollmentFormSectionFamilyRelationship };
