'use client';

import { EnrolledStudentDialogContent } from '@/components/enrolled-students/enrolled-student-dialog-content';
import { Button } from '@/components/ui/shadcn/button';
import { Dialog, DialogTrigger } from '@/components/ui/shadcn/dialog';
import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';

interface EnrolledStudentDialogProps {
  enrollmentData?: EnrollmentFormSchemaWithDocumentId;
}

function EnrolledStudentDialog({ enrollmentData }: EnrolledStudentDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Ver</Button>
      </DialogTrigger>
      <EnrolledStudentDialogContent enrollmentData={enrollmentData} />
    </Dialog>
  );
}

export { EnrolledStudentDialog };
