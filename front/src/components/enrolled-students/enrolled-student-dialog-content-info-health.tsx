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

interface EnrolledStudentDialogContentInfoHealthProps {
  getSecureValue: (value?: string | number) => string | number;
  rendererFieldsOnly: EnrollmentFormSchemaWithDocumentId['rendererFieldsOnly'];
  studentHealth: EnrollmentFormSchemaWithDocumentId['studentHealth'];
  valueToLabelMaps: {
    booleans: (value: boolean) => string;
  };
}

function EnrolledStudentDialogContentInfoHealth({
  getSecureValue,
  rendererFieldsOnly,
  studentHealth,
  valueToLabelMaps,
}: EnrolledStudentDialogContentInfoHealthProps) {
  const items = [
    {
      label: 'Terapias',
      value: String(getSecureValue(studentHealth.therapies)),
    },
    {
      label: 'Tiene SISBEN',
      value: valueToLabelMaps.booleans(studentHealth.hasSisben),
    },
    {
      label: 'EPS',
      value: studentHealth.eps,
    },
    {
      label: 'Tipo de R.H',
      value: studentHealth.hasRhPositiveBloodType ? 'Positivo' : 'Negativo',
    },
    {
      label: 'Alergias',
      value: String(getSecureValue(studentHealth.allergies)),
    },
    {
      label: 'Tiene enuresis',
      value: valueToLabelMaps.booleans(studentHealth.hasEnuresis),
    },
    {
      label: 'Tiene encopresis',
      value: valueToLabelMaps.booleans(studentHealth.hasEncopresis),
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Salud del estudiante</CardTitle>
      </CardHeader>

      <CardContent className="text-sm space-y-2">
        {rendererFieldsOnly.studentHealth.hasDisability ? (
          <EnrolledStudentDialogContentInfoConditionalList
            title="Discapacidades"
            items={[
              {
                displayItem: studentHealth.hasPhysicalDisability,
                label: 'Física',
              },
              {
                displayItem: studentHealth.hasHearingDisability,
                label: 'Auditiva',
              },
              {
                displayItem: !!studentHealth.otherDisabilities,
                label: `Otra(s): ${studentHealth.otherDisabilities}`,
              },
            ]}
          />
        ) : (
          <EnrolledStudentDialogContentInfoDataItem
            label="Discapacidades"
            value="No registra"
          />
        )}

        {rendererFieldsOnly.studentHealth.hasDisorders ? (
          <EnrolledStudentDialogContentInfoConditionalList
            title="Trastornos"
            items={[
              {
                displayItem: studentHealth.hasAutism,
                label: 'Autismo',
              },
              {
                displayItem: studentHealth.hasDownSyndrome,
                label: 'Síndrome de Down',
              },
              {
                displayItem: studentHealth.hasBehavioralDisorders,
                label: 'Conductual',
              },
              {
                displayItem: studentHealth.hasLanguageDisorders,
                label: 'Lenguaje',
              },
              {
                displayItem: studentHealth.hasHyperactivity,
                label: 'Hiperactividad',
              },
              {
                displayItem: studentHealth.hasAttentionDisorders,
                label: 'Atención',
              },
              {
                displayItem: studentHealth.hasAnxiety,
                label: 'Ansiedad',
              },
              {
                displayItem: !!studentHealth.otherDisorders,
                label: `Otro(s): ${studentHealth.otherDisorders}`,
              },
            ]}
          />
        ) : (
          <EnrolledStudentDialogContentInfoDataItem
            label="Trastornos"
            value="No registra"
          />
        )}

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

export { EnrolledStudentDialogContentInfoHealth };
