import type { EnrollmentFormSchema } from '@/types/enrollment';
import { useMutation } from '@tanstack/react-query';

async function createEnrollment(data: EnrollmentFormSchema) {
  const formData = new FormData();
  const dataWithNoFiles = { ...data };
  delete dataWithNoFiles.studentPhoto;
  delete dataWithNoFiles.documentsFile;
  formData.append('data', JSON.stringify(dataWithNoFiles));
  formData.append('studentPhoto', data.studentPhoto || '');
  formData.append('documentsFile', data.documentsFile || '');

  const response = await fetch('http://localhost:3001/enrollments/', {
    body: formData,
    method: 'POST',
  });

  return response.json();
}

export function usePostEnrollmentMutation() {
  return useMutation({
    mutationFn: createEnrollment,
  });
}
