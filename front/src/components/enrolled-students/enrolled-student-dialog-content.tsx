'use client';

import { EnrolledStudentDialogContentInfo } from '@/components/enrolled-students/enrolled-student-dialog-content-info';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/shadcn/dialog';
import type { EnrolledStudentDialogContentInfoSchema } from '@/types/enrolled-students';
import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';

interface EnrolledStudentDialogContentProps {
  enrollmentData?: EnrollmentFormSchemaWithDocumentId;
  onValuesSubmit: (values: EnrolledStudentDialogContentInfoSchema) => void;
}

function EnrolledStudentDialogContent({
  enrollmentData,
  onValuesSubmit,
}: EnrolledStudentDialogContentProps) {
  return (
    <DialogContent className="h-4/5 sm:max-w-3xl overflow-scroll">
      <DialogHeader>
        <DialogTitle>Matrícula</DialogTitle>
      </DialogHeader>
      <EnrolledStudentDialogContentInfo
        data={enrollmentData}
        onValuesSubmit={onValuesSubmit}
      />
    </DialogContent>
  );
}

export { EnrolledStudentDialogContent };
