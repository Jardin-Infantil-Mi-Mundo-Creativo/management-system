import { EnrolledStudentDialogContentInfoDataItem } from '@/components/enrolled-students/enrolled-students';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';

interface EnrolledStudentDialogContentInfoAuthorizedPersonsProps {
  authorizedPersons: Array<{ cellPhoneNumber: string; fullName: string }>;
  dataTestId: string;
  isFatherAuthorized: boolean;
  isMotherAuthorized: boolean;
}

function EnrolledStudentDialogContentInfoAuthorizedPersons({
  authorizedPersons,
  dataTestId,
  isFatherAuthorized,
  isMotherAuthorized,
}: EnrolledStudentDialogContentInfoAuthorizedPersonsProps) {
  const parentOnlyMessage =
    isMotherAuthorized && isFatherAuthorized
      ? 'Los padres son las únicas personas autorizadas.'
      : isMotherAuthorized
        ? 'Solo la madre puede recoger al estudiante.'
        : 'Solo el padre puede recoger al estudiante.';

  return (
    <Card data-testid={dataTestId}>
      <CardHeader>
        <CardTitle>
          <h2>Personas autorizadas para recoger al estudiante</h2>
        </CardTitle>
      </CardHeader>

      <CardContent className="text-sm space-y-2">
        {authorizedPersons.length === 0 ? (
          <p>{parentOnlyMessage}</p>
        ) : (
          authorizedPersons.map((p, i) => (
            <div key={i} className="border p-3 rounded-lg">
              <EnrolledStudentDialogContentInfoDataItem
                label="Nombre"
                value={p.fullName}
              />

              <EnrolledStudentDialogContentInfoDataItem
                label="Celular"
                value={p.cellPhoneNumber}
              />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

export { EnrolledStudentDialogContentInfoAuthorizedPersons };
