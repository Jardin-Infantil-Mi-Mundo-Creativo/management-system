'use client';

import type { FormHTMLAttributes } from 'react';
import { Fragment } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import {
  EnrolledStudentDialogContentInfoAuthorizedPersons,
  EnrolledStudentDialogContentInfoDocuments,
  EnrolledStudentDialogContentInfoEnrollment,
  EnrolledStudentDialogContentInfoFamilyRelationship,
  EnrolledStudentDialogContentInfoHeader,
  EnrolledStudentDialogContentInfoHealth,
  EnrolledStudentDialogContentInfoParent,
} from '@/components/enrolled-students/enrolled-students';
import { Button } from '@/components/ui/shadcn/button';
import { ScrollArea } from '@/components/ui/shadcn/scroll-area';
import { Separator } from '@/components/ui/shadcn/separator';
import {
  EDUCATION_LEVEL_OPTIONS,
  GRADE_OPTIONS,
  PARENTS_RELATIONSHIP_OPTIONS,
} from '@/consts/enrollment';
import { useEnrolledStudentDialogContentInfoForm } from '@/hooks/enrolled-students/use-enrolled-student-dialog-content-info-form';
// ... (imports remain)
import type { EnrolledStudentDialogContentInfoSchema } from '@/types/enrolled-students';
import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';

interface EnrolledStudentDialogContentInfoProps {
  data?: EnrollmentFormSchemaWithDocumentId;
  onValuesSubmit: (values: EnrolledStudentDialogContentInfoSchema) => void;
}

function EnrolledStudentDialogContentSeparator() {
  return <Separator className="my-8" />;
}

function EnrolledStudentDialogContentInfo({
  data,
  onValuesSubmit,
}: EnrolledStudentDialogContentInfoProps) {
  const getValueLabelMap = (map: typeof EDUCATION_LEVEL_OPTIONS) =>
    map.reduce(
      (acc, curr) => {
        acc[curr.value] = curr.label;
        return acc;
      },
      {} as Record<string, string>
    );

  const valueToLabelMaps = {
    booleans: (value: boolean) => (value ? 'Sí' : 'No'),
    educationLevels: getValueLabelMap(EDUCATION_LEVEL_OPTIONS),
    entryGrades: getValueLabelMap(GRADE_OPTIONS),
    parentsRelationships: getValueLabelMap(PARENTS_RELATIONSHIP_OPTIONS),
  };

  const parentsSections = [
    { data: data!.mother, key: 'mother', title: 'Información de la madre' },
    { data: data!.father, key: 'father', title: 'Información del padre' },
  ];

  const { control, errors, handleSubmit } =
    useEnrolledStudentDialogContentInfoForm();

  const onFormSubmit: SubmitHandler<EnrolledStudentDialogContentInfoSchema> = (
    data
  ) => {
    console.log(data);
    onValuesSubmit(data);
  };

  const isDraftEnrollment = data?.state === 'draft';
  const Wrapper = isDraftEnrollment ? 'form' : Fragment;

  const wrapperProps = isDraftEnrollment
    ? ({
        onSubmit: handleSubmit(onFormSubmit),
      } as FormHTMLAttributes<HTMLFormElement>)
    : {};

  if (!data) {
    return null;
  }

  return (
    <ScrollArea className="w-full h-full">
      <Wrapper {...wrapperProps}>
        <EnrolledStudentDialogContentInfoHeader
          control={control}
          personalStudentInfo={data.personalStudentInfo}
          studentPhoto={data.studentPhoto}
          studentPhotoError={errors.studentPhoto?.message}
          dataTestId="header"
        />

        <EnrolledStudentDialogContentSeparator />

        <EnrolledStudentDialogContentInfoHealth
          studentHealth={data.studentHealth}
          rendererFieldsOnly={data.rendererFieldsOnly}
          booleanToLabelMap={valueToLabelMaps.booleans}
          dataTestId="health"
        />

        <EnrolledStudentDialogContentSeparator />

        {parentsSections.map((parent) => (
          <div key={parent.key}>
            <EnrolledStudentDialogContentInfoParent
              parentData={parent.data}
              title={parent.title}
              dataTestId={parent.key}
            />
            <EnrolledStudentDialogContentSeparator />
          </div>
        ))}

        <EnrolledStudentDialogContentInfoFamilyRelationship
          familyRelationship={data.familyRelationship}
          parentRelationshipsValueToLabelMap={
            valueToLabelMaps.parentsRelationships
          }
          dataTestId="family-relationship"
        />

        <EnrolledStudentDialogContentSeparator />

        <EnrolledStudentDialogContentInfoEnrollment
          enrollment={data.enrollment}
          valueToLabelMaps={valueToLabelMaps}
          dataTestId="enrollment"
        />

        <EnrolledStudentDialogContentSeparator />

        <EnrolledStudentDialogContentInfoDocuments
          documentsFile={data.documentsFile}
          dataTestId="documents"
          control={control}
          fileInputError={errors.documentsFile?.message}
        />

        <EnrolledStudentDialogContentSeparator />

        <EnrolledStudentDialogContentInfoAuthorizedPersons
          authorizedPersons={data.authorizedPersons}
          dataTestId="authorized-persons"
        />

        {isDraftEnrollment ? (
          <div className="flex flex-col mt-6 gap-2">
            {Object.keys(errors).length ? (
              <p className="text-sm text-red-600">
                Corrija los errores en el formulario antes de continuar
              </p>
            ) : null}
            <Button
              type="submit"
              className="bg-green-800 hover:bg-green-900"
              size="lg"
            >
              Completar matricula
            </Button>
          </div>
        ) : null}
      </Wrapper>
    </ScrollArea>
  );
}

export { EnrolledStudentDialogContentInfo };
