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
  dataTestId: string;
  familyRelationship: EnrollmentFormSchemaWithDocumentId['familyRelationship'];
  parentRelationshipsValueToLabelMap: Record<string, string>;
}

function EnrolledStudentDialogContentInfoFamilyRelationship({
  dataTestId,
  familyRelationship,
  parentRelationshipsValueToLabelMap,
}: EnrolledStudentDialogContentInfoFamilyRelationshipProps) {
  return (
    <Card data-testid={dataTestId}>
      <CardHeader>
        <CardTitle>
          <h2>Relación familiar</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-2">
        <EnrolledStudentDialogContentInfoConditionalList
          title="Vive con"
          items={[
            {
              displayItem: familyRelationship.livesWithParents ?? false,
              label: 'Padres',
            },
            {
              displayItem: familyRelationship.livesWithSiblings ?? false,
              label: 'Hermanos',
            },
            {
              displayItem: familyRelationship.livesWithGrandparents ?? false,
              label: 'Abuelos',
            },
            {
              displayItem: familyRelationship.livesWithUncles ?? false,
              label: 'Tíos',
            },
            {
              displayItem: familyRelationship.livesWithStepfather ?? false,
              label: 'Padrastro',
            },
            {
              displayItem: familyRelationship.livesWithStepmother ?? false,
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
