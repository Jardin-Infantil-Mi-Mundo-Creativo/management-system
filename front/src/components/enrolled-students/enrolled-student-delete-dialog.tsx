import { CircleAlert, CircleCheck } from 'lucide-react';
import { useState } from 'react';

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
import { cn } from '@/lib/utils';
import { useDeleteEnrollmentMutation } from '@/mutations/enrolled-students/use-delete-enrollment-mutation';

interface Props {
  enrollmentId: string;
  studentName: string;
}

function EnrolledStudentDeleteDialog({ enrollmentId, studentName }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const mutation = useDeleteEnrollmentMutation(enrollmentId, setIsOpen);

  const isMutationError = mutation.isError;
  const isMutationSuccess = mutation.isSuccess;

  return (
    <>
      <Dialog
        open={isOpen && !isMutationError && !isMutationSuccess}
        onOpenChange={setIsOpen}
      >
        <DialogTrigger asChild>
          <Button variant="destructive">Eliminar</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar matrícula</DialogTitle>
          </DialogHeader>
          <p>
            ¿Está seguro de eliminar la matrícula del estudiante{' '}
            <span className="font-bold">{studentName}</span>?
          </p>
          <DialogFooter className="flex flex-col gap-2">
            <Button variant="destructive" onClick={() => mutation.mutate()}>
              Eliminar
            </Button>
            <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isMutationError || isMutationSuccess}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>
              <div
                className={cn(
                  'flex gap-2 items-center',
                  isMutationError
                    ? 'text-red-500'
                    : isMutationSuccess
                      ? 'text-green-500'
                      : ''
                )}
              >
                {isMutationError ? (
                  <>
                    <CircleAlert />
                    Hubo un error al actualizar la información
                  </>
                ) : isMutationSuccess ? (
                  <>
                    <CircleCheck />
                    Matrícula eliminada exitosamente
                  </>
                ) : null}
              </div>
            </DialogTitle>
            <DialogDescription>
              {isMutationError
                ? 'Por favor intente nuevamente o contacte soporte.'
                : isMutationSuccess
                  ? 'El registro del estudiante se encuentra completado.'
                  : null}
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => {
              mutation.reset();
              if (isMutationSuccess) {
                window.location.reload();
              }
            }}
          >
            Entendido
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export { EnrolledStudentDeleteDialog };
