import { EnrolledStudentDialogContentInfoDataItem } from '@/components/enrolled-students/enrolled-students';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';
import { EDUCATION_LEVEL_OPTIONS } from '@/consts/enrollment';
import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';
import { getSafeValue } from '@/utils/enrolled-students/get-safe-value';

interface EnrolledStudentDialogContentInfoParentProps {
  dataTestId: string;
  parentData: EnrollmentFormSchemaWithDocumentId['mother'];
  title: string;
}

function EnrolledStudentDialogContentInfoParent({
  dataTestId,
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
      label: 'Numero de cédula',
      value: parentData.identificationNumber,
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
      value: String(getSafeValue(parentData.telephoneNumber)),
    },
    {
      label: 'Correo',
      value: parentData.email,
    },
    {
      label: 'Ocupación o profesión',
      value: parentData.occupation,
    },
    {
      label: 'Nivel educativo',
      value: educationLevelMap[parentData.educationLevel],
    },
    {
      label: 'Estrato',
      value: String(parentData.stratum),
    },
  ];

  return (
    <Card data-testid={dataTestId}>
      <CardHeader>
        <CardTitle>
          <h2>{title}</h2>
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

export { EnrolledStudentDialogContentInfoParent };
