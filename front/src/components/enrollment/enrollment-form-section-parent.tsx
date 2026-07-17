import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type {
  Control,
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormResetField,
  UseFormSetValue,
} from 'react-hook-form';

import { ControlledDatePicker } from '@/components/enrollment/controlled-date-picker';
import { ControlledDropdown } from '@/components/enrollment/controlled-dropdown';
import { EnrollmentFormSectionHeader } from '@/components/enrollment/enrollment';
import { InputGroup } from '@/components/ui/input-group';
import { Checkbox } from '@/components/ui/shadcn/checkbox';
import { Label } from '@/components/ui/shadcn/label';
import {
  PARENT_INFORMATION_DEFAULTS,
  useEnrollmentOptions,
} from '@/consts/enrollment';
import { cn } from '@/lib/utils';
import type { EnrollmentFormSchema } from '@/types/enrollment';
import { calculateAgeYears } from '@/utils/enrollment/calculate-age';

interface EnrollmentFormSectionParentProps {
  clearErrors: UseFormClearErrors<EnrollmentFormSchema>;
  control: Control<EnrollmentFormSchema>;
  errors: FieldErrors<EnrollmentFormSchema>;
  parent: 'mother' | 'father';
  register: UseFormRegister<EnrollmentFormSchema>;
  resetField: UseFormResetField<EnrollmentFormSchema>;
  setValue: UseFormSetValue<EnrollmentFormSchema>;
}

function EnrollmentFormSectionParent({
  clearErrors,
  control,
  errors,
  parent,
  register,
  resetField,
  setValue,
}: EnrollmentFormSectionParentProps) {
  const { EDUCATION_LEVEL_OPTIONS, STRATUM_OPTIONS } = useEnrollmentOptions();
  const t = useTranslations('enrollment');
  const omissionField = parent === 'mother' ? 'omitMother' : 'omitFather';
  const [isOmitted, setIsOmitted] = useState(false);
  const omissionError =
    parent === 'mother' ? errors.omitMother?.message : undefined;
  const helpId = `${parent}-omission-help`;

  const handleOmissionChange = (checked: boolean) => {
    setIsOmitted(checked);
    setValue(omissionField, checked, { shouldDirty: true, shouldValidate: true });
    if (checked) {
      clearErrors(parent);
      resetField(parent, { defaultValue: { ...PARENT_INFORMATION_DEFAULTS } });
    }
  };

  return (
    <div className='transition-opacity'>
      <EnrollmentFormSectionHeader>
        {t(`parent.${parent}`)}
      </EnrollmentFormSectionHeader>

      <div className="mt-2 flex items-center gap-2">
        <Checkbox
          id={omissionField}
          type="button"
          aria-describedby={
            omissionError ? `${helpId} ${parent}-omission-error` : helpId
          }
          onCheckedChange={(checked) =>
            handleOmissionChange(checked === true)
          }
        />
        <Label htmlFor={omissionField} className="font-medium">
          {parent === 'mother'
            ? 'Omitir información de la madre'
            : 'Omitir información del padre'}
        </Label>
      </div>
      <p id={helpId} className="mt-1 text-sm text-muted-foreground">
        {isOmitted
          ? 'Esta información no será registrada.'
          : 'Marque esta opción solo si no desea registrar esta información.'}
      </p>
      {omissionError ? (
        <p
          id={`${parent}-omission-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {omissionError}
        </p>
      ) : null}

      <fieldset
        disabled={isOmitted}
        aria-describedby={helpId}
        className={cn(
          'mt-4 flex flex-col gap-4 disabled:cursor-not-allowed',
          isOmitted && 'opacity-60'
        )}
      >
        <legend className="sr-only">{t(`parent.${parent}`)}</legend>
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
            disabled={isOmitted}
            onValueChange={(value) =>
              setValue(`${parent}.ageYears`, calculateAgeYears(value))
            }
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
            disabled={isOmitted}
          />
          <ControlledDropdown
            control={control}
            inputId={`${parent}.stratum`}
            labelText={t('parent.stratum')}
            errorMessage={errors[parent]?.stratum?.message}
            variant="multiple"
            options={STRATUM_OPTIONS}
            disabled={isOmitted}
          />
        </div>
      </fieldset>
    </div>
  );
}

export { EnrollmentFormSectionParent };
