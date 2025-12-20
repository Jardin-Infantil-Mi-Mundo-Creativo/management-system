import { useMutation } from '@tanstack/react-query';

import type { EnrollmentFormSchema } from '@/types/enrollment';
import { createFormDataWithFiles } from '@/utils/shared/create-form-data-with-files';

export function usePostEnrollmentMutation() {
  async function mutationFn(data: EnrollmentFormSchema) {
    const dataWithNoFiles = { ...data };
    delete dataWithNoFiles.studentPhoto;
    delete dataWithNoFiles.documentsFile;

    const formData = createFormDataWithFiles({
      documentsFile: data.documentsFile,
      studentPhoto: data.studentPhoto,
    });
    formData.append('data', JSON.stringify(dataWithNoFiles));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FRONT_BACKEND_URL}/enrollments/`,
      {
        body: formData,
        method: 'POST',
      }
    );

    return response.json();
  }

  return useMutation({
    mutationFn,
  });
}
