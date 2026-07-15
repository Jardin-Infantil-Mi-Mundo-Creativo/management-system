import { EnrolledStudentDeleteDialog } from '@/components/enrolled-students/enrolled-student-delete-dialog';
import { EnrolledStudentDialog } from '@/components/enrolled-students/enrolled-student-dialog';
import { EnrolledStudentWithdrawDialog } from '@/components/enrolled-students/enrolled-student-withdraw-dialog';
import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';
import { getEnrollmentActions } from '@/utils/enrolled-students/get-actions';

interface EnrolledStudentActionsProps {
  enrollment: EnrollmentFormSchemaWithDocumentId;
}

function EnrolledStudentActions({ enrollment }: EnrolledStudentActionsProps) {
  const actions = getEnrollmentActions(enrollment.state);

  return (
    <div className="flex gap-4">
      <EnrolledStudentDialog enrollmentData={enrollment} />
      {actions.includes('Retirar') ? (
        <EnrolledStudentWithdrawDialog
          enrollmentDate={enrollment.enrollment.date}
          enrollmentId={enrollment.id}
          studentName={enrollment.personalStudentInfo.fullName}
        />
      ) : null}
      <EnrolledStudentDeleteDialog
        enrollmentId={enrollment.id}
        studentName={enrollment.personalStudentInfo.fullName}
      />
    </div>
  );
}

export { EnrolledStudentActions };
