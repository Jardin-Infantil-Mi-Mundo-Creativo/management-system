import Link from 'next/link';

import { Button } from '@/components/ui/shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';

function EnrolledStudentDialogContentInfoDocuments({
  documentsFile,
}: {
  documentsFile: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentos</CardTitle>
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
