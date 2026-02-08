import { useTranslations } from 'next-intl';
import type {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { ControlledDatePicker } from '@/components/enrollment/controlled-date-picker';
import { EnrollmentFormSectionHeader } from '@/components/enrollment/enrollment';
import { InputGroup } from '@/components/ui/input-group';
import type { EnrollmentFormSchema } from '@/types/enrollment';
import {
  calculateAgeMonths,
  calculateAgeYears,
} from '@/utils/enrollment/calculate-age';

interface EnrollmentFormSectionPersonalStudentInfoProps {
  control: Control<EnrollmentFormSchema>;
  personalStudentInfoErrors?: Merge<
    FieldError,
    FieldErrorsImpl<EnrollmentFormSchema['personalStudentInfo']>
  >;
  register: UseFormRegister<EnrollmentFormSchema>;
  setValue: UseFormSetValue<EnrollmentFormSchema>;
}

function EnrollmentFormSectionPersonalStudentInfo({
  control,
  personalStudentInfoErrors,
  register,
  setValue,
}: EnrollmentFormSectionPersonalStudentInfoProps) {
  const t = useTranslations('enrollment');

  return (
    <>
      <EnrollmentFormSectionHeader>
        {t('personalStudentInfo.heading')}
      </EnrollmentFormSectionHeader>

      <InputGroup
        className="w-full"
        label={t('fullName')}
        inputId="personalStudentInfo.fullName"
        register={register('personalStudentInfo.fullName')}
        errorMessage={personalStudentInfoErrors?.fullName?.message}
      />

      <div className="flex gap-4 flex-wrap">
        <ControlledDatePicker
          control={control}
          inputId="personalStudentInfo.birthDate"
          labelText={t('birthDate')}
          errorMessage={personalStudentInfoErrors?.birthDate?.message}
          onValueChange={(value) => {
            const calculatedAgeYears = calculateAgeYears(value);
            setValue('personalStudentInfo.ageYears', calculatedAgeYears);
            const calculatedAgeMonths = calculateAgeMonths(value);
            setValue('personalStudentInfo.ageMonths', calculatedAgeMonths);
          }}
        />

        <InputGroup
          className="w-28"
          label={t('personalStudentInfo.ageYears')}
          inputId="personalStudentInfo.ageYears"
          register={register('personalStudentInfo.ageYears')}
          disabled={true}
        />

        <InputGroup
          className="w-28"
          label={t('personalStudentInfo.ageMonths')}
          inputId="personalStudentInfo.ageMonths"
          register={register('personalStudentInfo.ageMonths')}
          disabled={true}
        />

        <InputGroup
          className="min-w-48"
          label={t('personalStudentInfo.birthCity')}
          inputId="personalStudentInfo.birthCity"
          register={register('personalStudentInfo.birthCity')}
          errorMessage={personalStudentInfoErrors?.birthCity?.message}
        />

        <InputGroup
          className="min-w-48"
          label={t('personalStudentInfo.civilRegistrationNumber')}
          inputId="personalStudentInfo.civilRegistrationNumber"
          register={register('personalStudentInfo.civilRegistrationNumber')}
          errorMessage={
            personalStudentInfoErrors?.civilRegistrationNumber?.message
          }
        />
      </div>
    </>
  );
}

export { EnrollmentFormSectionPersonalStudentInfo };
