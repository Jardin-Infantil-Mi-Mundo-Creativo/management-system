import { EnrolledStudentDialogContentInfoDataItem } from '@/components/enrolled-students/enrolled-students';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';
import { EDUCATION_LEVEL_OPTIONS } from '@/consts/enrollment';
import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';

interface EnrolledStudentDialogContentInfoParentProps {
  parentData: EnrollmentFormSchemaWithDocumentId['mother'];
  title: string;
}

function EnrolledStudentDialogContentInfoParent({
  parentData,
  title,
}: EnrolledStudentDialogContentInfoParentProps) {
  const educationLevelMap = EDUCATION_LEVEL_OPTIONS.reduce(
    (acc, curr) => {
      acc[curr.value] = curr.label;
      return acc;
    },
    {} as Record<string, string>
  );

  const items = [
    {
      label: 'Nombre',
      value: parentData.fullName,
    },
    {
      label: 'Fecha de nacimiento',
      value: parentData.birthDate,
    },
    {
      label: 'Edad',
      value: String(parentData.ageYears),
    },
    {
      label: 'Dirección',
      value: parentData.address ?? '',
    },
    {
      label: 'Barrio',
      value: parentData.neighborhood,
    },
    {
      label: 'Celular',
      value: parentData.cellPhoneNumber,
    },
    {
      label: 'Teléfono',
      value: parentData.telephoneNumber ?? '',
    },
    {
      label: 'Ocupación o profesión',
      value: parentData.occupation,
    },
    {
      label: 'Nivel educativo',
      value: educationLevelMap[parentData.educationLevel],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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

export { EnrolledStudentDialogContentInfoParent };
