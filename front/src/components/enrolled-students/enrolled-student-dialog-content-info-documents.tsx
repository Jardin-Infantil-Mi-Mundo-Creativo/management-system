import Link from 'next/link';
import type { Control } from 'react-hook-form';

import { ControlledFileInput } from '@/components/ui/controlled-file-input';
import { Button } from '@/components/ui/shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';
import type { EnrolledStudentDialogContentInfoSchema } from '@/types/enrolled-students';

interface Props {
  control: Control<EnrolledStudentDialogContentInfoSchema>;
  dataTestId: string;
  documentsFile: string | null;
  fileInputError?: string;
}

function EnrolledStudentDialogContentInfoDocuments({
  control,
  dataTestId,
  documentsFile,
  fileInputError,
}: Props) {
  return (
    <Card data-testid={dataTestId}>
      <CardHeader>
        <CardTitle>
          <h2>Documentos</h2>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {documentsFile ? (
          <Link href={documentsFile} target="_blank" rel="noopener noreferrer">
            <Button>Abrir documento PDF</Button>
          </Link>
        ) : (
          <ControlledFileInput
            control={control}
            errorMessage={fileInputError}
            inputId="documentsFile"
          />
        )}
      </CardContent>
    </Card>
  );
}

export { EnrolledStudentDialogContentInfoDocuments };
