import { EnrollmentFormSectionHeader } from '@/components/enrollment/enrollment'
import { InputGroup } from '@/components/ui/input-group'
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import type { EnrollmentFormSchema } from '@/types/enrollment';
import { ControlledDropdown } from '@/components/enrollment/controlled-dropdown'
import { ControlledCheckbox } from '@/components/enrollment/controlled-checkbox';

interface EnrollmentFormSectionStudentHealthProps {
  register: UseFormRegister<EnrollmentFormSchema>;
  control: Control<EnrollmentFormSchema>;
  errors: FieldErrors<EnrollmentFormSchema>;
  studentHealthRendererFieldsOnly?: EnrollmentFormSchema['rendererFieldsOnly']['studentHealth'];
};

function EnrollmentFormSectionStudentHealth({
  register,
  control,
  errors,
  studentHealthRendererFieldsOnly
}: EnrollmentFormSectionStudentHealthProps) {
  const disabilityOptions = [
    {
      inputId: 'studentHealth.hasPhysicalDisability',
      labelText: 'Física',
    },
    {
      inputId: 'studentHealth.hasHearingDisability',
      labelText: 'Auditiva',
    },
    {
      inputId: 'rendererFieldsOnly.studentHealth.hasDisabilityOther',
      labelText: 'Otra(s)',
    },
  ] as const;

  const disorderOptions = [
    {
      inputId: 'studentHealth.hasAutism',
      labelText: 'Autismo',
    },
    {
      inputId: 'studentHealth.hasDownSyndrome',
      labelText: 'Síndrome de Down',
    },
    {
      inputId: 'studentHealth.hasBehavioralDisorders',
      labelText: 'Conductual',
    },
    {
      inputId: 'studentHealth.hasLanguageDisorders',
      labelText: 'Lenguaje',
    },
    {
      inputId: 'studentHealth.hasHyperactivity',
      labelText: 'Hiperactividad',
    },
    {
      inputId: 'studentHealth.hasAttentionDisorders',
      labelText: 'Atención',
    },
    {
      inputId: 'studentHealth.hasAnxiety',
      labelText: 'Ansiedad',
    },
    {
      inputId: 'rendererFieldsOnly.studentHealth.hasDisorderOther',
      labelText: 'Otro(s)',
    },
  ] as const;
  return (
    <>
      <EnrollmentFormSectionHeader>
        Salud del estudiante
      </EnrollmentFormSectionHeader>

      <div className="flex items-end gap-4 flex-wrap">
        <ControlledDropdown
          control={control}
          inputId='rendererFieldsOnly.studentHealth.hasDisability'
          labelText='Presenta alguna discapacidad:'
          errorMessage={errors.rendererFieldsOnly?.studentHealth?.hasDisability?.message}
        />

        {studentHealthRendererFieldsOnly?.hasDisability && (
          <>
            {disabilityOptions.map(({ inputId, labelText }) => (
              <ControlledCheckbox
                key={inputId}
                control={control}
                inputId={inputId}
                labelText={labelText}
              />
            ))}

            {studentHealthRendererFieldsOnly?.hasDisabilityOther && (
              <InputGroup
                className='min-w-96 flex-1'
                label="¿Cuál(es)?"
                inputId="studentHealth.otherDisabilities"
                register={register('studentHealth.otherDisabilities')}
                errorMessage={errors.studentHealth?.otherDisabilities?.message}
              />
            )}
          </>
        )}
      </div>

      <div className="flex items-end gap-4 flex-wrap">
        <ControlledDropdown
          control={control}
          inputId='rendererFieldsOnly.studentHealth.hasDisorders'
          labelText='Presenta algún trastorno:'
          errorMessage={errors.rendererFieldsOnly?.studentHealth?.hasDisorders?.message}
        />

        {studentHealthRendererFieldsOnly?.hasDisorders === true && (
          <div className="flex items-end gap-4 flex-wrap">
            {disorderOptions.map(({ inputId, labelText }) => (
              <ControlledCheckbox
                key={inputId}
                control={control}
                inputId={inputId}
                labelText={labelText}
              />
            ))}

            {studentHealthRendererFieldsOnly?.hasDisorderOther && (
              <InputGroup
                className='min-w-96 flex-1'
                label="¿Cuál(es)?"
                inputId="studentHealth.otherDisorders"
                register={register('studentHealth.otherDisorders')}
                errorMessage={errors.studentHealth?.otherDisorders?.message}
              />
            )}
          </div>
        )}

      </div>

      <div className="flex gap-4">
        <ControlledDropdown
          control={control}
          inputId='rendererFieldsOnly.studentHealth.hasTherapy'
          labelText='Asiste a terapia(s):'
          errorMessage={errors.rendererFieldsOnly?.studentHealth?.hasTherapy?.message}
        />

        {studentHealthRendererFieldsOnly?.hasTherapy && (
          <InputGroup
            className='w-full'
            label="¿Cuál(es)?"
            inputId="studentHealth.therapies"
            register={register('studentHealth.therapies')}
            errorMessage={errors.studentHealth?.therapies?.message}
          />
        )}
      </div>

      <div className="flex gap-4">
        <ControlledDropdown
          control={control}
          inputId='studentHealth.hasSisben'
          labelText='Tiene SISBEN:'
          errorMessage={errors.studentHealth?.hasSisben?.message}
        />

        <InputGroup
          className='w-full'
          label="E.P.S:"
          inputId="studentHealth.eps"
          register={register('studentHealth.eps')}
          errorMessage={errors.studentHealth?.eps?.message}
        />

        <ControlledDropdown
          control={control}
          inputId='studentHealth.hasRhPositiveBloodType'
          labelText='R.H:'
          labelForYes='Positivo'
          labelForNo='Negativo'
          errorMessage={errors.studentHealth?.hasRhPositiveBloodType?.message}
        />
      </div>

      <div className="flex gap-4">
        <ControlledDropdown
          control={control}
          inputId='rendererFieldsOnly.studentHealth.hasAllergy'
          labelText='Tiene alergias:'
          errorMessage={errors.rendererFieldsOnly?.studentHealth?.hasAllergy?.message}
        />

        {studentHealthRendererFieldsOnly?.hasAllergy && (
          <InputGroup
            className='w-full'
            label="¿Cuál(es)?"
            inputId="studentHealth.allergies"
            register={register('studentHealth.allergies')}
            errorMessage={errors.studentHealth?.allergies?.message}
          />
        )}
      </div>

      <div className="flex gap-4">
        <ControlledDropdown
          control={control}
          inputId='studentHealth.hasEnuresis'
          labelText='Tiene enuresis:'
          errorMessage={errors.studentHealth?.hasEnuresis?.message}
        />

        <ControlledDropdown
          control={control}
          inputId='studentHealth.hasEncopresis'
          labelText='Tiene encopresis:'
          errorMessage={errors.studentHealth?.hasEncopresis?.message}
        />
      </div>
    </>
  )
}

export { EnrollmentFormSectionStudentHealth };
