import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';
import { useQuery } from '@tanstack/react-query';

const fetchData = async () => {
  const response = await fetch('http://localhost:3001/enrollments/');
  return response.json();
};

export const queryParams = {
  queryFn: fetchData,
  queryKey: ['enrollments'],
};

export const useGetEnrollmentsQuery = () => {
  const queryParams = {
    queryFn: fetchData,
    queryKey: ['enrollments'],
  };

  return useQuery<EnrollmentFormSchemaWithDocumentId[]>(queryParams);
};
