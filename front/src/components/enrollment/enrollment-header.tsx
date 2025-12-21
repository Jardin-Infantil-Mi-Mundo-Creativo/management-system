import Image from 'next/image';
import Link from 'next/link';
import type { Control } from 'react-hook-form';

import { ControlledPictureInput } from '@/components/ui/controlled-picture-input';
import { CardHeader } from '@/components/ui/shadcn/card';
import {
  INSTITUTION_DANE_CODE,
  INSTITUTION_LICENSE,
  INSTITUTION_NAME,
  INSTITUTION_SLOGAN,
} from '@/consts/shared';
import type { EnrollmentFormSchema } from '@/types/enrollment';

const InstitutionInfo = () => {
  return (
    <div className="flex flex-col items-center text-center w-1/3">
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
}

function EnrollmentHeader({ control }: EnrollmentHeaderProps) {
  return (
    <CardHeader>
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="w-1/3">
          <Image
            width="40"
            height="40"
            src="/logo.svg"
            alt="institution logo"
            className="size-40 m-auto object-contain"
          />
        </Link>

        <InstitutionInfo />

        <ControlledPictureInput
          control={control}
          inputId="studentPhoto"
          className="w-1/3"
        />
      </div>

      <h2 className="text-3xl font-bold text-center text-primary">
        LIBRO DE MATRICULA
      </h2>
    </CardHeader>
  );
}

export { EnrollmentHeader };
