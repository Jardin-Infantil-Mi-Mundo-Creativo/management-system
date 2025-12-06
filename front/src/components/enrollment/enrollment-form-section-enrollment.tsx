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
import { GRADE_OPTIONS } from '@/consts/enrollment';
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
  return (
    <>
      <EnrollmentFormSectionHeader>Matricula</EnrollmentFormSectionHeader>

      <InputGroup
        className="w-52"
        label="Fecha de matricula:"
        inputId="enrollment.date"
        register={register('enrollment.date')}
        disabled={true}
      />

      <div className="flex gap-4">
        <ControlledDropdown
          control={control}
          inputId="enrollment.isOldStudent"
          labelText="Es estudiante antiguo:"
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
            labelText="Primera vez que asiste a un jardín:"
            errorMessage={enrollmentErrors?.isFirstTime?.message}
            onValueChange={(v) => {
              if (v === 'yes') {
                setValue('enrollment.previousSchoolName', '');
              }
            }}
          />

          {enrollmentWatchedValues?.isFirstTime === false && (
            <InputGroup
              label="Nombre de la entidad escolar a la que asistió:"
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
        labelText="Grado al que ingresa:"
        errorMessage={enrollmentErrors?.entryGrade?.message}
        variant="multiple"
        options={GRADE_OPTIONS}
      />
    </>
  );
}

export { EnrollmentFormSectionEnrollment };
