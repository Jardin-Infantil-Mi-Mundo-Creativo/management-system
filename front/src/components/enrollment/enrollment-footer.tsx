import { useTranslations } from 'next-intl';
import type { FieldErrors } from 'react-hook-form';

import { Button } from '@/components/ui/shadcn/button';
import { Spinner } from '@/components/ui/shadcn/spinner';
import { cn } from '@/lib/utils';
import type { EnrollmentFormSchema } from '@/types/enrollment';

interface EnrollmentFooterProps {
  errors: FieldErrors<EnrollmentFormSchema>;
  isEnrollmentMutationPending: boolean;
  watchedValues: EnrollmentFormSchema;
}

function EnrollmentFooter({
  errors,
  isEnrollmentMutationPending,
  watchedValues,
}: EnrollmentFooterProps) {
  const t = useTranslations('shared.institutionInfo');

  const getButtonLabel = () => {
    const isFormCompleted = !Object.keys(errors).length;

    if (isEnrollmentMutationPending) {
      return { buttonLabel: 'Matriculando...', buttonState: 'loading' };
    } else if (
      isFormCompleted &&
      (!watchedValues.studentPhoto || !watchedValues.documentsFile)
    ) {
      return { buttonLabel: 'Guardar como borrador', buttonState: 'draft' };
    } else {
      return {
        buttonLabel: 'Matricular estudiante',
        buttonState: 'enrollment',
      };
    }
  };

  const { buttonLabel, buttonState } = getButtonLabel();

  return (
    <>
      <div className="flex flex-col items-center text-sm font-semibold">
        <p>{`Dirección: ${t('institutionAddress')}`}</p>
        <p>
          Correo: <span className="underline">{t('institutionEmail')}</span>
        </p>
        <p>{`Teléfono: ${t('institutionPhone')}`}</p>
        <p>{`Celular: ${t('institutionCellphone')}`}</p>
      </div>

      <div className="flex flex-col items-center mt-6 gap-2">
        {Object.keys(errors).length ? (
          <p className="text-sm text-red-600">
            Corrija los errores en el formulario antes de continuar
          </p>
        ) : null}
        <div className="flex flex-col items-center w-full gap-2">
          <Button
            type="submit"
            className={cn(
              'w-full',
              buttonState === 'loading'
                ? 'bg-primary'
                : buttonState === 'draft'
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-green-800 hover:bg-green-900'
            )}
            size="lg"
            disabled={buttonState === 'loading'}
          >
            {buttonState === 'loading' ? <Spinner /> : null} {buttonLabel}
          </Button>
          {buttonState === 'draft' ? (
            <p className="text-sm font-semibold text-center leading-none">
              Una matricula se publica como borrador si no se sube la foto del
              estudiante ni los documentos, se debe completar más adelante
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}

export { EnrollmentFooter };
