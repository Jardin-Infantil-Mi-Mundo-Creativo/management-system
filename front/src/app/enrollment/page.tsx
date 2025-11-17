'use client';

import { Card as EnrollmentContainer } from '@/components/ui/shadcn/card';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useWatch } from 'react-hook-form';
import { useEnrollmentMutation } from '@/hooks/enrollment/use-enrollment-mutation';
import type { EnrollmentFormSchema } from '@/types/enrollment';
import { useEnrollmentForm } from '@/hooks/enrollment/use-enrollment-form';
import { validateAndFixFormConsistency } from '@/utils/enrollment/validate-and-fix-form-consistency';
import {
  EnrollmentHeader,
  EnrollmentForm,
  EnrollmentFormSection,
  EnrollmentFormSeparator,
  EnrollmentFormSectionHeader,
  EnrollmentFormResult,
  EnrollmentFormFileInput,
  EnrollmentFormSectionPersonalStudentInfo,
  EnrollmentFormSectionStudentHealth,
  EnrollmentFormSectionParent,
  EnrollmentFormSectionFamilyRelationship,
  EnrollmentFormSectionEnrollment,
  EnrollmentFormSectionAuthorizedPersons,
  EnrollmentFooter,
} from '@/components/enrollment/enrollment';

type StudentHealthType =
  EnrollmentFormSchema['rendererFieldsOnly']['studentHealth'];
type EnrollmentType = EnrollmentFormSchema['enrollment'];

export default function EnrollmentPage() {
  const enrollmentMutation = useEnrollmentMutation();

  const { register, handleSubmit, control, setValue, errors } =
    useEnrollmentForm();
  const watchedValues = useWatch({ control });

  const onFormSubmit: SubmitHandler<EnrollmentFormSchema> = (data) => {
    const fixedData = validateAndFixFormConsistency(data);
    console.log(fixedData);
    enrollmentMutation.mutate(fixedData);
  };

  const normalizeStudentHealth = (
    input: Partial<StudentHealthType> | undefined
  ) => ({
    hasDisability: input?.hasDisability ?? false,
    hasDisorders: input?.hasDisorders ?? false,
    hasTherapy: input?.hasTherapy ?? false,
    hasAllergy: input?.hasAllergy ?? false,
    hasDisabilityOther: input?.hasDisabilityOther ?? false,
    hasDisorderOther: input?.hasDisorderOther ?? false,
  });

  const normalizeEnrollment = (input: Partial<EnrollmentType> | undefined) => ({
    identificationNumber: input?.identificationNumber ?? '',
    date: input?.date ?? '',
    isOldStudent: input?.isOldStudent ?? false,
    entryGrade: input?.entryGrade ?? 'walkers',
    isFirstTime: input?.isFirstTime,
    previousSchoolName: input?.previousSchoolName,
  });

  return (
    <>
      <EnrollmentContainer>
        <EnrollmentHeader
          control={control}
          studentPhotoError={
            typeof errors.studentPhoto?.message === 'string'
              ? errors.studentPhoto.message
              : undefined
          }
        />

        <EnrollmentForm handleSubmit={handleSubmit} onFormSubmit={onFormSubmit}>
          <EnrollmentFormSection>
            <EnrollmentFormSectionPersonalStudentInfo
              register={register}
              control={control}
              personalStudentInfoErrors={errors.personalStudentInfo}
              setValue={setValue}
            />
          </EnrollmentFormSection>

          <EnrollmentFormSeparator />

          <EnrollmentFormSection>
            <EnrollmentFormSectionStudentHealth
              register={register}
              control={control}
              errors={errors}
              studentHealthRendererFieldsOnly={normalizeStudentHealth(
                watchedValues.rendererFieldsOnly?.studentHealth
              )}
            />
          </EnrollmentFormSection>

          <EnrollmentFormSeparator />

          <EnrollmentFormSection>
            <EnrollmentFormSectionParent
              register={register}
              control={control}
              errors={errors}
              parent="mother"
              setValue={setValue}
            />
          </EnrollmentFormSection>

          <EnrollmentFormSeparator />

          <EnrollmentFormSection>
            <EnrollmentFormSectionParent
              register={register}
              control={control}
              errors={errors}
              parent="father"
              setValue={setValue}
            />
          </EnrollmentFormSection>

          <EnrollmentFormSeparator />

          <EnrollmentFormSection>
            <EnrollmentFormSectionFamilyRelationship
              control={control}
              familyRelationshipErrors={errors.familyRelationship}
            />
          </EnrollmentFormSection>

          <EnrollmentFormSeparator />

          <EnrollmentFormSection>
            <EnrollmentFormSectionEnrollment
              register={register}
              control={control}
              enrollmentErrors={errors.enrollment}
              enrollmentWatchedValues={normalizeEnrollment(
                watchedValues.enrollment
              )}
              setValue={setValue}
            />
          </EnrollmentFormSection>

          <EnrollmentFormSeparator />

          <EnrollmentFormSection>
            <EnrollmentFormSectionHeader>
              Documentos
            </EnrollmentFormSectionHeader>
            <Controller
              name="documentsFile"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <EnrollmentFormFileInput
                    onFileSelect={(file) => {
                      field.onChange(file);
                    }}
                    className="w-full max-w-md"
                  />
                  {errors.documentsFile && (
                    <span className="text-sm text-red-600">
                      {String(errors.documentsFile?.message)}
                    </span>
                  )}
                </div>
              )}
            />
          </EnrollmentFormSection>

          <EnrollmentFormSeparator />

          <EnrollmentFormSection>
            <EnrollmentFormSectionAuthorizedPersons
              control={control}
              authorizedPersonsErrors={errors.authorizedPersons}
              register={register}
            />
          </EnrollmentFormSection>

          <EnrollmentFormSeparator />

          <p className="font-bold text-primary text-lg text-center">
            ACEPTAMOS LAS NORMAS DEL JARDIN Y NOS COMPROMETEMOS A CUMPLIR
          </p>

          <EnrollmentFormSeparator />

          <EnrollmentFooter
            errors={errors}
            isEnrollmentMutationPending={enrollmentMutation.isPending}
          />
        </EnrollmentForm>
      </EnrollmentContainer>

      <EnrollmentFormResult
        isEnrollmentMutationError={enrollmentMutation.isError}
        isEnrollmentMutationSuccess={enrollmentMutation.isSuccess}
        resetEnrollmentMutation={enrollmentMutation.reset}
      />
    </>
  );
}
