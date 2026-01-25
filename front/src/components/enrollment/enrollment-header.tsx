import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { Control } from 'react-hook-form';

import { ControlledPictureInput } from '@/components/ui/controlled-picture-input';
import { CardHeader } from '@/components/ui/shadcn/card';
import type { EnrollmentFormSchema } from '@/types/enrollment';

const InstitutionInfo = () => {
  const tSecret = useTranslations('shared.secret');

  return (
    <div className="flex flex-col items-center text-center w-1/3">
      <h1 className="text-2xl font-bold text-primary uppercase">
        {tSecret('institutionName')}
      </h1>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {tSecret('institutionSlogan')}
      </p>
      <p className="text-xs text-muted-foreground">
        {tSecret('institutionLicense')}
      </p>
      <p className="text-xs text-muted-foreground">
        {tSecret('institutionDaneCode')}
      </p>
    </div>
  );
};

interface EnrollmentHeaderProps {
  control: Control<EnrollmentFormSchema>;
}

function EnrollmentHeader({ control }: EnrollmentHeaderProps) {
  const t = useTranslations('enrollment.header');

  return (
    <CardHeader>
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="w-1/3">
          <Image
            width="40"
            height="40"
            src="/logo.svg"
            alt={t('institutionLogoAlt')}
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
        {t('heading')}
      </h2>
    </CardHeader>
  );
}

export { EnrollmentHeader };
