import type {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';

import { ControlledCheckbox } from '@/components/enrollment/controlled-checkbox';
import { ControlledDropdown } from '@/components/enrollment/controlled-dropdown';
import { EnrollmentFormSectionHeader } from '@/components/enrollment/enrollment';
import { PARENTS_RELATIONSHIP_OPTIONS } from '@/consts/enrollment';
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
  const livesWithOptions = [
    {
      inputId: 'livesWithParents',
      labelText: 'Padres',
    },
    {
      inputId: 'livesWithSiblings',
      labelText: 'Hermanos',
    },
    {
      inputId: 'livesWithGrandparents',
      labelText: 'Abuelos',
    },
    {
      inputId: 'livesWithUncles',
      labelText: 'Tíos',
    },
    {
      inputId: 'livesWithStepfather',
      labelText: 'Padrastro',
    },
    {
      inputId: 'livesWithStepmother',
      labelText: 'Madrastra',
    },
  ] as const;

  return (
    <>
      <EnrollmentFormSectionHeader>
        Relación familiar
      </EnrollmentFormSectionHeader>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div>Vive con:</div>

          {livesWithOptions.map(({ inputId, labelText }) => (
            <ControlledCheckbox
              key={inputId}
              control={control}
              inputId={`familyRelationship.${inputId}`}
              labelText={labelText}
            />
          ))}
        </div>

        {familyRelationshipErrors?.livesWithParents && (
          <span className="text-sm text-red-600 -mt-2">
            {familyRelationshipErrors?.livesWithParents?.message}
          </span>
        )}

        <div className="flex items-center gap-4 flex-wrap">
          <ControlledDropdown
            control={control}
            inputId="familyRelationship.parentsRelationship"
            labelText="Los padres son:"
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
