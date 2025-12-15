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
import { getSafeValue } from '@/utils/enrolled-students/get-safe-value';

interface EnrolledStudentDialogContentInfoHealthProps {
  booleanToLabelMap: (value: boolean) => string;
  dataTestId: string;
  rendererFieldsOnly: EnrollmentFormSchemaWithDocumentId['rendererFieldsOnly'];
  studentHealth: EnrollmentFormSchemaWithDocumentId['studentHealth'];
}

function EnrolledStudentDialogContentInfoHealth({
  booleanToLabelMap,
  dataTestId,
  rendererFieldsOnly,
  studentHealth,
}: EnrolledStudentDialogContentInfoHealthProps) {
  const items = [
    {
      label: 'Terapias',
      value: String(getSafeValue(studentHealth.therapies)),
    },
    {
      label: 'Tiene SISBEN',
      value: booleanToLabelMap(studentHealth.hasSisben),
    },
    {
      label: 'EPS',
      value: studentHealth.eps,
    },
    {
      label: 'Tipo de sangre',
      value: studentHealth.bloodType,
    },
    {
      label: 'Alergias',
      value: String(getSafeValue(studentHealth.allergies)),
    },
    {
      label: 'Tiene enuresis',
      value: booleanToLabelMap(studentHealth.hasEnuresis),
    },
    {
      label: 'Tiene encopresis',
      value: booleanToLabelMap(studentHealth.hasEncopresis),
    },
  ];
  return (
    <Card data-testid={dataTestId}>
      <CardHeader>
        <CardTitle>
          <h2>Salud del estudiante</h2>
        </CardTitle>
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
