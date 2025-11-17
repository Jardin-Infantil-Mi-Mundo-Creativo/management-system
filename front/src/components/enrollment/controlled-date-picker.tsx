import { Label } from '@/components/ui/label';
import type { EnrollmentFormSchema } from '@/types/enrollment';
import type { Control, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@/components/ui/date-picker';

interface ControlledDropdownProps {
  control: Control<EnrollmentFormSchema>;
  inputId: Path<EnrollmentFormSchema>;
  labelText: string;
  errorMessage?: string;
  onValueChange?: (value: Date) => void;
};

function ControlledDatePicker({
  control,
  inputId,
  labelText,
  errorMessage,
  onValueChange,
}: ControlledDropdownProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor={inputId}>{labelText}</Label>

      <Controller
        name={inputId}
        control={control}
        render={({ field }) => (
          <DatePicker
            onChange={(d) => {
              field.onChange(formatDate(d))
              onValueChange?.(d);
            }}
            value={field.value ? new Date(field.value.split('/').reverse().join('-')) : null}
            id={inputId}
          />
        )}
      />

      {errorMessage ? (
        <span className="text-sm text-red-600 -mt-2">
          {errorMessage}
        </span>
      ) : null}
    </div>
  )
}

export { ControlledDatePicker };

