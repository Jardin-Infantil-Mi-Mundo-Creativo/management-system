import { useMutation, useQueryClient } from '@tanstack/react-query';

interface WithdrawalData {
  withdrawalDate: string;
}

function useWithdrawEnrollmentMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: WithdrawalData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONT_BACKEND_URL}/enrollments/${id}/withdrawal`,
        {
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
          method: 'PATCH',
        }
      );

      if (!response.ok) {
        throw new Error('No fue posible retirar al estudiante');
      }

      return response.json();
    },
    mutationKey: ['enrollment', id, 'withdrawal'],
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['enrollments'] }),
  });
}

export { useWithdrawEnrollmentMutation };
