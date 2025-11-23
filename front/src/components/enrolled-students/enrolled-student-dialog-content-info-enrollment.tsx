import { EnrolledStudentDialogContentInfoDataItem } from '@/components/enrolled-students/enrolled-students';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';
import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';

interface EnrolledStudentDialogContentInfoEnrollmentProps {
  enrollment: EnrollmentFormSchemaWithDocumentId['enrollment'];
  valueToLabelMaps: {
    booleans: (value: boolean) => string;
    entryGrades: Record<string, string>;
  };
}

function EnrolledStudentDialogContentInfoEnrollment({
  enrollment,
  valueToLabelMaps,
}: EnrolledStudentDialogContentInfoEnrollmentProps) {
  const items = [
    {
      label: 'N° identificación',
      value: enrollment.identificationNumber,
    },
    {
      label: 'Fecha de matrícula',
      value: enrollment.date,
    },
    {
      label: 'Estudiante antiguo',
      value: valueToLabelMaps.booleans(enrollment.isOldStudent),
    },
    {
      label: 'Primera vez en un jardín',
      value: valueToLabelMaps.booleans(!!enrollment.isFirstTime),
    },
    {
      label: 'Institución anterior',
      value: enrollment.previousSchoolName ?? '',
    },
    {
      label: 'Grado al que ingresa',
      value: valueToLabelMaps.entryGrades[enrollment.entryGrade],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Matrícula</CardTitle>
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
