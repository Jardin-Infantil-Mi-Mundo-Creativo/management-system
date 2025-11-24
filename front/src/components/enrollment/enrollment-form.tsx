import type { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';

import { CardContent } from '@/components/ui/shadcn/card';
import type { EnrollmentFormSchema } from '@/types/enrollment';

interface EnrollmentFormProps {
  children: React.ReactNode;
  handleSubmit: UseFormHandleSubmit<EnrollmentFormSchema>;
  onFormSubmit: SubmitHandler<EnrollmentFormSchema>;
}

function EnrollmentForm({
  children,
  handleSubmit,
  onFormSubmit,
}: EnrollmentFormProps) {
  return (
    <CardContent>
      <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col">
        {children}
      </form>
    </CardContent>
  );
}

export { EnrollmentForm };
