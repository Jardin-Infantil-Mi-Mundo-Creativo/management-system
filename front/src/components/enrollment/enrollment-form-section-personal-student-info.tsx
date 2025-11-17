import { EnrollmentFormSectionHeader } from '@/components/enrollment/enrollment';
import { InputGroup } from '@/components/ui/input-group';
import {
  calculateAgeMonths,
  calculateAgeYears,
} from '@/utils/enrollment/calculate-age';
import { ControlledDatePicker } from '@/components/enrollment/controlled-date-picker';
import type {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import type { EnrollmentFormSchema } from '@/types/enrollment';

interface EnrollmentFormSectionPersonalStudentInfoProps {
  register: UseFormRegister<EnrollmentFormSchema>;
  control: Control<EnrollmentFormSchema>;
  personalStudentInfoErrors?: Merge<
    FieldError,
    FieldErrorsImpl<EnrollmentFormSchema['personalStudentInfo']>
  >;
  setValue: UseFormSetValue<EnrollmentFormSchema>;
}

function EnrollmentFormSectionPersonalStudentInfo({
  register,
  control,
  personalStudentInfoErrors,
  setValue,
}: EnrollmentFormSectionPersonalStudentInfoProps) {
  return (
    <>
      <EnrollmentFormSectionHeader>
        Información personal del estudiante
      </EnrollmentFormSectionHeader>

      <InputGroup
        className="w-full"
        label="Nombre completo:"
        inputId="personalStudentInfo.fullName"
        register={register('personalStudentInfo.fullName')}
        errorMessage={personalStudentInfoErrors?.fullName?.message}
      />

      <div className="flex gap-4 flex-wrap">
        <ControlledDatePicker
          control={control}
          inputId="personalStudentInfo.birthDate"
          labelText="Fecha de nacimiento:"
          errorMessage={personalStudentInfoErrors?.birthDate?.message}
          onValueChange={(value) => {
            const calculatedAgeYears = calculateAgeYears(value);
            setValue('personalStudentInfo.ageYears', calculatedAgeYears);
            const calculatedAgeMonths = calculateAgeMonths(value);
            setValue('personalStudentInfo.ageMonths', calculatedAgeMonths);
          }}
        />

        <InputGroup
          className="w-16"
          label="Años:"
          inputId="personalStudentInfo.ageYears"
          register={register('personalStudentInfo.ageYears')}
          disabled={true}
        />

        <InputGroup
          className="w-16"
          label="Meses:"
          inputId="personalStudentInfo.ageMonths"
          register={register('personalStudentInfo.ageMonths')}
          disabled={true}
        />

        <InputGroup
          className="min-w-48"
          label="Ciudad de nacimiento:"
          inputId="personalStudentInfo.birthCity"
          register={register('personalStudentInfo.birthCity')}
          errorMessage={personalStudentInfoErrors?.birthCity?.message}
        />

        <InputGroup
          className="min-w-48"
          label="N° Registro Civil:"
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
