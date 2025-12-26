import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Checkbox } from '@/components/ui/shadcn/checkbox';
import { Label } from '@/components/ui/shadcn/label';
import type { EnrollmentFormSchema } from '@/types/enrollment';

interface ControlledCheckboxProps {
  control: Control<EnrollmentFormSchema>;
  inputId: string;
  labelText: string;
  onValueChange?: (value: boolean) => void;
}

function ControlledCheckbox({
  control,
  inputId,
  labelText,
  onValueChange,
}: ControlledCheckboxProps) {
  return (
    <Controller
      control={control}
      name={inputId as keyof EnrollmentFormSchema}
      render={({ field }) => (
        <div className="flex items-center gap-2">
          <Checkbox
            data-testid="input"
            id={inputId}
            checked={field.value as boolean}
            onCheckedChange={(checked) => {
              const boolValue = checked === true;
              field.onChange(boolValue);
              onValueChange?.(boolValue);
            }}
          />
          <Label htmlFor={inputId}>{labelText}</Label>
        </div>
      )}
    />
  );
}

export { ControlledCheckbox };
