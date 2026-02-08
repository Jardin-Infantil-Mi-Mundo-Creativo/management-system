import type { Control, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { DatePicker } from '@/components/ui/shadcn/date-picker';
import { Label } from '@/components/ui/shadcn/label';
import type { EnrollmentFormSchema } from '@/types/enrollment';

interface ControlledDropdownProps {
  control: Control<EnrollmentFormSchema>;
  errorMessage?: string;
  inputId: Path<EnrollmentFormSchema>;
  labelText: string;
  onValueChange?: (value: Date) => void;
}

function ControlledDatePicker({
  control,
  errorMessage,
  inputId,
  labelText,
  onValueChange,
}: ControlledDropdownProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor={inputId}>{labelText}:</Label>

      <div data-testid="input">
        <Controller
          name={inputId}
          control={control}
          render={({ field }) => (
            <DatePicker
              onChange={(d) => {
                field.onChange(formatDate(d));
                onValueChange?.(d);
              }}
              value={
                field.value
                  ? new Date(field.value.split('/').reverse().join('-'))
                  : null
              }
              id={inputId}
            />
          )}
        />
      </div>

      {errorMessage ? (
        <span
          className="text-sm text-red-600 -mt-2"
          data-testid="form-error-message"
        >
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

export { ControlledDatePicker };
