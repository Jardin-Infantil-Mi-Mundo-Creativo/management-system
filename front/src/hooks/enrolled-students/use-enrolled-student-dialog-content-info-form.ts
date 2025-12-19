import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  EnrolledStudentDialogContentInfoSchema,
  type EnrolledStudentDialogContentInfoSchemaType,
} from '@/schemas/enrolled-students';

export const useEnrolledStudentDialogContentInfoForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<EnrolledStudentDialogContentInfoSchemaType>({
    defaultValues: {
      documentsFile: undefined,
      studentPhoto: undefined,
    },
    resolver: zodResolver(EnrolledStudentDialogContentInfoSchema),
  });

  return {
    control,
    errors,
    handleSubmit,
    setValue,
  };
};
