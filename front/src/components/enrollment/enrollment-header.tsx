import Image from 'next/image';
import { CardHeader } from '@/components/ui/shadcn/card';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { EnrollmentHeaderPictureInput } from '@/components/enrollment/enrollment-header-picture-input';
import type { EnrollmentFormSchema } from '@/types/enrollment';
import {
  INSTITUTION_DANE_CODE,
  INSTITUTION_LICENSE,
  INSTITUTION_NAME,
  INSTITUTION_SLOGAN,
} from '@/consts/shared';

const InstitutionInfo = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold text-primary uppercase">
        {INSTITUTION_NAME}
      </h1>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {INSTITUTION_SLOGAN}
      </p>
      <p className="text-xs text-muted-foreground">{INSTITUTION_LICENSE}</p>
      <p className="text-xs text-muted-foreground">{INSTITUTION_DANE_CODE}</p>
    </div>
  );
};

interface EnrollmentHeaderProps {
  control: Control<EnrollmentFormSchema>;
  studentPhotoError?: string;
}

function EnrollmentHeader({
  control,
  studentPhotoError,
}: EnrollmentHeaderProps) {
  return (
    <CardHeader>
      <div className="flex items-center justify-between gap-4">
        <Image
          width="40"
          height="40"
          src="/logo.svg"
          alt="Logo Jardín Infantil"
          className="size-40 my-auto object-contain"
        />

        <InstitutionInfo />

        <Controller
          name="studentPhoto"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 items-center">
              <EnrollmentHeaderPictureInput
                onFileSelect={(file) => {
                  field.onChange(file);
                }}
              />
              {studentPhotoError ? (
                <span className="text-sm text-red-600 text-center">
                  {studentPhotoError}
                </span>
              ) : null}
            </div>
          )}
        />
      </div>

      <h2 className="text-3xl font-bold text-center text-primary">
        LIBRO DE MATRICULA
      </h2>
    </CardHeader>
  );
}

export { EnrollmentHeader };
