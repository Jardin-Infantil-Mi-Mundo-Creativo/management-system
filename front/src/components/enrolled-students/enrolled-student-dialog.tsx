import { useState } from 'react';

import { EnrolledStudentDialogContent } from '@/components/enrolled-students/enrolled-student-dialog-content';
import { EnrolledStudentDialogContentInfoFormResult } from '@/components/enrolled-students/enrolled-student-dialog-content-info-form-result';
import { Button } from '@/components/ui/shadcn/button';
import { Dialog, DialogTrigger } from '@/components/ui/shadcn/dialog';
import { useUpdateEnrollmentMutation } from '@/mutations/enrolled-students/use-update-enrollment-mutation';
import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';

interface EnrolledStudentDialogProps {
  enrollmentData?: EnrollmentFormSchemaWithDocumentId;
}

function EnrolledStudentDialog({ enrollmentData }: EnrolledStudentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mutation = useUpdateEnrollmentMutation(
    enrollmentData?.id || '',
    setIsOpen
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Ver</Button>
        </DialogTrigger>
        <EnrolledStudentDialogContent
          enrollmentData={enrollmentData}
          onValuesSubmit={mutation.mutate}
          isMutationLoading={mutation.isPending}
        />
      </Dialog>

      <EnrolledStudentDialogContentInfoFormResult
        isMutationError={mutation.isError}
        isMutationSuccess={mutation.isSuccess}
        resetMutation={mutation.reset}
        onSuccessClose={() => {
          window.location.reload();
        }}
      />
    </>
  );
}

export { EnrolledStudentDialog };
