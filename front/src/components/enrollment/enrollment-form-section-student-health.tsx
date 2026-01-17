import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { ControlledCheckbox } from '@/components/enrollment/controlled-checkbox';
import { ControlledDropdown } from '@/components/enrollment/controlled-dropdown';
import { EnrollmentFormSectionHeader } from '@/components/enrollment/enrollment';
import { InputGroup } from '@/components/ui/input-group';
import { BLOOD_TYPE_OPTIONS, SISBEN_OPTIONS } from '@/consts/enrollment';
import type { EnrollmentFormSchema } from '@/types/enrollment';

interface EnrollmentFormSectionStudentHealthProps {
  control: Control<EnrollmentFormSchema>;
  errors: FieldErrors<EnrollmentFormSchema>;
  register: UseFormRegister<EnrollmentFormSchema>;
  setValue: UseFormSetValue<EnrollmentFormSchema>;
  studentHealthRendererFieldsOnly?: EnrollmentFormSchema['rendererFieldsOnly']['studentHealth'];
}

function EnrollmentFormSectionStudentHealth({
  control,
  errors,
  register,
  setValue,
  studentHealthRendererFieldsOnly,
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
          inputId="rendererFieldsOnly.studentHealth.hasDisability"
          labelText="Presenta alguna discapacidad:"
          errorMessage={
            errors.rendererFieldsOnly?.studentHealth?.hasDisability?.message
          }
          onValueChange={(v) => {
            if (v === 'no') {
              setValue('studentHealth.hasPhysicalDisability', false);
              setValue('studentHealth.hasHearingDisability', false);
              setValue(
                'rendererFieldsOnly.studentHealth.hasDisabilityOther',
                false
              );
              setValue('studentHealth.otherDisabilities', '');
            }
          }}
        />

        {studentHealthRendererFieldsOnly?.hasDisability && (
          <>
            {disabilityOptions.map(({ inputId, labelText }) => (
              <ControlledCheckbox
                key={inputId}
                control={control}
                inputId={inputId}
                labelText={labelText}
                onValueChange={(v) => {
                  if (
                    inputId ===
                      'rendererFieldsOnly.studentHealth.hasDisabilityOther' &&
                    !v
                  ) {
                    setValue('studentHealth.otherDisabilities', '');
                  }
                }}
              />
            ))}

            {studentHealthRendererFieldsOnly?.hasDisabilityOther && (
              <InputGroup
                className="min-w-96 flex-1"
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
          inputId="rendererFieldsOnly.studentHealth.hasDisorders"
          labelText="Presenta algún trastorno:"
          errorMessage={
            errors.rendererFieldsOnly?.studentHealth?.hasDisorders?.message
          }
          onValueChange={(v) => {
            if (v === 'no') {
              setValue('studentHealth.hasAutism', false);
              setValue('studentHealth.hasDownSyndrome', false);
              setValue('studentHealth.hasBehavioralDisorders', false);
              setValue('studentHealth.hasLanguageDisorders', false);
              setValue('studentHealth.hasHyperactivity', false);
              setValue('studentHealth.hasAttentionDisorders', false);
              setValue(
                'rendererFieldsOnly.studentHealth.hasDisorderOther',
                false
              );
              setValue('studentHealth.otherDisorders', '');
            }
          }}
        />

        {studentHealthRendererFieldsOnly?.hasDisorders === true && (
          <div className="flex items-end gap-4 flex-wrap">
            {disorderOptions.map(({ inputId, labelText }) => (
              <ControlledCheckbox
                key={inputId}
                control={control}
                inputId={inputId}
                labelText={labelText}
                onValueChange={(v) => {
                  if (
                    inputId ===
                      'rendererFieldsOnly.studentHealth.hasDisorderOther' &&
                    !v
                  ) {
                    setValue('studentHealth.otherDisorders', '');
                  }
                }}
              />
            ))}

            {studentHealthRendererFieldsOnly?.hasDisorderOther && (
              <InputGroup
                className="min-w-96 flex-1"
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
          inputId="rendererFieldsOnly.studentHealth.hasTherapy"
          labelText="Asiste a terapia(s):"
          errorMessage={
            errors.rendererFieldsOnly?.studentHealth?.hasTherapy?.message
          }
          onValueChange={(v) => {
            if (v === 'no') {
              setValue('studentHealth.therapies', '');
            }
          }}
        />

        {studentHealthRendererFieldsOnly?.hasTherapy && (
          <InputGroup
            className="w-full"
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
          inputId="studentHealth.sisben"
          labelText="SISBEN:"
          errorMessage={errors.studentHealth?.sisben?.message}
          variant="multiple"
          options={SISBEN_OPTIONS}
        />

        <InputGroup
          className="w-full"
          label="E.P.S:"
          inputId="studentHealth.eps"
          register={register('studentHealth.eps')}
          errorMessage={errors.studentHealth?.eps?.message}
        />

        <ControlledDropdown
          control={control}
          inputId="studentHealth.bloodType"
          labelText="Tipo de sangre:"
          errorMessage={errors.studentHealth?.bloodType?.message}
          variant="multiple"
          options={BLOOD_TYPE_OPTIONS}
        />
      </div>

      <div className="flex gap-4">
        <ControlledDropdown
          control={control}
          inputId="rendererFieldsOnly.studentHealth.hasAllergy"
          labelText="Tiene alergias:"
          errorMessage={
            errors.rendererFieldsOnly?.studentHealth?.hasAllergy?.message
          }
          onValueChange={(v) => {
            if (v === 'no') {
              setValue('studentHealth.allergies', '');
            }
          }}
        />

        {studentHealthRendererFieldsOnly?.hasAllergy && (
          <InputGroup
            className="w-full"
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
          inputId="studentHealth.hasEnuresis"
          labelText="Controla esfinteres y enuresis:"
          errorMessage={errors.studentHealth?.hasEnuresis?.message}
        />

        <ControlledDropdown
          control={control}
          inputId="studentHealth.hasEncopresis"
          labelText="Tiene encopresis:"
          errorMessage={errors.studentHealth?.hasEncopresis?.message}
        />
      </div>
    </>
  );
}

export { EnrollmentFormSectionStudentHealth };
