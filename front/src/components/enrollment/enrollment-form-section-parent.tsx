import { useTranslations } from 'next-intl';
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { ControlledDatePicker } from '@/components/enrollment/controlled-date-picker';
import { ControlledDropdown } from '@/components/enrollment/controlled-dropdown';
import { EnrollmentFormSectionHeader } from '@/components/enrollment/enrollment';
import { InputGroup } from '@/components/ui/input-group';
import { useEnrollmentOptions } from '@/consts/enrollment';
import type { EnrollmentFormSchema } from '@/types/enrollment';
import { calculateAgeYears } from '@/utils/enrollment/calculate-age';

interface EnrollmentFormSectionParentProps {
  control: Control<EnrollmentFormSchema>;
  errors: FieldErrors<EnrollmentFormSchema>;
  parent: 'mother' | 'father';
  register: UseFormRegister<EnrollmentFormSchema>;
  setValue: UseFormSetValue<EnrollmentFormSchema>;
}

function EnrollmentFormSectionParent({
  control,
  errors,
  parent,
  register,
  setValue,
}: EnrollmentFormSectionParentProps) {
  const { EDUCATION_LEVEL_OPTIONS, STRATUM_OPTIONS } = useEnrollmentOptions();

  const t = useTranslations('enrollment');

  return (
    <>
      <EnrollmentFormSectionHeader>
        {t(`parent.${parent}`)}
      </EnrollmentFormSectionHeader>
      <InputGroup
        className="w-full"
        label={t('fullName')}
        inputId={`${parent}.fullName`}
        register={register(`${parent}.fullName`)}
        errorMessage={errors[parent]?.fullName?.message}
      />

      <div className="flex gap-4">
        <ControlledDatePicker
          control={control}
          inputId={`${parent}.birthDate`}
          labelText={t('birthDate')}
          errorMessage={errors[parent]?.birthDate?.message}
          onValueChange={(value) => {
            const calculatedAgeYears = calculateAgeYears(value);
            setValue(`${parent}.ageYears`, calculatedAgeYears);
          }}
        />

        <InputGroup
          className="w-16"
          label={t('parent.age')}
          inputId={`${parent}.ageYears`}
          register={register(`${parent}.ageYears`)}
          disabled={true}
        />

        <InputGroup
          className="w-56"
          label={t('parent.idNumber')}
          inputId={`${parent}.identificationNumber`}
          register={register(`${parent}.identificationNumber`)}
          errorMessage={errors[parent]?.identificationNumber?.message}
        />
      </div>

      <div className="flex gap-4">
        <InputGroup
          className="w-full"
          label={t('address')}
          inputId={`${parent}.address`}
          register={register(`${parent}.address`)}
          errorMessage={errors[parent]?.address?.message}
        />

        <InputGroup
          className="w-full"
          label={t('parent.neighborhood')}
          inputId={`${parent}.neighborhood`}
          register={register(`${parent}.neighborhood`)}
          errorMessage={errors[parent]?.neighborhood?.message}
        />
      </div>

      <div className="flex gap-4">
        <InputGroup
          className="w-full"
          label={t('cellPhoneNumber')}
          inputId={`${parent}.cellPhoneNumber`}
          register={register(`${parent}.cellPhoneNumber`)}
          errorMessage={errors[parent]?.cellPhoneNumber?.message}
        />

        <InputGroup
          className="w-full"
          label={t('telephoneNumber')}
          inputId={`${parent}.telephoneNumber`}
          register={register(`${parent}.telephoneNumber`)}
          errorMessage={errors[parent]?.telephoneNumber?.message}
        />

        <InputGroup
          className="w-full"
          label={t('email')}
          inputId={`${parent}.email`}
          register={register(`${parent}.email`)}
          errorMessage={errors[parent]?.email?.message}
        />
      </div>

      <InputGroup
        label={t('parent.occupation')}
        inputId={`${parent}.occupation`}
        register={register(`${parent}.occupation`)}
        errorMessage={errors[parent]?.occupation?.message}
      />

      <div className="flex gap-4">
        <ControlledDropdown
          control={control}
          inputId={`${parent}.educationLevel`}
          labelText={t('parent.educationLevel')}
          errorMessage={errors[parent]?.educationLevel?.message}
          variant="multiple"
          options={EDUCATION_LEVEL_OPTIONS}
        />

        <ControlledDropdown
          control={control}
          inputId={`${parent}.stratum`}
          labelText={t('parent.stratum')}
          errorMessage={errors[parent]?.stratum?.message}
          variant="multiple"
          options={STRATUM_OPTIONS}
        />
      </div>
    </>
  );
}

export { EnrollmentFormSectionParent };
