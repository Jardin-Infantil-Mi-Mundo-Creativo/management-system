import Link from 'next/link';

import { Button } from '@/components/ui/shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';

interface Props {
  dataTestId: string;
  documentsFile: string;
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
        <Link href={documentsFile} target="_blank" rel="noopener noreferrer">
          <Button>Abrir documento PDF</Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export { EnrolledStudentDialogContentInfoDocuments };
