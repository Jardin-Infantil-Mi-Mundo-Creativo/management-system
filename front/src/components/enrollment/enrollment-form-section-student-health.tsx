import { useTranslations } from 'next-intl';
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
import { useEnrollmentOptions } from '@/consts/enrollment';
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
  const t = useTranslations('enrollment.studentHealth');
  const { BLOOD_TYPE_OPTIONS, SISBEN_OPTIONS } = useEnrollmentOptions();

  const disabilityOptions = [
    {
      inputId: 'studentHealth.hasPhysicalDisability',
      labelText: t('disabilities.physical'),
    },
    {
      inputId: 'studentHealth.hasHearingDisability',
      labelText: t('disabilities.hearing'),
    },
    {
      inputId: 'rendererFieldsOnly.studentHealth.hasDisabilityOther',
      labelText: t('other'),
    },
  ] as const;

  const disorderOptions = [
    {
      inputId: 'studentHealth.hasAutism',
      labelText: t('disorders.autism'),
    },
    {
      inputId: 'studentHealth.hasDownSyndrome',
      labelText: t('disorders.downSyndrome'),
    },
    {
      inputId: 'studentHealth.hasBehavioralDisorders',
      labelText: t('disorders.behavioral'),
    },
    {
      inputId: 'studentHealth.hasLanguageDisorders',
      labelText: t('disorders.language'),
    },
    {
      inputId: 'studentHealth.hasHyperactivity',
      labelText: t('disorders.hyperactivity'),
    },
    {
      inputId: 'studentHealth.hasAttentionDisorders',
      labelText: t('disorders.attention'),
    },
    {
      inputId: 'studentHealth.hasAnxiety',
      labelText: t('disorders.anxiety'),
    },
    {
      inputId: 'rendererFieldsOnly.studentHealth.hasDisorderOther',
      labelText: t('other'),
    },
  ] as const;
  return (
    <>
      <EnrollmentFormSectionHeader>{t('heading')}</EnrollmentFormSectionHeader>

      <div className="flex items-end gap-4 flex-wrap">
        <ControlledDropdown
          control={control}
          inputId="rendererFieldsOnly.studentHealth.hasDisability"
          labelText={t('disabilities.hasDisability')}
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
                label={t('which')}
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
          labelText={t('disorders.hasDisorders')}
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
                label={t('which')}
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
          labelText={t('hasTherapy')}
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
            label={t('which')}
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
          labelText="SISBEN"
          errorMessage={errors.studentHealth?.sisben?.message}
          variant="multiple"
          options={SISBEN_OPTIONS}
        />

        <InputGroup
          className="w-full"
          label="E.P.S"
          inputId="studentHealth.eps"
          register={register('studentHealth.eps')}
          errorMessage={errors.studentHealth?.eps?.message}
        />

        <ControlledDropdown
          control={control}
          inputId="studentHealth.bloodType"
          labelText={t('bloodType')}
          errorMessage={errors.studentHealth?.bloodType?.message}
          variant="multiple"
          options={BLOOD_TYPE_OPTIONS}
        />
      </div>

      <div className="flex gap-4">
        <ControlledDropdown
          control={control}
          inputId="rendererFieldsOnly.studentHealth.hasAllergy"
          labelText={t('hasAllergy')}
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
            label={t('which')}
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
          labelText={t('controlsSphincterBedwetting')}
          errorMessage={errors.studentHealth?.hasEnuresis?.message}
        />

        <ControlledDropdown
          control={control}
          inputId="studentHealth.hasEncopresis"
          labelText={t('hasEncopresis')}
          errorMessage={errors.studentHealth?.hasEncopresis?.message}
        />
      </div>
    </>
  );
}

export { EnrollmentFormSectionStudentHealth };
