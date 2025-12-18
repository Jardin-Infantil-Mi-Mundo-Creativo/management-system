import Link from 'next/link';

import { FileInput } from '@/components/ui/file-input';
import { Button } from '@/components/ui/shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';

interface Props {
  dataTestId: string;
  documentsFile: string | null;
}

function EnrolledStudentDialogContentInfoDocuments({
  dataTestId,
  documentsFile,
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
          <div className="flex flex-col gap-2">
            <FileInput />
            <p className="text-sm">
              No se ha subido ningún documento,{' '}
              <span className="font-bold"> complete el formulario.</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { EnrolledStudentDialogContentInfoDocuments };
