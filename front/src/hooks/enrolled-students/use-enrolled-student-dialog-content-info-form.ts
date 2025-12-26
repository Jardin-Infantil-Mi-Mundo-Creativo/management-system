import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { enrolledStudentDialogContentInfoSchema } from '@/schemas/enrolled-students';
import type { EnrolledStudentDialogContentInfoSchema } from '@/types/enrolled-students';

export const useEnrolledStudentDialogContentInfoForm = ({
  documentsFile,
  studentPhoto,
}: {
  documentsFile: string | null;
  studentPhoto: string | null;
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<EnrolledStudentDialogContentInfoSchema>({
    defaultValues: {
      documentsFile,
      studentPhoto,
    },
    mode: 'onChange',
    resolver: zodResolver(enrolledStudentDialogContentInfoSchema),
    reValidateMode: 'onChange',
  });

  return {
    control,
    errors,
    handleSubmit,
    setValue,
  };
};
