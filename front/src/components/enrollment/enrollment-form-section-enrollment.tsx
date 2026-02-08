import { useTranslations } from 'next-intl';
import type {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { ControlledDropdown } from '@/components/enrollment/controlled-dropdown';
import { EnrollmentFormSectionHeader } from '@/components/enrollment/enrollment';
import { InputGroup } from '@/components/ui/input-group';
import { useEnrollmentOptions } from '@/consts/enrollment';
import type { EnrollmentFormSchema } from '@/types/enrollment';

interface EnrollmentFormSectionEnrollmentProps {
  control: Control<EnrollmentFormSchema>;
  enrollmentErrors?: Merge<
    FieldError,
    FieldErrorsImpl<EnrollmentFormSchema['enrollment']>
  >;
  enrollmentWatchedValues?: EnrollmentFormSchema['enrollment'];
  register: UseFormRegister<EnrollmentFormSchema>;
  setValue: UseFormSetValue<EnrollmentFormSchema>;
}

function EnrollmentFormSectionEnrollment({
  control,
  enrollmentErrors,
  enrollmentWatchedValues,
  register,
  setValue,
}: EnrollmentFormSectionEnrollmentProps) {
  const { GRADE_OPTIONS } = useEnrollmentOptions();
  const t = useTranslations('enrollment.enrollment');

  return (
    <>
      <EnrollmentFormSectionHeader>{t('heading')}</EnrollmentFormSectionHeader>

      <InputGroup
        className="w-52"
        label={t('enrollmentDate')}
        inputId="enrollment.date"
        register={register('enrollment.date')}
        disabled={true}
      />

      <div className="flex gap-4">
        <ControlledDropdown
          control={control}
          inputId="enrollment.isOldStudent"
          labelText={t('isOldStudent')}
          errorMessage={enrollmentErrors?.isOldStudent?.message}
          onValueChange={(v) => {
            if (v === 'no') {
              setValue('enrollment.previousSchoolName', '');
              setValue('enrollment.isFirstTime', undefined);
            } else {
              setValue(
                'enrollment.previousSchoolName',
                'Jardín Infantil Mi Mundo Creativo'
              );
              setValue('enrollment.isFirstTime', false);
            }
          }}
        />
      </div>

      {enrollmentWatchedValues?.isOldStudent === false && (
        <div className="flex gap-4">
          <ControlledDropdown
            control={control}
            inputId="enrollment.isFirstTime"
            labelText={t('isFirstTime')}
            errorMessage={enrollmentErrors?.isFirstTime?.message}
            onValueChange={(v) => {
              if (v === 'yes') {
                setValue('enrollment.previousSchoolName', '');
              }
            }}
          />

          {enrollmentWatchedValues?.isFirstTime === false && (
            <InputGroup
              label={t('previousSchoolName')}
              inputId="enrollment.previousSchoolName"
              register={register('enrollment.previousSchoolName')}
              errorMessage={enrollmentErrors?.previousSchoolName?.message}
            />
          )}
        </div>
      )}

      <ControlledDropdown
        control={control}
        inputId="enrollment.entryGrade"
        labelText={t('entryGrade')}
        errorMessage={enrollmentErrors?.entryGrade?.message}
        variant="multiple"
        options={GRADE_OPTIONS}
      />
    </>
  );
}

export { EnrollmentFormSectionEnrollment };
