'use client';

import { useTranslations } from 'next-intl';
import type { SubmitHandler } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

import {
  EnrollmentFooter,
  EnrollmentForm,
  EnrollmentFormResult,
  EnrollmentFormSection,
  EnrollmentFormSectionAuthorizedPersons,
  EnrollmentFormSectionEnrollment,
  EnrollmentFormSectionFamilyRelationship,
  EnrollmentFormSectionHeader,
  EnrollmentFormSectionParent,
  EnrollmentFormSectionPersonalStudentInfo,
  EnrollmentFormSectionStudentHealth,
  EnrollmentFormSeparator,
  EnrollmentHeader,
} from '@/components/enrollment/enrollment';
import { ControlledFileInput } from '@/components/ui/controlled-file-input';
import { Card as EnrollmentContainer } from '@/components/ui/shadcn/card';
import { useEnrollmentForm } from '@/hooks/enrollment/use-enrollment-form';
import { usePostEnrollmentMutation } from '@/mutations/enrollment/use-post-enrollment-mutation';
import type { EnrollmentFormSchema } from '@/types/enrollment';

export default function EnrollmentPage() {
  const t = useTranslations('enrollment');

  const enrollmentMutation = usePostEnrollmentMutation();

  const { control, errors, handleSubmit, register, setValue } =
    useEnrollmentForm();
  const watchedValues = useWatch({ control });

  const onFormSubmit: SubmitHandler<EnrollmentFormSchema> = (data) => {
    console.log(data);
    enrollmentMutation.mutate(data);
  };

  return (
    <>
      <EnrollmentContainer>
        <EnrollmentHeader control={control} />

        <EnrollmentForm handleSubmit={handleSubmit} onFormSubmit={onFormSubmit}>
          <EnrollmentFormSection dataTestId="personal-student-info">
            <EnrollmentFormSectionPersonalStudentInfo
              register={register}
              control={control}
              personalStudentInfoErrors={errors.personalStudentInfo}
              setValue={setValue}
            />
          </EnrollmentFormSection>

          <EnrollmentFormSeparator />

          <EnrollmentFormSection dataTestId="student-health">
            <EnrollmentFormSectionStudentHealth
              register={register}
              control={control}
              errors={errors}
              setValue={setValue}
              studentHealthRendererFieldsOnly={
                watchedValues.rendererFieldsOnly
                  ?.studentHealth as EnrollmentFormSchema['rendererFieldsOnly']['studentHealth']
              }
            />
          </EnrollmentFormSection>

          <EnrollmentFormSeparator />

          <EnrollmentFormSection dataTestId="mother">
            <EnrollmentFormSectionParent
              register={register}
              control={control}
              errors={errors}
              parent="mother"
              setValue={setValue}
            />
          </EnrollmentFormSection>

          <EnrollmentFormSeparator />

          <EnrollmentFormSection dataTestId="father">
            <EnrollmentFormSectionParent
              register={register}
              control={control}
              errors={errors}
              parent="father"
              setValue={setValue}
            />
          </EnrollmentFormSection>

          <EnrollmentFormSeparator />

          <EnrollmentFormSection dataTestId="family-relationship">
            <EnrollmentFormSectionFamilyRelationship
              control={control}
              familyRelationshipErrors={errors.familyRelationship}
            />
          </EnrollmentFormSection>

          <EnrollmentFormSeparator />

          <EnrollmentFormSection dataTestId="enrollment">
            <EnrollmentFormSectionEnrollment
              register={register}
              control={control}
              enrollmentErrors={errors.enrollment}
              enrollmentWatchedValues={
                watchedValues.enrollment as EnrollmentFormSchema['enrollment']
              }
              setValue={setValue}
            />
          </EnrollmentFormSection>

          <EnrollmentFormSeparator />

          <EnrollmentFormSection dataTestId="documents">
            <EnrollmentFormSectionHeader>
              {t('documents.heading')}
            </EnrollmentFormSectionHeader>
            <ControlledFileInput control={control} inputId="documentsFile" />
          </EnrollmentFormSection>

          <EnrollmentFormSeparator />

          <EnrollmentFormSection dataTestId="authorized-persons">
            <EnrollmentFormSectionAuthorizedPersons
              control={control}
              authorizedPersonsErrors={errors.authorizedPersons}
              register={register}
            />
          </EnrollmentFormSection>

          <EnrollmentFormSeparator />

          <p className="font-bold text-primary text-lg text-center">
            {t('acceptRules')}
          </p>

          <EnrollmentFormSeparator />

          <EnrollmentFooter
            errors={errors}
            isEnrollmentMutationPending={enrollmentMutation.isPending}
            watchedValues={watchedValues as EnrollmentFormSchema}
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
