import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Dispatch, SetStateAction } from 'react';

export const useDeleteEnrollmentMutation = (
  id: string,
  setIsOpen: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  const mutationParams = {
    mutationFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONT_BACKEND_URL}/enrollments/${id}`,
        {
          method: 'DELETE',
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
