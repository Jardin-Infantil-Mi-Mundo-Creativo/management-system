import type { ComponentProps } from 'react';
import type { Control, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Dropdown } from '@/components/ui/shadcn/dropdown';
import { Label } from '@/components/ui/shadcn/label';
import type { EnrollmentFormSchema } from '@/types/enrollment';

type Options = ComponentProps<typeof Dropdown>['options'];

interface ControlledDropdownProps {
  control: Control<EnrollmentFormSchema>;
  errorMessage?: string;
  inputId: Path<EnrollmentFormSchema>;
  labelForNo?: string;
  labelForYes?: string;
  labelText: string;
  onValueChange?: (value: string) => void;
  options?: Options;
  variant?: 'binary' | 'multiple';
}

function ControlledDropdown({
  control,
  errorMessage,
  inputId,
  labelForNo,
  labelForYes,
  labelText,
  onValueChange,
  options,
  variant = 'binary',
}: ControlledDropdownProps) {
  const getBinaryValue = (value: boolean) => {
    return value === true ? 'yes' : value === false ? 'no' : undefined;
  };

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor={inputId}>{labelText}</Label>

      <Controller
        name={inputId}
        control={control}
        render={({ field }) => (
          <Dropdown
            id={inputId}
            options={
              variant === 'binary'
                ? [
                    { label: labelForYes ?? 'Sí', value: 'yes' },
                    { label: labelForNo ?? 'No', value: 'no' },
                  ]
                : (options ?? [])
            }
            className="w-52"
            placeholder="Seleccione una opción"
            value={
              variant === 'binary' ? getBinaryValue(field.value) : field.value
            }
            onValueChange={(value) => {
              onValueChange?.(value);
              if (variant === 'binary') {
                field.onChange(value === 'yes');
              } else {
                field.onChange(value);
              }
            }}
          />
        )}
      />

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

export { ControlledDropdown };
