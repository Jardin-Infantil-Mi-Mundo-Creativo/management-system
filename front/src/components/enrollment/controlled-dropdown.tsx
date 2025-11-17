import { Label } from '@/components/ui/shadcn/label';
import type { EnrollmentFormSchema } from '@/types/enrollment';
import type { Control, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Dropdown } from '@/components/ui/shadcn/dropdown';
import type { ComponentProps } from 'react';

type Options = ComponentProps<typeof Dropdown>['options'];

interface ControlledDropdownProps {
  control: Control<EnrollmentFormSchema>;
  inputId: Path<EnrollmentFormSchema>;
  labelText: string;
  errorMessage?: string;
  options?: Options;
  variant?: 'binary' | 'multiple';
  labelForYes?: string;
  labelForNo?: string;
  onValueChange?: (value: string) => void;
}

function ControlledDropdown({
  control,
  inputId,
  labelText,
  errorMessage,
  options,
  variant = 'binary',
  labelForYes,
  labelForNo,
  onValueChange,
}: ControlledDropdownProps) {
  const getBinaryValue = (value: boolean) =>
    value === true ? 'yes' : value === false ? 'no' : '';

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
                    { value: 'yes', label: labelForYes ?? 'Sí' },
                    { value: 'no', label: labelForNo ?? 'No' },
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
        <span className="text-sm text-red-600 -mt-2">{errorMessage}</span>
      ) : null}
    </div>
  );
}

export { ControlledDropdown };
