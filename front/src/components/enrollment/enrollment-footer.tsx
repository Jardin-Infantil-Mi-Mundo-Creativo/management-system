import type { FieldErrors } from 'react-hook-form';
import type { EnrollmentFormSchema } from '@/types/enrollment';
import { Spinner } from '@/components/ui/shadcn/spinner';
import { Button } from '@/components/ui/shadcn/button';
import {
  INSTITUTION_ADDRESS,
  INSTITUTION_EMAIL,
  INSTITUTION_PHONE,
  INSTITUTION_CELLPHONE,
} from '@/consts/shared';

interface EnrollmentFooterProps {
  errors: FieldErrors<EnrollmentFormSchema>;
  isEnrollmentMutationPending: boolean;
}

function EnrollmentFooter({
  errors,
  isEnrollmentMutationPending,
}: EnrollmentFooterProps) {
  return (
    <>
      <div className="flex flex-col items-center text-sm font-semibold">
        <p>{`Dirección: ${INSTITUTION_ADDRESS}`}</p>
        <p>
          Correo: <span className="underline">{INSTITUTION_EMAIL}</span>
        </p>
        <p>{`Teléfono: ${INSTITUTION_PHONE}`}</p>
        <p>{`Celular: ${INSTITUTION_CELLPHONE}`}</p>
      </div>

      <div className="flex flex-col items-center mt-6 gap-2">
        {Object.keys(errors).length ? (
          <p className="text-sm text-red-600">
            Corrija los errores en el formulario antes de continuar
          </p>
        ) : null}
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isEnrollmentMutationPending}
        >
          {isEnrollmentMutationPending ? <Spinner /> : null}{' '}
          {isEnrollmentMutationPending
            ? 'Matriculando...'
            : 'Matricular estudiante'}
        </Button>
      </div>
    </>
  );
}

export { EnrollmentFooter };
