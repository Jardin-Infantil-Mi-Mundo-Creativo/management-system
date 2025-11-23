import { EnrolledStudentDialogContentInfoDataItem } from '@/components/enrolled-students/enrolled-students';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';
import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';

interface EnrolledStudentDialogContentInfoAuthorizedPersonsProps {
  authorizedPersons: EnrollmentFormSchemaWithDocumentId['authorizedPersons'];
}

function EnrolledStudentDialogContentInfoAuthorizedPersons({
  authorizedPersons,
}: EnrolledStudentDialogContentInfoAuthorizedPersonsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personas autorizadas para recoger al estudiante</CardTitle>
      </CardHeader>

      <CardContent className="text-sm space-y-2">
        {authorizedPersons.length === 0 ? (
          <p>Los padres son las únicas personas autorizadas.</p>
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
