import { EnrollmentFormSectionHeader } from '@/components/enrollment/enrollment';
import type {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import type { EnrollmentFormSchema } from '@/types/enrollment';
import { ControlledDropdown } from '@/components/enrollment/controlled-dropdown';
import { GRADE_OPTIONS } from '@/consts/enrollment';
import { InputGroup } from '@/components/ui/input-group';

interface EnrollmentFormSectionEnrollmentProps {
  register: UseFormRegister<EnrollmentFormSchema>;
  control: Control<EnrollmentFormSchema>;
  enrollmentErrors?: Merge<
    FieldError,
    FieldErrorsImpl<EnrollmentFormSchema['enrollment']>
  >;
  enrollmentWatchedValues?: EnrollmentFormSchema['enrollment'];
  setValue: UseFormSetValue<EnrollmentFormSchema>;
}

function EnrollmentFormSectionEnrollment({
  register,
  control,
  enrollmentErrors,
  enrollmentWatchedValues,
  setValue,
}: EnrollmentFormSectionEnrollmentProps) {
  return (
    <>
      <EnrollmentFormSectionHeader>Matricula</EnrollmentFormSectionHeader>

      <InputGroup
        className="w-52"
        label="N°:"
        inputId="enrollment.identificationNumber"
        register={register('enrollment.identificationNumber')}
        disabled={true}
      />

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
