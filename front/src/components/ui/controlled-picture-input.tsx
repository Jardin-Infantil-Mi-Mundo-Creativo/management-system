import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { PictureInput } from '@/components/ui/picture-input';
import { cn } from '@/lib/utils';

type Props<T extends FieldValues> = {
  className?: string;
  control: Control<T>;
  errorMessage?: string;
  inputId: Path<T>;
};

function ControlledPictureInput<T extends FieldValues>({
  className,
  control,
  errorMessage,
  inputId,
}: Props<T>) {
  return (
    <Controller
      name={inputId}
      control={control}
      render={({ field }) => (
        <div className={cn('flex flex-col gap-2 items-center', className)}>
          <PictureInput
            onFileSelect={(file) => {
              field.onChange(file);
            }}
          />
          {errorMessage ? (
            <span
              className="text-sm text-red-600 text-center"
              data-testid="form-error-message"
            >
              {errorMessage}
            </span>
          ) : null}
        </div>
      )}
    />
  );
}

export { ControlledPictureInput };
