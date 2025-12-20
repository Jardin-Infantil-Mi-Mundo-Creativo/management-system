import { useQuery } from '@tanstack/react-query';

import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';

export const useGetEnrollmentsQuery = () => {
  const fetchData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FRONT_BACKEND_URL}/enrollments/`
    );
    return response.json();
  };

  const queryParams = {
    queryFn: fetchData,
    queryKey: ['enrollments'],
  };

  const getEnrollmentsQuery =
    useQuery<EnrollmentFormSchemaWithDocumentId[]>(queryParams);

  const getSafeData =
    !getEnrollmentsQuery.isLoading &&
    !getEnrollmentsQuery.isError &&
    getEnrollmentsQuery.data &&
    Array.isArray(getEnrollmentsQuery.data)
      ? getEnrollmentsQuery.data
      : [];

  return { getEnrollmentsQuery, safeData: getSafeData };
};
