import { CircleAlert, CircleCheck } from 'lucide-react';

import { Button } from '@/components/ui/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/shadcn/dialog';
import { cn } from '@/lib/utils';

interface EnrolledStudentFormResultProps {
  isMutationError: boolean;
  isMutationSuccess: boolean;
  onSuccessClose?: () => void;
  resetMutation: () => void;
}

function EnrolledStudentDialogContentInfoFormResult({
  isMutationError,
  isMutationSuccess,
  onSuccessClose,
  resetMutation,
}: EnrolledStudentFormResultProps) {
  return (
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
                  Información actualizada exitosamente
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
            resetMutation();
            if (isMutationSuccess && onSuccessClose) {
              onSuccessClose();
            }
          }}
        >
          Entendido
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export { EnrolledStudentDialogContentInfoFormResult };
