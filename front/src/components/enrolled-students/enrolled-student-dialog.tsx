import { useState } from 'react';

import { EnrolledStudentDialogContentInfoForm } from '@/components/enrolled-students/enrolled-student-dialog-content-info-form';
import { EnrolledStudentFormResult } from '@/components/enrolled-students/enrolled-student-form-result';
import { Button } from '@/components/ui/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/shadcn/dialog';
import { usePutEnrollmentMutation } from '@/mutations/enrolled-students/use-put-enrollment-mutation';
import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';

interface EnrolledStudentDialogProps {
  enrollmentData?: EnrollmentFormSchemaWithDocumentId;
}

function EnrolledStudentDialog({ enrollmentData }: EnrolledStudentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mutation = usePutEnrollmentMutation(enrollmentData?.id || '');

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Ver detalle</Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
          {enrollmentData && (
            <EnrolledStudentDialogContentInfoForm data={enrollmentData} />
          )}
        </DialogContent>
      </Dialog>

      <EnrolledStudentFormResult
        isMutationError={mutation.isError}
        isMutationSuccess={mutation.isSuccess}
        resetMutation={mutation.reset}
        onSuccessClose={() => setIsOpen(false)}
      />
    </>
  );
}

export { EnrolledStudentDialog };
