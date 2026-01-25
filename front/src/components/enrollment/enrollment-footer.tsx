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
  const sharedT = useTranslations('shared');
  const enrollmentT = useTranslations('enrollment');

  const getButtonLabel = () => {
    const isFormCompleted = !Object.keys(errors).length;

    if (isEnrollmentMutationPending) {
      return {
        buttonLabel: enrollmentT('submitButtonText.enrolling'),
        buttonState: 'loading',
      };
    } else if (
      isFormCompleted &&
      (!watchedValues.studentPhoto || !watchedValues.documentsFile)
    ) {
      return {
        buttonLabel: enrollmentT('submitButtonText.draft'),
        buttonState: 'draft',
      };
    } else {
      return {
        buttonLabel: sharedT('enrollStudent'),
        buttonState: 'enrollment',
      };
    }
  };

  const { buttonLabel, buttonState } = getButtonLabel();

  return (
    <>
      <div className="flex flex-col items-center text-sm font-semibold">
        <p>{`${enrollmentT('address')}: ${sharedT('secret.institutionAddress')}`}</p>
        <p>
          {enrollmentT('email')}:{' '}
          <span className="underline">
            {sharedT('secret.institutionEmail')}
          </span>
        </p>
        <p>{`${enrollmentT('telephoneNumber')}: ${sharedT('secret.institutionPhone')}`}</p>
        <p>{`${enrollmentT('cellPhoneNumber')}: ${sharedT('secret.institutionCellphone')}`}</p>
      </div>

      <div className="flex flex-col items-center mt-6 gap-2">
        {Object.keys(errors).length ? (
          <p className="text-sm text-red-600">{enrollmentT('fixFormErrors')}</p>
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
              {enrollmentT('draftClarification')}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}

export { EnrollmentFooter };
