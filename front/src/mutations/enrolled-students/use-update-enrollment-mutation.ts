import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { EnrolledStudentDialogContentInfoSchemaType } from '@/types/enrolled-students';
import { createFormDataWithFiles } from '@/utils/shared/create-form-data-with-files';

export const useUpdateEnrollmentMutation = (id: string) => {
  const queryClient = useQueryClient();

  const mutationParams = {
    mutationFn: async (data: EnrolledStudentDialogContentInfoSchemaType) => {
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
      queryClient.invalidateQueries({ queryKey: ['enrollment'] });
    },
  };

  const mutation = useMutation(mutationParams);

  return mutation;
};
