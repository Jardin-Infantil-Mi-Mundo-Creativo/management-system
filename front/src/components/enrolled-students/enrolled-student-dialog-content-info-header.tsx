import Image from 'next/image';
import Link from 'next/link';
import type { Control } from 'react-hook-form';

import { EnrolledStudentDialogContentInfoDataItem } from '@/components/enrolled-students/enrolled-students';
import { ControlledPictureInput } from '@/components/ui/controlled-picture-input';
import type { EnrolledStudentDialogContentInfoSchema } from '@/types/enrolled-students';
import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';

interface EnrolledStudentDialogContentInfoHeaderProps {
  control: Control<EnrolledStudentDialogContentInfoSchema>;
  dataTestId: string;
  personalStudentInfo: EnrollmentFormSchemaWithDocumentId['personalStudentInfo'];
  studentPhoto: string | null;
  studentPhotoError?: string;
}

function EnrolledStudentDialogContentInfoHeader({
  control,
  dataTestId,
  personalStudentInfo,
  studentPhoto,
  studentPhotoError,
}: EnrolledStudentDialogContentInfoHeaderProps) {
  const items = [
    {
      label: 'Nombre completo',
      value: personalStudentInfo.fullName,
    },
    {
      label: 'Fecha de nacimiento',
      value: personalStudentInfo.birthDate,
    },
    {
      label: 'Edad',
      value: `${personalStudentInfo.ageYears} años, ${personalStudentInfo.ageMonths} meses`,
    },
    {
      label: 'Ciudad de nacimiento',
      value: personalStudentInfo.birthCity,
    },
    {
      label: 'N° registro civil',
      value: personalStudentInfo.civilRegistrationNumber,
    },
  ];

  return (
    <div
      className="flex justify-between items-start gap-4"
      data-testid={dataTestId}
    >
      <div className="flex flex-col gap-4 w-2/3">
        <h1 className="text-2xl font-bold">
          Información personal del estudiante
        </h1>

        <div>
          {items.map((item) => (
            <EnrolledStudentDialogContentInfoDataItem
              key={item.label}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
      </div>

      {studentPhoto ? (
        <Link href={studentPhoto} target="_blank" rel="noopener noreferrer">
          <Image
            src={studentPhoto}
            alt="Foto del estudiante"
            width={200}
            height={200}
            className="rounded-lg object-cover cursor-pointer border"
          />
        </Link>
      ) : (
        <ControlledPictureInput
          control={control}
          errorMessage={studentPhotoError}
          inputId="studentPhoto"
        />
      )}
    </div>
  );
}

export { EnrolledStudentDialogContentInfoHeader };
