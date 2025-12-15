'use client';

import {
  EnrolledStudentDialogContentInfoAuthorizedPersons,
  EnrolledStudentDialogContentInfoDocuments,
  EnrolledStudentDialogContentInfoEnrollment,
  EnrolledStudentDialogContentInfoFamilyRelationship,
  EnrolledStudentDialogContentInfoHeader,
  EnrolledStudentDialogContentInfoHealth,
  EnrolledStudentDialogContentInfoParent,
} from '@/components/enrolled-students/enrolled-students';
import { ScrollArea } from '@/components/ui/shadcn/scroll-area';
import { Separator } from '@/components/ui/shadcn/separator';
import {
  EDUCATION_LEVEL_OPTIONS,
  GRADE_OPTIONS,
  PARENTS_RELATIONSHIP_OPTIONS,
} from '@/consts/enrollment';
import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';

interface EnrolledStudentDialogContentInfoProps {
  data?: EnrollmentFormSchemaWithDocumentId;
}

function EnrolledStudentDialogContentSeparator() {
  return <Separator className="my-8" />;
}

function EnrolledStudentDialogContentInfo({
  data,
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

  if (!data) {
    return null;
  }

  return (
    <ScrollArea className="w-full h-full">
      <EnrolledStudentDialogContentInfoHeader
        personalStudentInfo={data.personalStudentInfo}
        studentPhoto={data.studentPhoto}
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
      />

      <EnrolledStudentDialogContentSeparator />

      <EnrolledStudentDialogContentInfoAuthorizedPersons
        authorizedPersons={data.authorizedPersons}
        dataTestId="authorized-persons"
      />
    </ScrollArea>
  );
}

export { EnrolledStudentDialogContentInfo };
