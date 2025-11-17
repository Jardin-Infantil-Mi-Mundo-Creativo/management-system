import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { Path, UseFormRegisterReturn } from 'react-hook-form';
import type { EnrollmentFormSchema } from '@/types/enrollment';
import { cn } from '@/lib/utils';

interface InputGroupProps {
  label: string;
  inputId: Path<EnrollmentFormSchema>;
  register: UseFormRegisterReturn<Path<EnrollmentFormSchema>>;
  errorMessage?: string;
  className?: string
  disabled?: boolean
};

function InputGroup({ label, inputId, register, errorMessage, className, disabled }: InputGroupProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Label htmlFor={inputId}>{label}</Label>
      <Input id={inputId} {...register} disabled={disabled} readOnly={disabled} />
      {errorMessage ? <span className="text-sm text-red-600 -mt-2">{errorMessage}</span> : null}
    </div>
  )
}

export { InputGroup };
