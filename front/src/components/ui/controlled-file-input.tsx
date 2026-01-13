import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { FileInput } from '@/components/ui/file-input';

type Props<T extends FieldValues> = {
  control: Control<T>;
  errorMessage?: string;
  inputId: Path<T>;
};

function ControlledFileInput<T extends FieldValues>({
  control,
  errorMessage,
  inputId,
}: Props<T>) {
  return (
    <>
      <Controller
        name={inputId}
        control={control}
        render={({ field }) => (
          <FileInput
            onFileSelect={(file) => field.onChange(file)}
            className="w-full"
          />
        )}
      />
      {errorMessage && (
        <span className="text-sm text-red-600" data-testid="form-error-message">
          {String(errorMessage)}
        </span>
      )}
    </>
  );
}

export { ControlledFileInput };
