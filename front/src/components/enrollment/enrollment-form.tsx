import type { EnrollmentFormSchema } from '@/types/enrollment';
import type { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import { CardContent } from '@/components/ui/card';

interface EnrollmentFormProps {
  handleSubmit: UseFormHandleSubmit<EnrollmentFormSchema>;
  onFormSubmit: SubmitHandler<EnrollmentFormSchema>;
  children: React.ReactNode;
}

function EnrollmentForm({
  handleSubmit,
  onFormSubmit,
  children,
}: EnrollmentFormProps) {
  return (
    <CardContent>
      <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col">
        {children}
      </form>
    </CardContent>
  )
}

export { EnrollmentForm };
