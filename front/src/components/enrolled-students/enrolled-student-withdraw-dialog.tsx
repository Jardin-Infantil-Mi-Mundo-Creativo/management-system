'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { ControlledDatePicker } from '@/components/enrollment/controlled-date-picker';
import { Button } from '@/components/ui/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/shadcn/dialog';
import { useWithdrawEnrollmentMutation } from '@/mutations/enrolled-students/use-withdraw-enrollment-mutation';
import { createWithdrawalSchema } from '@/schemas/withdrawal';
import { formatDate } from '@/utils/shared/date';

interface EnrolledStudentWithdrawDialogProps {
  enrollmentDate: string;
  enrollmentId: string;
  studentName: string;
}

function EnrolledStudentWithdrawDialog({
  enrollmentDate,
  enrollmentId,
  studentName,
}: EnrolledStudentWithdrawDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const withdrawalSchema = createWithdrawalSchema(enrollmentDate);
  type WithdrawalFormSchema = z.infer<typeof withdrawalSchema>;
  const form = useForm<WithdrawalFormSchema>({
    defaultValues: { withdrawalDate: formatDate(new Date()) },
    resolver: zodResolver(withdrawalSchema),
  });
  const mutation = useWithdrawEnrollmentMutation(enrollmentId);
  const errorMessage = form.formState.errors.withdrawalDate?.message;
  const errorId = 'withdrawal-date-error';

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      form.reset({ withdrawalDate: formatDate(new Date()) });
      mutation.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Retirar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Retirar estudiante</DialogTitle>
          <DialogDescription>
            ¿Está seguro de retirar al estudiante{' '}
            <span className="font-bold">{studentName}</span>?
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(({ withdrawalDate }) => {
            mutation.mutate(
              { withdrawalDate },
              { onSuccess: () => setIsOpen(false) }
            );
          })}
        >
          <div className="flex flex-col gap-4">
            <ControlledDatePicker<WithdrawalFormSchema>
              control={form.control}
              errorId={errorId}
              errorMessage={errorMessage}
              id="withdrawal-date"
              inputId="withdrawalDate"
              labelText="Fecha de retiro"
            />
            {mutation.isError ? (
              <p role="alert">Hubo un error al retirar al estudiante.</p>
            ) : null}
          </div>
          <DialogFooter className="mt-6">
            <Button
              disabled={mutation.isPending}
              onClick={() => setIsOpen(false)}
              type="button"
              variant="outline"
            >
              Cancelar
            </Button>
            <Button disabled={mutation.isPending} type="submit">
              Retirar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { EnrolledStudentWithdrawDialog };
