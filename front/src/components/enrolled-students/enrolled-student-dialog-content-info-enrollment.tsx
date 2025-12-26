import { EnrolledStudentDialogContentInfoDataItem } from '@/components/enrolled-students/enrolled-students';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';
import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';
import { getSafeValue } from '@/utils/enrolled-students/get-safe-value';

interface EnrolledStudentDialogContentInfoEnrollmentProps {
  dataTestId: string;
  enrollment: EnrollmentFormSchemaWithDocumentId['enrollment'];
  valueToLabelMaps: {
    booleans: (value: boolean) => string;
    entryGrades: Record<string, string>;
  };
}

function EnrolledStudentDialogContentInfoEnrollment({
  dataTestId,
  enrollment,
  valueToLabelMaps,
}: EnrolledStudentDialogContentInfoEnrollmentProps) {
  const items = [
    {
      label: 'Fecha de matrícula',
      value: enrollment.date,
    },
    {
      label: 'Es estudiante antiguo',
      value: valueToLabelMaps.booleans(enrollment.isOldStudent),
    },
    {
      label: 'Es primera vez en un jardín',
      value: valueToLabelMaps.booleans(!!enrollment.isFirstTime),
    },
    {
      label: 'Institución anterior',
      value: String(getSafeValue(enrollment.previousSchoolName)),
    },
    {
      label: 'Grado al que ingresa',
      value: valueToLabelMaps.entryGrades[enrollment.entryGrade],
    },
  ];

  return (
    <Card data-testid={dataTestId}>
      <CardHeader>
        <CardTitle>
          <h2>Matrícula</h2>
        </CardTitle>
      </CardHeader>

      <CardContent className="text-sm space-y-2">
        {items.map((item) => (
          <EnrolledStudentDialogContentInfoDataItem
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))}
      </CardContent>
    </Card>
  );
}

export { EnrolledStudentDialogContentInfoEnrollment };
