import { Label } from '@/components/ui/shadcn/label';
import { Input } from '@/components/ui/shadcn/input';
import type { Path, UseFormRegisterReturn } from 'react-hook-form';
import type { EnrollmentFormSchema } from '@/types/enrollment';
import { cn } from '@/lib/utils';

interface InputGroupProps {
  className?: string;
  disabled?: boolean;
  errorMessage?: string;
  inputId: Path<EnrollmentFormSchema>;
  label: string;
  register: UseFormRegisterReturn<Path<EnrollmentFormSchema>>;
}

function InputGroup({
  className,
  disabled,
  errorMessage,
  inputId,
  label,
  register,
}: InputGroupProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        id={inputId}
        {...register}
        disabled={disabled}
        readOnly={disabled}
      />
      {errorMessage ? (
        <span className="text-sm text-red-600 -mt-2">{errorMessage}</span>
      ) : null}
    </div>
  );
}

export { InputGroup };
