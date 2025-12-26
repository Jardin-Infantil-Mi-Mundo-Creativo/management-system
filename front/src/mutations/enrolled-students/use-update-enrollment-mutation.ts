import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Dispatch, SetStateAction } from 'react';

import type { EnrolledStudentDialogContentInfoSchema } from '@/types/enrolled-students';
import { createFormDataWithFiles } from '@/utils/shared/create-form-data-with-files';

export const useUpdateEnrollmentMutation = (
  id: string,
  setIsOpen: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  const mutationParams = {
    mutationFn: async (data: EnrolledStudentDialogContentInfoSchema) => {
      const formData = createFormDataWithFiles({
        documentsFile: data.documentsFile,
        studentPhoto: data.studentPhoto,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONT_BACKEND_URL}/enrollments/${id}`,
        {
          body: formData,
          method: 'PUT',
        }
      );
      return response.json();
    },
    mutationKey: ['enrollment', id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      setIsOpen(false);
    },
  };

  const mutation = useMutation(mutationParams);

  return mutation;
};
