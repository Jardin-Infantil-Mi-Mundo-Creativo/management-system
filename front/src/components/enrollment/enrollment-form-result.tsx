import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils';
import { CircleAlert, CircleCheck } from "lucide-react"
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface EnrollmentFormResultProps {
  isEnrollmentMutationError: boolean;
  isEnrollmentMutationSuccess: boolean;
  resetEnrollmentMutation: () => void;
};

function EnrollmentFormResult({ isEnrollmentMutationError, isEnrollmentMutationSuccess, resetEnrollmentMutation }: EnrollmentFormResultProps) {
  const router = useRouter();

  return (
      <Dialog open={isEnrollmentMutationError || isEnrollmentMutationSuccess}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>
              <div className={cn('flex gap-2 items-center', isEnrollmentMutationError? 'text-red-500' : isEnrollmentMutationSuccess ? 'text-green-500' : '')}>
                {isEnrollmentMutationError ?
                  <>
                    <CircleAlert />
                    Hubo un error al matricular al estudiante
                  </> : isEnrollmentMutationSuccess ?
                    <>
                      <CircleCheck />
                      Estudiante matriculado exitosamente
                    </> : null}
              </div>
            </DialogTitle>
            <DialogDescription>
              {isEnrollmentMutationError ? "Contacte al ingeniero para recibir asistencia" : isEnrollmentMutationSuccess ? "El estudiante ahora se encuentra en la base de datos" : null}
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => {
            if (isEnrollmentMutationSuccess) {
              router.push('/')
            }
            resetEnrollmentMutation()
          }}
          >
            Entendido
          </Button>
        </DialogContent>
      </Dialog>
  )
}

export { EnrollmentFormResult };
