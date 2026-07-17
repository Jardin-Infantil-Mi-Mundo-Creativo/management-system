import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { DatePicker } from '@/components/ui/shadcn/date-picker';
import { Label } from '@/components/ui/shadcn/label';
import { formatDate, parseDate } from '@/utils/shared/date';

interface ControlledDatePickerProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  disabled?: boolean;
  errorId?: string;
  errorMessage?: string;
  id?: string;
  inputId: Path<TFieldValues>;
  labelText: string;
  onValueChange?: (value: Date) => void;
}

function ControlledDatePicker<TFieldValues extends FieldValues>({
  control,
  disabled,
  errorId,
  errorMessage,
  id,
  inputId,
  labelText,
  onValueChange,
}: ControlledDatePickerProps<TFieldValues>) {
  const datePickerId = id ?? inputId;

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor={datePickerId}>{labelText}:</Label>

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
                typeof field.value === 'string' ? parseDate(field.value) : null
              }
              id={datePickerId}
              aria-label={`${labelText}:`}
              aria-describedby={errorMessage ? errorId : undefined}
              aria-invalid={!!errorMessage}
              disabled={disabled}
            />
          )}
        />
      </div>

      {errorMessage ? (
        <span
          className="text-sm text-red-600 -mt-2"
          data-testid="form-error-message"
          id={errorId}
          role={errorId ? 'alert' : undefined}
        >
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

export { ControlledDatePicker };
