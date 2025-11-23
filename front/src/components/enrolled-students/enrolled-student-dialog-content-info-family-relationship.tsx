import {
  EnrolledStudentDialogContentInfoConditionalList,
  EnrolledStudentDialogContentInfoDataItem,
} from '@/components/enrolled-students/enrolled-students';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';
import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';

interface EnrolledStudentDialogContentInfoFamilyRelationshipProps {
  familyRelationship: EnrollmentFormSchemaWithDocumentId['familyRelationship'];
  parentRelationshipsValueToLabelMap: Record<string, string>;
}

function EnrolledStudentDialogContentInfoFamilyRelationship({
  familyRelationship,
  parentRelationshipsValueToLabelMap,
}: EnrolledStudentDialogContentInfoFamilyRelationshipProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Relación familiar</CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-2">
        <EnrolledStudentDialogContentInfoConditionalList
          title="Vive con"
          items={[
            {
              displayItem: familyRelationship.livesWithParents,
              label: 'Padres',
            },
            {
              displayItem: familyRelationship.livesWithSiblings,
              label: 'Hermanos',
            },
            {
              displayItem: familyRelationship.livesWithGrandparents,
              label: 'Abuelos',
            },
            {
              displayItem: familyRelationship.livesWithUncles,
              label: 'Tíos',
            },
            {
              displayItem: familyRelationship.livesWithStepfather,
              label: 'Padrastro',
            },
            {
              displayItem: familyRelationship.livesWithStepmother,
              label: 'Madrastra',
            },
          ]}
        />

        <EnrolledStudentDialogContentInfoDataItem
          label="Relación entre los padres"
          value={
            parentRelationshipsValueToLabelMap[
              familyRelationship.parentsRelationship || ''
            ]
          }
        />
      </CardContent>
    </Card>
  );
}

export { EnrolledStudentDialogContentInfoFamilyRelationship };
