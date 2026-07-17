export type EnrollmentState = 'draft' | 'completed' | 'retired';

interface EnrollmentLifecycleData {
  documentsFile?: string | null;
  enrollment?: { withdrawalDate?: string | null };
  studentPhoto?: string | null;
}

function normalizeWithdrawalDate(value: string | null | undefined) {
  return value ?? null;
}

function getEnrollmentState({
  documentsFile,
  enrollment,
  studentPhoto,
}: EnrollmentLifecycleData): EnrollmentState {
  if (!studentPhoto || !documentsFile) return 'draft';

  return normalizeWithdrawalDate(enrollment?.withdrawalDate)
    ? 'retired'
    : 'completed';
}

export { getEnrollmentState, normalizeWithdrawalDate };
