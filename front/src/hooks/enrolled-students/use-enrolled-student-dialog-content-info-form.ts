import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { enrolledStudentDialogContentInfoSchema } from '@/schemas/enrolled-students';
import type { EnrolledStudentDialogContentInfoSchema } from '@/types/enrolled-students';

export const useEnrolledStudentDialogContentInfoForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<EnrolledStudentDialogContentInfoSchema>({
    defaultValues: {
      documentsFile: null,
      studentPhoto: null,
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
