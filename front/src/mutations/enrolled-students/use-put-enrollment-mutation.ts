import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { EnrolledStudentDialogContentInfoSchemaType } from '@/schemas/enrolled-students';

export const usePutEnrollmentMutation = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: EnrolledStudentDialogContentInfoSchemaType) => {
      const formData = new FormData();
      if (data.studentPhoto?.[0]) {
        formData.append('studentPhoto', data.studentPhoto[0]);
      }
      if (data.documentsFile?.[0]) {
        formData.append('documentsFile', data.documentsFile[0]);
      }

      const response = await fetch(
        process.env.NEXT_PUBLIC_FRONT_BACKEND_URL + '/enrollments/' + id,
        {
          body: formData,
          method: 'PUT',
        }
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollment'] });
    },
  });

  return mutation;
};
