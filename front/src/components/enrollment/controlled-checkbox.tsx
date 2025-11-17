import { Checkbox } from '@/components/ui/checkbox'
import { EnrollmentFormSchema } from '@/types/enrollment'
import { Control, Controller, Path } from 'react-hook-form'
import { Label } from '@/components/ui/label';

interface ControlledCheckboxProps {
  control: Control<EnrollmentFormSchema>;
  inputId: Path<EnrollmentFormSchema>;
  labelText: string;
};

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
  )
}

export { ControlledCheckbox };
