import type { Control, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Checkbox } from '@/components/ui/shadcn/checkbox';
import { Label } from '@/components/ui/shadcn/label';
import type { EnrollmentFormSchema } from '@/types/enrollment';

interface ControlledCheckboxProps {
  control: Control<EnrollmentFormSchema>;
  inputId: Path<EnrollmentFormSchema>;
  labelText: string;
}

function ControlledCheckbox({
  control,
  inputId,
  labelText,
}: ControlledCheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <Controller
        name={inputId}
        control={control}
        render={({ field }) => (
          <Checkbox
            id={inputId}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )}
      />
      <Label htmlFor={inputId}>{labelText}</Label>
    </div>
  );
}

export { ControlledCheckbox };
